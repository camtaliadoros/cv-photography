import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import type { SanityPhoto, Testimonial } from "@/sanity/lib/types";

/** Tracked-caps eyebrow that sits above every section heading. */
export function Eyebrow({
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
  return <p className={`eyebrow ${colours[tone]} ${className}`}>{children}</p>;
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
        <Photo
          photo={image}
          sizes="100vw"
          priority
          alt=""
          className="object-cover opacity-90"
        />
      ) : null}
      {/* Left-weighted protection gradient, so light text stays legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/55 to-forest/20"
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-40 pb-20 lg:px-10">
        <Eyebrow tone="straw">{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-[18ch] text-linen text-[clamp(30px,4.2vw,54px)]">
          {heading}
        </h1>
        {standfirst && (
          <p className="mt-5 max-w-[52ch] text-linen/80">{standfirst}</p>
        )}
        {children}
      </div>
    </section>
  );
}

/** The Forest testimonial treatment from the brand guidelines. */
export function QuoteBlock({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial?.quote) return null;
  return (
    <section className="bg-forest px-6 py-(--spacing-section) lg:px-10">
      <Reveal className="mx-auto max-w-[860px] text-center">
        <blockquote className="font-display text-[clamp(24px,3vw,38px)] leading-[1.35] text-linen italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        {testimonial.name && (
          <cite className="eyebrow mt-8 block text-straw not-italic">
            {testimonial.name}
          </cite>
        )}
      </Reveal>
    </section>
  );
}

/** A short rule echoing the rising-line flourish in the logo. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      className={`h-3 w-[120px] ${className}`}
      fill="none"
    >
      <path
        d="M2 10C22 10 30 2 50 2s28 8 48 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[clamp(19px,2.2vw,26px)] leading-[1.4] text-forest italic">
      {children}
    </p>
  );
}
