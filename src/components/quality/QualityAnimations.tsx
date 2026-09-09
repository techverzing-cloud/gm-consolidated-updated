"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Quality page animation orchestrator.
 *
 * Page-scoped (not the shared layout) so sequences also run after client-side
 * navigation. Attribute names are intentionally distinct from the shared
 * layout's, the about page's, the manufacturing page's and the OEM/ODM
 * page's (`data-quality-*`) so a full page load never double-animates.
 * Everything is skipped under `prefers-reduced-motion`; no inline styles are
 * applied when JS/reduced motion is active, so content is never hidden.
 */
export function QualityAnimations({
  children,
}: {
  children: ReactNode;
}) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduced) return;

    const philosophy = scope.querySelector("#quality-philosophy");
    const process = scope.querySelector("#quality-process");
    const systems = scope.querySelector("#quality-systems");
    const laboratory = scope.querySelector("#quality-laboratory");
    const ctaSection = scope.querySelector("#quality-cta");

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-quality-hero-eyebrow]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0,
        )
        .fromTo(
          "[data-quality-hero-title]",
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.1,
        )
        .fromTo(
          "[data-quality-hero-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.22,
        );

      if (philosophy) {
        gsap.fromTo(
          philosophy,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: philosophy,
              start: "top 80%",
              once: true,
            },
          },
        );
        const rule = philosophy.querySelector("[data-quality-rule]");
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: philosophy,
                start: "top 64%",
                once: true,
              },
            },
          );
        }
      }

      if (process) {
        const processLine = process.querySelector(
          "[data-quality-process-line]",
        );
        if (processLine) {
          gsap.fromTo(
            processLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: process,
                start: "top 76%",
                once: true,
              },
            },
          );
        }

        gsap.fromTo(
          "[data-quality-process-marker]",
          { autoAlpha: 0, scale: 0.6 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.45,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: process,
              start: "top 72%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          "[data-quality-process-step]",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: process,
              start: "top 72%",
              once: true,
            },
          },
        );
      }

      if (systems) {
        gsap.fromTo(
          "[data-quality-system]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: systems,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      if (laboratory) {
        gsap.fromTo(
          "[data-quality-lab-image]",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: laboratory,
              start: "top 74%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          "[data-quality-lab-content]",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: laboratory,
              start: "top 72%",
              once: true,
            },
          },
        );
      }

      if (ctaSection) {
        gsap.fromTo(
          "[data-quality-cta-media]",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top 78%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          "[data-quality-cta-content]",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top 72%",
              once: true,
            },
          },
        );
      }

      gsap.utils
        .toArray<HTMLElement>("[data-quality-parallax]", scope)
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

    return () => {
      context.revert();
    };
  }, [reduced]);

  return (
    <div ref={scopeRef} id="quality-page">
      {children}
    </div>
  );
}