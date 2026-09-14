import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
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

        <div className="mt-14 space-y-16 lg:space-y-20">
          {section.members.map((member, index) => {
            const flipped = index % 2 === 1;
            return (
              <div
                key={member.name}
                data-about-leadership
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div className={flipped ? "lg:order-2" : undefined}>
                  <div className="relative overflow-hidden rounded-sm border border-border bg-background-alt">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      width={member.image.width}
                      height={member.image.height}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="aspect-4/3 w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className={flipped ? "lg:order-1" : undefined}>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                    {member.title}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                    {member.name}
                  </h3>
                  <p className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary">
                    {member.bio}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {member.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-base"
                      >
                        <Icon
                          icon="mdi:check-circle-outline"
                          size={20}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}