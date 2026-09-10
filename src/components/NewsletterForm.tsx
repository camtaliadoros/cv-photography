"use client";

import { useState } from "react";
import Link from "next/link";
import { CtaButton } from "./Cta";

type State = "idle" | "sending" | "done" | "error";

export function NewsletterForm({
  source,
  onDone,
  dark = false,
}: {
  source: "Footer" | "Popup" | "Mini sessions page";
  onDone?: () => void;
  dark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [state, setState] = useState<State>("idle");
  // Bots fill every field they find; humans never see this one.
  const [trap, setTrap] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, source, company: trap }),
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
      <p className={`font-display text-2xl ${dark ? "text-linen" : "text-forest"}`}>
        Thank you — you&rsquo;re on the list.
      </p>
    );
  }

  const inputClasses = dark
    ? "w-full rounded-lg border border-linen/30 bg-transparent px-5 py-4 text-linen placeholder:text-linen/50 focus:border-straw"
    : "w-full rounded-lg border border-linen-deep bg-linen-soft px-5 py-4 text-charcoal placeholder:text-muted focus:border-moss";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`nl-name-${source}`}>
          First name
        </label>
        <input
          id={`nl-name-${source}`}
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={`${inputClasses} sm:max-w-[180px]`}
        />
        <label className="sr-only" htmlFor={`nl-email-${source}`}>
          Email address
        </label>
        <input
          id={`nl-email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
        <CtaButton type="submit" disabled={state === "sending"} className="shrink-0">
          {state === "sending" ? "Signing up" : "Sign up"}
          <span aria-hidden>&rarr;</span>
        </CtaButton>
      </div>

      {/* Honeypot — visually and programmatically hidden from people. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor={`nl-company-${source}`}>Company</label>
        <input
          id={`nl-company-${source}`}
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

      <p className={`mt-4 text-xs ${dark ? "text-linen/60" : "text-muted"}`}>
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
