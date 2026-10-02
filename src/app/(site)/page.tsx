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
import { ApproachSection, Eyebrow, QuoteBlock } from "@/components/sections";
import { toParagraphs } from "@/lib/text";

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
    sanityFetch<HomePage>(homePageQuery, {}, ["homePage", "testimonial"]),
    sanityFetch<SessionType[]>(sessionTypesQuery, {}, ["sessionType"]),
    sanityFetch<PortfolioImage[]>(featuredImagesQuery, {}, ["portfolioImage"]),
    sanityFetch<Testimonial[]>(testimonialsQuery, {}, ["testimonial"]),
  ]);

  const sessionTypes = types?.length ? types : (defaultSessionTypes as SessionType[]);
  const testimonial =
    page?.testimonial ?? testimonials?.[0] ?? (defaultTestimonials[0] as Testimonial);

  return (
    <>
      {/* ---------- Hero: the photograph whole, framed on the sides only (the nav sits on top) ---------- */}
      {page?.heroImage?.asset && (
        <section className="px-[clamp(12px,1.6vw,20px)]">
          <IntrinsicPhoto
            photo={page.heroImage}
            sizes="100vw"
            priority
            className="block h-auto w-full"
          />
        </section>
      )}

      <section className="px-(--gutter) pt-[clamp(48px,7vw,88px)] text-center">
        <span className="inline-flex items-center gap-2.5 text-honey-deep">
          <span aria-hidden className="h-0.5 w-6 bg-honey" />
          <span className="text-xs font-black tracking-[0.2em] uppercase">
            Hertfordshire &amp; London
          </span>
          <span aria-hidden className="h-0.5 w-6 bg-honey" />
        </span>
        <h1 className="mx-auto mt-[18px] mb-3.5 max-w-[22ch] text-[clamp(28px,3.6vw,48px)] leading-[1.12]">
          {page?.heroHeading ?? homeContent.heroHeading}
        </h1>
        <p>{page?.heroSubline ?? homeContent.heroSubline}</p>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="px-(--gutter) py-(--section-lg)">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(32px,5vw,80px)]">
          <div className="min-w-0">
            <h2 className="mb-6 text-[clamp(28px,3.4vw,45px)]">
              {page?.introHeading ?? homeContent.introHeading}
            </h2>
            <div className="mb-8 space-y-5 text-charcoal/85">
              {toParagraphs(page?.introBody ?? homeContent.introBody).map((para, i) => (
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
      <section className="bg-linen-soft px-(--gutter) py-[clamp(64px,9vw,112px)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-[clamp(32px,4vw,56px)] flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <Eyebrow>Sessions</Eyebrow>
              <h2 className="mt-4 text-[clamp(26px,3.2vw,43px)]">
                {page?.sessionsHeading ?? homeContent.sessionsHeading}
              </h2>
            </div>
            <TextLink href="/sessions" className="flex-none">
              All session types
            </TextLink>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] items-start gap-[clamp(16px,2vw,28px)]">
            {sessionTypes.map((type) => (
              <li key={type._id}>
                <a href="/sessions" className="group block">
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
                  {/* Title and tagline sit under the photograph, which shows whole. */}
                  <div className="pt-4">
                    <h3 className="text-[22px] leading-[1.25]">{type.title}</h3>
                    <p className="mt-1 text-xs font-black tracking-[0.18em] text-honey-deep uppercase">
                      {type.tagline}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBlock testimonial={testimonial} />

      <ApproachSection
        heading={page?.approachHeading ?? homeContent.approachHeading}
        body={toParagraphs(page?.approachBody ?? homeContent.approachBody)}
        pullQuote={page?.approachPullQuote ?? homeContent.approachPullQuote}
        image={page?.approachImage}
        imageFirst
      />

      {/* ---------- Recent work — hidden until switched on in Sanity ---------- */}
      {page?.showRecentWork === true && featured && featured.length > 0 && (
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
              Two rows of fixed frames, cropped to the design's ratios: a 2:3
              portrait beside a 3:2 landscape, then three portraits. Each frame
              grows by its own aspect ratio, so every frame in a row lands at
              the same height whatever shape the photograph was. Below sm the
              frames stack.
            */}
            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              {featured.slice(0, 2).map((item, i) => {
                const ratio = i === 1 ? 3 / 2 : 2 / 3;
                return (
                  <a
                    key={item._id}
                    href="/portfolio"
                    className="group relative block min-w-0 overflow-hidden sm:[flex:var(--grow)_1_0]"
                    style={{ "--grow": ratio, aspectRatio: ratio } as React.CSSProperties}
                  >
                    <Photo
                      photo={item.image}
                      sizes={i === 1 ? "(max-width: 640px) 100vw, 800px" : "(max-width: 640px) 100vw, 360px"}
                      className="object-cover transition-opacity duration-[240ms] group-hover:opacity-[.92]"
                    />
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              {featured.slice(2, 5).map((item) => (
                <a
                  key={item._id}
                  href="/portfolio"
                  className="group relative block aspect-[2/3] min-w-0 overflow-hidden sm:flex-1"
                >
                  <Photo
                    photo={item.image}
                    sizes="(max-width: 640px) 100vw, 380px"
                    className="object-cover transition-opacity duration-[240ms] group-hover:opacity-[.92]"
                  />
                </a>
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
