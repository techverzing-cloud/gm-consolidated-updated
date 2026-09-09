import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { StepGrid } from "@/components/content/StepGrid";
import { FeatureGrid } from "@/components/content/FeatureGrid";
import { ChipList } from "@/components/content/ChipList";
import { CTASection } from "@/components/content/CTASection";
import { getEngineeringContent } from "@/lib/content";

const content = getEngineeringContent();

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function EngineeringPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Engineering" },
        ]}
        eyebrow={content.header.eyebrow}
        title={content.header.title}
        intro={content.header.intro}
      />

      <section className="bg-white" aria-labelledby="process-heading">
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p
            id="process-heading"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-accent"
          >
            {content.process.label}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {content.process.title}
          </h2>
          <div className="mt-8">
            <StepGrid items={content.process.steps} cols={3} />
          </div>
        </div>
      </section>

      <section className="bg-background-alt" aria-labelledby="capabilities-heading">
        <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p
              id="capabilities-heading"
              className="text-sm font-semibold uppercase tracking-[0.14em] text-accent"
            >
              {content.capabilities.label}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold text-foreground sm:text-3xl">
              {content.capabilities.title}
            </h2>
          </div>
          <div className="mt-8">
            <FeatureGrid items={content.capabilities.items} />
          </div>
          <div className="mt-14">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              {content.supportingOperationsLabel}
            </p>
            <div className="mt-5">
              <ChipList items={content.supportingOperations} />
            </div>
          </div>
        </div>
      </section>

      <CTASection cta={content.cta} />
    </div>
  );
}