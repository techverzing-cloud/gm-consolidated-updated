"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Product detail page animation orchestrator.
 *
 * Page-scoped (not the shared layout) so sequences also run after client-side
 * navigation. Attribute names are intentionally distinct from the shared
 * layout's and every other page's (`data-product-*`) so a full page load never
 * double-animates. Everything is skipped under `prefers-reduced-motion`; no
 * inline styles are applied when JS/reduced motion is active, so content is
 * never hidden.
 */
export function ProductDetailAnimations({
  children,
}: {
  children: ReactNode;
}) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduced) return;

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-product-hero-eyebrow]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          0.1,
        )
        .fromTo(
          "[data-product-hero-image]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.15,
        )
        .fromTo(
          "[data-product-hero-title]",
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.22,
        )
        .fromTo(
          "[data-product-hero-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.34,
        )
        .fromTo(
          "[data-product-hero-highlights] > *",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.46,
        )
        .fromTo(
          "[data-product-hero-meta]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          0.56,
        )
        .fromTo(
          "[data-product-hero-ctas] > *",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.56,
        );

      gsap.utils
        .toArray<HTMLElement>("[data-product-reveal]", scope)
        .forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-product-stagger]", scope)
        .forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>(
            "[data-product-stagger-item]",
          );
          if (!items.length) return;
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: "top 85%", once: true },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-product-clip]", scope)
        .forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-product-check-list]", scope)
        .forEach((list) => {
          const items = list.querySelectorAll<HTMLElement>(
            "[data-product-check-item]",
          );
          if (!items.length) return;
          gsap.fromTo(
            items,
            { autoAlpha: 0, x: 14 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: { trigger: list, start: "top 85%", once: true },
            },
          );
        });

      const manufacturingContent = scope.querySelector(
        "[data-product-manufacturing-content]",
      );
      if (manufacturingContent) {
        gsap.fromTo(
          manufacturingContent,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: manufacturingContent,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    }, scope);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, [reduced]);

  return (
    <div ref={scopeRef} id="product-page">
      {children}
    </div>
  );
}