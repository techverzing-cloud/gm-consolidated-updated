import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ContactCta as ContactCtaContent } from "@/lib/content";

const BUTTON_STYLES: Record<string, string> = {
  "navy-solid": "btn-navy-solid",
  "navy-ghost": "btn-navy-ghost",
};

export function ContactCta({ cta }: { cta: ContactCtaContent }) {
  return (
    <section
      id="contact-cta"
      className="relative isolate overflow-hidden bg-navy"
      aria-labelledby="contact-cta-title"
    >
      <div data-cta-media className="absolute inset-0 -inset-y-8 overflow-hidden">
        <Image
          src={cta.image}
          alt={cta.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-navy/85" aria-hidden="true" />

      <div
        data-cta-content
        className="relative mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-tint">
            {cta.eyebrow}
          </p>
          <h2
            id="contact-cta-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
          >
            {cta.title}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-navy-muted sm:text-lg">
            {cta.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={cta.primaryHref}
              className={`${BUTTON_STYLES[cta.primaryVariant]} px-7 py-3.5 text-base`}
            >
              {cta.primaryLabel}
              <Icon icon="mdi:arrow-right" size={20} />
            </Link>
            <Link
              href={cta.secondaryHref}
              className={`${BUTTON_STYLES[cta.secondaryVariant]} px-7 py-3.5 text-base`}
            >
              {cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}