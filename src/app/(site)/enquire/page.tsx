import type { Metadata } from "next";
import { enquireContent } from "@/lib/content";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: enquireContent.seoTitle,
  description: enquireContent.seoDescription,
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <>
      <PageHero
        eyebrow={enquireContent.heroEyebrow}
        heading={enquireContent.heroHeading}
        standfirst={enquireContent.heroStandfirst}
      />

      <section className="mx-auto max-w-[1200px] px-(--gutter) py-(--section)">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <EnquiryForm />

          <aside className="lg:pt-4">
            <h2 className="text-xl">Or reach me directly</h2>
            <ul className="mt-6 space-y-4 text-charcoal/85">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-terracotta">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta"
                >
                  @{site.instagram}
                </a>
              </li>
            </ul>
            <p className="mt-8 max-w-[34ch] text-sm text-muted">
              Based in Hertfordshire, photographing across London and further
              afield.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
