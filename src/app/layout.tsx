// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://kykyemekliste.com"),
  title: { default: "KYK Yemek Listesi - 81 İl Güncel Yurt Menüleri", template: "%s | KYK Yemek Liste" },
  description:
    "Türkiye'nin 81 ilindeki KYK yurtlarının güncel yemek menüleri. Kahvaltı ve akşam yemeği listelerini görüntüleyin. Günlük güncellenen menüler, beslenme bilgileri ve kalori değerleri.",
  keywords: [
    "KYK yemek listesi","KYK menü","yurt yemekleri","KYK kahvaltı menüsü","KYK akşam menüsü",
    "öğrenci yurdu menü","günlük yemek listesi","aylık yurt menüsü","KYK beslenme",
    "istanbul KYK menü","ankara KYK yemek","izmir yurt menüsü","bursa KYK","antalya yurt",
    "KYK yurtları yemek listesi","yurt sabah kahvaltısı","yurt akşam yemeği","öğrenci menüsü",
    "KYK günlük menü","yurt beslenme programı","kredi yurtlar kurumu menü","devlet yurdu menü",
    "kyk menü 2024","kyk menü 2025","öğrenci yurdu yemekleri","yurt yemek çeşitleri",
    "kalori değerleri","beslenme bilgisi","sağlıklı yurt menüsü","dengeli beslenme KYK",
  ],
  applicationName: "KYK Yemek Liste",
  category: "Food & Drink",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "KYK Yemek Liste",
    title: "KYK Yemek Listesi - Güncel Yurt Menüleri",
    description:
      "KYK yurtlarının aylık yemek menüsü: şehir ve öğüne göre anında görüntüleyin. Sabah ve akşam menüleri her ay güncellenir.",
    url: "https://kykyemekliste.com",
    locale: "tr_TR",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "KYK Yemek Liste – Yurt Menüleri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KYK Yemek Listesi",
    description: "KYK yurtlarının günlük yemek menüsü. Şehre ve öğüne göre hızlıca bakın.",
    site: "@TODO_twitter",
    creator: "@TODO_twitter",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true, follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#69C2D3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {/* ✅ DÜZ AdSense script (head içinde) – next/script KULLANMA */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2074568539798437"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        {children}

        {/* JSON-LD - Organization & WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://kykyemekliste.com/#website",
                  "url": "https://kykyemekliste.com",
                  "name": "KYK Yemek Liste",
                  "description": "Türkiye genelindeki KYK yurtlarının günlük yemek menüleri",
                  "publisher": { "@id": "https://kykyemekliste.com/#organization" },
                  "inLanguage": "tr-TR",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://kykyemekliste.com/sehirler?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://kykyemekliste.com/#organization",
                  "name": "KYK Yemek Liste",
                  "url": "https://kykyemekliste.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://kykyemekliste.com/icon.png",
                    "width": 512,
                    "height": 512
                  },
                  "sameAs": [
                    "https://github.com/alidnmz05/yurtmenu-public"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer support",
                    "url": "https://kykyemekliste.com/iletisim",
                    "availableLanguage": "Turkish"
                  }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
