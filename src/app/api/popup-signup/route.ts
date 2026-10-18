import { NextRequest, NextResponse } from "next/server";
import { createRecord } from "@/lib/airtable";
import { popupEventName } from "@/lib/popup-events";
import { subscribe } from "../newsletter/route";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
 * Pop-Up Sign-Ups is written by field ID, not name, so renaming a column in
 * Airtable can't silently break the form on the day of an event.
 */
const FIELDS = {
  name: "fldgXbFDUcoqsczBA",
  email: "fldQzsLI76xG3PNwa",
  childName: "fldfGfb8ixUquhhlu",
  newsletter: "fldhLjs0vFeJDlGDI",
  website: "fldwkJlQ3nFxEvdbS",
  social: "fld148dFsQeS66TvK",
  print: "fld1n911kkX1kcdLf",
  privacy: "fldoD1gvhihJGmrVV",
  event: "fld8EfJdigHhJATb5",
} as const;

interface Payload {
  name?: unknown;
  email?: unknown;
  childName?: unknown;
  newsletter?: unknown;
  website?: unknown;
  social?: unknown;
  print?: unknown;
  privacy?: unknown;
  event?: unknown;
  /** Honeypot — a real person never fills this in. */
  company?: unknown;
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Bots that filled the honeypot get a success response and no record.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please add your name";
  if (!EMAIL_RE.test(email)) errors.email = "Please check your email address";
  if (body.privacy !== true) errors.privacy = "Please tick to confirm you’ve read it";
  if (Object.keys(errors).length) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const newsletter = body.newsletter === true;
  const event = popupEventName(body.event);

  const created = await createRecord("AIRTABLE_POPUP_TABLE_ID", {
    [FIELDS.name]: name,
    [FIELDS.email]: email,
    [FIELDS.childName]: text(body.childName, 80),
    [FIELDS.newsletter]: newsletter,
    [FIELDS.website]: body.website === true,
    [FIELDS.social]: body.social === true,
    [FIELDS.print]: body.print === true,
    [FIELDS.privacy]: true,
    ...(event ? { [FIELDS.event]: event } : {}),
  });

  // Unlike the newsletter, there's no email fallback here: if the record
  // didn't land, the parent has to know so they can try again before leaving.
  if (!created.ok) {
    return NextResponse.json({ success: false }, { status: 502 });
  }

  // The opt-in joins the same list the footer and popup write to. Failing
  // here must never fail the sign-up — the photos are the thing that matters.
  if (newsletter) {
    try {
      await subscribe({
        email,
        firstName: name.split(/\s+/)[0],
        source: "Pop-up event",
      });
    } catch (err) {
      console.error("Newsletter subscribe from pop-up failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
