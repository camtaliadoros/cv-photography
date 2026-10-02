import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ogImage } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";
import type { HomePage, SanityPhoto } from "@/sanity/lib/types";
import { site } from "@/lib/site";

/**
 * Open Graph for a page with its own share photo. A page's openGraph replaces
 * the layout's outright rather than merging, so the shared fields are repeated
 * here. Falls back to the home hero when the page has no photo yet.
 */
export async function pageOpenGraph(
  path: string,
  photo?: SanityPhoto,
): Promise<Metadata["openGraph"]> {
  const share = photo?.asset
    ? photo
    : (await sanityFetch<HomePage>(homePageQuery, {}, ["homePage"]))?.heroImage;

  return {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    url: path,
    images: ogImage(share),
  };
}
