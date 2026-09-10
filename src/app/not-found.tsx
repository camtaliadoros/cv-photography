import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-terracotta">Page not found</p>
      <h1 className="mt-6 max-w-[18ch] text-[clamp(28px,4vw,48px)]">
        That page has wandered off.
      </h1>
      <p className="mt-5 max-w-[46ch] text-charcoal/80">
        It may have moved, or the link might be out of date. Have a wander
        through the portfolio instead.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="eyebrow rounded-full bg-terracotta px-8 py-4 text-linen transition-colors hover:bg-terracotta-hover"
        >
          Back to home
        </Link>
        <Link
          href="/portfolio"
          className="eyebrow rounded-full border border-forest px-8 py-4 text-forest transition-colors hover:bg-forest hover:text-linen"
        >
          See the portfolio
        </Link>
      </div>
    </div>
  );
}
