import faqData from "../../data/faq.json";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
}

const faq = faqData as unknown as FaqContent;

export function getFaqContent(): FaqContent {
  return faq;
}