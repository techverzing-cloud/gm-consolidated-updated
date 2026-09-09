import { parseMetric, type AboutManufacturingStrength } from "@/lib/about";

export function ManufacturingStrength({
  section,
}: {
  section: AboutManufacturingStrength;
}) {
  return (
    <section
      id="about-metrics"
      className="bg-white"
      aria-labelledby="metrics-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="metrics-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
        </header>

        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {section.metrics.map((metric) => {
            const parts = parseMetric(metric.value, metric.suffix);
            return (
              <div
                key={metric.label}
                data-about-metric
                className="flex flex-col bg-white p-8 text-center"
              >
                <dt className="order-2 mt-4 text-sm font-medium text-foreground-secondary">
                  {metric.label}
                </dt>
                <dd className="order-1 text-5xl font-semibold leading-none tracking-tight text-accent sm:text-6xl">
                  {parts ? (
                    <span
                      data-about-count
                      data-about-count-to={parts.count}
                      data-about-count-prefix={parts.prefix}
                      data-about-count-suffix={parts.suffix}
                    >
                      {metric.value}
                      {metric.suffix}
                    </span>
                  ) : (
                    <span>
                      {metric.value}
                      {metric.suffix}
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}