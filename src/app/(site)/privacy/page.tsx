import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cam Velucci Photography collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Ported from the live camvelucci.com policy, with the third-party list
 * corrected for this build: Netlify hosting rather than Vercel, Cloudflare
 * Web Analytics rather than Google Analytics, and the separate newsletter list.
 */
export default async function PrivacyPage() {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]);
  const contactEmail = settings?.contactEmail ?? site.email;

  return (
    <div className="mx-auto max-w-[760px] px-(--gutter) pt-36 pb-(--section)">
      <h1 className="text-[clamp(30px,4vw,48px)]">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 10 September 2026</p>

      <div className="mt-12 space-y-6 text-charcoal/85 [&_a]:text-honey-deep [&_a]:underline [&_h2]:pt-8 [&_h2]:text-2xl [&_strong]:font-bold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        <p>
          This privacy policy explains how <strong>Cam Velucci Photography</strong>{" "}
          (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;) collects, uses and
          protects your personal information when you contact me through this
          website. I am the data controller responsible for your personal data.
        </p>

        <h2>Who I am</h2>
        <p>
          Cam Velucci Photography is a photography business based in
          Hertfordshire, England. If you have any questions about this policy or
          your data, you can reach me at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>

        <h2>What information I collect</h2>
        <p>When you complete the enquiry form on this website, I collect:</p>
        <ul>
          <li>Your first and last name</li>
          <li>Your email address</li>
          <li>Your phone number</li>
          <li>Your location (town or postcode), if you provide it</li>
          <li>
            Details about the session you&rsquo;re interested in — session type,
            preferred setting, how you heard about me, and anything you tell me
            in your message
          </li>
          <li>Whether you ticked the optional box to join my mailing list</li>
        </ul>
        <p>
          If you sign up to my mailing list without sending an enquiry, I collect
          only your email address and, if you give it, your first name.
        </p>
        <p>
          I also collect limited anonymous usage data through analytics (see{" "}
          <a href="#analytics">Analytics &amp; cookies</a> below).
        </p>

        <h2>How I use your information</h2>
        <p>I use the details you submit to:</p>
        <ul>
          <li>Respond to your enquiry and answer your questions</li>
          <li>Arrange and discuss a potential photography session</li>
          <li>Keep a record of our correspondence</li>
        </ul>
        <p>
          I will <strong>not</strong> use your details to send you marketing or
          promotional messages unless you have separately agreed to receive them
          by ticking the mailing list box, or by signing up to the mailing list
          directly.
        </p>

        <h2>Mailing list</h2>
        <p>
          The enquiry form includes an optional, unticked box you can use to join
          my mailing list. It is entirely separate from your enquiry — you can
          send an enquiry without joining, and choosing not to join makes no
          difference to your enquiry or booking. You can also sign up directly
          using the form in the footer of this site.
        </p>
        <p>
          If you sign up, I&rsquo;ll use your name and email address to send you
          occasional updates about mini session dates, offers, priority booking
          access and similar news. Mailing list details are stored separately
          from enquiries. I will never sell or share your email address with
          anyone else for their own marketing.
        </p>
        <p>
          The lawful basis for these messages is your <strong>consent</strong>.
          You can withdraw it at any time — every email includes an unsubscribe
          link, or you can email me at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and I&rsquo;ll remove
          you straight away. Withdrawing your consent doesn&rsquo;t affect
          anything I sent before you withdrew it.
        </p>
        <p>
          I keep your details on the mailing list until you unsubscribe or ask me
          to remove them.
        </p>

        <h2>Lawful basis for processing</h2>
        <p>
          I process your enquiry data on the basis of my{" "}
          <strong>legitimate interests</strong> in responding to enquiries and
          running my photography business, and, where relevant, in order to{" "}
          <strong>take steps to enter into a contract</strong> with you at your
          request. Mailing list messages are sent on the basis of your{" "}
          <strong>consent</strong>, as described above.
        </p>

        <h2>Who I share it with</h2>
        <p>
          I don&rsquo;t sell your data or share it for advertising. I do use a
          small number of trusted third-party services to run my enquiry process,
          which act as data processors on my behalf:
        </p>
        <ul>
          <li>
            <strong>Airtable</strong> — securely stores enquiry submissions and
            mailing list signups
          </li>
          <li>
            <strong>Resend</strong> — sends the email notification of your
            enquiry, your confirmation email, and mailing list messages
          </li>
          <li>
            <strong>Netlify</strong> — hosts this website
          </li>
          <li>
            <strong>Sanity</strong> — stores the words and photographs shown on
            this site (no visitor data)
          </li>
          <li>
            <strong>Cloudflare Web Analytics</strong> — provides anonymised website
            usage statistics without cookies or personal data
          </li>
        </ul>
        <p>
          Some of these providers are based outside the UK, so your data may be
          transferred and stored outside the UK. Where that happens, these
          providers rely on appropriate safeguards (such as the UK extension to
          the EU-US Data Privacy Framework or Standard Contractual Clauses) to
          protect your information.
        </p>

        <h2>How long I keep it</h2>
        <p>
          I keep enquiry data for as long as needed to respond to you and for a
          reasonable period afterwards (normally up to two years) in case you get
          back in touch. If you go on to book a session, your details will be
          kept for the duration of our working relationship and any period
          required for tax or legal reasons. You can ask me to delete your data
          at any time.
        </p>

        <h2 id="analytics">Analytics &amp; cookies</h2>
        <p>
          This website uses Cloudflare Web Analytics to understand how visitors
          use the site. Cloudflare Web Analytics does not use cookies and does
          not collect personal data — it only counts anonymised page views. The only things this site stores in your browser
          are small preferences, such as remembering that you have dismissed a
          banner. You can clear these through your
          browser settings at any time.
        </p>

        <h2>Your rights</h2>
        <p>Under UK data protection law, you have the right to:</p>
        <ul>
          <li>Access the personal data I hold about you</li>
          <li>Ask me to correct inaccurate data</li>
          <li>Ask me to delete your data</li>
          <li>Object to or restrict how I use your data</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>
        <p>
          To exercise any of these rights, email me at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. If you&rsquo;re
          unhappy with how I&rsquo;ve handled your data, you can also complain to
          the Information Commissioner&rsquo;s Office (ICO) at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          .
        </p>

        <h2>Changes to this policy</h2>
        <p>
          I may update this policy from time to time. Any changes will be posted
          on this page with a revised &ldquo;last updated&rdquo; date.
        </p>
      </div>

      <p className="mt-14">
        <Link href="/" className="font-display border-b-[1.5px] border-honey pb-1.5 text-[19px] text-forest transition-colors hover:text-honey-deep">
          &lsaquo; Back to home
        </Link>
      </p>
    </div>
  );
}
