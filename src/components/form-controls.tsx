import { fieldClass, fieldLabelClass } from "@/components/field";

/*
 * Form controls shared by the standalone, phone-first forms (the pop-up
 * sign-up sheet and the photo-sharing consent page). Text is 17px so iOS
 * Safari doesn't zoom into a field on focus.
 */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <legend className="mb-[18px] flex items-center gap-3 text-[13px] font-bold tracking-[0.18em] text-moss uppercase">
      <span aria-hidden className="h-[1.5px] w-6 bg-current" />
      {children}
    </legend>
  );
}

function FieldNotes({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[15px] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[15px] text-honey-deep">
          {error}
        </p>
      )}
    </>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

export function TextField({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${fieldClass} text-[17px] ${error ? "border-honey-deep" : ""}`}
        {...props}
      />
      <FieldNotes id={id} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({
  id,
  label,
  hint,
  value,
  onChange,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={describedBy(id, hint)}
        className={`${fieldClass} min-h-28 resize-y text-[17px]`}
        {...props}
      />
      <FieldNotes id={id} hint={hint} />
    </div>
  );
}

const tick = (
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
);

/** Same drawn box as the enquiry form's mailing-list tick. */
export function Checkbox({
  id,
  label,
  description,
  checked,
  onChange,
  error,
}: {
  id: string;
  label: React.ReactNode;
  /** A quieter line under the label. */
  description?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={`mt-[3px] flex h-5 w-5 flex-none items-center justify-center rounded-[3px] border-[1.5px] bg-linen-raised text-linen transition-colors peer-checked:bg-forest peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-moss/40 ${
            error ? "border-honey-deep" : "border-forest"
          }`}
        >
          {tick}
        </span>
        <span>
          {label}
          {description && (
            <span className="mt-0.5 block text-[15px] text-muted">{description}</span>
          )}
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-[34px] text-[15px] text-honey-deep">
          {error}
        </p>
      )}
    </div>
  );
}

/** A round version of the checkbox, for one-of-several choices. */
export function Radio({
  id,
  name,
  label,
  checked,
  onChange,
  error,
}: {
  id: string;
  name: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  error?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3.5">
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={`mt-[3px] flex h-5 w-5 flex-none items-center justify-center rounded-full border-[1.5px] bg-linen-raised transition-colors peer-checked:[&>span]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-moss/40 ${
          error ? "border-honey-deep" : "border-forest"
        }`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-forest opacity-0 transition-opacity" />
      </span>
      <span>{label}</span>
    </label>
  );
}

/** Hidden from people, irresistible to bots. Server treats a value as spam. */
export function Honeypot({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden className="absolute -left-[9999px]">
      <label htmlFor={id}>Company</label>
      <input
        id={id}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
