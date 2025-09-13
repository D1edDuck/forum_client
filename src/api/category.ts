import { fetchJSON } from "@/api/fetchJSON";

export interface ICatalog {
  id: number;
  name: string;
  slug?: string;
}

export interface IProduct {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  stock?: number | null;
  brand?: string | null;
  attributes?: { character: string };
}

export interface ICategory {
  id: number;
  name: string;
  products?: IProduct[];
  _count?: { products: number } | null;
}

export async function getCategories(): Promise<ICatalog[]> {
  return fetchJSON("/api/category");
}

export async function getCategory(id: string): Promise<ICategory> {
  return fetchJSON(`/api/category/${id}`);
}
