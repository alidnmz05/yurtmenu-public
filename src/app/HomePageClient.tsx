"use client";

import { useState } from "react";
import CitySelect from "@/components/CitySelect";
import MealTypeSwitch from "@/components/MealTypeSwitch";
import DatePickerHorizontal from "@/components/DatePickerHorizontal";
import MenuList from "@/components/MenuList";
import Footer from "@/components/Footer";

// Türkiye saatine göre öğün tipini belirle
function getDefaultMealType(): number {
  const now = new Date();
  const turkeyTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  const hour = turkeyTime.getHours();
  
  // Gece 00:00 - Öğlen 12:00 -> Kahvaltı (0)
  // Öğlen 12:00 - Gece 00:00 -> Akşam (1)
  return hour < 12 ? 0 : 1;
}

export default function HomePageClient() {
  const today = new Date();
  const [cityId, setCityId] = useState(1);
  const [mealType, setMealType] = useState(getDefaultMealType());
  const [showFullSeo, setShowFullSeo] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      {/* Üst Menü (brand gradient) */}
      <header className="bg-gradient-to-r from-[hsl(var(--brand-300))] via-[hsl(var(--brand-400))] to-[hsl(var(--brand-500))] shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-white">
            🍽️ KYK Yemek Listesi
          </span>
          <CitySelect value={cityId} onChange={setCityId} disableAutoSelect={false} />
        </div>
      </header>

      <DatePickerHorizontal selectedDate={selectedDate} onSelect={setSelectedDate} />

      <MealTypeSwitch value={mealType} onChange={setMealType} />

      {/* İçerik */}
      <main className="max-w-6xl mx-auto px-4 pb-10">
        {/* SEO İçerik Bölümü */}
        <section className="mb-6 mt-4 text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
            KYK Yemek Listesi ve Güncel Yurt Menüsü
          </h1>
          
          <div className={`relative ${!showFullSeo ? 'max-h-20 sm:max-h-none overflow-hidden' : ''}`}>
            <p className="text-gray-600 max-w-3xl mx-auto mb-4 text-sm sm:text-base leading-relaxed">
              <strong>KYK yemek listesi</strong> ve güncel <strong>yurt menüsü</strong> ({new Date().getFullYear()}). 
              Kredi ve Yurtlar Kurumu yurtlarının kahvaltı ve akşam yemeği listelerini 
              şehir bazında görüntüleyin. İstanbul, Ankara, İzmir başta olmak üzere 
              81 ildeki yurt yemekleri için tarih ve öğün seçerek beslenme programınızı planlayın.
            </p>
            
            <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-700 ${!showFullSeo ? 'hidden sm:flex' : 'flex'}`}>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Aylık güncellenir</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>81 il yurt menüsü</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                <span>Kahvaltı & Akşam</span>
              </div>
            </div>

            {/* Mobile Gradient Overlay when collapsed */}
            {!showFullSeo && (
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent sm:hidden" />
            )}
          </div>

          <button 
            onClick={() => setShowFullSeo(!showFullSeo)}
            className="mt-2 text-blue-600 text-xs font-bold sm:hidden flex items-center gap-1 mx-auto"
          >
            {showFullSeo ? 'Daha Az Gör' : 'Daha Fazla Bilgi'}
            <svg className={`w-3 h-3 transition-transform ${showFullSeo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </section>

        <MenuList
          selectedDate={selectedDate}
          cityId={cityId}
          mealType={mealType}
        />

        {/* SEO Ek Bilgi */}
        <section className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 KYK Yurt Menüleri Hakkında</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🍽️ Menü İçerikleri</h4>
              <p className="leading-relaxed">
                KYK yurtlarında sunulan yemekler dengeli beslenme ilkelerine göre hazırlanır. 
                Kahvaltı menülerinde peynir, zeytin, reçel, bal, yumurta gibi temel besinler; 
                akşam menülerinde ise çorba, ana yemek, pilav ve salata yer alır.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📍 Türkiye Geneli KYK Yurtları</h4>
              <p className="leading-relaxed mb-3">
                Türkiye&apos;nin birçok ilindeki KYK yurtlarının menülerini takip edebilirsiniz. 
                İstanbul, Ankara, İzmir, Bursa, Antalya, Konya, Adana başta olmak üzere 
                Marmara, Ege, İç Anadolu, Akdeniz, Karadeniz, Doğu ve Güneydoğu Anadolu bölgelerinden 
                çok sayıda şehrin yurt menüleri sitemizde yer almaktadır.
              </p>
              <p className="text-xs text-gray-600">
                * Menü veritabanımız sürekli güncellenmektedir. Şehrinizin menüsü yoksa bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⏰ Güncelleme Sıklığı</h4>
              <p className="leading-relaxed">
                Yemek menüleri mümkün olduğunca güncel tutulmaya çalışılır. 
                Yurtlardan gelen günlük ve haftalık menü bilgileri sitemize düzenli olarak eklenmektedir.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">💪 Öğrenci Dostu Platform</h4>
              <p className="leading-relaxed">
                Platformumuz öğrencilerin yurt yemek menülerini kolayca takip edebilmeleri için 
                tasarlanmıştır. Günlük kahvaltı ve akşam yemeği menülerini önceden görerek 
                planlama yapabilirsiniz.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />

    </div>
  );
}
