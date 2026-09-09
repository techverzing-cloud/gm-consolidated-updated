import Link from "next/link";
import type { ContentCTA } from "@/lib/content";

export function CTASection({ cta }: { cta: ContentCTA }) {
  return (
    <section aria-label="Call to action" className="bg-white">
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start gap-8 rounded-sm bg-accent px-8 py-10 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {cta.title}
              {cta.highlight && (
                <span className="block">{cta.highlight}</span>
              )}
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/80">
              {cta.text}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {cta.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.variant === "navy-solid"
                    ? "btn-navy-solid btn-pulse-hover px-6 py-3 text-base"
                    : "btn-navy-ghost px-6 py-3 text-base"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}