"use client";

import { useState } from "react";
import type { FaqItem } from "@/sanity/lib/types";
import { toPlainText } from "@/lib/text";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-linen-deep border-y border-linen-deep">
      {items.map((item) => {
        const isOpen = open === item._id;
        return (
          <li key={item._id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item._id)}
                aria-expanded={isOpen}
                aria-controls={`faq-${item._id}`}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="font-display text-[clamp(18px,2vw,22px)] leading-snug text-forest">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-2xl leading-none font-light text-terracotta"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={`faq-${item._id}`} hidden={!isOpen}>
              <p className="max-w-[68ch] pb-8 text-charcoal/85">
                {toPlainText(item.answer)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
