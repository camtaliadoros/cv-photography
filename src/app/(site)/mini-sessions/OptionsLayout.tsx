import type { MiniSessionPage } from "@/sanity/lib/types";
import { IntrinsicPhoto } from "@/components/Photo";
import { Cta } from "@/components/Cta";
import { Eyebrow, Label, PhotoRow } from "@/components/sections";
import { toParagraphs, toPlainText } from "@/lib/text";

/**
 * The mini sessions page when there's more than one way to book — the
 * Christmas minis at mine or at yours. The words lead, left-aligned, and the
 * options sit side by side on forest so the choice is the centre of the page.
 */
export function OptionsLayout({
  page,
  bookingUrl,
}: {
  page: MiniSessionPage;
  bookingUrl: string;
}) {
  const options = page.options ?? [];
  const notes = page.priceNotes ?? [];
  const [lead, ...body] = toParagraphs(page.introBody ?? []);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="px-(--gutter) pt-(--section-lg) pb-[clamp(32px,4vw,48px)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[760px]">
            {page.heroEyebrow && <Eyebrow>{page.heroEyebrow}</Eyebrow>}
            {page.heroHeading && (
              <h1 className="mt-4 mb-4 text-[clamp(36px,5vw,64px)] leading-[1.08]">
                {page.heroHeading}
              </h1>
            )}
            {page.heroStandfirst && (
              <p className="max-w-[50ch] text-[clamp(17px,1.6vw,19px)]">{page.heroStandfirst}</p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta href={bookingUrl} external>
                Book your session
              </Cta>
              {options.length > 1 && (
                <a
                  href="#options"
                  className="font-display inline-flex min-h-11 items-center gap-2 text-[18px] text-forest underline underline-offset-[5px] hover:text-honey-deep"
                >
                  See the {options.length === 2 ? "two" : ""} options
                  <span aria-hidden>&darr;</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <PhotoRow images={[page.heroImage, ...(page.heroGallery ?? [])]} />

      {/* ---------- Intro ---------- */}
      {lead && (
        <section className="px-(--gutter) pt-[clamp(56px,7vw,88px)] pb-(--section-lg)">
          <div className="mx-auto max-w-[720px] space-y-5">
            <p className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.45] text-forest">
              {lead}
            </p>
            {body.map((para, i) => (
              <p key={i} className="max-w-[60ch] text-charcoal/85">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Options ---------- */}
      <section
        id="options"
        className="scroll-mt-20 bg-forest px-(--gutter) py-[clamp(72px,9vw,120px)] text-linen"
      >
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow tone="straw">The details</Eyebrow>
          {page.detailsHeading && (
            <h2 className="mt-4 text-linen text-[clamp(32px,4vw,52px)]">{page.detailsHeading}</h2>
          )}

          <div className="mt-[clamp(36px,4.5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(20px,2.6vw,32px)]">
            {options.map((option, i) => (
              <article
                key={i}
                className="flex flex-col gap-6 rounded-[12px] border border-straw/45 p-[clamp(28px,3.4vw,40px)]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="text-linen text-[clamp(28px,3vw,36px)]">{option.name}</h3>
                  {option.price && (
                    <p className="text-sm font-black tracking-[0.16em] text-straw">{option.price}</p>
                  )}
                </div>
                {option.summary && <p className="text-linen/90">{option.summary}</p>}
                {option.details && option.details.length > 0 && (
                  <dl className="border-b border-straw/45">
                    {option.details.map((d, j) => (
                      <div
                        key={j}
                        className="grid grid-cols-[minmax(96px,120px)_1fr] gap-4 border-t border-straw/45 py-3.5"
                      >
                        <dt className="pt-1 text-xs font-black tracking-[0.18em] text-straw uppercase">
                          {d.label}
                        </dt>
                        <dd className="text-linen">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </div>

          {notes.length > 0 && (
            <ul className="mt-[clamp(40px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(28px,3.4vw,40px)]">
              {notes.map((note, i) => (
                <li key={i}>
                  <Label tone="straw" className="mb-3">
                    {note.heading}
                  </Label>
                  <p className="text-linen/90">{toPlainText(note.body)}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-[clamp(40px,5vw,56px)] flex flex-wrap items-center gap-x-8 gap-y-4">
            <Cta href={bookingUrl} external tone="onDark">
              Book your session
            </Cta>
            {page.bookingNote && <p className="text-[15px] text-straw">{page.bookingNote}</p>}
          </div>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      {page.gallery && page.gallery.length > 0 && (
        <section className="px-(--gutter) py-[clamp(72px,10vw,120px)]">
          <ul className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-4">
            {page.gallery.map((photo, i) => (
              <li key={i}>
                <IntrinsicPhoto photo={photo} sizes="(max-width: 768px) 100vw, 380px" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
