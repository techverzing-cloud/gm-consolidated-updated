import Image from "next/image";
import type { AboutLeadership } from "@/lib/about";

export function LeadershipSection({ section }: { section: AboutLeadership }) {
  return (
    <section
      id="about-leadership"
      className="bg-white"
      aria-labelledby="leadership-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="leadership-title"
            className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {section.description}
          </p>
        </header>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {section.images.map((image) => (
            <figure
              key={image.src}
              data-about-leadership
              className="overflow-hidden rounded-sm border border-border bg-background-alt"
            >
              <div className="relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}