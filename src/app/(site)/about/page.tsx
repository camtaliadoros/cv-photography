import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery, testimonialsQuery } from "@/sanity/lib/queries";
import type { AboutPage, Testimonial } from "@/sanity/lib/types";
import { aboutContent, defaultTestimonials } from "@/lib/content";
import { toPlainText } from "@/lib/text";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { Eyebrow, PageHero, QuoteBlock, PullQuote, Flourish } from "@/components/sections";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<AboutPage>(aboutPageQuery, {}, ["aboutPage"]);
  return {
    title: page?.seoTitle ?? aboutContent.seoTitle,
    description: page?.seoDescription ?? aboutContent.seoDescription,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPageRoute() {
  const [page, testimonials] = await Promise.all([
    sanityFetch<AboutPage>(aboutPageQuery, {}, ["aboutPage"]),
    sanityFetch<Testimonial[]>(testimonialsQuery, {}, ["testimonial"]),
  ]);

  const testimonial = testimonials?.[0] ?? (defaultTestimonials[0] as Testimonial);
  const columns = page?.approachColumns ?? aboutContent.approachColumns;

  return (
    <>
      <PageHero
        image={page?.heroImage}
        eyebrow={page?.heroEyebrow ?? aboutContent.heroEyebrow}
        heading={page?.heroHeading ?? aboutContent.heroHeading}
      />

      {/* ---------- Story ---------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-(--spacing-section) lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-24">
          <Reveal>
            <div className="space-y-6 text-lg text-charcoal/85">
              {(page?.story ?? aboutContent.story).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <Flourish className="mt-10 text-straw" />
            <div className="mt-8 border-l-2 border-straw pl-6">
              <PullQuote>
                {page?.storyPullQuote ?? aboutContent.storyPullQuote}
              </PullQuote>
            </div>
          </Reveal>

          {page?.portrait?.asset && (
            <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden rounded-xl lg:sticky lg:top-28">
              <Photo photo={page.portrait} sizes="(max-width: 1024px) 100vw, 460px" />
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="bg-linen-soft px-6 py-(--spacing-section) lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <Eyebrow>My approach</Eyebrow>
            <h2 className="mt-5 text-[clamp(26px,3.2vw,42px)]">
              {page?.approachHeading ?? aboutContent.approachHeading}
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {columns.map((col, i) => (
              <Reveal as="li" key={i} delay={i * 100}>
                <h3 className="text-xl">{col.heading}</h3>
                <p className="mt-4 text-charcoal/85">{toPlainText(col.body)}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 border-l-2 border-straw pl-6">
            <PullQuote>
              {page?.approachPullQuote ?? aboutContent.approachPullQuote}
            </PullQuote>
          </Reveal>
        </div>
      </section>

      <QuoteBlock testimonial={testimonial} />

      <section className="px-6 py-(--spacing-section) text-center lg:px-10">
        <h2 className="mx-auto max-w-[22ch] text-[clamp(26px,3.2vw,42px)]">
          Let&rsquo;s make something real.
        </h2>
        <div className="mt-10 flex justify-center">
          <Cta href="/enquire">Enquire about a session</Cta>
        </div>
      </section>
    </>
  );
}
