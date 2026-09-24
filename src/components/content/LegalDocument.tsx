import type { LegalPage } from "@/lib/content";

export function LegalDocument({ document }: { document: LegalPage }) {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-12">
          {document.sections.map((section) => {
            const sectionId = section.heading
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
            return (
              <section key={section.heading} aria-labelledby={sectionId}>
                <h2
                  id={sectionId}
                  className="text-balance text-xl font-semibold leading-snug text-foreground sm:text-2xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-pretty text-base leading-relaxed text-foreground-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground-secondary">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}