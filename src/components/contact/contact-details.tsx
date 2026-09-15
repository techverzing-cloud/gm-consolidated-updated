import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ContactDetail, ContactIntro } from "@/lib/content";

interface ContactDetailsProps {
  intro: ContactIntro;
  details: ContactDetail[];
  note: string;
}

export function ContactDetails({ intro, details, note }: ContactDetailsProps) {
  const [feature, ...channels] = details;

  const iconMark = (icon: string, size = 18) => (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-background-alt text-accent"
    >
      <Icon icon={icon} size={size} />
    </span>
  );

  return (
    <>
      <section
        data-contact-intro
        className="bg-background-alt"
        aria-label="About starting an enquiry"
      >
        <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {intro.eyebrow}
              </p>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl">
                {intro.title}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg">
                {intro.text}
              </p>
            </div>

            <ul className="flex flex-col justify-center gap-4 lg:col-span-5">
              {intro.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent"
                  >
                    <Icon icon="mdi:check-circle-outline" size={22} />
                  </span>
                  <span className="font-medium text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="contact-details"
        className="bg-white"
        aria-label="Ways to contact G.M. Consolidated"
      >
        <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div
                data-contact-card
                className="flex h-full flex-col rounded-sm border border-card-border bg-card p-8 shadow-sm"
              >
                {iconMark(feature.icon)}
                <p className="mt-6 text-sm font-medium text-foreground-secondary">
                  {feature.label}
                </p>
                <p className="mt-2 text-balance text-2xl font-semibold leading-[1.2] text-foreground">
                  {feature.value}
                </p>
                {feature.description ? (
                  <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-foreground-secondary">
                    {feature.description}
                  </p>
                ) : null}
              </div>
            </div>

            <ul className="divide-y divide-border rounded-sm border border-card-border bg-card shadow-sm lg:col-span-7">
              {channels.map((channel) => (
                <li
                  key={channel.id}
                  data-contact-card
                  className="flex items-center gap-4 p-6 sm:px-8"
                >
                  {iconMark(channel.icon)}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground-secondary">
                      {channel.label}
                    </p>
                    {channel.href ? (
                      <Link
                        href={channel.href}
                        className="link-underline mt-0.5 block w-fit truncate text-lg font-semibold text-foreground transition-colors duration-200 hover:text-accent"
                      >
                        {channel.value}
                      </Link>
                    ) : (
                      <p className="mt-0.5 text-lg font-semibold text-foreground">
                        {channel.value}
                      </p>
                    )}
                    {channel.description ? (
                      <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                        {channel.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-sm text-foreground-secondary">{note}</p>
        </div>
      </section>
    </>
  );
}