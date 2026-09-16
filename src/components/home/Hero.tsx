"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type HeroRange = {
  number: string;
  name: string;
  label: string;
  tag: string;
  image: string;
  imageAlt: string;
  href: string;
};

const RANGES: HeroRange[] = [
  {
    number: "01",
    name: "Garment Care",
    label: "Garment Care",
    tag: "Ironing systems",
    image: "/images/products/garment-care/gm28.jpg",
    imageAlt: "G.M. Consolidated dry iron from the Garment Care range",
    href: "/catalog/garment-care",
  },
  {
    number: "02",
    name: "Water Heating",
    label: "Water Heating",
    tag: "Storage geysers",
    image: "/images/products/water-heating/gm41.jpg",
    imageAlt: "G.M. Consolidated storage geyser from the Water Heating range",
    href: "/catalog/water-heating",
  },
  {
    number: "03",
    name: "Heating / Comfort",
    label: "Heating",
    tag: "Fan heaters",
    image: "/images/products/heating/gm52.jpg",
    imageAlt: "G.M. Consolidated fan heater from the Heating / Comfort range",
    href: "/catalog/heating-comfort",
  },
  {
    number: "04",
    name: "Personal Care",
    label: "Personal Care",
    tag: "Hair dryers",
    image: "/images/products/personal-care/gm56.jpg",
    imageAlt: "G.M. Consolidated hair dryer from the Personal Care range",
    href: "/catalog/personal-care",
  },
  {
    number: "05",
    name: "Specialty Electronics",
    label: "Specialty",
    tag: "Mosquito rackets",
    image: "/images/products/specialty/gm57.png",
    imageAlt: "G.M. Consolidated mosquito racket from the Specialty Electronics range",
    href: "/catalog/specialty",
  },
];

const TRUST_INDICATORS = [
  { icon: "mdi:calendar-check-outline", label: "Since 1983" },
  { icon: "mdi:certificate-outline", label: "ISO 9001:2015" },
  { icon: "mdi:shield-check-outline", label: "BIS licensed" },
  { icon: "mdi:clipboard-check-outline", label: "100% routine-tested" },
];

const AUTOPLAY_MS = 6000;

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const scopeRef = useRef<HTMLElement>(null);
  const mountedRef = useRef(false);
  const range = RANGES[active];

  const goTo = useCallback((index: number) => {
    setActive((current) => (index + RANGES.length) % RANGES.length);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, reduced, paused, goTo]);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    if (reduced) {
      gsap.set(scope, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-eyebrow]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0,
        )
        .fromTo(
          "[data-hero-line]",
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          0.1,
        )
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.3,
        )
        .fromTo(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.44,
        )
        .fromTo(
          "[data-hero-trust]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.52,
        )
        .fromTo(
          "[data-hero-stage]",
          { autoAlpha: 0, y: 48, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
          0.4,
        )
        .fromTo(
          "[data-hero-dock]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.62,
        );
    }, scope);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-stage-media]",
        { autoAlpha: 0, y: 28, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" },
      );
      gsap.fromTo(
        "[data-stage-label]",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
      );
      gsap.fromTo(
        "[data-stage-ghost]",
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }, scope);

    return () => ctx.revert();
  }, [active, reduced]);

  return (
    <section
      ref={scopeRef}
      data-hero
      aria-label="G.M. Consolidated home appliance manufacturer"
      className="relative isolate overflow-hidden bg-navy"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[15%] -top-40 h-[420px] w-[560px] rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -bottom-[30%] right-[-8%] h-[400px] w-[540px] rounded-full bg-accent-tint/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p
              data-hero-eyebrow
              className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-tint"
            >
              OEM / ODM · Home Appliance Manufacturer
            </p>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {["We build the products", "behind your brand."].map(
                (line, lineIndex) => (
                  <span key={lineIndex} data-hero-line className="block">
                    {line}
                  </span>
                ),
              )}
            </h1>

            <p
              data-hero-copy
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-navy-muted sm:text-lg"
            >
              Dry irons, steam irons, storage geysers, fan heaters, hair dryers
              and electric kettles - designed, tooled and built in-house across
              two ISO-certified industrial units in Kala Amb. OEM, ODM and
              private label, under your brand.
            </p>

            <div
              data-hero-cta
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact#enquiry"
                className="btn-navy-solid btn-pulse-hover px-7 py-3.5 text-base"
              >
                Request Enquiry
              </Link>
              <Link
                href="/catalog"
                className="btn-navy-ghost px-7 py-3.5 text-base"
              >
                Explore the Catalogue
              </Link>
            </div>

            <ul
              data-hero-trust
              className="mt-9 flex flex-wrap gap-x-7 gap-y-3"
              aria-label="Manufacturing credentials"
            >
              {TRUST_INDICATORS.map((indicator) => (
                <li
                  key={indicator.label}
                  className="flex items-center gap-2 text-sm font-medium text-navy-muted"
                >
                  <Icon
                    icon={indicator.icon}
                    size={18}
                    className="shrink-0 text-accent-tint"
                  />
                  {indicator.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div
              data-hero-stage
              className="relative mx-auto w-full max-w-xl sm:max-w-2xl"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50 blur-3xl sm:h-96 sm:w-96"
              />

              <span
                data-stage-ghost
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none whitespace-nowrap text-[8rem] font-bold leading-none tracking-tight text-white/6 sm:text-[11rem] lg:text-[12rem]"
              >
                {range.number}
              </span>

              <div className="relative z-10 overflow-hidden rounded-sm border border-white/25 bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]">
                <div className="flex items-center justify-between border-b border-border-light px-5 py-3.5 sm:px-7">
                  <span
                    data-stage-label
                    className="text-sm font-semibold tabular-nums text-accent"
                  >
                    {range.number} · {range.name}
                  </span>
                  <span
                    data-stage-label
                    className="text-xs font-medium text-foreground-secondary"
                  >
                    {range.tag}
                  </span>
                </div>

                <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-background-alt/70 to-white sm:aspect-[16/11]">
                  <div className="absolute inset-0 p-6 sm:p-10">
                    <Image
                      key={range.number}
                      src={range.image}
                      alt={range.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 92vw, 560px"
                      data-stage-media
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border-light px-5 py-3.5 sm:px-7">
                  <span className="text-xs font-medium text-foreground-secondary">
                    Designed · Tooled · Built in-house
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    G.M. Consolidated
                  </span>
                </div>
              </div>
            </div>

            <div
              data-hero-dock
              className="relative mx-auto mt-8 w-full max-w-xl sm:max-w-2xl"
            >
              <div
                aria-label="Product ranges"
                className="grid grid-cols-5 gap-2 sm:gap-3"
              >
                {RANGES.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      aria-label={`${item.name} range`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goTo(index)}
                      className={`relative flex cursor-pointer flex-col items-start gap-1 overflow-hidden rounded-sm border px-2.5 py-2.5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-tint sm:px-3 ${
                        isActive
                          ? "border-accent-tint/50 bg-white/10 text-white"
                          : "border-white/15 text-navy-muted hover:border-white/30 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className={`text-[11px] font-semibold tabular-nums tracking-wide ${
                          isActive ? "text-accent-tint" : "text-navy-muted"
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="text-xs font-medium leading-tight sm:text-sm">
                        {item.label}
                      </span>
                      {isActive && (
                        <span
                          className="carousel-rail-fill absolute inset-x-0 bottom-0 h-0.5 bg-accent-tint"
                          style={{
                            animationDuration: `${AUTOPLAY_MS}ms`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href={range.href}
                  className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-accent-tint transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-tint"
                >
                  Explore the {range.name} range
                  <Icon icon="mdi:arrow-right" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}