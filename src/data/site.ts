import contactData from "../../data/contact.json";

const contact = contactData as {
  primaryContact: {
    phone: string;
    email: string;
    address: string;
    addressShort: string;
    units: string;
  };
};

export const SITE_INFO = {
  phone: contact.primaryContact.phone,
  email: contact.primaryContact.email,
  address: contact.primaryContact.address,
  addressShort: contact.primaryContact.addressShort,
  units: contact.primaryContact.units,
};

export const SOCIALS = [
  { label: "LinkedIn", icon: "mdi:linkedin", href: "#" },
  { label: "Facebook", icon: "mdi:facebook", href: "#" },
  { label: "Instagram", icon: "mdi:instagram", href: "#" },
];