/**
 * The privacy policy as Portable Text: the same shape the Studio stores, so
 * it serves both as the page's fallback and as the starting document that
 * scripts/seed-privacy.mts writes to Sanity. Once the Studio holds a policy,
 * this copy is only shown if Sanity is unreachable.
 *
 * Kept free of imports so the seed script can load it directly with Node.
 */

type Span = string | { text: string; bold?: boolean; href?: string };

export type PolicyBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  listItem?: "bullet";
  level?: number;
  markDefs: { _type: "link"; _key: string; href: string }[];
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
};

let counter = 0;
const key = () => `pp${(counter++).toString(36)}`;

function block(style: "normal" | "h2", spans: Span[], listItem?: "bullet"): PolicyBlock {
  const markDefs: PolicyBlock["markDefs"] = [];
  const children = spans.map((span) => {
    const s = typeof span === "string" ? { text: span } : span;
    const marks: string[] = [];
    if (s.bold) marks.push("strong");
    if (s.href) {
      const linkKey = key();
      markDefs.push({ _type: "link", _key: linkKey, href: s.href });
      marks.push(linkKey);
    }
    return { _type: "span" as const, _key: key(), text: s.text, marks };
  });
  return {
    _type: "block",
    _key: key(),
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs,
    children,
  };
}

const p = (...spans: Span[]) => block("normal", spans);
const h2 = (text: string) => block("h2", [text]);
const li = (...spans: Span[]) => block("normal", spans, "bullet");
const b = (text: string): Span => ({ text, bold: true });

const EMAIL = "hello@camvelucci.com";
const email: Span = { text: EMAIL, href: `mailto:${EMAIL}` };

export const PRIVACY_LAST_UPDATED = "2026-11-07";

export const PRIVACY_POLICY: PolicyBlock[] = [
  p(
    "This privacy policy explains how ",
    b("Cam Velucci Photography"),
    " (“I”, “me”, “my”) collects, uses and protects your personal information when you contact me through this website, book a session, or are photographed by me. I am the data controller responsible for your personal data.",
  ),

  h2("Who I am"),
  p(
    "Cam Velucci Photography is a photography business based in Hertfordshire, England. If you have any questions about this policy or your data, you can reach me at ",
    email,
    ".",
  ),

  h2("What information I collect"),
  p("When you complete the enquiry form on this website, I collect:"),
  li("Your first and last name"),
  li("Your email address"),
  li("Your phone number"),
  li("Your location (town or postcode), if you provide it"),
  li(
    "Details about the session you’re interested in: session type, preferred setting, how you heard about me, and anything you tell me in your message",
  ),
  li("Whether you ticked the optional box to join my mailing list"),
  p(
    "If you sign up to my mailing list without sending an enquiry, I collect only your email address and, if you give it, your first name.",
  ),
  p("If you book a session, I also collect:"),
  li("Your booking details, contract and payment records"),
  li("Your answers to my booking form and pre-session questionnaire"),
  li("Your consent choices for how your photographs and behind-the-scenes content can be used"),
  li("The photographs and behind-the-scenes content taken during your session"),
  p(
    "I also collect limited anonymous usage data through analytics (see ",
    { text: "Analytics & cookies", href: "#analytics-cookies" },
    " below).",
  ),

  h2("How I use your information"),
  p("I use the details you submit to:"),
  li("Respond to your enquiry and answer your questions"),
  li("Arrange and discuss a potential photography session"),
  li("Keep a record of our correspondence"),
  li("Run your session, and edit and deliver your photographs"),
  li("Use your photographs or behind-the-scenes content to promote my business, only if you’ve agreed to this"),
  p(
    "I will ",
    b("not"),
    " use your details to send you marketing or promotional messages unless you have separately agreed to receive them by ticking the mailing list box, or by signing up to the mailing list directly.",
  ),

  h2("Mailing list"),
  p(
    "The enquiry form includes an optional, unticked box you can use to join my mailing list. It is entirely separate from your enquiry — you can send an enquiry without joining, and choosing not to join makes no difference to your enquiry or booking. You can also sign up directly using the form in the footer of this site.",
  ),
  p(
    "If you sign up, I’ll use your name and email address to send you occasional updates about mini session dates, offers, priority booking access and similar news. Mailing list details are stored separately from enquiries. I will never sell or share your email address with anyone else for their own marketing.",
  ),
  p(
    "The lawful basis for these messages is your ",
    b("consent"),
    ". You can withdraw it at any time — every email includes an unsubscribe link, or you can email me at ",
    email,
    " and I’ll remove you straight away. Withdrawing your consent doesn’t affect anything I sent before you withdrew it.",
  ),
  p("I keep your details on the mailing list until you unsubscribe or ask me to remove them."),

  h2("Your photographs"),
  p(
    "I’ll only use your photographs to promote my business (for example on my website or social media) if you’ve said yes. You can choose each place separately.",
  ),
  p(
    "For full sessions, I ask for this after your gallery has been delivered, so you can see your images first. For mini sessions, I ask when you book.",
  ),
  p(
    "You can change your mind at any time by emailing ",
    email,
    ". I’ll stop using your photographs and remove them from my website and social media. I can’t remove anything that has already been shared or reposted by others.",
  ),

  h2("Behind-the-scenes content"),
  p(
    "With your permission, I sometimes capture short videos and photos of me at work during a session, using a tripod or my phone. I use these to show other families what a session with me feels like.",
  ),
  p(
    "I only capture behind-the-scenes content if you’ve said yes on your booking form. You can choose where it’s shared (social media and/or my website) and whether your faces can be visible. I’ll always show you anything before it’s shared.",
  ),
  p(
    "You can withdraw your consent at any time by emailing ",
    email,
    ". I’ll stop using the content and remove it from my website and social media. I can’t remove anything that has already been shared or reposted by others.",
  ),

  h2("Lawful basis for processing"),
  p(
    "I process your enquiry data on the basis of my ",
    b("legitimate interests"),
    " in responding to enquiries and running my photography business, and, where relevant, in order to ",
    b("take steps to enter into a contract"),
    " with you at your request. Mailing list messages are sent on the basis of your ",
    b("consent"),
    ", as described above.",
  ),
  p(
    "If you book a session, I process your booking details and photographs in order to ",
    b("perform our contract"),
    ". I use your photographs and behind-the-scenes content for marketing only on the basis of your ",
    b("consent"),
    ". If you’re a parent or guardian, you’re giving consent on behalf of your children.",
  ),

  h2("Who I share it with"),
  p(
    "I don’t sell your data or share it for advertising. I do use a small number of trusted third-party services to run my enquiry process, bookings and photo delivery, which act as data processors on my behalf:",
  ),
  li(b("Airtable"), ": securely stores enquiry submissions and mailing list signups"),
  li(b("Resend"), ": sends the email notification of your enquiry, your confirmation email, and mailing list messages"),
  li(b("Netlify"), ": hosts this website"),
  li(b("Sanity"), ": stores the words and photographs shown on this site (no visitor data)"),
  li(b("Cloudflare Web Analytics"), ": provides anonymised website usage statistics without cookies or personal data"),
  li(b("Pixieset"), ": hosts your online gallery and handles bookings and contracts"),
  p(
    "If you’ve agreed to it, your photographs or behind-the-scenes content may also appear on Instagram and other social media platforms, which are public.",
  ),
  p(
    "Some of these providers are based outside the UK, so your data may be transferred and stored outside the UK. Where that happens, these providers rely on appropriate safeguards (such as the UK extension to the EU-US Data Privacy Framework or Standard Contractual Clauses) to protect your information.",
  ),

  h2("How long I keep it"),
  p(
    "I keep enquiry data for as long as needed to respond to you and for a reasonable period afterwards (normally up to two years) in case you get back in touch. If you go on to book a session, your details will be kept for the duration of our working relationship and any period required for tax or legal reasons. You can ask me to delete your data at any time.",
  ),
  p(b("Photographs:")),
  li("Unedited (RAW) files are kept until your gallery expires, then deleted. Obvious rejects, such as blurry shots, may be deleted sooner."),
  li("I keep an archived copy of your final edited images for a limited period after your gallery expires, in case you lose your files."),
  li("If you’ve agreed to marketing use, I keep a selection of edited images (not RAW files) indefinitely, until you ask me to stop."),
  p(
    b("Behind-the-scenes content:"),
    " I keep a selection indefinitely, so I can use it to promote future sessions. Anything I won’t use is deleted when your gallery expires.",
  ),

  h2("Analytics & cookies"),
  p(
    "This website uses Cloudflare Web Analytics to understand how visitors use the site. Cloudflare Web Analytics does not use cookies and does not collect personal data — it only counts anonymised page views. The only things this site stores in your browser are small preferences, such as remembering that you have dismissed a banner. You can clear these through your browser settings at any time.",
  ),

  h2("Your rights"),
  p("Under UK data protection law, you have the right to:"),
  li("Access the personal data I hold about you"),
  li("Ask me to correct inaccurate data"),
  li("Ask me to delete your data"),
  li("Object to or restrict how I use your data"),
  li("Request a copy of your data in a portable format"),
  li("Withdraw your consent for marketing use of your photographs or behind-the-scenes content at any time"),
  p(
    "To exercise any of these rights, email me at ",
    email,
    ". If you’re unhappy with how I’ve handled your data, you can also complain to the Information Commissioner’s Office (ICO) at ",
    { text: "ico.org.uk", href: "https://ico.org.uk" },
    ".",
  ),

  h2("Changes to this policy"),
  p(
    "I may update this policy from time to time. Any changes will be posted on this page with a revised “last updated” date.",
  ),
];
