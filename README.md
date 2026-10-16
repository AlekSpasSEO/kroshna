# крошна — Растеме заедно

A Macedonian family guide to Skopje. Original canopy identity using the owner's Shkrtka palette, Nunito Sans, and LunchBox accents.

## Run

Requires Node.js 20+. No package installation is required.

```sh
npm test
npm run build
npm start
```

Open http://127.0.0.1:4186/kroshna/.

## Features

- Responsive Macedonian editorial website, mobile navigation and global search.
- 15 sourced directory profiles: outdoor places, culture, workshops, stays, day centers and family support. Age, area and category filters; map view and individual map links.
- Current source-backed events, date filters, automatic archive, and standards-compliant all-day `.ics` calendar export.
- Six original articles with static, indexable pages and sources. Practical reviews are explicitly desk research, with no fabricated visits or ratings.
- Curated board, submission preview and public GitHub issue handoff. Approved community suggestions are fetched from this repository's open issues bearing the `community-approved` label. Create this label in repository settings before approving a suggestion. Optionally add matching category labels (`Култура`, `Откритие`, `Настан`, `Поддршка`) for filtering. Inspect every suggestion before labeling. Bodies are displayed as escaped plain text.
- Saved plans stored only in the visitor's localStorage. Print plan or export saved events. No account or cloud sync.
- Pilot journal with A4 print layout and Save as PDF through the browser print dialog. Physical circulation is not announced.
- Live RSS, sitemap, canonical metadata, image licensing credits, privacy and editorial policies.
- Clearly labeled illustrative advertising from real companies (Literatura.mk and dm), without an implied partnership. No ad tracking or invented offers.

## Content updates

Edit `public/data.js`, update the verification dates for changed content, run tests and build. Never invent dates for undated workshop programs, availability for hotels, eligibility for support centers, or first-hand visits. Sources were checked on **16 October 2026**. Recheck the publisher before adding or updating an event.

The board's local selections are editorial notes. Visitor submissions are public GitHub issues and are not automatically published. The form intentionally does not collect email addresses, child details, or private information. RSS is the active update channel; there is no pretend newsletter subscription or unconfigured email service.

## Publish on GitHub Pages

Run `npm run release` to rebuild the deployable docs folder. The built files live in `docs/` in the published repository. GitHub Pages source: branch `main`, folder `/docs`. The build also emits `dist/` locally; copy its contents into `docs/` for release. `.nojekyll` prevents asset processing. All asset links work at the `/kroshna/` repository path.

Production: https://alekspasseo.github.io/kroshna/

## Rights

Original logo and editorial text were created for the owner. Photos and their WebP derivatives retain their respective Creative Commons BY-SA licenses; see `public/assets/credits.json`. Nunito Sans uses the SIL Open Font License in `public/assets/OFL.txt`. LunchBox is an owner-supplied brand asset served by the existing Shkrtka site; its original font license applies. Do not treat this repository as a blanket license for third-party assets.
