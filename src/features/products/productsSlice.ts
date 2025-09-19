import { IProduct } from "@/api/category";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilter {
  brand: string[];
  stock: string[];
  minValue: number;
  maxValue: number;
}
interface IProductData {
  products: IProduct[];
  filterProducts: IProduct[];
  filterInput: string;
}

const initialState: IProductData = {
  products: [],
  filterProducts: [],
  filterInput: "",
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    filterData(state, action: PayloadAction<IFilter>) {
      const { brand, stock, maxValue, minValue } = action.payload; //инициализируем параметры

      state.filterProducts = filter(
        brand,
        stock,
        minValue,
        maxValue,
        state.products
      ); // отправляем фильтроваться
    },
    getProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
      state.filterProducts = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { getProducts, filterData } = productSlice.actions;

function filter(
  brand: string[],
  stock: string[],
  minValue: number,
  maxValue: number,
  products: IProduct[]
): IProduct[] {
  return products.filter((p) => {
    if (brand.length > 0 && !brand.includes(p.brand)) return false;

    if (stock.length > 0) {
      const inStock = p.stock > 0 ? "Да" : "Нет";
      if (!stock.includes(inStock)) return false;
    }

    if ((minValue && p.price < minValue) || (maxValue && p.price > maxValue))
      return false;

    return true;
  });
}
