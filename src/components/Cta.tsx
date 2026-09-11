import Link from "next/link";

/**
 * The only call-to-action treatment in the design: a Lora text link sitting on
 * a hairline rule, with an arrow alongside. There are no filled buttons
 * anywhere in the approved prototype — not even for "Send enquiry" — so this
 * covers every CTA on the site.
 *
 * `onDark` carries linen text over a straw-gold rule; `onLight` carries forest
 * text over a terracotta rule.
 */
const base =
  "font-display inline-flex items-center gap-3 pb-1.5 leading-snug border-b-[1.5px] transition-colors duration-200 cursor-pointer";

const tones = {
  onLight: "text-forest border-terracotta hover:text-terracotta",
  onDark: "text-linen border-straw hover:text-straw",
} as const;

type Tone = keyof typeof tones;

/** Primary CTAs sit a touch larger than inline links. */
const sizes = {
  default: "text-[clamp(19px,2vw,22px)]",
  small: "text-[19px]",
} as const;

export function Cta({
  href,
  children,
  tone = "onLight",
  size = "default",
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
}) {
  const classes = `${base} ${tones[tone]} ${sizes[size]} ${className}`;
  const arrow = <Arrow />;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}

export function CtaButton({
  children,
  tone = "onLight",
  size = "default",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: Tone;
  size?: keyof typeof sizes;
}) {
  return (
    <button
      {...props}
      className={`${base} ${tones[tone]} ${sizes[size]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
      <Arrow />
    </button>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="text-[0.85em] leading-none">
      &rarr;
    </span>
  );
}
