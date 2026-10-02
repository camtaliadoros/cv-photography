import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Story" },
    { name: "offCamera", title: "Off camera" },
    { name: "closing", title: "Photographs & closing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    photo("heroImage", "Hero photograph"),
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "hero" }),
    defineField({ name: "heroStandfirst", title: "Standfirst", type: "text", rows: 2, group: "hero" }),

    defineField({ name: "storyEyebrow", title: "Eyebrow", type: "string", group: "story" }),
    defineField({
      name: "storyHeading",
      title: "Heading",
      type: "text",
      rows: 2,
      description: "Wrap a word in *asterisks* to set it in italics.",
      group: "story",
    }),
    defineField({
      name: "story",
      title: "Story paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "story",
    }),
    defineField({
      ...photo("storyImage", "Photograph beside the story"),
      group: "story",
      description: "Shown uncropped, at its own shape.",
    }),

    defineField({ name: "offCameraEyebrow", title: "Eyebrow", type: "string", group: "offCamera" }),
    defineField({ name: "offCameraHeading", title: "Heading", type: "string", group: "offCamera" }),
    defineField({
      name: "offCameraItems",
      title: "Things about me",
      type: "array",
      group: "offCamera",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({
              name: "aside",
              title: "Aside",
              type: "string",
              description: "Optional — set after the text in gold italics, e.g. '(all unpaid)'.",
            }),
          ],
          preview: { select: { title: "text", subtitle: "aside" } },
        },
      ],
    }),

    defineField({
      name: "gallery",
      title: "Photographs (three, shown in a row)",
      type: "array",
      group: "closing",
      description: "Shown uncropped. Each photograph's width follows its shape, so the row lines up at one height.",
      of: [photo("image", "Photograph")],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "closingQuote", title: "Closing quote", type: "text", rows: 3, group: "closing" }),

    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
