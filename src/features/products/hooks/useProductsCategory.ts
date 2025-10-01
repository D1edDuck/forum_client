import { useEffect, useState } from "react";
import { getCategory } from "@/api/fetchCategory";
import { getProducts } from "@/features/products/productsSlice";
import { ICategory, IProduct } from "@/api/type";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

export function useProductsCategory(id?: string) {
  const [category, setCategory] = useState<ICategory | null>(null);
  const [product, setProduct] = useState<IProduct[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      setCategory(null);
      setProduct([]);
      setCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    getCategory(id)
      .then((data) => {
        if (data) {
          setCategory(data);
          setProduct(data.products ?? []);
          setCount(data.count?.products ?? data.products?.length ?? 0);
          dispatch(getProducts(data.products)); //записываем в стейт товары
        } else {
          setCategory(null);
          setProduct([]);
          setCount(0);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id, dispatch]);

  return { category, product, count, loading, error };
}
