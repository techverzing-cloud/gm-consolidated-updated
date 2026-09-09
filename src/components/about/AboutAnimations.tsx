"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * About page animation orchestrator.
 *
 * Page-scoped (not the shared layout) so sequences also run after client-side
 * navigation. Attribute names are intentionally distinct from the shared
 * layout's (`data-about-*` / `data-flow-*`) so a full page load never
 * double-animates. Everything is skipped under `prefers-reduced-motion`; no
 * inline styles are applied when JS/reduced-motion is active, so content is
 * never hidden.
 */
export function AboutAnimations({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduced) return;

    const factStrip = scope.querySelector("#about-facts");
    const stats = scope.querySelector("#about-metrics");
    const philosophy = scope.querySelector("#about-philosophy");
    const capabilities = scope.querySelector("#about-capabilities");
    const infrastructure = scope.querySelector("#about-infrastructure");
    const ecosystem = scope.querySelector("#about-ecosystem");
    const engineering = scope.querySelector("#about-engineering");
    const quality = scope.querySelector("#about-quality");
    const business = scope.querySelector("#about-business");
    const office = scope.querySelector("#about-office");
    const ctaSection = scope.querySelector("#about-cta");

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-about-hero-eyebrow]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0,
        )
        .fromTo(
          "[data-about-hero-title]",
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.1,
        )
        .fromTo(
          "[data-about-hero-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.22,
        )
        .fromTo(
          "[data-about-hero-image]",
          { scale: 1.06 },
          { scale: 1, duration: 1, ease: "power2.out" },
          0.28,
        );

      const statement = scope.querySelector("[data-about-statement]");
      if (statement) {
        gsap.fromTo(
          statement,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: statement, start: "top 82%", once: true },
          },
        );
        const rule = statement.querySelector("[data-about-statement-rule]");
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: statement,
                start: "top 78%",
                once: true,
              },
            },
          );
        }
      }

      const profile = scope.querySelector("[data-about-profile]");
      if (profile) {
        gsap.fromTo(
          "[data-about-profile]",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: profile, start: "top 80%", once: true },
          },
        );
      }

      if (factStrip) {
        gsap.fromTo(
          "[data-about-fact]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: factStrip, start: "top 80%", once: true },
          },
        );
      }

      if (philosophy) {
        gsap.fromTo(
          "[data-about-principle]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: philosophy,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      if (capabilities) {
        gsap.fromTo(
          "[data-about-capability]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: capabilities,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      if (infrastructure) {
        gsap.utils.toArray<HTMLElement>(
          "[data-about-unit-image]",
          scope,
        ).forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.9,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });
        gsap.fromTo(
          "[data-about-unit]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: infrastructure,
              start: "top 76%",
              once: true,
            },
          },
        );
      }

      if (ecosystem) {
        gsap.fromTo(
          "[data-about-eco-row]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: ecosystem,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      if (engineering) {
        gsap.fromTo(
          "[data-flow-node]",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: engineering,
              start: "top 75%",
              once: true,
            },
          },
        );
        const flowLineX = engineering.querySelector("[data-flow-line-x]");
        if (flowLineX) {
          gsap.fromTo(
            flowLineX,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: engineering,
                start: "top 72%",
                once: true,
              },
            },
          );
        }
        const flowLineY = engineering.querySelector("[data-flow-line-y]");
        if (flowLineY) {
          gsap.fromTo(
            flowLineY,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.9,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: engineering,
                start: "top 72%",
                once: true,
              },
            },
          );
        }
      }

      if (stats) {
        gsap.fromTo(
          "[data-about-metric]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: stats, start: "top 80%", once: true },
          },
        );
      }

      if (quality) {
        gsap.fromTo(
          "[data-about-quality-item]",
          { autoAlpha: 0, x: 20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.09,
            scrollTrigger: { trigger: quality, start: "top 78%", once: true },
          },
        );
        const qualityLine = quality.querySelector("[data-about-quality-line]");
        if (qualityLine) {
          gsap.fromTo(
            qualityLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.9,
              ease: "power3.inOut",
              scrollTrigger: { trigger: quality, start: "top 74%", once: true },
            },
          );
        }
      }

      if (business) {
        gsap.fromTo(
          "[data-about-business]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: business, start: "top 78%", once: true },
          },
        );
      }

      if (office) {
        gsap.fromTo(
          "[data-about-office] > *",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: office, start: "top 80%", once: true },
          },
        );
      }

      if (ctaSection) {
        gsap.fromTo(
          "[data-about-cta-media]",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ctaSection, start: "top 78%", once: true },
          },
        );
        gsap.fromTo(
          "[data-about-cta-content]",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaSection, start: "top 72%", once: true },
          },
        );
      }

      gsap.utils
        .toArray<HTMLElement>("[data-about-count]", scope)
        .forEach((el) => {
          const to = parseFloat(el.dataset.aboutCountTo ?? "0") || 0;
          const prefix = el.dataset.aboutCountPrefix ?? "";
          const suffix = el.dataset.aboutCountSuffix ?? "";
          const state = { value: 0 };
          gsap.fromTo(
            state,
            { value: 0 },
            {
              value: to,
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              onUpdate: () => {
                el.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-about-parallax]", scope)
        .forEach((el) => {
          const trigger = el.parentElement ?? el;
          gsap.fromTo(
            el,
            { y: -18, scale: 1.12 },
            {
              y: 18,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
    }, scope);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [reduced]);

  return (
    <div ref={scopeRef} id="about-page">
      {children}
    </div>
  );
}