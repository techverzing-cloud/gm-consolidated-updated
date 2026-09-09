import type { OemOdmJourney } from "@/lib/oem-odm";

export function PartnershipJourney({
  section,
}: {
  section: OemOdmJourney;
}) {
  return (
    <section
      id="odm-journey"
      className="bg-white"
      aria-labelledby="odm-journey-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="odm-journey-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
        </header>

        {/* Desktop / tablet — two-row serpentine layout */}
        <div data-odm-journey-desktop className="relative mt-16 hidden lg:block">
          {/* Continuous serpentine connector (drawn left→right, down, right→left) */}
          <span
            data-odm-serpent-top
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-10 z-0 h-px bg-accent/25"
          />
          <span
            data-odm-serpent-right
            aria-hidden="true"
            className="absolute bottom-[calc(50%-2.5rem)] left-[90%] top-10 z-0 w-px bg-accent/25"
          />
          <span
            data-odm-serpent-bottom
            aria-hidden="true"
            className="absolute bottom-[calc(50%-2.5rem)] left-[30%] right-[10%] z-0 h-px bg-accent/25"
          />

          {/* Row 1 — 01 → 05 · Row 2 — 09 ← 08 ← 07 ← 06 */}
          <ol
            aria-label="Partnership journey, stages one to nine"
            className="relative z-10 grid grid-cols-5 gap-y-16"
          >
            {section.steps.map((step, index) => {
              const isRowTwo = index >= 5;
              const colStart = isRowTwo ? 10 - index : index + 1;
              return (
                <li
                  key={step.number}
                  data-odm-journey-row={isRowTwo ? "2" : "1"}
                  style={{
                    gridColumnStart: colStart,
                    gridRowStart: isRowTwo ? 2 : 1,
                  }}
                  className="group flex flex-col items-center px-3 text-center"
                >
                  <span
                    data-odm-journey-marker
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent/40 bg-white text-2xl font-semibold tabular-nums text-accent shadow-sm transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md"
                  >
                    {step.number}
                  </span>
                  <div data-odm-journey-copy className="mt-7">
                    <h3 className="bg-white text-lg font-semibold leading-snug text-foreground">
                      {step.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[26ch] bg-white text-pretty text-sm leading-relaxed text-foreground-secondary">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile — clean vertical timeline */}
        <div data-odm-journey-mobile className="mt-12 lg:hidden">
          <ol className="relative space-y-10">
            <span
              data-odm-journey-line-y
              aria-hidden="true"
              className="absolute bottom-8 left-7 top-2 w-px -translate-x-1/2 bg-accent/25"
            />
            {section.steps.map((step) => (
              <li
                key={step.number}
                data-odm-journey-step
                className="relative flex items-start gap-6"
              >
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent/40 bg-white text-base font-semibold tabular-nums text-accent">
                  {step.number}
                </span>
                <div className="pt-0.5">
                  <h3 className="text-lg font-semibold leading-snug text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[52ch] text-pretty text-sm leading-relaxed text-foreground-secondary">
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