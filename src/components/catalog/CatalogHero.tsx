"use client";

import Link from "next/link";
import { CatalogCarousel } from "@/components/catalog/CatalogCarousel";

const HERO = {
  eyebrow: "Five Engineered Ranges",
  titleLines: ["Our Catalogue.", "Five Engineered Ranges."],
  copy: "Garment care, water heating, heating and comfort, personal care and specialty electronics - every product designed, tooled and built in-house for OEM, ODM and private-label programmes.",
  meta: "OEM • ODM • Private label",
  primary: { label: "Explore Ranges", href: "/catalog/garment-care" },
  secondary: { label: "Request Enquiry", href: "/contact#enquiry" },
};

export function CatalogHero() {
  return (
    <div>
      <section data-hero aria-label="Catalogue introduction" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 pb-2 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {HERO.eyebrow}
          </p>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
            {HERO.titleLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {HERO.copy}
          </p>

          <p className="mt-6 text-sm font-medium tracking-wide text-foreground-secondary">
            {HERO.meta}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={HERO.primary.href} className="btn-primary px-7 py-3.5 text-base">
              {HERO.primary.label}
            </Link>
            <Link href={HERO.secondary.href} className="btn-secondary px-7 py-3.5 text-base">
              {HERO.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      <section aria-roledescription="carousel" aria-label="Featured highlights" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 pb-14 pt-6 sm:px-6 sm:pb-20 lg:px-8">
          <CatalogCarousel />
        </div>
      </section>
    </div>
  );
}