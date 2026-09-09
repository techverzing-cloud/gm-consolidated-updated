import { SectionHeading } from "@/components/catalog/product/section-heading";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductFeatures({ product }: { product: CatalogProduct }) {
  if (!product.features || product.features.length === 0) return null;

  return (
    <section
      id="product-features"
      className="bg-background-alt"
      aria-labelledby="product-features-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div data-product-reveal>
          <SectionHeading
            eyebrow="Features"
            title="Key features"
            description={`What makes the ${product.name} (${product.code}) a dependable choice across its applications.`}
          />
        </div>

        <ul
          data-product-stagger
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {product.features.map((feature, index) => (
            <li
              key={feature}
              data-product-stagger-item
              className="flex items-start gap-4 rounded-sm border border-border bg-white p-6"
            >
              <span className="mt-0.5 text-sm font-semibold tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-foreground-secondary">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}