"use client";

import Link from "next/link";
import { useState } from "react";
import { readStorage, useIsClient, writeStorage } from "@/lib/use-is-client";

const STORAGE_KEY = "cv-banner-dismissed";

/** Announcement bar. Dismissal is remembered per browser, keyed to the text. */
export function Banner({ text, href }: { text: string; href: string }) {
  const isClient = useIsClient();
  const [dismissed, setDismissed] = useState(false);

  // Keyed to the text, so changing the announcement shows it again.
  const previouslyDismissed = isClient && readStorage(STORAGE_KEY) === text;
  if (!isClient || dismissed || previouslyDismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    writeStorage(STORAGE_KEY, text);
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
