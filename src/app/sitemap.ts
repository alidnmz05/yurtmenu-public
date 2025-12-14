import type { MetadataRoute } from "next";
import { slugifyCity, ALL_CITIES_TR } from "@/lib/seo-maps";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://kykyemekliste.com";

  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`,         changeFrequency: "daily",  priority: 1.0, lastModified: now },
    { url: `${base}/sehirler`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${base}/hakkinda`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${base}/rehber`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/sss`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/iletisim`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
    { url: `${base}/gizlilik-politikasi`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
  ];

  // 81 il için tüm sayfa URL'lerini ekle
  for (const cityName of ALL_CITIES_TR) {
    const slug = slugifyCity(cityName);
    // Her şehir için kahvaltı ve akşam sayfaları
    urls.push({
      url: `${base}/${slug}/kahvalti`,
      changeFrequency: "daily",
      priority: 0.8,
      lastModified: new Date(),
    });
    urls.push({
      url: `${base}/${slug}/aksam`,
      changeFrequency: "daily",
      priority: 0.8,
      lastModified: new Date(),
    });
  }

  return urls;
}
