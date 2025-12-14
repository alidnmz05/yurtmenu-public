import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://kykyemekliste.com";

  return {
    rules: [
      { 
        userAgent: "*", 
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 0, // Hızlı crawl
      }
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
