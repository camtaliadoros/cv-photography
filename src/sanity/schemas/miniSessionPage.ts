import { defineField, defineType, type ConditionalPropertyCallbackContext } from "sanity";
import { heroGallery, photo } from "./shared";

/** True when the page is set to show its booking options side by side. */
const isOptions = ({ document }: Pick<ConditionalPropertyCallbackContext, "document">) =>
  document?.layout === "options";

export default defineType({
  name: "miniSessionPage",
  title: "Mini sessions page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "details", title: "Details" },
    { name: "pricing", title: "Pricing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "enabled",
      title: "Show this page",
      type: "boolean",
      initialValue: true,
      description:
        "Turn off once the event has passed. The page returns a 404 and drops out of the nav and sitemap.",
    }),
    defineField({
      name: "listed",
      title: "Show in the menu",
      type: "boolean",
      initialValue: false,
      description:
        "Leave off to keep the page private: it still works for anyone you send the link to, but it stays out of the menu and sitemap and asks search engines not to index it.",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: "single",
      options: {
        layout: "radio",
        list: [
          { title: "One price — a single session, with its price card", value: "single" },
          { title: "Booking options — two or more ways to book, side by side", value: "options" },
        ],
      },
      description:
        "Use booking options when there's a choice to make, like the Christmas minis at mine or at yours.",
    }),
    photo("heroImage", "Hero photograph"),
    heroGallery(),
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "hero" }),
    defineField({
      name: "heroStandfirst",
      title: "Standfirst",
      type: "string",
      group: "hero",
      description: "The venue and date line, e.g. 'The Pop Up Farm, Flamstead · Saturday 10th October'",
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking link",
      type: "url",
      group: "hero",
      description: "Where 'Book your slot' goes — the Pixieset booking page.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introHeading",
      title: "Intro heading",
      type: "string",
      group: "details",
      hidden: isOptions,
    }),
    defineField({
      name: "introBody",
      title: "Intro body",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "details",
      description: "With booking options, the first paragraph is set large as the lead.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [photo("image", "Photograph")],
      group: "details",
    }),
    defineField({ name: "detailsHeading", title: "Details heading", type: "string", group: "details" }),
    defineField({
      name: "details",
      title: "Details",
      type: "array",
      group: "details",
      description: "When / Where / How long / Who can join.",
      hidden: isOptions,
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "options",
      title: "Booking options",
      type: "array",
      group: "pricing",
      hidden: ({ document }) => !isOptions({ document }),
      description: "Each way to book gets its own card, e.g. 'At mine' and 'At yours'.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
            defineField({
              name: "details",
              title: "Details",
              type: "array",
              description: "When / How long / Includes / Where.",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "value", title: "Value", type: "string" }),
                  ],
                  preview: { select: { title: "label", subtitle: "value" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      group: "pricing",
      hidden: isOptions,
    }),
    defineField({
      name: "priceLabel",
      title: "Price label",
      type: "string",
      group: "pricing",
      hidden: isOptions,
    }),
    defineField({
      name: "priceIncludes",
      title: "What's included",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      group: "pricing",
      hidden: isOptions,
    }),
    defineField({
      name: "priceAddOns",
      title: "Add-ons",
      type: "array",
      of: [{ type: "string" }],
      group: "pricing",
      hidden: isOptions,
    }),
    defineField({
      name: "bookingNote",
      title: "Booking note",
      type: "string",
      group: "pricing",
      hidden: ({ document }) => !isOptions({ document }),
      description: "A line beside the booking link, e.g. 'Payment is taken when you book, to hold your slot.'",
    }),
    defineField({
      name: "priceNotes",
      title: "Notes",
      type: "array",
      group: "pricing",
      description:
        "With booking options these sit in a row under the cards, e.g. Your photos / Early bird / Who can join.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        },
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Mini sessions page" }) },
});
