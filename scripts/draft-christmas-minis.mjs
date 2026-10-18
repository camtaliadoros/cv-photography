/**
 * Copies the published mini sessions page into a draft and fills it with the
 * Christmas minis copy for the booking-options layout. Nothing goes live: open
 * the page in the Studio, check it over and press Publish.
 *
 * Refuses to run if a draft already exists, so it never overwrites edits.
 *
 *   node scripts/draft-christmas-minis.mjs [--target production-v2]
 */

import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const args = process.argv.slice(2);
const TARGET = args.includes("--target") ? args[args.indexOf("--target") + 1] : "production-v2";

const API = `https://${PROJECT}.api.sanity.io/v2024-01-01`;
const auth = { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };

const CHRISTMAS = {
  layout: "options",
  heroEyebrow: "Christmas mini sessions",
  heroHeading: "Christmas with your little gang",
  heroStandfirst: "At mine in Harpenden or at yours · from £75",
  introBody: [
    "Christmas has a way of sneaking up on us. Before you know it, it's all over in a blur of wrapping paper. This is your chance to hold on to a little of it, just as it is this year.",
    "Short, gently guided sessions, with plenty of giggles, and over before anyone gets bored. Lovely for Christmas cards, a gift for the grandparents, or just for you.",
  ],
  detailsHeading: "Two ways to do it",
  options: [
    {
      _key: "mine",
      name: "At mine",
      price: "£75",
      summary:
        "My cosy home studio in Harpenden. Everything's set up, so you just turn up and settle in.",
      details: [
        { _key: "when", label: "When", value: "Saturday 21 November" },
        { _key: "long", label: "How long", value: "20 minutes" },
        { _key: "incl", label: "Includes", value: "3 edited images" },
      ],
    },
    {
      _key: "yours",
      name: "At yours",
      price: "£115",
      summary:
        "Your tree, your decorations, your traditions. Nobody needs to get their shoes on.",
      details: [
        { _key: "when", label: "When", value: "Saturday 5 December" },
        { _key: "long", label: "How long", value: "30 minutes" },
        { _key: "incl", label: "Includes", value: "3 edited images" },
        { _key: "where", label: "Where", value: "Within 15 minutes of Harpenden" },
      ],
    },
  ],
  priceNotes: [
    {
      _key: "photos",
      heading: "Your photos",
      body: "Within a week, a private online gallery of 15 photos to choose your three from. Extra images are £30 each, or keep all 15 for £75.",
    },
    {
      _key: "early",
      heading: "Early bird",
      body: "Book in October and the full gallery is £50 instead of £75.",
    },
    {
      _key: "who",
      heading: "Who can join",
      body: "A grown-up or two and the little ones. A mini won't stretch to the whole clan, but I'd love to fit everyone in at a full session another time.",
    },
  ],
  bookingNote: "Payment is taken when you book, to hold your slot.",
};

async function query(groq) {
  const res = await fetch(
    `${API}/data/query/${TARGET}?perspective=raw&query=${encodeURIComponent(groq)}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } },
  );
  const { result } = await res.json();
  return result;
}

async function main() {
  const draft = await query('*[_id == "drafts.miniSessionPage"][0]._id');
  if (draft) {
    console.error("A draft of the mini sessions page already exists. Publish or discard it first.");
    process.exit(1);
  }

  const published = await query('*[_id == "miniSessionPage"][0]');
  if (!published) {
    console.error("No published mini sessions page to start from.");
    process.exit(1);
  }

  // Keep every published field (photos, booking link, SEO) and lay the new copy over it.
  const { _rev, _createdAt, _updatedAt, _system, ...rest } = published; // eslint-disable-line no-unused-vars
  const doc = { ...rest, ...CHRISTMAS, _id: "drafts.miniSessionPage" };

  const res = await fetch(`${API}/data/mutate/${TARGET}`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  });
  if (!res.ok) {
    console.error("Draft failed:", JSON.stringify(await res.json(), null, 2));
    process.exit(1);
  }
  console.log(`✓ Draft of the mini sessions page created in "${TARGET}". Review and publish it in the Studio.`);
}

main();
