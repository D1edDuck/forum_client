export async function apiClient<T, TBody = undefined>(
  endpoint: string,
  method: "PATCH" | "GET" | "PUT" | "DELETE" | "POST" = "GET",
  body?: TBody,
  headers?: Record<string, string>,
  signal?: AbortSignal,
): Promise<T> {
  const isFormData = body instanceof FormData;

  const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
    method,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    signal,
    credentials: "include",
  });

  const isPublicEndpoint = endpoint === "users/login" || endpoint === "users/register";

  if (res.status === 401 && !isPublicEndpoint) {
    throw new Error("Сессия истекла. Войдите снова.");
  }

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const responseData = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const error = new Error(
      isJson && responseData.message
        ? responseData.message
        : `Ошибка запроса: ${res.status}`,
    );

    (error as Error & { response: { data: unknown; status: number; statusText: string } }).response = {
      data: responseData,
      status: res.status,
      statusText: res.statusText,
    };

    throw error;
  }

  return responseData as T;
}
