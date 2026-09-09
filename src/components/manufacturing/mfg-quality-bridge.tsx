import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ManufacturingQualityBridge } from "@/lib/manufacturing";

export function QualityBridge({ bridge }: { bridge: ManufacturingQualityBridge }) {
  return (
    <section
      id="mfg-quality"
      className="bg-background-alt"
      aria-labelledby="quality-bridge-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div
          data-mfg-quality
          className="flex flex-col gap-8 rounded-sm border border-border bg-white px-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-12"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {bridge.eyebrow}
            </p>
            <h2
              id="quality-bridge-title"
              className="mt-4 text-balance text-2xl font-semibold leading-[1.15] text-foreground sm:text-3xl"
            >
              {bridge.title}
            </h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-foreground-secondary">
              {bridge.text}
            </p>
          </div>

          <Link
            href={bridge.ctaHref}
            className="group inline-flex shrink-0 items-center gap-2 rounded-sm bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
          >
            {bridge.ctaLabel}
            <Icon
              icon="mdi:arrow-right"
              size={16}
              className="text-accent-tint transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}