"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { slugifyCity, mealTypeToSlug, ALL_CITIES_TR, mealTypeToSwitchValue, switchValueToMealType } from "@/lib/seo-maps";
import CitySelect from "@/components/CitySelect";
import MealTypeSwitch from "@/components/MealTypeSwitch";
import DatePickerHorizontal from "@/components/DatePickerHorizontal";
import MenuList from "@/components/MenuList";
import Footer from "@/components/Footer";
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
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium rounded-lg transition-colors"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    E-posta ile Gönder
                  </a>
                  <Link 
                    href="/iletisim" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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

        {/* Hyper-Local FAQ Section */}
        {cityAvailable && (
          <section className="mt-12 bg-white border border-blue-100 rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Sıkça Sorulan Sorular ({currentCity.name})
            </h2>
            <div className="space-y-4">
              <details className="group border-b border-gray-100 pb-4">
                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-gray-700 hover:text-blue-600 transition-colors">
                  <span>{currentCity.name} KYK yurtlarında {mealType === 0 ? "kahvaltı" : "akşam yemeği"} saat kaçta başlıyor?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  KYK yurtlarında genellikle kahvaltı 06:30 - 12:00, akşam yemeği ise 16:00 - 22:30 saatleri arasında servis edilmektedir. Saatler yurttan yurda küçük değişiklikler gösterebilir.
                </p>
              </details>
              <details className="group pb-2">
                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-gray-700 hover:text-blue-600 transition-colors">
                  <span>{currentCity.name} KYK {mealType === 0 ? "kahvaltı" : "akşam yemeği"} menüsü ne zaman güncellenir?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  Yemek menüleri aylık olarak KYK idareleri tarafından belirlenir ve sistemimize düzenli olarak eklenir. Güncel ayın menüsünü sayfamızdan günlük takip edebilirsiniz.
                </p>
              </details>
            </div>
          </section>
        )}
      </main>
      
      {/* Footer */}
      <Footer />

    </div>
  );
}
