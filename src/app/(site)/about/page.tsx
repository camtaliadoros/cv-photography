import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery } from "@/sanity/lib/queries";
import type { AboutPage } from "@/sanity/lib/types";
import { aboutContent } from "@/lib/content";
import { IntrinsicPhoto } from "@/components/Photo";
import { PageHero, Quote } from "@/components/sections";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<AboutPage>(aboutPageQuery, {}, ["aboutPage"]);
  return {
    title: page?.seoTitle ?? aboutContent.seoTitle,
    description: page?.seoDescription ?? aboutContent.seoDescription,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPageRoute() {
  const page = await sanityFetch<AboutPage>(aboutPageQuery, {}, ["aboutPage"]);

  const story = page?.story ?? aboutContent.story;
  // The first paragraph doubles as the hero standfirst; the rest form the story.
  const [standfirst, ...body] = story;
  const gallery = page?.gallery ?? [];

  return (
    <>
      <PageHero
        image={page?.heroImage}
        eyebrow={page?.heroEyebrow ?? aboutContent.heroEyebrow}
        heading={page?.heroHeading ?? aboutContent.heroHeading}
        standfirst={standfirst}
        headingMax="14ch"
      />

      {/* ---------- Story ---------- */}
      <section className="px-(--gutter) pt-(--section-lg) pb-[clamp(40px,5vw,64px)]">
        <div className="mx-auto max-w-[720px]">
          {body.map((para, i) => (
            <p key={i} className="mb-[22px] text-charcoal/85">
              {para}
            </p>
          ))}
          <Quote>{page?.storyPullQuote ?? aboutContent.storyPullQuote}</Quote>
        </div>
      </section>

      {/* ---------- Three photographs ---------- */}
      {gallery.length > 0 && (
        <section className="px-(--gutter) pb-[clamp(56px,7vw,96px)]">
          <ul className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-[clamp(12px,1.6vw,20px)]">
            {gallery.slice(0, 3).map((photo, i) => (
              <li key={i}>
                <IntrinsicPhoto
                  photo={photo}
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

    </>
  );
}
