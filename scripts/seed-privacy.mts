/**
 * Creates the "Privacy policy" document in Sanity from the built-in copy in
 * src/lib/privacy-policy.ts, so the Studio opens with the current policy to
 * edit. Never overwrites: if the document already exists, it does nothing.
 *
 *   node scripts/seed-privacy.mts [--target production-v2]
 */

import { readFileSync } from "node:fs";
import { PRIVACY_LAST_UPDATED, PRIVACY_POLICY } from "../src/lib/privacy-policy.ts";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const args = process.argv.slice(2);
const TARGET = args.includes("--target") ? args[args.indexOf("--target") + 1] : "production-v2";

if (!PROJECT || !TOKEN) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN must be set in .env.local");
  process.exit(1);
}

const res = await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${TARGET}`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    mutations: [
      {
        createIfNotExists: {
          _id: "privacyPage",
          _type: "privacyPage",
          lastUpdated: PRIVACY_LAST_UPDATED,
          body: PRIVACY_POLICY,
        },
      },
    ],
  }),
});

if (!res.ok) {
  console.error(`Sanity returned ${res.status}: ${await res.text()}`);
  process.exit(1);
}
console.log(`Privacy policy is in "${TARGET}" (left untouched if it was already there).`);
