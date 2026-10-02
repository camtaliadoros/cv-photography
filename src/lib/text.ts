import type { PortableTextBlock } from "@portabletext/types";

/**
 * Content that a CMS field might hold either as a plain string or as Portable
 * Text, depending on when the document was written.
 */
export type MaybeRichText = string | PortableTextBlock[] | null | undefined;

/**
 * Flattens a CMS text field to a plain string.
 *
 * Schemas drift — a field authored as Portable Text in an earlier generation of
 * the Studio still returns blocks long after the schema says `text`. Rendering
 * those blocks directly throws "Objects are not valid as a React child" and, in
 * a static build, takes the whole build down. Degrading to plain text keeps a
 * mismatched document readable instead of fatal.
 */
export function toPlainText(value: MaybeRichText): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (typeof block === "string") return block;
      const children = (block as { children?: { text?: string }[] }).children;
      if (!Array.isArray(children)) return "";
      return children.map((child) => child?.text ?? "").join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Same, for fields that hold a list of paragraphs.
 *
 * Each list item is a Studio text box, and it's natural to type several
 * paragraphs into one box with blank lines between them — so every item is
 * split on blank lines too, rather than trusting one item to mean one <p>.
 */
export function toParagraphs(value: MaybeRichText | MaybeRichText[]): string[] {
  const items =
    Array.isArray(value) && value.every((v) => typeof v === "string")
      ? (value as string[])
      : [toPlainText(value as MaybeRichText)];
  return items
    .flatMap((item) => item.split(/\n\s*\n/))
    .map((para) => para.trim())
    .filter(Boolean);
}
