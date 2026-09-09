import { Icon } from "@/components/ui/Icon";
import type { OemOdmAudience } from "@/lib/oem-odm";

export function Audience({ audience }: { audience: OemOdmAudience }) {
  return (
    <section className="bg-navy" aria-labelledby="odm-audience-title">
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-tint">
            {audience.eyebrow}
          </p>
          <h2
            id="odm-audience-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-white sm:text-4xl"
          >
            {audience.title}
          </h2>
        </header>

        <ul
          data-odm-audience
          className="mt-12 flex max-w-3xl flex-wrap gap-3"
        >
          {audience.items.map((item) => (
            <li
              key={item}
              data-odm-audience-item
              className="flex items-center gap-2.5 rounded-full border border-navy-border bg-white/5 py-2.5 pl-4 pr-5"
            >
              <Icon icon="mdi:check" size={16} className="text-accent-tint" />
              <span className="text-sm font-medium text-white">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}