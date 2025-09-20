import { fetchJSON } from "@/api/fetchJSON";
import { ICatalog, ICategory } from "./type";

export async function getCategories(): Promise<ICatalog[]> {
  return fetchJSON("/api/category"); // получаем все категории
}

export async function getCategory(id: string): Promise<ICategory> {
  return fetchJSON(`/api/category/${id}`);
}
