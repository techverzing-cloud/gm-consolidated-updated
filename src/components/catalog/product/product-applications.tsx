import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/catalog/product/section-heading";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductApplications({ product }: { product: CatalogProduct }) {
  if (!product.applications || product.applications.length === 0) return null;

  return (
    <section
      id="product-applications"
      className="bg-background-alt"
      aria-labelledby="product-applications-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div data-product-reveal>
          <SectionHeading
            eyebrow="Applications"
            title="Where it is used"
            description={`Typical environments for the ${product.name} (${product.code}).`}
          />
        </div>

        <ul
          data-product-stagger
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {product.applications.map((application) => (
            <li
              key={application}
              data-product-stagger-item
              className="flex items-start gap-3 rounded-sm border border-border bg-white p-4"
            >
              <Icon
                icon="mdi:check-circle-outline"
                size={18}
                className="mt-0.5 shrink-0 text-accent"
              />
              <span className="text-sm font-medium text-foreground">
                {application}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}