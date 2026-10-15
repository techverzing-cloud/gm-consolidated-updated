import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { LegalDocument } from "@/components/content/LegalDocument";
import { CTASection } from "@/components/content/CTASection";
import { getPrivacyPolicyContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

const document = getPrivacyPolicyContent();

export const metadata: Metadata = buildPageMetadata({
  title: document.metadata.title,
  description: document.metadata.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        eyebrow={document.header.eyebrow}
        title={document.header.title}
        intro={document.header.intro}
      />

      <section className="bg-white" aria-label="Privacy policy">
        <LegalDocument document={document} />
      </section>

      <CTASection cta={document.cta} />
    </div>
  );
}
