import { fetchJSON } from "@/api/fetchJSON";
import { ICatalog, ICategory } from "./type";

export async function getCategories(): Promise<ICatalog[]> {
  return fetchJSON("/category"); // получаем все категории
}

export async function getCategory(id: string): Promise<ICategory> {
  return fetchJSON(`/category/${id}`);
}
