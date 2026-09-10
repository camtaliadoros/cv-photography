import { defineField, defineType } from "sanity";
import { photo } from "./shared";

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
    photo("heroImage", "Hero photograph"),
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
    defineField({ name: "introHeading", title: "Intro heading", type: "string", group: "details" }),
    defineField({
      name: "introBody",
      title: "Intro body",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "details",
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
    defineField({ name: "price", title: "Price", type: "string", group: "pricing" }),
    defineField({ name: "priceLabel", title: "Price label", type: "string", group: "pricing" }),
    defineField({
      name: "priceIncludes",
      title: "What's included",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      group: "pricing",
    }),
    defineField({
      name: "priceAddOns",
      title: "Add-ons",
      type: "array",
      of: [{ type: "string" }],
      group: "pricing",
    }),
    defineField({
      name: "priceNotes",
      title: "Notes",
      type: "array",
      group: "pricing",
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
