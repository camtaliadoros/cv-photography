import { Photo } from "./Photo";
import type { SanityPhoto, Testimonial } from "@/sanity/lib/types";

/**
 * Tracked-caps eyebrow preceded by a short rule. The rule is a signature of the
 * design — it sits above nearly every heading on the site.
 */
export function Eyebrow({
  children,
  tone = "terracotta",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "terracotta" | "straw";
  className?: string;
}) {
  const colour = tone === "straw" ? "text-straw" : "text-terracotta";
  return (
    <span className={`inline-flex items-center gap-2.5 ${colour} ${className}`}>
      <span aria-hidden className="h-0.5 w-6 bg-current" />
      <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
        {children}
      </span>
    </span>
  );
}

/** Tracked-caps label without the rule — used for card headings and meta. */
export function Label({
  children,
  tone = "terracotta",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "terracotta" | "straw" | "muted";
  className?: string;
}) {
  const colours = {
    terracotta: "text-terracotta",
    straw: "text-straw",
    muted: "text-muted",
  };
  return (
    <p
      className={`text-xs font-extrabold tracking-[0.18em] uppercase ${colours[tone]} ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The hero used at the top of every inner page: a photograph under two
 * gradients — one vertical, one raked at 75° — with the heading sitting low.
 */
export function PageHero({
  image,
  eyebrow,
  heading,
  standfirst,
  headingMax = "18ch",
  narrow = false,
  children,
}: {
  image?: SanityPhoto;
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
    <section className="relative flex min-h-[clamp(440px,52vh,520px)] items-end overflow-hidden bg-forest">
      {image?.asset ? <Photo photo={image} sizes="100vw" priority alt="" /> : null}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,53,39,.58)_0%,rgba(42,53,39,.34)_38%,rgba(42,53,39,.88)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(75deg,rgba(42,53,39,.6)_0%,rgba(42,53,39,.22)_52%,rgba(42,53,39,0)_78%)]"
      />
      <div
        className={`relative mx-auto w-full px-(--gutter) pt-[200px] pb-[clamp(40px,6vw,72px)] ${
          narrow ? "max-w-[820px]" : "max-w-[1200px]"
        }`}
      >
        <Eyebrow tone="straw">{eyebrow}</Eyebrow>
        <h1
          className="mt-4 mb-3.5 text-linen text-[clamp(30px,4.2vw,54px)] leading-[1.08]"
          style={{ maxWidth: headingMax }}
        >
          {heading}
        </h1>
        {standfirst && (
          <p className="max-w-[50ch] text-linen">{standfirst}</p>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * Testimonial: set over a photograph, raked left so the words sit in the
 * darkest part of the frame.
 */
export function QuoteBlock({
  testimonial,
  image,
}: {
  testimonial: Testimonial;
  image?: SanityPhoto;
}) {
  if (!testimonial?.quote) return null;
  return (
    <section className="relative flex min-h-[clamp(380px,54vh,560px)] items-center overflow-hidden bg-forest">
      {image?.asset ? <Photo photo={image} sizes="100vw" alt="" /> : null}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,53,39,.9)_0%,rgba(42,53,39,.62)_52%,rgba(42,53,39,.24)_100%)]"
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-(--gutter) py-(--section)">
        <blockquote className="max-w-[24ch] font-quote text-[clamp(26px,3.2vw,44px)] leading-[1.28] text-linen italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        {testimonial.name && (
          <cite className="mt-5 block text-xs font-extrabold tracking-[0.18em] text-straw uppercase not-italic">
            {testimonial.name}
          </cite>
        )}
      </div>
    </section>
  );
}

/** Cormorant italic — the lyrical pull quote. */
export function Quote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-quote text-[clamp(24px,2.8vw,34px)] leading-[1.3] text-forest italic ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The flat, emphatic statement — heavy sans rather than a quote face. Used for
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
      className={`max-w-[44ch] text-[clamp(17px,1.9vw,21px)] leading-[1.4] font-extrabold tracking-[0.01em] text-forest ${className}`}
    >
      {children}
    </p>
  );
}
