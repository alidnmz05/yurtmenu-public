"use client";

import { useState } from "react";
import CitySelect from "@/components/CitySelect";
import MealTypeSwitch from "@/components/MealTypeSwitch";
import DatePickerHorizontal from "@/components/DatePickerHorizontal";
import MenuList from "@/components/MenuList";

export default function Page() {
  const today = new Date();
  const [cityId, setCityId] = useState(1);
  const [mealType, setMealType] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );
  const [activeTab, setActiveTab] = useState<"menu" | "takip">("menu");

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

      {/* Sekmeler */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-lg border text-sm font-medium shadow-sm transition
            ${
              activeTab === "menu"
                ? "bg-[hsl(var(--brand-400))] border-[hsl(var(--brand-400))] text-white"
                : "bg-white border-[hsl(var(--brand-300))] text-[hsl(var(--brand-900))] hover:bg-[hsl(var(--brand-100))]"
            }`}
          onClick={() => setActiveTab("menu")}
        >
          Menü
        </button>
        <button
          className={`px-4 py-2 rounded-lg border text-sm font-medium shadow-sm transition
            ${
              activeTab === "takip"
                ? "bg-[hsl(var(--brand-400))] border-[hsl(var(--brand-400))] text-white"
                : "bg-white border-[hsl(var(--brand-300))] text-[hsl(var(--brand-900))] hover:bg-[hsl(var(--brand-100))]"
            }`}
          onClick={() => setActiveTab("takip")}
        >
          Beslenme Takibi
        </button>
      </div>

      <MealTypeSwitch value={mealType} onChange={setMealType} />

    

      {/* İçerik */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {activeTab === "menu" ? (
          <MenuList
            selectedDate={selectedDate}
            cityId={cityId}
            mealType={mealType}
          />
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <h2 className="text-2xl font-semibold text-[hsl(var(--brand-900))] mb-4">
              🍎 AI Destekli Beslenme Takibi
            </h2>
            <p className="text-sm">
              Bu özellik ile vücut tipine, hedeflerine ve günlük menüne göre AI
              tarafından öneriler alabileceksin. Çok yakında!
            </p>
          </div>
        )}
      </main>

      {/* Varsayılan SKY paleti (isteğe bağlı): değişkenler tanımlı değilse çalışsın diye */}
      <style jsx global>{`
  :root {
    /* #98D2DD çevresinde türetilmiş HSL’ler */
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
