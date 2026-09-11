import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { portfolioImagesQuery } from "@/sanity/lib/queries";
import type { PortfolioImage } from "@/sanity/lib/types";
import { portfolioContent } from "@/lib/content";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PageHero } from "@/components/sections";
import { Cta } from "@/components/Cta";

export const metadata: Metadata = {
  title: portfolioContent.seoTitle,
  description: portfolioContent.seoDescription,
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const images = await sanityFetch<PortfolioImage[]>(
    portfolioImagesQuery,
    {},
    ["portfolioImage"],
  );

  return (
    <>
      <PageHero
        image={images?.[0]?.image}
        eyebrow={portfolioContent.heroEyebrow}
        heading={portfolioContent.heroHeading}
        standfirst={portfolioContent.heroStandfirst}
      />

      <section className="mx-auto max-w-[1200px] px-(--gutter) py-(--section)">
        {images && images.length > 0 ? (
          <PortfolioGrid images={images} />
        ) : (
          <p className="text-muted">
            Photographs are on their way — add them in the Studio under
            Portfolio images.
          </p>
        )}
      </section>

      <section className="bg-forest px-(--gutter) py-(--section) text-center">
        <h2 className="mx-auto max-w-[20ch] text-linen text-[clamp(26px,3.2vw,42px)]">
          Whatever chapter you are in.
        </h2>
        <div className="mt-10 flex justify-center">
          <Cta href="/enquire" tone="onDark">Enquire about a session</Cta>
        </div>
      </section>
    </>
  );
}
