"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { IntrinsicPhoto, Photo } from "./Photo";
import type { PortfolioImage, SessionCategory } from "@/sanity/lib/types";

const FILTERS: { label: string; value: SessionCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Maternity", value: "maternity" },
  { label: "Newborn & baby", value: "newborn" },
  { label: "Families", value: "families" },
];

export function PortfolioGrid({
  images,
  showFilters = false,
}: {
  images: PortfolioImage[];
  /**
   * Filters are built and working but off by default — Cam tags images as she
   * uploads, and turns this on when there's enough in each category.
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
  const step = useCallback(
    (by: number) =>
      setLightbox((current) =>
        current === null ? null : (current + by + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const active = lightbox === null ? null : visible[lightbox];

  return (
    <>
      {showFilters && (
        <div className="mb-12 flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`rounded-full px-5 py-2.5 text-xs font-extrabold tracking-[0.18em] uppercase transition-colors ${
                filter === f.value
                  ? "bg-forest text-linen"
                  : "border border-linen-deep text-forest hover:border-forest"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* CSS columns give the masonry look without measuring anything in JS. */}
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {visible.map((item, index) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setLightbox(index)}
            aria-label={`View ${item.image?.alt ?? "photograph"} larger`}
            className="group block w-full overflow-hidden break-inside-avoid"
          >
            <IntrinsicPhoto
              photo={item.image}
              sizes="(max-width: 768px) 50vw, 380px"
              priority={index < 4}
              className="h-auto w-full transition-transform duration-[600ms] group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph"
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/92 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-6 text-3xl leading-none text-linen/80 hover:text-linen"
          >
            &times;
          </button>

          {visible.length > 1 && (
            <>
              <LightboxArrow direction="prev" onClick={() => step(-1)} />
              <LightboxArrow direction="next" onClick={() => step(1)} />
            </>
          )}

          <div
            className="relative h-[82vh] w-full max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Photo
              photo={active.image}
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

function LightboxArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={isPrev ? "Previous photograph" : "Next photograph"}
      className={`absolute top-1/2 z-10 -translate-y-1/2 p-4 text-3xl text-linen/70 transition-colors hover:text-linen ${
        isPrev ? "left-2 sm:left-6" : "right-2 sm:right-6"
      }`}
    >
      {isPrev ? "←" : "→"}
    </button>
  );
}
