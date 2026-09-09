import type { Metadata } from "next";
import { UnitPage } from "@/components/units/unit-page";
import { getUnit } from "@/lib/units";

const unit = getUnit("rao-industries");

export const metadata: Metadata = {
  title: unit.metadata.title,
  description: unit.metadata.description,
};

export default function RaoIndustriesPage() {
  return <UnitPage unit={unit} />;
}