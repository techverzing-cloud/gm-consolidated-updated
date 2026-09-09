import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductCustomisation({
  product,
}: {
  product: CatalogProduct;
}) {
  const hasContent =
    (product.customization && product.customization.length > 0) ||
    (product.packaging &&
      (product.packaging.description || product.packaging.options.length > 0));

  if (!hasContent) return null;

  return (
    <section
      id="product-customisation"
      className="bg-navy"
      aria-labelledby="product-customisation-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div data-product-reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-tint">
              OEM / ODM &amp; Private Label
            </p>
            <h2
              id="product-customisation-title"
              className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-white sm:text-4xl"
            >
              Customisation for your programme
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-navy-muted sm:text-lg">
              The {product.code} can be configured for OEM, ODM and
              private-label programmes — branding, finishes and market-specific
              details. All customisation is subject to engineering and
              production feasibility.
            </p>
          </div>

          <ul
            data-product-stagger
            className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {(product.customization ?? []).map((item) => (
              <li
                key={item}
                data-product-stagger-item
                className="flex items-start gap-3 rounded-sm border border-navy-border bg-navy/60 p-4"
              >
                <Icon
                  icon="mdi:vector-square"
                  size={18}
                  className="mt-0.5 shrink-0 text-accent-tint"
                />
                <span className="text-sm leading-relaxed text-navy-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {product.packaging ? (
            <div className="mt-10 max-w-3xl border-t border-navy-border pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Packaging
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-muted">
                {product.packaging.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.packaging.options.map((option) => (
                  <li
                    key={option}
                    className="rounded-full border border-navy-border px-3 py-1 text-xs font-medium text-navy-muted"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/oem-odm"
              className="btn-navy-solid px-6 py-3 text-sm"
            >
              Explore OEM / ODM
              <Icon icon="mdi:arrow-right" size={16} />
            </Link>
            <Link
              href={product.enquiry?.href ?? "/contact"}
              className="btn-navy-ghost px-6 py-3 text-sm"
            >
              Discuss your variant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}