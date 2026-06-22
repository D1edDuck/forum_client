import { apiClient } from "@/api/apiClient";
import { ICatalog, IClient, IProduct, IRepair } from "@/api/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IUsersAll {
  count: number;
  users: IClient[];
}

export interface IProductAll {
  count: number;
  products: IProduct[];
}

export interface ICategoryAll {
  count: number;
  category: ICatalog[];
}

export interface IDbAllState {
  clients: IUsersAll;
  products: IProductAll;
  category: ICategoryAll;
  loading: boolean;
  error: string | null;
}

export const fetchUsersAll = createAsyncThunk<
  IUsersAll,
  void,
  { rejectValue: string }
>("db/fetchUsersAll", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient<IUsersAll>("users/all", "GET");
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});

export const fetchProductsAll = createAsyncThunk<
  IProductAll,
  void,
  { rejectValue: string }
>("db/fetchProductsAll", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient<IProductAll>("products", "GET");
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});

export const fetchCategoryAll = createAsyncThunk<
  ICategoryAll,
  void,
  { rejectValue: string }
>("db/categoryAll", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient<ICategoryAll>("category/count", "GET");
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});

export const deletedProduct = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>("db/deletedProduct", async ({ id }, { rejectWithValue }) => {
  try {
    await apiClient<void>(`products/${id}`, "DELETE");
    return { id };
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});

export const deletedUser = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>("db/deletedUser", async ({ id }, { rejectWithValue }) => {
  try {
    await apiClient<void>(`users/delete/${id}`, "DELETE");
    return { id };
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});

export const deletedCategory = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>("db/deletedCategory", async ({ id }, { rejectWithValue }) => {
  try {
    await apiClient<void>(`category/${id}`, "DELETE");
    return { id };
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk<
  IClient,
  { id: number; data: Partial<IClient> },
  { rejectValue: string }
>("db/updateUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiClient<IClient, Partial<IClient>>(
      `users/edit/${id}`,
      "PATCH",
      data,
    );
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }
    return rejectWithValue(message);
  }
});

export const uploadProductImage = createAsyncThunk<
  { imageUrl: string },
  { id: number; file: File },
  { rejectValue: string }
>("db/uploadProductImage", async ({ id, file }, { rejectWithValue }) => {
  try {
    const fd = new FormData();
    fd.append("image", file);
    const res = await apiClient<{ imageUrl: string }, FormData>(
      `products/${id}/image`,
      "POST",
      fd,
    );
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }
    return rejectWithValue(message);
  }
});

export const updateProduct = createAsyncThunk<
  IProduct,
  { id: number; data: Partial<IProduct> },
  { rejectValue: string }
>("db/updateProduct", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiClient<IProduct, Partial<IProduct>>(
      `products/${id}`,
      "PUT",
      data,
    );
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }
    return rejectWithValue(message);
  }
});

export const updateCategory = createAsyncThunk<
  ICatalog,
  { id: number; data: Partial<ICatalog> },
  { rejectValue: string }
>("db/updateCategory", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiClient<ICatalog, Partial<ICatalog>>(
      `category/${id}`,
      "PATCH",
      data,
    );
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }
    return rejectWithValue(message);
  }
});

export const updateRepair = createAsyncThunk<
  IRepair,
  { id: number; data: Partial<IRepair> },
  { rejectValue: string }
>("db/updateRepair", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiClient<IRepair, Partial<IRepair>>(
      `repair/status/${id}`,
      "PATCH",
      data,
    );
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }
    return rejectWithValue(message);
  }
});
