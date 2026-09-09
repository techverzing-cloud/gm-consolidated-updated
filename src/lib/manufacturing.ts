import manufacturingData from "../../data/manufacturing.json";

export interface ManufacturingMetadata {
  title: string;
  description: string;
}

export interface ManufacturingHero {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ManufacturingIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ManufacturingMetric {
  value: string;
  suffix: string;
  label: string;
}

export interface ManufacturingStep {
  number: string;
  title: string;
  description: string;
}

export interface ManufacturingGroup {
  number: string;
  title: string;
  icon: string;
  details: string[];
}

export interface ManufacturingStage {
  title: string;
  icon: string;
}

export interface ManufacturingUnit {
  number: string;
  name: string;
  location: string;
  focus: string;
  image: string;
  imageAlt: string;
}

export interface ManufacturingSubSection {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ManufacturingProductionFlow extends ManufacturingSubSection {
  steps: ManufacturingStep[];
}

export interface ManufacturingCoreCapabilities extends ManufacturingSubSection {
  groups: ManufacturingGroup[];
}

export interface ManufacturingIntegration extends ManufacturingSubSection {
  note: string;
  stages: ManufacturingStage[];
}

export interface ManufacturingUnits extends ManufacturingSubSection {
  units: ManufacturingUnit[];
}

export interface ManufacturingQualityBridge {
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ManufacturingClosing {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface ManufacturingData {
  metadata: ManufacturingMetadata;
  hero: ManufacturingHero;
  intro: ManufacturingIntro;
  metrics: ManufacturingMetric[];
  productionFlow: ManufacturingProductionFlow;
  coreCapabilities: ManufacturingCoreCapabilities;
  integration: ManufacturingIntegration;
  units: ManufacturingUnits;
  qualityBridge: ManufacturingQualityBridge;
  closing: ManufacturingClosing;
}

const manufacturing = manufacturingData as unknown as ManufacturingData;

export function getManufacturingContent(): ManufacturingData {
  return manufacturing;
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
 *   "3"          → { prefix: "",  count: 3,    suffix: "" }
 *   "120–250" "T" → { prefix: "120–", count: 250, suffix: "T" }
 *   "4M"         → { prefix: "",  count: 4,    suffix: "M" }
 *   "20+" " years" → { prefix: "",  count: 20,   suffix: "+ years" }
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