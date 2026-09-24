"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Carousel, type CarouselItem } from "@/components/ui/Carousel";
import type { ContactChannel, ContactMap } from "@/lib/content";

interface MapSectionProps {
  map: ContactMap;
  channels: ContactChannel[];
}

export function MapSection({ map, channels }: MapSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: CarouselItem[] = map.locations.map((location) => ({
    id: location.id,
    content: (
      <iframe
        src={location.embedUrl}
        title={`${location.name} location map`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    ),
  }));

  return (
    <section
      id="map-section"
      className="bg-white"
      aria-labelledby="map-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {map.eyebrow}
          </p>
          <h2
            id="map-title"
            className="mt-4 text-2xl font-semibold leading-[1.2] text-foreground sm:text-3xl"
          >
            {map.title}
          </h2>
        </div>

        <div data-map-media className="mt-8">
          <div data-map-frame>
            <Carousel
              items={slides}
              active={activeIndex}
              onSlideChange={setActiveIndex}
              ariaLabel="G.M. Consolidated locations"
              frameClassName="h-[320px] rounded-sm shadow-sm sm:h-[420px] lg:h-[520px]"
              autoplayMs={7000}
            />
          </div>
        </div>

        <div data-map-panel className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {map.locations.map((location, index) => (
              <button
                key={location.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                className={`cursor-pointer rounded-sm border p-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  index === activeIndex
                    ? "border-accent bg-accent/5"
                    : "border-border bg-white hover:border-accent"
                }`}
              >
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {location.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {location.detail}
                </p>
                <span className="link-underline mt-4 inline-flex items-center gap-2 font-semibold text-accent">
                  {location.directionsLabel}
                  <Icon icon="lucide:arrow-right" size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.title} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border bg-background-alt text-accent"
              >
                <Icon icon={channel.icon} size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {channel.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                  {channel.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}