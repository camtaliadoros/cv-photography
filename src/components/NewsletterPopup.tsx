"use client";

import { useEffect, useState } from "react";
import { NewsletterForm } from "./NewsletterForm";

const STORAGE_KEY = "cv-newsletter-popup";

/**
 * A quiet card in the bottom corner, as in the design — deliberately not a
 * full-screen modal. Shows once per visitor, after they've scrolled.
 */
export function NewsletterPopup({
  heading,
  body,
  privacyNote,
}: {
  heading: string;
  body: string;
  privacyNote: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "seen");
    } catch {
      /* Nothing to remember it with. */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="newsletter-popup-title"
      className="fixed right-[clamp(16px,3vw,32px)] bottom-[clamp(16px,3vw,32px)] z-[65] w-[min(340px,calc(100vw-32px))] animate-[cvRise_420ms_ease] rounded-[14px] border border-linen-deep bg-linen px-[26px] pt-6 pb-[26px] shadow-[0_18px_40px_rgba(42,53,39,.22)]"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute top-2.5 right-3.5 flex h-6 w-6 items-center justify-center text-base leading-none text-muted transition-colors hover:text-forest"
      >
        &times;
      </button>
      <p className="mb-2.5 text-[11px] font-black tracking-[0.2em] text-honey-deep uppercase">
        Keep in touch
      </p>
      <h2 id="newsletter-popup-title" className="text-[26px] leading-tight">
        {heading}
      </h2>
      <p className="mt-2.5 text-sm text-muted">
        {body}
      </p>
      <div className="mt-5">
        <NewsletterForm source="Popup" privacyNote={privacyNote} stacked onDone={() => setTimeout(close, 2200)} />
      </div>
    </div>
  );
}
