import { parseMetric, type AboutFact } from "@/lib/about";

export function CompanyFacts({ facts }: { facts: AboutFact[] }) {
  return (
    <section
      id="about-facts"
      className="bg-background-alt"
      aria-label="Key company facts"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => {
            const parts = parseMetric(fact.value, fact.suffix);
            return (
              <div key={fact.label} data-about-fact className="flex flex-col">
                <dt className="order-2 mt-4 text-sm font-medium uppercase tracking-[0.12em] text-foreground-secondary">
                  {fact.label}
                </dt>
                <dd className="order-1 text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl">
                  {parts ? (
                    <span
                      data-about-count
                      data-about-count-to={parts.count}
                      data-about-count-prefix={parts.prefix}
                      data-about-count-suffix={parts.suffix}
                    >
                      {fact.value}
                      {fact.suffix}
                    </span>
                  ) : (
                    <span>{fact.value}</span>
                  )}
                </dd>
                <div className="order-3 mt-5 h-px w-10 bg-accent" />
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}