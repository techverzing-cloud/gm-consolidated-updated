"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Manufacturing page animation orchestrator.
 *
 * Page-scoped (not the shared layout) so sequences also run after client-side
 * navigation. Attribute names are intentionally distinct from the shared
 * layout's and the about page's (`data-mfg-*` / `data-flow-*`) so a full
 * page load never double-animates. Everything is skipped under
 * `prefers-reduced-motion`; no inline styles are applied when JS/reduced
 * motion is active, so content is never hidden.
 */
export function ManufacturingAnimations({
  children,
}: {
  children: ReactNode;
}) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduced) return;

    const flow = scope.querySelector("#mfg-flow");
    const integration = scope.querySelector("#mfg-integration");
    const metrics = scope.querySelector("#mfg-metrics");
    const capabilities = scope.querySelector("#mfg-capabilities");
    const units = scope.querySelector("#mfg-units");
    const ctaSection = scope.querySelector("#mfg-cta");

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-mfg-hero-eyebrow]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0,
        )
        .fromTo(
          "[data-mfg-hero-title]",
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.1,
        )
        .fromTo(
          "[data-mfg-hero-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.22,
        )
        .fromTo(
          "[data-mfg-hero-image]",
          { scale: 1.06 },
          { scale: 1, duration: 1, ease: "power2.out" },
          0.28,
        );

      const intro = scope.querySelector("[data-mfg-intro]");
      if (intro) {
        gsap.fromTo(
          intro,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: intro, start: "top 82%", once: true },
          },
        );
      }

      if (metrics) {
        gsap.fromTo(
          "[data-mfg-metric]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: metrics, start: "top 80%", once: true },
          },
        );
      }

      if (flow) {
        const desktopFlow = flow.querySelector<HTMLElement>("[data-mfg-flow-desktop]");
        const spine = flow.querySelector<HTMLElement>("[data-mfg-flow-spine]");

        if (spine) {
          gsap.fromTo(
            spine,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.4,
              ease: "power3.inOut",
              transformOrigin: "top",
              scrollTrigger: {
                trigger: flow,
                start: "top 70%",
                once: true,
              },
            },
          );
        }

        gsap.utils
          .toArray<HTMLElement>("[data-mfg-flow-item]", flow)
          .forEach((el) => {
            const side = el.dataset.mfgFlowSide;
            const xStart =
              side === "left" ? -36 : side === "right" ? 36 : 0;

            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 28, x: xStart },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 78%",
                  once: true,
                },
              },
            );
          });

        if (desktopFlow) {
          gsap.utils
            .toArray<HTMLElement>("[data-mfg-flow-media]", desktopFlow)
            .forEach((el) => {
              gsap.fromTo(
                el,
                { clipPath: "inset(0% 0% 100% 0%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.9,
                  ease: "power3.inOut",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    once: true,
                  },
                },
              );
            });
        }

        /* Mobile - vertical timeline */
        gsap.fromTo(
          "[data-mfg-flow-step]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: { trigger: flow, start: "top 74%", once: true },
          },
        );
      }

      if (capabilities) {
        gsap.fromTo(
          "[data-mfg-capability]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: capabilities,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      if (integration) {
        gsap.fromTo(
          "[data-mfg-stage]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: integration,
              start: "top 76%",
              once: true,
            },
          },
        );
        const stageLine = integration.querySelector("[data-flow-line-x]");
        if (stageLine) {
          gsap.fromTo(
            stageLine,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: integration,
                start: "top 72%",
                once: true,
              },
            },
          );
        }
        const stageLineY = integration.querySelector("[data-flow-line-y]");
        if (stageLineY) {
          gsap.fromTo(
            stageLineY,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: integration,
                start: "top 72%",
                once: true,
              },
            },
          );
        }
        const note = integration.querySelector("[data-mfg-note]");
        if (note) {
          gsap.fromTo(
            note,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: note, start: "top 88%", once: true },
            },
          );
        }
      }

      if (units) {
        gsap.utils
          .toArray<HTMLElement>("[data-mfg-unit-image]", scope)
          .forEach((el) => {
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
          "[data-mfg-unit]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: units, start: "top 76%", once: true },
          },
        );
      }

      const qualityBridge = scope.querySelector("[data-mfg-quality]");
      if (qualityBridge) {
        gsap.fromTo(
          qualityBridge,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: qualityBridge,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      if (ctaSection) {
        gsap.fromTo(
          "[data-mfg-cta-media]",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ctaSection, start: "top 78%", once: true },
          },
        );
        gsap.fromTo(
          "[data-mfg-cta-content]",
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
        .toArray<HTMLElement>("[data-mfg-count]", scope)
        .forEach((el) => {
          const to = parseFloat(el.dataset.mfgCountTo ?? "0") || 0;
          const prefix = el.dataset.mfgCountPrefix ?? "";
          const suffix = el.dataset.mfgCountSuffix ?? "";
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
        .toArray<HTMLElement>("[data-mfg-parallax]", scope)
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
    <div ref={scopeRef} id="mfg-page">
      {children}
    </div>
  );
}