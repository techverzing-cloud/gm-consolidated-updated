import { Icon } from "@/components/ui/Icon";
import type { AboutCorporateOffice } from "@/lib/about";

export function CorporateOffice({ office }: { office: AboutCorporateOffice }) {
  return (
    <section
      id="about-office"
      data-about-office
      className="bg-background-alt"
      aria-labelledby="office-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {office.eyebrow}
            </p>
            <h2
              id="office-title"
              className="mt-5 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
            >
              {office.title}
            </h2>

            <p
              data-about-office-address
              className="mt-8 flex items-start gap-3 text-pretty text-base leading-relaxed text-foreground sm:text-lg"
            >
              <Icon
                icon="mdi:map-marker-outline"
                size={20}
                className="mt-1 shrink-0 text-accent"
              />
              <span>{office.address}</span>
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="space-y-10">
              <a
                data-about-office-contact
                href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
                className="group block"
              >
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-foreground-secondary">
                  {office.phoneLabel}
                </p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                  <Icon icon="mdi:phone-outline" size={22} className="text-accent" />
                  {office.phone}
                </p>
              </a>

              <a
                data-about-office-contact
                href={`mailto:${office.email}`}
                className="group block"
              >
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-foreground-secondary">
                  {office.emailLabel}
                </p>
                <p className="mt-2 flex items-center gap-2 break-all text-2xl font-semibold text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                  <Icon icon="mdi:email-outline" size={22} className="text-accent" />
                  {office.email}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}