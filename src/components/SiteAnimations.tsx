"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations";
import {
  setupClipReveals,
  setupCounters,
  setupEngineeringSteps,
  setupGrowLines,
  setupHeroTimeline,
  setupParallax,
  setupPops,
  setupQualityChecklist,
  setupReveals,
} from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const NAV_OFFSET = -80;

export function SiteAnimations() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      setupHeroTimeline(document);
      setupReveals(document);
      setupPops(document);
      setupParallax(document);
      setupCounters(document);
      setupGrowLines(document);
      setupClipReveals(document);
      setupEngineeringSteps(document);
      setupQualityChecklist(document);
    });

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.currentTarget as HTMLAnchorElement | null)?.closest(
        "a[href]",
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        event.preventDefault();
        return;
      }
      if (!href.startsWith("#")) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      event.preventDefault();
      const offset =
        target.id === "main"
          ? 0
          : target.getAttribute("data-nav-offset") !== null
            ? Number(target.dataset.navOffset)
            : NAV_OFFSET;
      lenis.scrollTo(target, { offset });
    };

    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a[href^='#']"),
    );
    anchors.forEach((anchor) => anchor.addEventListener("click", onAnchorClick));

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      context.revert();
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", onAnchorClick),
      );
      window.removeEventListener("load", refresh);
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [reduced]);

  return null;
}