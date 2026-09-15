# Sitemap Plan

## Goal
Add `sitemap.xml` (and optionally `robots.txt`) for the G.M. Consolidated site.

## Current state
- No `sitemap.*` or `robots.*` file exists.
- No `metadataBase` / `BASE_URL` / domain constant exists anywhere; `src/app/layout.tsx` has `metadata` but no absolute URL base.
- Next.js 16.3.4 — native `sitemap.ts` and `robots.ts` file conventions supported (see `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` and `robots.md`).

## Routes to include
- Static pages (10): `/`, `/about`, `/ar-industries`, `/catalog`, `/contact`, `/engineering`, `/manufacturing`, `/oem-odm`, `/quality`, `/rao-industries`
- Category pages (5): `/catalog/[slug]` — from `getCategories()` in `src/lib/catalog.ts`
- Product pages (37): `/catalog/[slug]/[productSlug]` — from `getCategories().flatMap(c => c.products)`
  - Add `images` entry per product page (product `image`).

## Implementation steps
1. Add `src/app/sitemap.ts` exporting `sitemap(): MetadataRoute.Sitemap`:
   - Static routes first (e.g. `/` priority 1, others 0.8)
   - Category routes mapped from `getCategories()` → `/catalog/{slug}`
   - Product routes mapped from `getCategories()` products → `/catalog/{categorySlug}/{slug}` with `lastModified` + `images`
2. Add `src/app/robots.ts` — `MetadataRoute.Robots`: `{ userAgent: "*", allow: "/" }` + `sitemap: "https://{DOMAIN}/sitemap.xml"` (skip if not wanted)
3. Add a domain constant, e.g. `BASE_URL` in `src/data/site.ts`, reused by both files
   - **Required input: production domain** (e.g. `gmconsolidated.com`) for absolute URLs
4. Verify: `npx tsc --noEmit`; `pnpm build`; confirm `/sitemap.xml` and `/robots.txt` are emitted in `.next/server/app/`

## Open question
- Production domain? (blocks step 3)
- Include `robots.txt` now or sitemap only?