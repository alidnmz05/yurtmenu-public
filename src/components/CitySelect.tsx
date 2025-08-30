// ─────────────────────────────────────────────────────────────────────────────
// 📁 /components/CitySelect.tsx
// Şehir seçimi – ilk şehri otomatik seçer
// ─────────────────────────────────────────────────────────────────────────────
"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";


export default function CitySelect({
value,
onChange,
}: {
value: number;
onChange: (v: number) => void;
}) {
const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
const [initialized, setInitialized] = useState(false);


useEffect(() => {
const run = async () => {
try {
const res = await apiFetch("/api/city");
const data = await res.json();
setCities(data ?? []);
if ((data?.length ?? 0) > 0 && !initialized) {
onChange(data[0].id);
setInitialized(true);
}
} catch (e) {
console.error("Şehir verileri alınamadı:", e);
}
};
run();
}, [initialized, onChange]);


return (
<div className="flex items-center gap-3">
<label className="text-sm font-medium text-[#4b3e2b]">Şehir:</label>
<select
value={value}
onChange={(e) => onChange(Number(e.target.value))}
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