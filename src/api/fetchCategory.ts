import { fetchJSON } from "@/api/fetchJSON";

export interface ICatalog {
  id: number;
  name: string;
  slug?: string;
}

export interface IProduct {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  stock: number;
  description?: string | null;
}

export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
  _count?: { products: number } | null;
}

export async function getCategories(): Promise<ICatalog[]> {
  return fetchJSON("/api/category"); // получаем все категории
}

export async function getCategory(id: string): Promise<ICategory> {
  return fetchJSON(`/api/category/${id}`);
}
