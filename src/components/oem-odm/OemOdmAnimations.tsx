"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * OEM / ODM page animation orchestrator.
 *
 * Page-scoped (not the shared layout) so sequences also run after client-side
 * navigation. Attribute names are intentionally distinct from the shared
 * layout's, the about page's and the manufacturing page's (`data-odm-*`) so
 * a full page load never double-animates. Everything is skipped under
 * `prefers-reduced-motion`; no inline styles are applied when JS/reduced
 * motion is active, so content is never hidden.
 */
export function OemOdmAnimations({
  children,
}: {
  children: ReactNode;
}) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduced) return;

    const journey = scope.querySelector("#odm-journey");
    const audience = scope.querySelector("[data-odm-audience]");
    const brand = scope.querySelector("#odm-brand");
    const ctaSection = scope.querySelector("#odm-cta");
    const teardowns: Array<() => void> = [];

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-odm-hero-eyebrow]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0,
        )
        .fromTo(
          "[data-odm-hero-title]",
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.1,
        )
        .fromTo(
          "[data-odm-hero-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.22,
        );

      const engagementSection = scope.querySelector("#odm-engagement");
      if (engagementSection) {
        gsap.fromTo(
          "[data-odm-model]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: engagementSection,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      if (journey) {
        const desktopJourney =
          journey.querySelector<HTMLElement>("[data-odm-journey-desktop]");
        const serpentTop =
          journey.querySelector<HTMLElement>("[data-odm-serpent-top]");
        const serpentRight =
          journey.querySelector<HTMLElement>("[data-odm-serpent-right]");
        const serpentBottom =
          journey.querySelector<HTMLElement>("[data-odm-serpent-bottom]");

        const positionSerpent = () => {
          if (
            !desktopJourney ||
            desktopJourney.offsetWidth === 0 ||
            !serpentTop ||
            !serpentRight ||
            !serpentBottom
          ) {
            return;
          }
          const markers = gsap.utils.toArray<HTMLElement>(
            "[data-odm-journey-marker]",
            desktopJourney,
          );
          if (markers.length < 9) return;
          const journeyRect = desktopJourney.getBoundingClientRect();
          const center = (el: HTMLElement) => {
            const r = el.getBoundingClientRect();
            return {
              x: r.left + r.width / 2 - journeyRect.left,
              y: r.top + r.height / 2 - journeyRect.top,
            };
          };
          const p = markers.map(center);
          const set = (
            el: HTMLElement,
            top: number,
            left: number,
            w: number,
            h: number,
          ) => {
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
        const journeyResizeObserver = new ResizeObserver(() =>
          window.requestAnimationFrame(refreshSerpent),
        );
        if (desktopJourney) journeyResizeObserver.observe(desktopJourney);
        ScrollTrigger.addEventListener("refreshInit", positionSerpent);
        teardowns.push(() => {
          journeyResizeObserver.disconnect();
          ScrollTrigger.removeEventListener("refreshInit", positionSerpent);
        });

        const markersRowOne = gsap.utils.toArray<HTMLElement>(
          '[data-odm-journey-row="1"] [data-odm-journey-marker]',
          journey,
        );
        const markersRowTwo = gsap.utils.toArray<HTMLElement>(
          '[data-odm-journey-row="2"] [data-odm-journey-marker]',
          journey,
        );
        const copiesRowOne = gsap.utils.toArray<HTMLElement>(
          '[data-odm-journey-row="1"] [data-odm-journey-copy]',
          journey,
        );
        const copiesRowTwo = gsap.utils.toArray<HTMLElement>(
          '[data-odm-journey-row="2"] [data-odm-journey-copy]',
          journey,
        );

        /* Desktop / tablet — serpentine: draw the route, then reveal
           stations in production order (row 1 left→right, row 2 right→left). */
        if (serpentTop && serpentRight && serpentBottom) {
          gsap
            .timeline({
              scrollTrigger: { trigger: journey, start: "top 68%", once: true },
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
          "[data-odm-journey-step]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: { trigger: journey, start: "top 74%", once: true },
          },
        );
        const lineY = journey.querySelector("[data-odm-journey-line-y]");
        if (lineY) {
          gsap.fromTo(
            lineY,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: journey, start: "top 70%", once: true },
            },
          );
        }
      }

      const capabilitiesSection = scope.querySelector(
        "[data-odm-capabilities]",
      );
      if (capabilitiesSection) {
        gsap.fromTo(
          "[data-odm-capability]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: capabilitiesSection,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      const audienceSection = scope.querySelector("[data-odm-audience]");
      if (audienceSection) {
        gsap.fromTo(
          "[data-odm-audience-item]",
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: audienceSection,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      if (brand) {
        gsap.fromTo(
          "[data-odm-brand-word]",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: brand, start: "top 80%", once: true },
          },
        );
      }

      if (ctaSection) {
        gsap.fromTo(
          "[data-odm-cta-media]",
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
          "[data-odm-cta-content]",
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
        .toArray<HTMLElement>("[data-odm-parallax]", scope)
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
    <div ref={scopeRef} id="odm-page">
      {children}
    </div>
  );
}