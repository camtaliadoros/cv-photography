import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./client";
import type { SanityPhoto } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * A photo cropped to the 1200×630 card that WhatsApp, Facebook and friends
 * show for shared links. JPEG, because not every scraper understands WebP.
 */
export function ogImage(photo?: SanityPhoto) {
  if (!photo?.asset) return undefined;
  return {
    url: urlFor(photo).width(1200).height(630).fit("crop").format("jpg").quality(80).url(),
    width: 1200,
    height: 630,
    alt: photo.alt ?? "",
  };
}
