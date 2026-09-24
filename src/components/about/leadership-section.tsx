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
          <p className="text-base font-semibold uppercase tracking-[0.16em] text-accent">
            {section.eyebrow}
          </p>
          <h2
            id="leadership-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {section.description}
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          {section.members.map((member, index) => (
            <article
              key={member.name}
              data-about-leadership
              className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-background-alt">
                <div data-about-parallax className="absolute inset-0">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm bg-white/95 text-sm font-semibold tabular-nums text-accent shadow-sm backdrop-blur-sm ring-1 ring-border"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <p className="text-base font-semibold uppercase tracking-[0.16em] text-accent">
                  {member.title}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                  {member.name}
                </h3>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary">
                  {member.bio}
                </p>
                <ul className="mt-7 space-y-3 border-t border-border pt-6">
                  {member.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-base leading-relaxed text-foreground sm:text-lg"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-accent/10 text-accent"
                      >
                        <Icon icon="lucide:check" size={16} />
                      </span>
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}