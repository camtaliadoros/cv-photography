import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "sessionsPage",
  title: "Sessions page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "types", title: "Session types" },
    { name: "reasons", title: "Why book" },
    { name: "approach", title: "Approach" },
    { name: "pricing", title: "Pricing" },
    { name: "testimonial", title: "Testimonial" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    photo("heroImage", "Hero photograph"),
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "hero" }),
    defineField({ name: "heroStandfirst", title: "Standfirst", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "typesEyebrow", title: "Eyebrow", type: "string", group: "types" }),
    defineField({
      name: "typesHeading",
      title: "Heading",
      type: "string",
      group: "types",
      description: "The session cards themselves are edited under Session types.",
    }),
    defineField({ name: "reasonsEyebrow", title: "Eyebrow", type: "string", group: "reasons" }),
    defineField({ name: "reasonsHeading", title: "Heading", type: "string", group: "reasons" }),
    defineField({
      name: "reasons",
      title: "Points",
      type: "array",
      group: "reasons",
      description: "Numbered automatically, in this order. Four sit in a row on desktop.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        },
      ],
    }),
    defineField({ name: "approachHeading", title: "Heading", type: "string", group: "approach" }),
    defineField({
      name: "approachBody",
      title: "Body",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "approach",
    }),
    defineField({ name: "approachPullQuote", title: "Pull quote", type: "string", group: "approach" }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      group: "testimonial",
      description:
        "Which testimonial to show. The words themselves are edited under Testimonials. Leave empty to use the first one.",
    }),
    defineField({ ...photo("testimonialImage", "Backdrop photograph"), group: "testimonial" }),

    defineField({ name: "priceHeading", title: "Heading", type: "string", group: "pricing" }),
    defineField({
      name: "priceStandard",
      title: "Standard price",
      type: "string",
      group: "pricing",
      description: "Shown struck through when an intro price is set, e.g. £250",
    }),
    defineField({
      name: "priceIntro",
      title: "Introductory price",
      type: "string",
      group: "pricing",
      description: "The headline price, e.g. £150. Leave empty to show only the standard price.",
    }),
    defineField({ name: "priceIntroLabel", title: "Intro price label", type: "string", group: "pricing" }),
    defineField({ name: "priceIntroNote", title: "Intro price note", type: "text", rows: 3, group: "pricing" }),
    defineField({
      name: "priceIncludes",
      title: "What's included",
      type: "array",
      of: [{ type: "text", rows: 2 }],
      group: "pricing",
    }),
    defineField({
      name: "priceNotes",
      title: "Notes",
      type: "array",
      group: "pricing",
      description: "The smaller cards below the price — add-ons, payment schedule, travel.",
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
  preview: { prepare: () => ({ title: "Sessions page" }) },
});
