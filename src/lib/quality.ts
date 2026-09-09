import qualityData from "../../data/quality.json";

export interface QualityMetadata {
  title: string;
  description: string;
}

export interface QualityHero {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface QualityPhilosophy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface QualityInspectionStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface QualityInspectionProcess {
  eyebrow: string;
  title: string;
  steps: QualityInspectionStep[];
}

export interface QualitySystem {
  title: string;
  description: string;
  icon: string;
}

export interface QualitySystems {
  eyebrow: string;
  title: string;
  items: QualitySystem[];
}

export interface QualityLaboratory {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface QualityClosing {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
  href: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
  imageAlt: string;
}

export interface QualityData {
  metadata: QualityMetadata;
  hero: QualityHero;
  philosophy: QualityPhilosophy;
  inspectionProcess: QualityInspectionProcess;
  qualitySystems: QualitySystems;
  laboratory: QualityLaboratory;
  cta: QualityClosing;
}

const quality = qualityData as unknown as QualityData;

export function getQualityPageContent(): QualityData {
  return quality;
}