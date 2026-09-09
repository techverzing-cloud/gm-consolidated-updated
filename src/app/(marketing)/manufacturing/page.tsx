import type { Metadata } from "next";
import { ManufacturingAnimations } from "@/components/manufacturing/ManufacturingAnimations";
import { ManufacturingHero } from "@/components/manufacturing/mfg-hero";
import { ManufacturingIntro } from "@/components/manufacturing/mfg-intro";
import { ManufacturingMetrics } from "@/components/manufacturing/mfg-metrics";
import { ProductionFlow } from "@/components/manufacturing/mfg-production-flow";
import { CoreCapabilities } from "@/components/manufacturing/mfg-core-capabilities";
import { IntegratedOperations } from "@/components/manufacturing/mfg-integrated-operations";
import { IndustrialUnits } from "@/components/manufacturing/mfg-units";
import { QualityBridge } from "@/components/manufacturing/mfg-quality-bridge";
import { ClosingCta } from "@/components/manufacturing/mfg-closing-cta";
import { getManufacturingContent } from "@/lib/manufacturing";

const content = getManufacturingContent();

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function ManufacturingPage() {
  return (
    <ManufacturingAnimations>
      <ManufacturingHero hero={content.hero} />
      <ManufacturingIntro intro={content.intro} />
      <ManufacturingMetrics metrics={content.metrics} />
      <ProductionFlow section={content.productionFlow} />
      <CoreCapabilities section={content.coreCapabilities} />
      <IntegratedOperations section={content.integration} />
      <IndustrialUnits section={content.units} />
      <QualityBridge bridge={content.qualityBridge} />
      <ClosingCta closing={content.closing} />
    </ManufacturingAnimations>
  );
}