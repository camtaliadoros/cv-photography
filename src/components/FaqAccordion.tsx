"use client";

import { useState } from "react";
import type { FaqItem } from "@/sanity/lib/types";
import { toPlainText } from "@/lib/text";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul>
      {items.map((item) => {
        const isOpen = open === item._id;
        return (
          <li key={item._id} className="border-b border-linen-deep">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item._id)}
                aria-expanded={isOpen}
                aria-controls={`faq-${item._id}`}
                className="flex w-full items-center justify-between gap-6 py-[22px] text-left"
              >
                <span className="font-display text-[clamp(18px,2vw,22px)] leading-snug text-forest">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-[22px] leading-none font-extrabold text-terracotta"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={`faq-${item._id}`} hidden={!isOpen}>
              <p className="max-w-[62ch] pb-[22px] text-base text-charcoal/85">
                {toPlainText(item.answer)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
