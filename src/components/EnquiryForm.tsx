"use client";

import Link from "next/link";
import { useState } from "react";
import { Cta, CtaButton } from "./Cta";
import { Label } from "./sections";

const HEARD_ABOUT = ["Instagram", "A friend", "Google", "Somewhere else"];

const field =
  "w-full rounded-[10px] border-[1.5px] border-forest/25 bg-transparent px-4 py-3.5 text-charcoal transition-colors placeholder:text-muted focus:border-moss focus:outline-none";
const labelClass =
  "mb-2 block text-xs font-extrabold tracking-[0.18em] text-forest uppercase";

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
          <select id="heardAbout" name="heardAbout" defaultValue="" className={field}>
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
          rows={6}
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
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="newsletter"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--terracotta)]"
          />
          <span className="text-xs font-extrabold tracking-[0.18em] text-forest uppercase">
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
