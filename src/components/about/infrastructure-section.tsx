import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { AboutManufacturingInfrastructure } from "@/lib/about";

export function InfrastructureSection({
  section,
}: {
  section: AboutManufacturingInfrastructure;
}) {
  return (
    <section
      id="about-infrastructure"
      className="bg-white"
      aria-labelledby="infrastructure-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="infrastructure-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-8">
          {section.units.map((unit) => (
            <article key={unit.number} data-about-unit>
              <div
                data-about-unit-image
                className="relative aspect-[4/3] overflow-hidden rounded-sm"
              >
                <div data-about-parallax className="absolute inset-0">
                  <Image
                    src={unit.image}
                    alt={unit.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
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