# Garment Care Image Replacement Plan

## Goal
Replace existing gm1-gm21 images in `public/images/products/garment-care/` with new images from `public/Picture1.png` through `public/Picture21.png` (renamed to gm1.png-gm21.png).

## Current State

### Existing garment-care images (gm1-gm21 range):
- `gm3.jpg` → will be replaced
- `gm17-2.png` → will be replaced
- `gm18-2.png` → will be replaced
- gm1, gm2, gm4-gm16, gm19, gm20, gm21: **do not exist** (no action needed)

### Images to KEEP (gm22+):
- gm22.jpg - gm30.jpg
- gm28.png
- gm35.jpg
- gm37.jpg
- dry-iron*.webp (unrelated)

### New source images (public/):
- Picture1.png through Picture21.png (21 files)

## Plan

### Step 1: Delete existing gm1-gm21 images in garment-care
Remove any files matching gm1-gm21 pattern:
- `gm3.jpg`
- `gm17-2.png`
- `gm18-2.png`

### Step 2: Copy and rename new images
For each n in 1..21:
- Copy `public/Picture{n}.png` → `public/images/products/garment-care/gm{n}.png`

### Step 3: Verify
- Confirm gm1.png through gm21.png exist in garment-care
- Confirm gm22+ images unchanged
- Run `pnpm run build` to ensure no broken references

## Commands

```powershell
# Step 1: Delete existing gm1-gm21 images
Remove-Item "D:/Projects/gm/public/images/products/garment-care/gm3.jpg" -ErrorAction SilentlyContinue
Remove-Item "D:/Projects/gm/public/images/products/garment-care/gm17-2.png" -ErrorAction SilentlyContinue
Remove-Item "D:/Projects/gm/public/images/products/garment-care/gm18-2.png" -ErrorAction SilentlyContinue

# Step 2: Copy and rename Picture1-21 to gm1-21
for ($i=1; $i -le 21; $i++) {
    Copy-Item "D:/Projects/gm/public/Picture$i.png" "D:/Projects/gm/public/images/products/garment-care/gm$i.png"
}

# Step 3: Verify
ls "D:/Projects/gm/public/images/products/garment-care/gm*.png" | Sort-Object Name
```

## Risks
- None significant. Simple file replacement.
- No code references to update since filenames follow same gm{n} pattern.
- Original gm3.jpg was .jpg, new will be .png - verify this doesn't break any hardcoded extensions in code.

## Validation
- Build succeeds (`pnpm run build`)
- All 21 new images present in garment-care folder
- gm22+ images untouched