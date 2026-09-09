import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <Icon
                  icon="mdi:chevron-right"
                  size={15}
                  className="text-foreground/40"
                />
              )}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href ?? "/"}
                  className="link-underline text-foreground-secondary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}