import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getCategories, getCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return { title: "Catalog" };
  }
  return {
    title: `${category.name} Catalogue`,
    description: `${category.description} Explore the range.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <div>
      <section className="bg-background-alt">
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Catalog", href: "/catalog" },
              { label: category.name },
            ]}
          />
          <div className="mt-10 max-w-2xl">
            <p className="text-sm font-semibold tabular-nums text-accent">
              {category.number}
            </p>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              {category.name}
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {category.description}
            </p>
            <p className="mt-4 text-sm font-medium text-foreground-secondary">
              {category.tag} &nbsp;&middot;&nbsp; Model codes {category.range}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white" aria-label={`${category.name} products`}>
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                category={category}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}