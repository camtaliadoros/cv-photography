"use client";

import { useState } from "react";
import Link from "next/link";
import { CtaButton } from "./Cta";

type State = "idle" | "sending" | "done" | "error";

/**
 * Email only — the design asks for a single field, so that's all this collects.
 * `stacked` is for the narrow corner card, where the field and CTA can't sit
 * side by side.
 */
export function NewsletterForm({
  source,
  onDone,
  stacked = false,
}: {
  source: "Footer" | "Popup" | "Mini sessions page";
  onDone?: () => void;
  stacked?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  // Bots fill every field they find; people never see this one.
  const [trap, setTrap] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company: trap }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("done");
      onDone?.();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="font-display animate-[cvFade_240ms_ease] text-[clamp(20px,2.2vw,26px)] leading-snug text-forest">
        Thank you — you&rsquo;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={
          stacked
            ? "flex flex-col gap-4"
            : "flex flex-wrap items-end gap-4"
        }
      >
        <div className={stacked ? "min-w-0" : "min-w-0 flex-[1_1_220px]"}>
          <label
            htmlFor={`nl-email-${source}`}
            className="mb-2 block text-xs font-extrabold tracking-[0.18em] text-forest uppercase"
          >
            Email
          </label>
          <input
            id={`nl-email-${source}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[10px] border-[1.5px] border-forest/25 bg-transparent px-4 py-3.5 text-charcoal transition-colors placeholder:text-muted focus:border-moss focus:outline-none"
          />
        </div>
        <CtaButton
          type="submit"
          disabled={state === "sending"}
          className={stacked ? "self-start" : "mb-1.5"}
        >
          {state === "sending" ? "Signing up" : "Sign up"}
        </CtaButton>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor={`nl-company-${source}`}>Company</label>
        <input
          id={`nl-company-${source}`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      {state === "error" && (
        <p className="mt-3 text-sm text-terracotta">
          Something went wrong. Please try again, or email me directly.
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        Your details are safe with me — I&rsquo;ll only use them to send you these
        notes.{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
