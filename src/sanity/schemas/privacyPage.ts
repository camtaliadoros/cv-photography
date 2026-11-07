import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "privacyPage",
  title: "Privacy policy",
  type: "document",
  fields: [
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      description: "Shown under the title. Change it whenever you edit the policy.",
      options: { dateFormat: "D MMMM YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Policy",
      type: "array",
      validation: (r) => r.required(),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [{ title: "Bold", value: "strong" }],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    description: "A web address, mailto:you@example.com, or #heading-name for a heading on this page.",
                    validation: (r) =>
                      r.required().uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Privacy policy" }) },
});
