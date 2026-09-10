import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/catalog/product/product-gallery";
import { Icon } from "@/components/ui/Icon";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog";

export function ProductHero({
  category,
  product,
}: {
  category: CatalogCategory;
  product: CatalogProduct;
}) {
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [{ src: product.image, alt: product.name }];

  return (
    <section
      id="product-hero"
      className="bg-background-alt"
      aria-labelledby="product-hero-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Catalog", href: "/catalog" },
            { label: category.name, href: `/catalog/${category.slug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div data-product-hero-image>
            <ProductGallery images={galleryImages} />
          </div>

          <div>
            <div
              data-product-hero-eyebrow
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-3 py-1 text-sm font-semibold text-accent">
                <Icon icon="mdi:package-variant-closed" size={15} />
                {product.code}
              </span>
              <span className="text-sm font-medium text-foreground-secondary">
                {category.name}
              </span>
            </div>

            <h1
              id="product-hero-title"
              data-product-hero-title
              className="mt-5 text-balance text-3xl font-semibold leading-[1.08] text-foreground sm:text-4xl lg:text-5xl"
            >
              {product.name}
            </h1>

            <p
              data-product-hero-copy
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
            >
              {product.shortDescription}
            </p>

            {product.highlights && product.highlights.length > 0 ? (
              <ul
                data-product-hero-highlights
                className="mt-8 space-y-4"
                aria-label="Key highlights"
              >
                {product.highlights.map((highlight) => (
                  <li key={highlight.title} className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-border bg-white text-accent">
                      <Icon icon={highlight.icon} size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {highlight.title}
                      </p>
                      <p className="mt-0.5 max-w-md text-sm leading-relaxed text-foreground-secondary">
                        {highlight.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            <div
              data-product-hero-ctas
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={product.enquiry?.href ?? "/contact#enquiry"}
                className="btn-primary px-6 py-3 text-base"
              >
                Request Product Enquiry
                <Icon icon="mdi:arrow-right" size={16} />
              </Link>
            </div>

            <p
              data-product-hero-meta
              className="mt-6 text-sm text-foreground-secondary"
            >
              Model code {product.code} &nbsp;&middot;&nbsp; Part of the{" "}
              {category.name} range ({category.range})
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}