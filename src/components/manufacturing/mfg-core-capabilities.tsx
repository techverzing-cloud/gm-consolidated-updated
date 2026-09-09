import { Icon } from "@/components/ui/Icon";
import type { ManufacturingCoreCapabilities } from "@/lib/manufacturing";

export function CoreCapabilities({
  section,
}: {
  section: ManufacturingCoreCapabilities;
}) {
  return (
    <section
      id="mfg-capabilities"
      className="bg-background-alt"
      aria-labelledby="capabilities-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="capabilities-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.groups.map((group) => (
            <article
              key={group.title}
              data-mfg-capability
              className="rounded-sm border border-border bg-white p-8"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-background-alt text-accent"
                >
                  <Icon icon={group.icon} size={22} />
                </span>
                <span className="text-sm font-semibold tabular-nums text-foreground-secondary">
                  {group.number}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-semibold text-foreground">
                {group.title}
              </h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {group.details.map((detail) => (
                  <li
                    key={detail}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background-alt px-2.5 py-1 text-sm font-medium text-foreground"
                  >
                    <Icon
                      icon="mdi:check"
                      size={13}
                      className="text-accent"
                      aria-hidden="true"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}