// 📁 /lib/api.ts
// Basit fetch sarmalayıcı – NEXT_PUBLIC_API_BASE ile çalışır
// ─────────────────────────────────────────────────────────────────────────────
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";


export async function apiFetch(path: string, init?: RequestInit) {
const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
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