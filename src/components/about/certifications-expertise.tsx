import { Icon } from "@/components/ui/Icon";
import type { AboutCertifications } from "@/lib/about";

export function CertificationsExpertise({
  section,
}: {
  section: AboutCertifications;
}) {
  return (
    <section
      id="about-certifications"
      className="bg-white"
      aria-labelledby="certifications-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-base font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="certifications-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {section.description}
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div
              data-about-cert-panel
              className="rounded-sm border border-border bg-background-alt p-7 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-border bg-white text-accent"
                >
                  <Icon icon="lucide:badge-check" size={26} />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold tracking-tight text-foreground">
                    {section.standard.code}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground-secondary">
                    {section.standard.label}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-pretty text-base leading-relaxed text-foreground-secondary">
                {section.standard.description}
              </p>

              <ul className="mt-7 divide-y divide-border border-t border-border">
                {section.units.map((unit) => (
                  <li
                    key={unit.name}
                    data-about-cert-unit
                    className="flex gap-4 py-6"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-white text-accent"
                    >
                      <Icon icon={unit.icon} size={20} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {unit.name}
                        </h3>
                        <span className="rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-accent">
                          {unit.certification}
                        </span>
                      </div>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground-secondary">
                        {unit.scope}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-foreground-secondary">
                        <Icon icon="lucide:map-pin" size={14} />
                        {unit.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground-secondary">
              {section.productsLabel}
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {section.products.map((product) => (
                <li
                  key={product.title}
                  data-about-cert-product
                  className="group flex gap-4 bg-white p-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-background-alt text-accent transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
                  >
                    <Icon icon={product.icon} size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-pretty text-base font-semibold leading-snug text-foreground">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                      {product.spec}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
