import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ContactHero as ContactHeroContent } from "@/lib/content";

export function ContactHero({ hero }: { hero: ContactHeroContent }) {
  return (
    <section
      className="relative isolate overflow-hidden bg-white"
      aria-labelledby="contact-hero-title"
    >
      <div
        data-contact-hero-image
        className="absolute inset-x-0 -inset-y-10 overflow-hidden"
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60 lg:via-white/70 lg:to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[540px] max-w-[1320px] items-center px-4 py-20 sm:min-h-[580px] sm:px-6 lg:min-h-[620px] lg:px-8">
        <div className="max-w-2xl">
          <p
            data-contact-hero-eyebrow
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {hero.eyebrow}
          </p>

          <h1
            id="contact-hero-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[56px]"
          >
            {hero.title}
          </h1>

          <p
            data-contact-hero-copy
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            {hero.description}
          </p>

          <div
            data-contact-hero-ctas
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href={hero.primaryHref} className="btn-primary px-7 py-3.5 text-base">
              {hero.primaryLabel}
              <Icon icon="mdi:arrow-right" size={20} />
            </Link>
            <Link
              href={hero.secondaryHref}
              className="btn-secondary px-7 py-3.5 text-base"
            >
              {hero.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}