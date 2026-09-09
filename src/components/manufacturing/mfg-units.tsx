import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { ManufacturingUnits } from "@/lib/manufacturing";

export function IndustrialUnits({ section }: { section: ManufacturingUnits }) {
  return (
    <section
      id="mfg-units"
      className="bg-white"
      aria-labelledby="units-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="units-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {section.units.map((unit) => (
            <article key={unit.number} data-mfg-unit>
              <div
                data-mfg-unit-image
                className="relative h-[260px] overflow-hidden rounded-sm"
              >
                <div data-mfg-parallax className="absolute inset-0">
                  <Image
                    src={unit.image}
                    alt={unit.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                  Unit — {unit.number}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  {unit.name}
                </h3>

                <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-foreground-secondary">
                  <Icon
                    icon="mdi:map-marker-outline"
                    size={18}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-pretty">{unit.location}</span>
                </p>

                <p className="mt-2 flex items-start gap-2.5 text-sm leading-relaxed text-foreground-secondary">
                  <Icon
                    icon="mdi:factory"
                    size={18}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>{unit.focus}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}