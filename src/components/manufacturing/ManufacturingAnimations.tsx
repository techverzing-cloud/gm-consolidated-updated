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
    const teardowns: Array<() => void> = [];

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
        const serpentTop = flow.querySelector<HTMLElement>("[data-serpent-top]");
        const serpentRight = flow.querySelector<HTMLElement>("[data-serpent-right]");
        const serpentBottom = flow.querySelector<HTMLElement>("[data-serpent-bottom]");

        const positionSerpent = () => {
          if (
            !desktopFlow ||
            desktopFlow.offsetWidth === 0 ||
            !serpentTop ||
            !serpentRight ||
            !serpentBottom
          ) {
            return;
          }
          const markers = gsap.utils.toArray<HTMLElement>(
            "[data-mfg-flow-marker]",
            desktopFlow,
          );
          if (markers.length < 9) return;
          const flowRect = desktopFlow.getBoundingClientRect();
          const center = (el: HTMLElement) => {
            const r = el.getBoundingClientRect();
            return {
              x: r.left + r.width / 2 - flowRect.left,
              y: r.top + r.height / 2 - flowRect.top,
            };
          };
          const p = markers.map(center);
          const set = (el: HTMLElement, top: number, left: number, w: number, h: number) => {
            el.style.top = `${top}px`;
            el.style.left = `${left}px`;
            el.style.width = `${w}px`;
            el.style.height = `${h}px`;
          };
          set(serpentTop, p[0].y, p[0].x, p[4].x - p[0].x, 1);
          set(serpentRight, p[4].y, p[4].x, 1, p[5].y - p[4].y);
          set(serpentBottom, p[5].y, p[8].x, p[5].x - p[8].x, 1);
          serpentBottom.style.transformOrigin = "100% 50%";
          serpentTop.style.transformOrigin = "0% 50%";
          serpentRight.style.transformOrigin = "50% 0%";
        };

        positionSerpent();
        const refreshSerpent = () => {
          positionSerpent();
          ScrollTrigger.refresh();
        };
        const flowResizeObserver = new ResizeObserver(() =>
          window.requestAnimationFrame(refreshSerpent),
        );
        if (desktopFlow) flowResizeObserver.observe(desktopFlow);
        ScrollTrigger.addEventListener("refreshInit", positionSerpent);
        teardowns.push(() => {
          flowResizeObserver.disconnect();
          ScrollTrigger.removeEventListener("refreshInit", positionSerpent);
        });

        const markersRowOne = gsap.utils.toArray<HTMLElement>(
          '[data-mfg-flow-row="1"] [data-mfg-flow-marker]',
          flow,
        );
        const markersRowTwo = gsap.utils.toArray<HTMLElement>(
          '[data-mfg-flow-row="2"] [data-mfg-flow-marker]',
          flow,
        );
        const copiesRowOne = gsap.utils.toArray<HTMLElement>(
          '[data-mfg-flow-row="1"] [data-mfg-flow-copy]',
          flow,
        );
        const copiesRowTwo = gsap.utils.toArray<HTMLElement>(
          '[data-mfg-flow-row="2"] [data-mfg-flow-copy]',
          flow,
        );

        /* Desktop / tablet — serpentine: draw the route, then reveal
           stations in production order (row 1 left→right, row 2 right→left). */
        if (serpentTop && serpentRight && serpentBottom) {
          gsap
            .timeline({
              scrollTrigger: { trigger: flow, start: "top 68%", once: true },
            })
            .fromTo(
              serpentTop,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
              0,
            )
            .fromTo(
              serpentRight,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.5, ease: "power2.inOut" },
              0.6,
            )
            .fromTo(
              serpentBottom,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
              0.9,
            )
            .fromTo(
              markersRowOne,
              { autoAlpha: 0, scale: 0.6 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.45,
                stagger: 0.08,
                ease: "back.out(1.7)",
              },
              1.3,
            )
            .fromTo(
              markersRowTwo,
              { autoAlpha: 0, scale: 0.6 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.45,
                stagger: 0.08,
                ease: "back.out(1.7)",
              },
              1.4,
            )
            .fromTo(
              copiesRowOne,
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
              },
              2,
            )
            .fromTo(
              copiesRowTwo,
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
              },
              2.1,
            );
        }

        /* Mobile — vertical timeline */
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
        const lineY = flow.querySelector("[data-flow-line-y]");
        if (lineY) {
          gsap.fromTo(
            lineY,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: flow, start: "top 70%", once: true },
            },
          );
        }
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
      teardowns.forEach((fn) => fn());
      context.revert();
    };
  }, [reduced]);

  return (
    <div ref={scopeRef} id="mfg-page">
      {children}
    </div>
  );
}