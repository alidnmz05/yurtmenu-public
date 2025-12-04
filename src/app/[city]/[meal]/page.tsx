import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mealSlugToType, humanMeal, slugifyCity, ALL_CITIES_TR, findCityBySlug } from "@/lib/seo-maps";
import CityMenuPage from "./CityMenuPage";

export const revalidate = 3600;   // içerik günlük -> 1 saat iyi

// ── SEO meta

type Params = Promise<{ city: string; meal: string }>;
type SearchParams = Promise<{ d?: string | string[] }>;

// ── Static params generation for all 81 cities and 3 meal types
export async function generateStaticParams() {
  const params: { city: string; meal: string }[] = [];
  
  // 81 il × 2 öğün (kahvaltı, akşam) = 162 sayfa
  ALL_CITIES_TR.forEach(cityName => {
    const citySlug = slugifyCity(cityName);
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

  // 81 il listesinden şehir ismini bul
  const cityName = findCityBySlug(citySlug);
  const mType = mealSlugToType[mealSlug];
  if (!cityName || mType === undefined) return {};

  const mealTR = humanMeal(mealSlug);
  const title = `${cityName} KYK ${mealTR} Menüsü - Güncel Yurt Yemekleri`;
  const desc  = `${cityName} KYK yurtları ${mealTR.toLowerCase()} menüsü. Güncel yurt yemek listesi, çorba, ana yemek ve yan ürünler. Aylık menü bilgileri.`;

  return {
    metadataBase: new URL("https://kykyemekliste.com"),
    title,
    description: desc,
    alternates: { canonical: `/${citySlug}/${mealSlug}` },
    keywords: [
      `${cityName} KYK yurt menüsü`,
      `${cityName} yurt ${mealSlug}`,
      `KYK ${cityName} yemek listesi`,
      `${cityName} öğrenci yurdu menü`,
      `KYK ${mealTR} menüsü`,
      `yurt yemekleri ${cityName}`,
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

  const cityName = findCityBySlug(citySlug);
  const mType = mealSlugToType[mealSlug];
  if (!cityName || mType === undefined) return notFound();

  // Key ile component'i force re-render yap
  return <CityMenuPage key={`${citySlug}-${mealSlug}`} initialCitySlug={citySlug} initialMealType={mType} />;
}
