import type { Metadata } from "next";
import { ContactAnimations } from "@/components/contact/ContactAnimations";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactDetails } from "@/components/contact/contact-details";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { MapSection } from "@/components/contact/map-section";
import { ContactCta } from "@/components/contact/contact-cta";
import { getContactContent } from "@/lib/content";
import { getCategories } from "@/lib/catalog";

const content = getContactContent();

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function ContactPage() {
  const categories = getCategories();

  return (
    <ContactAnimations>
      <ContactHero hero={content.hero} />
      <ContactDetails
        intro={content.intro}
        details={content.contactDetails}
        note={content.note}
      />
      <EnquiryForm
        form={content.form}
        primaryContact={content.primaryContact}
        productCategories={categories.map((category) => category.name)}
      />
      <MapSection map={content.map} channels={content.channels} />
      <ContactCta cta={content.cta} />
    </ContactAnimations>
  );
}