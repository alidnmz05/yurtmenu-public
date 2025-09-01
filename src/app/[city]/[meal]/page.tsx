import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCities, getMenu, type City, type MenuItem } from "@/lib/api";
import { mealSlugToType, humanMeal, slugifyCity } from "@/lib/seo-maps";

export const revalidate = 3600;   // içerik günlük -> 1 saat iyi

// ── SEO meta

type Params = Promise<{ city: string; meal: string }>;
type SearchParams = Promise<{ d?: string | string[] }>;



export async function generateMetadata(
  props: { params: Params }
): Promise<Metadata> {
  // ✅ params'ı await et
  const { city: citySlug, meal: mealSlug } = await props.params;

  const cities = await getCities();
  const city = cities
    .map(c => ({ ...c, slug: slugifyCity(c.name) }))
    .find(c => c.slug === citySlug);

  const mType = mealSlugToType[mealSlug];
  if (!city || mType === undefined) return {};

  const mealTR = humanMeal(mealSlug);
  const title = `${city.name} KYK ${mealTR} Menüsü (Bugün)`;
  const desc  = `${city.name} KYK yurtları ${mealTR.toLowerCase()} menüsü: çorba, ana yemek, yardımcılar ve tatlılar. Günlük güncellenir.`;

  return {
    metadataBase: new URL("https://kykyemekliste.com"),
    title,
    description: desc,
    alternates: { canonical: `/${citySlug}/${mealSlug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://kykyemekliste.com/${citySlug}/${mealSlug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description: desc },
  };
}

// ── Sayfa
export default async function Page(props: { params: Params; searchParams: SearchParams }) {
  // ✅ params ve searchParams'ı await et
  const { city: citySlug, meal: mealSlug } = await props.params;
  const sp = await props.searchParams;

  const cities = await getCities();
  const withSlug = cities.map(c => ({ ...c, slug: slugifyCity(c.name) }));
  const city = withSlug.find(c => c.slug === citySlug);
  const mType = mealSlugToType[mealSlug];
  if (!city || mType === undefined) return notFound();

  // ✅ d parametresi dizi gelebilir → normalize et
  const dParam = Array.isArray(sp.d) ? sp.d[0] : sp.d;
  const dateISO = dParam && dParam.trim().length ? dParam : undefined;

  const menu = await getMenu(city.id, mType, dateISO);
  const dateLabel = dateISO ?? new Date().toISOString().split("T")[0];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        {city.name} KYK {humanMeal(mealSlug)} Menüsü
      </h1>
      <p className="text-sm text-gray-600 mb-6">Tarih: {dateLabel}</p>

      <ul className="space-y-3">
        {menu?.length
          ? menu.map((it: MenuItem, i: number) => (
              <li key={i} className="p-4 rounded-lg border">
                <div className="font-medium">{it.name}</div>
                {"description" in it && it.description ? (
                  <div className="text-sm text-gray-600">{it.description}</div>
                ) : null}
              </li>
            ))
          : <li className="text-gray-500">Bugün için menü bulunamadı.</li>}
      </ul>

      {/* JSON-LD: WebPage + Breadcrumb + ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${city.name} KYK ${mealSlug} menüsü`,
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://kykyemekliste.com" },
                { "@type": "ListItem", "position": 2, "name": city.name, "item": `https://kykyemekliste.com/${citySlug}` },
                { "@type": "ListItem", "position": 3, "name": humanMeal(mealSlug) }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": (menu ?? []).map((m: MenuItem, idx: number) => ({
                "@type": "MenuItem",
                "position": idx + 1,
                "name": m.name,
                ...( "description" in m && m.description ? { "description": m.description } : {})
              }))
            }
          })
        }}
      />
    </main>
  );
}
