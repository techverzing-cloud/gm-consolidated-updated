import type { AboutStatement } from "@/lib/about";

export function CorporateStatement({ statement }: { statement: AboutStatement }) {
  const lines = statement.title.split(/(?<=\.)\s+/);

  return (
    <section
      id="about-statement"
      className="bg-navy"
      aria-labelledby="statement-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div data-about-statement>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-400">
            {statement.eyebrow}
          </p>
          <h2
            id="statement-title"
            className="mt-8 max-w-4xl text-balance text-3xl font-semibold uppercase leading-[1.1] tracking-[-0.01em] text-white sm:text-5xl lg:text-6xl"
          >
            {lines.length > 1 ? (
              <>
                <span className="block">{lines[0]}</span>
                <span className="block text-accent-tint">{lines[1]}</span>
              </>
            ) : (
              statement.title
            )}
          </h2>
        </div>
        <div
          data-about-statement-rule
          className="mt-10 h-px max-w-4xl bg-red-500/70"
        />
      </div>
    </section>
  );
}