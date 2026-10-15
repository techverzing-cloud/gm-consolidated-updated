import type { Metadata } from "next";

export const SITE_NAME = "G.M. Consolidated";

export const SITE_TITLE =
  "G.M. Consolidated | Home Appliance OEM/ODM Manufacturer";

export const SITE_DESCRIPTION =
  "Reliable home appliance OEM and ODM manufacturing. From product development to quality control, we deliver home appliances for brands and businesses.";

export const SHARE_IMAGE = {
  url: "/logo/gm-logo.png",
  width: 591,
  height: 326,
  alt: SITE_NAME,
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
