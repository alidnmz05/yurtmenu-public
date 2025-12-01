// src/app/sehirler/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getCities } from "@/lib/api";
import { slugifyCity, mealTypeToSlug } from "@/lib/seo-maps";

export const revalidate = 86400; // günlük yenile

export const metadata: Metadata = {
  title: "Tüm Şehirler - KYK Yurt Menü Listesi",
  description:
    "Türkiye'deki KYK yurtlarının bulunduğu şehirlerin tam listesi. Şehrinizi seçerek sabah ve akşam yemek menülerine hızlıca ulaşın.",
  alternates: { canonical: "/sehirler" },
  openGraph: {
    title: "Tüm Şehirler - KYK Yurt Menüleri",
    description: "Türkiye genelindeki KYK yurt şehirleri ve güncel yemek menüleri",
    url: "https://kykyemekliste.com/sehirler"
  }
};

export default async function Page() {
  const cities = await getCities();
  const items = cities
    .map((c) => ({ ...c, slug: slugifyCity(c.name) }))
    .sort((a, b) => a.name.localeCompare(b.name, "tr", { sensitivity: "base" }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Şehirler</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((c) => (
          <li key={c.id} className="p-3 border rounded">
            <div className="font-medium mb-2">{c.name}</div>
            <div className="flex gap-3 text-sm">
              <Link className="underline hover:text-[#69C2D3]" href={`/${c.slug}/${mealTypeToSlug[0]}`}>Kahvaltı</Link>
              <Link className="underline hover:text-[#69C2D3]" href={`/${c.slug}/${mealTypeToSlug[2]}`}>Akşam</Link>
            </div>
          </li>
        ))}
      </ul>

      {/* JSON-LD: CollectionPage + Breadcrumb + ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "KYK Yurt Menü – Şehirler",
            "description": "Türkiye'deki KYK yurtlarının bulunduğu şehirlerin listesi",
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
              "itemListElement": items.map((city, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": city.name,
                "url": `https://kykyemekliste.com/${city.slug}/sabah`
              }))
            }
          }),
        }}
      />
    </main>
  );
}
