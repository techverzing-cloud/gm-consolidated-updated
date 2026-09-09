import oemOdmData from "../../data/oem-odm.json";

export interface OemOdmMetadata {
  title: string;
  description: string;
}

export interface OemOdmHero {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface OemOdmEngagementModel {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface OemOdmEngagement {
  eyebrow: string;
  title: string;
  models: OemOdmEngagementModel[];
}

export interface OemOdmJourneyStep {
  number: string;
  title: string;
  description: string;
}

export interface OemOdmJourney {
  eyebrow: string;
  title: string;
  steps: OemOdmJourneyStep[];
}

export interface OemOdmCapability {
  title: string;
  description: string;
  icon: string;
}

export interface OemOdmCapabilities {
  eyebrow: string;
  title: string;
  items: OemOdmCapability[];
}

export interface OemOdmAudience {
  eyebrow: string;
  title: string;
  items: string[];
}

export interface OemOdmBrandProcess {
  eyebrow: string;
  words: string[];
}

export interface OemOdmClosing {
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

export interface OemOdmData {
  metadata: OemOdmMetadata;
  hero: OemOdmHero;
  engagementModels: OemOdmEngagement;
  journey: OemOdmJourney;
  capabilities: OemOdmCapabilities;
  whoWeWorkWith: OemOdmAudience;
  brandProcess: OemOdmBrandProcess;
  cta: OemOdmClosing;
}

const oemOdm = oemOdmData as unknown as OemOdmData;

export function getOemOdmPageContent(): OemOdmData {
  return oemOdm;
}