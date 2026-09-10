import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  homePageQuery,
  sessionTypesQuery,
  featuredImagesQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import type {
  HomePage,
  SessionType,
  PortfolioImage,
  Testimonial,
} from "@/sanity/lib/types";
import { homeContent, defaultSessionTypes, defaultTestimonials } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { Eyebrow, QuoteBlock, PullQuote, Flourish } from "@/components/sections";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<HomePage>(homePageQuery, {}, ["homePage"]);
  return {
    title: page?.seoTitle ?? homeContent.seoTitle,
    description: page?.seoDescription ?? homeContent.seoDescription,
    alternates: { canonical: "/" },
    openGraph: {
      title: page?.seoTitle ?? homeContent.seoTitle,
      description: page?.seoDescription ?? homeContent.seoDescription,
      url: "/",
    },
  };
}

export default async function HomePageRoute() {
  const [page, types, featured, testimonials] = await Promise.all([
    sanityFetch<HomePage>(homePageQuery, {}, ["homePage"]),
    sanityFetch<SessionType[]>(sessionTypesQuery, {}, ["sessionType"]),
    sanityFetch<PortfolioImage[]>(featuredImagesQuery, {}, ["portfolioImage"]),
    sanityFetch<Testimonial[]>(testimonialsQuery, {}, ["testimonial"]),
  ]);

  const sessionTypes = types?.length ? types : (defaultSessionTypes as SessionType[]);
  const testimonial =
    testimonials?.[0] ?? (defaultTestimonials[0] as Testimonial);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-forest">
        {page?.heroImage?.asset ? (
          <Photo photo={page.heroImage} sizes="100vw" priority alt="" />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/45 to-forest/10"
        />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-24 lg:px-10 lg:pb-32">
          <Eyebrow tone="straw">Hertfordshire &amp; London</Eyebrow>
          <h1 className="mt-6 max-w-[20ch] text-linen text-[clamp(34px,5vw,68px)]">
            {page?.heroHeading ?? homeContent.heroHeading}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-linen/80">
            {page?.heroSubline ?? homeContent.heroSubline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Cta href="/enquire">Book a session</Cta>
            <Cta href="/portfolio" variant="ghost">
              See the portfolio
            </Cta>
          </div>
        </div>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-(--spacing-section) lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          <Reveal>
            <Eyebrow>{page?.introEyebrow ?? homeContent.introEyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3.4vw,45px)]">
              {page?.introHeading ?? homeContent.introHeading}
            </h2>
            <Flourish className="mt-7 text-straw" />
            <div className="mt-7 space-y-5 text-charcoal/85">
              {(page?.introBody ?? homeContent.introBody).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <Link
              href="/about"
              className="eyebrow mt-9 inline-block text-terracotta hover:text-terracotta-hover"
            >
              Meet Cam &rarr;
            </Link>
          </Reveal>

          {page?.introImage?.asset && (
            <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Photo
                photo={page.introImage}
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- Session types ---------- */}
      <section className="bg-forest px-6 py-(--spacing-section) lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow tone="straw">Sessions</Eyebrow>
              <h2 className="mt-5 text-linen text-[clamp(26px,3.2vw,43px)]">
                {homeContent.sessionsHeading}
              </h2>
            </div>
            <Link
              href="/sessions"
              className="eyebrow text-straw hover:text-linen"
            >
              All session types &rarr;
            </Link>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {sessionTypes.map((type, i) => (
              <Reveal as="li" key={type._id} delay={i * 100}>
                <Link
                  href="/sessions"
                  className="group block overflow-hidden rounded-xl bg-forest-hover transition-transform duration-300 hover:-translate-y-[3px]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {type.image?.asset ? (
                      <Photo
                        photo={type.image}
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linen/5" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-linen">{type.title}</h3>
                    <p className="mt-1 text-sm text-straw">{type.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 max-w-[62ch] text-linen/70">
            <p>{homeContent.sessionsNote}</p>
          </Reveal>
        </div>
      </section>

      <QuoteBlock testimonial={testimonial} />

      {/* ---------- Approach ---------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-(--spacing-section) lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          {page?.approachImage?.asset && (
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-xl lg:order-1">
              <Photo
                photo={page.approachImage}
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </Reveal>
          )}
          <Reveal className="lg:order-2">
            <Eyebrow>My approach</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3.4vw,45px)]">
              {page?.approachHeading ?? homeContent.approachHeading}
            </h2>
            <div className="mt-7 space-y-5 text-charcoal/85">
              {(page?.approachBody ?? homeContent.approachBody).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-8 border-l-2 border-straw pl-6">
              <PullQuote>
                {page?.approachPullQuote ?? homeContent.approachPullQuote}
              </PullQuote>
            </div>
            <Link
              href="/about"
              className="eyebrow mt-9 inline-block text-terracotta hover:text-terracotta-hover"
            >
              More about my approach &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Recent work ---------- */}
      {featured && featured.length > 0 && (
        <section className="px-6 pb-(--spacing-section) lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>{homeContent.recentWorkEyebrow}</Eyebrow>
                <h2 className="mt-5 text-[clamp(26px,3.2vw,43px)]">
                  {homeContent.recentWorkHeading}
                </h2>
              </div>
              <Link href="/portfolio" className="eyebrow text-terracotta hover:text-terracotta-hover">
                See the portfolio &rarr;
              </Link>
            </Reveal>

            <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
              {featured.slice(0, 8).map((item, i) => (
                <Reveal as="li" key={item._id} delay={i * 60}>
                  <Link
                    href="/portfolio"
                    className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
                  >
                    <Photo
                      photo={item.image}
                      sizes="(max-width: 768px) 50vw, 280px"
                      className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Closing ---------- */}
      <section className="relative overflow-hidden bg-forest">
        {page?.closingImage?.asset && (
          <>
            <Photo photo={page.closingImage} sizes="100vw" alt="" className="object-cover opacity-45" />
            <div aria-hidden className="absolute inset-0 bg-forest/55" />
          </>
        )}
        <Reveal className="relative mx-auto max-w-[820px] px-6 py-(--spacing-section) text-center lg:px-10">
          <Eyebrow tone="straw">Let&rsquo;s do this</Eyebrow>
          <h2 className="mt-6 text-linen text-[clamp(28px,3.6vw,47px)]">
            {page?.closingHeading ?? homeContent.closingHeading}
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-linen/80">
            {page?.closingBody ?? homeContent.closingBody}
          </p>
          <div className="mt-10 flex justify-center">
            <Cta href="/enquire">Enquire about a session</Cta>
          </div>
        </Reveal>
      </section>
    </>
  );
}
