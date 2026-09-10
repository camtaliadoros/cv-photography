import { defineField, defineType } from "sanity";
import { photo, orderField, SESSION_CATEGORIES } from "./shared";

export default defineType({
  name: "sessionType",
  title: "Session type",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...SESSION_CATEGORIES] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "The short line under the title, e.g. 'The quiet before the beginning'.",
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    photo("image", "Photograph"),
    orderField,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tagline", media: "image" } },
});
