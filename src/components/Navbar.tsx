"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { getCategories } from "@/lib/catalog";

const NAV_LINKS = [
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const categories = getCategories();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogWrapperRef = useRef<HTMLDivElement>(null);
  const catalogCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearCatalogCloseTimer = () => {
    if (catalogCloseTimerRef.current !== null) {
      clearTimeout(catalogCloseTimerRef.current);
      catalogCloseTimerRef.current = null;
    }
  };

  const openCatalog = () => {
    clearCatalogCloseTimer();
    setCatalogOpen(true);
  };

  const scheduleCatalogClose = () => {
    clearCatalogCloseTimer();
    catalogCloseTimerRef.current = setTimeout(() => {
      catalogCloseTimerRef.current = null;
      setCatalogOpen(false);
    }, 200);
  };

  useEffect(
    () => () => {
      if (catalogCloseTimerRef.current !== null) {
        clearTimeout(catalogCloseTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!catalogOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!catalogWrapperRef.current?.contains(event.target as Node)) {
        setCatalogOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCatalogOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [catalogOpen]);

  return (
    <header
      id="site-navbar"
      className={`sticky top-0 z-50 w-full border-b bg-white transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-border shadow-[0_18px_36px_-24px_rgba(9,48,111,0.3)]"
          : "border-border/50 shadow-none"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1320px] items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-14 sm:h-16" : "h-16 sm:h-[72px]"
        }`}
      >
        <Link
          href="/"
          aria-label="G.M. Consolidated — Home"
          className="flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src="/logo/gm-logo.png"
            alt="G.M. Consolidated logo"
            width={591}
            height={326}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          <Link
            href="/about"
            className="nav-underline text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            About
          </Link>

          <div
            ref={catalogWrapperRef}
            className="relative"
            onMouseEnter={openCatalog}
            onMouseLeave={scheduleCatalogClose}
          >
            <Link
              href="/catalog"
              aria-haspopup="true"
              aria-expanded={catalogOpen}
              aria-controls="catalog-menu"
              onFocus={() => setCatalogOpen(true)}
              onClick={() => setCatalogOpen(false)}
              className="nav-underline inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Catalog
              <Icon
                icon="mdi:chevron-down"
                size={16}
                className={`transition-transform duration-200 ${
                  catalogOpen ? "rotate-180" : ""
                }`}
              />
            </Link>

            <div
              id="catalog-menu"
              onMouseEnter={clearCatalogCloseTimer}
              onMouseLeave={scheduleCatalogClose}
              className={`absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-sm border border-border bg-white p-1.5 shadow-xl transition-[opacity,transform] duration-200 ease-out ${
                catalogOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-1 opacity-0"
              }`}
            >
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/catalog/${category.slug}`}
                      onClick={() => setCatalogOpen(false)}
                      className="group flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-background-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="text-xs font-semibold tabular-nums text-accent">
                        {category.number}
                      </span>
                      <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-border-light pt-1">
                  <Link
                    href="/catalog"
                    onClick={() => setCatalogOpen(false)}
                    className="flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-background-alt hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    View full catalogue
                    <Icon icon="mdi:arrow-right" size={16} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-underline text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-primary hidden px-5 py-2.5 text-sm lg:inline-flex"
          >
            Request Enquiry
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-border-light bg-white px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col">
            <li>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block border-b border-border-light py-3 text-base text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-base font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Catalog
              </Link>
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/catalog/${category.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 border-b border-border-light py-2.5 pl-5 text-sm text-foreground-secondary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="text-xs font-semibold tabular-nums text-accent">
                        {category.number}
                      </span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-border-light py-3 text-base text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4 w-full px-5 py-3 text-base"
          >
            Request Enquiry
          </Link>
        </nav>
      )}
    </header>
  );
}