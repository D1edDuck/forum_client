import { useEffect, useState } from "react";
import { getCategory, ICategory, IProduct } from "@/api/category";

export function useCategory(id?: string) {
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCategory(null);
      setProducts([]);
      setCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    getCategory(id)
      .then((data) => {
        if (data) {
          setCategory(data);
          setProducts(data.products ?? []);
          setCount(data._count?.products ?? data.products?.length ?? 0);
        } else {
          setCategory(null);
          setProducts([]);
          setCount(0);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  return { category, products, count, loading, error };
}
