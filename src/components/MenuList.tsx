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

        const url = `/api/menu/liste?cityId=${cityId}&mealType=${mealType}`;
        const res = await apiFetch(url);
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

  // Seçili tarihe otomatik kaydır - geliştirilmiş versiyon
  useEffect(() => {
    if (!selectedDate || menus.length === 0 || loading) return;
    
    // Menü yüklendikten sonra biraz bekle ve ardından kaydır
    const timeoutId = setTimeout(() => {
      const targetMenu = menus.find(menu => menu.date === selectedDate);
      if (targetMenu) {
        const element = document.getElementById(`menu-card-${selectedDate}`);
        if (element) {
          // Sayfa üstünden biraz offset ile kaydır
          const headerHeight = 120; // Header + DatePicker yaklaşık yükseklik
          const elementTop = element.offsetTop - headerHeight;
          
          window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
          });
        }
      }
    }, 500); // Menüler render olduktan sonra kaydır

    return () => clearTimeout(timeoutId);
  }, [selectedDate, menus, loading]);

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
        {menus
          .filter((m) => {
            // Boş menüleri filtrele - MenuCard ile aynı kontrol
            return [m.first, m.second, m.third, m.fourth]
              .some(field => field && field.trim().length > 0);
          })
          .map((m) => (
            <div 
              key={m.id ?? `${m.date}-${m.cityId}-${m.mealType}`}
              id={`menu-card-${m.date}`}
              className={`transition-all duration-300 ${selectedDate === m.date ? 'ring-2 ring-[#98d2dd] ring-opacity-50' : ''}`}
            >
              <MenuCard {...m} />
            </div>
          ))}
      </div>
    </div>
  );
}