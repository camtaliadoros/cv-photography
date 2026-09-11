# Checking the build against the design

The approved prototype is a working page, not a static export — it renders live
with its own runtime. That means the two can be compared automatically instead
of by eye.

## Setup

The prototype is copied into `public/_design/` (gitignored, never deployed) so
the dev server serves it alongside the real site:

- design: `http://localhost:3210/_design/index.html`
- build:  `http://localhost:3210/`

Both are then measured with the same script, `scripts/fingerprint.js`, which
records *computed* values — what actually painted — rather than markup, since
the two are built completely differently and only the result needs to match.

## What it captures

| Group | Why |
|---|---|
| `sections` | background, vertical/horizontal padding, min-height, inner max-width, column count |
| `headings` | size, family, weight, colour, measure |
| `links` | size, rule colour, text colour, whether an arrow is present |
| `labels` | tracked-caps eyebrows: size, colour, tracking, whether the rule precedes them |
| `images` | corner radius, object-fit |
| `quotes` | size, family, measure, colour |

## Running it

The prototype routes by clicking its own nav, so drive it in the browser:

```js
// In the design tab
await new Promise(r => { const s = document.createElement('script');
  s.src = '/_design/fingerprint.js'; s.onload = r; document.head.appendChild(s); });

function go(label) {
  const el = [...document.querySelectorAll('span,a')]
    .find(e => e.textContent.trim().toLowerCase() === label.toLowerCase() && e.offsetParent);
  if (el) { el.click(); return true; } return false;
}

go('Sessions'); await new Promise(r => setTimeout(r, 700));
window.__fingerprint();
```

Then load the matching route on the build, inject the same script, and diff the
two objects.

## Known false differences

- The fingerprint reads `<main>`, and the build's newsletter block lives in the
  footer while the prototype keeps it in the page body. Compare that one
  separately.
- Sections that depend on content — Recent work needs featured images, Journal
  needs a post — are absent from the build until the CMS has that content.
  Absence there is a data gap, not a layout bug.
