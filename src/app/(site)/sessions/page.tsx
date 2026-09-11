import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  sessionsPageQuery,
  sessionTypesQuery,
  faqsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import type {
  SessionsPage,
  SessionType,
  FaqItem,
  Testimonial,
} from "@/sanity/lib/types";
import { sessionsContent, defaultSessionTypes, defaultTestimonials } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { Cta } from "@/components/Cta";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Eyebrow, PageHero, QuoteBlock, PullQuote } from "@/components/sections";
import { site } from "@/lib/site";
import { toPlainText } from "@/lib/text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<SessionsPage>(sessionsPageQuery, {}, ["sessionsPage"]);
  return {
    title: page?.seoTitle ?? sessionsContent.seoTitle,
    description: page?.seoDescription ?? sessionsContent.seoDescription,
    alternates: { canonical: "/sessions" },
  };
}

export default async function SessionsPageRoute() {
  const [page, types, faqs, testimonials] = await Promise.all([
    sanityFetch<SessionsPage>(sessionsPageQuery, {}, ["sessionsPage"]),
    sanityFetch<SessionType[]>(sessionTypesQuery, {}, ["sessionType"]),
    sanityFetch<FaqItem[]>(faqsQuery, {}, ["faqItem"]),
    sanityFetch<Testimonial[]>(testimonialsQuery, {}, ["testimonial"]),
  ]);

  const sessionTypes = types?.length ? types : (defaultSessionTypes as SessionType[]);
  const testimonial = testimonials?.[0] ?? (defaultTestimonials[0] as Testimonial);
  const priceIntro = page?.priceIntro ?? sessionsContent.priceIntro;
  const priceStandard = page?.priceStandard ?? sessionsContent.priceStandard;
  const includes = page?.priceIncludes ?? sessionsContent.priceIncludes;
  const notes = page?.priceNotes ?? sessionsContent.priceNotes;

  // Rich results for a local service: Google shows the price range and area
  // served straight in the SERP for queries like "family photographer st albans".
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Family & Motherhood Photography Sessions",
    serviceType: "Photography",
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      email: site.email,
      url: site.url,
      address: { "@type": "PostalAddress", addressRegion: "Hertfordshire", addressCountry: "GB" },
    },
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    offers: {
      "@type": "Offer",
      price: (priceIntro ?? priceStandard ?? "").replace(/[^0-9.]/g, ""),
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        image={page?.heroImage}
        eyebrow={page?.heroEyebrow ?? sessionsContent.heroEyebrow}
        heading={page?.heroHeading ?? sessionsContent.heroHeading}
        standfirst={page?.heroStandfirst ?? sessionsContent.heroStandfirst}
      />

      <section className="mx-auto max-w-[860px] px-(--gutter) py-(--section)">
        <div>
          <p className="text-lg text-charcoal/85">
            {page?.introBody ?? sessionsContent.introBody}
          </p>
        </div>
      </section>

      {/* ---------- Session types ---------- */}
      <section className="mx-auto max-w-[1200px] px-(--gutter) pb-(--section)">
        <div>
          <Eyebrow>{sessionsContent.typesEyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(26px,3.2vw,42px)]">
            {sessionsContent.typesHeading}
          </h2>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {sessionTypes.map((type, i) => (
            <li key={type._id}>
              <article className="h-full overflow-hidden border border-linen-deep bg-linen-soft">
                <div className="relative aspect-[4/5]">
                  {type.image?.asset ? (
                    <Photo photo={type.image} sizes="(max-width: 768px) 100vw, 380px" />
                  ) : (
                    <div className="absolute inset-0 bg-linen-deep" />
                  )}
                </div>
                <div className="p-7">
                  <h3 className="text-2xl">{type.title}</h3>
                  <p className="mt-2 text-sm text-terracotta">{type.tagline}</p>
                  <p className="mt-4 text-sm text-charcoal/85">{type.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="mx-auto max-w-[1200px] px-(--gutter) pb-(--section)">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div>
            <Eyebrow>My approach</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3.4vw,45px)]">
              {page?.approachHeading ?? sessionsContent.approachHeading}
            </h2>
            <div className="mt-7 space-y-5 text-charcoal/85">
              {(page?.approachBody ?? sessionsContent.approachBody).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-8 border-l-2 border-straw pl-6">
              <PullQuote>
                {page?.approachPullQuote ?? sessionsContent.approachPullQuote}
              </PullQuote>
            </div>
            <Cta href="/about" size="small" className="mt-8">
              More about me
            </Cta>
          </div>
          {page?.approachImage?.asset && (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo photo={page.approachImage} sizes="(max-width: 1024px) 100vw, 560px" />
            </div>
          )}
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="bg-linen-soft px-(--gutter) py-(--section)">
        <div className="mx-auto max-w-[1200px]">
          <div>
            <Eyebrow>{sessionsContent.priceEyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(26px,3.2vw,42px)]">
              {page?.priceHeading ?? sessionsContent.priceHeading}
            </h2>
          </div>

          <div className="mt-12 grid gap-10 rounded-[14px] border border-linen-deep bg-linen p-8 md:grid-cols-[auto_1fr] md:gap-16 md:p-12">
            <div>
              <p className="text-xs font-extrabold tracking-[0.18em] text-muted uppercase">Every session</p>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-display text-6xl text-forest">{priceIntro}</span>
                {priceIntro && priceStandard && (
                  <span className="font-display text-2xl text-muted line-through">
                    {priceStandard}
                  </span>
                )}
              </div>
              {(page?.priceIntroLabel ?? sessionsContent.priceIntroLabel) && (
                <p className="mt-4 inline-block rounded-full bg-terracotta-tint px-4 py-2 text-xs font-extrabold tracking-[0.18em] text-terracotta uppercase">
                  {page?.priceIntroLabel ?? sessionsContent.priceIntroLabel}
                </p>
              )}
              <p className="mt-5 max-w-[36ch] text-sm text-muted">
                {page?.priceIntroNote ?? sessionsContent.priceIntroNote}
              </p>
            </div>

            <div>
              <ul className="space-y-5">
                {includes.map((line, i) => (
                  <li key={i} className="flex gap-4 text-charcoal/85">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Cta href="/enquire">Enquire about a session</Cta>
              </div>
            </div>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {notes.map((note, i) => (
              <li key={i}>
                <div className="h-full rounded-[14px] border border-linen-deep bg-linen p-7">
                  <h3 className="text-lg">{note.heading}</h3>
                  <p className="mt-3 text-sm text-charcoal/80">{toPlainText(note.body)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBlock testimonial={testimonial} />

      {/* ---------- FAQ ---------- */}
      {faqs && faqs.length > 0 && (
        <section className="mx-auto max-w-[880px] px-(--gutter) py-(--section)">
          <div>
            <Eyebrow>{sessionsContent.faqEyebrow}</Eyebrow>
            <h2 className="mt-5 mb-10 text-[clamp(26px,3.2vw,42px)]">
              {sessionsContent.faqHeading}
            </h2>
          </div>
          <FaqAccordion items={faqs} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: toPlainText(f.answer) },
                })),
              }),
            }}
          />
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <p className="text-charcoal/80">Something I haven&rsquo;t covered?</p>
            <Cta href="/enquire">Ask me</Cta>
          </div>
        </section>
      )}
    </>
  );
}
