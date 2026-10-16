import type { Metadata } from "next";
import { CinematicHero } from "@/components/home/CinematicHero";
import { Brands } from "@/components/shared/brands";
import { Engineering } from "@/components/home/Engineering";
import { Catalog } from "@/components/home/Catalog";
import { Manufacturing } from "@/components/home/Manufacturing";
import { ProductMatrix } from "@/components/shared/product-matrix";
import { Quality } from "@/components/home/Quality";
import { OemOdm } from "@/components/home/OemOdm";
import {
  buildPageMetadata,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/metadata";
import { getCategories } from "@/lib/catalog";

export const metadata: Metadata = buildPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  const heroProducts = getCategories().map((category) => ({
    src: category.image,
    alt: category.imageAlt,
  }));

  return (
    <>
      <CinematicHero products={heroProducts} />
      <Brands />
      <Catalog />
      <Engineering />
      <Manufacturing />
      <ProductMatrix period="monthly" />
      <Quality />
      <OemOdm />
    </>
  );
}