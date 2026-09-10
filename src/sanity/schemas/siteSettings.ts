import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "banner", title: "Announcement banner" },
    { name: "newsletter", title: "Newsletter" },
    { name: "contact", title: "Contact & footer" },
  ],
  fields: [
    defineField({
      name: "bannerEnabled",
      title: "Show announcement banner",
      type: "boolean",
      group: "banner",
      initialValue: false,
    }),
    defineField({
      name: "bannerText",
      title: "Banner text",
      type: "string",
      group: "banner",
      description: "e.g. 'Pumpkin patch mini sessions — Saturday 10th October, now booking'",
    }),
    defineField({
      name: "bannerHref",
      title: "Banner link",
      type: "string",
      group: "banner",
      description: "Where the banner goes when clicked, e.g. /mini-sessions",
      initialValue: "/mini-sessions",
    }),
    defineField({
      name: "newsletterHeading",
      title: "Newsletter heading",
      type: "string",
      group: "newsletter",
      initialValue: "Mini session dates, before anyone else.",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter body",
      type: "text",
      rows: 3,
      group: "newsletter",
    }),
    defineField({
      name: "popupEnabled",
      title: "Show newsletter popup",
      type: "boolean",
      group: "newsletter",
      initialValue: false,
      description: "Appears once per visitor after they've scrolled a little.",
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "footerSeoLine",
      title: "Footer location line",
      type: "text",
      rows: 2,
      group: "contact",
      description: "The line naming the towns you cover — this one does real SEO work.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
