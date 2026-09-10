import { defineField, defineType } from "sanity";
import { photo, orderField, SESSION_CATEGORIES } from "./shared";

export default defineType({
  name: "portfolioImage",
  title: "Portfolio image",
  type: "document",
  fields: [
    photo("image", "Photograph"),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...SESSION_CATEGORIES] },
      description:
        "Used by the portfolio filters. The filters are hidden on the site for now, but tagging as you upload means they work the moment you switch them on.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      initialValue: false,
    }),
    orderField,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { media: "image", subtitle: "category", title: "image.alt" },
  },
});
