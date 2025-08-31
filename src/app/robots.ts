import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://kykyemekliste.com";

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/admin"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
