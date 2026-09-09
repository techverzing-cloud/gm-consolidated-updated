import type { Metadata } from "next";
import { UnitPage } from "@/components/units/unit-page";
import { getUnit } from "@/lib/units";

const unit = getUnit("ar-industries");

export const metadata: Metadata = {
  title: unit.metadata.title,
  description: unit.metadata.description,
};

export default function ArIndustriesPage() {
  return <UnitPage unit={unit} />;
}