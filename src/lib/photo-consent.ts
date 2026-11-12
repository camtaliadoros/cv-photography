/**
 * The "Which photos?" choices on /share-your-photos. Each label must match an
 * option on the single-select in Airtable's Image Consent table exactly
 * (including the straight apostrophes) — the route only accepts these.
 */
export const photoChoices = [
  "Any from my gallery",
  "Only the ones in my 'Happy to share' favourites",
  "Please keep them all private",
] as const;

export type PhotoChoice = (typeof photoChoices)[number];

export const KEEP_PRIVATE: PhotoChoice = "Please keep them all private";

export function isPhotoChoice(value: unknown): value is PhotoChoice {
  return typeof value === "string" && (photoChoices as readonly string[]).includes(value);
}
