import { Icon } from "@/components/ui/Icon";
import type { FaqContent } from "@/lib/faq";

export function FaqSection({ content }: { content: FaqContent }) {
  return (
    <section
      id="about-faq"
      className="bg-white"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-[920px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header
          className="mx-auto max-w-2xl text-center"
          data-reveal
          data-reveal-stagger
        >
          <p
            data-reveal-child
            className="text-base font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {content.eyebrow}
          </p>
          <h2
            id="faq-title"
            data-reveal-child
            className="mt-4 text-balance text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl"
          >
            {content.title}
          </h2>
          <p
            data-reveal-child
            className="mt-5 text-pretty text-lg leading-relaxed text-foreground-secondary sm:text-xl"
          >
            {content.description}
          </p>
        </header>

        <div
          data-about-faq
          className="mt-12 space-y-4"
          data-reveal
          data-reveal-stagger
        >
          {content.items.map((item) => (
            <details
              key={item.question}
              data-about-faq-item
              data-reveal-child
              className="group rounded-sm border border-border bg-background-alt open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  <Icon icon="lucide:plus" size={18} />
                </span>
              </summary>
              <p className="px-6 pb-6 text-pretty text-lg leading-relaxed text-foreground-secondary">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}