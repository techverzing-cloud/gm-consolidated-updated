import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/catalog/product/section-heading";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductManufacturing({ product }: { product: CatalogProduct }) {
  const hasNotes =
    (product.manufacturingNotes && product.manufacturingNotes.length > 0) ||
    (product.qualityNotes && product.qualityNotes.length > 0);

  if (!hasNotes) return null;

  return (
    <section
      id="product-manufacturing"
      className="bg-white"
      aria-labelledby="product-manufacturing-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            data-product-clip
            className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-background-alt"
          >
            <Image
              src="/images/factory/assembly.jpg"
              alt="G.M. Consolidated in-house assembly line"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          <div data-product-manufacturing-content>
            <SectionHeading
              eyebrow="Manufacturing & Quality"
              title="Designed, tooled and built in-house."
              description="The product is produced on G.M. Consolidated's own lines in Noida — giving you control over tooling, quality and lead time from a single source."
            />

            <div className="mt-8 space-y-7">
              {product.manufacturingNotes &&
                product.manufacturingNotes.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                    Manufacturing
                  </h3>
                  <ul className="mt-4 space-y-3" data-product-check-list>
                    {product.manufacturingNotes.map((note) => (
                      <li
                        key={note}
                        data-product-check-item
                        className="flex items-start gap-3"
                      >
                        <Icon
                          icon="mdi:factory"
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="text-sm leading-relaxed text-foreground-secondary">
                          {note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {product.qualityNotes && product.qualityNotes.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                    Quality & Testing
                  </h3>
                  <ul className="mt-4 space-y-3" data-product-check-list>
                    {product.qualityNotes.map((note) => (
                      <li
                        key={note}
                        data-product-check-item
                        className="flex items-start gap-3"
                      >
                        <Icon
                          icon="mdi:clipboard-check-outline"
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="text-sm leading-relaxed text-foreground-secondary">
                          {note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-4 pt-1 sm:flex-row">
              <Link
                href="/manufacturing"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Explore our manufacturing
                <Icon icon="mdi:arrow-right" size={15} />
              </Link>
              <Link
                href="/quality"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Explore quality & testing
                <Icon icon="mdi:arrow-right" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}