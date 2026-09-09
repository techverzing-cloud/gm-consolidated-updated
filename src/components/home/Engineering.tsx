import { Icon } from "@/components/ui/Icon";

const PROCESS_STEPS = [
  {
    step: "01",
    icon: "mdi:lightbulb-outline",
    title: "Concept",
    text: "Design engineers translate complex client requirements into efficient, workable concepts — balancing function, aesthetics, ergonomics and economics.",
  },
  {
    step: "02",
    icon: "mdi:cube-outline",
    title: "3D Modelling",
    text: "Blueprints become complete 3D CAD models with the internal capability to transition directly into customised tooling structures.",
  },
  {
    step: "03",
    icon: "mdi:flask-outline",
    title: "Prototype",
    text: "3D-printed components create mock samples that validate each design — put under actual tests and conditions to simulate real performance.",
  },
  {
    step: "04",
    icon: "mdi:check-decagram-outline",
    title: "Validation",
    text: "Validation comes before any tooling activity — it is what gets products out first time right.",
  },
  {
    step: "05",
    icon: "mdi:wrench-outline",
    title: "Tooling",
    text: "A state-of-the-art tool room manufactures plastic injection moulds, die-casting moulds and press tools — repaired and maintained in-house.",
  },
  {
    step: "06",
    icon: "mdi:factory",
    title: "Production",
    text: "Dedicated product-specific lines for dry iron, steam iron, geyser, room heater, hair dryer and electric kettle run under one roof.",
  },
];

const CAPABILITIES = [
  "Pressure die casting",
  "Plastic injection moulding",
  "Press shop",
  "Tool room",
  "PTFE coating",
  "Thermostat manufacturing",
  "Heating elements",
  "Steam iron pump kits",
];

export function Engineering() {
  return (
    <section
      id="engineering"
      className="relative scroll-mt-20 overflow-hidden bg-white"
      aria-labelledby="engineering-heading"
    >
      <div
        aria-hidden="true"
        className="animate-spin-slow pointer-events-none absolute -right-24 top-8 hidden text-accent/[0.05] lg:block"
      >
        <Icon icon="mdi:cog-outline" size={300} />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          className="mx-auto max-w-2xl text-center"
          data-reveal
          data-reveal-stagger
        >
          <p
            data-reveal-child
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            Engineering &amp; Capabilities
          </p>
          <h2
            id="engineering-heading"
            data-reveal-child
            className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            From Concept to Commercial-Ready.
          </h2>
          <p
            data-reveal-child
            className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            Every stage of the journey — design, modelling, prototyping,
            validation, tooling and production — is managed in-house, so
            products get out first time right.
          </p>
        </div>

        <ol
          className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-6"
          data-engineering
        >
          {PROCESS_STEPS.map((item) => (
            <li
              key={item.step}
              data-eng-step
              className="flex flex-col gap-2 bg-white p-6"
            >
              <span
                data-eng-icon
                aria-hidden="true"
                className="mb-1 flex h-10 w-10 items-center justify-center rounded-sm border border-border text-accent"
              >
                <Icon icon={item.icon} size={22} />
              </span>
              <span className="text-sm font-semibold tracking-wide text-accent">
                {item.step}
              </span>
              <h3
                data-eng-title
                className="text-lg font-semibold text-foreground"
              >
                {item.title}
              </h3>
              <p
                data-eng-text
                className="mt-1 text-sm leading-relaxed text-foreground-secondary"
              >
                {item.text}
              </p>
              <span
                data-eng-line
                aria-hidden="true"
                className="mt-auto hidden h-0.5 w-full origin-left bg-accent/20 lg:block"
              />
            </li>
          ))}
        </ol>

        <div
          className="mt-12 rounded-sm border border-border bg-background-alt p-6 sm:p-8"
          data-reveal
          data-reveal-stagger
        >
          <p
            data-reveal-child
            className="text-sm font-semibold uppercase tracking-[0.14em] text-accent"
          >
            Core in-house capabilities
          </p>
          <ul
            data-reveal-child
            className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CAPABILITIES.map((capability) => (
              <li
                key={capability}
                className="flex items-center gap-3 text-[15px] font-medium text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}