"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const HERO = {
  eyebrow: "Five Engineered Ranges",
  titleLines: ["Our Catalogue.", "Five Engineered Ranges."],
  copy: "Garment care, water heating, heating and comfort, personal care and specialty electronics — every product designed, tooled and built in-house for OEM, ODM and private-label programmes.",
  meta: "OEM • ODM • Private label",
  primary: { label: "Explore Ranges", href: "/catalog/garment-care" },
  secondary: { label: "Request Enquiry", href: "/contact#enquiry" },
};

type Slide = {
  id: string;
  image: string;
  imageAlt: string;
};

const SLIDES: Slide[] = [
  {
    id: "catalogue-ranges",
    image: "/images/catalog-carousel/slide-1.jpg",
    imageAlt:
      "G.M. Consolidated product range showcase across garment care, water heating, heating and comfort, personal care and specialty electronics",
  },
  {
    id: "in-house-manufacturing",
    image: "/images/catalog-carousel/slide-2.jpg",
    imageAlt: "G.M. Consolidated home appliance product showcase",
  },
  {
    id: "engineered-ranges",
    image: "/images/catalog-carousel/slide-3.jpg",
    imageAlt: "G.M. Consolidated engineered range showcase",
  },
  {
    id: "product-showcase",
    image: "/images/catalog-carousel/slide-4.jpg",
    imageAlt: "G.M. Consolidated in-house product showcase",
  },
  {
    id: "range-highlight",
    image: "/images/catalog-carousel/slide-5.jpg",
    imageAlt: "G.M. Consolidated product range highlight",
  },
  {
    id: "appliance-showcase",
    image: "/images/catalog-carousel/slide-6.jpg",
    imageAlt: "G.M. Consolidated appliance showcase",
  },
  {
    id: "product-photography",
    image: "/images/catalog-carousel/slide-7.png",
    imageAlt: "G.M. Consolidated product photography showcase",
  },
  {
    id: "range-showcase",
    image: "/images/catalog-carousel/slide-8.jpg",
    imageAlt: "G.M. Consolidated range showcase",
  },
];

const AUTOPLAY_MS = 6000;

export function CatalogHero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActive((current) => (index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, reduced, paused, goTo]);

  useEffect(() => {
    const scope = slideRef.current;
    if (!scope) return;

    if (reduced) {
      gsap.set(scope, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(
        "[data-slide-image]",
        { scale: 1.05, scaleX: 1.05, duration: 0.9, ease: "power2.out" },
      );
    }, scope);

    return () => ctx.revert();
  }, [active, reduced]);

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

      <section
        aria-roledescription="carousel"
        aria-label="Featured highlights"
        className="bg-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="mx-auto max-w-[1320px] px-4 pb-14 pt-6 sm:px-6 sm:pb-20 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-2xl border border-border/60">
            {SLIDES.map((item, index) => (
              <div
                key={item.id}
                ref={index === active ? slideRef : undefined}
                data-slide-content
                className={`absolute inset-0 ${
                  index === active
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                } transition-opacity duration-700`}
                aria-hidden={index !== active}
              >
                <div data-slide-image className="absolute inset-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            ))}

            <div className="relative aspect-[17/9] w-full sm:aspect-[21/9] lg:aspect-[21/8]" />
          </div>

          <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border/80 bg-white text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon icon="mdi:chevron-left" size={20} />
            </button>

            <div aria-label="Choose slide" className="flex items-center justify-center gap-1.5">
              {SLIDES.map((item, index) => (
                <button
                  key={index === active ? `${item.id}-active` : item.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => goTo(index)}
                  className="group relative cursor-pointer p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span
                    className={`block origin-left rounded-full transition-all duration-300 ${
                      index === active
                        ? "h-[3px] w-8 bg-foreground/10"
                        : "h-[3px] w-5 bg-foreground/15 group-hover:bg-foreground/30"
                    }`}
                  >
                    {index === active && (
                      <span
                        className="carousel-rail-fill block h-full w-full origin-left rounded-full bg-accent"
                        style={{
                          animationDuration: `${AUTOPLAY_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border/80 bg-white text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon icon="mdi:chevron-right" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}