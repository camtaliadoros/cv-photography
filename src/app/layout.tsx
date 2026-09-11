import type { Metadata } from "next";
import Script from "next/script";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-lora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Family & Motherhood Photographer in Hertfordshire`,
    template: `%s — ${site.name}`,
  },
  description:
    "Maternity, newborn and family photographer in Hertfordshire, for families who feel it all — the chaos and the giggles included. Story-led sessions across St Albans, Harpenden and London.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    image: `${site.url}/opengraph-image`,
    url: site.url,
    email: site.email,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      addressRegion: site.region,
      addressCountry: "GB",
    },
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    sameAs: [site.instagramUrl],
    knowsAbout: [
      "Family photography",
      "Newborn photography",
      "Maternity photography",
    ],
  };

  return (
    <html lang="en-GB" className={`${lora.variable} ${jakarta.variable}`}>
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
