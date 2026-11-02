# CHANGES

**Task:** conversion, SEO, accessibility and performance pass on the static site.
**Date:** 2026-11-02
**Constraint honoured:** no build step, no browser, no commits or pushes. All changes are in the working tree under `branding/ABDULLAH_ATEF_Brand/07_Web`.

## What changed, by goal

### SEO / structured data

- Added `Service` + `OfferCatalog` JSON-LD to `services.html` with the real prices:
  - Single Hero — **$250**
  - Launch Set — **$650**
  - Campaign — **$1,400**
  - Unlimited renders — **$1,999 / month**
- Kept the existing `FAQPage` JSON-LD on `services.html`.
- Added `BreadcrumbList` JSON-LD to `services.html`, `work-with-me.html` and `work.html`.
- Added `BreadcrumbList` + `CollectionPage` JSON-LD to the new `case-studies.html`.
- Added `case-studies.html` to `sitemap.xml`.
- Added the missing `twitter:image:alt` tags on `services.html` and `work-with-me.html`.
- Added the new page to the site's internal linking (home, work, services footer, work-with-me footer, sitemap).

### Accessibility

- Fixed the two empty `alt` attributes on `work.html`:
  - `dive-watch-00-1280.jpg`
  - `beef-force-00-1280.jpg`
- Added an explicit focus-visible outline for form fields; their old `:focus` rule removed the outline.
- Confirmed one `h1` per page and no skipped heading levels.
- Confirmed no duplicate IDs.
- Confirmed all form controls are labelled; the consent checkbox uses an implicit wrapping label.
- Increased header nav links and theme/language toggles to a 44px minimum target height.
- Added block padding to footer, breadcrumb and case-study jump links.
- Added `transform: none` overrides for card/work-strip hover movement under `prefers-reduced-motion`.
- Kept the existing global reduced-motion rules and skip link.
- Darkened the light-theme accent from `#638000` to `#5A7200` (4.19:1 → 5.03:1 on paper) so 9–12px accent labels pass AA. Dark-theme lime is unchanged.

### Performance

- Added `loading="lazy"` to the first three homepage cards and the first work-page study. The two real above-the-fold heroes remain eager.
- Added `decoding="async"` where missing (`contact.html` QR).
- Added `loading="lazy"` + `decoding="async"` to every new case-study image.
- Corrected `mechanical-keyboard-01-1280.jpg` dimensions from 1200×1200 to the actual 1280×720.
- All images now have explicit `width`/`height`; every `srcset` width descriptor matches the file's real width.
- `media.js` now also skips video loading on `saveData` and `2g` connections (it already skipped `prefers-reduced-motion`).
- Did **not** re-encode the 31.57 MB hero video or recompress the >150 KB images; these are asset-quality decisions and are documented in `WEBSITE_AUDIT.md`.

### Conversion

- `work-with-me.html` form note now says the brief is sent through FormSubmit, matching the live endpoint. It previously claimed the form opened the email app and stored nothing.
- `brief.js` now writes the generated subject into the hidden `_subject` field instead of appending a duplicate value. FormSubmit now receives the intended subject.
- Added `case-studies.html` with four real studies and direct links back to the corresponding work entries.
- Added a case-studies link on the homepage, the work masthead, the services proof section and the wide footers.

## New page — `case-studies.html`

Four real studies only, using images already in `assets/img/`:

1. **CPU cooler — before/after:** `cpu-cooler-02-1280.jpg` (wireframe) vs `cpu-cooler-00-1280.jpg` (lit final).
2. **Watch study:** `watch-macro-00-1280.jpg`, `watch-macro-01-1280.jpg`, `dive-watch-00-1280.jpg`.
3. **Burger scene:** `beef-force-00-1280.jpg` (brand board; the film itself is linked from the full work entry).
4. **Perfume bottle:** `perfume-bottle-00-1280.jpg`, `perfume-bottle-01-1280.jpg`.

The page uses the existing type, colour and spacing system (`masthead`, `study`, `compare-pair`, `pair`, `plate`, `text-link`). It has a visible breadcrumb, an in-page jump nav, and full EN/AR copy through `lang.js`; the AR toggle is preserved. No project, client or metric was invented.

## Files changed (exact byte sizes after edits)

| File | Bytes | Change |
|---|---:|---|
| `404.html` | 6,923 | Not edited (audited; no canonical, `noindex` confirmed) |
| `about.html` | 10,807 | Not edited (audited) |
| `case-studies.html` | 17,642 | **New page**; 4 studies, JSON-LD, EN/AR copy |
| `contact.html` | 10,037 | QR image `loading="lazy"` + `decoding="async"` |
| `index.html` | 37,482 | Lazy first 3 cards; case-studies link + i18n |
| `services.html` | 31,152 | OfferCatalog JSON-LD, BreadcrumbList, twitter alt, mojibake fix, case-studies links |
| `work-with-me.html` | 32,220 | BreadcrumbList, twitter alt, form copy, mojibake fix, case-studies link |
| `work.html` | 72,154 | Alt fixes, dims fix, lazy first study, BreadcrumbList, case-studies link |
| `assets/css/site.css` | 17,654 | Breadcrumb/case-jump styles, 44px targets, focus/reduced-motion, light accent, pair--even |
| `assets/css/commerce.css` | 23,464 | Form focus-visible, footer link padding, work-strip reduced-motion |
| `assets/js/lang.js` | 75,222 | Case-study translations (EN+AR), `cs.link`, breadcrumb aria labels |
| `assets/js/sales-lang.js` | 55,371 | Form note copy, `svc.caseStudies` label |
| `assets/js/brief.js` | 3,549 | Hidden `_subject` updated instead of duplicated |
| `assets/js/media.js` | 1,556 | Skip video on `2g`/saveData as well as reduced motion |
| `assets/js/motion.js` | 667 | Not edited (audited) |
| `assets/js/theme.js` | 1,168 | Not edited (audited) |
| `sitemap.xml` | 590 | Added `case-studies.html` |
| `WEBSITE_AUDIT.md` | 19,022 | New audit report |
| `CHANGES.md` | this file | Change log |

Key asset weights (full >150 KB table in `WEBSITE_AUDIT.md`):

| Asset | Bytes | Dimensions |
|---|---:|---|
| `assets/img/vr-lab-01-1920.webp` | 1,181,620 | 1920×1920 |
| `assets/img/aston-db9-02-1920.webp` | 756,242 | 1920×1920 |
| `assets/img/petra-set-01-1920.webp` | 467,038 | 1920×1920 |
| `assets/img/beef-force-00-1280.jpg` | 231,462 | 1280×853 |
| `assets/img/og.png` | 170,684 | 1200×630 |
| `assets/vid/beef-force.mp4` | 33,108,613 | 1920×1080, 15.75s |
| `assets/vid/dive-watch.mp4` | 4,623,878 | 1920×1920, 8.33s |

## Before / after checklist

### SEO

- [x] Every indexable page has a title, meta description and canonical.
- [x] Every page has OG + Twitter tags; `twitter:image:alt` added where missing.
- [x] `Service` + `OfferCatalog` with real prices on services.
- [x] `BreadcrumbList` on services, work-with-me, work and case-studies.
- [x] New page in `sitemap.xml` and internal links.
- [ ] Static metadata language split on the five portfolio pages remains (Arabic source; English after JS). Documented in `WEBSITE_AUDIT.md`.
- [ ] 404 has no canonical by design (`noindex`).

### Accessibility

- [x] No missing/empty alt text.
- [x] No unlabeled form fields.
- [x] No duplicate IDs.
- [x] One H1 per page; no skipped heading levels.
- [x] 44px header nav/toggle targets; footer/breadcrumb targets ≥24px.
- [x] Focus-visible outlines on links, buttons, summaries and form fields.
- [x] `prefers-reduced-motion` respected, including hover transforms.
- [x] Light-theme accent contrast raised to 5.03:1.
- [ ] Standalone `.link` text is ≈23px tall; inline-link exception applies, left for editorial spacing.

### Performance

- [x] Below-the-fold images lazy; heroes eager.
- [x] `decoding="async"` on page images.
- [x] Explicit width/height on every image.
- [x] Corrected one wrong aspect-ratio declaration.
- [x] All `srcset` width descriptors match actual file widths.
- [ ] 31.57 MB hero video still autoplays/loads near the viewport.
- [ ] Several 1920px WebP variants are >300 KB; recompression recommended.
- [ ] Fonts are TTF; WOFF2 conversion recommended.

### Conversion

- [x] Form copy matches the live FormSubmit behaviour.
- [x] Form subject line is no longer duplicated.
- [x] Case-studies page gives a second, deeper entry point to the work.
- [x] Case-studies links from home, work, services and wide footers.

## How to verify

```powershell
cd "C:\Users\abdullah\OneDrive\Documents\blender projects\branding\ABDULLAH_ATEF_Brand\07_Web"
python -m http.server 8765 --bind 127.0.0.1
```

Then check:

1. `http://127.0.0.1:8765/` — 26 cards; first three lazy; hero image remains eager; case-studies link.
2. `http://127.0.0.1:8765/case-studies.html` — 4 studies, visible breadcrumb, working jump links, AR toggle.
3. `http://127.0.0.1:8765/services.html` — view source; `OfferCatalog` prices 250/650/1400/1999; `BreadcrumbList`; FAQ intact.
4. `http://127.0.0.1:8765/work.html` — no empty alts; `#cpu-cooler`, `#watch-macro`, `#beef-force`, `#perfume-bottle` resolve; case-studies link in masthead.
5. `http://127.0.0.1:8765/contact.html` — QR is lazy/async and still 168×168.
6. Toggle AR/EN on any core page and on `case-studies.html`; the new page should swap all headings, labels and alts without leaving English strings.
7. `work-with-me.html` — form note says “Sends straight to my inbox through FormSubmit…”; submit only if you want a live test message.
8. Run the checks below.

```powershell
# JS syntax
Get-ChildItem assets/js/*.js | ForEach-Object { node --check $_.FullName }

# HTML tag balance / duplicate IDs / alt / links: see WEBSITE_AUDIT.md for the method
# Sitemap XML
python -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('sitemap OK')"
```

JSON-LD can be pasted into <https://validator.schema.org/> or the Rich Results Test. The `Service` block is inside `services.html`; the breadcrumb blocks are one per relevant page; the case page has `BreadcrumbList` + `CollectionPage`.

## Deliberately not changed

- **31.57 MB `beef-force.mp4`.** A 720p test encode was ≈4 MB, but replacing the hero film is a visual-quality decision. Recommend commissioning/approving a web master.
- **Large image variants.** `vr-lab-01-1920.webp` is 1.15 MB, `aston-db9-02-1920.webp` 738.5 KB, `petra-set-01-1920.webp` 456.1 KB. Recompression will change the delivered pixels.
- **TTF → WOFF2.** `assets/fonts/fonts.css` is generated by `_v2/08_web.py`; font sources are outside this folder.
- **Static metadata language split.** See audit finding #1. The runtime default is English, but the five portfolio pages still ship Arabic static titles/descriptions/OG. Fixing it requires deciding the canonical static default and translating static copy; not done unilaterally.
- **`data/projects.json` / `data/copy.json`.** They contain mojibake Arabic but are not referenced by the live pages; not touched.
- **404 canonical.** Intentionally absent; page is `noindex`.

No `git commit` or `git push` was run.
