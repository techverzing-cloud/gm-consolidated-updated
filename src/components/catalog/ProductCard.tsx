import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog";

export function ProductCard({
  category,
  product,
  headingLevel = "h2",
}: {
  category: CatalogCategory;
  product: CatalogProduct;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

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
        <Heading className="mt-1 text-xl font-semibold text-foreground">
          {product.name}
        </Heading>
        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
          {product.shortDescription}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
          View details
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            <Icon icon="lucide:arrow-right" size={16} />
          </span>
        </span>
      </div>
    </Link>
  );
}