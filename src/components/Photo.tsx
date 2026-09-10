import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityPhoto } from "@/sanity/lib/types";

interface PhotoProps {
  photo?: SanityPhoto;
  /** Responsive sizes hint. Getting this right is most of image performance. */
  sizes: string;
  /** Only the LCP image on a page should set this. */
  priority?: boolean;
  className?: string;
  /** Overrides the alt text stored in Sanity. Pass "" for decorative repeats. */
  alt?: string;
}

/**
 * Renders a Sanity photograph through next/image.
 *
 * Uses `fill`, so every caller must position it inside a container that
 * establishes its own size — the design crops photographs to fixed ratios
 * rather than letting them dictate layout.
 */
export function Photo({ photo, sizes, priority, className, alt }: PhotoProps) {
  if (!photo?.asset) return null;

  const src = urlFor(photo).auto("format").url();

  return (
    <Image
      src={src}
      alt={alt ?? photo.alt ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      // Below-the-fold photographs shouldn't compete with the hero for bandwidth.
      loading={priority ? undefined : "lazy"}
      placeholder={photo.lqip ? "blur" : undefined}
      blurDataURL={photo.lqip}
      className={className ?? "object-cover"}
    />
  );
}

/**
 * A photograph that keeps its own aspect ratio — used in the masonry portfolio
 * grid, where varying heights are the point.
 */
export function IntrinsicPhoto({
  photo,
  sizes,
  priority,
  className,
  alt,
}: PhotoProps) {
  if (!photo?.asset) return null;

  const width = photo.dimensions?.width ?? 1600;
  const height = photo.dimensions?.height ?? 2000;

  return (
    <Image
      src={urlFor(photo).auto("format").url()}
      alt={alt ?? photo.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder={photo.lqip ? "blur" : undefined}
      blurDataURL={photo.lqip}
      className={className ?? "h-auto w-full"}
    />
  );
}
