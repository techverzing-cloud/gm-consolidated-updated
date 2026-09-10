import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductClosingCta({ product }: { product: CatalogProduct }) {
  return (
    <section
      id="product-cta"
      className="bg-navy"
      aria-labelledby="product-cta-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div
          data-product-reveal
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-tint">
            {product.code} &nbsp;&middot;&nbsp; Let&apos;s talk
          </p>
          <h2
            id="product-cta-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.08] text-white sm:text-5xl"
          >
            Discuss this product with our team
          </h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-navy-muted sm:text-lg">
            {product.enquiry?.description ??
              "Ask us about the product, configured variants, or OEM and private-label programmes."}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={product.enquiry?.href ?? "/contact#enquiry"}
              className="btn-navy-solid w-full px-6 py-3 text-base sm:w-auto"
            >
              Request Product Enquiry
              <Icon icon="mdi:arrow-right" size={16} />
            </Link>
            <Link
              href="/catalog"
              className="btn-navy-ghost w-full px-6 py-3 text-base sm:w-auto"
            >
              Explore the Catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}