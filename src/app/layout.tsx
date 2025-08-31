// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  // Mutlaka gerçek domainini baz al
  metadataBase: new URL("https://kykyemekliste.com"),

  // Başlık şablonu
  title: {
    default: "KYK Yemek Listesi",
    template: "%s | Yurt Menü",
  },

  // Kısa ve anahtar kelimeli açıklama
  description:
    "KYK yurtlarının günlük yemek menüsü. Şehre ve öğüne göre kahvaltı, öğle ve akşam menülerini hızlıca görüntüleyin.",

  // İsteğe bağlı ama güzel olur
  keywords: [
    "KYK", "yemek listesi", "yurt menü", "KYK yemek", "KYK menü",
    "kahvaltı", "öğle", "akşam", "öğrenci yurdu", "yemek menüsü",
  ],

  applicationName: "Yurt Menü",
  category: "Food & Drink",
  alternates: { canonical: "/" },

  // Open Graph
  openGraph: {
    type: "website",
    siteName: "Yurt Menü",
    title: "KYK Yemek Listesi",
    description:
      "KYK yurtlarının günlük yemek menüsü: şehir ve öğüne göre anında görüntüleyin.",
    url: "https://kykyemekliste.com",
    locale: "tr_TR",
    // /public içine og-default.png eklersen burada otomatik kullanılır
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Yurt Menü – KYK Yemek Listesi" }],
  },

  // Twitter kartı
  twitter: {
    card: "summary_large_image",
    title: "KYK Yemek Listesi",
    description:
      "KYK yurtlarının günlük yemek menüsü. Şehre ve öğüne göre hızlıca bakın.",
    site: "@TODO_twitter",     // TODO: varsa hesap adı
    creator: "@TODO_twitter",  // TODO: varsa hesap adı
    images: ["/og-default.png"],
  },

  // Robotlar (GoogleBot ayarıyla birlikte)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // İkonlar (public/ içine dosyaları ekle)
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  // Site doğrulama (Search Console vs) — .env'den alırsan pratik olur
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    // bing: "TODO",
  },

  // (Opsiyonel) Manifest’in varsa
  // manifest: "/site.webmanifest",
};

// Renk/viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#69C2D3", // markana yakın
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}

        {/* JSON-LD: WebSite + Organization (temel) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Yurt Menü",
                "url": "https://kykyemekliste.com"
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Yurt Menü",
                "url": "https://kykyemekliste.com",
                "logo": "https://kykyemekliste.com/icon.png"
                // "sameAs": ["https://twitter.com/TODO","https://www.instagram.com/TODO"] // varsa ekle
              }
            ]),
          }}
        />
      </body>
    </html>
  );
}
