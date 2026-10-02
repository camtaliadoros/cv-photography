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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const P_STYLE =
  "font-family:'Lato',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; color:rgba(42,53,39,0.85);";

/** Same shell as the enquiry confirmation in ../enquiry/route.ts. */
function welcomeHtml(firstName: string): string {
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hello,";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>You&rsquo;re on the list</title>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#f0eae0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0eae0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid rgba(42,53,39,0.08);">
          <tr>
            <td style="background-color:#2a3527; padding:32px 36px; text-align:center;">
              <img src="${site.url}/brochure/images/logo-full-linen.png" alt="${site.name}" width="220" style="display:block; width:220px; height:auto; margin:0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px 36px 32px;">
              <p style="margin:0 0 20px; ${P_STYLE}">${greeting}</p>

              <p style="margin:0 0 20px; ${P_STYLE}">Thank you for signing up! You&rsquo;ll hear from me occasionally with updates and offers.</p>

              <p style="margin:0 0 28px; ${P_STYLE}">In the meantime, give me a follow on Instagram at <a href="${site.instagramUrl}" target="_blank" style="color:#b5674e;">@camvelucciphotography</a> to see what I&rsquo;ve been up to.</p>

              <p style="margin:0; ${P_STYLE}">Speak soon,<br>Cam x</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px; border-top:1px solid rgba(42,53,39,0.08); text-align:center;">
              <div style="font-family:'Lato',Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:0.06em; color:rgba(42,53,39,0.4);">Hertfordshire, England &nbsp;&middot;&nbsp; <a href="mailto:${site.email}" style="color:#b5674e; text-decoration:none;">${site.email}</a></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
      html: welcomeHtml(firstName),
      text: [
        greeting,
        "",
        "Thank you for signing up! You'll hear from me occasionally with updates and offers.",
        "",
        `In the meantime, give me a follow on Instagram at @camvelucciphotography (${site.instagramUrl}) to see what I've been up to.`,
        "",
        "Speak soon,",
        "Cam x",
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
