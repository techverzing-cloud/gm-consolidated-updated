import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getCategories } from "@/lib/catalog";

export function Catalog() {
  const categories = getCategories();

  return (
    <section
      id="catalog"
      className="scroll-mt-20 bg-background-alt"
      aria-labelledby="catalog-heading"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          className="mx-auto max-w-2xl text-center"
          data-reveal
          data-reveal-stagger
        >
          <p
            data-reveal-child
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            Catalog
          </p>
          <h2
            id="catalog-heading"
            data-reveal-child
            className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            Five Engineered Ranges. One Ecosystem.
          </h2>
          <p
            data-reveal-child
            className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            Every G.M. Consolidated product is designed, tooled and built
            in-house — across OEM, ODM and private-label programmes.
          </p>
        </div>

        <div
          className="mt-14 flex flex-wrap justify-center gap-6"
          data-reveal
          data-reveal-stagger
        >
          {categories.map((category) => (
            <article
              key={category.id}
              data-reveal-child
              className="group w-full overflow-hidden rounded-sm border border-border bg-white shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
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
              <div className="border-t border-border p-6">
                <p className="text-sm font-semibold tabular-nums text-accent">
                  {category.number}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-foreground">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-foreground-secondary">
                  {category.tag} • {category.range}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  {category.shortDescription}
                </p>
                <Link
                  href={`/catalog/${category.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Explore range
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    <Icon icon="mdi:arrow-right" size={16} />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row"
          data-reveal
        >
          <p className="text-sm font-medium text-foreground-secondary">
            OEM • ODM • Private label
          </p>
          <Link
            href="/catalog"
            className="link-underline text-sm font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View the full catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}