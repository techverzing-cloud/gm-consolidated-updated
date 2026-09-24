import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export interface ManufacturingUnit {
  number: string;
  name: string;
  location: string;
  focus: string;
  image: string;
  imageAlt: string;
}

export interface ManufacturingUnitsSection {
  eyebrow: string;
  title: string;
  description: string;
  units: ManufacturingUnit[];
}

const scopeIds = {
  about: {
    section: "about-infrastructure",
    title: "infrastructure-title",
  },
  mfg: {
    section: "mfg-units",
    title: "units-title",
  },
} as const;

export function ManufacturingUnits({
  section,
  scope,
}: {
  section: ManufacturingUnitsSection;
  scope: keyof typeof scopeIds;
}) {
  const ids = scopeIds[scope];

  return (
    <section id={ids.section} className="bg-white" aria-labelledby={ids.title}>
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-base font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id={ids.title}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {section.description}
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-8">
          {section.units.map((unit) => (
            <article
              key={unit.number}
              {...{ [`data-${scope}-unit`]: true }}
            >
              <div
                {...{ [`data-${scope}-unit-image`]: true }}
                className="relative aspect-[4/3] overflow-hidden rounded-sm"
              >
                <div
                  {...{ [`data-${scope}-parallax`]: true }}
                  className="absolute inset-0"
                >
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
                <p className="text-base font-semibold uppercase tracking-[0.14em] text-accent">
                  Unit - {unit.number}
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-foreground">
                  {unit.name}
                </h3>

                <p className="mt-4 flex items-start gap-2.5 text-base leading-relaxed text-foreground-secondary">
                  <Icon
                    icon="lucide:map-pin"
                    size={18}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-pretty">{unit.location}</span>
                </p>

                <p className="mt-2 flex items-start gap-2.5 text-base leading-relaxed text-foreground-secondary">
                  <Icon
                    icon="lucide:factory"
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
