import { defineType } from "sanity";
import { photo } from "./shared";

export default defineType({
  name: "enquirePage",
  title: "Enquire page",
  type: "document",
  fields: [
    photo("heroImage", "Hero photograph"),
    photo("asideImage", "Photograph beside the form"),
  ],
  preview: { prepare: () => ({ title: "Enquire page" }) },
});
