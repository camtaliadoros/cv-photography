import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { miniSessionPageQuery } from "@/sanity/lib/queries";
import type { MiniSessionPage } from "@/sanity/lib/types";
import { miniSessionContent } from "@/lib/content";
import { IntrinsicPhoto } from "@/components/Photo";
import { Cta } from "@/components/Cta";
import { Label, PageHero } from "@/components/sections";
import { site } from "@/lib/site";
import { toParagraphs, toPlainText } from "@/lib/text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<MiniSessionPage>(miniSessionPageQuery, {}, [
    "miniSessionPage",
  ]);
  if (page?.enabled === false) return { robots: { index: false, follow: false } };

  return {
    title: page?.seoTitle ?? miniSessionContent.seoTitle,
    description: page?.seoDescription ?? miniSessionContent.seoDescription,
    alternates: { canonical: "/mini-sessions" },
    openGraph: await pageOpenGraph("/mini-sessions", page?.heroImage),
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
  const [headline, ...rest] = includes;

  return (
    <>
      <PageHero
        images={[page?.heroImage, ...(page?.heroGallery ?? [])]}
        eyebrow={page?.heroEyebrow ?? miniSessionContent.heroEyebrow}
        heading={page?.heroHeading ?? miniSessionContent.heroHeading}
        headingMax="16ch"
      >
        <p className="mx-auto max-w-[50ch] text-[clamp(16px,1.6vw,19px)] text-forest">
          {page?.heroStandfirst ?? miniSessionContent.heroStandfirst}
        </p>
      </PageHero>

      {/* ---------- Intro ---------- */}
      <section className="px-(--gutter) py-(--section)">
        <div className="mx-auto max-w-[720px]">
          <h2 className="mb-[22px] text-[clamp(28px,3.4vw,45px)]">
            {page?.introHeading ?? miniSessionContent.introHeading}
          </h2>
          {toParagraphs(page?.introBody ?? miniSessionContent.introBody).map((para, i) => (
            <p key={i} className="mb-5 max-w-[52ch] text-charcoal/85">
              {para}
            </p>
          ))}
          <Cta href={bookingUrl} external className="mt-3">
            Book now
          </Cta>
        </div>
      </section>

      {/* ---------- Details ---------- */}
      <section className="bg-forest px-(--gutter) py-[clamp(56px,8vw,104px)]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-[clamp(32px,4.5vw,56px)] text-linen text-[clamp(30px,3.4vw,45px)]">
            {page?.detailsHeading ?? miniSessionContent.detailsHeading}
          </h2>

          {/* The first three sit side by side; anything after runs full width,
              label in the first column and the copy across the other two. */}
          <dl className="grid gap-x-[clamp(24px,3vw,32px)] gap-y-[clamp(32px,4.5vw,44px)] md:grid-cols-3">
            {details.map((d, i) =>
              i < 3 ? (
                <div key={i} className="border-t-[1.5px] border-straw pt-[22px]">
                  <dt className="text-xs font-black tracking-[0.18em] text-straw uppercase">
                    {d.label}
                  </dt>
                  <dd className="font-display mt-3.5 text-[clamp(19px,1.9vw,21px)] leading-snug text-linen">
                    {d.value}
                  </dd>
                </div>
              ) : (
                <div
                  key={i}
                  className="grid border-t-[1.5px] border-straw pt-[22px] md:col-span-full md:grid-cols-subgrid"
                >
                  <dt className="text-xs font-black tracking-[0.18em] text-straw uppercase">
                    {d.label}
                  </dt>
                  <dd className="mt-3.5 max-w-[62ch] text-base leading-relaxed text-linen/90 md:col-span-2 md:mt-0">
                    {d.value}
                  </dd>
                </div>
              ),
            )}
          </dl>
        </div>
      </section>

      {/* ---------- Price ---------- */}
      <section className="px-(--gutter) py-(--section)">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(20px,2.6vw,32px)]">
          {/* Moss, rather than the forest used for full sessions. */}
          <div className="rounded-[14px] bg-moss p-[clamp(28px,4vw,52px)]">
            <Label tone="straw">
              {page?.priceLabel ?? miniSessionContent.priceLabel}
            </Label>
            <p className="mt-4 text-[clamp(48px,6vw,72px)] leading-none font-black text-linen">
              {page?.price ?? miniSessionContent.price}
            </p>
            {headline && (
              <p className="mt-5 max-w-[40ch] text-base text-linen/90">{headline}</p>
            )}

            <ul className="mt-6 flex flex-col gap-3.5 border-t border-straw/35 pt-6">
              {[...rest, ...addOns].map((line, i) => (
                <li key={i} className="text-base text-linen/90">
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Cta href={bookingUrl} external tone="onDark">
                Book your slot
              </Cta>
            </div>
          </div>

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
      </section>

      {/* ---------- Gallery ---------- */}
      {page?.gallery && page.gallery.length > 0 && (
        <section className="px-(--gutter) pb-[clamp(72px,10vw,120px)]">
          <ul className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-4">
            {page.gallery.map((photo, i) => (
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
