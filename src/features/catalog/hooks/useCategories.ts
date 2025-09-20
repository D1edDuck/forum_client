import { useEffect, useState } from "react";
import { getCategories } from "@/api/fetchCategory";
import { ICatalog } from "@/api/type";

export function useCategories() {
  const [data, setData] = useState<ICatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getCategories()
      .then(setData) // получаем все категории
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
