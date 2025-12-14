// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://kykyemekliste.com"),
  title: { default: "KYK Yemek Listesi | Güncel Yurt Menüsü 2025", template: "%s | KYK Yemek Listesi" },
  description:
    "KYK yemek listesi bugün ne var? Güncel yurt menüsü ve günlük yemekler. 81 il KYK yurtlarının kahvaltı ve akşam yemek listesini şehir bazında görüntüleyin. Aylık menü takvimi.",
  keywords: [
    "KYK menüsü","KYK menü","KYK yemek listesi","yurt yemek menüsü","güncel yurt menüsü",
    "KYK kahvaltı menüsü","KYK akşam menüsü","kyk yemek listesi bugün","yurt yemekleri",
    "öğrenci yurdu menü","günlük yemek listesi","aylık yurt menüsü 2025","KYK beslenme",
    "istanbul KYK menü","ankara KYK yemek","izmir yurt menüsü","bursa KYK","antalya yurt",
    "KYK yurtları yemek listesi","yurt sabah kahvaltısı","yurt akşam yemeği","öğrenci menüsü",
    "KYK günlük menü","yurt beslenme programı","kredi yurtlar kurumu menü","devlet yurdu menü",
    "kyk menü bugün","kyk menü 2025","öğrenci yurdu yemekleri","yurt yemek çeşitleri",
    "kyk yemek menüsü aylık","güncel KYK menüsü","yurt yemeği ne var","kyk yurt yemekleri listesi",
  ],
  applicationName: "KYK Yemek Listesi",
  category: "Food & Drink",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "KYK Yemek Listesi",
    title: "KYK Yemek Listesi | Güncel Yurt Menüsü 2025",
    description:
      "KYK yemek listesi: Güncel yurt menüsü ve yemekleri. Kahvaltıda peynir, zeytin, yumurta; akşamda çorba, pilav, ana yemek. 81 il KYK yurt yemek listesi.",
    url: "https://kykyemekliste.com",
    locale: "tr_TR",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "KYK Menüsü – Güncel Yurt Yemek Listesi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KYK Yemek Listesi | Güncel Yurt Menüsü",
    description: "KYK yemek listesi: Güncel yurt menüsü. Kahvaltıda peynir, zeytin, yumurta; akşamda çorba, pilav. 81 il yurt yemekleri.",
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
                  "name": "KYK Yemek Listesi",
                  "description": "Türkiye genelindeki KYK yurt yemek listesi ve güncel menüleri",
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
                  "name": "KYK Yemek Listesi",
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
