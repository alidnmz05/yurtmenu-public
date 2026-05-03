import { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const now = new Date();
  const monthsTR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const monthStr = `${monthsTR[now.getMonth()]} ${now.getFullYear()}`;

  return {
    title: `KYK Yemek Listesi (${monthStr}) | Güncel Yurt Menüsü`,
    description: `KYK yemek listesi bugün ne var? Güncel yurt menüsü (${monthStr}). 81 il KYK yurtlarının kahvaltı ve akşam yemek listesini görüntüleyin.`,
  };
}

export default function Page() {
  return (
    <>
      <HomePageClient />
      
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

      {/* JSON-LD for HomePage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://kykyemekliste.com/#webpage",
            "url": "https://kykyemekliste.com",
            "name": "KYK Yemek Listesi - Güncel Yurt Menüleri",
            "description": "Türkiye genelindeki KYK yurtlarının güncel yemek menüleri. Kahvaltı ve akşam yemeği listelerini görüntüleyin.",
            "inLanguage": "tr-TR",
            "isPartOf": { "@id": "https://kykyemekliste.com/#website" },
            "about": {
              "@type": "Thing",
              "name": "KYK Yurt Menüleri",
              "description": "Kredi ve Yurtlar Kurumu yurtlarının günlük yemek listeleri"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Ana Sayfa",
                  "item": "https://kykyemekliste.com"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Türkiye KYK Yurtları",
              "description": "81 İldeki KYK Yurt Menüleri",
              "numberOfItems": 81,
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "İstanbul KYK Menü", "url": "https://kykyemekliste.com/istanbul/kahvalti" },
                { "@type": "ListItem", "position": 2, "name": "Ankara KYK Menü", "url": "https://kykyemekliste.com/ankara/kahvalti" },
                { "@type": "ListItem", "position": 3, "name": "İzmir KYK Menü", "url": "https://kykyemekliste.com/izmir/kahvalti" },
                { "@type": "ListItem", "position": 4, "name": "Bursa KYK Menü", "url": "https://kykyemekliste.com/bursa/kahvalti" },
                { "@type": "ListItem", "position": 5, "name": "Antalya KYK Menü", "url": "https://kykyemekliste.com/antalya/kahvalti" }
              ]
            }
          })
        }}
      />
    </>
  );
}