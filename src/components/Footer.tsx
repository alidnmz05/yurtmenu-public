"use client";

import Link from "next/link";
import { slugifyCity } from "@/lib/seo-maps";

const POPULAR_CITIES = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", 
  "Konya", "Adana", "Eskişehir", "Kocaeli", "Samsun", 
  "Trabzon", "Kayseri", "Gaziantep", "Diyarbakır", "Erzurum"
];

export default function Footer() {
  return (
    <footer className="border-t mt-10 bg-gray-50 pt-10 pb-8 border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Popular Cities SEO Block */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">
            📍 Popüler Şehirler Yurt Menüleri
          </h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_CITIES.map(city => (
              <Link 
                key={city}
                href={`/${slugifyCity(city)}/kahvalti`}
                className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title={`${city} KYK Yemek Listesi`}
              >
                {city}
              </Link>
            ))}
            <Link 
              href="/sehirler"
              className="text-xs px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-blue-800 font-medium hover:bg-blue-200 transition-colors"
              title="Tüm Şehirler"
            >
              Tüm Şehirleri Gör &rarr;
            </Link>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} KYK Yemek Liste. Bağımsız öğrenci projesidir.</p>
          <nav className="flex flex-wrap gap-4 justify-center">
            <Link href="/hakkinda" className="hover:text-blue-600 hover:underline transition-colors">Hakkında</Link>
            <Link href="/rehber" className="hover:text-blue-600 hover:underline transition-colors">Rehber</Link>
            <Link href="/sss" className="hover:text-blue-600 hover:underline transition-colors">SSS</Link>
            <Link href="/iletisim" className="hover:text-blue-600 hover:underline transition-colors">İletişim</Link>
            <Link href="/gizlilik-politikasi" className="hover:text-blue-600 hover:underline transition-colors">Gizlilik Politikası</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
