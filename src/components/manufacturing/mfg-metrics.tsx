import { parseMetric, type ManufacturingMetric } from "@/lib/manufacturing";

export function ManufacturingMetrics({
  metrics,
}: {
  metrics: ManufacturingMetric[];
}) {
  return (
    <section
      id="mfg-metrics"
      className="bg-navy"
      aria-label="Manufacturing capacity at a glance"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-red-500/70" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-400">
            Manufacturing Capacity
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric) => {
            const parts = parseMetric(metric.value, metric.suffix);
            return (
              <div key={metric.label} data-mfg-metric className="flex flex-col">
                <dd className="order-1 text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl">
                  {parts ? (
                    <span
                      data-mfg-count
                      data-mfg-count-to={parts.count}
                      data-mfg-count-prefix={parts.prefix}
                      data-mfg-count-suffix={parts.suffix}
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
                <dt className="order-3 mt-4 max-w-[16ch] text-sm font-medium leading-snug text-navy-muted">
                  {metric.label}
                </dt>
                <span
                  className="order-2 mt-5 h-px w-10 bg-accent-tint"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}