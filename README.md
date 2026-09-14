# Clinic Site Template

A white-label website for a dental or medical clinic. Zero build step — plain
HTML, CSS and vanilla JS — so it hosts free on GitHub Pages, Netlify or Vercel
and a clinic can be handed the repo without anyone explaining npm to them.

Configure one file, run one command, deploy.

```bash
npm run check    # validate the config
npm run apply    # write it into every page
npm run dev      # serve locally at http://localhost:8000
```

---

## What a clinic gets

- **Bilingual** — English / বাংলা toggle, remembered per visitor. The indexed
  `<head>` language is set separately from the first-paint language, so you can
  serve Bangla-first and still rank on English local-search terms.
- **Booking straight to WhatsApp** — no backend required, and no form a patient
  abandons halfway. Optional Firebase capture on top.
- **Cost estimator** wired to the clinic's real price list, with per-tooth
  quantities.
- **Pricing table** grouped by category.
- **Before/after sliders**, filterable. Off by default — see the consent note
  below.
- **Service detail pages**, blog, gallery, careers, and the legal set (privacy,
  terms, medical disclaimer).
- **Admin dashboard** — visit records, payments, dues, Excel export, and live
  website bookings. Opens by tapping the logo five times.
- **Booking alerts** — a Google Apps Script emails each booking to the clinic
  and appends it to a spreadsheet in their own Drive. Free, no server.
- **SEO** — per-page canonical URLs, Open Graph, and `Dentist`/`MedicalClinic`
  JSON-LD generated from config so the structured data cannot drift out of step
  with what is on the page.

---

## The one file you edit

`assets/clinic.config.js` holds everything client-specific: name, contact
details, address, coordinates, opening hours, brand colours, currency,
practitioner, and feature switches.

`npm run apply` reads it and writes it into every page, the sitemap and
robots.txt. It is idempotent — safe to re-run, safe in a pre-deploy hook.

### Why this exists

The site this template was built from hardcoded its own address into 100+
absolute URLs — every canonical tag, every `og:image`, all 25 sitemap entries.
Moving it to a real domain meant a find-and-replace across the whole repo, and a
single missed occurrence points a canonical tag at a domain the clinic no longer
controls, which tells Google the real site is the duplicate.

Here you change `site.baseUrl` once. `apply` also hunts down any surviving
absolute URL pointing at a previous host and rewrites it.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run check` | Validates the config. Fails while any placeholder remains. |
| `npm run apply` | Writes config into every page, sitemap, robots.txt. Idempotent. |
| `npm run diff` | Same, but writes nothing — shows what would change. |
| `npm run rename -- --from "Old Clinic"` | One-time, at fork: clears the previous clinic's name out of body copy. Leaves email addresses alone and reports them. |
| `npm run dev` | Serves the site locally. |

`apply` never touches body copy, so a clinic that edits its own homepage will
not have the edit reverted on the next deploy. `rename` does touch body copy,
which is why it is separate and run exactly once.

---

## Two things to get right before going live

**1. Firestore rules.** Firebase enables public email/password self-registration
by default. A rule of `allow read: if request.auth != null` therefore means
*anyone who signs up* can read every patient name, phone number and treatment
record — the project's API key ships to every visitor's browser, and the Auth
REST endpoint is open to the internet.

`firestore.rules` here pins reads to a single owner UID instead. Set
`ownerUid()` and disable self-registration. Both. The header comment in that
file walks through it.

**2. Before/after photos.** `features.beforeAfter` is off by default. Those are
real patients: consent to appear on their own clinic's site is not consent to
appear on another clinic's, or in a template. Ship it only with written consent
for each image, from the clinic actually using it.

---

## Setup

Full runbook in **[SETUP.md](SETUP.md)** — fork to live, with the checks that
catch the failures this stack makes silently (a rejected Firestore write, an
unlisted reCAPTCHA domain, a placeholder WhatsApp number). Read step 6 before
touching Firebase.

---

## Structure

```
assets/clinic.config.js   the only file you must edit
assets/clinic-compat.js   bridges the config to app.js's OMEGA object
assets/app.js             rendering, i18n, calculator, booking
assets/content.js         services, prices, categories (the admin editor writes this)
assets/styles.css         theme, driven by brand colours from config
scripts/apply-config.mjs  writes config into the pages
scripts/rename-clinic.mjs one-time name swap at fork
firestore.rules           security rules — read the header before editing
tools/                    Apps Script: booking alerts, reminders, publishing
SETUP.md                  deployment runbook
```

## Licence

MIT — see [LICENSE](LICENSE).
