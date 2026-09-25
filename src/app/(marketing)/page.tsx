import { Hero } from "@/components/home/Hero";
import { HeroContent } from "@/components/home/HeroContent";
import { Engineering } from "@/components/home/Engineering";
import { Catalog } from "@/components/home/Catalog";
import { Manufacturing } from "@/components/home/Manufacturing";
import { Quality } from "@/components/home/Quality";
import { OemOdm } from "@/components/home/OemOdm";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroContent />
      <Catalog />
      <Engineering />
      <Manufacturing />
      <Quality />
      <OemOdm />
    </>
  );
}