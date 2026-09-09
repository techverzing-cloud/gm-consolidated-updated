import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "G.M. Consolidated | Home Appliance OEM/ODM Manufacturer",
    template: "%s | G.M. Consolidated",
  },
  description:
    "Reliable home appliance OEM and ODM manufacturing. From product development to quality control, we deliver home appliances for brands and businesses.",
  keywords: [
    "home appliances",
    "OEM manufacturing",
    "ODM manufacturing",
    "appliance manufacturer India",
    "contract manufacturing",
    "home appliances supplier",
  ],
  openGraph: {
    title: "G.M. Consolidated | Home Appliance OEM/ODM Manufacturer",
    description:
      "Reliable home appliance OEM and ODM manufacturing for brands and businesses.",
    type: "website",
    locale: "en_IN",
    siteName: "G.M. Consolidated",
  },
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
        {children}
      </body>
    </html>
  );
}