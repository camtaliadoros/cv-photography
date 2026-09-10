import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createRecord, findRecord, updateRecord } from "@/lib/airtable";
import { site } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Payload {
  email?: unknown;
  firstName?: unknown;
  source?: unknown;
  /** Honeypot — a real person never fills this in. */
  company?: unknown;
}

const SOURCES = ["Footer", "Popup", "Enquiry form", "Mini sessions page"];

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Bots that filled the honeypot get a success response and no record —
  // telling them they failed only teaches them to try again.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: "A valid email address is required" },
      { status: 400 },
    );
  }

  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : "";
  const source =
    typeof body.source === "string" && SOURCES.includes(body.source)
      ? body.source
      : "Footer";

  await subscribe({ email, firstName, source });

  // Always report success to the visitor: whether they were already on the
  // list is not information a signup form should leak.
  return NextResponse.json({ success: true });
}

export async function subscribe({
  email,
  firstName,
  source,
}: {
  email: string;
  firstName: string;
  source: string;
}): Promise<void> {
  const existingId = await findRecord("AIRTABLE_SUBSCRIBERS_TABLE_ID", "Email", email);

  if (existingId) {
    // Re-subscribing someone who previously opted out is the whole point of
    // them filling the form in again.
    await updateRecord("AIRTABLE_SUBSCRIBERS_TABLE_ID", existingId, {
      Status: "Subscribed",
      "Unsubscribed at": null,
      ...(firstName ? { "First Name": firstName } : {}),
    });
    return;
  }

  const created = await createRecord("AIRTABLE_SUBSCRIBERS_TABLE_ID", {
    Email: email,
    "First Name": firstName,
    "Signed up": new Date().toISOString(),
    Source: source,
    Status: "Subscribed",
  });

  const sent = await sendWelcomeEmail(email, firstName);

  if (created.id && sent) {
    await updateRecord("AIRTABLE_SUBSCRIBERS_TABLE_ID", created.id, {
      "Welcome email sent": true,
    });
  }
}

async function sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — skipping newsletter welcome");
    return false;
  }

  const greeting = firstName ? `Hi ${firstName},` : "Hello,";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Cam Velucci Photography <${site.email}>`,
      to: email,
      replyTo: site.email,
      subject: "You're on the list",
      text: [
        greeting,
        "",
        "Thank you for signing up. You'll hear from me when new mini session dates go live, and occasionally when I have something worth sharing — never more than that.",
        "",
        `If you'd like a look at recent work in the meantime, it's all at ${site.url}/portfolio`,
        "",
        "Speak soon,",
        "Cam",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend newsletter welcome failed:", JSON.stringify(error));
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend newsletter welcome request failed:", error);
    return false;
  }
}
