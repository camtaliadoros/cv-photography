"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cv-cookie-choice";

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
      className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-[560px] rounded-xl border border-linen-deep bg-linen-soft p-6 shadow-lg shadow-forest/10"
    >
      <p className="text-sm text-charcoal">
        I use a few cookies to see how the site is being used. Nothing creepy.{" "}
        <Link href="/privacy" className="text-terracotta underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("all")}
          className="eyebrow rounded-full bg-terracotta px-6 py-3 text-linen transition-colors hover:bg-terracotta-hover"
        >
          That&rsquo;s fine
        </button>
        <button
          type="button"
          onClick={() => choose("essential")}
          className="eyebrow rounded-full border border-forest px-6 py-3 text-forest transition-colors hover:bg-forest hover:text-linen"
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
