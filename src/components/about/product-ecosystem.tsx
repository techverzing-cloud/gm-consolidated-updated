import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { AboutProductEcosystem } from "@/lib/about";

export function ProductEcosystem({
  section,
}: {
  section: AboutProductEcosystem;
}) {
  return (
    <section
      id="about-ecosystem"
      className="bg-navy"
      aria-labelledby="ecosystem-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-tint">
            {section.eyebrow}
          </p>
          <h2
            id="ecosystem-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-white sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-navy-muted sm:text-lg">
            {section.description}
          </p>
        </header>

        <ul className="mt-12 border-t border-navy-border">
          {section.categories.map((category) => (
            <li key={category.name} data-about-eco-row>
              <Link
                href={category.href}
                className="group flex items-center gap-5 border-b border-navy-border py-6 transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-tint hover:bg-white/[0.04] sm:gap-8 sm:py-8"
              >
                <span className="text-sm font-semibold tabular-nums text-navy-muted">
                  {category.number}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-navy-border text-accent-tint transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
                >
                  <Icon icon={category.icon} size={20} />
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-semibold text-white transition-colors duration-200 group-hover:text-accent-tint sm:text-2xl">
                    {category.name}
                  </span>
                  <span className="mt-1 block text-pretty text-sm leading-relaxed text-navy-muted">
                    {category.description}
                  </span>
                </span>
                <Icon
                  icon="mdi:arrow-right"
                  size={22}
                  className="shrink-0 text-navy-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-tint"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}