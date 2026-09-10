import Link from "next/link";
import { site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer({
  newsletterHeading,
  newsletterBody,
  blurb,
  seoLine,
  showJournal,
  showMini,
}: {
  newsletterHeading: string;
  newsletterBody: string;
  blurb: string;
  seoLine: string;
  showJournal: boolean;
  showMini: boolean;
}) {
  return (
    <footer className="bg-forest text-linen">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <section className="border-b border-linen/15 py-(--spacing-section)">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="eyebrow text-straw">Keep in touch</p>
              <h2 className="mt-4 text-linen">{newsletterHeading}</h2>
              <p className="mt-4 max-w-[46ch] text-linen/75">{newsletterBody}</p>
            </div>
            <NewsletterForm source="Footer" dark />
          </div>
        </section>

        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl">Cam Velucci Photography</p>
            <p className="mt-4 max-w-[42ch] text-sm text-linen/70">{blurb}</p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-straw">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/portfolio" className="hover:text-straw">Portfolio</Link></li>
              <li><Link href="/sessions" className="hover:text-straw">Sessions</Link></li>
              <li><Link href="/about" className="hover:text-straw">About</Link></li>
              {showMini && (
                <li><Link href="/mini-sessions" className="hover:text-straw">Mini sessions</Link></li>
              )}
              {showJournal && (
                <li><Link href="/journal" className="hover:text-straw">Journal</Link></li>
              )}
              <li><Link href="/enquire" className="hover:text-straw">Enquire</Link></li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-straw">Reach me</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-straw">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-straw"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-straw">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-linen/15 py-8 text-xs text-linen/50 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[70ch]">{seoLine}</p>
          <p className="shrink-0">
            &copy; {new Date().getFullYear()} Cam Velucci Photography
          </p>
        </div>
      </div>
    </footer>
  );
}
