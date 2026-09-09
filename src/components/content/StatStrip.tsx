import type { Metric } from "@/lib/content";

export function StatStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white px-4 py-6 sm:px-6">
          <dt className="text-xl font-semibold text-foreground sm:text-2xl">
            {metric.value}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground-secondary">
            {metric.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}