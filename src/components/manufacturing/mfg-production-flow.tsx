import Image from "next/image";
import type { ManufacturingProductionFlow, ManufacturingStep } from "@/lib/manufacturing";

function tileClass(index: number, count: number): string {
  if (count === 1) return "col-span-2 aspect-[4/3]";
  if (count === 3) {
    return index === 2 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]";
  }
  if (count % 3 === 1 && index === count - 1) {
    return "col-span-3 aspect-[16/9]";
  }
  if (count % 3 === 2 && index === count - 1) {
    return "col-span-2 aspect-[4/3]";
  }
  return "aspect-[4/3]";
}

function StageCollage({ step }: { step: ManufacturingStep }) {
  const count = step.images.length;
  const portrait =
    count === 1 && step.images[0].includes("press-shop");

  return (
    <div
      data-mfg-flow-media
      className={
        "grid gap-2.5 overflow-hidden rounded-sm " +
        (count >= 4 ? "grid-cols-3" : "grid-cols-2")
      }
    >
      {step.images.map((src, index) => (
        <div
          key={src}
          className={
            "relative overflow-hidden " +
            (portrait ? "col-span-2 aspect-[3/4]" : tileClass(index, count))
          }
        >
          <Image
            src={src}
            alt={`${step.title} - production stage`}
            fill
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}

function StageCopy({ step }: { step: ManufacturingStep }) {
  return (
    <div>
      <p className="text-3xl font-semibold tabular-nums tracking-tight text-accent sm:text-4xl">
        {step.number}
      </p>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground sm:text-xl">
        {step.title}
      </h3>
      <p className="mt-2 max-w-[42ch] text-pretty text-sm leading-relaxed text-foreground-secondary sm:text-base">
        {step.description}
      </p>
    </div>
  );
}

function LineMarker() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-white"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
    </span>
  );
}

export function ProductionFlow({
  section,
}: {
  section: ManufacturingProductionFlow;
}) {
  return (
    <section
      id="mfg-flow"
      className="bg-white"
      aria-labelledby="flow-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="flow-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
        </header>

        {/* Desktop - alternating editorial timeline around a central spine */}
        <div data-mfg-flow-desktop className="relative mt-20 hidden lg:block">
          <span
            data-mfg-flow-spine
            aria-hidden="true"
            className="absolute bottom-10 left-1/2 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-accent/40 via-accent/20 to-accent/40"
          />
          <ol
            aria-label="Production flow, stages one to nine"
            className="relative space-y-16"
          >
            {section.steps.map((step, index) => {
              const collageLeft = index % 2 === 0;
              return (
                <li
                  key={step.number}
                  data-mfg-flow-item
                  data-mfg-flow-side={collageLeft ? "left" : "right"}
                  className="relative grid grid-cols-2 items-center justify-center gap-x-20 xl:gap-x-28"
                >
                  <LineMarker />
                  <div className={collageLeft ? "col-start-1 row-start-1" : "col-start-2 row-start-1"}>
                    <StageCollage step={step} />
                  </div>
                  <div className={collageLeft ? "col-start-2 row-start-1" : "col-start-1 row-start-1"}>
                    <StageCopy step={step} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile - left-aligned spine timeline */}
        <div data-mfg-flow-mobile className="mt-12 lg:hidden">
          <ol
            data-mfg-flow-list
            className="relative space-y-10 before:absolute before:bottom-6 before:left-2.5 before:top-1 before:w-px before:bg-border"
          >
            {section.steps.map((step) => (
              <li
                key={step.number}
                data-mfg-flow-step
                className="relative flex items-start gap-5"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <StageCopy step={step} />
                  <div className="mt-5">
                    <StageCollage step={step} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}