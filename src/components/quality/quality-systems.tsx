import { Icon } from "@/components/ui/Icon";
import type { QualitySystems } from "@/lib/quality";

export function Systems({ section }: { section: QualitySystems }) {
  return (
    <section
      id="quality-systems"
      className="bg-background-alt"
      aria-labelledby="quality-systems-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="quality-systems-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
        </header>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item) => (
            <li
              key={item.title}
              data-quality-system
              className="rounded-sm border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-background-alt text-accent"
              >
                <Icon icon={item.icon} size={22} />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}