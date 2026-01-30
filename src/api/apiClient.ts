export async function apiClient<T, TBody = undefined>(
  endpoint: string,
  method: "PATCH" | "GET" | "PUT" | "DELETE" | "POST" = "GET",
  body?: TBody,
  headers?: Record<string, string>
): Promise<T> {
  const isFormData = body instanceof FormData;

  const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
    method,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Ошибка запроса: ${res.status}`);
  }

  return (await res.json()) as T;
}
