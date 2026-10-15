import productMatrixData from "../../data/product-matrix.json";

export type CapacityPeriod = "monthly" | "yearly";

export interface ProductCapacityItem {
  id: string;
  quantity: string;
  label: string;
  image: string;
  imageAlt: string;
}

export interface CapacityPeriodCopy {
  title: string;
  products: ProductCapacityItem[];
}

export interface ProductMatrixData {
  eyebrow: string;
  subtitle: string;
  periods: Record<CapacityPeriod, CapacityPeriodCopy>;
}

const productMatrix = productMatrixData as ProductMatrixData;

export function getProductMatrix(): ProductMatrixData {
  return productMatrix;
}
