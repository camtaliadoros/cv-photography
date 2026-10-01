import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Story" },
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
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
