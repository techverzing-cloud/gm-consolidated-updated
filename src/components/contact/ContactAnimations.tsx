"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Contact page animation orchestrator.
 *
 * Implemented at page level (not the shared layout) so the entrance
 * sequences also run after client-side navigation, when the shared
 * SiteAnimations effect has already played. Motion is skipped entirely under
 * `prefers-reduced-motion` — content is never hidden by inline styles.
 */
export function ContactAnimations({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduced) return;

    const envelope = scope.querySelector("#contact-page");
    const details = scope.querySelector("#contact-details");
    const enquiry = scope.querySelector("#enquiry");
    const mapSection = scope.querySelector("#map-section");
    const ctaSection = scope.querySelector("#contact-cta");

    const context = gsap.context(() => {
      if (envelope) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            "[data-contact-hero-eyebrow]",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            0,
          )
          .fromTo(
            "[data-contact-hero-title]",
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            0.1,
          )
          .fromTo(
            "[data-contact-hero-copy]",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            0.22,
          )
          .fromTo(
            "[data-contact-hero-ctas] > *",
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
            0.32,
          )
          .fromTo(
            "[data-contact-hero-image]",
            { scale: 1.06 },
            { scale: 1, duration: 1, ease: "power2.out" },
            0.28,
          );
      }

      if (details) {
        gsap.fromTo(
          "[data-contact-intro]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: details, start: "top 80%", once: true },
          },
        );
        gsap.fromTo(
          "[data-contact-card]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: details, start: "top 76%", once: true },
          },
        );
      }

      if (enquiry) {
        gsap.fromTo(
          "[data-enquiry-head]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: enquiry, start: "top 78%", once: true },
          },
        );
        gsap.fromTo(
          "[data-form-field]",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: { trigger: enquiry, start: "top 74%", once: true },
          },
        );
        gsap.fromTo(
          "[data-form-submit]",
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.25,
            scrollTrigger: { trigger: enquiry, start: "top 70%", once: true },
          },
        );
      }

      if (mapSection) {
        gsap.fromTo(
          "[data-map-media]",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: mapSection, start: "top 72%", once: true },
          },
        );
        gsap.fromTo(
          "[data-map-frame]",
          { scale: 1.02 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power1.out",
            scrollTrigger: { trigger: mapSection, start: "top 72%", once: true },
          },
        );
        gsap.fromTo(
          "[data-map-panel]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: mapSection, start: "top 70%", once: true },
          },
        );
      }

      if (ctaSection) {
        gsap.fromTo(
          "[data-cta-media]",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ctaSection, start: "top 78%", once: true },
          },
        );
        gsap.fromTo(
          "[data-cta-content]",
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
    }, scope);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [reduced]);

  return (
    <div ref={scopeRef} id="contact-page">
      {children}
    </div>
  );
}