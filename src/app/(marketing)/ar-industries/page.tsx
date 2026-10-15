import type { Metadata } from "next";
import { UnitPage } from "@/components/units/unit-page";
import { getUnit } from "@/lib/units";
import { buildPageMetadata } from "@/lib/metadata";

const unit = getUnit("ar-industries");

export const metadata: Metadata = buildPageMetadata({
  title: unit.metadata.title,
  description: unit.metadata.description,
  path: "/ar-industries",
});

export default function ArIndustriesPage() {
  return <UnitPage unit={unit} />;
}