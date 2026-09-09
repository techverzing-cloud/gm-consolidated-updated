import { Icon } from "@/components/ui/Icon";
import type { OemOdmCapabilities } from "@/lib/oem-odm";

export function Capabilities({
  section,
}: {
  section: OemOdmCapabilities;
}) {
  return (
    <section
      id="odm-capabilities"
      className="bg-background-alt"
      aria-labelledby="odm-capabilities-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="odm-capabilities-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {section.items.map((item) => (
            <article
              key={item.title}
              data-odm-capability
              className="flex gap-5 rounded-sm border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-background-alt text-accent"
              >
                <Icon icon={item.icon} size={22} />
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground-secondary">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}