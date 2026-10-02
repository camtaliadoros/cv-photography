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
  const visible = isClient && !dismissed && !previouslyDismissed;

  if (!visible) return null;

  const dismiss = () => {
    setDismissed(true);
    writeStorage(STORAGE_KEY, text);
  };

  return (
    <div className="relative z-50 bg-honey">
      <div className="flex items-center justify-center px-12 py-3">
        <Link href={href} className="text-center text-xs font-black tracking-[0.2em] text-forest uppercase hover:text-linen">
          {text}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute top-1/2 right-4 -translate-y-1/2 p-1 text-lg leading-none text-forest transition-colors hover:text-linen"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
