import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Story" },
    { name: "approach", title: "Approach" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    photo("heroImage", "Hero photograph"),
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "hero" }),
    defineField({
      name: "story",
      title: "Story paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "story",
    }),
    defineField({ name: "storyPullQuote", title: "Pull quote", type: "string", group: "story" }),
    defineField({
      name: "gallery",
      title: "Photographs (three, shown in a row)",
      type: "array",
      group: "story",
      of: [photo("image", "Photograph")],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "approachHeading", title: "Heading", type: "string", group: "approach" }),
    defineField({
      name: "approachColumns",
      title: "Columns",
      type: "array",
      group: "approach",
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
    defineField({ name: "approachPullQuote", title: "Pull quote", type: "string", group: "approach" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
