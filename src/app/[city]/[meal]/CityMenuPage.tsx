"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { slugifyCity, mealTypeToSlug } from "@/lib/seo-maps";
import CitySelect from "@/components/CitySelect";
import MealTypeSwitch from "@/components/MealTypeSwitch";
import DatePickerHorizontal from "@/components/DatePickerHorizontal";
import MenuList from "@/components/MenuList";
import Link from "next/link";

type City = { id: number; name: string; slug: string };

export default function CityMenuPage({ 
  initialCitySlug, 
  initialMealType 
}: { 
  initialCitySlug: string; 
  initialMealType: number;
}) {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [mealType, setMealType] = useState(initialMealType);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);

  // Şehirleri yükle ve mevcut şehri bul
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await apiFetch("/api/city");
        const data = await res.json();
        const citiesWithSlug = data.map((c: { id: number; name: string }) => ({
          ...c,
          slug: slugifyCity(c.name)
        }));
        setCities(citiesWithSlug);
        
        const city = citiesWithSlug.find((c: City) => c.slug === initialCitySlug);
        if (city) {
          setCurrentCity(city);
          // URL'deki şehri localStorage'a kaydet (CitySelect ile senkronize et)
          localStorage.setItem("yurtmenu_city_id", String(city.id));
        }
      } catch (e) {
        console.error("Şehirler yüklenemedi:", e);
      }
    };
    fetchCities();
  }, [initialCitySlug]);

  // URL değiştiğinde mealType'ı güncelle
  useEffect(() => {
    setMealType(initialMealType);
  }, [initialMealType]);

  // Şehir değiştiğinde URL'yi güncelle
  const handleCityChange = (newCityId: number) => {
    const city = cities.find(c => c.id === newCityId);
    if (city) {
      const mealSlug = mealTypeToSlug[mealType];
      router.push(`/${city.slug}/${mealSlug}`);
    }
  };

  // Öğün tipi değiştiğinde URL'yi güncelle
  const handleMealTypeChange = (newMealType: number) => {
    if (currentCity) {
      const mealSlug = mealTypeToSlug[newMealType];
      router.push(`/${currentCity.slug}/${mealSlug}`);
    }
  };

  if (!currentCity) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      {/* Üst Menü (brand gradient) */}
      <header className="bg-gradient-to-r from-[hsl(var(--brand-300))] via-[hsl(var(--brand-400))] to-[hsl(var(--brand-500))] shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/">
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-white cursor-pointer hover:opacity-90">
              🍽️ KYK Yemek Liste
            </h1>
          </Link>
          <CitySelect value={currentCity.id} onChange={handleCityChange} disableAutoSelect />
        </div>
      </header>

      <DatePickerHorizontal selectedDate={selectedDate} onSelect={setSelectedDate} />

      <MealTypeSwitch value={mealType} onChange={handleMealTypeChange} />

      {/* İçerik */}
      <main className="max-w-6xl mx-auto px-4 pb-10">
        <MenuList
          selectedDate={selectedDate}
          cityId={currentCity.id}
          mealType={mealType}
        />
      </main>
      
      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} KYK Yemek Liste</p>
          <nav className="flex flex-wrap gap-4 justify-center">
            <Link href="/hakkinda" className="hover:underline">
              Hakkında
            </Link>
            <Link href="/rehber" className="hover:underline">
              Rehber
            </Link>
            <Link href="/sss" className="hover:underline">
              SSS
            </Link>
            <Link href="/iletisim" className="hover:underline">
              İletişim
            </Link>
            <Link href="/gizlilik-politikasi" className="hover:underline">
              Gizlilik Politikası
            </Link>
          </nav>
        </div>
      </footer>

      {/* Varsayılan SKY paleti */}
      <style jsx global>{`
        :root {
          --brand-100: 189 45% 88%;
          --brand-300: 189 50% 82%;
          --brand-400: 189 50% 73%;
          --brand-500: 189 55% 62%;
          --brand-900: 217 33% 17%;
        }
      `}</style>
    </div>
  );
}
