import Link from "next/link";

/**
 * The design has two link treatments, and they are not interchangeable.
 *
 * `TextLink` — a quiet inline link at a fixed 19px, ruled in straw gold on any
 * background, with no arrow. Used for secondary moves: "Meet Cam",
 * "All session types", "All journal entries".
 *
 * `Cta` — the primary call to action, larger, with a trailing arrow, ruled in
 * straw gold on dark grounds and terracotta on light ones.
 *
 * Both are Lora Regular and underlined. Neither is ever a filled button; the
 * prototype has none.
 */
const base =
  "font-display inline-flex items-center leading-snug border-b-[1.5px] transition-colors duration-200 cursor-pointer";

const sizes = {
  default: "text-[clamp(19px,2vw,22px)] gap-3 pb-1.5",
  /** A shade smaller, as on the home page's "See the portfolio". */
  compact: "text-[clamp(18px,1.9vw,21px)] gap-3 pb-1.5",
} as const;

const tones = {
  onLight: "text-forest border-terracotta hover:text-terracotta",
  onDark: "text-linen border-straw hover:text-straw",
} as const;

type Tone = keyof typeof tones;
type Size = keyof typeof sizes;

interface Common {
  children: React.ReactNode;
  className?: string;
}

interface LinkProps extends Common {
  href: string;
  external?: boolean;
}

/** Primary call to action — trailing arrow. */
export function Cta({
  href,
  children,
  tone = "onLight",
  size = "default",
  className = "",
  external,
}: LinkProps & { tone?: Tone; size?: Size }) {
  const classes = `${base} ${tones[tone]} ${sizes[size]} ${className}`;
  return wrap(href, external, classes, <>{children}<Arrow /></>);
}

/** Secondary inline link — no arrow, straw rule whatever it sits on. */
export function TextLink({
  href,
  children,
  tone = "onLight",
  className = "",
  external,
}: LinkProps & { tone?: Tone }) {
  const colour = tone === "onDark" ? "text-linen" : "text-forest";
  const classes = `${base} ${colour} border-straw gap-2.5 pb-[5px] text-[19px] hover:text-terracotta ${className}`;
  return wrap(href, external, classes, children);
}

export function CtaButton({
  children,
  tone = "onLight",
  size = "default",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; size?: Size }) {
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

function wrap(
  href: string,
  external: boolean | undefined,
  classes: string,
  content: React.ReactNode,
) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** The arrow is set in Lato Black, not the Lora of the label beside it. */
function Arrow() {
  return (
    <span aria-hidden className="font-sans text-[15px] leading-none font-black">
      &rarr;
    </span>
  );
}
