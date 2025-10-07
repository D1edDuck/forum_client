const API_URL = import.meta.env.VITE_API_URL;

export async function fetchJSON(path: string) {
  const base = API_URL;
  const res = await fetch(`${base}${path}`);

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  return res.json();
}
