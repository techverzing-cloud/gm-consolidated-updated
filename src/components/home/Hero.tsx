"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/animations";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type HeroSlide = {
  name: string;
  fallback: string;
  position: string;
};

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "We build" },
  { text: "the products" },
  { text: "behind", accent: true },
  { text: "your brand." },
];

const TRUST_INDICATORS = [
  { icon: "lucide:calendar-check", label: "Since 1983" },
  { icon: "lucide:award", label: "ISO 9001:2015" },
  { icon: "lucide:shield-check", label: "BIS Licensed" },
];

const HERO_SLIDES: HeroSlide[] = [
  {
    name: "hero-1",
    fallback: "/hero/allproducts.jpeg",
    position: "object-center",
  },
  {
    name: "hero-2",
    fallback: "/hero/badminton.jpeg",
    position: "object-center",
  },
  {
    name: "hero-3",
    fallback: "/hero/geyser.jpeg",
    position: "object-center",
  },
  {
    name: "hero-4",
    fallback: "/hero/hair_.jpeg",
    position: "object-center",
  },
  {
    name: "hero-5",
    fallback: "/images/hero-factory.jpg",
    position: "object-center",
  },
];

const CANDIDATE_EXTENSIONS = ["webp", "jpg", "jpeg", "png"] as const;
const DISPLAY_MS = 3000;
const TRANSITION_MS = 900;
const CYCLE_MS = DISPLAY_MS + TRANSITION_MS;

function probeHeroImage(name: string, fallback: string): Promise<string> {
  const base = `/hero/${name}`;
  return new Promise((resolve) => {
    let tried = 0;
    const tryNext = () => {
      if (tried >= CANDIDATE_EXTENSIONS.length) {
        resolve(fallback);
        return;
      }
      const url = `${base}.${CANDIDATE_EXTENSIONS[tried]}`;
      tried += 1;
      const img = document.createElement("img");
      img.onload = () => resolve(url);
      img.onerror = () => tryNext();
      img.src = url;
    };
    tryNext();
  });
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [sources, setSources] = useState<string[]>(() =>
    HERO_SLIDES.map((slide) => slide.fallback),
  );
  const scopeRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      HERO_SLIDES.map((slide) => probeHeroImage(slide.name, slide.fallback)),
    ).then((urls) => {
      if (!cancelled) setSources(urls);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let timeout: number;
    const tick = () => {
      timeout = window.setTimeout(() => {
        setActive((index) => (index + 1) % HERO_SLIDES.length);
        tick();
      }, CYCLE_MS);
    };
    tick();
    return () => window.clearTimeout(timeout);
  }, []);

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
          "[data-hero-bg]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.7 },
          0,
        )
        .fromTo(
          "[data-hero-eyebrow]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.06,
        )
        .fromTo(
          "[data-hero-line]",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09 },
          0.12,
        )
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.34,
        )
        .fromTo(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          0.42,
        )
        .fromTo(
          "[data-hero-trust]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          0.48,
        );

      const first = scope.querySelector<HTMLElement>('[data-hero-slide="0"]');
      if (first) {
        gsap.fromTo(
          first,
          { scale: 1.03 },
          { scale: 1, duration: DISPLAY_MS / 1000, ease: "none" },
        );
      }
    }, scope);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const slides = Array.from(
      scope.querySelectorAll<HTMLElement>("[data-hero-slide]"),
    );
    if (slides.length !== HERO_SLIDES.length) return;

    const prev = activeRef.current;
    activeRef.current = active;
    if (prev === active) return;

    const outgoing = slides[prev];
    const incoming = slides[active];

    if (reduced) {
      gsap.fromTo(
        incoming,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.7, ease: "power1.out" },
      );
      gsap.to(outgoing, { autoAlpha: 0, duration: 0.7, ease: "power1.out" });
      return;
    }

    const revealSeconds = TRANSITION_MS / 1000;

    const edge = incoming.querySelector<HTMLElement>("[data-hero-edge]");

    gsap.set(incoming, {
      visibility: "visible",
      opacity: 1,
      clipPath: "inset(0 100% 0 0)",
      scale: 1.04,
      zIndex: 5,
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to(
      incoming,
      { clipPath: "inset(0 0% 0 0)", duration: revealSeconds },
      0,
    )
      .to(incoming, { scale: 1, duration: revealSeconds }, 0);
    if (edge) {
      tl.fromTo(
        edge,
        { opacity: 0 },
        { opacity: 1, duration: revealSeconds * 0.22, ease: "power2.out" },
        0,
      ).to(
        edge,
        { opacity: 0, duration: revealSeconds * 0.5, ease: "power2.inOut" },
        revealSeconds * 0.42,
      );
    }
    tl.set(outgoing, { autoAlpha: 0 }, revealSeconds + 0.02).set(
      incoming,
      { zIndex: 1 },
      revealSeconds + 0.02,
    );
  }, [active, reduced]);

  return (
    <section
      ref={scopeRef}
      data-hero
      aria-label="G.M. Consolidated home appliance manufacturer"
      className="relative isolate flex min-h-[calc(100dvh_-_4.5rem)] items-center overflow-hidden border-b border-white/10 bg-navy-deep"
    >
      <div
        data-hero-bg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.name}
            data-hero-slide={index}
            className={`absolute inset-0 will-change-transform ${
              index === 0 ? "" : "invisible opacity-0"
            }`}
          >
            <Image
              src={sources[index]}
              alt=""
              fill
              sizes="100vw"
              quality={80}
              priority={index === 0}
              loading={index <= 1 ? "eager" : "lazy"}
              className={`object-cover ${slide.position}`}
            />
            <span
              data-hero-edge
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[56px] opacity-0 motion-reduce:hidden md:w-[84px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-navy-deep/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-navy-deep/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 36%, transparent 55%, rgba(6,23,51,0.45) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(3,12,30,0.92) 0%, rgba(3,12,30,0.68) 26%, rgba(3,12,30,0.3) 52%, rgba(3,12,30,0) 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,12,30,0.84) 0%, rgba(3,12,30,0.55) 55%, rgba(3,12,30,0.22) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(24px,5vw,100px)]">
        <div className="max-w-[640px]">
          {/* <p
            data-hero-eyebrow
            className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm sm:text-xs"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent-tint motion-safe:animate-pulse"
              aria-hidden="true"
            />
            OEM / ODM · Home Appliance Manufacturer
          </p> */}

          {/* <h1
            className="mt-8 text-[clamp(2.5rem,10vw,3.5rem)] font-bold uppercase leading-[1.03] tracking-[-0.03em] text-white [text-shadow:0_1px_2px_rgba(3,12,30,0.4),0_10px_40px_rgba(3,12,30,0.5)] sm:text-[clamp(2.75rem,8vw,4rem)] lg:text-[clamp(3.25rem,5.6vw,5.25rem)]"
          >
            {HEADLINE.map((line) => (
              <span
                key={line.text}
                data-hero-line
                className={`block ${
                  line.accent ? "text-accent-tint" : "text-white"
                }`}
              >
                {line.text}
              </span>
            ))}
          </h1> */}

          {/* <p
            data-hero-copy
            className="mt-8 max-w-[560px] text-pretty text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl"
          >
            Designed, tooled and built in-house for brands that demand
            dependable manufacturing. OEM, ODM and private-label production
            across two ISO-certified units in Kala Amb.
          </p> */}

          {/* <div
            data-hero-cta
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/contact#enquiry"
              className="btn-primary group px-7 py-3.5 text-sm sm:text-base"
            >
              Request Enquiry
              <Icon
                icon="lucide:arrow-right"
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/catalog"
              className="btn-secondary px-7 py-3.5 text-sm sm:text-base"
            >
              Explore Catalogue
            </Link>
          </div> */}

          {/* <ul
            data-hero-trust
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6"
            aria-label="Manufacturing credentials"
          >
            {TRUST_INDICATORS.map((indicator) => (
              <li
                key={indicator.label}
                className="flex items-center gap-2 text-sm font-semibold text-white/85"
              >
                <Icon
                  icon={indicator.icon}
                  size={15}
                  className="shrink-0 text-accent-tint"
                />
                {indicator.label}
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-8 bg-gradient-to-t from-background-alt/70 to-transparent"
      />
    </section>
  );
}