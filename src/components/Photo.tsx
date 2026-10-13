import Image, { getImageProps } from "next/image";
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

/**
 * An IntrinsicPhoto that swaps to `portrait` on screens taller than they are
 * wide. A `<picture>` lets the browser fetch only the one it shows, and each
 * source carries its own dimensions so the space reserved before it loads is
 * the right shape. Without a portrait it is just an IntrinsicPhoto.
 */
export function ArtDirectedPhoto({
  photo,
  portrait,
  sizes,
  priority,
  className,
}: PhotoProps & { portrait?: SanityPhoto }) {
  if (!photo?.asset || !portrait?.asset) {
    return (
      <IntrinsicPhoto
        photo={photo?.asset ? photo : portrait}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  // No preload here: a <link rel=preload> can't follow the media query, so it
  // would fetch the landscape photograph on phones too.
  const common = {
    sizes,
    className: className ?? "h-auto w-full",
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : undefined,
  };
  const tall = getImageProps({
    ...common,
    src: urlFor(portrait).auto("format").url(),
    alt: portrait.alt ?? "",
    width: portrait.dimensions?.width ?? 1600,
    height: portrait.dimensions?.height ?? 2000,
  }).props;
  const { props } = getImageProps({
    ...common,
    src: urlFor(photo).auto("format").url(),
    alt: photo.alt ?? "",
    width: photo.dimensions?.width ?? 2000,
    height: photo.dimensions?.height ?? 1333,
  });

  return (
    <picture>
      <source
        media="(orientation: portrait)"
        srcSet={tall.srcSet}
        sizes={sizes}
        width={tall.width}
        height={tall.height}
      />
      <img {...props} alt={props.alt} />
    </picture>
  );
}
