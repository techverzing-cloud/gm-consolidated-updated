"use client";

import { useEffect, useRef, useState } from "react";
import { Component as BoxLoader } from "@/components/ui/loader-3";
import { cn } from "@/lib/utils";
import { releaseAnimations } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const FADE_MS = 500;
const REDUCED_MS = 500;
const FALLBACK_MS = 4500;

export function PageLoader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let finished = false;
    let removeTimer: number | undefined;

    const finish = () => {
      if (finished) return;
      finished = true;
      setVisible(false);
      releaseAnimations();
      removeTimer = window.setTimeout(() => setRemoved(true), FADE_MS);
    };

    if (reduced) {
      const timer = window.setTimeout(finish, REDUCED_MS);
      return () => window.clearTimeout(timer);
    }

    const overlay = overlayRef.current;
    const onAnimationEnd = () => finish();
    overlay?.addEventListener("animationend", onAnimationEnd);
    const fallback = window.setTimeout(finish, FALLBACK_MS);

    return () => {
      overlay?.removeEventListener("animationend", onAnimationEnd);
      window.clearTimeout(fallback);
      if (removeTimer !== undefined) window.clearTimeout(removeTimer);
    };
  }, [reduced]);

  if (removed) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-hidden={!visible}
      className={cn(
        "page-loader fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep transition-opacity duration-500",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <BoxLoader />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
