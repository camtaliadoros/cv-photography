import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { miniSessionPageQuery } from "@/sanity/lib/queries";
import type { MiniSessionPage } from "@/sanity/lib/types";
import { miniSessionContent } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { Eyebrow, Flourish } from "@/components/sections";
import { site } from "@/lib/site";
import { toPlainText } from "@/lib/text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<MiniSessionPage>(miniSessionPageQuery, {}, [
    "miniSessionPage",
  ]);
  if (page?.enabled === false) return { robots: { index: false, follow: false } };

  return {
    title: page?.seoTitle ?? miniSessionContent.seoTitle,
    description: page?.seoDescription ?? miniSessionContent.seoDescription,
    alternates: { canonical: "/mini-sessions" },
  };
}

export default async function MiniSessionsPage() {
  const page = await sanityFetch<MiniSessionPage>(miniSessionPageQuery, {}, [
    "miniSessionPage",
  ]);

  // Built now, hidden until switched on — and gone the moment the event passes.
  if (page && page.enabled === false) notFound();

  const bookingUrl = page?.bookingUrl ?? site.miniBookingUrl;
  const details = page?.details ?? miniSessionContent.details;
  const notes = page?.priceNotes ?? miniSessionContent.priceNotes;
  const includes = page?.priceIncludes ?? miniSessionContent.priceIncludes;
  const addOns = page?.priceAddOns ?? miniSessionContent.priceAddOns;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-forest">
        {page?.heroImage?.asset ? (
          <Photo photo={page.heroImage} sizes="100vw" priority alt="" />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/50 to-forest/15"
        />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-40 pb-20 lg:px-10">
          <Eyebrow tone="straw">
            {page?.heroEyebrow ?? miniSessionContent.heroEyebrow}
          </Eyebrow>
          <h1 className="mt-6 max-w-[16ch] text-linen text-[clamp(32px,4.4vw,58px)]">
            {page?.heroHeading ?? miniSessionContent.heroHeading}
          </h1>
          <p className="mt-5 text-linen/80">
            {page?.heroStandfirst ?? miniSessionContent.heroStandfirst}
          </p>
          <div className="mt-10">
            <Cta href={bookingUrl} external>Book now</Cta>
          </div>
        </div>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-(--spacing-section) lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <h2 className="text-[clamp(28px,3.4vw,45px)]">
              {page?.introHeading ?? miniSessionContent.introHeading}
            </h2>
            <Flourish className="mt-7 text-straw" />
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-charcoal/85 lg:pt-3">
            {(page?.introBody ?? miniSessionContent.introBody).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>
        </div>

        {page?.gallery && page.gallery.length > 0 && (
          <ul className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
            {page.gallery.map((photo, i) => (
              <Reveal as="li" key={i} delay={i * 80}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Photo photo={photo} sizes="(max-width: 768px) 50vw, 380px" />
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      {/* ---------- Details ---------- */}
      <section className="bg-forest px-6 py-(--spacing-section) lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <Eyebrow tone="straw">The details</Eyebrow>
            <h2 className="mt-5 text-linen text-[clamp(26px,3.2vw,43px)]">
              {page?.detailsHeading ?? miniSessionContent.detailsHeading}
            </h2>
          </Reveal>

          <dl className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {details.map((d, i) => (
              <Reveal key={i} delay={i * 80}>
                <dt className="eyebrow text-straw">{d.label}</dt>
                <dd className="mt-4 text-linen/85">{d.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Price ---------- */}
      <section className="mx-auto max-w-[1200px] px-6 py-(--spacing-section) lg:px-10">
        <Reveal className="grid gap-10 rounded-2xl border border-linen-deep bg-linen-soft p-8 md:grid-cols-[auto_1fr] md:gap-16 md:p-12">
          <div>
            <p className="eyebrow text-muted">
              {page?.priceLabel ?? miniSessionContent.priceLabel}
            </p>
            <p className="mt-4 font-display text-6xl text-forest">
              {page?.price ?? miniSessionContent.price}
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
            {addOns.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {addOns.map((a, i) => (
                  <li key={i} className="rounded-full bg-linen-deep px-4 py-2 text-sm text-charcoal/85">
                    {a}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10">
              <Cta href={bookingUrl} external>Book your slot</Cta>
            </div>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <div className="h-full rounded-xl border border-linen-deep p-7">
                <h3 className="text-lg">{note.heading}</h3>
                <p className="mt-3 text-sm text-charcoal/80">{toPlainText(note.body)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
