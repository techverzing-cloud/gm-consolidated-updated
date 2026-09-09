import Image from "next/image";
import Link from "next/link";

const CAPABILITY_METRICS = [
  { to: "25", prefix: "", suffix: "", label: "Injection machines" },
  { to: "250", prefix: "120–", suffix: "T", label: "PDC capacity" },
  { to: "4", prefix: "", suffix: "M", label: "Thermostats / year" },
  { to: "20", prefix: "", suffix: "+ yrs", label: "Tool room exports" },
];

const PRODUCTION_LINE = [
  "Pressure die casting",
  "Injection moulding",
  "Press shop",
  "Tool room",
  "PTFE coating",
  "Thermostat manufacturing",
  "Heating elements",
  "Auto-conveyorised assembly",
  "Routine testing",
];

export function Manufacturing() {
  return (
    <section
      id="manufacturing"
      className="scroll-mt-20 bg-white"
      aria-labelledby="manufacturing-heading"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div data-reveal data-reveal-stagger>
              <p
                data-reveal-child
                className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
              >
                Manufacturing
              </p>
              <h2
                id="manufacturing-heading"
                data-reveal-child
                className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
              >
                From Material to Finished Product.
              </h2>
              <p
                data-reveal-child
                className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
              >
                Three industrial units in Kala Amb, Himachal Pradesh, house
                dedicated product-specific lines — from die casting and
                injection moulding to in-house tooling, thermostat
                manufacturing, finishing and auto-conveyorised assembly.
              </p>
              <div
                data-reveal-child
                className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start"
              >
                <Link href="/contact" className="btn-primary px-6 py-3 text-base">
                  Discuss Your Project
                </Link>
                <Link href="/oem-odm" className="btn-secondary px-6 py-3 text-base">
                  Explore Manufacturing
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              data-clip-reveal
              className="relative overflow-hidden rounded-sm border border-border"
            >
              <Image
                src="/images/factory/production-wide.jpg"
                alt="Production floor of the G.M. Consolidated industrial units, Kala Amb"
                width={926}
                height={359}
                data-parallax="16"
                className="aspect-[21/9] w-full object-cover"
              />
            </div>
            <p
              className="mt-3 text-sm font-medium text-foreground-secondary"
              data-reveal
            >
              Production floor, Kala Amb • One
              organisation, every step in-house
            </p>

            <dl
              className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4"
              data-reveal
              data-reveal-stagger
            >
              {CAPABILITY_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  data-reveal-child
                  className="bg-white px-6 py-6"
                >
                  <dt
                    data-count
                    data-count-to={metric.to}
                    data-count-prefix={metric.prefix}
                    data-count-suffix={metric.suffix}
                    className="text-xl font-semibold text-foreground sm:text-2xl"
                  >
                    {metric.prefix}
                    {metric.to}
                    {metric.suffix}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground-secondary">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div aria-hidden="true" data-grow="x" className="mt-16 h-px origin-left bg-border" />

        <div className="mt-6">
          <p
            className="text-sm font-semibold uppercase tracking-[0.14em] text-accent"
            data-reveal
          >
            The production line • Sec 01 – 09
          </p>
          <ol
            className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3 lg:grid-cols-9"
            data-reveal
            data-reveal-stagger
          >
            {PRODUCTION_LINE.map((step, index) => (
              <li
                key={step}
                data-reveal-child
                className="flex flex-col gap-1.5 bg-white px-4 py-5"
              >
                <span className="text-xs font-semibold tracking-wide text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}