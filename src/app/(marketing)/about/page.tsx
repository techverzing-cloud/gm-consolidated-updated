import type { Metadata } from "next";
import { AboutAnimations } from "@/components/about/AboutAnimations";
import { AboutHero } from "@/components/about/about-hero";
import { CorporateStatement } from "@/components/about/corporate-statement";
import { CompanyProfile } from "@/components/about/company-profile";
import { CompanyFacts } from "@/components/about/company-facts";
import { PhilosophySection } from "@/components/about/philosophy-section";
import { CapabilitiesSection } from "@/components/about/capabilities-section";
import { ProductEcosystem } from "@/components/about/product-ecosystem";
import { EngineeringStrength } from "@/components/about/engineering-strength";
import { ManufacturingStrength } from "@/components/about/manufacturing-strength";
import { QualityPositioning } from "@/components/about/quality-positioning";
import { CertificationsExpertise } from "@/components/about/certifications-expertise";
import { BusinessPositioning } from "@/components/about/business-positioning";
import { LeadershipSection } from "@/components/about/leadership-section";
import { TimelineSection } from "@/components/about/about-timeline";
import { FaqSection } from "@/components/about/faq-section";
import { CorporateOffice } from "@/components/about/corporate-office";
import { AboutCta } from "@/components/about/about-cta";
import { Brands } from "@/components/shared/brands";
import { ManufacturingUnits } from "@/components/shared/manufacturing-units";
import { ProductMatrix } from "@/components/shared/product-matrix";
import { getAboutContent } from "@/lib/about";
import { getFaqContent } from "@/lib/faq";
import { buildPageMetadata } from "@/lib/metadata";

const content = getAboutContent();
const faq = getFaqContent();

export const metadata: Metadata = buildPageMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <AboutAnimations>
      <AboutHero hero={content.hero} />
      <CorporateStatement statement={content.corporateStatement} />
      
      <CompanyProfile profile={content.companyProfile} facts={content.companyFacts} />
      <CompanyFacts facts={content.companyFacts} />
      <LeadershipSection section={content.leadership} />
      {/* <TimelineSection timeline={content.timeline} /> */}
      <PhilosophySection philosophy={content.philosophy} />
      <CapabilitiesSection capabilities={content.whatWeDo} />
      <ManufacturingUnits section={content.manufacturingInfrastructure} scope="about" />
      <ProductEcosystem section={content.productEcosystem} />
      <EngineeringStrength section={content.engineeringStrength} />
      <ProductMatrix period="yearly" />
      <ManufacturingStrength section={content.manufacturingStrength} />
      <QualityPositioning section={content.qualityPositioning} />
      <CertificationsExpertise section={content.certifications} />
      <BusinessPositioning section={content.businessPositioning} />
      <Brands id="about-brands" />
      <CorporateOffice office={content.corporateOffice} />
      <FaqSection content={faq} />
      <AboutCta closing={content.closingStatement} />
    </AboutAnimations>
  );
}