import { IntrinsicPhoto } from "./Photo";
import type { SanityPhoto, Testimonial } from "@/sanity/lib/types";

/**
 * Tracked-caps eyebrow preceded by a short rule. The rule is a signature of the
 * design — it sits above nearly every heading on the site. When centred, the
 * rule is mirrored on the right so the eyebrow stays balanced.
 */
export function Eyebrow({
  children,
  tone = "honey",
  centered = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "honey" | "straw";
  centered?: boolean;
  className?: string;
}) {
  // On light grounds the rule is honey but the text deep honey, which reads at small sizes.
  const colour = tone === "straw" ? "text-straw" : "text-honey-deep";
  const rule = tone === "straw" ? "bg-current" : "bg-honey";
  return (
    <span className={`inline-flex items-center gap-2.5 ${colour} ${className}`}>
      <span aria-hidden className={`h-0.5 w-6 ${rule}`} />
      {/* Letter-spacing trails the last letter; pull it back so both rules sit evenly. */}
      <span
        className={`text-xs font-black tracking-[0.2em] uppercase ${centered ? "-mr-[0.2em]" : ""}`}
      >
        {children}
      </span>
      {centered && <span aria-hidden className={`h-0.5 w-6 ${rule}`} />}
    </span>
  );
}

/** Tracked-caps label without the rule — used for card headings and meta. */
export function Label({
  children,
  tone = "honey",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "honey" | "straw" | "muted";
  className?: string;
}) {
  const colours = {
    honey: "text-honey-deep",
    straw: "text-straw",
    muted: "text-muted",
  };
  return (
    <p
      className={`text-xs font-black tracking-[0.18em] uppercase ${colours[tone]} ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The hero used at the top of most inner pages: the words centred on linen,
 * then a row of photographs beneath, each shown whole at a shared height.
 */
export function PageHero({
  images = [],
  eyebrow,
  heading,
  standfirst,
  headingMax = "18ch",
  narrow = false,
  children,
}: {
  /** Up to three photographs, shown in order. */
  images?: (SanityPhoto | undefined)[];
  eyebrow: React.ReactNode;
  heading: string;
  standfirst?: string;
  /** Some headings are held to a tighter measure than others. */
  headingMax?: string;
  /** Journal articles run their hero copy at the article's width. */
  narrow?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      <section>
        <div
          className={`mx-auto w-full px-(--gutter) pt-(--section-lg) pb-[clamp(32px,4vw,48px)] text-center ${
            narrow ? "max-w-[820px]" : "max-w-[1200px]"
          }`}
        >
          <Eyebrow centered>{eyebrow}</Eyebrow>
          <h1
            className="mx-auto mt-4 mb-3.5 text-[clamp(30px,4.2vw,54px)] leading-[1.08]"
            style={{ maxWidth: headingMax }}
          >
            {heading}
          </h1>
          {standfirst && (
            <p className="mx-auto max-w-[50ch] text-forest">{standfirst}</p>
          )}
          {children}
        </div>
      </section>
      <PhotoRow images={images} />
    </>
  );
}

/**
 * Photographs side by side at one height, never cropped. Each one's share of
 * the row follows its shape, so together they fill the width exactly.
 */
export function PhotoRow({ images }: { images: (SanityPhoto | undefined)[] }) {
  const photos = images.filter((photo): photo is SanityPhoto => !!photo?.asset).slice(0, 3);
  if (photos.length === 0) return null;

  const ratios = photos.map((photo) => photo.dimensions?.aspectRatio ?? 1.5);
  const total = ratios.reduce((sum, ratio) => sum + ratio, 0);

  return (
    <section className="px-(--gutter)">
      <div className="mx-auto flex max-w-[1200px] gap-[clamp(10px,1.4vw,16px)]">
        {photos.map((photo, i) => {
          const share = ratios[i] / total;
          return (
            <div
              key={photo.asset?._ref ?? i}
              className="min-w-0"
              style={{ flex: `${ratios[i]} 1 0%` }}
            >
              <IntrinsicPhoto
                photo={photo}
                priority={i === 0}
                sizes={`(max-width: 1200px) ${Math.ceil(share * 100)}vw, ${Math.ceil(share * 1200)}px`}
                className="block h-auto w-full"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * The about page's hero: words on forest to one side, the portrait whole on
 * the other.
 */
export function SplitHero({
  image,
  eyebrow,
  heading,
  standfirst,
  headingMax = "14ch",
}: {
  image?: SanityPhoto;
  eyebrow: React.ReactNode;
  heading: string;
  standfirst?: string;
  headingMax?: string;
}) {
  return (
    <section className="bg-forest">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-stretch">
        <div className="flex min-w-0 flex-col justify-end px-(--gutter) py-[clamp(48px,7vw,96px)]">
          <Eyebrow tone="straw">{eyebrow}</Eyebrow>
          <h1
            className="mt-4 mb-3.5 text-linen text-[clamp(30px,4.2vw,54px)] leading-[1.08]"
            style={{ maxWidth: headingMax }}
          >
            {heading}
          </h1>
          {standfirst && (
            <p className="max-w-[40ch] text-[clamp(17px,1.6vw,19px)] text-linen">{standfirst}</p>
          )}
        </div>
        {image?.asset && (
          <div className="flex min-w-0 items-center">
            <IntrinsicPhoto
              photo={image}
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="block h-auto w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/** Testimonial: an italic quote centred on a marigold tint, under a fine straw-gold rule. */
export function QuoteBlock({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial?.quote) return null;

  // Earlier versions of the schema stored the name as `clientName`; read both
  // so a document written against the old shape still credits the person.
  const name = testimonial.name ?? testimonial.clientName;

  return (
    <section className="bg-marigold-tint px-(--gutter) py-[clamp(72px,11vw,136px)] text-center">
      <div className="mx-auto max-w-[880px]">
        <div aria-hidden className="mx-auto mb-[clamp(28px,3.4vw,40px)] h-12 w-px bg-straw" />
        <blockquote className="font-display mx-auto max-w-[24ch] text-[clamp(26px,3.4vw,42px)] leading-[1.3] text-balance text-forest italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        {name && (
          <cite className="mt-[clamp(24px,3vw,32px)] block text-xs font-black tracking-[0.2em] text-honey-deep uppercase not-italic">
            {name}
          </cite>
        )}
      </div>
    </section>
  );
}

/** Lora italic — the lyrical pull quote. */
export function Quote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-display text-[clamp(24px,2.8vw,34px)] leading-[1.3] text-forest italic ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The flat, emphatic statement — Lato Black rather than a quote face. Used for
 * "I won't direct your every move…" wherever it appears.
 */
export function Statement({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`max-w-[44ch] text-[clamp(17px,1.9vw,21px)] leading-[1.4] font-black tracking-[0.01em] text-forest ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * "My approach": the words on the left, the photograph on the right shown
 * whole and centred against them. Stacks below lg, words first.
 */
export function ApproachSection({
  heading,
  body,
  pullQuote,
  image,
  link,
  imageFirst = false,
  className = "",
}: {
  heading: string;
  body: string[];
  pullQuote?: string;
  image?: SanityPhoto;
  link?: React.ReactNode;
  /** Put the photograph in the left column on desktop (text still leads when stacked). */
  imageFirst?: boolean;
  className?: string;
}) {
  return (
    <section className={`px-(--gutter) py-(--section-lg) ${className}`}>
      <div className="mx-auto grid max-w-[1200px] items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
        <div className="min-w-0">
          <Eyebrow>My approach</Eyebrow>
          <h2 className="mt-5 mb-6 text-[clamp(28px,3.4vw,45px)]">{heading}</h2>
          <div className="space-y-5 text-charcoal/85">
            {body.map((para, i) => (
              <p key={i} className="max-w-[52ch]">
                {para}
              </p>
            ))}
          </div>
          {pullQuote && <Statement className="mt-8">{pullQuote}</Statement>}
          {link && <div className="mt-10">{link}</div>}
        </div>
        {image?.asset && (
          <div className={`min-w-0 ${imageFirst ? "lg:order-first" : ""}`}>
            <IntrinsicPhoto photo={image} sizes="(max-width: 1024px) 100vw, 580px" />
          </div>
        )}
      </div>
    </section>
  );
}
