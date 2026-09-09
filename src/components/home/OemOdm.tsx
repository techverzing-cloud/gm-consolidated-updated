import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const ENGAGEMENT_MODELS = [
  {
    icon: "mdi:wrench-outline",
    title: "OEM",
    tagline: "Manufacture to specification",
    text: "Bring the specification — the in-house system runs it: die casting, moulding, press work, coating, thermostat manufacturing and auto-conveyorised assembly. Every unit routine-tested.",
  },
  {
    icon: "mdi:pencil-ruler",
    title: "ODM",
    tagline: "Designed & manufactured",
    text: "Bring the requirement — design engineers take it through concept, 3D CAD and prototype, validating it before any tooling activity.",
  },
  {
    icon: "mdi:package-variant-closed",
    title: "Private label",
    tagline: "Your brand, our system",
    text: "An existing catalogue model — or one developed to your requirement — built under your brand with the same engineering and testing discipline.",
  },
  {
    icon: "mdi:truck-fast",
    title: "Bulk requirements",
    tagline: "Existing models, in volume",
    text: "Source the catalogue range at volume for distribution and retail — every unit built to the same standard and routine-tested before packing.",
  },
];

const PARTNERSHIP_JOURNEY = [
  "Brief",
  "Concept",
  "CAD",
  "Prototype",
  "Testing",
  "Moulds & tools",
  "Production",
  "Inspection",
  "Packing & release",
];

export function OemOdm() {
  return (
    <section
      id="oem-odm"
      className="scroll-mt-20 bg-white"
      aria-labelledby="oem-odm-heading"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          className="mx-auto max-w-2xl text-center"
          data-reveal
          data-reveal-stagger
        >
          <p
            data-reveal-child
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            OEM / ODM
          </p>
          <h2
            id="oem-odm-heading"
            data-reveal-child
            className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            From Brief to Your Brand.
          </h2>
          <p
            data-reveal-child
            className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            Appliance design, engineering and manufacturing for OEM, ODM and
            product-development programmes — two industrial units operating
            as one organisation since 1983.
          </p>
        </div>

        <div
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal
          data-reveal-stagger
        >
          {ENGAGEMENT_MODELS.map((model) => (
            <article
              key={model.title}
              data-reveal-child
              className="rounded-sm border border-border bg-background-alt p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-white text-accent"
              >
                <Icon icon={model.icon} size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {model.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent">
                {model.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {model.text}
              </p>
            </article>
          ))}
        </div>

        <div
          aria-hidden="true"
          data-grow="x"
          className="mt-16 h-px origin-left bg-border"
        />

        <div className="mt-6">
          <p
            className="text-sm font-semibold uppercase tracking-[0.14em] text-accent"
            data-reveal
          >
            Every programme runs the same journey
          </p>
          <ol
            className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-9 lg:gap-x-4"
            data-reveal
            data-reveal-stagger
          >
            {PARTNERSHIP_JOURNEY.map((stage, index) => (
              <li
                key={stage}
                data-reveal-child
                className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold text-accent">
                  {index + 1}
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">
                  {stage}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="mt-16 flex flex-col items-start gap-8 rounded-sm bg-accent px-8 py-10 sm:px-12 lg:flex-row lg:items-center lg:justify-between"
          data-reveal
        >
          <div>
            <h3 className="text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Have a product requirement?
              <br />
              Bring us the brief.
            </h3>
            <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/80">
              Share a requirement — we will come back with engineering
              perspective, capability fit and next steps. No middlemen, no
              layers.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-navy-solid btn-pulse-hover px-6 py-3 text-base"
            >
              Discuss Your Requirement
            </Link>
            <Link
              href="/catalog"
              className="btn-navy-ghost px-6 py-3 text-base"
            >
              Explore Catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}