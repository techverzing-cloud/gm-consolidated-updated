import aboutData from "../../data/about.json";

export interface AboutMetadata {
  title: string;
  description: string;
}

export interface AboutHero {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface AboutStatement {
  eyebrow: string;
  title: string;
  description: string;
}

export interface AboutCompanyProfile extends AboutStatement {
  paragraphs: string[];
}

export interface AboutFact {
  value: string;
  suffix: string;
  label: string;
}

export interface AboutPrinciple {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutCapability extends AboutPrinciple {}

export interface AboutUnit {
  number: string;
  name: string;
  location: string;
  focus: string;
  image: string;
  imageAlt: string;
}

export interface AboutCategory {
  number: string;
  name: string;
  description: string;
  icon: string;
  href: string;
}

export interface AboutMetric {
  value: string;
  suffix: string;
  label: string;
}

export interface AboutQualityPoint {
  title: string;
  description: string;
  icon: string;
}

export interface AboutBusinessModel {
  title: string;
  description: string;
  icon: string;
}

export interface AboutSubSection {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface AboutEngineeringStrength extends AboutSubSection {
  image: string;
  imageAlt: string;
  flow: string[];
  points: string[];
}

export interface AboutManufacturingInfrastructure extends AboutSubSection {
  units: AboutUnit[];
}

export interface AboutProductEcosystem extends AboutSubSection {
  categories: AboutCategory[];
}

export interface AboutManufacturingStrength extends AboutSubSection {
  metrics: AboutMetric[];
}

export interface AboutQualityPositioning extends AboutSubSection {
  points: AboutQualityPoint[];
}

export interface AboutBusinessPositioning extends AboutSubSection {
  models: AboutBusinessModel[];
}

export interface AboutCorporateOffice {
  eyebrow: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  phoneLabel: string;
  emailLabel: string;
}

export interface AboutClosingStatement {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface AboutData {
  metadata: AboutMetadata;
  hero: AboutHero;
  corporateStatement: AboutStatement;
  companyProfile: AboutCompanyProfile;
  companyFacts: AboutFact[];
  philosophy: AboutSubSection & { principles: AboutPrinciple[] };
  whatWeDo: AboutSubSection & { capabilities: AboutCapability[] };
  manufacturingInfrastructure: AboutManufacturingInfrastructure;
  productEcosystem: AboutProductEcosystem;
  engineeringStrength: AboutEngineeringStrength;
  manufacturingStrength: AboutManufacturingStrength;
  qualityPositioning: AboutQualityPositioning;
  businessPositioning: AboutBusinessPositioning;
  corporateOffice: AboutCorporateOffice;
  closingStatement: AboutClosingStatement;
}

const about = aboutData as unknown as AboutData;

export function getAboutContent(): AboutData {
  return about;
}

export interface MetricParts {
  prefix: string;
  count: number;
  suffix: string;
}

/**
 * Splits a metric value into a countable numeric core with static
 * prefix/suffix. Returns null when the value contains no digits.
 *
 *   "1983"        → { prefix: "",  count: 1983, suffix: "" }
 *   "40+" "years" → { prefix: "",  count: 40,   suffix: "+ years" }
 *   "120–250" "T" → { prefix: "120–", count: 250, suffix: "T" }
 */
export function parseMetric(value: string, suffix = ""): MetricParts | null {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, trailer] = match;
  return {
    prefix,
    count: Number(digits),
    suffix: `${trailer}${suffix}`,
  };
}