import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/structured-data";

const WHATSAPP_URL = "https://wa.me/919971188883";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (+91 99711 88883)"
        className="group fixed bottom-5 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-14 sm:w-14"
      >
        <Icon icon="mdi:whatsapp" size={26} />
      </a>
      <SiteAnimations />
    </>
  );
}