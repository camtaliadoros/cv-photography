import { NextRequest, NextResponse } from "next/server";
import { createRecord } from "@/lib/airtable";
import { isPhotoChoice, KEEP_PRIVATE } from "@/lib/photo-consent";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
 * Image Consent is written by field ID, not name, so renaming a column in
 * Airtable can't silently break the form. Client, Withdrawn on and Notes are
 * filled in by hand; Submitted at is Airtable's own created time.
 */
const FIELDS = {
  name: "fldN5nwJ4VwCfrprt",
  email: "fld9IqHMlvahvMySG",
  photos: "fldnyIJHLCnJaB1uc",
  website: "fldigSv9dR4kTVaWp",
  social: "fldRUd5tC9Q4Ebh4R",
  print: "fldgagBQmmlWjve9n",
  avoid: "fld2HFND7MzD92d06",
  privacy: "fld8ihfwinCBAg7y8",
  status: "fldh94d8jwRBVvgBy",
} as const;

const NEW_STATUS = "New — to tag";

interface Payload {
  name?: unknown;
  email?: unknown;
  photos?: unknown;
  website?: unknown;
  social?: unknown;
  print?: unknown;
  avoid?: unknown;
  privacy?: unknown;
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
  if (!isPhotoChoice(body.photos)) errors.photos = "Please choose one of these";
  if (body.privacy !== true) errors.privacy = "Please tick to confirm you’ve read it";
  if (Object.keys(errors).length || !isPhotoChoice(body.photos)) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // "Keep them all private" can never carry a channel tick, whatever was sent.
  const sharing = body.photos !== KEEP_PRIVATE;

  const created = await createRecord("AIRTABLE_CONSENT_TABLE_ID", {
    [FIELDS.name]: name,
    [FIELDS.email]: email,
    [FIELDS.photos]: body.photos,
    [FIELDS.website]: sharing && body.website === true,
    [FIELDS.social]: sharing && body.social === true,
    [FIELDS.print]: sharing && body.print === true,
    [FIELDS.avoid]: text(body.avoid, 2000),
    [FIELDS.privacy]: true,
    [FIELDS.status]: NEW_STATUS,
  });

  if (!created.ok) {
    return NextResponse.json({ success: false }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}
