"use client";

import { useState } from "react";
import CitySelect from "@/components/CitySelect";
import MealTypeSwitch from "@/components/MealTypeSwitch";
import DatePickerHorizontal from "@/components/DatePickerHorizontal";
import MenuList from "@/components/MenuList";
import Link from "next/link";

export default function Page() {
  const today = new Date();
  const [cityId, setCityId] = useState(1);
  const [mealType, setMealType] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      {/* Üst Menü (brand gradient) */}
      <header className="bg-gradient-to-r from-[hsl(var(--brand-300))] via-[hsl(var(--brand-400))] to-[hsl(var(--brand-500))] shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-white">
            🍽️ Yurt Menü
          </h1>
          <CitySelect value={cityId} onChange={setCityId} />
        </div>
      </header>

      <DatePickerHorizontal selectedDate={selectedDate} onSelect={setSelectedDate} />

      <MealTypeSwitch value={mealType} onChange={setMealType} />

      {/* İçerik */}
      <main className="max-w-6xl mx-auto px-4 pb-10">
        <MenuList
          selectedDate={selectedDate}
          cityId={cityId}
          mealType={mealType}
        />
      </main>
      
      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Yurt Menü</p>
          <nav className="flex gap-4">
            <Link href="/hakkinda" className="hover:underline">
              Hakkında
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

      {/* Varsayılan SKY paleti (isteğe bağlı): değişkenler tanımlı değilse çalışsın diye */}
      <style jsx global>{`
        :root {
          /* #98D2DD çevresinde türetilmiş HSL'ler */
          --brand-100: 189 45% 88%; /* #D3EAEE - en açık */
          --brand-300: 189 50% 82%; /* #BAE1E8 - açık */
          --brand-400: 189 50% 73%; /* #98D2DD - ana ton */
          --brand-500: 189 55% 62%; /* #69C2D3 - biraz koyu */
          /* İstersen daha kontrast için şunu kullanabilirsin:
             --brand-500: 189 60% 52%;  // #3BB7CE - daha koyu uç
          */
          --brand-900: 217 33% 17%;     /* metin için koyu nötr */
        }
      `}</style>
    </div>
  );
}