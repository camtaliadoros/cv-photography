import type { Metadata } from "next";
import Script from "next/script";
import { Lato, Lora } from "next/font/google";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";
import { site } from "@/lib/site";
import "./globals.css";

// Two faces only. Lora (roman and italic, 400) for headlines, buttons, links
// and quotes; Lato for everything else — 400 for body, 900 for the loud voice.
const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

// 700 is only for <strong> inside body copy.
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]);
  const brandName = settings?.brandName ?? site.name;
  const locationText = settings?.locationText ?? site.region;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${brandName} — Family & Motherhood Photographer in ${locationText}`,
      template: `%s | ${brandName}`,
    },
    description:
      "Maternity, newborn and family photographer in Hertfordshire, for families who feel it all — the chaos and the giggles included. Story-led sessions across St Albans, Harpenden and London.",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: brandName,
      url: site.url,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]);
  const brandName = settings?.brandName ?? site.name;
  const contactEmail = settings?.contactEmail ?? site.email;
  const locationText = settings?.locationText ?? site.region;
  const instagramUrl = settings?.instagramUrl ?? site.instagramUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: brandName,
    image: `${site.url}/opengraph-image`,
    url: site.url,
    email: contactEmail,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      addressRegion: locationText,
      addressCountry: "GB",
    },
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    sameAs: [instagramUrl],
    knowsAbout: [
      "Family photography",
      "Newborn photography",
      "Maternity photography",
    ],
  };

  return (
    <html lang="en-GB" className={`${lora.variable} ${lato.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-6 focus:py-3 focus:text-linen"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          Plausible: no cookies, no personal data, ~1KB. Deferred so it never
          competes with the hero image for bandwidth.
        */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            strategy="afterInteractive"
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
