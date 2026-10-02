import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { enquirePageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { EnquirePage, SiteSettings } from "@/sanity/lib/types";
import { enquireContent } from "@/lib/content";
import { EnquiryForm } from "@/components/EnquiryForm";
import { IntrinsicPhoto } from "@/components/Photo";
import { Label, PageHero } from "@/components/sections";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<EnquirePage>(enquirePageQuery, {}, ["enquirePage"]);
  return {
    title: page?.seoTitle ?? enquireContent.seoTitle,
    description: page?.seoDescription ?? enquireContent.seoDescription,
    alternates: { canonical: "/enquire" },
  };
}

export default async function EnquirePage() {
  const [page, settings] = await Promise.all([
    sanityFetch<EnquirePage>(enquirePageQuery, {}, ["enquirePage"]),
    sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]),
  ]);

  const contactEmail = settings?.contactEmail ?? site.email;
  const instagramHandle = settings?.instagramHandle ?? site.instagram;
  const instagramUrl = settings?.instagramUrl ?? site.instagramUrl;
  const locationText = settings?.locationText ?? site.region;

  return (
    <>
      <PageHero
        eyebrow={enquireContent.heroEyebrow}
        heading={enquireContent.heroHeading}
        standfirst={enquireContent.heroStandfirst}
        headingMax="15ch"
      />

      <section className="px-(--gutter) pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,10vw,120px)]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(32px,4vw,64px)]">
          <EnquiryForm />

          <aside className="min-w-0">
            {page?.asideImage?.asset && (
              <IntrinsicPhoto
                photo={page.asideImage}
                sizes="(max-width: 768px) 100vw, 460px"
                className="mb-8 h-auto w-full"
              />
            )}
            <Label>Or reach me directly</Label>
            <p className="mt-4">
              <a href={`mailto:${contactEmail}`} className="hover:text-honey-deep">
                {contactEmail}
              </a>
            </p>
            <p className="mt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-honey-deep"
              >
                @{instagramHandle}
              </a>
            </p>
            <p className="mt-6 max-w-[34ch] text-[15px] text-muted">
              Photographing across {locationText}, London and further afield.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
