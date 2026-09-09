import type { Metadata } from "next";
import { QualityAnimations } from "@/components/quality/QualityAnimations";
import { QualityHero } from "@/components/quality/quality-hero";
import { Philosophy } from "@/components/quality/quality-philosophy";
import { InspectionProcess } from "@/components/quality/quality-process";
import { Systems } from "@/components/quality/quality-systems";
import { Laboratory } from "@/components/quality/quality-laboratory";
import { ClosingCta } from "@/components/quality/quality-closing-cta";
import { getQualityPageContent } from "@/lib/quality";

const content = getQualityPageContent();

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function QualityPage() {
  return (
    <QualityAnimations>
      <QualityHero hero={content.hero} />
      <Philosophy section={content.philosophy} />
      <InspectionProcess section={content.inspectionProcess} />
      <Systems section={content.qualitySystems} />
      <Laboratory section={content.laboratory} />
      <ClosingCta closing={content.cta} />
    </QualityAnimations>
  );
}