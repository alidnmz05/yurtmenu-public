// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://kykyemekliste.com"),
  title: { default: "KYK Yemek Listesi", template: "%s | Yurt Menü" },
  description:
    "KYK yurtlarının günlük yemek menüsü. Şehre ve öğüne göre kahvaltı, öğle ve akşam menülerini hızlıca görüntüleyin.",
  keywords: [
    "KYK","yemek listesi","yurt menü","KYK yemek","KYK menü",
    "kahvaltı","öğle","akşam","öğrenci yurdu","yemek menüsü",
  ],
  applicationName: "Yurt Menü",
  category: "Food & Drink",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Yurt Menü",
    title: "KYK Yemek Listesi",
    description:
      "KYK yurtlarının günlük yemek menüsü: şehir ve öğüne göre anında görüntüleyin.",
    url: "https://kykyemekliste.com",
    locale: "tr_TR",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Yurt Menü – KYK Yemek Listesi" }],
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

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              { "@context":"https://schema.org", "@type":"WebSite", "name":"Yurt Menü", "url":"https://kykyemekliste.com" },
              { "@context":"https://schema.org", "@type":"Organization", "name":"Yurt Menü", "url":"https://kykyemekliste.com", "logo":"https://kykyemekliste.com/icon.png" }
            ]),
          }}
        />
      </body>
    </html>
  );
}
