import type { ManufacturingIntro } from "@/lib/manufacturing";

export function ManufacturingIntro({ intro }: { intro: ManufacturingIntro }) {
  return (
    <section
      id="mfg-intro"
      className="bg-white"
      aria-labelledby="mfg-intro-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div data-mfg-intro className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {intro.eyebrow}
            </p>
            <div className="mt-8 h-px w-24 bg-accent" />
          </div>
          <div className="lg:col-span-7">
            <h2
              id="mfg-intro-title"
              className="text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
            >
              {intro.title}
            </h2>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {intro.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}