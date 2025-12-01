import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCities } from "@/lib/api";
import { mealSlugToType, humanMeal, slugifyCity } from "@/lib/seo-maps";
import CityMenuPage from "./CityMenuPage";

export const revalidate = 3600;   // içerik günlük -> 1 saat iyi

// ── SEO meta

type Params = Promise<{ city: string; meal: string }>;
type SearchParams = Promise<{ d?: string | string[] }>;

// ── Static params generation for all city/meal combinations
export async function generateStaticParams() {
  const cities = await getCities();
  const params: { city: string; meal: string }[] = [];
  
  cities.forEach(city => {
    const citySlug = slugifyCity(city.name);
    // Her şehir için kahvalti ve aksam sayfaları oluştur
    params.push({ city: citySlug, meal: "kahvalti" });
    params.push({ city: citySlug, meal: "aksam" });
  });
  
  return params;
}



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
  const title = `${city.name} KYK ${mealTR} Menüsü - Güncel Yurt Yemekleri`;
  const desc  = `${city.name} KYK yurtları ${mealTR.toLowerCase()} menüsü. Güncel yurt yemek listesi, çorba, ana yemek ve yan ürünler. Aylık menü bilgileri.`;

  return {
    metadataBase: new URL("https://kykyemekliste.com"),
    title,
    description: desc,
    alternates: { canonical: `/${citySlug}/${mealSlug}` },
    keywords: [
      `${city.name} KYK yurt menüsü`,
      `${city.name} yurt ${mealSlug}`,
      `KYK ${city.name} yemek listesi`,
      `${city.name} öğrenci yurdu menü`,
      `KYK ${mealTR} menüsü`,
      `yurt yemekleri ${city.name}`,
    ],
    openGraph: {
      title,
      description: desc,
      url: `https://kykyemekliste.com/${citySlug}/${mealSlug}`,
      type: "website",
      siteName: "KYK Yemek Liste",
      locale: "tr_TR",
    },
    twitter: { 
      card: "summary_large_image", 
      title, 
      description: desc,
      site: "@kykyemekliste"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

// ── Sayfa
export default async function Page(props: { params: Params; searchParams: SearchParams }) {
  // ✅ params ve searchParams'ı await et
  const { city: citySlug, meal: mealSlug } = await props.params;

  const cities = await getCities();
  const withSlug = cities.map(c => ({ ...c, slug: slugifyCity(c.name) }));
  const city = withSlug.find(c => c.slug === citySlug);
  const mType = mealSlugToType[mealSlug];
  if (!city || mType === undefined) return notFound();

  // Key ile component'i force re-render yap
  return <CityMenuPage key={`${citySlug}-${mealSlug}`} initialCitySlug={citySlug} initialMealType={mType} />;
}
