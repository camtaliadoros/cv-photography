import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";
import { Eyebrow } from "./sections";

const linkClass =
  "text-xs font-extrabold tracking-[0.18em] text-straw uppercase transition-colors hover:text-linen";

export function Footer({
  newsletterHeading,
  newsletterBody,
  blurb,
  seoLine,
}: {
  newsletterHeading: string;
  newsletterBody: string;
  blurb: string;
  seoLine: string;
}) {
  return (
    <>
      {/* Newsletter sits on linen above the footer, not inside it. */}
      <section className="border-t border-linen-deep bg-linen-soft px-(--gutter) py-[clamp(56px,7vw,88px)]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(28px,4vw,64px)]">
          <div className="min-w-0">
            <Eyebrow>Keep in touch</Eyebrow>
            <h2 className="mt-4 mb-3 text-[clamp(24px,3vw,38px)]">
              {newsletterHeading}
            </h2>
            <p className="max-w-[44ch] text-muted">{newsletterBody}</p>
          </div>
          <div className="min-w-0">
            <NewsletterForm source="Footer" />
          </div>
        </div>
      </section>

      {/*
        A deeper forest than the section backgrounds — the design derives it
        with oklch lightness * 0.62.
      */}
      <footer className="bg-[oklch(from_var(--forest)_calc(l*0.62)_c_h)] px-(--gutter) py-[clamp(56px,7vw,88px)]">
        <div className="mx-auto flex max-w-[680px] flex-col items-center gap-[clamp(24px,3vw,36px)] text-center">
          <Link href="/" aria-label="Cam Velucci Photography — home">
            <Image
              src="/logo/logo-stamp-linen.png"
              alt="Cam Velucci Photography"
              width={2830}
              height={2830}
              sizes="92px"
              className="h-[92px] w-auto"
            />
          </Link>

          <p className="font-display text-[clamp(17px,1.9vw,21px)] leading-[1.65] text-linen">
            {blurb}
          </p>
          <p className="font-display text-[clamp(16px,1.7vw,19px)] leading-[1.65] text-linen/80">
            {seoLine}
          </p>

          <div className="flex flex-wrap justify-center gap-[clamp(16px,2.4vw,32px)]">
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Instagram
            </a>
            <Link href="/privacy" className={linkClass}>
              Privacy policy
            </Link>
          </div>

          <p className="text-[13px] text-linen/60">
            &copy; {new Date().getFullYear()} Cam Velucci Photography
          </p>
        </div>
      </footer>
    </>
  );
}
