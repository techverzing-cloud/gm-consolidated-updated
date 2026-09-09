import type { FeatureItem } from "@/lib/content";

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
      {items.map((item, index) => (
        <div key={item.name ?? item.title ?? index}>
          <p className="text-sm font-semibold tabular-nums text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <dt className="mt-1 text-lg font-semibold text-foreground">
            {item.name ?? item.title}
          </dt>
          {item.text && (
            <dd className="mt-2 text-sm leading-relaxed text-foreground-secondary">
              {item.text}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}