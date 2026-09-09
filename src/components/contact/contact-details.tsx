import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ContactDetail, ContactIntro } from "@/lib/content";

interface ContactDetailsProps {
  intro: ContactIntro;
  details: ContactDetail[];
  note: string;
}

export function ContactDetails({ intro, details, note }: ContactDetailsProps) {
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail) => {
              const cardClass =
                "group flex h-full flex-col rounded-sm border border-card-border bg-card p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md";

              const iconMark = (
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-background-alt text-accent transition-[transform] duration-300 group-hover:-rotate-3 group-hover:scale-110"
                >
                  <Icon icon={detail.icon} size={22} />
                </span>
              );

              return (
                <div
                  key={detail.id}
                  data-contact-card
                  className={cardClass}
                >
                  {iconMark}
                  <span className="mt-5 block text-sm font-medium text-foreground-secondary">
                    {detail.label}
                  </span>
                  {detail.href ? (
                    <Link
                      href={detail.href}
                      className="link-underline mt-1 block w-fit text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-accent"
                    >
                      {detail.value}
                    </Link>
                  ) : (
                    <span className="mt-1 block text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-accent">
                      {detail.value}
                    </span>
                  )}
                  {detail.description ? (
                    <span className="mt-2 block text-sm leading-relaxed text-foreground-secondary">
                      {detail.description}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-foreground-secondary">{note}</p>
        </div>
      </section>
    </>
  );
}