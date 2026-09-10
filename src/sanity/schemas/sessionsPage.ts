import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "sessionsPage",
  title: "Sessions page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "approach", title: "Approach" },
    { name: "pricing", title: "Pricing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    photo("heroImage", "Hero photograph"),
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "hero" }),
    defineField({ name: "heroStandfirst", title: "Standfirst", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "introBody", title: "Intro body", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "approachHeading", title: "Heading", type: "string", group: "approach" }),
    defineField({
      name: "approachBody",
      title: "Body",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "approach",
    }),
    defineField({ name: "approachPullQuote", title: "Pull quote", type: "string", group: "approach" }),
    photo("approachImage", "Approach photograph"),

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
