import { Icon } from "@/components/ui/Icon";
import type { AboutSubSection } from "@/lib/about";

export function PhilosophySection({
  philosophy,
}: {
  philosophy: AboutSubSection & { principles: Array<{ number: string; title: string; description: string; icon: string }> };
}) {
  return (
    <section
      id="about-philosophy"
      className="bg-white"
      aria-labelledby="philosophy-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {philosophy.eyebrow}
          </p>
          <h2
            id="philosophy-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {philosophy.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {philosophy.description}
          </p>
        </header>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.principles.map((principle) => (
            <div
              key={principle.title}
              data-about-principle
              className="group bg-white p-8"
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-background-alt text-accent transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
                >
                  <Icon icon={principle.icon} size={22} />
                </span>
                <span className="text-sm font-semibold tabular-nums text-foreground-secondary">
                  {principle.number}
                </span>
              </div>
              <h3 className="mt-7 text-xl font-semibold text-foreground">
                {principle.title}
              </h3>
              <p className="mt-2 text-pretty text-base leading-relaxed text-foreground-secondary">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}