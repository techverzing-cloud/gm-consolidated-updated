import type { CatalogCategory, CatalogProduct } from "@/lib/catalog";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";
import { BASE_URL, SITE_INFO } from "@/data/site";

export type JsonLdData = Record<string, unknown>;

export function organizationSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo/gm-logo.png`,
    description: SITE_DESCRIPTION,
    foundingDate: "1983",
    telephone: SITE_INFO.phone,
    email: SITE_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_INFO.address,
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE_INFO.phone,
        email: SITE_INFO.email,
        areaServed: "IN",
        availableLanguage: "en",
      },
    ],
  };
}

export function productSchema(
  product: CatalogProduct,
  category: CatalogCategory
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    model: product.code,
    image: [`${BASE_URL}${product.image}`],
    description: product.description ?? product.shortDescription,
    category: category.name,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    url: `${BASE_URL}/catalog/${category.slug}/${product.slug}`,
  };
}
