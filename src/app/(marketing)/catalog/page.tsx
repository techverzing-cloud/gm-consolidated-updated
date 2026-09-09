import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Explore the G.M. Consolidated catalogue — garment care, water heating, heating and comfort, personal care and specialty electronics, designed, tooled and built in-house.",
};

export default function CatalogPage() {
  const categories = getCategories();

  return (
    <div>
      <section className="bg-background-alt">
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Catalog" }]}
          />
          <div className="mt-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Catalog
            </p>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              Our Catalogue.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              Five engineered ranges — garment care, water heating, heating and
              comfort, personal care and specialty electronics. Every product
              designed, tooled and built in-house, for OEM, ODM and
              private-label programmes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white" aria-label="Catalogue categories">
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}