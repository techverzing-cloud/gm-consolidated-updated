import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  intro?: string;
  meta?: string;
}

export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  meta,
}: PageHeaderProps) {
  return (
    <section className="bg-background-alt">
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {intro}
            </p>
          )}
          {meta && (
            <p className="mt-4 text-sm font-medium text-foreground-secondary">
              {meta}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}