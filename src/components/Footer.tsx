import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SITE_INFO, SOCIALS } from "@/data/site";
import { getCategories } from "@/lib/catalog";

const QUICK_LINKS = [
  { label: "Catalog", href: "/catalog" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Engineering", href: "/engineering" },
  { label: "Quality", href: "/quality" },
  { label: "OEM / ODM", href: "/oem-odm" },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms", "Sitemap"];

export function Footer() {
  const categories = getCategories();

  return (
    <>
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden bg-navy"
        aria-labelledby="cta-heading"
      >
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/factory/plant-wide.jpg"
            alt=""
            fill
            sizes="100vw"
            data-parallax="26"
            className="scale-110 object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/55" />
        </div>

        <div
          className="relative mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
          data-reveal
        >
          <div className="max-w-xl">
            <h2
              id="cta-heading"
              className="text-balance text-3xl font-semibold leading-[1.1] text-white sm:text-4xl"
            >
              Let&apos;s Build Your Next Appliance.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              From a single model to a full product line — engineering,
              tooling, manufacturing and testing under one roof.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/oem-odm"
                className="btn-navy-solid btn-pulse-hover px-6 py-3 text-base"
              >
                Request OEM / ODM Enquiry
              </Link>
              <Link
                href="/manufacturing"
                className="btn-navy-ghost px-6 py-3 text-base"
              >
                Explore Manufacturing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-navy-border bg-navy">
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-12"
            data-reveal
            data-reveal-stagger
          >
            <div data-reveal-child>
              <Image
                src="/logo/gm-logo-light.png"
                alt="G.M. Consolidated logo"
                width={591}
                height={326}
                className="h-9 w-auto"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-muted">
                Three industrial units in Kala Amb, Himachal Pradesh,
                manufacturing home appliances for OEM, ODM and private-label
                programmes since 1983.
              </p>
              <p className="mt-4 text-sm font-medium text-white/90">
                Home Appliance Manufacturing &nbsp;&middot;&nbsp; OEM / ODM
              </p>
              <div className="mt-6 flex items-center gap-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`G.M. Consolidated on ${social.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-sm text-navy-muted transition-[color,transform] duration-200 hover:-rotate-6 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon icon={social.icon} size={17} />
                  </a>
                ))}
              </div>
            </div>

            <div data-reveal-child>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Quick Links
              </h3>
              <ul className="mt-5 space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline inline-flex items-center gap-2 text-sm text-navy-muted transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Icon icon="mdi:chevron-right" size={15} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal-child>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Catalog
              </h3>
              <ul className="mt-5 space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/catalog/${category.slug}`}
                      className="link-underline inline-flex items-center gap-2 text-sm text-navy-muted transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Icon icon="mdi:chevron-right" size={15} />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal-child>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Contact
              </h3>
              <ul className="mt-5 space-y-4">
                <li>
                  <p className="flex items-start gap-3 text-sm text-navy-muted">
                    <Icon
                      icon="mdi:phone-outline"
                      size={18}
                      className="mt-0.5 shrink-0 text-white/80"
                    />
                    {SITE_INFO.phone}
                  </p>
                </li>
                <li>
                  <p className="flex items-start gap-3 text-sm text-navy-muted">
                    <Icon
                      icon="mdi:email-outline"
                      size={18}
                      className="mt-0.5 shrink-0 text-white/80"
                    />
                    {SITE_INFO.email}
                  </p>
                </li>
                <li>
                  <p className="flex items-start gap-3 text-sm leading-relaxed text-navy-muted">
                    <Icon
                      icon="mdi:map-marker-outline"
                      size={18}
                      className="mt-0.5 shrink-0 text-white/80"
                    />
                    {SITE_INFO.address}
                  </p>
                </li>
              </ul>
              <Link
                href="/contact"
                className="btn-navy-ghost mt-7 px-5 py-2.5 text-sm"
              >
                Request a business enquiry
              </Link>
            </div>
          </div>

          <div
            className="mt-14 flex flex-col items-center gap-4 border-t border-navy-border pt-6 sm:flex-row sm:justify-between"
            data-reveal
          >
            <p className="text-sm text-navy-muted">
              &copy; 2026 G.M. Consolidated. All rights reserved.
            </p>
            <ul className="flex items-center gap-6">
              {LEGAL_LINKS.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="link-underline text-sm text-navy-muted transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}