import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function isReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Builds entrance reveals for `[data-reveal]` elements.
 *
 * - `[data-reveal]`                       fades + rises the element itself.
 * - `[data-reveal][data-reveal-stagger]`  staggers its `[data-reveal-child]`
 *   children instead.
 *
 * Plays once on first entry; never replays on scroll-back.
 */
export function setupReveals(scope: ParentNode): void {
  gsap.utils.toArray<HTMLElement>("[data-reveal]", scope).forEach((el) => {
    if (el.hasAttribute("data-reveal-stagger")) {
      const items = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
      if (!items.length) return;
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
      return;
    }

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });
}

/**
 * Fades + scales in `[data-reveal-pop]` elements (badges, trust indicators).
 */
export function setupPops(scope: ParentNode): void {
  gsap.utils.toArray<HTMLElement>("[data-reveal-pop]", scope).forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 0.92, y: 12 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
  });
}

/**
 * Subtle vertical parallax for `[data-parallax="<px>"]` elements.
 * Value is the max drift in px across the element's scroll pass.
 */
export function setupParallax(scope: ParentNode): void {
  gsap.utils.toArray<HTMLElement>("[data-parallax]", scope).forEach((el) => {
    const amount = Math.min(40, Math.abs(parseFloat(el.dataset.parallax ?? "0") || 0));
    if (!amount) return;
    const trigger = el.parentElement ?? el;
    gsap.fromTo(
      el,
      { y: 0 },
      {
        y: amount,
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
}

/**
 * Scroll-triggered number counters for `[data-count]` elements.
 *
 * - `data-count-to`     end value
 * - `data-count-prefix` text before the number
 * - `data-count-suffix` text after the number
 */
export function setupCounters(scope: ParentNode): void {
  gsap.utils.toArray<HTMLElement>("[data-count]", scope).forEach((el) => {
    const to = parseFloat(el.dataset.countTo ?? "0") || 0;
    const prefix = el.dataset.countPrefix ?? "";
    const suffix = el.dataset.countSuffix ?? "";
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
}

/**
 * Grows a line in the given axis when scrolled into view.
 * `data-grow="x"` (default) scales horizontally, `data-grow="y"` vertically.
 */
export function setupGrowLines(scope: ParentNode): void {
  gsap.utils.toArray<HTMLElement>("[data-grow]", scope).forEach((el) => {
    const vertical = el.dataset.grow === "y";
    const from = vertical
      ? { scaleY: 0, transformOrigin: "50% 0%" }
      : { scaleX: 0, transformOrigin: "0% 50%" };
    const to = vertical ? { scaleY: 1 } : { scaleX: 1 };
    gsap.fromTo(el, from, {
      ...to,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

/**
 * Reveals an image container from top to bottom via clip-path.
 * `[data-clip-reveal]`
 */
export function setupClipReveals(scope: ParentNode): void {
  gsap.utils.toArray<HTMLElement>("[data-clip-reveal]", scope).forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });
}

/**
 * Staggered step reveal for the engineering process grid.
 * `[data-engineering]` → `[data-eng-step]` items with `[data-eng-icon]`,
 * `[data-eng-line]`, `[data-eng-title]`, `[data-eng-text]` children.
 */
export function setupEngineeringSteps(scope: ParentNode): void {
  const grid = scope.querySelector<HTMLElement>("[data-engineering]");
  if (!grid) return;

  const steps = gsap.utils.toArray<HTMLElement>("[data-eng-step]", grid);
  steps.forEach((step, index) => {
    const icon = step.querySelector<HTMLElement>("[data-eng-icon]");
    const line = step.querySelector<HTMLElement>("[data-eng-line]");
    const title = step.querySelector<HTMLElement>("[data-eng-title]");
    const text = step.querySelector<HTMLElement>("[data-eng-text]");

    const timeline = gsap.timeline({
      delay: index * 0.1,
      scrollTrigger: { trigger: grid, start: "top 80%", once: true },
    });
    if (icon) {
      timeline.fromTo(
        icon,
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" },
        0,
      );
    }
    if (line) {
      timeline.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power2.out" },
        0.15,
      );
    }
    if (title) {
      timeline.fromTo(
        title,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.2,
      );
    }
    if (text) {
      timeline.fromTo(
        text,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        0.35,
      );
    }
  });
}

/**
 * Staggered reveal for the quality checklist.
 * `[data-quality-list]` → `[data-quality-item]` with `[data-check]` icon
 * (scales in) and `[data-check-text]` (slides in from the right).
 */
export function setupQualityChecklist(scope: ParentNode): void {
  const list = scope.querySelector<HTMLElement>("[data-quality-list]");
  if (!list) return;

  const items = gsap.utils.toArray<HTMLElement>("[data-quality-item]", list);
  items.forEach((item, index) => {
    const check = item.querySelector<HTMLElement>("[data-check]");
    const text = item.querySelector<HTMLElement>("[data-check-text]");

    const timeline = gsap.timeline({
      delay: index * 0.08,
      scrollTrigger: { trigger: list, start: "top 85%", once: true },
    });
    if (check) {
      timeline.fromTo(
        check,
        { autoAlpha: 0, scale: 0.4 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
        0,
      );
    }
    if (text) {
      timeline.fromTo(
        text,
        { autoAlpha: 0, x: 12 },
        { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" },
        0.1,
      );
    }
  });
}

/**
 * Hero entrance: fades the navbar in. The hero carousel owns its own
 * slide-content animation (see `Hero.tsx`), so only the chrome is handled here.
 */
export function setupHeroTimeline(scope: ParentNode): void {
  if (!scope.querySelector("[data-hero]")) return;

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .fromTo(
      "#site-navbar",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6 },
      0,
    );
}