"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { slugifyCity, mealTypeToSlug, ALL_CITIES_TR, mealTypeToSwitchValue, switchValueToMealType } from "@/lib/seo-maps";
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
  const [switchValue, setSwitchValue] = useState(mealTypeToSwitchValue(initialMealType));
  const [cityAvailable, setCityAvailable] = useState(true); // API'de var mı?
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
          setCityAvailable(true);
          // URL'deki şehri localStorage'a kaydet (CitySelect ile senkronize et)
          localStorage.setItem("yurtmenu_city_id", String(city.id));
        } else {
          // API'de yok ama 81 il listesinde var
          const cityName = ALL_CITIES_TR.find(name => slugifyCity(name) === initialCitySlug);
          if (cityName) {
            setCurrentCity({ id: -1, name: cityName, slug: initialCitySlug });
            setCityAvailable(false);
          }
        }
      } catch (e) {
        console.error("Şehirler yüklenemedi:", e);
      }
    };
    fetchCities();
  }, [initialCitySlug]);

  // URL değiştiğinde mealType ve switchValue'yu güncelle
  useEffect(() => {
    setMealType(initialMealType);
    setSwitchValue(mealTypeToSwitchValue(initialMealType));
  }, [initialMealType]);

  // Şehir değiştiğinde URL'yi güncelle
  const handleCityChange = (newCityId: number) => {
    const city = cities.find(c => c.id === newCityId);
    if (city) {
      const mealSlug = mealTypeToSlug[mealType];
      router.push(`/${city.slug}/${mealSlug}`);
    }
  };

  // Switch değiştiğinde URL'yi güncelle (0=sabah, 1=akşam)
  const handleMealTypeChange = (newSwitchValue: number) => {
    if (currentCity) {
      // Switch değerinden meal type'a çevir
      const newMealType = switchValueToMealType(newSwitchValue);
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
            <span className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-white cursor-pointer hover:opacity-90">
              🍽️ KYK Yemek Liste
            </span>
          </Link>
          <CitySelect value={currentCity.id} onChange={handleCityChange} disableAutoSelect />
        </div>
      </header>

      <DatePickerHorizontal selectedDate={selectedDate} onSelect={setSelectedDate} />

      <MealTypeSwitch value={switchValue} onChange={handleMealTypeChange} />

      {/* İçerik */}
      <main className="max-w-6xl mx-auto px-4 pb-10">
        
        {/* Local SEO Section */}
        <section className="mb-8 mt-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            {currentCity.name} KYK {mealType === 0 ? "Kahvaltı" : "Akşam"} Menüsü
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            Güncel <strong>{currentCity.name} KYK yurtları {mealType === 0 ? "kahvaltı" : "akşam yemeği"} listesi</strong>. 
            Bu sayfada {currentCity.name} ilindeki tüm Kredi ve Yurtlar Kurumu (KYK) yurtlarında çıkan günlük ve aylık yemek menüsünü bulabilirsiniz.
          </p>
        </section>

        {!cityAvailable ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg my-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-yellow-800">
                  {currentCity.name} için menü bulunmuyor
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Şu anda {currentCity.name} ili için KYK yurt menüsü sistemimizde bulunmamaktadır. 
                  Eğer bu şehirde KYK yurdunda kalıyorsanız ve menü bilgilerine sahipseniz, 
                  bizimle paylaşabilirsiniz!
                </p>
                <div className="mt-4 flex gap-3">
                  <a 
                    href={`mailto:info@kykyemekliste.com?subject=${encodeURIComponent(`${currentCity.name} Menü Bilgisi`)}&body=${encodeURIComponent(`Merhaba,\n\n${currentCity.name} ili için KYK yurt menü bilgisi paylaşmak istiyorum.\n\nŞehir: ${currentCity.name}\nYurt Adı: \nDönem: \n\nEk olarak fotoğraf veya dosya ekleyebilirsiniz.`)}`}
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    E-posta ile Gönder
                  </a>
                  <Link 
                    href="/iletisim" 
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    İletişim Formu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MenuList
            selectedDate={selectedDate}
            cityId={currentCity.id}
            mealType={mealType}
          />
        )}
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
