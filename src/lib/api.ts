// 📁 /lib/api.ts
// Basit fetch sarmalayıcı – NEXT_PUBLIC_API_BASE ile çalışır
// ─────────────────────────────────────────────────────────────────────────────
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/+$/, ""); // sondaki / temizlendi

export async function apiFetch(path: string, init?: RequestInit) {
  // path'in başındaki fazla / işaretlerini teke indir
  const cleanPath = `/${path.replace(/^\/+/, "")}`;
  // çifte /api durumunu engelle
  const url = `${API_BASE}${cleanPath}`.replace(/\/api\/api\//, "/api/");

  const headers = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  } as Record<string, string>;

  const res = await fetch(url, { ...init, headers, credentials: "include" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} - ${text}`);
  }
  return res;
}
