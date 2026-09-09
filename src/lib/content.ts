import engineeringData from "../../data/engineering.json";
import contactData from "../../data/contact.json";

export interface ContentLink {
  label: string;
  href: string;
  variant: "navy-solid" | "navy-ghost";
}

export interface ContentCTA {
  title: string;
  highlight?: string;
  text: string;
  links: ContentLink[];
}

export interface ContentPageMetadata {
  title: string;
  description: string;
}

export interface PageHeaderContent {
  eyebrow: string;
  title: string;
  intro: string;
}

export interface ProcessStep {
  number: string;
  icon?: string;
  title: string;
  text?: string;
  badge?: string;
}

export interface FeatureItem {
  name?: string;
  title?: string;
  text?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ContactChannel {
  title: string;
  icon: string;
  text: string;
}

export interface EngineeringPage {
  metadata: ContentPageMetadata;
  header: PageHeaderContent;
  process: { label: string; title: string; steps: ProcessStep[] };
  capabilities: { label: string; title: string; items: FeatureItem[] };
  supportingOperationsLabel: string;
  supportingOperations: string[];
  cta: ContentCTA;
}

export interface ContactHero {
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

export interface ContactIntro {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
}

export interface ContactDetail {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
  href: string;
}

export interface ContactFormField {
  label: string;
  placeholder: string;
  required: boolean;
  error?: string;
  errorInvalid?: string;
}

export interface ContactForm {
  title: string;
  description: string;
  enquiryTypes: string[];
  submitLabel: string;
  requiredNote: string;
  fallbackTitle: string;
  fallbackText: string;
  invalidMessage: string;
  fields: Record<string, ContactFormField>;
}

export interface ContactMap {
  eyebrow: string;
  title: string;
  name: string;
  detail: string;
  embedUrl: string;
  directionsHref: string;
  directionsLabel: string;
}

export interface ContactCta {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  primaryVariant: "navy-solid" | "navy-ghost";
  secondaryLabel: string;
  secondaryHref: string;
  secondaryVariant: "navy-solid" | "navy-ghost";
}

export interface ContactPage {
  metadata: ContentPageMetadata;
  hero: ContactHero;
  intro: ContactIntro;
  contactDetails: ContactDetail[];
  form: ContactForm;
  map: ContactMap;
  primaryContact: {
    phone: string;
    email: string;
    address: string;
    addressShort: string;
    units: string;
  };
  note: string;
  channels: ContactChannel[];
  cta: ContactCta;
}

const engineering = engineeringData as unknown as EngineeringPage;
const contact = contactData as unknown as ContactPage;

export function getEngineeringContent(): EngineeringPage {
  return engineering;
}

export function getContactContent(): ContactPage {
  return contact;
}