"use client";

import { useState } from "react";
import { Checkbox, Honeypot, SectionLabel, TextField } from "@/components/form-controls";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "done" | "error";
type Errors = Partial<Record<"name" | "email" | "privacy", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initial = {
  name: "",
  email: "",
  childName: "",
  // Every tick starts empty: consent has to be given, not left in place.
  website: false,
  social: false,
  print: false,
  newsletter: false,
  privacy: false,
};

export function PopupForm({ event }: { event?: string }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");
  // Bots fill every field they find; people never see this one.
  const [trap, setTrap] = useState("");

  function set<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const found: Errors = {};
    if (!values.name.trim()) found.name = "Please add your name";
    if (!EMAIL_RE.test(values.email.trim())) found.email = "Please check your email address";
    if (!values.privacy) found.privacy = "Please tick to confirm you’ve read it";
    return found;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`popup-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/popup-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, event, company: trap }),
      });
      if (res.status === 400) {
        const data = (await res.json()) as { errors?: Errors };
        setErrors(data.errors ?? {});
        setState("idle");
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      setState("done");
      window.scrollTo({ top: 0 });
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    const firstName = values.name.trim().split(/\s+/)[0];
    return (
      <ThankYou
        firstName={firstName}
        onAnother={() => {
          // One tablet, a queue of parents: reset for the next one.
          setValues(initial);
          setState("idle");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-[18px] flex flex-col gap-9">
      <header className="flex flex-col gap-3.5 pt-[18px]">
        <h1 className="font-display text-[36px] leading-[1.1] tracking-[-0.02em] text-forest">
          Your mini portrait
        </h1>
        <p>Pop your details in while you wait. It takes a minute.</p>
      </header>

      <fieldset className="flex flex-col gap-[18px]">
        <SectionLabel>Your details</SectionLabel>
        <TextField
          id="popup-name"
          label="Your name"
          autoComplete="name"
          value={values.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          required
        />
        <TextField
          id="popup-email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          hint="Your photos will be sent here"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          required
        />
        <TextField
          id="popup-childName"
          label="Little one’s first name"
          hint="Optional"
          autoComplete="off"
          value={values.childName}
          onChange={(v) => set("childName", v)}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-3.5">
        <SectionLabel>Sharing your photos</SectionLabel>
        <p>
          A favourite or two might be lovely to share. Tick any you’re happy
          with. You can change your mind anytime at{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-[3px]">
            {site.email}
          </a>
          .
        </p>
        <Checkbox
          id="popup-website"
          label="My website"
          checked={values.website}
          onChange={(v) => set("website", v)}
        />
        <Checkbox
          id="popup-social"
          label="Instagram and Facebook"
          checked={values.social}
          onChange={(v) => set("social", v)}
        />
        <Checkbox
          id="popup-print"
          label="Flyers and printed materials"
          checked={values.print}
          onChange={(v) => set("print", v)}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-3.5">
        <SectionLabel>Stay in touch</SectionLabel>
        <Checkbox
          id="popup-newsletter"
          label="Yes please. Send me occasional notes: new dates, offers, and the odd thing I’ve learned photographing little ones. Unsubscribe anytime."
          checked={values.newsletter}
          onChange={(v) => set("newsletter", v)}
        />
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-straw pt-[22px]">
        <Checkbox
          id="popup-privacy"
          label="I’ve read the privacy notice"
          checked={values.privacy}
          onChange={(v) => set("privacy", v)}
          error={errors.privacy}
        />
        <a
          href="/privacy"
          target="_blank"
          rel="noopener"
          className="pl-[34px] text-[15px] text-forest underline underline-offset-[3px] hover:text-honey-deep"
        >
          Read the privacy notice
        </a>
      </div>

      <Honeypot id="popup-company" value={trap} onChange={setTrap} />

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={state === "sending"}
          className="font-display min-h-14 w-full rounded-full bg-forest px-8 text-[19px] text-linen transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "sending" ? "Saving…" : "Save my details"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-[15px] text-honey-deep">
            That didn’t save. Please try again, or let me know before you go.
          </p>
        )}
      </div>
    </form>
  );
}

function ThankYou({
  firstName,
  onAnother,
}: {
  firstName: string;
  onAnother: () => void;
}) {
  return (
    <div className="flex min-h-[70dvh] animate-[cvFade_240ms_ease] flex-col items-center justify-center gap-[18px] text-center">
      <h1 className="font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-forest">
        Thank you{firstName ? `, ${firstName}` : ""}
      </h1>
      <div aria-hidden className="h-[2px] w-14 bg-honey" />
      <p className="max-w-[300px]">
        You’re all set. I’ll call your name when it’s your turn.
      </p>
      <p className="max-w-[300px]">Your gallery will come straight to your inbox.</p>
      <p className="font-display mt-2 text-[22px] text-forest italic">Cam x</p>
      <button
        type="button"
        onClick={onAnother}
        className="mt-10 text-[15px] text-muted underline underline-offset-[3px] hover:text-forest"
      >
        Sign someone else up
      </button>
    </div>
  );
}
