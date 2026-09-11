import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
    { name: "approach", title: "Approach" },
    { name: "closing", title: "Closing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    photo("heroImage", "Hero photograph"),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string", group: "hero" }),
    defineField({ name: "heroSubline", title: "Hero subline", type: "string", group: "hero" }),
    defineField({ name: "introEyebrow", title: "Eyebrow", type: "string", group: "intro" }),
    defineField({ name: "introHeading", title: "Heading", type: "string", group: "intro" }),
    defineField({
      name: "introBody",
      title: "Body",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "intro",
    }),
    photo("introImage", "Intro photograph (left, sits lower)"),
    photo("introImageSecondary", "Intro photograph (right)"),
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
    defineField({ name: "closingHeading", title: "Heading", type: "string", group: "closing" }),
    defineField({ name: "closingBody", title: "Body", type: "text", rows: 3, group: "closing" }),
    photo("closingImage", "Closing photograph"),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
