import type { Metadata } from "next";
import { AboutAnimations } from "@/components/about/AboutAnimations";
import { AboutHero } from "@/components/about/about-hero";
import { CorporateStatement } from "@/components/about/corporate-statement";
import { CompanyProfile } from "@/components/about/company-profile";
import { CompanyFacts } from "@/components/about/company-facts";
import { PhilosophySection } from "@/components/about/philosophy-section";
import { CapabilitiesSection } from "@/components/about/capabilities-section";
import { InfrastructureSection } from "@/components/about/infrastructure-section";
import { ProductEcosystem } from "@/components/about/product-ecosystem";
import { EngineeringStrength } from "@/components/about/engineering-strength";
import { ManufacturingStrength } from "@/components/about/manufacturing-strength";
import { QualityPositioning } from "@/components/about/quality-positioning";
import { BusinessPositioning } from "@/components/about/business-positioning";
import { LeadershipSection } from "@/components/about/leadership-section";
import { CorporateOffice } from "@/components/about/corporate-office";
import { AboutCta } from "@/components/about/about-cta";
import { getAboutContent } from "@/lib/about";

const content = getAboutContent();

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function AboutPage() {
  return (
    <AboutAnimations>
      <AboutHero hero={content.hero} />
      <CorporateStatement statement={content.corporateStatement} />
      <CompanyProfile profile={content.companyProfile} facts={content.companyFacts} />
      <CompanyFacts facts={content.companyFacts} />
      <PhilosophySection philosophy={content.philosophy} />
      <CapabilitiesSection capabilities={content.whatWeDo} />
      <InfrastructureSection section={content.manufacturingInfrastructure} />
      <ProductEcosystem section={content.productEcosystem} />
      <EngineeringStrength section={content.engineeringStrength} />
      <ManufacturingStrength section={content.manufacturingStrength} />
      <QualityPositioning section={content.qualityPositioning} />
      <BusinessPositioning section={content.businessPositioning} />
      <LeadershipSection section={content.leadership} />
      <CorporateOffice office={content.corporateOffice} />
      <AboutCta closing={content.closingStatement} />
    </AboutAnimations>
  );
}