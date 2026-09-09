import { Icon } from "@/components/ui/Icon";
import type { OemOdmEngagement } from "@/lib/oem-odm";

export function EngagementModels({
  section,
}: {
  section: OemOdmEngagement;
}) {
  return (
    <section
      id="odm-engagement"
      className="bg-background-alt"
      aria-labelledby="odm-engagement-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="odm-engagement-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {section.models.map((model) => (
            <article
              key={model.title}
              data-odm-model
              className="flex flex-col rounded-sm border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-semibold tabular-nums text-accent">
                  {model.number}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-background-alt text-accent"
                >
                  <Icon icon={model.icon} size={22} />
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-snug text-foreground">
                {model.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground-secondary">
                {model.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}