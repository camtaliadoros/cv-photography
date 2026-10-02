"use client";

import { useState } from "react";
import Link from "next/link";
import { CtaButton } from "./Cta";
import { fieldClass, fieldLabelClass } from "./field";

type State = "idle" | "sending" | "done" | "error";

/**
 * First name and email, with the CTA on its own line beneath. The name is
 * optional — it only personalises the welcome email. `stacked` is for the
 * narrow corner card, where the two fields can't sit side by side.
 */
export function NewsletterForm({
  source,
  privacyNote,
  onDone,
  stacked = false,
}: {
  source: "Footer" | "Popup" | "Mini sessions page";
  privacyNote: string;
  onDone?: () => void;
  stacked?: boolean;
}) {
  const [firstName, setFirstName] = useState("");
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
        body: JSON.stringify({ firstName, email, source, company: trap }),
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
        Thank you! You&rsquo;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={
          stacked ? "flex flex-col gap-4" : "grid gap-4 sm:grid-cols-2"
        }
      >
        <div className="min-w-0">
          <label
            htmlFor={`nl-firstName-${source}`}
            className={fieldLabelClass}
          >
            First name
          </label>
          <input
            id={`nl-firstName-${source}`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Cam"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="min-w-0">
          <label
            htmlFor={`nl-email-${source}`}
            className={fieldLabelClass}
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
            className={fieldClass}
          />
        </div>
      </div>
      <CtaButton
        type="submit"
        disabled={state === "sending"}
        className="mt-5"
      >
        {state === "sending" ? "Signing up" : "Sign up"}
      </CtaButton>

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
        <p className="mt-3 text-sm text-honey-deep">
          Something went wrong. Please try again, or email me directly.
        </p>
      )}

      <p className="mt-4 max-w-[48ch] text-sm leading-[1.6] text-muted">
        {privacyNote}{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
