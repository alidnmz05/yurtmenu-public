import type { MetadataRoute } from "next";
import { getCities } from "@/lib/api";               // alias çalışmıyorsa: ../../lib/api
import { slugifyCity, mealTypeToSlug } from "@/lib/seo-maps"; // alias çalışmıyorsa: ../../lib/seo-maps

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://kykyemekliste.com";

  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`,         changeFrequency: "daily",  priority: 1.0, lastModified: new Date() },
    { url: `${base}/sehirler`, changeFrequency: "weekly", priority: 0.8, lastModified: new Date() },
    { url: `${base}/hakkinda`, changeFrequency: "monthly", priority: 0.6, lastModified: new Date() },
    { url: `${base}/rehber`, changeFrequency: "monthly", priority: 0.7, lastModified: new Date() },
    { url: `${base}/sss`, changeFrequency: "monthly", priority: 0.7, lastModified: new Date() },
    { url: `${base}/iletisim`, changeFrequency: "monthly", priority: 0.5, lastModified: new Date() },
    { url: `${base}/gizlilik-politikasi`, changeFrequency: "yearly", priority: 0.3, lastModified: new Date() },
  ];

  try {
    const cities = await getCities();
    for (const c of cities) {
      const slug = slugifyCity(c.name);
      for (const meal of mealTypeToSlug) {
        urls.push({
          url: `${base}/${slug}/${meal}`,
          changeFrequency: "daily",
          priority: 0.7,
          lastModified: new Date(),
        });
      }
    }
  } catch {
    // API geçici hata verirse temel URL'lerle yetin
  }

  return urls;
}
