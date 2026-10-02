import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolioPage",
  title: "Portfolio page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({
      name: "heroHeading",
      title: "Heading",
      type: "string",
      group: "hero",
      description: "The photographs themselves are edited under Portfolio images.",
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Portfolio page" }) },
});
