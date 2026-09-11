"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cv-cookie-choice";

/** A small card in the bottom corner, as in the design — not a full-width bar. */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* Storage blocked — don't nag on every page view. */
    }
  }, []);

  if (!visible) return null;

  const choose = (choice: "all" | "essential") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* Nothing to remember it with; the banner will show again. */
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cv-cookie-choice", { detail: choice }));
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie choices"
      className="fixed right-[clamp(16px,3vw,32px)] bottom-[clamp(16px,3vw,32px)] z-[70] w-[min(330px,calc(100vw-32px))] animate-[cvRise_320ms_ease] rounded-[14px] bg-forest px-6 pt-[22px] pb-6 shadow-[0_18px_40px_rgba(42,53,39,.3)]"
    >
      <p className="mb-[18px] text-sm leading-relaxed text-linen">
        I use a few cookies to see how the site is being used. Nothing creepy.{" "}
        <Link href="/privacy" className="text-straw underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={() => choose("all")}
          className="font-display border-b-[1.5px] border-straw pb-[5px] text-[18px] leading-snug text-linen transition-colors hover:text-straw"
        >
          That&rsquo;s fine
        </button>
        <button
          type="button"
          onClick={() => choose("essential")}
          className="text-[11px] font-extrabold tracking-[0.18em] text-straw uppercase transition-colors hover:text-linen"
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
