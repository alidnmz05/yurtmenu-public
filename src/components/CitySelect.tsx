// ─────────────────────────────────────────────────────────────────────────────
// 📁 /components/CitySelect.tsx
// Şehir seçimi – 81 il gösterir, API'de olmayanlar için bilgi verir
// ─────────────────────────────────────────────────────────────────────────────
"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ALL_CITIES_TR, slugifyCity } from "@/lib/seo-maps";

const STORAGE_KEY = "yurtmenu_city_id";

type CityOption = {
  id: number;
  name: string;
  slug: string;
  available: boolean;
};

export default function CitySelect({
value,
onChange,
disableAutoSelect = false,
}: {
value: number;
onChange: (v: number) => void;
disableAutoSelect?: boolean;
}) {
const [cities, setCities] = useState<CityOption[]>([]);
const [initialized, setInitialized] = useState(false);


useEffect(() => {
const run = async () => {
try {
      const res = await apiFetch("/api/city");
      const apiCities = await res.json();
      const apiCityNames = new Map(apiCities.map((c: {id: number, name: string}) => [c.name, c.id]));

      // 81 ili oluştur - API'de olanlar ID'siyle, olmayanlar geçici negatif ID'yle
      const allCities: CityOption[] = ALL_CITIES_TR.map((cityName, index) => {
        const apiId = apiCityNames.get(cityName);
        return {
          id: (apiId !== undefined ? apiId : -(index + 1)) as number,
          name: cityName,
          slug: slugifyCity(cityName),
          available: apiId !== undefined,
        };
      });setCities(allCities);

if (allCities.length > 0 && !initialized && !disableAutoSelect) {
// localStorage'dan kaydedilmiş şehri yükle
const saved = localStorage.getItem(STORAGE_KEY);
const savedId = saved ? parseInt(saved, 10) : null;
const cityExists = savedId && allCities.some((c) => c.id === savedId && c.available);
// İlk available şehri bul
const firstAvailable = allCities.find(c => c.available);
onChange(cityExists ? savedId : (firstAvailable?.id ?? allCities[0].id));
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
const selectedCity = cities.find(c => c.id === newId);
if (selectedCity) {
  localStorage.setItem(STORAGE_KEY, String(newId));
  onChange(newId);
}
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