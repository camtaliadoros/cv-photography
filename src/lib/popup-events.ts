/**
 * Pop-up events the sign-up page knows about, keyed by the `?event=` slug on
 * the link. The name must match an option on the Event field in Airtable's
 * Pop-Up Sign-Ups table exactly — that's how each sign-up gets tagged.
 */
export const popupEvents: Record<string, string> = {
  "singing-mamas": "Singing Mamas – St Albans pop-up",
};

export function popupEventName(slug: unknown): string | undefined {
  return typeof slug === "string" ? popupEvents[slug] : undefined;
}
