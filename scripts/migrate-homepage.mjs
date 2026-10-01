/**
 * Copies the `homePage` singleton (and its referenced images) from the old
 * `production` dataset into `production-v2` — the dataset this app actually
 * reads (see src/sanity/lib/client.ts / .env.local).
 *
 * The Studio was edited against `production` (an older/duplicate dataset),
 * so the images never showed up on the live site, which only ever queries
 * `production-v2`. This does a one-time createOrReplace of "homePage" in the
 * target, re-uploading each image asset the same way migrate-portfolio.mjs
 * does.
 *
 *   node scripts/migrate-homepage.mjs [--source production] [--target production-v2] [--dry-run]
 */

import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const args = process.argv.slice(2);
const SOURCE = args.includes("--source") ? args[args.indexOf("--source") + 1] : "production";
const TARGET = args.includes("--target") ? args[args.indexOf("--target") + 1] : "production-v2";
const DRY_RUN = args.includes("--dry-run");

if (!PROJECT || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const API = `https://${PROJECT}.api.sanity.io/v2024-01-01`;
const auth = { Authorization: `Bearer ${TOKEN}` };

const IMAGE_FIELDS = [
  "heroImage",
  "introImage",
  "introImageSecondary",
  "approachImage",
  "testimonialImage",
  "closingImage",
];

async function main() {
  const query = encodeURIComponent(`*[_id=="homePage"][0]`);
  const res = await fetch(`${API}/data/query/${SOURCE}?query=${query}`, { headers: auth });
  const { result: doc } = await res.json();

  if (!doc) {
    console.error(`No "homePage" document found in "${SOURCE}".`);
    process.exit(1);
  }

  console.log(`Found homePage in "${SOURCE}" (updated ${doc._updatedAt}).`);

  const next = { _id: "homePage", _type: "homePage" };
  for (const [key, value] of Object.entries(doc)) {
    if (key.startsWith("_")) continue;
    next[key] = value;
  }

  for (const field of IMAGE_FIELDS) {
    const image = doc[field];
    if (!image?.asset?._ref) continue;

    if (DRY_RUN) {
      console.log(`  would copy ${field}: ${image.asset._ref}`);
      continue;
    }

    const assetId = await copyAsset(image.asset._ref);
    if (!assetId) {
      console.warn(`  ! skipped ${field} — asset copy failed`);
      delete next[field];
      continue;
    }

    next[field] = { ...image, asset: { _type: "reference", _ref: assetId } };
    console.log(`  ✓ ${field}`);
  }

  if (DRY_RUN) {
    console.log("\nDry run — nothing written.");
    return;
  }

  const write = await fetch(`${API}/data/mutate/${TARGET}`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ createOrReplace: next }] }),
  });

  if (!write.ok) {
    console.error("Write failed:", JSON.stringify(await write.json(), null, 2));
    process.exit(1);
  }

  console.log(`\nWrote homePage into "${TARGET}".`);
}

/** Streams an asset out of the source dataset and into the target. */
async function copyAsset(ref) {
  if (!ref) return null;
  // image-<hash>-<w>x<h>-<ext>  →  https://cdn.sanity.io/images/<project>/<dataset>/<hash>-<w>x<h>.<ext>
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  const [, hash, dims, ext] = match;

  const source = `https://cdn.sanity.io/images/${PROJECT}/${SOURCE}/${hash}-${dims}.${ext}`;
  const file = await fetch(source);
  if (!file.ok) return null;

  const upload = await fetch(`${API}/assets/images/${TARGET}`, {
    method: "POST",
    headers: { ...auth, "Content-Type": file.headers.get("content-type") ?? `image/${ext}` },
    body: Buffer.from(await file.arrayBuffer()),
  });

  if (!upload.ok) return null;
  const { document } = await upload.json();
  return document._id;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
