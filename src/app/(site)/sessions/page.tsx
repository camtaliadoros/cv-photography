import type { Metadata } from "next";
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
import { Cta } from "@/components/Cta";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Eyebrow, Label, PageHero, QuoteBlock, Statement } from "@/components/sections";
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
        headingMax="15ch"
      />

      {/* ---------- Intro: set large, in Lora ---------- */}
      <section className="px-(--gutter) py-[clamp(64px,9vw,120px)]">
        <p className="font-display mx-auto max-w-[860px] text-[clamp(24px,3vw,40px)] leading-[1.2] text-forest">
          {page?.introBody ?? sessionsContent.introBody}
        </p>
      </section>

      {/* ---------- Session types: words only, no photographs ---------- */}
      <section className="px-(--gutter) pb-[clamp(64px,9vw,112px)]">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>{sessionsContent.typesEyebrow}</Eyebrow>
          <h2 className="mt-4 mb-[clamp(28px,4vw,48px)] text-[clamp(26px,3.2vw,42px)]">
            {sessionsContent.typesHeading}
          </h2>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(20px,2.6vw,36px)]">
            {sessionTypes.map((type) => (
              <li key={type._id} className="min-w-0">
                <h3 className="mb-2 text-2xl">{type.title}</h3>
                <Label className="mb-3">{type.tagline}</Label>
                <p className="text-base text-charcoal/85">{type.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="bg-linen-soft px-(--gutter) py-(--section-lg)">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(32px,5vw,72px)]">
          <div className="min-w-0">
            <Eyebrow>My approach</Eyebrow>
            <h2 className="mt-4 text-[clamp(28px,3.4vw,45px)]">
              {page?.approachHeading ?? sessionsContent.approachHeading}
            </h2>
          </div>
          <div className="min-w-0">
            {(page?.approachBody ?? sessionsContent.approachBody).map((para, i) => (
              <p key={i} className="mb-5 max-w-[52ch] text-charcoal/85">
                {para}
              </p>
            ))}
            <Statement className="mt-8 mb-8">
              {page?.approachPullQuote ?? sessionsContent.approachPullQuote}
            </Statement>
            <Cta href="/about" size="small" rule="straw">
              More about me
            </Cta>
          </div>
        </div>
      </section>

      {/* ---------- Investment ---------- */}
      <section className="px-(--gutter) pt-(--section-lg) pb-[clamp(56px,7vw,88px)]">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>{sessionsContent.priceEyebrow}</Eyebrow>
          <h2 className="mt-4 mb-[clamp(28px,4vw,48px)] text-[clamp(26px,3.2vw,42px)]">
            {page?.priceHeading ?? sessionsContent.priceHeading}
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(20px,2.6vw,32px)] items-start">
            {/* The price itself sits on forest. */}
            <div className="rounded-[14px] bg-forest p-[clamp(28px,4vw,52px)]">
              <Label tone="straw">Every session</Label>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-[clamp(48px,6vw,72px)] leading-none font-extrabold text-linen">
                  {priceIntro}
                </span>
                {priceIntro && priceStandard && (
                  <span className="text-[22px] font-medium text-straw">
                    {priceStandard}
                  </span>
                )}
              </div>
              {(page?.priceIntroLabel ?? sessionsContent.priceIntroLabel) && (
                <p className="mt-4 inline-block rounded-full bg-linen px-4 py-[7px] text-xs font-extrabold tracking-[0.18em] text-terracotta uppercase">
                  {page?.priceIntroLabel ?? sessionsContent.priceIntroLabel}
                </p>
              )}
              <p className="mt-5 max-w-[44ch] text-base text-linen/85">
                {page?.priceIntroNote ?? sessionsContent.priceIntroNote}
              </p>

              <ul className="mt-6 flex flex-col gap-3.5 border-t border-straw/35 pt-6">
                {includes.map((line, i) => (
                  <li key={i} className="text-base text-linen/90">
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Cta href="/enquire" tone="onDark">
                  Enquire about a session
                </Cta>
              </div>
            </div>

            {/* Notes stack alongside it. */}
            <ul className="flex flex-col gap-[clamp(16px,2vw,24px)]">
              {notes.map((note, i) => (
                <li
                  key={i}
                  className="rounded-[14px] border border-linen-deep bg-linen-soft p-[clamp(24px,3vw,40px)]"
                >
                  <Label className="mb-3">{note.heading}</Label>
                  <p className="text-base text-charcoal/85">{toPlainText(note.body)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <QuoteBlock testimonial={testimonial} image={page?.testimonialImage} />

      {/* ---------- FAQ ---------- */}
      {faqs && faqs.length > 0 && (
        <section className="px-(--gutter) pt-(--section-lg) pb-[clamp(72px,10vw,120px)]">
          <div className="mx-auto max-w-[820px]">
            <Eyebrow>{sessionsContent.faqEyebrow}</Eyebrow>
            <h2 className="mt-4 mb-[clamp(20px,3vw,36px)] text-[clamp(26px,3.2vw,42px)]">
              {sessionsContent.faqHeading}
            </h2>

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

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <p className="text-muted">Something I haven&rsquo;t covered?</p>
              <Cta href="/enquire">Ask me</Cta>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
