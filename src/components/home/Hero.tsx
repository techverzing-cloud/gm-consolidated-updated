"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  titleLines: string[];
  copy: string;
  meta: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const SLIDES: HeroSlide[] = [
  {
    id: "manufacturing-partner",
    image: "/images/hero-manufacturing.jpg",
    imageAlt:
      "Interior of a home appliance manufacturing facility with production machinery",
    eyebrow: "OEM / ODM • Home Appliance Manufacturer",
    titleLines: ["Your Partner in", "Home Appliance Manufacturing."],
    copy: "From product development to manufacturing and quality control, we build reliable home appliances for brands and businesses.",
    meta: "Engineering • Manufacturing • Quality",
    primary: { label: "Request Enquiry", href: "/contact" },
    secondary: { label: "Explore Catalogue", href: "/catalog" },
  },
  {
    id: "five-ranges",
    image: "/images/factory/plant-wide.jpg",
    imageAlt: "Wide view of the G.M. Consolidated manufacturing plant floor",
    eyebrow: "Five Engineered Ranges",
    titleLines: ["One Ecosystem,", "Five Engineered Ranges."],
    copy: "Every G.M. Consolidated product is designed, tooled and built in-house — across OEM, ODM and private-label programmes.",
    meta: "OEM • ODM • Private label",
    primary: { label: "Explore Catalogue", href: "/catalog" },
    secondary: { label: "Request Enquiry", href: "/contact" },
  },
  {
    id: "in-house-manufacturing",
    image: "/images/factory/production-wide.jpg",
    imageAlt: "Production line with workers assembling home appliances",
    eyebrow: "In-House Manufacturing",
    titleLines: ["Designed, Tooled", "and Built In-House."],
    copy: "From toolroom, press and moulding to assembly and testing, our facility keeps the entire process under one roof.",
    meta: "Tooling • Moulding • Assembly",
    primary: { label: "Request Enquiry", href: "/contact" },
    secondary: { label: "Explore Catalogue", href: "/catalog" },
  },
];

const AUTOPLAY_MS = 6000;

export function Hero() {
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
      const timeline = gsap.timeline();
      timeline
        .fromTo(
          "[data-slide-image]",
          { scale: 1.05 },
          { scale: 1, duration: 0.9, ease: "power2.out" },
          0,
        )
        .fromTo(
          "[data-slide-eyebrow]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.1,
        )
        .fromTo(
          "[data-slide-line]",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          },
          0.22,
        )
        .fromTo(
          "[data-slide-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.42,
        )
        .fromTo(
          "[data-slide-meta]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
          0.56,
        )
        .fromTo(
          "[data-slide-cta]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
          0.56,
        );
    }, scope);

    return () => ctx.revert();
  }, [active, reduced]);

  return (
    <section
      id="about"
      data-hero
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative isolate min-h-[560px] overflow-hidden bg-white sm:min-h-[600px] lg:min-h-[620px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
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
          <div
            data-slide-image
            className="absolute inset-x-0 -inset-y-10 overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60 lg:via-white/70 lg:to-transparent"
            aria-hidden="true"
          />

          <div className="relative mx-auto flex min-h-[560px] max-w-[1320px] items-center px-4 py-16 sm:min-h-[600px] sm:px-6 lg:min-h-[620px] lg:px-8">
            <div className="max-w-2xl">
              <p
                data-slide-eyebrow
                className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
              >
                {item.eyebrow}
              </p>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[56px]">
                {item.titleLines.map((line, lineIndex) => (
                  <span key={lineIndex} data-slide-line className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p
                data-slide-copy
                className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
              >
                {item.copy}
              </p>

              <p
                data-slide-meta
                className="mt-6 text-sm font-medium tracking-wide text-foreground-secondary"
              >
                {item.meta}
              </p>

              <div
                data-slide-cta
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link
                  href={item.primary.href}
                  className="btn-primary px-7 py-3.5 text-base"
                >
                  {item.primary.label}
                </Link>
                <Link
                  href={item.secondary.href}
                  className="btn-secondary px-7 py-3.5 text-base"
                >
                  {item.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="mx-auto flex max-w-[1320px] items-center justify-end gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <div
              aria-label="Choose slide"
              className="flex items-center gap-1.5"
            >
              {SLIDES.map((item, index) => (
                <button
                  key={index === active ? `${item.id}-active` : item.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => goTo(index)}
                  className={`relative h-[3px] origin-left cursor-pointer overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    index === active
                      ? "w-8 bg-foreground/10"
                      : "w-5 bg-foreground/15 hover:bg-foreground/30"
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
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border/80 bg-white/70 text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon icon="mdi:chevron-left" size={20} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border/80 bg-white/70 text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon icon="mdi:chevron-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
