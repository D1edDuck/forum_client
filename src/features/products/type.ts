export type Category =
  | "notebooks"
  | "desktops"
  | "peripherals"
  | "components"
  | "services";

export interface Product {
  id: string;
  title: string;
  price: number;
  inStock: boolean;
  category: Category;
  shortDescription?: string;
  description?: string;
  images?: string[];
}
