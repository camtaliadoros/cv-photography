"use client";

import Link from "next/link";
import { useState } from "react";
import { Cta, CtaButton } from "./Cta";
import { Label } from "./sections";
import { fieldClass as field, fieldLabelClass as labelClass } from "./field";

const HEARD_ABOUT = ["Instagram", "A friend", "Google", "Somewhere else"];


export function EnquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          newsletter: form.get("newsletter") ? "yes" : "no",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setState("error");
    }
  }

  if (sent) {
    return (
      <div className="rounded-[14px] border border-linen-deep bg-linen-soft p-[clamp(28px,4vw,48px)]">
        <Label>Thank you</Label>
        <h2 className="mt-3 mb-3.5 text-[30px]">That&rsquo;s with me.</h2>
        <p className="mb-8 text-charcoal/85">
          I&rsquo;ll be in touch within two days — usually sooner. In the meantime,
          have a wander through the portfolio.
        </p>
        <Cta href="/portfolio">See the portfolio</Cta>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[14px] border border-linen-deep bg-linen-soft p-[clamp(28px,4vw,48px)]"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
        <div>
          <label className={labelClass} htmlFor="firstName">
            First name <span className="text-terracotta">✱</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            placeholder="Cam"
            className={field}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-terracotta">✱</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={field}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optional"
            className={field}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="heardAbout">
            How did you hear about me
          </label>
          <select
            id="heardAbout"
            name="heardAbout"
            defaultValue=""
            className={`${field} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20d%3D%22M1%201.5%206%206.5%2011%201.5%22%20fill%3D%22none%22%20stroke%3D%22%232a3527%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_16px_center] bg-no-repeat pr-10`}
          >
            <option value="">Choose one</option>
            {HEARD_ABOUT.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-[18px]">
        <label className={labelClass} htmlFor="message">
          Tell me a bit about you <span className="text-terracotta">✱</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Who's who, what you love doing together, and what feels right for you."
          className={field}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="mt-4 max-w-[56ch] text-sm text-muted">
        Your details are safe with me — I&rsquo;ll just use them to get back to you.{" "}
        <Link href="/privacy" className="text-terracotta underline">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-6 border-t border-linen-deep pt-[22px]">
        {/* The design draws its own 20px box, so the native control is hidden
            rather than tinted — `peer` drives the checked and focus states. */}
        <label className="inline-flex cursor-pointer items-start gap-2.5">
          <input type="checkbox" name="newsletter" className="peer sr-only" />
          <span
            aria-hidden
            className="mt-px flex h-5 w-5 flex-none items-center justify-center rounded-[3px] border-[1.5px] border-forest bg-linen-raised text-linen transition-colors peer-checked:bg-forest peer-checked:[&>svg]:opacity-100 peer-focus-visible:border-moss peer-focus-visible:ring-2 peer-focus-visible:ring-moss/40"
          >
            <svg
              viewBox="0 0 12 10"
              className="h-2.5 w-3 opacity-0 transition-opacity"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 5.2 4.4 8.6 11 1.8" />
            </svg>
          </span>
          <span className="font-display text-[15px] leading-[1.5] text-charcoal">
            Mailing list (optional)
          </span>
        </label>
        <p className="mt-2.5 max-w-[52ch] text-sm text-muted">
          Keep me in the loop — occasional updates and offers. Unsubscribe anytime.
        </p>
      </div>

      {state === "error" && (
        <p className="mt-5 text-sm text-terracotta">
          Something went wrong sending that. Please try again, or email me at
          hello@camvelucci.com.
        </p>
      )}

      <CtaButton type="submit" disabled={state === "sending"} className="mt-8">
        {state === "sending" ? "Sending" : "Send enquiry"}
      </CtaButton>
    </form>
  );
}
