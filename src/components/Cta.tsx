import Link from "next/link";

const base =
  "eyebrow inline-flex items-center gap-3 rounded-full px-8 py-4 transition-all duration-200 hover:-translate-y-px";

const variants = {
  primary: "bg-terracotta text-linen hover:bg-terracotta-hover",
  secondary: "bg-moss text-linen hover:bg-moss-hover",
  outline: "border border-forest text-forest hover:bg-forest hover:text-linen",
  ghost:
    "border border-linen/50 text-linen hover:bg-linen hover:text-forest",
} as const;

type Variant = keyof typeof variants;

export function Cta({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const arrow = (
    <span aria-hidden className="text-base leading-none">
      &rarr;
    </span>
  );

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
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}
