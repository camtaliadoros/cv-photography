import type { Metadata } from "next";
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
import { Photo, IntrinsicPhoto } from "@/components/Photo";
import { Cta, TextLink } from "@/components/Cta";
import { Eyebrow, QuoteBlock, Statement } from "@/components/sections";

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
  const testimonial = testimonials?.[0] ?? (defaultTestimonials[0] as Testimonial);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative h-svh min-h-[600px] w-full overflow-hidden bg-forest">
        {page?.heroImage?.asset ? (
          <Photo
            photo={page.heroImage}
            sizes="100vw"
            priority
            alt=""
            className="object-cover object-[center_35%]"
          />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,53,39,.6)_0%,rgba(42,53,39,.1)_22%,rgba(42,53,39,0)_42%,rgba(42,53,39,.55)_100%)]"
        />

        <div className="absolute bottom-(--hero-bottom) left-(--gutter) max-w-[min(34ch,calc(100%-120px))]">
          <span className="inline-flex items-center gap-2.5 text-straw">
            <span aria-hidden className="h-[1.5px] w-6 bg-current" />
            <span className="text-[10px] font-extrabold tracking-[0.24em] uppercase">
              Hertfordshire &amp; London
            </span>
          </span>
          {/*
            The design sets this line as a paragraph, which would leave the home
            page with no h1. Rendered as an h1 at the design's exact size —
            visually identical, and the page keeps a heading.
          */}
          <h1 className="mt-3.5 font-display text-[clamp(19px,1.9vw,26px)] leading-[1.3] tracking-[-0.01em] text-linen">
            {page?.heroHeading ?? homeContent.heroHeading}
          </h1>
          <p className="mt-2.5 text-sm tracking-[0.01em] text-linen/80">
            {page?.heroSubline ?? homeContent.heroSubline}
          </p>
        </div>

        <div className="absolute right-(--gutter) bottom-7 flex animate-[cvFloat_2.8s_ease-in-out_infinite] flex-col items-center gap-2.5 text-linen">
          <span className="text-[10px] font-extrabold tracking-[0.24em] uppercase">
            Scroll
          </span>
          <span
            aria-hidden
            className="h-11 w-px bg-[linear-gradient(var(--warm-linen),transparent)]"
          />
        </div>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="px-(--gutter) py-(--section-lg)">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(32px,5vw,80px)]">
          <div className="min-w-0">
            <Eyebrow>{page?.introEyebrow ?? homeContent.introEyebrow}</Eyebrow>
            <h2 className="mt-5 mb-6 text-[clamp(28px,3.4vw,45px)]">
              {page?.introHeading ?? homeContent.introHeading}
            </h2>
            <div className="mb-8 space-y-5 text-charcoal/85">
              {(page?.introBody ?? homeContent.introBody).map((para, i) => (
                <p key={i} className="max-w-[52ch]">
                  {para}
                </p>
              ))}
            </div>
            <TextLink href="/about">Meet Cam</TextLink>
          </div>

          {/* Two images, the first dropped down — the offset is part of the design. */}
          {(page?.introImage?.asset || page?.introImageSecondary?.asset) && (
            <div className="grid min-w-0 grid-cols-2 gap-4">
              <div className="mt-[clamp(20px,4vw,56px)]">
                <IntrinsicPhoto
                  photo={page?.introImage}
                  sizes="(max-width: 768px) 50vw, 280px"
                />
              </div>
              <IntrinsicPhoto
                photo={page?.introImageSecondary}
                sizes="(max-width: 768px) 50vw, 280px"
              />
            </div>
          )}
        </div>
      </section>

      {/* ---------- Session types ---------- */}
      <section className="bg-linen-soft px-(--gutter) py-(--section)">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-[clamp(32px,4vw,56px)] flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <Eyebrow>Sessions</Eyebrow>
              <h2 className="mt-4 text-[clamp(26px,3.2vw,43px)]">
                {homeContent.sessionsHeading}
              </h2>
            </div>
            <TextLink href="/sessions" className="flex-none">
              All session types
            </TextLink>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] items-start gap-[clamp(16px,2vw,28px)]">
            {sessionTypes.map((type) => (
              <li key={type._id}>
                <a href="/sessions" className="group relative block overflow-hidden">
                  {type.image?.asset ? (
                    <IntrinsicPhoto
                      photo={type.image}
                      sizes="(max-width: 768px) 100vw, 380px"
                      alt=""
                      className="h-auto w-full transition-opacity duration-[240ms] group-hover:opacity-[.92]"
                    />
                  ) : (
                    <div className="aspect-[4/5] w-full bg-linen-deep" />
                  )}
                  {/* Title and tagline sit inside the frame, over a gradient. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,53,39,0)_42%,rgba(42,53,39,.78)_100%)]"
                  />
                  <div className="absolute right-5 bottom-[18px] left-5">
                    <h3 className="text-[22px] leading-[1.25] text-linen">
                      {type.title}
                    </h3>
                    <p className="mt-1 text-xs font-extrabold tracking-[0.18em] text-straw uppercase">
                      {type.tagline}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-[clamp(28px,4vw,44px)] max-w-[62ch] text-center text-muted">
            {homeContent.sessionsNote}
          </p>
        </div>
      </section>

      <QuoteBlock testimonial={testimonial} image={page?.testimonialImage} variant="home" />

      {/* ---------- Approach ---------- */}
      <section className="px-(--gutter) py-(--section-lg)">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(32px,5vw,80px)]">
          {page?.approachImage?.asset && (
            <div className="min-w-0 lg:order-1">
              <IntrinsicPhoto
                photo={page.approachImage}
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          )}
          <div className="min-w-0 lg:order-2">
            <Eyebrow>My approach</Eyebrow>
            <h2 className="mt-5 mb-6 text-[clamp(28px,3.4vw,45px)]">
              {page?.approachHeading ?? homeContent.approachHeading}
            </h2>
            <div className="space-y-5 text-charcoal/85">
              {(page?.approachBody ?? homeContent.approachBody).map((para, i) => (
                <p key={i} className="max-w-[52ch]">
                  {para}
                </p>
              ))}
            </div>
            <Statement className="mt-8">
              {page?.approachPullQuote ?? homeContent.approachPullQuote}
            </Statement>
            <TextLink href="/about" className="mt-8">
              More about my approach
            </TextLink>
          </div>
        </div>
      </section>

      {/* ---------- Recent work ---------- */}
      {featured && featured.length > 0 && (
        <section className="bg-forest py-[clamp(72px,10vw,120px)]">
          <div className="mx-auto max-w-[1200px] px-(--gutter)">
            <div className="mb-[clamp(28px,4vw,44px)] flex flex-wrap items-end justify-between gap-5">
              <div className="min-w-0">
                <Eyebrow tone="straw">{homeContent.recentWorkEyebrow}</Eyebrow>
                <h2 className="mt-4 text-linen text-[clamp(26px,3.2vw,43px)]">
                  {homeContent.recentWorkHeading}
                </h2>
              </div>
              <Cta href="/portfolio" tone="onDark" size="compact" className="flex-none">
                See the portfolio
              </Cta>
            </div>

            {/*
              Two rows with weighted widths rather than an even grid — the
              second frame on the top row runs wide, the bottom row splits
              evenly. The ratios come straight from the design.
            */}
            <div className="mb-4 flex flex-wrap gap-4">
              {featured.slice(0, 2).map((item, i) => (
                <div
                  key={item._id}
                  className="min-w-[180px]"
                  style={{ flex: `${i === 1 ? 1.5 : 0.667} 1 0` }}
                >
                  <a href="/portfolio" className="group block overflow-hidden">
                    <IntrinsicPhoto
                      photo={item.image}
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="h-auto w-full transition-opacity duration-[240ms] group-hover:opacity-[.92]"
                    />
                  </a>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {featured.slice(2, 5).map((item) => (
                <div key={item._id} className="min-w-[180px] flex-[0.667_1_0]">
                  <a href="/portfolio" className="group block overflow-hidden">
                    <IntrinsicPhoto
                      photo={item.image}
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="h-auto w-full transition-opacity duration-[240ms] group-hover:opacity-[.92]"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Closing ---------- */}
      <section className="relative overflow-hidden bg-moss">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(32px,5vw,72px)] px-(--gutter) py-[clamp(72px,10vw,128px)]">
          <div className="min-w-0">
            <Eyebrow tone="straw">Let&rsquo;s do this</Eyebrow>
            <h2 className="mt-5 mb-6 text-linen text-[clamp(28px,3.6vw,47px)] leading-[1.08]">
              {page?.closingHeading ?? homeContent.closingHeading}
            </h2>
            <p className="mb-[34px] max-w-[46ch] text-linen/[.88]">
              {page?.closingBody ?? homeContent.closingBody}
            </p>
            <Cta href="/enquire" tone="onDark">
              Enquire about a session
            </Cta>
          </div>

          {page?.closingImage?.asset && (
            <div className="min-w-0">
              <IntrinsicPhoto
                photo={page.closingImage}
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
