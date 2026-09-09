import { SectionHeading } from "@/components/catalog/product/section-heading";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductSpecifications({
  product,
}: {
  product: CatalogProduct;
}) {
  if (!product.specifications || product.specifications.length === 0) {
    return null;
  }

  return (
    <section
      id="product-specifications"
      className="bg-white"
      aria-labelledby="product-specifications-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div data-product-reveal>
          <SectionHeading
            eyebrow="Technical Specifications"
            title="Specifications"
            description={`General specification overview for the ${product.code}. Values shown are indicative for catalogue development.`}
          />
        </div>

        <dl
          data-product-stagger
          className="mt-10 max-w-4xl divide-y divide-border border-y border-border"
        >
          {product.specifications.map((specification) => (
            <div
              key={specification.label}
              data-product-stagger-item
              className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[240px_1fr] sm:gap-8"
            >
              <dt className="text-sm font-semibold text-foreground">
                {specification.label}
              </dt>
              <dd className="text-sm leading-relaxed text-foreground-secondary">
                {specification.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
          Sample data is provided for catalogue development and will be replaced
          with the verified specification sheet for this model. Confirm final
          ratings, materials and approvals with our team before specification.
        </p>
      </div>
    </section>
  );
}