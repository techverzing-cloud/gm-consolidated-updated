import Image from "next/image";
import type { QualityHero as QualityHeroContent } from "@/lib/quality";

export function QualityHero({ hero }: { hero: QualityHeroContent }) {
  return (
    <section
      className="relative isolate overflow-hidden bg-white"
      aria-labelledby="quality-hero-title"
    >
      <div
        data-quality-parallax
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
            data-quality-hero-eyebrow
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {hero.eyebrow}
          </p>

          <h1
            id="quality-hero-title"
            data-quality-hero-title
            className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[56px]"
          >
            {hero.title}
          </h1>

          <p
            data-quality-hero-copy
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}