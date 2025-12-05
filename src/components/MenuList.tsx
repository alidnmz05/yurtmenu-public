"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { MenuItem } from "@/types/menu";
import MenuCard from "@/components/MenuCard";
import Link from "next/link";
import NativeAd from "@/components/NativeAd";

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

  // Otomatik scroll kaldırıldı - kullanıcı manuel olarak seçsin
  // useEffect(() => {
  //   if (!selectedDate || menus.length === 0 || loading) return;
  //   const timeoutId = setTimeout(() => {
  //     const targetMenu = menus.find(menu => menu.date === selectedDate);
  //     if (targetMenu) {
  //       const element = document.getElementById(`menu-card-${selectedDate}`);
  //       if (element) {
  //         const headerHeight = 120;
  //         const elementTop = element.offsetTop - headerHeight;
  //         window.scrollTo({ top: elementTop, behavior: 'smooth' });
  //       }
  //     }
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [selectedDate, menus, loading]);

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
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg my-8 max-w-2xl mx-auto">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-yellow-800">
                Bu kriterlerde menü bulunamadı
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                Seçtiğiniz tarih, şehir veya öğün için henüz menü bilgisi sistemimizde bulunmuyor. 
                Eğer bu menüye sahipseniz, bizimle paylaşabilirsiniz!
              </p>
              <div className="mt-4 flex gap-3">
                <a 
                  href="mailto:info@kykyemekliste.com?subject=KYK%20Men%C3%BC%20Bilgisi&body=Merhaba%2C%0A%0AKYK%20yurt%20men%C3%BC%20bilgisi%20payla%C5%9Fmak%20istiyorum.%0A%0A%C5%9Eehir%3A%20%0AYurt%20Ad%C4%B1%3A%20%0ATarih%3A%20%0A%C3%96%C4%9F%C3%BCn%3A%20"
                  className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Menü Gönder
                </a>
                <Link 
                  href="/iletisim" 
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  İletişim Formu
                </Link>
              </div>
            </div>
          </div>
        </div>
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
          .map((m, index) => {
            const shouldShowAd = (index + 1) % 5 === 0; // Her 5. card'dan sonra reklam
            const menuKey = m.id ?? `${m.date}-${m.cityId}-${m.mealType}`;
            
            return (
              <div key={`menu-wrapper-${menuKey}`} className="contents">
                <div 
                  id={`menu-card-${m.date}`}
                  className={`transition-all duration-300 ${selectedDate === m.date ? 'ring-2 ring-[#98d2dd] ring-opacity-50' : ''}`}
                >
                  <MenuCard {...m} />
                </div>
                
                {/* Her 5. menü kartından sonra native reklam */}
                {shouldShowAd && (
                  <div className="md:col-span-2">
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 border border-orange-100">
                      <p className="text-xs text-gray-500 mb-2 text-center">Reklam</p>
                      <NativeAd 
                        key={`ad-${index}`}
                        adSlot="4404020106"
                        adFormat="fluid"
                        className="min-h-[250px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}