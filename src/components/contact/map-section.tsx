import { Icon } from "@/components/ui/Icon";
import type { ContactChannel, ContactMap } from "@/lib/content";

interface MapSectionProps {
  map: ContactMap;
  channels: ContactChannel[];
}

export function MapSection({ map, channels }: MapSectionProps) {
  return (
    <section
      id="map-section"
      className="bg-white"
      aria-labelledby="map-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div data-map-media className="lg:col-span-3">
            <div
              data-map-frame
              className="relative h-[320px] overflow-hidden rounded-sm shadow-sm sm:h-[420px] lg:h-full lg:min-h-[460px]"
            >
              <iframe
                src={map.embedUrl}
                title="G.M. Consolidated location map"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>

          <div data-map-panel className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {map.eyebrow}
            </p>
            <h2
              id="map-title"
              className="mt-4 text-2xl font-semibold leading-[1.2] text-foreground sm:text-3xl"
            >
              {map.title}
            </h2>
            <p className="mt-5 text-lg font-semibold text-foreground">
              {map.name}
            </p>
            <p className="mt-2 max-w-md text-pretty text-base leading-relaxed text-foreground-secondary">
              {map.detail}
            </p>
            <a
              href={map.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-6 inline-flex w-fit items-center gap-2 font-semibold text-accent"
            >
              {map.directionsLabel}
              <Icon icon="mdi:arrow-right" size={18} />
            </a>

            <ul className="mt-9 space-y-5 border-t border-border pt-8">
              {channels.map((channel) => (
                <li key={channel.title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border bg-background-alt text-accent"
                  >
                    <Icon icon={channel.icon} size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {channel.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                      {channel.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}