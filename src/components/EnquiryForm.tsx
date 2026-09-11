"use client";

import Link from "next/link";
import { useState } from "react";
import { Cta, CtaButton } from "./Cta";

const SESSION_TYPES = ["Maternity", "Newborn & baby", "Family", "Not sure yet"];
const LOCATION_TYPES = ["At home", "Outdoors", "Not sure yet"];
const HEARD_ABOUT = ["Instagram", "A friend", "Google", "Somewhere else"];

const field =
  "w-full rounded-[14px] border border-linen-deep bg-linen-soft px-5 py-3.5 text-charcoal transition-colors placeholder:text-muted focus:border-moss focus:outline-none";
const labelClass =
  "mb-2.5 block text-xs font-extrabold tracking-[0.18em] text-forest uppercase";

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
      <div className="rounded-[14px] border border-linen-deep bg-linen-soft p-10 text-center">
        <h2 className="text-3xl">That&rsquo;s with me.</h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-charcoal/85">
          I&rsquo;ll be in touch within two days — usually sooner. In the meantime,
          have a wander through the portfolio.
        </p>
        <div className="mt-8 flex justify-center">
          <Cta href="/portfolio">See the portfolio</Cta>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" required autoComplete="given-name" className={field} />
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" required autoComplete="family-name" className={field} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="location">Where are you based?</label>
        <input
          id="location"
          name="location"
          placeholder="St Albans, Harpenden, north London…"
          className={field}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="sessionType">What kind of session?</label>
          <select id="sessionType" name="sessionType" required defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {SESSION_TYPES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="sessionLocationType">At home or outdoors?</label>
          <select id="sessionLocationType" name="sessionLocationType" required defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {LOCATION_TYPES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="heardAbout">How did you hear about me?</label>
        <select id="heardAbout" name="heardAbout" defaultValue="" className={field}>
          <option value="">Choose one</option>
          {HEARD_ABOUT.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">Tell me about your family</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Who's who, what you love doing together, and roughly when you're thinking of."
          className={field}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-muted">
        Your details are safe with me — I&rsquo;ll just use them to get back to you.{" "}
        <Link href="/privacy" className="text-terracotta underline">Privacy Policy</Link>.
      </p>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal/85">
        <input
          type="checkbox"
          name="newsletter"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--terracotta)]"
        />
        <span>
          Keep me in the loop — occasional updates and offers. Unsubscribe anytime.
        </span>
      </label>

      {state === "error" && (
        <p className="text-sm text-terracotta">
          Something went wrong sending that. Please try again, or email me at
          hello@camvelucci.com.
        </p>
      )}

      <CtaButton type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending" : "Send enquiry"}
      </CtaButton>
    </form>
  );
}
