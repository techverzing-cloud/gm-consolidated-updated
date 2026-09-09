import Image from "next/image";
import Link from "next/link";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog";

export function ProductCard({
  category,
  product,
}: {
  category: CatalogCategory;
  product: CatalogProduct;
}) {
  return (
    <Link
      href={`/catalog/${category.slug}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-white shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex items-center justify-center overflow-hidden bg-white px-6 py-8">
        <Image
          src={product.image}
          alt={product.name}
          width={480}
          height={380}
          className="aspect-square w-full max-w-xs object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-border p-6">
        <p className="text-sm font-semibold text-accent">{product.code}</p>
        <h2 className="mt-1 text-xl font-semibold text-foreground">
          {product.name}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
          {product.shortDescription}
        </p>
      </div>
    </Link>
  );
}