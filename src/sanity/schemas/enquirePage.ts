import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "enquirePage",
  title: "Enquire page",
  type: "document",
  groups: [
    { name: "photos", title: "Photographs" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ ...photo("asideImage", "Photograph beside the form"), group: "photos" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Enquire page" }) },
});
