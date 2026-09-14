import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { AboutTimeline, AboutTimelineEvent } from "@/lib/about";

function TimelineCard({
  event,
  featured,
}: {
  event: AboutTimelineEvent;
  featured: boolean;
}) {
  if (featured) {
    return (
      <div className="max-w-md rounded-sm bg-navy p-6 shadow-sm sm:p-7">
        <p className="text-3xl font-semibold tabular-nums tracking-tight text-accent-tint sm:text-4xl">
          {event.year}
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white sm:text-xl">
          {event.title}
        </h3>
        <p className="mt-2 max-w-[40ch] text-pretty text-sm leading-relaxed text-navy-muted sm:text-base">
          {event.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-tint">
          <span aria-hidden="true" className="h-px w-5 bg-accent-tint/60" />
          Milestone
        </span>
      </div>
    );
  }

  return (
    <div>
      <p className="text-3xl font-semibold tabular-nums tracking-tight text-accent sm:text-4xl">
        {event.year}
      </p>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground sm:text-xl">
        {event.title}
      </h3>
      <p className="mt-2 max-w-[40ch] text-pretty text-sm leading-relaxed text-foreground-secondary sm:text-base">
        {event.description}
      </p>
    </div>
  );
}

function Marker({ featured }: { featured: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-white"
    >
      <span
        className={`rounded-full ${
          featured ? "h-2 w-2 bg-accent" : "h-1.5 w-1.5 bg-accent/70"
        }`}
      />
    </span>
  );
}

function TodayCopy() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        Today · 2026
      </p>
      <h3 className="mt-2 text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl">
        The next milestone is being written with you.
      </h3>
      <p className="mt-3 max-w-[46ch] text-pretty text-base leading-relaxed text-foreground-secondary">
        Four decades of landmarks behind us — bring your next appliance
        programme and start the next chapter together.
      </p>
      <Link
        href="/contact#enquiry"
        className="btn-primary mt-6 px-6 py-3 text-sm"
      >
        Start a conversation
      </Link>
    </>
  );
}

export function TimelineSection({ timeline }: { timeline: AboutTimeline }) {
  const { events } = timeline;

  return (
    <section
      id="about-timeline"
      className="bg-white"
      aria-labelledby="timeline-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl" data-reveal data-reveal-stagger>
          <p
            data-reveal-child
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {timeline.eyebrow}
          </p>
          <h2
            id="timeline-title"
            data-reveal-child
            className="mt-5 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {timeline.title}
          </h2>
          <p
            data-reveal-child
            className="mt-5 max-w-[60ch] text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            {timeline.description}
          </p>
          <span
            data-reveal-child
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-accent/25 bg-background-alt px-4 py-2 text-sm font-semibold tabular-nums tracking-tight text-accent"
          >
            1983
            <Icon icon="mdi:arrow-right" size={16} className="text-accent/50" />
            2024
          </span>
        </header>

        {/* Desktop — alternating editorial timeline around a central spine */}
        <div className="relative mt-20 hidden lg:block">
          <span
            data-about-timeline-spine
            aria-hidden="true"
            className="absolute bottom-10 left-1/2 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-accent/40 via-accent/20 to-accent/40"
          />
          <ol data-about-timeline className="relative">
            {events.map((event, index) => {
              const left = index % 2 === 0;
              return (
                <li
                  key={event.year}
                  data-about-timeline-item
                  data-about-timeline-side={left ? "left" : "right"}
                  className="relative grid grid-cols-2 gap-x-20 xl:gap-x-28"
                >
                  <Marker featured={Boolean(event.featured)} />
                  <div
                    className={
                      left ? "col-start-1 flex justify-end" : "col-start-2"
                    }
                  >
                    <TimelineCard
                      event={event}
                      featured={Boolean(event.featured)}
                    />
                  </div>
                </li>
              );
            })}
            <li
              data-about-timeline-item
              data-about-timeline-side="center"
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-2 h-5 w-5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-accent/20"
              />
              <div className="mx-auto max-w-lg pt-20 text-center bg-white">
                <TodayCopy />
              </div>
            </li>
          </ol>
        </div>

        {/* Mobile — left-aligned spine timeline */}
        <div className="mt-14 lg:hidden">
          <ol
            data-about-timeline
            className="relative space-y-9 before:absolute before:bottom-6 before:left-2.5 before:top-1 before:w-px before:bg-border"
          >
            {events.map((event) => (
              <li
                key={event.year}
                data-about-timeline-item
                data-about-timeline-side="mobile"
                className="relative flex items-start gap-5"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white"
                >
                  <span
                    className={`rounded-full ${
                      event.featured ? "h-2 w-2 bg-accent" : "h-1.5 w-1.5 bg-accent/70"
                    }`}
                  />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <TimelineCard
                    event={event}
                    featured={Boolean(event.featured)}
                  />
                </div>
              </li>
            ))}
            <li
              data-about-timeline-item
              data-about-timeline-side="mobile"
              className="relative flex items-start gap-5"
            >
              <span
                aria-hidden="true"
                className="relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full bg-accent ring-4 ring-accent/20"
              />
              <div className="min-w-0 flex-1 pt-0.5">
                <TodayCopy />
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}