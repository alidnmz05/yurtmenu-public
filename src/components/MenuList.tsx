"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { MenuItem } from "@/types/menu";
import MenuCard from "@/components/MenuCard";

type Props = {
  selectedDate: string;
  cityId: number;
  mealType: number; // 0=kahvaltı, 1=akşam vb.
};

export default function MenuList({ selectedDate, cityId, mealType }: Props) {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Menüleri çek
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          setError("Giriş yapmanız gerekiyor.");
          setMenus([]);
          return;
        }

        const url = `/api/menu/liste?cityId=${cityId}&mealType=${mealType}`;
        const res = await apiFetch(url, { headers: { Authorization: `Bearer ${token}` } });
        const data: MenuItem[] = await res.json();
        setMenus(Array.isArray(data) ? data : []);
      } catch (e: unknown) {
        console.error(e);
        setError(e instanceof Error ? e.message : "Menüler yüklenemedi.");
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [cityId, mealType]);

  // Seçili tarihe otomatik kaydır
  useEffect(() => {
    if (!selectedDate || menus.length === 0) return;
    const el = document.getElementById(`menu-${selectedDate}`);
    if (el) {
      // Canvas render’ı için küçük gecikme
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [selectedDate, menus]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 py-10">Yükleniyor...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full h-72 rounded-3xl animate-pulse bg-orange-100/60 border border-orange-200/60" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-red-500 py-10">{error}</p>
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 py-10">
          Bu kriterlerde menü bulunamadı.
        </p>
      </div>
    );
  }

 return (
  <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
      {menus.map((m) => (
        <MenuCard key={m.id ?? `${m.date}-${m.cityId}-${m.mealType}`} {...m} />
      ))}
    </div>
  </div>
);

}
