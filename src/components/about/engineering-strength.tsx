import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { AboutEngineeringStrength } from "@/lib/about";

const FLOW_ICONS = [
  "mdi:lightbulb-outline",
  "mdi:vector-square",
  "mdi:engine-outline",
  "mdi:tools",
  "mdi:factory",
];

export function EngineeringStrength({
  section,
}: {
  section: AboutEngineeringStrength;
}) {
  return (
    <section
      id="about-engineering"
      className="bg-background-alt"
      aria-labelledby="engineering-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:col-span-5 lg:aspect-auto lg:min-h-[420px]">
            <div data-about-parallax className="absolute inset-0">
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {section.eyebrow}
            </p>
            <h2
              id="engineering-title"
              className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {section.description}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {section.points.map((point) => (
                <li
                  key={point}
                  className="rounded-sm border border-border bg-white px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-sm border border-border bg-white p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            From concept to production
          </p>

          <ol className="relative mt-10 hidden md:flex">
            <span
              data-flow-line-x
              aria-hidden="true"
              className="absolute left-[8%] right-[8%] top-7 h-px -translate-y-1/2 bg-accent/25"
            />
            {section.flow.map((step, index) => (
              <li
                key={step}
                data-flow-node
                className="relative flex-1 px-2 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-white text-accent">
                  <Icon icon={FLOW_ICONS[index]} size={22} />
                </span>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <ol className="relative mt-6 md:hidden">
            <span
              data-flow-line-y
              aria-hidden="true"
              className="absolute bottom-4 left-[23px] top-4 w-px -translate-x-1/2 bg-accent/25"
            />
            {section.flow.map((step, index) => (
              <li
                key={step}
                data-flow-node
                className="relative flex items-center gap-4 py-3"
              >
                <span className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-white text-accent">
                  <Icon icon={FLOW_ICONS[index]} size={20} />
                </span>
                <p className="text-base font-semibold text-foreground">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}