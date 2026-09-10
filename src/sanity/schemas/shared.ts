import { defineField } from "sanity";

/**
 * Every image on this site is a photograph, so alt text is never decorative —
 * it's required, and the hotspot matters because crops vary a lot between
 * the masonry grid, the full-bleed heroes and the session cards.
 */
export const photo = (name = "image", title = "Photograph") =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description:
          "Describe the moment for screen readers and search engines, e.g. 'A toddler running through long grass at golden hour'.",
        validation: (rule) => rule.required().max(160),
      }),
    ],
    validation: (rule) => rule.required(),
  });

export const orderField = defineField({
  name: "order",
  title: "Order",
  type: "number",
  description: "Lower numbers appear first.",
  validation: (rule) => rule.required().integer(),
});

export const SESSION_CATEGORIES = [
  { title: "Maternity", value: "maternity" },
  { title: "Newborn & baby", value: "newborn" },
  { title: "Families", value: "families" },
] as const;
