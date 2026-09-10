import { defineField, defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "journalPost",
  title: "Journal post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Sessions", "Guides", "Notes"] },
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({ name: "standfirst", title: "Standfirst", type: "text", rows: 3 }),
    photo("coverImage", "Cover photograph"),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] },
        photo("image", "Photograph"),
      ],
    }),
    defineField({ name: "pullQuote", title: "Pull quote", type: "string" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [photo("image", "Photograph")],
    }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3 }),
  ],
  orderings: [
    { title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
