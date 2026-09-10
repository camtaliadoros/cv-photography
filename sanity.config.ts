import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Page documents there should only ever be one of. Listing them as editable
 * items rather than collections stops a second "Home page" being created by
 * accident, which would leave the site silently rendering the wrong one.
 */
const SINGLETONS = [
  { id: "siteSettings", title: "Site settings" },
  { id: "homePage", title: "Home page" },
  { id: "aboutPage", title: "About page" },
  { id: "sessionsPage", title: "Sessions page" },
  { id: "miniSessionPage", title: "Mini sessions page" },
] as const;

const singletonIds = SINGLETONS.map((s) => s.id) as readonly string[];

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Cam Velucci Photography",
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonIds.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonIds.includes(schemaType)
        ? actions.filter(
            ({ action }) => action && !["unpublish", "delete", "duplicate"].includes(action),
          )
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...SINGLETONS.map(({ id, title }) =>
              S.listItem()
                .title(title)
                .id(id)
                .child(S.document().schemaType(id).documentId(id).title(title)),
            ),
            S.divider(),
            S.documentTypeListItem("portfolioImage").title("Portfolio images"),
            S.documentTypeListItem("sessionType").title("Session types"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("faqItem").title("FAQs"),
            S.documentTypeListItem("journalPost").title("Journal posts"),
          ]),
    }),
    visionTool(),
  ],
});
