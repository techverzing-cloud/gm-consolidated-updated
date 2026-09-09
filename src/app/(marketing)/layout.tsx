import type { ReactNode } from "react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <SiteAnimations />
    </>
  );
}