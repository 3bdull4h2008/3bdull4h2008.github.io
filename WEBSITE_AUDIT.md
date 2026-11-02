# WEBSITE_AUDIT

**Site:** `branding/ABDULLAH_ATEF_Brand/07_Web` — static bilingual portfolio + services site
**Deploy URL:** <https://3bdull4h2008.github.io/>
**Audit date:** 2026-11-02
**Method:** served locally with `python -m http.server 8765 --bind 127.0.0.1`; read HTML/CSS/JS directly; checked links over HTTP; read image dimensions with Pillow 11.3.0; checked JS syntax with `node --check`. No browser was driven, per instruction.

## Summary

| Area | Result |
|---|---|
| Pages served | 8/8 returned HTTP 200 |
| Local links + assets checked | 89 URLs, 0 failures |
| Anchors checked | 0 broken |
| Tag balance | 0 unclosed / unmatched tags on all 8 pages |
| Duplicate IDs | None |
| H1 count | Exactly one per page |
| Heading order | No skipped levels |
| Missing / empty alt | 0 after fixes (2 found on `work.html`) |
| Unlabeled form fields | 0 (checkbox is wrapped by its `<label>`; honeypot is hidden) |
| Broken internal links | 0 |
| JS syntax errors | 0 (`node --check` on all 6 scripts) |
| Main remaining risk | 31.57 MB hero video + several >150 KB images; static metadata language split |

The site is functionally sound. The main conversion/SEO issue is that the five portfolio pages ship Arabic titles/descriptions/OG tags while `lang.js` switches the runtime default to English; social scrapers and no-JS clients see the Arabic metadata. This was deliberately **not** rewritten because it would change the site's copy default and needs a product decision. See “Not fixed safely” below.

## 1. Page metadata inventory

### Shared social tags

Every page has:

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Abdullah Atef Alrawashdeh">
<meta property="og:image" content="https://3bdull4h2008.github.io/assets/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://3bdull4h2008.github.io/assets/img/og.png">
```

`og.png` is 1200×630, **166.7 KB**. All pages now also have `twitter:image:alt` (it was missing on `services.html` and `work-with-me.html`).

### 404.html

- **Title:** `الصفحة غير موجودة — عبدالله عاطف الرواشدة` (`Not found - Abdullah Atef` after JS)
- **Meta description:** `هذه الصفحة غير موجودة.` (`That page does not exist.` after JS)
- **H1:** `الصفحة التي طلبتها ليست هنا.`
- **Canonical:** missing — acceptable here because the page is `meta name="robots" content="noindex"`; it is also excluded from `sitemap.xml`.
- **OG:** `og:locale ar_JO` + `en_US` alternate; `og:url .../404.html`; Arabic title/description; image alt `ساعة غوص من الفولاذ مفكّكة على خلفية داكنة.`
- **JSON-LD:** `Person`

### about.html

- **Title:** `نبذة — عبدالله عاطف الرواشدة` (`About - Abdullah Atef` after JS)
- **Meta description:** `عبدالله عاطف الرواشدة طالب تصوير منتجات بالأبعاد الثلاثية في عمّان، الأردن، يعمل في Blender وCycles.`
- **H1:** `طالب يبني ممارسةً في التصوير ثلاثي الأبعاد علنًا.`
- **Canonical:** `https://3bdull4h2008.github.io/about.html`
- **OG:** `og:locale ar_JO` + `en_US`; `og:url .../about.html`; Arabic title/description; Arabic image alt.
- **JSON-LD:** `Person`

### contact.html

- **Title:** `تواصل — عبدالله عاطف الرواشدة` (`Contact - Abdullah Atef` after JS)
- **Meta description:** `تواصل مع عبدالله عاطف الرواشدة لتنفيذ أعمال تصوير منتجات بالأبعاد الثلاثية، أو للحديث عن العمل في استوديو.`
- **H1:** `متاح للعمل في الاستوديو والعمولات.`
- **Canonical:** `https://3bdull4h2008.github.io/contact.html`
- **OG:** `og:locale ar_JO` + `en_US`; `og:url .../contact.html`; Arabic title/description; Arabic image alt.
- **JSON-LD:** `Person`

### index.html

- **Title:** `عبدالله عاطف الرواشدة — تصوير المنتجات بالأبعاد الثلاثية` (`Abdullah Atef - 3D product visualisation` after JS)
- **Meta description:** `دراسات في تصوير المنتجات للأبعاد الثلاثية: الإضاءة والخامات والتكوين، مُصيَّرة في Blender وCycles.`
- **H1:** `Abdullah Atef<br>Alrawashdeh` (one H1, split over two lines)
- **Canonical:** `https://3bdull4h2008.github.io/`
- **OG:** `og:locale ar_JO` + `en_US`; `og:url` root; Arabic title/description; Arabic image alt.
- **JSON-LD:** `Person`

### services.html

- **Title:** `Services - Abdullah Atef`
- **Meta description:** `3D product visualisation packages: a single hero, a launch set, a campaign and a monthly retainer. Fixed scope, fixed price.`
- **H1:** `Three ways to put your product in better light.`
- **Canonical:** `https://3bdull4h2008.github.io/services.html`
- **OG:** `og:locale en_US` + `ar_JO`; `og:url .../services.html`; English title/description; image alt `A dive watch taken apart on a dark background.`
- **JSON-LD:** `Service` + `OfferCatalog` (prices 250 / 650 / 1400 / 1999 USD) + `BreadcrumbList` + `FAQPage`

### work-with-me.html

- **Title:** `Work with me - Abdullah Atef`
- **Meta description:** `3D product visuals that look shot, not rendered. From a phone photo to campaign assets, with a first look in 48 hours.`
- **H1:** `Your product deserves better than stock photos.`
- **Canonical:** `https://3bdull4h2008.github.io/work-with-me.html`
- **OG:** `og:locale en_US` + `ar_JO`; `og:url .../work-with-me.html`; English title/description; image alt `A glass perfume bottle glowing on a dark studio set.`
- **JSON-LD:** `Service` + `BreadcrumbList`

### work.html

- **Title:** `الأعمال — عبدالله عاطف الرواشدة` (`Work - Abdullah Atef` after JS)
- **Meta description:** `دراسات في تصوير المنتجات للأبعاد الثلاثية: ساعات، أحذية، مستحضرات تجميل، زجاج وعتاد حاسوب.`
- **H1:** `26 دراسة، ولكلٍّ منها مشكلتها وملاحظاتها.`
- **Canonical:** `https://3bdull4h2008.github.io/work.html`
- **OG:** `og:locale ar_JO` + `en_US`; `og:url .../work.html`; Arabic title/description; Arabic image alt.
- **JSON-LD:** `Person` + `BreadcrumbList`

### case-studies.html (new)

- **Title:** `Case studies - Abdullah Atef`
- **Meta description:** `Four self-directed product studies: a CPU cooler before and after, a watch study, a burger campaign and a perfume bottle.`
- **H1:** `Four studies, and the decisions behind them.`
- **Canonical:** `https://3bdull4h2008.github.io/case-studies.html`
- **OG:** `og:locale en_US` + `ar_JO`; `og:url .../case-studies.html`; English title/description; image alt `A dive watch taken apart on a dark background.`
- **JSON-LD:** `BreadcrumbList` + `CollectionPage` with four `CreativeWork` entries

## 2. Links, HTML, accessibility

### Internal links and anchors

- 89 local `href`/`src` URLs were requested over HTTP: **0 failures**.
- All `#fragment` links resolve to an existing `id`, including the new case-study anchors and the `work.html#cpu-cooler` / `#watch-macro` / `#beef-force` / `#perfume-bottle` targets.
- Query-string links such as `work-with-me.html?package=launch-set#brief` are valid; the query is read by `brief.js`.
- External links (`instagram.com`, `mailto:`, `tel:`) were not network-tested.

### Tag balance and IDs

- Custom stack check: **0** unclosed/unmatched tags on all 8 pages.
- `sitemap.xml` parses as XML; all page URLs return 200.
- **Duplicate IDs:** none on any page. `case-studies.html` has 5 unique IDs (`main` + 4 study anchors).

### Alt text

Two meaningful images on `work.html` had `alt=""`:

- `assets/img/dive-watch-00-1280.jpg` — now has the existing Arabic `s.dive-watch.alt.0` text and `data-i18n-alt`.
- `assets/img/beef-force-00-1280.jpg` — now has the existing Arabic `s.beef-force.alt.0` text and `data-i18n-alt`.

Current state: every `<img>` has non-empty alt text. Decorative/inline SVG marks are `aria-hidden="true"` and `focusable="false"`.

### Form labels

`work-with-me.html` has 10 visible controls plus the hidden honeypot:

- Name, email, brand, product, category, package, deadline, photos link, message: all have explicit `<label for="…">`.
- Consent checkbox: wrapped by its `<label class="check">`, so it has an accessible name.
- `_honey`: `aria-hidden="true"`, `tabindex="-1"`, visually hidden; correctly excluded.

No unlabeled fields.

### Heading order

One `h1` per page; no `h1 → h3` or similar skips. `work.html` uses 26 `h2` study titles, which is correct for a long index. Footer headings on `services.html` / `work-with-me.html` are `h2`, so they follow the main content hierarchy.

### Tap targets

Before fixes, CSS produced:

- `.site-nav a`: 12px label with no vertical padding → line box roughly 14–16px tall.
- `.theme` / `.lang`: 6px vertical padding + 11px label → roughly 25–26px tall.

Both are below the recommended 44×44 CSS-pixel target (and the smaller nav links were below WCAG 2.2's 24×24 minimum). Fixes:

- Nav links and both header toggles now use `min-height: 44px`.
- Footer links now have 3px block padding (≈29px tall).
- Breadcrumb and case-study jump links now have 6px block padding (≈25px tall).
- Inline text links (`mailto:`, `tel:`, in-paragraph `.text-link`) are exempt as inline content.
- Remaining minor exception: standalone `.link` elements (for example “All work”) are ≈23px tall. They are inline text links and were left alone to avoid changing the editorial line rhythm.

### Focus and motion

- Global `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }` was already present.
- Form fields previously used `:focus { outline: none; border-color: var(--accent); }`; added a matching `:focus-visible` outline so keyboard focus is explicit.
- `prefers-reduced-motion` already disabled scroll behaviour, animations and transitions; added `transform: none` for card/work-strip hover movement.
- `media.js` already skipped autoplay video under reduced motion; it now also skips `saveData` and `2g` connections.

### Contrast

Measured WCAG ratios (relative luminance, sRGB):

| Pair | Ratio | Verdict |
|---|---:|---|
| `#A8B09E` muted text on `#070A07` ink | 8.88:1 | Pass AA/AAA normal |
| `#7A8274` faint text on `#070A07` ink | 5.00:1 | Pass AA normal |
| `#7A8274` faint text on `#0E120D` raised | 4.75:1 | Pass AA normal |
| `#5F6659` faint text on `#F5F6F1` paper | 5.48:1 | Pass AA normal |
| `#C5EB0A` accent on `#070A07` ink | 14.46:1 | Pass AAA |
| `#070A07` on `#C5EB0A` accent | 14.46:1 | Pass AAA |
| `#638000` old light accent on paper | **4.19:1** | **Fail AA normal** |
| `#5A7200` new light accent on paper | 5.03:1 | Pass AA normal |

The light-theme accent was `--color-accentDeep` `#638000`, used for 9–12px labels (`.badge`, `.industry__num`, `.process-step__num`, `.masthead__num`, `.next-list span`). It failed AA for normal text. `site.css` now overrides only the light-theme `--accent` to `#5A7200`, which keeps the olive-lime family and passes at 5.03:1. Dark-theme lime is unchanged.

## 3. Images

### Weight and dimensions

All 235 files in `assets/img/` total **15.77 MB**. 20 files are over 150 KB (19 page images + the OG image). Every page image has explicit `width`/`height`; the only incorrect ratio was `mechanical-keyboard-01-1280.jpg` (declared 1200×1200, actual 1280×720), now fixed to 1280×720. No image is missing dimensions.

| File | Size | Dimensions | Used on |
|---|---:|---|---|
| `assets/img/vr-lab-01-1920.webp` | 1,153.9 KB | 1920×1920 | work.html |
| `assets/img/aston-db9-02-1920.webp` | 738.5 KB | 1920×1920 | work.html |
| `assets/img/petra-set-01-1920.webp` | 456.1 KB | 1920×1920 | work.html |
| `assets/img/vr-lab-01-1280.jpg` | 432.7 KB | 1280×1280 | work.html |
| `assets/img/vr-lab-01-1280.webp` | 417.2 KB | 1280×1280 | work.html |
| `assets/img/pickup-truck-00-1920.webp` | 326.1 KB | 1920×1920 | index.html, work.html |
| `assets/img/petra-set-01-1280.jpg` | 314.1 KB | 1280×1280 | work.html |
| `assets/img/vr-lab-00-1920.webp` | 305.6 KB | 1920×1920 | index.html, work.html |
| `assets/img/pickup-truck-00-1280.jpg` | 293.0 KB | 1280×1280 | index.html, work.html |
| `assets/img/aston-db9-02-1280.jpg` | 268.6 KB | 1280×1280 | work.html |
| `assets/img/petra-set-01-1280.webp` | 234.0 KB | 1280×1280 | work.html |
| `assets/img/vr-lab-00-1280.jpg` | 229.2 KB | 1280×1280 | index.html, work.html |
| `assets/img/beef-force-00-1280.jpg` | 226.0 KB | 1280×853 | case-studies.html, index.html, work.html |
| `assets/img/pickup-truck-00-1280.webp` | 201.5 KB | 1280×1280 | index.html, work.html |
| `assets/img/aston-db9-02-1280.webp` | 197.7 KB | 1280×1280 | work.html |
| `assets/img/og.png` | 166.7 KB | 1200×630 | OG/Twitter metadata |
| `assets/img/lamborghini-murcielago-00-1920.webp` | 166.3 KB | 1920×1080 | index.html, work.html |
| `assets/img/beef-force-00-1280.webp` | 161.7 KB | 1280×853 | case-studies.html, index.html, work.html |
| `assets/img/pickup-truck-01-1280.jpg` | 156.7 KB | 1280×1280 | work.html |
| `assets/img/petra-set-00-1280.jpg` | 150.9 KB | 1280×1280 | index.html, work.html |

**Flags:**

- `vr-lab-01-1920.webp` at **1.15 MB** is the single heaviest image; `vr-lab-01-1280.webp` at 417 KB is still heavy for a mid-size render. Re-export at lower WebP quality or use a smaller source.
- The `*-1920.webp` variants are only chosen on wide viewports; they are large enough that a 2× DPR laptop can pull 0.3–1.15 MB per image.
- `beef-force-00-1280.jpg` (226 KB) and its WebP (161.7 KB) are used in the homepage hero poster and case-study lead. The WebP is still above 150 KB.
- `og.png` is 166.7 KB; acceptable for a social card, but can be compressed without visible loss.
- Every image file in `assets/img/` is referenced by at least one page or metadata; there are no orphan image files adding weight.

### Lazy loading / decoding

- All below-the-fold images now use `loading="lazy"` and `decoding="async"`.
- The two above-the-fold heroes remain eager: `index.html` hero (`fetchpriority="high"` retained) and `work-with-me.html` hero (`fetchpriority="high"`).
- `index.html` first three cards were previously eager; they are now lazy (the 100svh hero is the only eager image).
- `work.html` first study was previously eager with `fetchpriority="high"`; it is now lazy. The page has 61 images, so this matters.
- `contact.html` QR code is lazy/async (it is small, 168×168).

### Video and fonts (not images, but dominant weight)

| Asset | Size | Note |
|---|---:|---|
| `assets/vid/beef-force.mp4` | **31.57 MB** | 15.75s, 1920×1080, ~16.5 Mbps. `media.js` loads it when the hero is within 900px of the viewport; on the homepage this is effectively immediate. |
| `assets/vid/dive-watch.mp4` | 4.41 MB | 8.3s, 1920×1920; controls/preload metadata on `work.html`. |
| Fonts (7 TTF files) | ~1.77 MB | Three mono weights + variable IBM Plex Sans + three Arabic weights, all TTF. No WOFF2. |

## 4. JavaScript review (no browser)

`node --check` passes on all scripts:

- `theme.js` — reads `aa-theme` in a `try/catch`, toggles on `DOMContentLoaded`, updates `theme-color`, dispatches `aa:theme`. No error path.
- `media.js` — guards missing `navigator.connection`; skips reduced-motion/saveData/2g; uses `IntersectionObserver` with a load fallback; catches `play()` rejection; pauses on tab hide. No syntax/runtime error. The 31.57 MB hero video is the performance concern.
- `motion.js` — early-returns under reduced motion; falls back if `IntersectionObserver` is absent; uses `NodeList.forEach`. No error.
- `lang.js` — 75 KB; default runtime language is English; updates text, `lang`, `aria-label`, alt, placeholders, title/description; persists `aa-lang`. No syntax error. It intentionally does **not** update OG/Twitter metadata.
- `sales-lang.js` — 55 KB; separate `aa-lang-sales` preference; same patterns; form note updated. No syntax error.
- `brief.js` — intercepts submit, validates, posts to FormSubmit AJAX, catches non-JSON/network errors, falls back to `mailto:`. The previous duplicate `_subject` append is fixed: the hidden `_subject` field is now updated before `FormData` is built. No syntax error.

No code path was found that would throw on load. The one behavioral mismatch is copy-related, not an exception: `work-with-me.html` previously said the form opens the email app, but the live form posts through FormSubmit. The copy now matches the actual behavior.

## 5. Not fixed safely (or deliberately left)

1. **Static metadata language split.** `index.html`, `work.html`, `about.html`, `contact.html` and `404.html` ship Arabic `<title>`, description and OG tags. `lang.js` replaces the title/description with English on load because its default is English. Social scrapers and no-JS clients therefore see Arabic metadata, while JS users see English. Fixing this means choosing a canonical static default and either translating the static copy or accepting Arabic as the source fallback. That is a copy/product decision, not a mechanical fix; left as-is and documented.
2. **31.57 MB hero video.** Re-encoding is a quality decision. A 1280×720 H.264 CRF 28 web master would be ≈4 MB (test encode), but it would change the hero image quality; not replaced without sign-off.
3. **Large WebP/JPEG variants.** Recompressing `vr-lab-01-*`, `aston-db9-02-*`, `petra-set-01-*`, `pickup-truck-00-*` and `beef-force-00-*` is safe in principle but changes the visual assets; left to the asset owner.
4. **TTF fonts.** Converting the seven TTF files to WOFF2 would cut font weight substantially, but `fonts.css` is generated by `_v2/08_web.py` and the source fonts are outside this folder. Not changed.
5. **404 canonical.** Intentionally absent; the page is `noindex`. Adding a canonical to a 404 is not useful.
6. **`data/projects.json` / `data/copy.json` mojibake.** These files contain mis-encoded Arabic (`Ø¹…` / replacement characters) but are not referenced by the live site. Not touched.
7. **Core page `og:locale`.** The Arabic-first pages declare `ar_JO` / `en_US` while runtime default is English. This follows finding 1; no split fix applied.

## 6. Verification performed

```powershell
cd "C:\Users\abdullah\OneDrive\Documents\blender projects\branding\ABDULLAH_ATEF_Brand\07_Web"
python -m http.server 8765 --bind 127.0.0.1
# 8 pages returned 200
# 89 local URLs requested: 0 failures
node --check assets/js/lang.js
node --check assets/js/sales-lang.js
node --check assets/js/brief.js
node --check assets/js/media.js
node --check assets/js/motion.js
node --check assets/js/theme.js
```

Tag balance: 0 errors. `sitemap.xml`: valid XML. JSON-LD: parsed successfully on every page (types listed above).
