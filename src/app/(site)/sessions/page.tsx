import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  sessionsPageQuery,
  sessionTypesQuery,
  faqsQuery,
  testimonialsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import type {
  SessionsPage,
  SessionType,
  FaqItem,
  Testimonial,
  SiteSettings,
} from "@/sanity/lib/types";
import { sessionsContent, defaultSessionTypes, defaultTestimonials } from "@/lib/content";
import { Cta, TextLink } from "@/components/Cta";
import { FaqAccordion } from "@/components/FaqAccordion";
import { IntrinsicPhoto } from "@/components/Photo";
import { ApproachSection, Eyebrow, Label, PageHero, QuoteBlock } from "@/components/sections";
import { site } from "@/lib/site";
import { toParagraphs, toPlainText } from "@/lib/text";

// The FAQ section is hidden while its copy is reworked. Flip back to true to
// show it again; the content still lives in Sanity under "FAQs".
const SHOW_FAQS = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<SessionsPage>(sessionsPageQuery, {}, ["sessionsPage"]);
  return {
    title: page?.seoTitle ?? sessionsContent.seoTitle,
    description: page?.seoDescription ?? sessionsContent.seoDescription,
    alternates: { canonical: "/sessions" },
  };
}

export default async function SessionsPageRoute() {
  const [page, types, faqs, testimonials, settings] = await Promise.all([
    sanityFetch<SessionsPage>(sessionsPageQuery, {}, ["sessionsPage", "testimonial"]),
    sanityFetch<SessionType[]>(sessionTypesQuery, {}, ["sessionType"]),
    SHOW_FAQS ? sanityFetch<FaqItem[]>(faqsQuery, {}, ["faqItem"]) : null,
    sanityFetch<Testimonial[]>(testimonialsQuery, {}, ["testimonial"]),
    sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]),
  ]);

  const brandName = settings?.brandName ?? site.name;
  const contactEmail = settings?.contactEmail ?? site.email;
  const locationText = settings?.locationText ?? site.region;

  const sessionTypes = types?.length ? types : (defaultSessionTypes as SessionType[]);
  const testimonial =
    page?.testimonial ?? testimonials?.[0] ?? (defaultTestimonials[0] as Testimonial);
  // The intro offer is optional: once the Sanity document exists, an empty
  // field means "no offer", so don't fall back to the built-in launch copy.
  const intro = page
    ? { price: page.priceIntro, label: page.priceIntroLabel, note: page.priceIntroNote }
    : {
        price: sessionsContent.priceIntro,
        label: sessionsContent.priceIntroLabel,
        note: sessionsContent.priceIntroNote,
      };
  const priceIntro = intro.price;
  const priceStandard = page?.priceStandard ?? sessionsContent.priceStandard;
  const includes = page?.priceIncludes ?? sessionsContent.priceIncludes;
  const notes = page?.priceNotes ?? sessionsContent.priceNotes;
  const reasons = page?.reasons?.length ? page.reasons : sessionsContent.reasons;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Family & Motherhood Photography Sessions",
    serviceType: "Photography",
    provider: {
      "@type": "LocalBusiness",
      name: brandName,
      email: contactEmail,
      url: site.url,
      address: { "@type": "PostalAddress", addressRegion: locationText, addressCountry: "GB" },
    },
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    offers: {
      "@type": "Offer",
      price: (priceIntro || priceStandard || "").replace(/[^0-9.]/g, ""),
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
        images={[page?.heroImage, ...(page?.heroGallery ?? [])]}
        eyebrow={page?.heroEyebrow ?? sessionsContent.heroEyebrow}
        heading={page?.heroHeading ?? sessionsContent.heroHeading}
        standfirst={page?.heroStandfirst ?? sessionsContent.heroStandfirst}
        headingMax="15ch"
      />

      {/* ---------- Why families book: numbered points on forest ---------- */}
      <section className="mt-(--section) bg-forest px-(--gutter) py-[clamp(64px,9vw,112px)]">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow tone="straw">{page?.reasonsEyebrow ?? sessionsContent.reasonsEyebrow}</Eyebrow>
          <h2 className="mt-4 mb-[clamp(40px,5vw,64px)] max-w-[20ch] text-[clamp(26px,3.2vw,42px)] leading-[1.1] text-linen">
            {page?.reasonsHeading ?? sessionsContent.reasonsHeading}
          </h2>

          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-x-[clamp(24px,3vw,44px)] gap-y-[clamp(32px,4vw,56px)]">
            {reasons.map((reason, i) => (
              <li key={i} className="min-w-0 border-t border-straw/40 pt-[22px]">
                <p className="mb-3.5 text-[13px] font-black tracking-[0.2em] text-straw">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2.5 text-[clamp(22px,2.2vw,27px)] leading-[1.2] text-pretty text-linen">
                  {reason.heading}
                </h3>
                <p className="text-base leading-[1.6] text-linen">{toPlainText(reason.body)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/*
        ---------- Session types ----------
        The same photograph each session type uses on the home page, shown here
        uncropped at its own shape, with the words underneath.
      */}
      <section className="px-(--gutter) py-[clamp(64px,9vw,112px)]">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>{page?.typesEyebrow ?? sessionsContent.typesEyebrow}</Eyebrow>
          <h2 className="mt-4 mb-[clamp(28px,4vw,48px)] text-[clamp(26px,3.2vw,42px)]">
            {page?.typesHeading ?? sessionsContent.typesHeading}
          </h2>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-[clamp(20px,2.6vw,36px)]">
            {sessionTypes.map((type) => (
              <li key={type._id} className="min-w-0">
                {type.image?.asset && (
                  <IntrinsicPhoto
                    photo={type.image}
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="mb-5 h-auto w-full"
                  />
                )}
                <h3 className="mb-2 text-2xl">{type.title}</h3>
                <Label className="mb-3">{type.tagline}</Label>
                <p className="text-base text-charcoal/85">{type.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ApproachSection
        className="bg-linen-soft"
        heading={page?.approachHeading ?? sessionsContent.approachHeading}
        body={toParagraphs(page?.approachBody ?? sessionsContent.approachBody)}
        pullQuote={page?.approachPullQuote ?? sessionsContent.approachPullQuote}
        image={page?.approachImage}
        link={<TextLink href="/about">More about me</TextLink>}
      />

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
                <span className="text-[clamp(48px,6vw,72px)] leading-none font-black text-linen">
                  {priceIntro || priceStandard}
                </span>
                {priceIntro && priceStandard && (
                  <span className="text-[22px] text-straw">
                    {priceStandard}
                  </span>
                )}
              </div>
              {priceIntro && intro.label && (
                <p className="mt-4 inline-block rounded-full bg-honey px-4 py-[7px] text-xs font-black tracking-[0.18em] text-forest uppercase">
                  {intro.label}
                </p>
              )}
              {priceIntro && intro.note && (
                <p className="mt-5 max-w-[44ch] text-base text-linen/85">{intro.note}</p>
              )}

              <ul className="mt-6 flex flex-col gap-3.5 border-t border-straw/35 pt-6">
                {includes.map((line, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-base leading-[1.55] text-linen">
                    <span
                      aria-hidden="true"
                      className="mt-px w-[18px] flex-none font-display text-[22px] leading-none text-honey"
                    >
                      ✱
                    </span>
                    <span>{line}</span>
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

      <QuoteBlock testimonial={testimonial} />

      {/* ---------- FAQ ---------- */}
      {SHOW_FAQS && faqs && faqs.length > 0 && (
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
