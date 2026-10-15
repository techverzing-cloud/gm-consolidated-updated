import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { PageLoader } from "@/components/ui/PageLoader";
import { BASE_URL } from "@/data/site";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SHARE_IMAGE,
} from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

{/**added layout.tsx file for metadata and viewport configuration */}
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "home appliances",
    "OEM manufacturing",
    "ODM manufacturing",
    "appliance manufacturer India",
    "contract manufacturing",
    "home appliances supplier",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
  icons: {
    icon: [
      { url: "/fav/favicon.ico", sizes: "any" },
      { url: "/fav/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/fav/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/fav/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/fav/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-base focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <PageLoader />
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>.page-loader{display:none !important}</style>",
          }}
        />
        {children}
      </body>
    </html>
  );
}