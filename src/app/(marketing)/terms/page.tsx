import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { LegalDocument } from "@/components/content/LegalDocument";
import { CTASection } from "@/components/content/CTASection";
import { getTermsContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

const document = getTermsContent();

export const metadata: Metadata = buildPageMetadata({
  title: document.metadata.title,
  description: document.metadata.description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
        eyebrow={document.header.eyebrow}
        title={document.header.title}
        intro={document.header.intro}
      />

      <section className="bg-white" aria-label="Terms and conditions">
        <LegalDocument document={document} />
      </section>

      <CTASection cta={document.cta} />
    </div>
  );
}
