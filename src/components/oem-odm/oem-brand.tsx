import { Icon } from "@/components/ui/Icon";
import type { OemOdmBrandProcess } from "@/lib/oem-odm";

export function BrandProcess({
  section,
}: {
  section: OemOdmBrandProcess;
}) {
  return (
    <section
      id="odm-brand"
      className="bg-white"
      aria-labelledby="odm-brand-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {section.eyebrow}
        </p>

        <p
          id="odm-brand-title"
          className="mt-8 text-balance text-center text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-6xl"
        >
          {section.words.map((word, index) => {
            const isLast = index === section.words.length - 1;
            return (
              <span key={word} className="whitespace-nowrap">
                <span
                  data-odm-brand-word
                  className={
                    isLast ? "text-accent" : "text-foreground"
                  }
                >
                  {word}
                </span>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="mx-2 inline-flex text-accent sm:mx-4"
                  >
                    <Icon icon="mdi:arrow-right" size={22} className="shrink-0" />
                  </span>
                )}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}