import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { subscribe } from "../newsletter/route";

interface EnquiryPayload {
  firstName: string;
  email: string;
  message: string;
  /*
   * The approved design's form asks for first name, email, phone, how they
   * heard, and a message — nothing else. These stay in the type so the route
   * keeps working if the extra fields are ever added back to the form.
   */
  lastName?: string;
  phone?: string;
  location?: string;
  sessionType?: string;
  sessionLocationType?: string;
  heardAbout?: string;
  newsletter?: string;
  /** Honeypot — always empty for a real person. */
  company?: string;
}

const REQUIRED_FIELDS: (keyof EnquiryPayload)[] = ["firstName", "email", "message"];

function isValidPayload(body: unknown): body is EnquiryPayload {
  if (typeof body !== "object" || body === null) return false;
  const record = body as Record<string, unknown>;
  return REQUIRED_FIELDS.every((field) => typeof record[field] === "string" && record[field] !== "");
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Honeypot: report success so bots don't learn to retry, but write nothing.
  if (typeof body?.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const airtableResult = await writeToAirtable(body);
  const emailResult = await sendNotificationEmail(body);
  await sendClientConfirmationEmail(body);

  // The opt-in on this form is a newsletter signup like any other, so it goes
  // to the same place the footer and popup write to. Failing here must never
  // fail the enquiry — the enquiry is the thing that matters.
  if (body.newsletter === "yes") {
    try {
      await subscribe({
        email: body.email,
        firstName: body.firstName,
        source: "Enquiry form",
      });
    } catch (err) {
      console.error("Newsletter subscribe from enquiry failed:", err);
    }
  }

  if (!airtableResult.ok && !emailResult.ok) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

async function writeToAirtable(data: EnquiryPayload): Promise<{ ok: boolean }> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  if (!token || !baseId || !tableId) {
    console.warn("Airtable env vars not configured — skipping Airtable write");
    return { ok: false };
  }

  const fields: Record<string, string | boolean> = {
    "First Name": data.firstName,
    "Last Name": data.lastName || "",
    Email: data.email,
    Phone: data.phone || "",
    Location: data.location || "",
    "Session Type": data.sessionType || "",
    "Session Location": data.sessionLocationType || "",
    "How Heard": data.heardAbout || "",
    Message: data.message,
    "Newsletter Opt-In": data.newsletter === "yes",
    "Date received": new Date().toISOString(),
    Source: "Website",
  };

  async function post(body: Record<string, string | boolean>) {
    return fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typecast: true, fields: body }),
    });
  }

  try {
    let res = await post(fields);

    // Airtable rejects the whole record if any field name is unknown. Rather
    // than lose the enquiry, drop the offending field and write the rest.
    if (!res.ok) {
      const error = await res.json();
      const unknownField = JSON.stringify(error).includes("UNKNOWN_FIELD_NAME");

      if (unknownField) {
        console.warn("Airtable rejected an unknown field — retrying without Newsletter Opt-In");
        const rest = { ...fields };
        delete rest["Newsletter Opt-In"];
        res = await post(rest);
        if (!res.ok) {
          console.error("Airtable error:", JSON.stringify(await res.json()));
          return { ok: false };
        }
        return { ok: true };
      }

      console.error("Airtable error:", JSON.stringify(error));
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error("Airtable request failed:", err);
    return { ok: false };
  }
}

async function sendNotificationEmail(data: EnquiryPayload): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.ENQUIRY_NOTIFY_EMAIL || "hello@camvelucci.com";

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — skipping email notification");
    return { ok: false };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Cam Velucci Photography <enquiries@camvelucci.com>",
      to: notifyTo,
      replyTo: data.email,
      subject: `New enquiry — ${data.firstName}${data.lastName ? ` ${data.lastName}` : ""}`,
      text: [
        `Name: ${data.firstName}${data.lastName ? ` ${data.lastName}` : ""}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Location: ${data.location || "—"}`,
        `Session type: ${data.sessionType || "—"}`,
        `At home or outdoors: ${data.sessionLocationType || "—"}`,
        `How heard: ${data.heardAbout || "—"}`,
        `Newsletter opt-in: ${data.newsletter === "yes" ? "Yes" : "No"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error("Resend request failed:", err);
    return { ok: false };
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

function clientConfirmationHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Thank you for getting in touch</title>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#f0eae0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0eae0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid rgba(42,53,39,0.08);">
          <tr>
            <td style="background-color:#2a3527; padding:32px 36px; text-align:center;">
              <img src="https://camvelucci.com/logo/logo-full-linen.png" alt="Cam Velucci Photography" width="220" style="display:block; width:220px; height:auto; margin:0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px 36px 32px;">
              <p style="margin:0 0 20px; font-family:'Lato',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; color:rgba(42,53,39,0.85);">Hi ${name},</p>

              <p style="margin:0 0 20px; font-family:'Lato',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; color:rgba(42,53,39,0.85);">Thank you so much for getting in touch! Your message has landed safely with me.</p>

              <p style="margin:0 0 28px; font-family:'Lato',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; color:rgba(42,53,39,0.85);">I&rsquo;m likely behind a camera or knee-deep in family life right now (both, probably), so this is just a quick note to say: I&rsquo;ve got you. I&rsquo;ll come back to you personally as soon as I can.</p>

              <p style="margin:0 0 20px; font-family:'Lato',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; color:rgba(42,53,39,0.85);">In the meantime, here&rsquo;s my brochure if you&rsquo;d like to see how sessions work and what&rsquo;s included:</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:6px; background-color:#9c5841;">
                          <a href="https://camvelucci.com/brochure" target="_blank" style="display:inline-block; padding:14px 30px; font-family:'Lato',Helvetica,Arial,sans-serif; font-size:12px; font-weight:900; letter-spacing:0.18em; text-transform:uppercase; color:#f0eae0; text-decoration:none;">View the brochure</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px; font-family:'Lato',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; color:rgba(42,53,39,0.85);">And if you&rsquo;d like to get a feel for how I work, you can also have a wander through my <a href="https://instagram.com/camvelucciphotography" target="_blank" style="color:#b5674e;">recent work</a>.</p>

              <p style="margin:0; font-family:'Lato',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; color:rgba(42,53,39,0.85);">Talk very soon,<br><span style="font-weight:400;">Cam</span></p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px; border-top:1px solid rgba(42,53,39,0.08); text-align:center;">
              <div style="font-family:'Lato',Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:0.06em; color:rgba(42,53,39,0.4);">Hertfordshire, England &nbsp;&middot;&nbsp; <a href="mailto:hello@camvelucci.com" style="color:#b5674e; text-decoration:none;">hello@camvelucci.com</a></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendClientConfirmationEmail(data: EnquiryPayload): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — skipping client confirmation email");
    return { ok: false };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Cam Velucci Photography <hello@camvelucci.com>",
      to: data.email,
      replyTo: "hello@camvelucci.com",
      subject: "Thank you for getting in touch",
      html: clientConfirmationHtml(data.firstName),
      text: [
        `Hi ${data.firstName},`,
        "",
        "Thank you so much for getting in touch! Your message has landed safely with me.",
        "",
        "I'm likely behind a camera or knee-deep in family life right now (both, probably), so this is just a quick note to say: I've got you. I'll come back to you personally as soon as I can.",
        "",
        "In the meantime, here's my brochure if you'd like to see how sessions work and what's included: camvelucci.com/brochure",
        "",
        "And if you'd like to get a feel for how I work, you can also have a wander through my recent work: instagram.com/camvelucciphotography",
        "",
        "Talk very soon,",
        "Cam",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend client-confirmation error:", JSON.stringify(error));
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error("Resend client-confirmation request failed:", err);
    return { ok: false };
  }
}
