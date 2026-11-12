"use client";

import { useState } from "react";
import {
  Checkbox,
  Honeypot,
  Radio,
  TextArea,
  TextField,
} from "@/components/form-controls";
import { KEEP_PRIVATE, photoChoices, type PhotoChoice } from "@/lib/photo-consent";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "done" | "error";
type Errors = Partial<Record<"name" | "email" | "photos" | "privacy", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const questionClass = "font-display text-[22px] leading-[1.25] text-forest";

export function ConsentForm({ initialName }: { initialName: string }) {
  const [values, setValues] = useState({
    name: initialName,
    email: "",
    photos: "" as PhotoChoice | "",
    // Every tick starts empty: consent has to be given, not left in place.
    website: false,
    social: false,
    print: false,
    avoid: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");
  // Bots fill every field they find; people never see this one.
  const [trap, setTrap] = useState("");

  const keepPrivate = values.photos === KEEP_PRIVATE;

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const found: Errors = {};
    if (!values.name.trim()) found.name = "Please add your name";
    if (!EMAIL_RE.test(values.email.trim())) found.email = "Please check your email address";
    if (!values.photos) found.photos = "Please choose one of these";
    if (!values.privacy) found.privacy = "Please tick to confirm you’ve read it";
    return found;
  }

  function focusFirst(found: Errors) {
    const first = (["name", "email", "photos", "privacy"] as const).find((k) => found[k]);
    if (first) document.getElementById(first === "photos" ? "consent-photos-0" : `consent-${first}`)?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirst(found);
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/photo-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // Hidden boxes may still hold earlier ticks; private means none.
          website: !keepPrivate && values.website,
          social: !keepPrivate && values.social,
          print: !keepPrivate && values.print,
          company: trap,
        }),
      });
      if (res.status === 400) {
        const data = (await res.json()) as { errors?: Errors };
        setErrors(data.errors ?? {});
        focusFirst(data.errors ?? {});
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

  if (state === "done") return <ThankYou />;

  const mail = (
    <a href={`mailto:${site.email}`} className="underline underline-offset-[3px]">
      {site.email}
    </a>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-[18px] flex flex-col gap-10">
      <header className="flex flex-col gap-3.5 pt-[18px]">
        <h1 className="font-display text-[36px] leading-[1.1] tracking-[-0.02em] text-forest">
          Sharing your photos
        </h1>
        <p>
          I’d love to share a few of your photos, but only if you’re comfortable.
          It takes about a minute, and it’s completely fine to say no or pick
          just a few. You can change your mind any time.
        </p>
      </header>

      <div className="flex flex-col gap-[18px]">
        <TextField
          id="consent-name"
          label="Your name"
          autoComplete="name"
          value={values.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          required
        />
        <TextField
          id="consent-email"
          label="Your email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          required
        />

        <fieldset
          className="mt-4 flex flex-col gap-3.5"
          aria-describedby={`consent-photos-hint${errors.photos ? " consent-photos-error" : ""}`}
        >
          <legend className={`${questionClass} mb-3.5`}>
            Which photos am I welcome to share?
          </legend>
          {photoChoices.map((choice, i) => (
            <Radio
              key={choice}
              id={`consent-photos-${i}`}
              name="photos"
              // Airtable's option uses straight quotes; show curly ones.
              label={choice.replace("'Happy to share'", "‘Happy to share’")}
              checked={values.photos === choice}
              onChange={() => set("photos", choice)}
              error={!!errors.photos}
            />
          ))}
          {errors.photos && (
            <p id="consent-photos-error" className="pl-[34px] text-[15px] text-honey-deep">
              {errors.photos}
            </p>
          )}
          <p id="consent-photos-hint" className="text-[15px] text-muted">
            Want to pick specific ones? Tap the heart on them in your gallery and
            add them to your ‘Happy to share’ list.
          </p>
        </fieldset>
      </div>

      {!keepPrivate && (
        <fieldset className="flex animate-[cvFade_240ms_ease] flex-col gap-4">
          <legend className={`${questionClass} mb-2`}>
            Where am I welcome to share them?
          </legend>
          <p className="text-[15px] text-muted">
            Tick any that feel right and leave the rest blank.
          </p>
          <Checkbox
            id="consent-website"
            label="My website"
            description="A favourite or two may appear on camvelucci.com"
            checked={values.website}
            onChange={(v) => set("website", v)}
          />
          <Checkbox
            id="consent-social"
            label="Instagram & Facebook"
            description="A favourite or two may appear on my social media"
            checked={values.social}
            onChange={(v) => set("social", v)}
          />
          <Checkbox
            id="consent-print"
            label="Printed marketing"
            description="Flyers, brochures and similar. Printed items already handed out can’t be recalled if you change your mind later."
            checked={values.print}
            onChange={(v) => set("print", v)}
          />
        </fieldset>
      )}

      <fieldset className="flex flex-col gap-[18px]">
        <legend className={`${questionClass} mb-[18px]`}>Last bits</legend>
        <TextArea
          id="consent-avoid"
          label="Anything you’d like me to avoid?"
          hint="Optional"
          placeholder="e.g. please don’t tag our location, or don’t use first names"
          rows={3}
          value={values.avoid}
          onChange={(v) => set("avoid", v)}
        />
        <div className="flex flex-col gap-2 border-t border-straw pt-[22px]">
          <Checkbox
            id="consent-privacy"
            label={
              <>
                I’ve read{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener"
                  className="text-forest underline underline-offset-[3px] hover:text-honey-deep"
                >
                  how my photos and details are used
                </a>
              </>
            }
            checked={values.privacy}
            onChange={(v) => set("privacy", v)}
            error={errors.privacy}
          />
          <p className="pl-[34px] text-[15px] text-muted">
            You can change your mind any time by emailing {mail}
          </p>
        </div>
      </fieldset>

      <Honeypot id="consent-company" value={trap} onChange={setTrap} />

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={state === "sending"}
          className="font-display min-h-14 w-full rounded-full bg-forest px-8 text-[19px] text-linen transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send my choices"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-[15px] text-honey-deep">
            That didn’t send. Please try again, or email me at {mail}.
          </p>
        )}
      </div>
    </form>
  );
}

function ThankYou() {
  return (
    <div className="flex min-h-[70dvh] animate-[cvFade_240ms_ease] flex-col items-center justify-center gap-[18px] text-center">
      <h1 className="font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-forest">
        Thank you, that’s all done.
      </h1>
      <div aria-hidden className="h-[2px] w-14 bg-honey" />
      <p className="max-w-[300px]">
        If you ever change your mind, just email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-[3px]">
          {site.email}
        </a>
      </p>
      <p className="font-display mt-2 text-[22px] text-forest italic">Cam x</p>
    </div>
  );
}
