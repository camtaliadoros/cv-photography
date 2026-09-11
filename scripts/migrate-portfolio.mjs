/**
 * Copies the portfolio images from the old `production` dataset into a new one,
 * reshaping them for the redesigned schema.
 *
 * The old site still reads `production`, so nothing there is touched — assets
 * are re-uploaded into the target dataset and fresh documents are created.
 *
 *   node scripts/migrate-portfolio.mjs [--target production-v2] [--dry-run]
 */

import { readFileSync } from "node:fs";

// --- env -------------------------------------------------------------------
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const SOURCE = "production";
const args = process.argv.slice(2);
const TARGET = args.includes("--target") ? args[args.indexOf("--target") + 1] : "production-v2";
const DRY_RUN = args.includes("--dry-run");

if (!PROJECT || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const API = `https://${PROJECT}.api.sanity.io/v2024-01-01`;
const auth = { Authorization: `Bearer ${TOKEN}` };

/** Old schema used the singular "family"; the redesign uses "families". */
const CATEGORY_MAP = { family: "families", families: "families", maternity: "maternity", newborn: "newborn" };

async function main() {
  const query = encodeURIComponent(
    `*[_type=="portfolioImage"] | order(_createdAt asc){_id, alt, category, featured, "ref": image.asset._ref}`,
  );
  const res = await fetch(`${API}/data/query/${SOURCE}?query=${query}`, { headers: auth });
  const { result } = await res.json();

  console.log(`Found ${result.length} portfolio images in "${SOURCE}".`);

  const uncategorised = result.filter((d) => !CATEGORY_MAP[d.category]);
  if (uncategorised.length) {
    console.log(
      `\n  ${uncategorised.length} have no usable category and will be tagged "families".`,
      `\n  Retag them in the Studio — the portfolio filters read this field.\n`,
    );
  }

  if (DRY_RUN) {
    for (const doc of result) {
      console.log(`  ${CATEGORY_MAP[doc.category] ?? "families"}  ${doc.alt ?? "(no alt text)"}`);
    }
    console.log("\nDry run — nothing written.");
    return;
  }

  const mutations = [];

  for (const [index, doc] of result.entries()) {
    const assetId = await copyAsset(doc.ref);
    if (!assetId) {
      console.warn(`  ! skipped ${doc._id} — asset copy failed`);
      continue;
    }

    mutations.push({
      create: {
        _type: "portfolioImage",
        // Alt text moves from the document onto the image, where the new
        // schema keeps it alongside the hotspot.
        image: { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: doc.alt ?? "" },
        category: CATEGORY_MAP[doc.category] ?? "families",
        featured: index < 8, // Seed the home page grid; adjust in the Studio.
        order: index,
      },
    });
    console.log(`  ✓ ${index + 1}/${result.length}  ${doc.alt?.slice(0, 60) ?? "(no alt)"}`);
  }

  const write = await fetch(`${API}/data/mutate/${TARGET}`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }),
  });

  if (!write.ok) {
    console.error("Write failed:", JSON.stringify(await write.json(), null, 2));
    process.exit(1);
  }

  console.log(`\nCreated ${mutations.length} documents in "${TARGET}".`);
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
