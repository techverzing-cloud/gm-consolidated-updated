"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HEADLINE = [
  { text: "Built for Brands.", tint: false },
  { text: "Engineered to Scale.", tint: true },
] as const;

const SUPPORT =
  "From product development and tooling to precision manufacturing and assembly, we help brands bring home appliances to market through our manufacturing units in Kala Amb, Himachal Pradesh.";

// Hero carousel — drop image files in public/home/hero and list them here to update the hero.
const HERO_PRODUCTS = [
  {
    src: "/home/hero/hair-straightener.png",
    alt: "Hair straightener",
    width: 1024,
    height: 1024,
  },
  { src: "/home/hero/fan-heater.png", alt: "Fan heater", width: 897, height: 715 },
  {
    src: "/home/hero/water-heater.png",
    alt: "Instant water heater",
    width: 1005,
    height: 917,
  },
  {
    src: "/home/hero/mosquito-racket.png",
    alt: "Mosquito racket",
    width: 1280,
    height: 962,
  },
] as const;

export function CinematicHero() {
  const scopeRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduced) return;

    const mm = gsap.matchMedia();

    // Entrance + ambient motion (viewport independent so it never replays on resize).
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const one = <T extends HTMLElement>(selector: string) =>
        scope.querySelector<T>(selector);
      const all = (selector: string) =>
        gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(selector));

      const stage = one("[data-hero-stage]");
      const rings = one("[data-hero-rings]");
      const ghost = one("[data-hero-ghost]");
      const lineInners = all("[data-hero-line-inner]");
      const product = one("[data-hero-product]");
      const productFloat = one("[data-hero-product-float]");
      const content = one("[data-hero-content]");
      const copy = one("[data-hero-copy]");
      const cta = one("[data-hero-cta]");
      const images = all("[data-hero-product-img]");

      const loops: gsap.core.Animation[] = [];
      const moving: HTMLElement[] = [];
      if (product) moving.push(product);
      lineInners.forEach((el) => moving.push(el));
      if (moving.length) gsap.set(moving, { willChange: "transform" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.08,
        onComplete: () => {
          if (moving.length) gsap.set(moving, { clearProps: "willChange" });
        },
      });

      // 1 — studio environment
      if (stage) {
        tl.fromTo(
          stage,
          { autoAlpha: 0, scale: 0.97 },
          { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          0,
        );
      }
      if (rings) {
        tl.fromTo(
          rings,
          { autoAlpha: 0, scale: 0.93 },
          { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          0.1,
        );
      }
      if (ghost) {
        tl.fromTo(
          ghost,
          { autoAlpha: 0, xPercent: 5 },
          { autoAlpha: 1, xPercent: 0, duration: 1.3, ease: "power2.out" },
          0.12,
        );
      }

      // 2 — headline lines reveal from masked containers
      if (lineInners.length) {
        tl.fromTo(
          lineInners,
          { yPercent: 116 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
          },
          0.35,
        );
      }

      // 3 — product enters the studio and settles
      if (product) {
        tl.fromTo(
          product,
          { autoAlpha: 0, xPercent: 14, yPercent: 12, rotate: -6, scale: 0.9 },
          {
            autoAlpha: 1,
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
          },
          0.5,
        );
        tl.to(product, { y: -8, duration: 0.5, ease: "power2.out" }, 1.7).to(
          product,
          { y: 0, duration: 0.6, ease: "power2.inOut" },
          2.15,
        );
      }

      // 4 — supporting copy and actions
      if (copy) {
        tl.fromTo(
          copy,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.7,
        );
      }
      if (cta) {
        tl.fromTo(
          cta,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.85,
        );
      }

      // 5 — idle float, kept subtle and paused while offscreen.
      if (productFloat) {
        loops.push(
          gsap.to(productFloat, {
            y: -12,
            duration: 6.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2.6,
          }),
        );
      }

      // 6 — cycle through the product images with the entrance choreography.
      if (images.length > 1) {
        const HOLD = 3.2;
        gsap.set(images, { autoAlpha: 0 });
        gsap.set(images[0], { autoAlpha: 1 });
        const cycle = gsap.timeline({ repeat: -1, delay: 0.6 });
        images.forEach((current, index) => {
          const next = images[(index + 1) % images.length];
          cycle
            .to(
              current,
              {
                autoAlpha: 0,
                yPercent: -8,
                rotate: 4,
                scale: 0.96,
                duration: 0.7,
                ease: "power2.inOut",
              },
              `+=${HOLD}`,
            )
            .fromTo(
              next,
              { autoAlpha: 0, yPercent: 12, rotate: -6, scale: 0.9 },
              {
                autoAlpha: 1,
                yPercent: 0,
                rotate: 0,
                scale: 1,
                duration: 1.1,
                ease: "power3.out",
                immediateRender: false,
              },
              "<0.12",
            );
        });
        loops.push(cycle);
      }

      // Pause looping motion while the hero is offscreen.
      if (loops.length) {
        ScrollTrigger.create({
          trigger: scope,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) =>
            loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause())),
        });
      }

      // Parallax — layers drift at different rates as the hero scrolls away.
      const layers: Array<{ el: HTMLElement | null; vars: gsap.TweenVars }> = [
        { el: ghost, vars: { yPercent: 30 } },
        { el: stage, vars: { yPercent: 8, autoAlpha: 0.4 } },
        { el: rings, vars: { yPercent: -10 } },
        { el: productFloat, vars: { yPercent: -24 } },
        { el: content, vars: { yPercent: -8, autoAlpha: 0.9 } },
      ];
      layers.forEach(({ el, vars }) => {
        if (!el) return;
        gsap.to(el, {
          ...vars,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    });

    // Pointer-driven depth (desktop, precise pointers only).
    mm.add(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const tilt = scope.querySelector<HTMLElement>("[data-hero-product-tilt]");
        const glow = scope.querySelector<HTMLElement>("[data-hero-glow]");
        if (!tilt) return;

        const rotY = gsap.quickTo(tilt, "rotationY", {
          duration: 0.8,
          ease: "power3",
        });
        const rotX = gsap.quickTo(tilt, "rotationX", {
          duration: 0.8,
          ease: "power3",
        });
        const glowX = glow
          ? gsap.quickTo(glow, "x", { duration: 1.1, ease: "power3" })
          : null;
        const glowY = glow
          ? gsap.quickTo(glow, "y", { duration: 1.1, ease: "power3" })
          : null;

        const onMove = (event: PointerEvent) => {
          const rect = scope.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          rotY(nx * 10);
          rotX(-ny * 8);
          if (glowX) glowX(nx * -26);
          if (glowY) glowY(ny * -18);
        };

        scope.addEventListener("pointermove", onMove);
        return () => scope.removeEventListener("pointermove", onMove);
      },
    );

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={scopeRef}
      id="home-hero"
      data-hero
      aria-labelledby="home-hero-title"
      className="relative isolate flex flex-col overflow-hidden bg-navy-deep lg:min-h-[calc(100dvh-4.5rem)]"
    >
      <div
        data-hero-stage
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 74% 38%, rgba(46,95,158,0.5), transparent 62%), radial-gradient(48% 60% at 8% 96%, rgba(22,74,150,0.34), transparent 66%)",
          }}
        />
        <div
          data-hero-glow
          className="absolute right-[4%] top-[22%] h-[46vw] max-h-[600px] w-[46vw] max-w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(159,185,228,0.30), transparent 68%)",
          }}
        />
        <div
          className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(159,185,228,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(159,185,228,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(130%_100%_at_50%_38%,black_42%,transparent_100%)]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(to top, rgba(6,23,51,0.9), transparent)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[-1%] z-[1] flex select-none items-center"
      >
        <span
          data-hero-ghost
          className="block text-[30vw] font-black leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(159,185,228,0.14)] lg:text-[22vw]"
        >
          GM
        </span>
      </div>

      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-10 lg:pt-12"
      >
        <div className="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-4">
          <div className="relative z-20 order-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end">
            <h1
              id="home-hero-title"
              className="text-[clamp(1.9rem,5.2vw,3.6rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]"
            >
              {HEADLINE.map((line) => (
                <span
                  key={line.text}
                  data-hero-line
                  className="block overflow-hidden pr-[0.08em]"
                >
                  <span
                    data-hero-line-inner
                    className={`block ${
                      line.tint ? "text-accent-tint" : "text-white"
                    }`}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div className="relative z-10 order-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="relative mx-auto w-full max-w-[195px] sm:max-w-[247px] lg:mx-auto lg:w-[67.6%] lg:max-w-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[48%] -z-10 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  data-hero-rings
                  className="relative aspect-square w-[min(80%,280px)]"
                >
                  <span className="absolute inset-0 rounded-full border border-accent-tint/12" />
                  <span className="absolute inset-[13%] rounded-full border border-white/8" />
                  <span className="absolute inset-x-[14%] bottom-[-2%] h-[8%] rounded-[100%] bg-[radial-gradient(closest-side,rgba(3,12,30,0.75),transparent)] blur-xl" />
                </div>
              </div>

              <div data-hero-product className="relative z-10">
                <div
                  data-hero-product-float
                  className="[perspective:1500px] [transform-style:preserve-3d]"
                >
                  <div
                    data-hero-product-tilt
                    className="relative aspect-square [transform-style:preserve-3d]"
                  >
                    {HERO_PRODUCTS.map((product, index) => (
                      <Image
                        key={product.src}
                        data-hero-product-img
                        src={product.src}
                        alt={product.alt}
                        width={product.width}
                        height={product.height}
                        priority={index === 0}
                        sizes="(min-width: 1024px) 494px, (min-width: 640px) 247px, 195px"
                        className={`absolute inset-0 h-full w-full object-contain drop-shadow-[0_46px_60px_rgba(3,12,30,0.62)] ${
                          index === 0 ? "" : "opacity-0"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 order-3 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start lg:pr-10">
            <p
              data-hero-copy
              className="max-w-xl text-pretty text-base leading-relaxed text-navy-muted sm:text-lg"
            >
              {SUPPORT}
            </p>
            <div
              data-hero-cta
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/manufacturing"
                className="group btn-navy-solid px-7 py-3.5 text-sm sm:text-base"
              >
                Explore Our Capabilities
                <Icon
                  icon="lucide:arrow-right"
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </Link>
              <Link
                href="/contact#enquiry"
                className="btn-navy-ghost px-7 py-3.5 text-sm sm:text-base"
              >
                Request OEM / ODM Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
