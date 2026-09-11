import { Photo } from "./Photo";
import type { SanityPhoto, Testimonial } from "@/sanity/lib/types";

/**
 * Tracked-caps eyebrow preceded by a short rule. The rule is a signature of the
 * design — it appears above nearly every section heading on the site.
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

/** The smaller, finer eyebrow used over photographs in the heroes. */
export function HeroEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-straw">
      <span aria-hidden className="h-[1.5px] w-6 bg-current" />
      <span className="text-[10px] font-extrabold tracking-[0.24em] uppercase">
        {children}
      </span>
    </span>
  );
}

/** Full-bleed hero used at the top of every inner page. */
export function PageHero({
  image,
  eyebrow,
  heading,
  standfirst,
  children,
}: {
  image?: SanityPhoto;
  eyebrow: string;
  heading: string;
  standfirst?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-forest">
      {image?.asset ? (
        <Photo photo={image} sizes="100vw" priority alt="" />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,53,39,.6)_0%,rgba(42,53,39,.15)_30%,rgba(42,53,39,.65)_100%)]"
      />
      <div className="relative w-full px-(--gutter) pt-40 pb-(--hero-bottom)">
        <div className="mx-auto max-w-[1200px]">
          <HeroEyebrow>{eyebrow}</HeroEyebrow>
          <h1 className="mt-3.5 max-w-[22ch] text-linen text-[clamp(30px,4.2vw,54px)]">
            {heading}
          </h1>
          {standfirst && (
            <p className="mt-4 max-w-[52ch] text-sm text-linen/80">{standfirst}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

/** The Forest testimonial treatment from the brand guidelines. */
export function QuoteBlock({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial?.quote) return null;
  return (
    <section className="bg-forest px-(--gutter) py-(--section)">
      <div className="mx-auto max-w-[860px] text-center">
        <blockquote className="font-display text-[clamp(24px,3vw,38px)] leading-[1.35] text-linen italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        {testimonial.name && (
          <cite className="mt-8 block text-xs font-extrabold tracking-[0.18em] text-straw uppercase not-italic">
            {testimonial.name}
          </cite>
        )}
      </div>
    </section>
  );
}

export function PullQuote({
  children,
  tone = "onLight",
}: {
  children: React.ReactNode;
  tone?: "onLight" | "onDark";
}) {
  return (
    <p
      className={`font-display text-[clamp(19px,2.2vw,26px)] leading-[1.4] italic ${
        tone === "onDark" ? "text-linen" : "text-forest"
      }`}
    >
      {children}
    </p>
  );
}
