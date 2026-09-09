import type { QualityPhilosophy } from "@/lib/quality";

export function Philosophy({
  section,
}: {
  section: QualityPhilosophy;
}) {
  return (
    <section
      id="quality-philosophy"
      className="bg-background-alt"
      aria-labelledby="quality-philosophy-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="quality-philosophy-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl lg:text-[44px]"
          >
            {section.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
          <div
            data-quality-rule
            aria-hidden="true"
            className="mx-auto mt-10 h-px w-24 origin-center bg-accent/30"
          />
        </header>
      </div>
    </section>
  );
}