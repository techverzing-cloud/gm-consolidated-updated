import { Icon } from "@/components/ui/Icon";
import type { QualityInspectionProcess } from "@/lib/quality";

export function InspectionProcess({
  section,
}: {
  section: QualityInspectionProcess;
}) {
  return (
    <section
      id="quality-process"
      className="bg-white"
      aria-labelledby="quality-process-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="quality-process-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
        </header>

        <div className="relative mt-16">
          {/* Vertical connector (drawn top → bottom) */}
          <span
            data-quality-process-line
            aria-hidden="true"
            className="absolute bottom-4 left-7 top-4 w-px origin-top bg-accent/25"
          />

          <ol className="relative space-y-12 lg:space-y-14">
            {section.steps.map((step) => (
              <li
                key={step.number}
                className="group relative flex items-start gap-6 lg:gap-10"
              >
                <span
                  data-quality-process-marker
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent/40 bg-white text-accent transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md"
                >
                  <Icon icon={step.icon} size={22} />
                </span>
                <div data-quality-process-step className="pt-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold tabular-nums text-accent">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold leading-snug text-foreground lg:text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[58ch] text-pretty text-sm leading-relaxed text-foreground-secondary sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}