import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KYK Yurtları Rehberi - Bilmeniz Gerekenler",
  description: "KYK yurtları hakkında detaylı bilgiler, başvuru süreci, yurt kuralları, yemek hizmetleri ve öğrenci yaşamı rehberi.",
  alternates: { canonical: "/rehber" },
};

const articles = [
  {
    title: "KYK Yurtlarına Başvuru Rehberi",
    slug: "basvuru-rehberi",
    content: `
## KYK Yurtlarına Nasıl Başvurulur?

KYK (Kredi ve Yurtlar Kurumu) yurtlarına başvuru süreci her yıl belirli dönemlerde açılır. İşte adım adım başvuru rehberi:

### Başvuru Zamanı
- **İlk Yerleştirme:** Genellikle Temmuz-Ağustos ayları
- **Ek Yerleştirme:** Eylül-Ekim ayları
- **Boş Kontenjan:** Yıl boyunca

### Başvuru Adımları

1. **e-Devlet'e Giriş Yapın**
   - e-Devlet şifrenizle sisteme giriş yapın
   - "KYK Yurt Başvurusu" hizmetini bulun

2. **Gerekli Belgeler**
   - Öğrenci belgesi
   - Nüfus cüzdanı fotokopisi
   - Gelir belgesi (varsa)
   - Engel durumu belgesi (varsa)

3. **Tercih Yapma**
   - En fazla 12 yurt tercihi yapabilirsiniz
   - İlk tercihlerinizi dikkatli seçin
   - Okul yakınlığını göz önünde bulundurun

4. **Başvuru Sonuçları**
   - Sonuçlar e-Devlet'ten açıklanır
   - SMS ile bildirim gelir
   - Yerleşme hakkı kazananlara süre verilir

### Önemli Notlar
- Başvuru ücretsizdir
- Yanlış bilgi vermek başvurunuzu iptal edebilir
- Süresinde müracaat etmeyi unutmayın
    `
  },
  {
    title: "KYK Yurt Kuralları ve Düzeni",
    slug: "yurt-kurallari",
    content: `
## KYK Yurtlarında Uyulması Gereken Kurallar

KYK yurtlarında kalan öğrencilerin uyması gereken temel kurallar:

### Giriş-Çıkış Saatleri
- **Kız Öğrenci Yurtları:** Genellikle 22:00'ye kadar giriş
- **Erkek Öğrenci Yurtları:** Genellikle gece yarısına kadar
- Hafta sonları saatler değişebilir
- İzin belgesi ile geç giriş mümkün olabilir

### Oda Kuralları
- Odalar düzenli ve temiz tutulmalı
- Elektrikli ısıtıcı kullanımı yasak
- Sigara içmek kesinlikle yasak
- Yüksek sesle müzik dinlenemez

### Misafir Kuralları
- Karşı cinsten misafir kabul edilemez
- Misafir kabul için izin gerekir
- Misafir sadece belirli saatlerde kalabilir
- Misafir defterine kayıt zorunlu

### Yasaklar
- Alkol ve uyuşturucu madde kullanımı
- Kumar ve benzeri faaliyetler
- Yurda evcil hayvan getirme
- Yurt malzemelerini zarar verme

### Disiplin Cezaları
- Uyarı
- Kınama
- Yurttan çıkarma

### Haklarınız
- Temiz ve güvenli ortam
- 3 öğün yemek hizmeti
- İnternet erişimi
- Çalışma odaları
- Spor ve sosyal alanlar
    `
  },
  {
    title: "KYK Yurtlarında Beslenme ve Menüler",
    slug: "beslenme-menüler",
    content: `
## KYK Yurtlarında Yemek Hizmetleri

KYK yurtları öğrencilere günlük beslenme hizmeti sunar. İşte bilmeniz gerekenler:

### Öğün Saatleri
- **Kahvaltı:** 06:30 - 12:00 arası
- **Akşam Yemeği:** 16:00 - 22:00 arası

### Menü Planlaması
- Menüler günlük olarak güncellenir
- Dengeli ve sağlıklı beslenme göz önünde tutulur
- Her öğünde çorba, ana yemek, pilav/makarna, salata sunulur
- Mevsimsel sebze ve meyveler tercih edilir

### Hijyen ve Kalite
- HACCP standartlarına uygun üretim
- Düzenli sağlık kontrolleri
- Temiz ve modern mutfaklar
- Kaliteli gıda tedarikçileri

### Özel Diyet İhtiyaçları
- Alerjiniz varsa yurt yönetimine bildirin
- Sağlık raporu ile özel menü talep edebilirsiniz
- Bazı öğünlerde etsiz (vejeteryan) yemek seçenekleri sunulmaktadır
- Dini/kültürel beslenme tercihlerine saygı gösterilir

### Menü Takibi
- Güncel menüleri sitemizden takip edebilirsiniz
- Haftalık menü panodan da duyurulur
- Mobil cihazlarınızdan kolayca erişim

### Yemek Saati Dışında
- Kantin hizmetleri mevcut
- Mutfak kullanımı genellikle yasak
- Oda içinde yemek pişirme yasak
    `
  },
  {
    title: "KYK Yurtlarında Ücret ve Ödeme",
    slug: "ucret-odeme",
    content: `
## KYK Yurt Ücretleri ve Ödeme Sistemi

### Güncel Ücretler
KYK yurt ücretleri her yıl YÖK tarafından belirlenir ve güncellenir. Ücretler:
- Üniversite türüne göre değişir
- Şehre göre farklılık gösterebilir
- Öğrenci türüne göre değişkenlik gösterir

### Ödeme Yöntemleri
1. **Banka Havalesi/EFT**
   - En yaygın ödeme yöntemi
   - Yurt idaresinin belirttiği hesaba

2. **Otomatik Ödeme**
   - KYK hesabınızdan otomatik tahsil
   - Aylık düzenli ödemeler

3. **Kredi Kartı**
   - Bazı yurtlarda kredi kartı ile ödeme

### Ödeme Dönemleri
- **Aylık Ödeme:** Her ayın başında
- **Dönemlik Ödeme:** Yarıyıl başında
- **Yıllık Ödeme:** İndirimli seçenek

### Burs ve İndirimler
- **Başarı Bursu:** Yüksek not ortalamasına sahip öğrenciler
- **Sosyal Yardım:** Maddi durumu kötü öğrenciler
- **Kardeş İndirimi:** Birden fazla kardeş yurtta kalıyorsa
- **Engelli İndirimi:** Engelli öğrenciler için

### Ücret Geri Ödemesi
- Yurttan ayrılırken kullanılmayan günler iade edilir
- İade süreci 30 gün içinde tamamlanır
- Banka hesabınıza aktarılır

### Ödeme Yapmama Durumunda
- İlk uyarı verilir
- İkinci ay için cezai işlem
- Üç ay ödeme yapılmazsa yurttan çıkarılma
    `
  },
  {
    title: "KYK Yurtlarında Sosyal Yaşam",
    slug: "sosyal-yasam",
    content: `
## KYK Yurtlarında Sosyal Aktiviteler ve Olanaklar

### Ortak Alanlar
- **Çalışma Odaları:** Sessiz çalışma ortamı
- **TV Odaları:** Film ve dizi izleme
- **Kafeterya:** Sosyalleşme alanı
- **Spor Salonu:** Fitness ve egzersiz (bazı yurtlarda)
- **Kütüphane:** Kitap ve kaynak erişimi

### Sosyal Aktiviteler
1. **Spor Turnuvaları**
   - Futbol, basketbol, voleybol
   - Satranç ve masa tenisi
   - Yıllık turnuvalar

2. **Kültürel Etkinlikler**
   - Konferanslar ve seminerler
   - Konser ve tiyatro gösterileri
   - Film gösterimleri

3. **Eğitim Programları**
   - Dil kursları
   - Bilgisayar eğitimleri
   - Hobi kursları (müzik, resim, vb.)

### Kulüp ve Topluluklar
- Öğrenci kulüpleri kurabilirsiniz
- Gönüllü faaliyetlere katılabilirsiniz
- Sosyal sorumluluk projeleri

### İnternet ve Teknoloji
- Tüm odalarda Wi-Fi
- Bilgisayar laboratuvarı
- Yazıcı ve fotokopi hizmetleri

### Ulaşım
- Kampüse servis hizmetleri
- Toplu taşıma kolaylığı
- Merkezi konumlar

### Güvenlik
- 7/24 güvenlik hizmeti
- Kamera sistemleri
- Güvenli giriş-çıkış sistemi
- Yangın alarm ve söndürme sistemleri

### Sağlık Hizmetleri
- Acil durumlarda revir hizmeti
- Yakın sağlık kuruluşlarıyla işbirliği
- Psikolojik danışmanlık (bazı yurtlarda)
    `
  },
  {
    title: "KYK Yurtlarında İnternet ve Teknoloji",
    slug: "internet-teknoloji",
    content: `
## KYK Yurtlarında İnternet ve Teknolojik Olanaklar

### İnternet Erişimi
- **Wi-Fi:** Tüm odalarda ve ortak alanlarda
- **Hız:** Genellikle yeterli hız sunulur
- **Kullanım Kotası:** Bazı yurtlarda sınırlı olabilir
- **Güvenlik:** Şifreli ağ bağlantısı

### Bilgisayar Olanakları
1. **Bilgisayar Laboratuvarı**
   - Öğrencilere ücretsiz bilgisayar erişimi
   - Yazılım programları mevcut
   - Baskı ve tarama hizmetleri

2. **Oda İçi Kullanım**
   - Kişisel bilgisayar kullanabilirsiniz
   - Elektrik tüketimi limitli olabilir
   - Güvenlik için dikkatli olun

### Akıllı Sistem
- Kimlikle giriş-çıkış
- Dijital menü görüntüleme
- Online başvuru ve şikayet sistemleri
- Mobil uygulamalar (bazı yurtlarda)

### İnternet Kullanım Kuralları
- Yasadışı içerik indirmek yasak
- Aşırı bant genişliği kullanımı kısıtlanabilir
- Kumar ve bahis siteleri engellenmiş
- Zararlı yazılım yaymak yasak

### Teknik Destek
- Bilgi işlem birimi yardımı
- İnternet sorunları için destek
- Cihaz arıza bildirimi

### Enerji Kullanımı
- Elektrik kesintilerinde jeneratör
- Tasarruflu kullanım önerilir
- Yüksek watt'lı cihazlar yasak
    `
  }
];

export default function Rehber() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(105,194,211,0.25),rgba(105,194,211,0)_60%)]" />

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            KYK Yurtları Rehberi
          </h1>
          <p className="text-lg text-gray-600">
            KYK yurtları hakkında bilmeniz gereken her şey
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="group rounded-2xl border border-gray-200 bg-white/70 p-8 shadow-sm backdrop-blur transition hover:shadow-lg"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-[#69C2D3] transition">
                {article.title}
              </h2>
              <div className="prose prose-gray max-w-none">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: article.content
                      .split('\n')
                      .slice(0, 10)
                      .join('\n')
                      .replace(/###/g, '<h4 class="font-semibold text-gray-900 mt-4 mb-2">')
                      .replace(/##/g, '<h3 class="font-bold text-gray-900 text-xl mt-6 mb-3">')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                      .replace(/- (.*?)$/gm, '<li class="ml-4">$1</li>')
                  }}
                />
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold text-[#69C2D3] hover:text-[#5AB3C4] transition">
                  Devamını Oku →
                </summary>
                <div
                  className="mt-4 prose prose-gray max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: article.content
                      .replace(/###/g, '<h4 class="font-semibold text-gray-900 mt-4 mb-2">')
                      .replace(/##/g, '<h3 class="font-bold text-gray-900 text-xl mt-6 mb-3">')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                      .replace(/- (.*?)$/gm, '<li class="ml-4">$1</li>')
                      .replace(/\n\n/g, '<br/><br/>')
                  }}
                />
              </details>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-r from-[#69C2D3]/20 to-transparent p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Daha fazla bilgi mi arıyorsunuz?
          </h3>
          <p className="mb-6 text-gray-700">
            Sıkça sorulan sorulara göz atın veya bizimle iletişime geçin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sss"
              className="inline-flex items-center justify-center rounded-lg border border-[#69C2D3] px-8 py-3 text-[#69C2D3] font-medium transition hover:bg-[#69C2D3] hover:text-white"
            >
              SSS Sayfası
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-lg bg-[#69C2D3] px-8 py-3 text-white font-medium shadow-md transition hover:bg-[#5AB3C4] hover:-translate-y-0.5 hover:shadow-lg"
            >
              İletişime Geç
            </Link>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-[#69C2D3] hover:underline font-medium">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
