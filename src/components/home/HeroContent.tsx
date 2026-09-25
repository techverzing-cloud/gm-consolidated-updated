import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "We build the products" },
  { text: "behind your brand.", accent: true },
];

const FACTS = [
  { value: "1983", label: "Established" },
  { value: "40+", label: "Years of manufacturing" },
  { value: "2", label: "Units in Kala Amb" },
  { value: "20+", label: "Brand partners" },
];

const TRUST_INDICATORS = [
  { icon: "lucide:calendar-check", label: "Since 1983" },
  { icon: "lucide:award", label: "ISO 9001:2015" },
  { icon: "lucide:shield-check", label: "BIS licensed lines" },
  { icon: "lucide:flask-conical", label: "In-house test lab" },
];

export function HeroContent() {
  return (
    <section
      id="hero-content"
      aria-labelledby="hero-content-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-navy-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 15% 0%, rgba(46,95,158,0.35), transparent 60%), radial-gradient(ellipse 60% 60% at 100% 100%, rgba(159,185,228,0.12), transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-white/15"
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7" data-reveal data-reveal-stagger>
            <p
              data-reveal-child
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-tint sm:text-xs"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent-tint"
              />
              OEM / ODM &middot; Home Appliance Manufacturer
            </p>

            <h1
              id="hero-content-heading"
              data-reveal-child
              className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl"
            >
              {HEADLINE.map((line) => (
                <span
                  key={line.text}
                  className={`block ${
                    line.accent ? "text-accent-tint" : "text-white"
                  }`}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            <p
              data-reveal-child
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-navy-muted sm:text-lg"
            >
              Dry irons, steam irons, storage geysers, fan heaters, hair dryers
              and rechargeable mosquito rackets &mdash; designed, tooled and
              built in-house across two ISO-certified manufacturing units in
              Kala Amb, Himachal Pradesh. OEM, ODM and private label, under your
              brand.
            </p>

            <div
              data-reveal-child
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact#enquiry"
                className="btn-navy-solid btn-pulse-hover px-7 py-3.5 text-sm sm:text-base"
              >
                Request Enquiry
                <Icon icon="lucide:arrow-right" size={16} />
              </Link>
              <Link
                href="/catalog"
                className="btn-navy-ghost px-7 py-3.5 text-sm sm:text-base"
              >
                Explore the Catalogue
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5" data-reveal>
            <div className="rounded-sm border border-white/15 bg-white/[0.04] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-tint">
                Manufacturing at a glance
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/10">
                {FACTS.map((fact) => (
                  <div key={fact.label} className="bg-navy-deep px-4 py-5">
                    <dt className="text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                      {fact.value}
                    </dt>
                    <dd className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-navy-muted">
                      {fact.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/manufacturing"
                className="link-underline mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-accent-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-tint"
              >
                Inside our manufacturing units
                <Icon icon="lucide:arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </div>

        <ul
          className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/12 pt-8"
          aria-label="Manufacturing credentials"
          data-reveal
        >
          {TRUST_INDICATORS.map((indicator) => (
            <li
              key={indicator.label}
              className="flex items-center gap-2 text-sm font-medium text-navy-muted"
            >
              <Icon
                icon={indicator.icon}
                size={17}
                className="shrink-0 text-accent-tint"
              />
              {indicator.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
