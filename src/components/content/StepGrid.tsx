import { Icon } from "@/components/ui/Icon";
import type { ProcessStep } from "@/lib/content";

const CARD_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  6: "sm:grid-cols-2 lg:grid-cols-6",
  9: "sm:grid-cols-3 lg:grid-cols-9",
};

export function StepGrid({
  items,
  variant = "cards",
  cols = 3,
}: {
  items: ProcessStep[];
  variant?: "cards" | "checklist";
  cols?: number;
}) {
  if (variant === "checklist") {
    return (
      <ol className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.number} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white"
            >
              <Icon icon="mdi:check-bold" size={14} />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-wide text-accent">
                {item.number}
              </p>
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              {item.text && (
                <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                  {item.text}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol
      className={`grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border ${
        CARD_COLS[cols] ?? "sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {items.map((item) => (
        <li key={item.number} className="flex flex-col gap-2 bg-white p-6">
          {item.icon && (
            <span
              aria-hidden="true"
              className="mb-1 flex h-10 w-10 items-center justify-center rounded-sm border border-border text-accent"
            >
              <Icon icon={item.icon} size={22} />
            </span>
          )}
          <span className="text-sm font-semibold tracking-wide text-accent">
            {item.number}
            {item.badge ? <span className="text-foreground/50"> &middot; {item.badge}</span> : null}
          </span>
          <h3 className="text-lg font-semibold text-foreground">
            {item.title}
          </h3>
          {item.text && (
            <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
              {item.text}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}