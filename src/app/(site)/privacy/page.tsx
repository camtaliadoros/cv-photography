import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { privacyPageQuery } from "@/sanity/lib/queries";
import type { PrivacyPage } from "@/sanity/lib/types";
import { PRIVACY_LAST_UPDATED, PRIVACY_POLICY } from "@/lib/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cam Velucci Photography collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/** "Analytics & cookies" → "analytics-cookies", so headings can be linked to. */
function slugify(node: PortableTextBlock): string {
  const text = (node.children ?? [])
    .map((child) => ("text" in child ? String(child.text) : ""))
    .join("");
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children, value }) => <h2 id={slugify(value)}>{children}</h2>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "";
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

/**
 * Edited in the Studio under "Privacy policy". The copy in
 * src/lib/privacy-policy.ts is shown until that document exists, and if
 * Sanity can't be reached.
 */
export default async function PrivacyPage() {
  const page = await sanityFetch<PrivacyPage>(privacyPageQuery, {}, ["privacyPage"]);
  const body = page?.body?.length ? page.body : (PRIVACY_POLICY as PortableTextBlock[]);
  const lastUpdated = page?.body?.length && page.lastUpdated ? page.lastUpdated : PRIVACY_LAST_UPDATED;

  return (
    <div className="mx-auto max-w-[760px] px-(--gutter) pt-36 pb-(--section)">
      <h1 className="text-[clamp(30px,4vw,48px)]">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: {formatDate(lastUpdated)}</p>

      <div className="mt-12 space-y-6 text-charcoal/85 [&_a]:text-honey-deep [&_a]:underline [&_h2]:pt-8 [&_h2]:text-2xl [&_strong]:font-bold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        <PortableText value={body} components={components} />
      </div>

      <p className="mt-14">
        <Link href="/" className="font-display border-b-[1.5px] border-honey pb-1.5 text-[19px] text-forest transition-colors hover:text-honey-deep">
          &lsaquo; Back to home
        </Link>
      </p>
    </div>
  );
}
