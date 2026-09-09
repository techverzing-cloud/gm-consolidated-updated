import { Icon } from "@/components/ui/Icon";
import type { ManufacturingIntegration } from "@/lib/manufacturing";

export function IntegratedOperations({
  section,
}: {
  section: ManufacturingIntegration;
}) {
  return (
    <section
      id="mfg-integration"
      className="bg-navy"
      aria-labelledby="integration-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-400">
            {section.eyebrow}
          </p>
          <h2
            id="integration-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-white sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-navy-muted sm:text-lg">
            {section.description}
          </p>
        </header>

        <div className="mt-14 hidden lg:block">
          <ol className="relative flex">
            <span
              data-flow-line-x
              aria-hidden="true"
              className="absolute left-[9%] right-[9%] top-[31px] h-px bg-navy-border"
            />
            {section.stages.map((stage) => (
              <li
                key={stage.title}
                data-mfg-stage
                className="flex-1 px-2 text-center"
              >
                <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-400/50 bg-navy text-red-400">
                  <Icon icon={stage.icon} size={24} />
                </span>
                <p className="mt-4 text-sm font-semibold leading-snug text-white">
                  {stage.title}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 lg:hidden">
          <ol className="relative space-y-9">
            <span
              data-flow-line-y
              aria-hidden="true"
              className="absolute bottom-4 left-[31px] top-4 w-px -translate-x-1/2 bg-navy-border"
            />
            {section.stages.map((stage) => (
              <li
                key={stage.title}
                data-mfg-stage
                className="relative flex items-center gap-6"
              >
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-red-400/50 bg-navy text-red-400">
                  <Icon icon={stage.icon} size={24} />
                </span>
                <p className="text-lg font-semibold text-white">
                  {stage.title}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p
          data-mfg-note
          className="mt-14 max-w-3xl border-t border-navy-border pt-8 text-pretty text-lg font-medium leading-relaxed text-accent-tint"
        >
          {section.note}
        </p>
      </div>
    </section>
  );
}