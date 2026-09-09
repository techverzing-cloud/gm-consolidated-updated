import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ManufacturingClosing } from "@/lib/manufacturing";

export function ClosingCta({ closing }: { closing: ManufacturingClosing }) {
  return (
    <section
      id="mfg-cta"
      className="relative isolate overflow-hidden bg-navy"
      aria-labelledby="mfg-cta-title"
    >
      <div data-mfg-cta-media className="absolute inset-0">
        <div data-mfg-parallax className="absolute inset-0">
          <Image
            src="/images/factory/pdc.webp"
            alt="Pressure die casting machines on the G.M. Consolidated factory floor"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-navy/85" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div data-mfg-cta-content className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-400">
            {closing.eyebrow}
          </p>
          <h2
            id="mfg-cta-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl"
          >
            {closing.title}
          </h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-navy-muted sm:text-lg">
            {closing.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={closing.primaryHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-tint sm:w-auto"
            >
              {closing.primaryLabel}
              <Icon icon="mdi:arrow-right" size={16} />
            </Link>
            <Link
              href={closing.secondaryHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-navy-border px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-tint sm:w-auto"
            >
              {closing.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}