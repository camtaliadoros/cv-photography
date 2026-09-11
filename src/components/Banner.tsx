"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cv-banner-dismissed";

/** Announcement bar. Dismissal is remembered per browser, keyed to the text. */
export function Banner({ text, href }: { text: string; href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== text);
    } catch {
      setVisible(true);
    }
  }, [text]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, text);
    } catch {
      /* Private browsing — the banner simply reappears next visit. */
    }
  };

  return (
    <div data-announcement className="relative z-50 bg-terracotta">
      <div className="flex items-center justify-center px-12 py-3">
        <Link href={href} className="text-center text-xs font-extrabold tracking-[0.2em] text-linen uppercase hover:text-forest">
          {text}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute top-1/2 right-4 -translate-y-1/2 p-1 text-lg leading-none text-linen transition-colors hover:text-forest"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
