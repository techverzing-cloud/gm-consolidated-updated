"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type HeroSlide = {
  name: string;
  fallback: string;
  position: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    name: "hero-1",
    fallback: "/hero/all_prod.jpeg",
    position: "object-center",
  },
  {
    name: "hero-2",
    fallback: "/hero/bat_1.jpeg",
    position: "object-center",
  },
  {
    name: "hero-3",
    fallback: "/hero/geyser.jpeg",
    position: "object-center",
  },
  {
    name: "hero-4",
    fallback: "/hero/hdryer.jpeg",
    position: "object-center",
  },
  {
    name: "hero-5",
    fallback: "/hero/Iron_1.jpeg",
    position: "object-center",
  },
    {
    name: "hero-6",
    fallback: "/hero/hdryer_2.jpeg",
    position: "object-center",
  },
      {
    name: "hero-7",
    fallback: "/hero/Iron_2.jpeg",
    position: "object-center",
  },
      {
    name: "hero-8",
    fallback: "/hero/heater.jpeg",
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
      gsap.fromTo(
        "[data-hero-bg]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.7, ease: "power3.out" },
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
      className="relative isolate flex min-h-[calc(100dvh_-_4.5rem)] items-center overflow-hidden  border-white/10 bg-navy-deep"
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
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 36%, transparent 55%, rgba(6,23,51,0.45) 100%)",
        }}
      />
    </section>
  );
}
