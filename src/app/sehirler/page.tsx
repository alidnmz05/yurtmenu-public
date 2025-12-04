// src/app/sehirler/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getCities } from "@/lib/api";
import { slugifyCity, mealTypeToSlug, ALL_CITIES_TR } from "@/lib/seo-maps";

export const revalidate = 86400; // günlük yenile

export const metadata: Metadata = {
  title: "81 İl KYK Yurt Menüleri - Türkiye Geneli Yemek Listesi",
  description:
    "Türkiye'nin 81 ilindeki KYK yurtlarının güncel yemek menüleri. Şehrinizi seçerek sabah ve akşam yemek menülerine hızlıca ulaşın.",
  alternates: { canonical: "/sehirler" },
  openGraph: {
    title: "81 İl KYK Yurt Menüleri",
    description: "Türkiye genelindeki 81 il KYK yurt şehirleri ve güncel yemek menüleri",
    url: "https://kykyemekliste.com/sehirler"
  }
};

export default async function Page() {
  const apiCities = await getCities();
  const apiCityNames = new Set(apiCities.map(c => c.name));
  
  // 81 ili oluştur - API'de olanları ve olmayanları ayır
  const allItems = ALL_CITIES_TR.map((cityName) => ({
    name: cityName,
    slug: slugifyCity(cityName),
    available: apiCityNames.has(cityName),
  })).sort((a, b) => a.name.localeCompare(b.name, "tr", { sensitivity: "base" }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-3">Türkiye Geneli 81 İl KYK Yurt Menüleri</h1>
      <p className="text-gray-600 mb-8">
        Türkiye&apos;nin 81 ilindeki KYK yurt menülerini görüntüleyebilirsiniz. 
        Yeşil renkli şehirler için güncel menüler mevcut, gri renkli şehirler için henüz veri bulunmuyor.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allItems.map((c) => (
          <div 
            key={c.slug} 
            className={`p-4 border rounded-lg transition-all ${
              c.available 
                ? 'bg-green-50 border-green-300 hover:shadow-md' 
                : 'bg-gray-50 border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-3 h-3 rounded-full ${c.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <div className="font-semibold text-gray-800">{c.name}</div>
            </div>
            
            {c.available ? (
              <div className="flex gap-3 text-sm">
                <Link 
                  className="flex-1 text-center py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors" 
                  href={`/${c.slug}/${mealTypeToSlug[0]}`}
                >
                  Kahvaltı
                </Link>
                <Link 
                  className="flex-1 text-center py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors" 
                  href={`/${c.slug}/${mealTypeToSlug[2]}`}
                >
                  Akşam
                </Link>
              </div>
            ) : (
              <div className="text-xs text-gray-500 text-center py-2">
                📋 Menü henüz eklenmedi
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">📢 Menü Paylaşın</h2>
        <p className="text-sm text-blue-800 mb-3">
          Şehriniz için menü bilgisi bulunmuyorsa ve sizde güncel menü varsa paylaşabilirsiniz:
        </p>
        <div className="flex gap-3">
          <a 
            href="mailto:info@kykyemekliste.com?subject=KYK%20Men%C3%BC%20Bilgisi&body=Merhaba%2C%0A%0AKYK%20yurt%20men%C3%BC%20bilgisi%20payla%C5%9Fmak%20istiyorum.%0A%0A%C5%9Eehir%3A%20%0AYurt%20Ad%C4%B1%3A%20%0AD%C3%B6nem%3A%20"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            E-posta Gönder
          </a>
          <Link 
            href="/iletisim" 
            className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-blue-800 border border-blue-300 rounded-lg transition-colors text-sm font-medium"
          >
            İletişim Formu
          </Link>
        </div>
      </div>

      {/* JSON-LD: CollectionPage + Breadcrumb + ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "KYK Yurt Menü – 81 İl",
            "description": "Türkiye'nin 81 ilindeki KYK yurtlarının güncel yemek menüleri",
            "url": "https://kykyemekliste.com/sehirler",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://kykyemekliste.com" },
                { "@type": "ListItem", "position": 2, "name": "Şehirler", "item": "https://kykyemekliste.com/sehirler" }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": allItems.filter(c => c.available).map((city, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": city.name,
                "url": `https://kykyemekliste.com/${city.slug}/kahvalti`
              }))
            }
          }),
        }}
      />
    </main>
  );
}
