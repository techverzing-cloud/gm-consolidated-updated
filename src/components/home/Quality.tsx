import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

const CHECKPOINTS = [
  {
    step: "01",
    title: "Incoming material inspection",
    text: "All incoming raw materials are inspected before they enter the production flow.",
  },
  {
    step: "02",
    title: "In-process checkpoints",
    text: "Testing procedures at various stages of product flow maintain and upgrade quality at every process.",
  },
  {
    step: "03",
    title: "Electrical type tests",
    text: "An in-house laboratory, functioning as per BIS requirements, conducts tests for endurance, resistance and conductivity.",
  },
  {
    step: "04",
    title: "Assembly line checks",
    text: "Every sub-assembly is validated as the line builds the finished product.",
  },
  {
    step: "05",
    title: "Routine test",
    text: "Every single finished product is checked on a routine test line before packaging.",
  },
  {
    step: "06",
    title: "Packing & release",
    text: "Multi-stage safety and functional inspections guarantee reliable, commercial-ready units.",
  },
];

const TRUST_INDICATORS = [
  {
    icon: "mdi:check-decagram-outline",
    label: "ISO 9001:2015",
    text: "Group facilities certified to the ISO 9001:2015 quality-management standard.",
  },
  {
    icon: "mdi:shield-check-outline",
    label: "BIS licensed",
    text: "Product lines carry BIS licensing, manufactured to the applicable Indian Standards.",
  },
  {
    icon: "mdi:test-tube",
    label: "In-house test laboratory",
    text: "A BIS-based laboratory conducts electrical type tests in-house.",
  },
];

export function Quality() {
  return (
    <section
      id="quality"
      className="scroll-mt-20 bg-background-alt"
      aria-labelledby="quality-heading"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-reveal>
            <div
              data-clip-reveal
              className="relative overflow-hidden rounded-sm border border-border"
            >
              <Image
                src="/images/factory/testing.webp"
                alt="Electrical routine testing line at the G.M. Consolidated factory, Kala Amb"
                width={391}
                height={285}
                data-parallax="14"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground-secondary">
              Routine test line — Kala Amb • Seven
              checkpoints, one released product
            </p>
          </div>

          <div>
            <div data-reveal data-reveal-stagger>
              <p
                data-reveal-child
                className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
              >
                Quality Assurance
              </p>
              <h2
                id="quality-heading"
                data-reveal-child
                className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
              >
                Every Unit Is Tested. Not Just Sampled.
              </h2>
              <p
                data-reveal-child
                className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
              >
                Quality is engineered into the flow, not inspected onto the end.
                Checkpoints run at every stage — and every single finished
                product is routine-tested before it is packed.
              </p>
            </div>

            <ol
              className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2"
              data-quality-list
            >
              {CHECKPOINTS.map((item) => (
                <li key={item.step} data-quality-item className="flex gap-3">
                  <span
                    data-check
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white"
                  >
                    <Icon icon="mdi:check-bold" size={14} />
                  </span>
                  <div data-check-text>
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
          {TRUST_INDICATORS.map((indicator) => (
            <li
              key={indicator.label}
              data-reveal-pop
              className="group bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-accent transition-transform duration-300 group-hover:-rotate-6"
              >
                <Icon icon={indicator.icon} size={20} />
              </span>
              <p className="mt-4 text-sm font-semibold text-accent">
                {indicator.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {indicator.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}