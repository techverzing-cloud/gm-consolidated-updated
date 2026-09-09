import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { CatalogCategory } from "@/lib/catalog";

export function CategoryCard({ category }: { category: CatalogCategory }) {
  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-white shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex items-center justify-center overflow-hidden bg-white px-6 py-8">
        <Image
          src={category.image}
          alt={category.imageAlt}
          width={480}
          height={380}
          className="aspect-square w-full max-w-xs object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-border p-6">
        <p className="text-sm font-semibold tabular-nums text-accent">
          {category.number}
        </p>
        <h2 className="mt-1 text-xl font-semibold text-foreground">
          {category.name}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
          {category.shortDescription}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
          Explore {category.name}
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            <Icon icon="mdi:arrow-right" size={16} />
          </span>
        </span>
      </div>
    </Link>
  );
}