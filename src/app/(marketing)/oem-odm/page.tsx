import type { Metadata } from "next";
import { OemOdmAnimations } from "@/components/oem-odm/OemOdmAnimations";
import { OemOdmHero } from "@/components/oem-odm/oem-hero";
import { EngagementModels } from "@/components/oem-odm/oem-engagement";
import { PartnershipJourney } from "@/components/oem-odm/oem-journey";
import { Capabilities } from "@/components/oem-odm/oem-capabilities";
import { Audience } from "@/components/oem-odm/oem-audience";
import { BrandProcess } from "@/components/oem-odm/oem-brand";
import { ClosingCta } from "@/components/oem-odm/oem-closing-cta";
import { getOemOdmPageContent } from "@/lib/oem-odm";

const content = getOemOdmPageContent();

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function OemOdmPage() {
  return (
    <OemOdmAnimations>
      <OemOdmHero hero={content.hero} />
      <EngagementModels section={content.engagementModels} />
      <PartnershipJourney section={content.journey} />
      <Capabilities section={content.capabilities} />
      <Audience audience={content.whoWeWorkWith} />
      <BrandProcess section={content.brandProcess} />
      <ClosingCta closing={content.cta} />
    </OemOdmAnimations>
  );
}