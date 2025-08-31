// src/app/sehirler/page.tsx
import type { Metadata } from "next";
import { getCities } from "@/lib/api";
import { slugifyCity, mealTypeToSlug } from "@/lib/seo-maps";

export const revalidate = 86400; // günlük yenile

export const metadata: Metadata = {
  title: "KYK Yurt Menü – Şehirler",
  description:
    "KYK yurt menülerini şehir bazında görüntüleyin. Şehri seçip kahvaltı, öğle ve akşam menülerine hızlıca bakın.",
  alternates: { canonical: "/sehirler" },
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
              <a className="underline" href={`/${c.slug}/${mealTypeToSlug[0]}`}>Kahvaltı</a>
              <a className="underline" href={`/${c.slug}/${mealTypeToSlug[1]}`}>Öğle</a>
              <a className="underline" href={`/${c.slug}/${mealTypeToSlug[2]}`}>Akşam</a>
            </div>
          </li>
        ))}
      </ul>

      {/* JSON-LD: CollectionPage + Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "KYK Yurt Menü – Şehirler",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://kykyemekliste.com" },
                { "@type": "ListItem", "position": 2, "name": "Şehirler", "item": "https://kykyemekliste.com/sehirler" }
              ]
            }
          }),
        }}
      />
    </main>
  );
}
