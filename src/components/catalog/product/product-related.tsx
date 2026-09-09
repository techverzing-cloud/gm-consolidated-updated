import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHeading } from "@/components/catalog/product/section-heading";
import {
  getRelatedProducts,
  type CatalogProduct,
} from "@/lib/catalog";

export function ProductRelated({ product }: { product: CatalogProduct }) {
  const related = getRelatedProducts(product).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section
      id="product-related"
      className="bg-white"
      aria-labelledby="product-related-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div data-product-reveal>
          <SectionHeading
            eyebrow="Related Products"
            title="Explore the range"
            description="Other products from the G.M. Consolidated catalogue that pair naturally with this model."
          />
        </div>

        <ul
          data-product-stagger
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {related.map(({ product: relatedProduct, category }) => (
            <li key={relatedProduct.id} data-product-stagger-item>
              <ProductCard category={category} product={relatedProduct} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}