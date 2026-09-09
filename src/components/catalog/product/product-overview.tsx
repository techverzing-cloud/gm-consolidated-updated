import { SectionHeading } from "@/components/catalog/product/section-heading";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductOverview({ product }: { product: CatalogProduct }) {
  if (!product.description) return null;

  return (
    <section
      id="product-overview"
      className="bg-white"
      aria-labelledby="product-overview-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div
          data-product-reveal
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16"
        >
          <SectionHeading
            eyebrow="Product Overview"
            title={`${product.name}, engineered for reliable everyday performance`}
          />
          <div>
            <p className="text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {product.description}
            </p>
            <p className="mt-5 max-w-2xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground-secondary">
              G.M. Consolidated designs, tools and builds every product
              in-house in Noida — from first tooling to end-of-line testing —
              so your specification is controlled at every stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}