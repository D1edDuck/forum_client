import { IFilter, IProduct } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductData {
  products: IProduct[];
  filterProducts: IProduct[];
}

const initialState: IProductData = {
  products: [],
  filterProducts: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    filterData(state, action: PayloadAction<IFilter>) {
      console.log(action.payload);
      state.filterProducts = filter(action.payload, state.products); // отправляем фильтроваться
    },
    getProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
      state.filterProducts = action.payload;
    },
    getFindProducts(state, action: PayloadAction<IProduct[]>) {
      state.filterProducts = action.payload;
    },
  },
});

function filter(filter: IFilter, products: IProduct[]): IProduct[] {
  const { brand, stock, minValue, maxValue } = filter;

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

export default productSlice.reducer;
export const { getProducts, filterData, getFindProducts } =
  productSlice.actions;
