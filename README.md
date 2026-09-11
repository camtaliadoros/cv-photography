# Cam Velucci Photography

Maternity, newborn and family photography — Hertfordshire and London.
Next.js 16 (App Router) · Sanity · Tailwind 4 · deployed to Netlify.

Built from the approved redesign canvas. Replaces the landing page currently at
camvelucci.com; `/brochure`, `/family-welcome` and `/newborn-welcome` carry over
unchanged because the enquiry autoresponder links to them.

## Running it

```bash
npm install
npm run dev          # http://localhost:3210
```

The Studio is at `/studio`.

## How content works

Every page renders `cms ?? fallback`. The approved design copy lives in
`src/lib/content.ts` and is used whenever a Sanity field is empty, so the site
is complete and correct before the Studio holds a single document, and each
field switches over independently as it's filled in.

Photographs are the exception — there is no fallback for those. They have to
come from Sanity.

### Hidden sections

Two parts of the site are built and working but deliberately not public:

- **Mini sessions** — behind `enabled` on the Mini sessions page document.
  While off, the page 404s and drops out of the nav, footer and sitemap.
- **Journal** — appears once a journal post exists. Until then `/journal` 404s.
- **Portfolio filters** — built and working, off by default
  (`showFilters` on `PortfolioGrid`). Images carry a category regardless, so
  turning the filters on needs no re-tagging.

## Scripts

```bash
node scripts/seed.mjs --target production-v2              # design copy into the Studio
node scripts/migrate-portfolio.mjs --target production-v2 # copy images from the old dataset
node scripts/migrate-portfolio.mjs --dry-run              # preview without writing
```

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset |
| `SANITY_API_READ_TOKEN` | Reads drafts / private datasets |
| `SANITY_WRITE_TOKEN` | Used by the scripts above only |
| `AIRTABLE_TOKEN` · `AIRTABLE_BASE_ID` | Photography CRM base |
| `AIRTABLE_TABLE_ID` | Enquiries table |
| `AIRTABLE_SUBSCRIBERS_TABLE_ID` | Newsletter Subscribers table |
| `RESEND_API_KEY` · `ENQUIRY_NOTIFY_EMAIL` | Enquiry + newsletter email |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics; unset disables the script |

## Forms

Both post to route handlers, both carry honeypots, and neither lets a
third-party failure lose the submission.

- `/api/enquiry` → Airtable **Enquiries** + notification email + branded
  autoresponder. If the newsletter box is ticked it also subscribes.
- `/api/newsletter` → Airtable **Newsletter Subscribers**, deduped by email,
  re-subscribing anyone previously opted out, plus a welcome email.

## Performance notes

- AVIF/WebP through `next/image`; AVIF measures ~54% smaller than JPEG here.
- Blur placeholders and real aspect ratios come from Sanity asset metadata,
  so nothing shifts as images load.
- Fonts are self-hosted by `next/font` — no third-party round trip.
- Sanity image URLs are content-hashed, so they're cached for a year.
- Only the API routes and Studio are dynamic; every page is static.
