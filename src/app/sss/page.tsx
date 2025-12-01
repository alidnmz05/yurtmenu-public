import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular - KYK Yemek Liste",
  description: "KYK yurt menüleri, yemek listeleri ve hizmetler hakkında sıkça sorulan sorular ve cevapları.",
  alternates: { canonical: "/sss" },
};

const faqData = [
  {
    category: "Menüler ve Yemekler",
    questions: [
      {
        q: "KYK yurt menüleri ne sıklıkla güncellenir?",
        a: "KYK yurt menüleri genellikle aylık olarak güncellenir. Sitemiz üzerinden güncel menülere erişebilirsiniz."
      },
      {
        q: "Tüm şehirlerin menülerini görebiliyor muyum?",
        a: "Sitemizde şu anda Türkiye'deki bazı illerin KYK yurt menüleri bulunmaktadır. Şehir sayımızı sürekli artırmaya devam ediyoruz. Şehir seçimi yaparak mevcut menüleri görüntüleyebilirsiniz."
      },
      {
        q: "Menülerde besin değerleri veya kalori bilgisi var mı?",
        a: "Şu anda sitemizde besin değeri bilgisi bulunmamaktadır. Sadece yemek isimleri ve içerikleri listelenmektedir. Detaylı besin bilgileri için KYK yönetiminize başvurabilirsiniz."
      },
      {
        q: "Öğle yemeği menüsü var mı?",
        a: "KYK yurtlarında genellikle kahvaltı ve akşam yemeği servisi yapılmaktadır. Öğle yemeği servisi yapan yurtlar için bilgilere sitemizden ulaşabilirsiniz."
      },
      {
        q: "Vejeteryan veya vegan menü seçeneği var mı?",
        a: "KYK yurtlarında bazı öğünlerde etsiz (vejeteryan) yemek seçenekleri sunulmaktadır. Menülerde etsiz alternatifler için yurt yönetiminizle iletişime geçebilirsiniz."
      }
    ]
  },
  {
    category: "Site Kullanımı",
    questions: [
      {
        q: "Siteyi mobil cihazlardan kullanabilir miyim?",
        a: "Evet, sitemiz tüm mobil cihazlarda ve tabletlerde sorunsuz çalışacak şekilde tasarlanmıştır. Telefonunuzun tarayıcısından kolayca erişebilirsiniz."
      },
      {
        q: "Geçmiş tarihlerdeki menülere bakabilir miyim?",
        a: "Evet, tarih seçici kullanarak önceki günlere ait menüleri görüntüleyebilirsiniz. Bu sayede geçmiş yemek listelerini kontrol edebilirsiniz."
      },
      {
        q: "Uygulama var mı?",
        a: "Şu anda mobil uygulamamız bulunmamaktadır ancak web sitemiz mobil uyumlu olup tüm özelliklerimize tarayıcınızdan erişebilirsiniz."
      },
      {
        q: "Site ücretsiz mi?",
        a: "Evet, sitemiz tamamen ücretsizdir. Herhangi bir kayıt veya ücret ödemeden tüm menülere erişebilirsiniz."
      }
    ]
  },
  {
    category: "KYK Yurtları Hakkında",
    questions: [
      {
        q: "KYK yurduna nasıl başvurabilirim?",
        a: "KYK yurt başvuruları e-Devlet üzerinden veya KYK resmi web sitesi üzerinden yapılmaktadır. Başvuru dönemleri genellikle her yıl Temmuz-Ağustos aylarında açılır."
      },
      {
        q: "KYK yurt ücretleri ne kadar?",
        a: "KYK yurt ücretleri her yıl YÖK tarafından belirlenir ve güncellenir. Güncel ücret bilgileri için KYK resmi web sitesini ziyaret edebilirsiniz."
      },
      {
        q: "Yemek saatleri nedir?",
        a: "Kahvaltı sabah 06:30-12:00 saatleri arasında, akşam yemeği ise öğleden sonra 16:00-22:00 saatleri arasında servis edilir. Ancak her yurdun saatleri farklılık gösterebilir."
      },
      {
        q: "Misafir yemek yiyebilir mi?",
        a: "Misafir yemek servisi yurttan yurda değişiklik gösterir. Bu konuda kaldığınız yurdun yönetimiyle iletişime geçmenizi öneririz."
      },
      {
        q: "Yemekten kalanlara ne oluyor?",
        a: "Yemek artıkları değerlendirilmekte ve çevre dostu uygulamalar çerçevesinde bertaraf edilmektedir. Bazı yurtlarda fazla yemekler gıda bankalarına bağışlanmaktadır."
      }
    ]
  },
  {
    category: "Teknik Sorular",
    questions: [
      {
        q: "Menüler neden yüklenmiyor?",
        a: "İnternet bağlantınızı kontrol edin. Sorun devam ederse sayfayı yenileyin veya farklı bir tarayıcı deneyin. Problem devam ederse iletişim sayfasından bize ulaşabilirsiniz."
      },
      {
        q: "Hatalı menü bilgisi görüyorum, nasıl bildirebilirim?",
        a: "İletişim sayfamızdan bize ulaşarak hatalı bilgileri bildirebilirsiniz. En kısa sürede düzeltme yapılacaktır."
      },
      {
        q: "Kendi şehrimdeki menüyü bulamıyorum?",
        a: "Şehir listesinden il seçiminizi yapın. Eğer şehriniz listede yoksa, yakın zamanda eklenecektir. Talep ve şikayetleriniz için bize yazabilirsiniz."
      }
    ]
  },
  {
    category: "Gizlilik ve Güvenlik",
    questions: [
      {
        q: "Verilerim güvende mi?",
        a: "Sitemizde kişisel bilgi toplamamaktayız. Sadece şehir seçiminiz tarayıcınızda saklanır. Detaylı bilgi için gizlilik politikamızı inceleyebilirsiniz."
      },
      {
        q: "Çerezler (cookies) kullanılıyor mu?",
        a: "Sitemiz temel işlevsellik için minimal çerez kullanır. Detaylar için gizlilik politikamızı okuyabilirsiniz."
      }
    ]
  }
];

export default function SSS() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(105,194,211,0.25),rgba(105,194,211,0)_60%)]" />

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-lg text-gray-600">
            KYK yurt menüleri ve hizmetlerimiz hakkında merak ettikleriniz
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqData.map((category, idx) => (
            <section key={idx} className="rounded-2xl border border-gray-200 bg-white/70 p-8 shadow-sm backdrop-blur">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((item, qIdx) => (
                  <div key={qIdx} className="border-l-4 border-[#69C2D3] pl-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {item.q}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-r from-[#69C2D3]/20 to-transparent p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Sorunuz cevapsız mı kaldı?
          </h3>
          <p className="mb-6 text-gray-700">
            Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center rounded-lg bg-[#69C2D3] px-8 py-3 text-white font-medium shadow-md transition hover:bg-[#5AB3C4] hover:-translate-y-0.5 hover:shadow-lg"
          >
            İletişime Geç
          </Link>
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
