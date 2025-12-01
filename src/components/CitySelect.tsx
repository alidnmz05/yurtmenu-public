// ─────────────────────────────────────────────────────────────────────────────
// 📁 /components/CitySelect.tsx
// Şehir seçimi – ilk şehri otomatik seçer
// ─────────────────────────────────────────────────────────────────────────────
"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const STORAGE_KEY = "yurtmenu_city_id";

export default function CitySelect({
value,
onChange,
disableAutoSelect = false,
}: {
value: number;
onChange: (v: number) => void;
disableAutoSelect?: boolean;
}) {
const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
const [initialized, setInitialized] = useState(false);


useEffect(() => {
const run = async () => {
try {
const res = await apiFetch("/api/city");
const data = await res.json();
setCities(data ?? []);
if ((data?.length ?? 0) > 0 && !initialized && !disableAutoSelect) {
// localStorage'dan kaydedilmiş şehri yükle
const saved = localStorage.getItem(STORAGE_KEY);
const savedId = saved ? parseInt(saved, 10) : null;
const cityExists = savedId && data.some((c: {id: number}) => c.id === savedId);
onChange(cityExists ? savedId : data[0].id);
setInitialized(true);
} else if (disableAutoSelect && !initialized) {
setInitialized(true);
}
} catch (e) {
console.error("Şehir verileri alınamadı:", e);
}
};
run();
}, [initialized, onChange, disableAutoSelect]);


return (
<div className="flex items-center gap-3">
<label className="text-sm font-medium text-[#4b3e2b]">Şehir:</label>
<select
value={value}
onChange={(e) => {
const newId = Number(e.target.value);
localStorage.setItem(STORAGE_KEY, String(newId));
onChange(newId);
}}
className="p-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-orange-400 transition duration-200"
>
{cities.map((c) => (
<option key={c.id} value={c.id}>
{c.name}
</option>
))}
</select>
</div>
);
}