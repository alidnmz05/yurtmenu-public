// src/lib/api.ts
export type City = { id: number; name: string };
export type MenuItem = { name: string; description?: string };

type NextFetchOptions = { revalidate?: number; tags?: string[] };
export type ApiFetchInit = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  next?: NextFetchOptions;
};

const RAW_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").trim();
const API_BASE = /^https?:\/\//i.test(RAW_BASE) ? RAW_BASE.replace(/\/+$/, "") : "";

// During build (SSG), use localhost:5181 if no API_BASE is set
const BUILD_TIME_BASE = typeof window === "undefined" && !API_BASE 
  ? "http://localhost:5181" 
  : API_BASE;

function buildUrl(path: string) {
  const cleanPath = `/${path.replace(/^\/+/, "")}`;
  const combined = `${BUILD_TIME_BASE}${cleanPath}`.replace(/\/api\/api\//g, "/api/");
  return BUILD_TIME_BASE ? combined : cleanPath;
}

export async function apiFetch(path: string, init: ApiFetchInit = {}) {
  const url = buildUrl(path);
  const headers = new Headers(init.headers);
  const hasBody = "body" in init && init.body != null;
  if (hasBody && !headers.has("Content-Type")) {
    const isForm = typeof FormData !== "undefined" && init.body instanceof FormData;
    if (!isForm) headers.set("Content-Type", "application/json");
  }
  const credentials: RequestCredentials =
    init.credentials ?? (typeof window === "undefined" ? "same-origin" : "include");

  const res = await fetch(url, { ...init, headers, credentials });
  if (!res.ok) throw new Error(`API ${res.status} ${res.statusText} @ ${url}`);
  return res;
}

export async function getJSON<T>(path: string, init?: ApiFetchInit): Promise<T> {
  const res = await apiFetch(path, init);
  return res.json() as Promise<T>;
}

export const getCities = () =>
  getJSON<City[]>("/api/city", { next: { revalidate: 86400 } });

export function getMenu(cityId: number, mealType: number, dateISO?: string) {
  const qs = new URLSearchParams({ cityId: String(cityId), mealType: String(mealType) });
  if (dateISO) qs.set("date", dateISO);
  return getJSON<MenuItem[]>(`/api/menu/liste?${qs.toString()}`, { next: { revalidate: 3600 } });
}
