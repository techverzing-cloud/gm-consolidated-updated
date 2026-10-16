# G.M. Consolidated — Phase 1 Audit Report

Website: `gm-consolidated-new.vercel.app`
Audited against branch `main` (Next.js 16.3.4 App Router, React 19, Tailwind v4, pnpm).
Working tree contains uncommitted changes that were preserved during the audit.

Every checklist item was verified against the actual implementation. Statuses use only
**DONE**, **PARTIAL**, **BLOCKED**, **NOT DONE**.

## Required Final Report

| Task | Status | Evidence / Files | Remaining Work |
|---|---|---|---|
| Placeholder text | PARTIAL | Contact page uses real data (`data/contact.json`) — no "Official contact details to be published" exists anywhere. Product disclaimer lives in `src/components/catalog/product/product-specifications.tsx:24,48-52` ("indicative for catalogue development…"). Enquiry fallback copy (`data/contact.json` `form.fallbackTitle/Text`) states delivery isn't connected. | Supply verified spec sheets; connect enquiry email delivery. Disclaimer intentionally kept (it is truthful until specs are verified). |
| Footer social icons | DONE | `src/data/site.ts` `SOCIALS = []` (all entries commented out); `Footer.tsx:99-110` maps it → no icons render, **no `#` links remain**. | Add real LinkedIn/YouTube/Instagram URLs when supplied (optional). |
| Incorrect links | DONE | Closing banner `Footer.tsx:61-66` → `/contact#enquiry`; "Explore Manufacturing" `home/Manufacturing.tsx:61` and `Footer.tsx:67-72` → `/manufacturing`. All home + JSON CTAs verified correct. | None. |
| Page titles | PARTIAL | Root template `'%s | G.M. Consolidated'` correct; pages unique with single brand. `data/quality.json` title has a trailing space → `'Quality & Testing  | G.M. Consolidated'`. `data/oem-odm.json` duplicates the brand but has **no `/oem-odm` route** (dead data). | Trim trailing space (safe fix pending). |
| Sharing previews | DONE | **IMPLEMENTED.** Added `src/lib/metadata.ts` (`buildPageMetadata`) and applied it to all 14 routes + root layout. Every page emits unique `og:title`/`og:description`/`og:url`, a canonical, and `twitter:card=summary_large_image`; OG image switched from the favicon to `/logo/gm-logo.png` (591×326; served 200 on the deployment). Verified in built HTML (`about.html`, `catalog.html`, `catalog/water-heating.html`, `catalog/steam-garment-care/gm-18.html`, `index.html`). `metadataBase` = `https://arind.in`, confirmed by the client as the correct production domain. | Optional: supply a true 1200×630 share asset (currently using the site logo, 591×326). |
| GM-18 page | PARTIAL (blocked) | `data/catalog.json:513-557`: image is `gm20.png` (gm18.png exists); contradictory soleplate claims (Non-Stick **and** Ceramic-Coated) — **kept, flagged**; duplicate tank items; body colour in `features` (no `customization` array → section renders nothing); `relatedProducts` excludes steam iron `gm-17`. | Client to confirm soleplate + correct image; then fix image, dedupe features, move body colour to `customization`, add `gm-17`/`gm-01` to related. |
| UK English | NOT DONE | `aluminum` in `about.json:16,22,67` + `faq.json:8`; `centers` `about.json:139`; display "Catalog" (`Footer.tsx:8,134`, `contact.json:14,187`, `about.json:462,465`, `catalog/page.tsx:7`); category `'Water Heater'` vs `'Water Heaters'`. URLs `/catalog` must not change. | Apply spelling/label fixes (safe fix pending); confirm no product/technical terms affected. |
| WhatsApp button | PARTIAL | Button **already exists** in `(marketing)/layout.tsx:8-26` — `wa.me/919971188883`, fixed bottom-right, responsive, `aria-label`, doesn't overlap content. Icon is generic `message-circle`, not the WhatsApp brand glyph. | Optional: swap to WhatsApp brand icon. |
| Domain and email | BLOCKED | `BASE_URL='https://arind.in'` (`site.ts:14`) feeds layout/sitemap/robots; `delhiho@arind.in` in `contact.json`, `legal.json`, `about.json`. No `vercel.app` strings; no redirects configured. | Domain **confirmed by client as `arind.in`** (correct — no change needed). Still need: branded sales email; and approval to configure redirects from old URLs. |
| Structured SEO data | DONE | **IMPLEMENTED.** Added `src/lib/structured-data.ts` (`organizationSchema()`, `productSchema()`) + `src/components/JsonLd.tsx`. Organization rendered site-wide via `(marketing)/layout.tsx`; Product rendered on `catalog/[slug]/[productSlug]/page.tsx`. Verified in built HTML: 48 pages emit Organization, 26 product pages emit Product; every block JSON-parses and contains no `offers`/`aggregateRating`/`review`/`availability`. No social `sameAs` and no ISO certifications included (nothing invented). | None. Note: GM-18's Product `image` still points at the wrong `gm20.png` until Task 6 is fixed. |

## Missing Client Inputs

1. Branded sales email (blocks the email part of Task 9). The production domain is confirmed as `arind.in` (correct) and needs no change.
2. Verified GM-18 soleplate spec + other product spec sheets (blocks Task 1 removal and GM-18 resolution).
3. A true 1200×630 share image (current choice: site logo, which is 591×326).
4. Confirmation of correct GM-18/GM-17 image files (cannot view images to verify).
5. Real social profile URLs (optional, Task 2).
6. Resend credentials to connect the contact form: `RESEND_API_KEY`, a **domain verified in Resend** for `RESEND_FROM_EMAIL`, and the sales inbox for `RESEND_TO_EMAIL`. Code is wired (`src/app/(marketing)/contact/actions.ts` → `submitEnquiry`), but no `.env` exists locally and the three vars are unset, so every submission currently returns `delivery_failed` and shows the fallback message. The same three values must also be set in Vercel → Environment Variables (Production). See the checklist in `.env.example`.

## Decisions Recorded

- **Task 5 (OG image):** use the website logo (`/logo/gm-logo.png`).
- **Task 6 (GM-18 soleplate):** keep both conflicting claims and flag for client confirmation.
- **Domain:** client confirmed `arind.in` is the correct production domain, so `metadataBase`/`BASE_URL` are correct and the sharing-preview task (Task 5) is complete.
- **Implementation:** Tasks 5 (sharing previews) and 10 (structured data) have been implemented; the remaining safe fixes are identified but not yet applied.
- **Task 10 (structured data):** scope limited to Organization + Product only; Organization placed in `(marketing)/layout.tsx`; ISO 9001:2015 certifications omitted; full address kept as a single `streetAddress` string.

## Completed Work

- **Task 5 — Social sharing previews (implemented).**
  - Added `src/lib/metadata.ts` exporting `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`, `SHARE_IMAGE`, and `buildPageMetadata({ title, description, path, absoluteTitle? })`.
  - `buildPageMetadata` returns `title` (or `{ absolute }`), `description`, `alternates.canonical`, `openGraph` (title/description/url/type/locale/siteName/image with width+height+alt), and `twitter` (`summary_large_image` with title/description/image).
  - Applied to: root `src/app/layout.tsx` and all routes — home, about, contact, engineering, manufacturing, quality, catalog, catalog/[slug], catalog/[slug]/[productSlug], ar-industries, rao-industries, terms, privacy-policy.
  - Removed the favicon-as-OG reference: root no longer uses `/fav/android-chrome-512x512.png`; OG image is now `/logo/gm-logo.png`.
  - Root OG description changed to the full site description for consistency.
  - Verified: `pnpm exec tsc --noEmit` → exit 0; `pnpm build` → exit 0 (39 routes). Inspected generated HTML confirms per-page unique OG/Twitter tags and canonical.
  - `pnpm lint` fails independently of these changes: `eslint-plugin-react@7.37.5` throws `contextOrFilename.getFilename is not a function` under `eslint@10.9.1` while linting `eslint.config.mjs` (pre-existing tooling/config incompatibility).

- **Task 10 — Structured SEO data / JSON-LD (implemented).**
  - Added `src/lib/structured-data.ts` with `organizationSchema()` (name, url, logo, description, foundingDate 1983, telephone, email, PostalAddress with full `streetAddress` + `addressCountry: "IN"`, and a sales `ContactPoint`) and `productSchema(product, category)` (name, sku/model = code, absolute image, description, category, brand, manufacturer, canonical url).
  - Added `src/components/JsonLd.tsx` — native `<script type="application/ld+json">` with `JSON.stringify(...).replace(/</g, "\\u003c")`, per the bundled Next.js JSON-LD guide (`node_modules/next/dist/docs/01-app/02-guides/json-ld.md`).
  - Organization emitted on all marketing pages via `src/app/(marketing)/layout.tsx`; Product emitted on `src/app/(marketing)/catalog/[slug]/[productSlug]/page.tsx` (after the `notFound()` guard).
  - Deliberately omitted: `offers`/price, `aggregateRating`, `review`, `availability`, `additionalProperty` (specs are unverified), `sameAs` (no real social URLs), and ISO certifications.
  - Verified: `pnpm exec tsc --noEmit` → exit 0; `pnpm build` → exit 0 (53 static pages). A validation script parsed every JSON-LD block in the built HTML: 48 pages emit Organization, 26 product pages emit Product, 0 parse errors, and no forbidden fields present.

## Safe Fixes Still Pending (not applied)

1. Trim trailing space in `data/quality.json` title.
2. UK English: `aluminum → aluminium`, `centers → centres`, display `Catalog → Catalogue`, category `Water Heater → Water Heaters` (leave `/catalog` URLs and product/technical names untouched).
3. GM-18 data cleanup: correct `image` to `gm18.png`, remove duplicated feature strings, move body colour into a `customization` array (mirroring GM-01), set `relatedProducts` to iron-only `['gm-17','gm-01']`; soleplate claims kept and flagged.
4. Verification: `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`.
