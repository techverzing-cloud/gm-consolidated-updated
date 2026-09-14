import type { ClientsContent } from "@/lib/clients";

export function ClientsLogos({ content }: { content: ClientsContent }) {
  return (
    <section
      id="about-clients"
      className="bg-background-alt"
      aria-labelledby="clients-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div
          className="mx-auto max-w-2xl text-center"
          data-reveal
          data-reveal-stagger
        >
          <p
            data-reveal-child
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {content.eyebrow}
          </p>
          <h2
            id="clients-title"
            data-reveal-child
            className="mt-4 text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
          >
            {content.title}
          </h2>
          <p
            data-reveal-child
            className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            {content.description}
          </p>
        </div>

        <ul
          data-about-clients
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {content.logos.map((client) => (
            <li
              key={client.name}
              data-about-client-logo
              className="flex h-20 items-center justify-center bg-white px-4 transition-colors duration-300 hover:bg-background-alt"
            >
              <span className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-foreground/45">
                {client.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}