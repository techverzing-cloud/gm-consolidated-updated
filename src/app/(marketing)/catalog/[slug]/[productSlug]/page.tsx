import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductApplications } from "@/components/catalog/product/product-applications";
import { ProductClosingCta } from "@/components/catalog/product/product-closing-cta";
import { ProductCustomisation } from "@/components/catalog/product/product-customisation";
import { ProductDetailAnimations } from "@/components/catalog/product/ProductDetailAnimations";
import { ProductFeatures } from "@/components/catalog/product/product-features";
import { ProductHero } from "@/components/catalog/product/product-hero";
import { ProductManufacturing } from "@/components/catalog/product/product-manufacturing";
import { ProductOverview } from "@/components/catalog/product/product-overview";
import { ProductRelated } from "@/components/catalog/product/product-related";
import { ProductSpecifications } from "@/components/catalog/product/product-specifications";
import { getCategories, getCategory, getProduct } from "@/lib/catalog";

export function generateStaticParams() {
  return getCategories().flatMap((category) =>
    category.products.map((product) => ({
      slug: category.slug,
      productSlug: product.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const category = getCategory(slug);
  const product = getProduct(slug, productSlug);
  if (!category || !product) {
    return { title: "Catalog" };
  }
  return {
    title: `${product.name} (${product.code}) — ${category.name}`,
    description: `${product.shortDescription} Explore the ${product.code} ${product.name} and the ${category.name} range from G.M. Consolidated.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug } = await params;
  const category = getCategory(slug);
  const product = getProduct(slug, productSlug);
  if (!category || !product) notFound();

  return (
    <ProductDetailAnimations>
      <ProductHero category={category} product={product} />
      <ProductOverview product={product} />
      <ProductFeatures product={product} />
      <ProductSpecifications product={product} />
      <ProductApplications product={product} />
      <ProductManufacturing product={product} />
      <ProductCustomisation product={product} />
      <ProductRelated product={product} />
      <ProductClosingCta product={product} />
    </ProductDetailAnimations>
  );
}