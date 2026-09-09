import { PageHeader } from "@/components/content/PageHeader";
import { Icon } from "@/components/ui/Icon";
import type { Unit } from "@/lib/units";

export function UnitPage({ unit }: { unit: Unit }) {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: unit.breadcrumbLabel },
        ]}
        eyebrow={unit.eyebrow}
        title={unit.title}
        intro={unit.intro}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {unit.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-5">
              <div className="rounded-sm border border-border bg-background-alt p-7 sm:p-8">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  {unit.focus.label}
                </h2>
                <p className="mt-3 flex items-start gap-3 text-pretty text-base leading-relaxed text-foreground sm:text-lg">
                  <Icon
                    icon="mdi:factory"
                    size={20}
                    className="mt-1 shrink-0 text-accent"
                  />
                  {unit.focus.value}
                </p>
                <div className="my-6 h-px bg-border" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  {unit.address.label}
                </h2>
                <p className="mt-3 flex items-start gap-3 text-pretty text-base leading-relaxed text-foreground sm:text-lg">
                  <Icon
                    icon="mdi:map-marker-outline"
                    size={20}
                    className="mt-1 shrink-0 text-accent"
                  />
                  <span>
                    {unit.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}