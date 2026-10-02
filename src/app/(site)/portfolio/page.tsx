import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { portfolioImagesQuery, portfolioPageQuery } from "@/sanity/lib/queries";
import type { PortfolioImage, PortfolioPage } from "@/sanity/lib/types";
import { portfolioContent } from "@/lib/content";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Eyebrow } from "@/components/sections";
import { Cta } from "@/components/Cta";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<PortfolioPage>(portfolioPageQuery, {}, ["portfolioPage"]);
  return {
    title: page?.seoTitle ?? portfolioContent.seoTitle,
    description: page?.seoDescription ?? portfolioContent.seoDescription,
    alternates: { canonical: "/portfolio" },
  };
}

export default async function PortfolioPage() {
  const [page, images] = await Promise.all([
    sanityFetch<PortfolioPage>(portfolioPageQuery, {}, ["portfolioPage"]),
    sanityFetch<PortfolioImage[]>(portfolioImagesQuery, {}, ["portfolioImage"]),
  ]);

  // The whole page sits on forest — there is no hero photograph here, the
  // photographs in the grid are the point.
  return (
    <div className="bg-forest">
      <section className="px-(--gutter) pt-[200px] pb-[clamp(24px,3vw,40px)]">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow tone="straw">{page?.heroEyebrow ?? portfolioContent.heroEyebrow}</Eyebrow>
          <h1 className="mt-[18px] max-w-[18ch] text-linen text-[clamp(30px,4.2vw,54px)] leading-[1.08]">
            {page?.heroHeading ?? portfolioContent.heroHeading}
          </h1>
        </div>
      </section>

      <section className="px-(--gutter) pb-[clamp(72px,10vw,120px)]">
        <div className="mx-auto max-w-[1200px]">
          {images && images.length > 0 ? (
            <PortfolioGrid images={images} />
          ) : (
            <p className="text-linen/70">
              Photographs are on their way — add them in the Studio under
              Portfolio images.
            </p>
          )}
        </div>

        <div className="mx-auto mt-[clamp(24px,4vw,48px)] flex max-w-[1200px] justify-center">
          <Cta href="/enquire" tone="onDark">
            Enquire about a session
          </Cta>
        </div>
      </section>
    </div>
  );
}
