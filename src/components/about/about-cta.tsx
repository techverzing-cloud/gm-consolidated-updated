import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { AboutClosingStatement } from "@/lib/about";

export function AboutCta({ closing }: { closing: AboutClosingStatement }) {
  return (
    <section
      id="about-cta"
      className="relative isolate overflow-hidden bg-navy"
      aria-labelledby="cta-title"
    >
      <div data-about-cta-media className="absolute inset-0">
        <div data-about-parallax className="absolute inset-0">
          <Image
            src={closing.image}
            alt={closing.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-navy/85" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div data-about-cta-content className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-tint">
            {closing.eyebrow}
          </p>
          <h2
            id="cta-title"
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