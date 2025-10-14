import { ICategory, IFilter, IProduct } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductsSearch } from "./productsThunks";

interface IProductData {
  id: number;
  name: string;
  products: IProduct[];
  count: {
    products: number;
  };
  filterProducts: IProduct[];
  loading: boolean;
  error: null | string;
}

const initialState: IProductData = {
  id: 0,
  name: "",
  count: {
    products: 0,
  },
  products: [],
  filterProducts: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    filterData(
      state,
      action: PayloadAction<Omit<IFilter, "loading" | "error">>
    ) {
      console.log(action.payload);
      state.filterProducts = filter(action.payload, state.products); // отправляем фильтроваться
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.loading = false;
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.products = action.payload.products;
          state.count.products = action.payload?._count?.products ?? 0;
          state.filterProducts = action.payload.products; // сразу показываем все
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Ошибка загрузки";
      });

    builder
      .addCase(fetchProductsSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsSearch.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.filterProducts = action.payload; // сразу показываем все
        }
      )
      .addCase(fetchProductsSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Ошибка загрузки";
      });
  },
});

function filter(
  filter: Omit<IFilter, "loading" | "error">,
  products: IProduct[]
): IProduct[] {
  console.log(filter);
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
export const { filterData } = productSlice.actions;
