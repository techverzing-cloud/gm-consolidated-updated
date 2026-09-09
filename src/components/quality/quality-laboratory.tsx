import Image from "next/image";
import type { QualityLaboratory } from "@/lib/quality";

export function Laboratory({
  section,
}: {
  section: QualityLaboratory;
}) {
  return (
    <section
      id="quality-laboratory"
      className="bg-white"
      aria-labelledby="quality-laboratory-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            data-quality-lab-image
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <div data-quality-parallax className="absolute -inset-y-8 inset-x-0">
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div data-quality-lab-content>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {section.eyebrow}
            </p>
            <h2
              id="quality-laboratory-title"
              className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {section.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}