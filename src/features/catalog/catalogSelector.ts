import { RootState } from "@/app/store";
import { IProduct } from "@/api/category";

export const selectFilteredProducts = (
  state: RootState,
  products: IProduct[]
) => {
  const { brand, stock, minValue, maxValue } = state.catalog;

  return products.filter((p) => {
    if (brand.length > 0 && !brand.includes(p.brand)) {
      return false;
    }

    if (stock.length > 0) {
      const inStock = p.stock > 0 ? "Да" : "Нет";
      if (!stock.includes(inStock)) {
        return false;
      }
    }

    if (minValue !== null && p.price < minValue) return false;
    if (maxValue !== null && p.price > maxValue) return false;

    return true;
  });
};
