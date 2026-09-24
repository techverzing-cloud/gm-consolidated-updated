"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export interface CarouselItem {
  id: string;
  content: ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  active: number;
  onSlideChange: (index: number) => void;
  ariaLabel: string;
  autoplayMs?: number;
  frameClassName?: string;
}

export function Carousel({
  items,
  active,
  onSlideChange,
  ariaLabel,
  autoplayMs = 6000,
  frameClassName = "aspect-[16/9] w-full",
}: CarouselProps) {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || items.length < 2) return;
    const id = window.setTimeout(() => {
      onSlideChange((active + 1) % items.length);
    }, autoplayMs);
    return () => window.clearTimeout(id);
  }, [active, reduced, paused, autoplayMs, items.length, onSlideChange]);

  return (
    <div
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={`relative overflow-hidden ${frameClassName}`}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            {item.content}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <button
            type="button"
            onClick={() => onSlideChange((active - 1 + items.length) % items.length)}
            aria-label="Previous slide"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border/80 bg-white text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon icon="lucide:chevron-left" size={20} />
          </button>

          <div
            aria-label="Choose slide"
            className="flex items-center justify-center gap-1.5"
          >
            {items.map((item, index) => (
              <button
                key={index === active ? `${item.id}-active` : item.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active}
                onClick={() => onSlideChange(index)}
                className="group relative cursor-pointer p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span
                  className={`block origin-left rounded-full transition-all duration-300 ${
                    index === active
                      ? "h-[3px] w-8 bg-foreground/10"
                      : "h-[3px] w-5 bg-foreground/15 group-hover:bg-foreground/30"
                  }`}
                >
                  {index === active && (
                    <span
                      className="carousel-rail-fill block h-full w-full origin-left rounded-full bg-accent"
                      style={{
                        animationDuration: `${autoplayMs}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSlideChange((active + 1) % items.length)}
            aria-label="Next slide"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border/80 bg-white text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon icon="lucide:chevron-right" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}