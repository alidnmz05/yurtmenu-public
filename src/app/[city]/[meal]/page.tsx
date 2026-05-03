import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mealSlugToType, mealTypeToSlug, humanMeal, slugifyCity, ALL_CITIES_TR, findCityBySlug } from "@/lib/seo-maps";
import CityMenuPage from "./CityMenuPage";

export const revalidate = 3600;   // içerik günlük -> 1 saat iyi

// ── SEO meta

type Params = Promise<{ city: string; meal: string }>;
type SearchParams = Promise<{ d?: string | string[] }>;

// ── Static params generation for all 81 cities and meal types
export async function generateStaticParams() {
  const params: { city: string; meal: string }[] = [];
  
  // 81 il × 4 öğün URL'i (kahvalti, sabah, ogle, aksam)
  ALL_CITIES_TR.forEach(cityName => {
    const citySlug = slugifyCity(cityName);
    params.push({ city: citySlug, meal: "kahvalti" });
    params.push({ city: citySlug, meal: "sabah" });
    params.push({ city: citySlug, meal: "ogle" });
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
  const now = new Date();
  const monthsTR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const monthStr = `${monthsTR[now.getMonth()]} ${now.getFullYear()}`;

  const title = `${cityName} KYK ${mealTR} Menüsü (${monthStr}) - Güncel Yurt Yemekleri`;
  const desc  = `${cityName} KYK yurtları ${mealTR.toLowerCase()} menüsü (${monthStr}). Güncel yurt yemek listesi, çorba, ana yemek ve yan ürünler. Aylık menü bilgileri.`;

  const canonicalSlug = mealTypeToSlug[mType];

  return {
    metadataBase: new URL("https://kykyemekliste.com"),
    title,
    description: desc,
    alternates: { canonical: `/${citySlug}/${canonicalSlug}` },
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
      url: `https://kykyemekliste.com/${citySlug}/${canonicalSlug}`,
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

  const mealTR = humanMeal(mealSlug);
  const canonicalSlug = mealTypeToSlug[mType];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${cityName} KYK ${mealTR} Menüsü`,
    "description": `${cityName} KYK yurtları ${mealTR.toLowerCase()} menüsü. Güncel yurt yemek listesi.`,
    "url": `https://kykyemekliste.com/${citySlug}/${canonicalSlug}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://kykyemekliste.com" },
        { "@type": "ListItem", "position": 2, "name": "Şehirler", "item": "https://kykyemekliste.com/sehirler" },
        { "@type": "ListItem", "position": 3, "name": cityName, "item": `https://kykyemekliste.com/${citySlug}/${canonicalSlug}` }
      ]
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `${cityName} KYK yurtlarında ${mealTR.toLowerCase()} saat kaçta başlıyor?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KYK yurtlarında genellikle kahvaltı 06:30 - 12:00, akşam yemeği ise 16:00 - 22:30 saatleri arasında servis edilmektedir. Saatler yurttan yurda küçük değişiklikler gösterebilir."
        }
      },
      {
        "@type": "Question",
        "name": `${cityName} KYK ${mealTR.toLowerCase()} menüsü ne zaman güncellenir?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yemek menüleri aylık olarak KYK idareleri tarafından belirlenir ve sistemimize düzenli olarak eklenir. Güncel ayın menüsünü sayfamızdan günlük takip edebilirsiniz."
        }
      }
    ]
  };

  // Key ile component'i force re-render yap
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqLd]) }}
      />
      <CityMenuPage key={`${citySlug}-${mealSlug}`} initialCitySlug={citySlug} initialMealType={mType} />
    </>
  );
}
