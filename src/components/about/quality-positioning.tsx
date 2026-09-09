import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { AboutQualityPositioning } from "@/lib/about";

export function QualityPositioning({
  section,
}: {
  section: AboutQualityPositioning;
}) {
  return (
    <section
      id="about-quality"
      className="bg-background-alt"
      aria-labelledby="quality-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {section.eyebrow}
            </p>
            <h2
              id="quality-title"
              className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {section.description}
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <span
              data-about-quality-line
              aria-hidden="true"
              className="absolute bottom-33 left-[5px] top-4 w-px bg-accent"
            />
            <ol className="space-y-10 pl-5">
              {section.points.map((point, index) => (
                <li key={point.title} data-about-quality-item className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-5 top-1 flex h-[11px] w-[11px] items-center justify-center rounded-full border border-accent bg-white"
                  />
                  <span className="flex items-center gap-3">
                    <Icon icon={point.icon} size={20} className="text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">
                      <span className="text-foreground-secondary">{String(index + 1).padStart(2, "0")}</span>
                      {" "}
                      {point.title}
                    </h3>
                  </span>
                  <p className="mt-2 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
                    {point.description}
                  </p>
                </li>
              ))}
            </ol>

            {section.ctaHref && section.ctaLabel && (
              <Link
                href={section.ctaHref}
                className="mt-10 inline-flex items-center gap-2 rounded-sm bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
              >
                {section.ctaLabel}
                <Icon icon="mdi:arrow-right" size={16} className="text-accent-tint" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}