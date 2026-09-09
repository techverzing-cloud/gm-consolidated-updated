import unitsData from "../../data/units.json";

export interface UnitAddress {
  label: string;
  lines: string[];
}

export interface UnitFocus {
  label: string;
  value: string;
}

export interface UnitMetadata {
  title: string;
  description: string;
}

export interface Unit {
  id: string;
  route: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  paragraphs: string[];
  focus: UnitFocus;
  address: UnitAddress;
  metadata: UnitMetadata;
}

export interface UnitsData {
  units: Unit[];
}

const units = unitsData as unknown as UnitsData;

export function getUnits(): Unit[] {
  return units.units;
}

export function getUnit(id: string): Unit {
  const unit = units.units.find((entry) => entry.id === id);
  if (!unit) {
    throw new Error(`Unknown unit: ${id}`);
  }
  return unit;
}