"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { IntrinsicPhoto, Photo } from "./Photo";
import type { PortfolioImage, SessionCategory } from "@/sanity/lib/types";

const FILTERS: { label: string; value: SessionCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Maternity", value: "maternity" },
  { label: "Newborn", value: "newborn" },
  { label: "Families", value: "families" },
];

export function PortfolioGrid({
  images,
  showFilters = false,
}: {
  images: PortfolioImage[];
  /**
   * Built and working, off by default at Cam's request. Images carry a
   * category regardless, so switching this on needs no re-tagging.
   */
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<SessionCategory | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? images : images.filter((i) => i.category === filter)),
    [images, filter],
  );

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close]);

  const active = lightbox === null ? null : visible[lightbox];

  return (
    <>
      {showFilters && (
        <div className="mb-[clamp(26px,4vw,42px)] flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`rounded-full border-[1.5px] border-straw px-[22px] py-2.5 text-xs font-black tracking-[0.16em] uppercase transition-colors duration-[240ms] ${
                filter === f.value
                  ? "bg-straw text-forest"
                  : "bg-transparent text-straw"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* CSS columns give the masonry without measuring anything in JS. */}
      <div className="columns-[290px] gap-4">
        {visible.map((item, index) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setLightbox(index)}
            aria-label={`View ${item.image?.alt ?? "photograph"} larger`}
            className="mb-4 block w-full cursor-zoom-in break-inside-avoid"
          >
            <IntrinsicPhoto
              photo={item.image}
              sizes="(max-width: 768px) 100vw, 290px"
              priority={index < 4}
              className="h-auto w-full transition-opacity duration-[240ms] hover:opacity-[.86]"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.image?.alt ?? "Photograph"}
          onClick={close}
          className="fixed inset-0 z-[60] flex animate-[cvFade_240ms_ease] cursor-zoom-out items-center justify-center bg-forest/92 p-[clamp(20px,4vw,64px)] backdrop-blur-[6px]"
        >
          <div className="relative h-full w-full">
            <Photo
              photo={active.image}
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>
          <span className="absolute top-6 right-7 text-xs font-black tracking-[0.18em] text-linen uppercase">
            Close
          </span>
        </div>
      )}
    </>
  );
}
