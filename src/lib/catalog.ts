import catalogData from "../../data/catalog.json";

export interface CatalogSpecification {
  label: string;
  value: string;
}

export interface CatalogImage {
  src: string;
  alt: string;
}

export interface CatalogHighlight {
  title: string;
  description: string;
  icon: string;
}

export interface CatalogPackaging {
  description: string;
  options: string[];
}

export interface CatalogEnquiry {
  title: string;
  description: string;
  href: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  code: string;
  categorySlug: string;
  shortDescription: string;
  description?: string;
  image: string;
  images?: CatalogImage[];
  highlights?: CatalogHighlight[];
  specifications?: CatalogSpecification[];
  features?: string[];
  applications?: string[];
  manufacturingNotes?: string[];
  qualityNotes?: string[];
  packaging?: CatalogPackaging;
  customization?: string[];
  enquiry?: CatalogEnquiry;
  relatedProducts?: string[];
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  number: string;
  tag: string;
  range: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  products: CatalogProduct[];
}

export interface CatalogData {
  categories: CatalogCategory[];
}

export interface CatalogProductWithCategory {
  product: CatalogProduct;
  category: CatalogCategory;
}

const catalog = catalogData as CatalogData;

export function getCategories(): CatalogCategory[] {
  return catalog.categories;
}

export function getCategory(slug: string): CatalogCategory | undefined {
  return catalog.categories.find((category) => category.slug === slug);
}

export function getProduct(
  categorySlug: string,
  productSlug: string
): CatalogProduct | undefined {
  return getCategory(categorySlug)?.products.find(
    (product) => product.slug === productSlug
  );
}

export function getProductWithCategory(
  productSlug: string
): CatalogProductWithCategory | undefined {
  for (const category of catalog.categories) {
    const product = category.products.find(
      (candidate) => candidate.slug === productSlug
    );
    if (product) return { product, category };
  }
  return undefined;
}

export function getRelatedProducts(
  product: CatalogProduct
): CatalogProductWithCategory[] {
  const related: CatalogProductWithCategory[] = [];
  for (const slug of product.relatedProducts ?? []) {
    const match = getProductWithCategory(slug);
    if (match && match.product.slug !== product.slug) related.push(match);
  }
  return related;
}