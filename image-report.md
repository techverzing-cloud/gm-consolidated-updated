# Image Asset Audit — G.M. Consolidated Catalog Website

_Read-only audit. No files were modified._

## How this was produced

All image mechanisms were scanned across the repo:

- `<Image>` / `<img>` usage (`next/image`) in every component
- `src/` components by route group: catalog, product detail, home, about, manufacturing, quality, oem-odm, contact, footer/navbar
- All JSON data sources: `data/catalog.json`, `data/about.json`, `data/contact.json`, `data/engineering.json`, `data/manufacturing.json`, `data/oem-odm.json`, `data/quality.json`
- `globals.css` for `url()`/`background-image` (none found)
- `src/app/layout.tsx` metadata, `next.config.ts` (remote image allowlist), `src/lib/*.ts` (data typing)
- Physical files under `public/` and `src/app/`

---

## A. Images that already exist in the repo

| # | File | Status |
|---|---|---|
| 1 | `src/app/favicon.ico` | browser favicon (auto-discovered by App Router) |
| 2 | `src/app/icon.png` | site icon / tab icon (auto-discovered) |
| 3 | `public/logo/gm-logo.png` | Navbar logo |
| 4 | `public/logo/gm-logo-light.png` | Footer logo |
| 5 | `public/logo/gm-mark.png` | **Unused / dead asset** — no reference anywhere in code |
| 6 | `public/images/hero-manufacturing.jpg` | Home Hero, slide 1 |
| 7 | `public/images/factory/plant-wide.jpg` | Home Hero slide 2, Footer CTA background, About hero, Manufacturing hero, Quality hero |
| 8 | `public/images/factory/assembly.jpg` | About unit 01, Manufacturing unit 01, OEM/ODM hero, Contact CTA, Product "Manufacturing & Quality" section |
| 9 | `public/images/factory/production-wide.jpg` | Home Hero slide 3, Home Manufacturing section, About unit 02, Manufacturing unit 02, OEM/ODM CTA, Quality CTA, Contact hero |
| 10 | `public/images/factory/testing.jpg` | Home Quality section, Quality laboratory |
| 11 | `public/images/factory/toolroom.jpg` | About unit 03, Manufacturing unit 03 |
| 12 | `public/images/factory/moulding.jpg` | About "Engineering & Tooling" |
| 13 | `public/images/factory/press.jpg` | About closing statement |
| 14 | `public/images/factory/pdc.jpg` | Manufacturing closing CTA |
| 15 | `public/images/products/garment-care/gm-02.png` | **Placeholder** — dry iron render (reuse for all 21 garment-care models) |
| 16 | `public/images/products/water-heating/gm-22.png` | **Placeholder** — geyser render (reuse for all 4 models) |
| 17 | `public/images/products/heating/gm-26.png` | **Placeholder** — fan heater render (reuse for both models) |
| 18 | `public/images/products/personal-care/gm-28.png` | **Placeholder** — hair dryer render (reuse for both models) |
| 19 | `public/images/products/specialty/gm-30.png` | **Placeholder** — mosquito racket render |

Notes:

- 11 remote Unsplash URLs are currently used as **product gallery** images (GM-02, GM-22, GM-26, GM-28, GM-30 detail pages). They are load-bearing (rendered by `ProductGallery`) and should be replaced by local files (see Section 1). `next.config.ts` allowlists `images.unsplash.com`.
- The **Engineering page has no images** (icon-only). The **Contact map** is a Google Maps iframe embed, not an image.
- No CSS/Tailwind background images exist anywhere; no OG image is configured (recommended, see Section 5).

---

## B. Images required by the implementation (to source)

### 1. Product Images

Structure follows the existing convention: `public/images/products/<category>/<file>`. One image is genuinely shared across every model with the same physical design (all 30 models currently resolve to the same 5 files). Recommended filenames use `.webp` per the standing preference and match the earlier *Product Image Grouping* report so the site can be repointed via `data/catalog.json` in one pass.

#### 1a. Product family / hero+card image (required for every model)

| # | Search Term | Image Description | Filename | Required Path | Used By |
|---|---|---|---|---|---|
| P1 | `dry iron` | Front-facing premium dry iron on clean white background (Classic Elite / Comfort Premium style) | `dry-iron.webp` | `public/images/products/garment-care/dry-iron.webp` | `ProductCard` (gm-01→17 listing), `ProductHero` single-image fallback (gm-01…17), category card + home catalog for Garment Care |
| P2 | `steam iron` | Steam iron with water tank, burst-steam buttons, non-stick soleplate, on white background | `steam-iron.webp` | `public/images/products/garment-care/steam-iron.webp` | `ProductCard` + `ProductHero` for gm-18→21; Garment Care category links |
| P3 | `geyser` | White vertical capsule storage geyser, front view, white background | `water-geyser.webp` | `public/images/products/water-heating/water-geyser.webp` | `ProductCard` + `ProductHero` for gm-22→25; category card + home catalog for Water Heating |
| P4 | `fan heater` | Compact fan heater with carry handle and control knob, on white background | `fan-heater.webp` | `public/images/products/heating/fan-heater.webp` | `ProductCard` + `ProductHero` for gm-26→27; category card + home catalog for Heating / Comfort |
| P5 | `hair dryer` | Foldable hair dryer with concentrator nozzle, on white background | `hair-dryer.webp` | `public/images/products/personal-care/hair-dryer.webp` | `ProductCard` + `ProductHero` for gm-28→29; category card + home catalog for Personal Care |
| P6 | `mosquito racket` | Rechargeable mosquito racket with mesh head, on white background | `mosquito-racket.webp` | `public/images/products/specialty/mosquito-racket.webp` | `ProductCard` + `ProductHero` for gm-30; category card + home catalog for Specialty Electronics |

_(Category `image` fields reuse P1–P6 — no separate category artwork is required, but the top-level catalog cards and home "Catalog" grid will show these.)_

#### 1b. Product gallery images (only the 5 feature-rich products have a multi-image gallery today)

`ProductGallery` renders a thumbnail strip whenever `images.length > 1`. Presently gm-02, gm-22, gm-26, gm-28 and gm-30 carry 2–3 remote Unsplash gallery shots each. These are the images to source and place locally.

| # | Search Term | Image Description | Filename | Required Path | Used By |
|---|---|---|---|---|---|
| P7 | `ironing clothes` | Dry iron gliding over a shirt on an ironing board | `dry-iron-ironing.webp` | `public/images/products/garment-care/dry-iron-ironing.webp` | GM-02 gallery, slide 2 |
| P8 | `ironing shirt press` | Press operator / laundry workshop ironing garments | `dry-iron-laundry.webp` | `public/images/products/garment-care/dry-iron-laundry.webp` | GM-02 gallery, slide 3 |
| P9 | `geyser bathroom` | Wall-mounted storage geyser above a bathroom sink | `water-geyser-installed.webp` | `public/images/products/water-heating/water-geyser-installed.webp` | GM-22 gallery, slide 2 |
| P10 | `geyser utility` | Freestanding water heater unit in a utility setting | `water-geyser-utility.webp` | `public/images/products/water-heating/water-geyser-utility.webp` | GM-22 gallery, slide 3 |
| P11 | `geyser vertical` | Vertical storage water heater against a neutral wall | `water-geyser-vertical.webp` | `public/images/products/water-heating/water-geyser-vertical.webp` | GM-22 gallery, slide 4 |
| P12 | `heater room` | Modern fan heater in a warm interior | `fan-heater-room.webp` | `public/images/products/heating/fan-heater-room.webp` | GM-26 gallery, slide 2 |
| P13 | `thermostat heater` | Wall thermostat set to a comfortable room temperature | `fan-heater-thermostat.webp` | `public/images/products/heating/fan-heater-thermostat.webp` | GM-26 gallery, slide 3 |
| P14 | `hair dryer styling` | Side view of styled/freshly dried hair | `hair-dryer-styling.webp` | `public/images/products/personal-care/hair-dryer-styling.webp` | GM-28 gallery, slide 2 |
| P15 | `salon hair dryer` | Hair dryer in a salon / grooming environment | `hair-dryer-salon.webp` | `public/images/products/personal-care/hair-dryer-salon.webp` | GM-28 gallery, slide 3 |
| P16 | `mosquito racket charging` | Mosquito racket on its charging stand | `mosquito-racket-charging.webp` | `public/images/products/specialty/mosquito-racket-charging.webp` | GM-30 gallery, slide 2 |
| P17 | `mosquito racket grid` | Racket mesh/grid detail close-up | `mosquito-racket-grid.webp` | `public/images/products/specialty/mosquito-racket-grid.webp` | GM-30 gallery, slide 3 |

#### Product → image mapping (every model, no collapsing)

| Model | Name | Image file |
|---|---|---|
| GM-01 | Dry Iron | `dry-iron.webp` |
| GM-02 | Dry Iron | `dry-iron.webp` + gallery (P1, P7, P8) |
| GM-03 | Dry Iron | `dry-iron.webp` |
| GM-04 | Dry Iron | `dry-iron.webp` |
| GM-05 | Dry Iron | `dry-iron.webp` |
| GM-06 | Dry Iron | `dry-iron.webp` |
| GM-07 | Dry Iron | `dry-iron.webp` |
| GM-08 | Dry Iron | `dry-iron.webp` |
| GM-09 | Dry Iron | `dry-iron.webp` |
| GM-10 | Dry Iron | `dry-iron.webp` |
| GM-11 | Dry Iron | `dry-iron.webp` |
| GM-12 | Dry Iron | `dry-iron.webp` |
| GM-13 | Dry Iron | `dry-iron.webp` |
| GM-14 | Dry Iron | `dry-iron.webp` |
| GM-15 | Dry Iron | `dry-iron.webp` |
| GM-16 | Dry Iron | `dry-iron.webp` |
| GM-17 | Dry Iron | `dry-iron.webp` |
| GM-18 | Steam Iron | `steam-iron.webp` |
| GM-19 | Steam Iron | `steam-iron.webp` |
| GM-20 | Steam Iron | `steam-iron.webp` |
| GM-21 | Steam Iron | `steam-iron.webp` |
| GM-22 | Water Geyser | `water-geyser.webp` + gallery (P3, P9, P10, P11) |
| GM-23 | Water Geyser | `water-geyser.webp` |
| GM-24 | Water Geyser | `water-geyser.webp` |
| GM-25 | Water Geyser | `water-geyser.webp` |
| GM-26 | Fan Heater | `fan-heater.webp` + gallery (P4, P12, P13) |
| GM-27 | Fan Heater | `fan-heater.webp` |
| GM-28 | Hair Dryer | `hair-dryer.webp` + gallery (P5, P14, P15) |
| GM-29 | Hair Dryer | `hair-dryer.webp` |
| GM-30 | Mosquito Racket | `mosquito-racket.webp` + gallery (P6, P16, P17) |

---

### 2. Category Images

Category `image` is read from `data/catalog.json` and rendered by `CategoryCard` (`/catalog`) and the home `Catalog` section. Each currently points at the placeholder product render — no additional artwork is required if P1–P6 are used. Recommended repoint after sourcing:

| # | Search Term | Image Description | Filename | Required Path | Used By |
|---|---|---|---|---|---|
| C1 | `dry iron` | Representative Garment Care product (use `dry-iron.webp`) | `dry-iron.webp` | `public/images/products/garment-care/dry-iron.webp` | `/catalog` grid card, homepage Catalog, category page header context |
| C2 | `geyser` | Representative Water Heating product (use `water-geyser.webp`) | `water-geyser.webp` | `public/images/products/water-heating/water-geyser.webp` | `/catalog` grid card, homepage Catalog |
| C3 | `fan heater` | Representative Heating / Comfort product (use `fan-heater.webp`) | `fan-heater.webp` | `public/images/products/heating/fan-heater.webp` | `/catalog` grid card, homepage Catalog |
| C4 | `hair dryer` | Representative Personal Care product (use `hair-dryer.webp`) | `hair-dryer.webp` | `public/images/products/personal-care/hair-dryer.webp` | `/catalog` grid card, homepage Catalog |
| C5 | `mosquito racket` | Representative Specialty Electronics product (use `mosquito-racket.webp`) | `mosquito-racket.webp` | `public/images/products/specialty/mosquito-racket.webp` | `/catalog` grid card, homepage Catalog |

No **category banner / hero** exists in the implementation (category pages are text-led) — do not source extra banners that nothing renders.

---

### 3. Website / Marketing Images

All factory & hero images already exist in the repo (Section A). They are used widely and are **already present**; you may optionally replace them with higher-quality shots. If replaced, they must keep the same paths below (nothing else in code changes).

| # | Search Term | Image Description | Filename | Required Path | Used By |
|---|---|---|---|---|---|
| M1 | `appliance factory` | Wide manufacturing plant floor, bright industrial lighting | `plant-wide.jpg` | `public/images/factory/plant-wide.jpg` | Home Hero slide 2, Footer CTA bg, /about, /manufacturing, /quality |
| M2 | `home appliance factory` | Production line with workers assembling appliances | `production-wide.jpg` | `public/images/factory/production-wide.jpg` | Home Hero slide 3, home Manufacturing, /oem-odm CTA, /quality CTA, /contact, about unit 02 |
| M3 | `appliance assembly line` | Workers assembling small appliances on a line | `assembly.jpg` | `public/images/factory/assembly.jpg` | Product "Manufacturing & Quality" sections, about unit 01, mfg unit 01, /oem-odm, /contact CTA |
| M4 | `factory testing` | Electrical/product routine-testing station | `testing.jpg` | `public/images/factory/testing.jpg` | Home Quality, /quality laboratory |
| M5 | `tool room machinist` | Tool room with mould maintenance equipment | `toolroom.jpg` | `public/images/factory/toolroom.jpg` | About unit 03, /manufacturing unit 03 |
| M6 | `injection moulding` | Injection moulding press inside a plant | `moulding.jpg` | `public/images/factory/moulding.jpg` | About "Engineering & Tooling" |
| M7 | `metal press machine` | Metal pressing station | `press.jpg` | `public/images/factory/press.jpg` | About closing statement |
| M8 | `die casting machine` | Pressure die-casting machine / aluminium casting | `pdc.jpg` | `public/images/factory/pdc.jpg` | /manufacturing closing CTA |
| M9 | `appliance manufacturing` | Wide hero shot of a manufacturing facility | `hero-manufacturing.jpg` | `public/images/hero-manufacturing.jpg` | Home Hero slide 1 |

---

### 4. Logos / Brand Assets

| # | Search Term | Image Description | Filename | Required Path | Used By |
|---|---|---|---|---|---|
| L1 | *(existing)* | G.M. Consolidated primary logo (dark/navy) | `gm-logo.png` | `public/logo/gm-logo.png` | Navbar |
| L2 | *(existing)* | G.M. Consolidated logo (white/light) | `gm-logo-light.png` | `public/logo/gm-logo-light.png` | Footer |
| L3 | *(existing)* | Site favicon | `favicon.ico` | `src/app/favicon.ico` | Browser tab |
| L4 | *(existing)* | Site/app icon | `icon.png` | `src/app/icon.png` | Browser tab / PWA-style icon |
| L5 | *(dead)* | Monogram – not referenced anywhere. Keep or delete; do NOT source. | `gm-mark.png` | `public/logo/gm-mark.png` | — |

---

### 5. Other UI Images

| # | Search Term | Image Description | Filename | Required Path | Used By |
|---|---|---|---|---|---|
| O1 | **(recommended, optional)** — no OG image is configured today. Add a 1200×630 promo image for social shares | `og-image.webp` | `public/images/og-image.webp` | `src/app/layout.tsx` `openGraph.images` |

No CSS background images, decorative sprites, or illustration assets are referenced anywhere.

---

## Where each image goes (quick checklist)

- `dry-iron.webp` → `public/images/products/garment-care/dry-iron.webp`
- `steam-iron.webp` → `public/images/products/garment-care/steam-iron.webp`
- `dry-iron-ironing.webp` → `public/images/products/garment-care/dry-iron-ironing.webp`
- `dry-iron-laundry.webp` → `public/images/products/garment-care/dry-iron-laundry.webp`
- `water-geyser.webp` → `public/images/products/water-heating/water-geyser.webp`
- `water-geyser-installed.webp` → `public/images/products/water-heating/water-geyser-installed.webp`
- `water-geyser-utility.webp` → `public/images/products/water-heating/water-geyser-utility.webp`
- `water-geyser-vertical.webp` → `public/images/products/water-heating/water-geyser-vertical.webp`
- `fan-heater.webp` → `public/images/products/heating/fan-heater.webp`
- `fan-heater-room.webp` → `public/images/products/heating/fan-heater-room.webp`
- `fan-heater-thermostat.webp` → `public/images/products/heating/fan-heater-thermostat.webp`
- `hair-dryer.webp` → `public/images/products/personal-care/hair-dryer.webp`
- `hair-dryer-styling.webp` → `public/images/products/personal-care/hair-dryer-styling.webp`
- `hair-dryer-salon.webp` → `public/images/products/personal-care/hair-dryer-salon.webp`
- `mosquito-racket.webp` → `public/images/products/specialty/mosquito-racket.webp`
- `mosquito-racket-charging.webp` → `public/images/products/specialty/mosquito-racket-charging.webp`
- `mosquito-racket-grid.webp` → `public/images/products/specialty/mosquito-racket-grid.webp`

After placing files, `data/catalog.json` product/category `image` (and again `images[].src`) must be updated to the new `.webp` paths and the 11 Unsplash gallery URLs removed.

---

## Image Count

```text
Product images: 17        (6 family + 11 gallery slots)
Category images: 0        (reuses the 6 family images; no standalone files)
Marketing/website images: 9   (already present — replace optional, same paths)
Brand assets: 3           (logo, logo-light, favicon/icon — present; plus 1 dead asset)
Other UI images: 0        (1 optional recommended OG image)
--------------------------------
Total required images to source: 17
Total files already in repo: 21
```

## Recommended Folder Structure

The existing structure is clean and matches the implementation — no restructuring needed:

```text
public/
└── images/
    ├── hero-manufacturing.jpg
    ├── factory/          (9 photos — present)
    │   ├── plant-wide.jpg
    │   ├── production-wide.jpg
    │   ├── assembly.jpg
    │   ├── testing.jpg
    │   ├── toolroom.jpg
    │   ├── moulding.jpg
    │   ├── press.jpg
    │   └── pdc.jpg
    └── products/
        ├── garment-care/
        │   ├── dry-iron.webp          ← new
        │   ├── dry-iron-ironing.webp  ← new
        │   ├── dry-iron-laundry.webp  ← new
        │   └── steam-iron.webp        ← new
        ├── water-heating/
        │   ├── water-geyser.webp           ← new
        │   ├── water-geyser-installed.webp ← new
        │   ├── water-geyser-utility.webp   ← new
        │   └── water-geyser-vertical.webp  ← new
        ├── heating/                      (folder name is "heating", not "heating-comfort")
        │   ├── fan-heater.webp          ← new
        │   ├── fan-heater-room.webp     ← new
        │   └── fan-heater-thermostat.webp ← new
        ├── personal-care/
        │   ├── hair-dryer.webp          ← new
        │   ├── hair-dryer-styling.webp  ← new
        │   └── hair-dryer-salon.webp    ← new
        └── specialty/
            ├── mosquito-racket.webp          ← new
            ├── mosquito-racket-charging.webp ← new
            └── mosquito-racket-grid.webp     ← new
```

The 5 existing placeholder PNGs (`gm-02.png`, `gm-22.png`, `gm-26.png`, `gm-28.png`, `gm-30.png`) can be deleted once `catalog.json` is repointed. `gm-mark.png` is dead and can be deleted.