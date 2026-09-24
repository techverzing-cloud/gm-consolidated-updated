import type { MetadataRoute } from "next";
import { BASE_URL } from "@/data/site";
import { getCategories } from "@/lib/catalog";

type StaticRoute = {
  path: string;
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/ar-industries", priority: 0.8 },
  { path: "/catalog", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/engineering", priority: 0.8 },
  { path: "/manufacturing", priority: 0.8 },
  { path: "/oem-odm", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.6 },
  { path: "/quality", priority: 0.8 },
  { path: "/rao-industries", priority: 0.8 },
  { path: "/terms", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: `${BASE_URL}${path === "/" ? "" : path}`,
      changeFrequency: "weekly",
      priority,
    })
  );

  const categories = getCategories();

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/catalog/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = categories.flatMap(
    (category) =>
      category.products.map((product) => ({
        url: `${BASE_URL}/catalog/${category.slug}/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        images: [`${BASE_URL}${product.image}`],
      }))
  );

  return [...staticEntries, ...categoryEntries, ...productEntries];
}