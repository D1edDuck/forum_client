export async function fetchJSON(path: string) {
  const base = "http://localhost:3000";
  const res = await fetch(`${base}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
