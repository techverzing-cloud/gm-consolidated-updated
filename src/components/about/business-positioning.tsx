import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { AboutBusinessPositioning } from "@/lib/about";

export function BusinessPositioning({
  section,
}: {
  section: AboutBusinessPositioning;
}) {
  return (
    <section
      id="about-business"
      className="bg-white"
      aria-labelledby="business-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="business-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
        </header>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {section.models.map((model) => (
            <div
              key={model.title}
              data-about-business
              className="group flex flex-col bg-white p-7"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-background-alt text-accent transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
              >
                <Icon icon={model.icon} size={22} />
              </span>
              <h3 className="mt-7 text-xl font-semibold text-foreground">
                {model.title}
              </h3>
              <p className="mt-2 text-pretty text-base leading-relaxed text-foreground-secondary">
                {model.description}
              </p>
            </div>
          ))}
        </div>

        {section.ctaHref && section.ctaLabel && (
          <div className="mt-10">
            <Link
              href={section.ctaHref}
              className="inline-flex items-center gap-2 rounded-sm bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              {section.ctaLabel}
              <Icon icon="mdi:arrow-right" size={16} className="text-accent-tint" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}