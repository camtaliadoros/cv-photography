import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery } from "@/sanity/lib/queries";
import type { AboutPage } from "@/sanity/lib/types";
import { aboutContent } from "@/lib/content";
import { toParagraphs } from "@/lib/text";
import { IntrinsicPhoto } from "@/components/Photo";
import { Cta } from "@/components/Cta";
import { Eyebrow, SplitHero } from "@/components/sections";

/** Renders `*word*` in an editor-written string as italics. */
function withEmphasis(text: string) {
  return text
    .split(/(\*[^*]+\*)/)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        part
      ),
    );
}

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

  const story = toParagraphs(page?.story?.length ? page.story : aboutContent.story);
  const offCamera = page?.offCameraItems?.length
    ? page.offCameraItems
    : aboutContent.offCameraItems;
  const gallery = (page?.gallery ?? []).filter((photo) => photo?.asset).slice(0, 3);

  return (
    <>
      <SplitHero
        image={page?.heroImage}
        eyebrow={page?.heroEyebrow ?? aboutContent.heroEyebrow}
        heading={page?.heroHeading ?? aboutContent.heroHeading}
        standfirst={page?.heroStandfirst ?? aboutContent.heroStandfirst}
        headingMax="14ch"
      />

      {/* ---------- Story: copy left, an uncropped photograph right ---------- */}
      <section className="px-(--gutter) py-[clamp(64px,9vw,120px)]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[clamp(36px,6vw,96px)]">
          <div className="min-w-0">
            <Eyebrow>{page?.storyEyebrow ?? aboutContent.storyEyebrow}</Eyebrow>
            <h2 className="mt-4 mb-7 max-w-[20ch] text-[clamp(26px,3.2vw,42px)] leading-[1.15] text-pretty">
              {withEmphasis(page?.storyHeading ?? aboutContent.storyHeading)}
            </h2>
            {story.map((para, i) => (
              <p key={i} className="max-w-[52ch] not-last:mb-5">
                {para}
              </p>
            ))}
          </div>
          {page?.storyImage?.asset && (
            <div className="min-w-0">
              <IntrinsicPhoto photo={page.storyImage} sizes="(max-width: 768px) 100vw, 560px" />
            </div>
          )}
        </div>
      </section>

      {/* ---------- Off camera: a ruled list on forest ---------- */}
      <section className="bg-forest px-(--gutter) py-[clamp(64px,9vw,112px)]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(32px,5vw,80px)]">
          <div className="min-w-0">
            <Eyebrow tone="straw">{page?.offCameraEyebrow ?? aboutContent.offCameraEyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-[12ch] text-[clamp(26px,3.2vw,42px)] leading-[1.1] text-linen">
              {page?.offCameraHeading ?? aboutContent.offCameraHeading}
            </h2>
          </div>
          <ul className="min-w-0 border-b border-straw/35">
            {offCamera.map((item, i) => (
              <li
                key={i}
                className="font-display grid grid-cols-[28px_minmax(0,1fr)] items-baseline gap-3.5 border-t border-straw/35 py-5 text-[clamp(19px,1.9vw,23px)] leading-[1.4] text-pretty text-linen"
              >
                <span aria-hidden className="h-0.5 w-4 -translate-y-1.5 bg-straw" />
                <span>
                  {item.text}
                  {item.aside && <span className="text-straw italic"> {item.aside}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        ---------- Three photographs, uncropped ----------
        Each frame grows by its photograph's width ÷ height, so the row lines up
        at one height whatever the mix of shapes. Below sm they stack.
      */}
      {gallery.length > 0 && (
        <section className="px-(--gutter) pt-[clamp(56px,8vw,104px)]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(12px,1.6vw,20px)] sm:flex-row">
            {gallery.map((photo, i) => {
              const ratio =
                photo.dimensions?.width && photo.dimensions?.height
                  ? photo.dimensions.width / photo.dimensions.height
                  : 2 / 3;
              return (
                <div
                  key={i}
                  className="min-w-0 sm:[flex:var(--grow)_1_0]"
                  style={{ "--grow": ratio } as React.CSSProperties}
                >
                  <IntrinsicPhoto photo={photo} sizes="(max-width: 640px) 100vw, 600px" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ---------- Closing quote ---------- */}
      <section className="px-(--gutter) py-[clamp(64px,9vw,120px)]">
        <div className="mx-auto flex max-w-[880px] flex-col items-center gap-[clamp(28px,3.4vw,40px)] text-center">
          <p className="font-display text-[clamp(26px,3.4vw,44px)] leading-[1.28] tracking-[-0.01em] text-balance text-forest italic">
            &ldquo;{page?.closingQuote ?? aboutContent.closingQuote}&rdquo;
          </p>
          <Cta href="/sessions" size="compact">
            See my sessions
          </Cta>
        </div>
      </section>
    </>
  );
}
