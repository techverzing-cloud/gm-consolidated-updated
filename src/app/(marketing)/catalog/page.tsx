import type { Metadata } from "next";
import { CatalogHero } from "@/components/catalog/CatalogHero";
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
      <CatalogHero />

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