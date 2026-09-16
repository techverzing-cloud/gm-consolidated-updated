"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export interface CatalogSlide {
  id: string;
  image: string;
  imageAlt: string;
}

export const CATALOG_SLIDES: CatalogSlide[] = [
  {
    id: "catalogue-ranges",
    image: "/images/catalog-carousel/slide-1.jpg",
    imageAlt:
      "G.M. Consolidated product range showcase across garment care, water heating, heating and comfort, personal care and specialty electronics",
  },
  {
    id: "in-house-manufacturing",
    image: "/images/catalog-carousel/slide-4.jpg",
    imageAlt: "G.M. Consolidated home appliance product showcase",
  },
  {
    id: "engineered-ranges",
    image: "/images/catalog-carousel/slide-7.png",
    imageAlt: "G.M. Consolidated engineered range showcase",
  },
];

const AUTOPLAY_MS = 6000;

export function CatalogCarousel({
  slides = CATALOG_SLIDES,
}: {
  slides?: CatalogSlide[];
}) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActive((current) => (index + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, reduced, goTo]);

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
    <>
      <div className="relative isolate overflow-hidden rounded-2xl border border-border/60">
        {slides.map((item, index) => (
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
            <Link
              href="/catalog"
              tabIndex={index === active ? 0 : -1}
              className="block h-full w-full"
              aria-label="Explore the full catalogue"
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
            </Link>
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
          {slides.map((item, index) => (
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
    </>
  );
}