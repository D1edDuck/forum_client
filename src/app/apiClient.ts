export async function apiClient<T, TBody = undefined>(
  endpoint: string,
  method: "GET" | "PUT" | "DELETE" | "POST" = "GET",
  body?: TBody
): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Ошибка запроса: ${res.status}`);
  }

  const data = (await res.json()) as T;
  return data;
}
