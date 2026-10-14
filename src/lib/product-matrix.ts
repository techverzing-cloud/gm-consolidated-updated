import productMatrixData from "../../data/product-matrix.json";

export type CapacityPeriod = "monthly" | "yearly";

export interface ProductCapacityItem {
  id: string;
  quantity: Record<CapacityPeriod, string>;
  label: string;
  image: string;
  imageAlt: string;
}

export interface CapacityPeriodCopy {
  title: string;
}

export interface ProductMatrixData {
  eyebrow: string;
  subtitle: string;
  periods: Record<CapacityPeriod, CapacityPeriodCopy>;
  products: ProductCapacityItem[];
}

const productMatrix = productMatrixData as ProductMatrixData;

export function getProductMatrix(): ProductMatrixData {
  return productMatrix;
}
