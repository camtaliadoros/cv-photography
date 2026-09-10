"use client";

import { useEffect, useState } from "react";
import { NewsletterForm } from "./NewsletterForm";

const STORAGE_KEY = "cv-newsletter-popup";

/** Shows once per visitor, and only after they've engaged enough to scroll. */
export function NewsletterPopup() {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
        className="relative w-full max-w-[520px] rounded-2xl bg-linen p-8 shadow-lg sm:p-10"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-5 text-xl leading-none text-muted transition-colors hover:text-forest"
        >
          &times;
        </button>
        <p className="eyebrow text-terracotta">Keep in touch</p>
        <h2 id="newsletter-popup-title" className="mt-3 text-3xl">
          Hear about new dates first.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Occasional notes — mini session dates and offers. Unsubscribe anytime.
        </p>
        <div className="mt-6">
          <NewsletterForm source="Popup" onDone={() => setTimeout(close, 2200)} />
        </div>
      </div>
    </div>
  );
}
