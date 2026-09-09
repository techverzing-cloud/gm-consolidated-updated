import { Icon } from "@/components/ui/Icon";
import type { AboutSubSection } from "@/lib/about";

export function CapabilitiesSection({
  capabilities,
}: {
  capabilities: AboutSubSection & {
    capabilities: Array<{ number: string; title: string; description: string; icon: string }>;
  };
}) {
  return (
    <section
      id="about-capabilities"
      className="bg-background-alt"
      aria-labelledby="capabilities-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {capabilities.eyebrow}
            </p>
            <h2
              id="capabilities-title"
              className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
            >
              {capabilities.title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {capabilities.description}
            </p>

            <ul className="mt-9 border-t border-border">
              {capabilities.capabilities.map((capability) => (
                <li
                  key={capability.title}
                  data-about-capability
                  className="group flex items-center gap-5 border-b border-border py-6 transition-colors duration-300 hover:bg-white/70 sm:gap-7"
                >
                  <span
                    data-about-capability-icon
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-white text-accent transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
                  >
                    <Icon icon={capability.icon} size={20} />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-foreground-secondary">
                    {capability.number}
                  </span>
                  <span className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {capability.title}
                    </h3>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-foreground-secondary sm:text-base">
                      {capability.description}
                    </p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}