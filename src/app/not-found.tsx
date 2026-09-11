import { Cta } from "@/components/Cta";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-(--gutter) text-center">
      <p className="text-xs font-extrabold tracking-[0.2em] text-terracotta uppercase">
        Page not found
      </p>
      <h1 className="mt-6 max-w-[18ch] text-[clamp(28px,4vw,48px)]">
        That page has wandered off.
      </h1>
      <p className="mt-5 max-w-[46ch] text-charcoal/80">
        It may have moved, or the link might be out of date. Have a wander
        through the portfolio instead.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Cta href="/">Back to home</Cta>
        <Cta href="/portfolio">See the portfolio</Cta>
      </div>
    </div>
  );
}
