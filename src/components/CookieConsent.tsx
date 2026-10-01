"use client";

import Link from "next/link";
import { useState } from "react";
import { readStorage, useIsClient, writeStorage } from "@/lib/use-is-client";

const STORAGE_KEY = "cv-cookie-choice";

/** A small card in the bottom corner, as in the design — not a full-width bar. */
export function CookieConsent() {
  const isClient = useIsClient();
  const [chosen, setChosen] = useState(false);

  // Storage that throws (blocked site data) reads as null, which would nag on
  // every page view — so treat an unreadable store as already answered.
  const stored = isClient ? readStorage(STORAGE_KEY) : null;
  if (!isClient || chosen || stored) return null;

  const choose = (choice: "all" | "essential") => {
    writeStorage(STORAGE_KEY, choice);
    setChosen(true);
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
          className="text-[11px] font-black tracking-[0.18em] text-straw uppercase transition-colors hover:text-linen"
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
