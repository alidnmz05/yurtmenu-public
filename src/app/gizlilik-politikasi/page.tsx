// app/gizlilik-politikasi/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Yurt Menü",
  description:
    "Yurt Menü gizlilik politikası: hangi verileri topluyoruz, nasıl kullanıyoruz ve haklarınız.",
};

const UPDATED = "1 Eylül 2025";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Amaç",
      desc: (
        <>
          Bu Gizlilik Politikası, <strong>Yurt Menü</strong>’nün ({" "}
          <a href="https://kykyemekliste.com" className="underline">kykyemekliste.com</a>{" "}
          ) ziyaretçilerin verilerini nasıl işlediğini açıklar. Amacımız, menü
          bilgilerine hızlı erişim sağlarken kişisel verilerin korunmasıdır.
        </>
      ),
    },
    {
      title: "Topladığımız Veriler",
      list: [
        <span key="1">
          <strong>Zorunlu teknik veriler</strong>: IP, tarayıcı/cihaz bilgisi,
          sayfa görüntülemeleri (sunucu güvenliği ve temel işlevler için).
        </span>,
        <span key="2">
          <strong>Çerezler</strong>: Tercihlerinizi (ör. seçilen şehir/öğün) hatırlamak
          ve site performansını ölçmek için kullanılabilir.
        </span>,
        <span key="3">
          <strong>İletişim formu verileri</strong>: Ad, e-posta, mesaj metni (sadece
          talebinizi yanıtlamak için).
        </span>,
        <span key="4">
          <strong>Analitik veriler</strong>: Toplu trafik istatistikleri (hangi
          sayfalar ne kadar görüntülendi gibi anonimleştirilmiş ölçümler).
        </span>,
      ],
    },
    {
      title: "Verileri Nasıl Kullanıyoruz?",
      list: [
        "Hizmeti sunmak ve geliştirmek",
        "Hataları tespit etmek, güvenliği sağlamak",
        "Kullanıcı deneyimini kişiselleştirmek (isteğe bağlı tercihler)",
        "Yasal yükümlülükleri yerine getirmek",
      ],
    },
    {
      title: "Çerezler",
      desc: (
        <>
          Çerezler; oturumunuzu sürdürmek, tercihlerinizi hatırlamak, istatistik
          oluşturmak için kullanılabilir. Tarayıcınızın ayarlarından çerezleri
          yönetebilir veya silebilirsiniz. Çerezleri devre dışı bırakmanız, bazı
          özelliklerin kısıtlanmasına yol açabilir.
        </>
      ),
    },
    {
      title: "Üçüncü Taraflar",
      list: [
        <span key="1">
          <strong>Analitik</strong>: Trafik ve performans ölçümü için üçüncü taraf
          analitik araçları kullanılabilir (ör. sayfa görüntülenme sayıları).
        </span>,
        <span key="2">
          <strong>Reklam</strong>: Google AdSense gibi ağlar reklam sunabilir. Bu
          hizmetler, ilgi alanına dayalı reklamcılık için çerez kullanabilir.
        </span>,
      ],
      note:
        "Üçüncü tarafların veri işleme politikaları, kendi gizlilik ilkelerine tabidir.",
    },
    {
      title: "Veri Saklama Süreleri",
      desc: (
        <>
          Zorunlu log kayıtları güvenlik ve yasal yükümlülükler kapsamında makul bir
          süre saklanır. İletişim formu mesajları, talebiniz sonuçlanana kadar ve
          gerektiği sürece tutulur. Saklama süreleri dolduğunda veriler silinir veya
          anonimleştirilir.
        </>
      ),
    },
    {
      title: "Haklarınız",
      list: [
        "Erişim: Hakkınızda işlenen verilere erişim talep edebilirsiniz.",
        "Düzeltme/Silme: Eksik ya da hatalı verilerin düzeltilmesini veya silinmesini talep edebilirsiniz.",
        "İtiraz: Meşru menfaat kapsamında yapılan işleme faaliyetlerine itiraz edebilirsiniz.",
        "Taşınabilirlik: Mevzuat elverdiği ölçüde verilerinizin taşınmasını talep edebilirsiniz.",
      ],
      note:
        "Talepleriniz mevzuata uygun olarak en kısa sürede sonuçlandırılır.",
    },
    {
      title: "KVKK / GDPR Notu",
      desc: (
        <>
          Türkiye’de <strong>KVKK</strong> ve uygun olduğunda <strong>GDPR</strong>
          kapsamındaki yükümlülüklere riayet ederiz. İlgili başvurular için aşağıdaki
          iletişim kanallarını kullanabilirsiniz.
        </>
      ),
    },
    {
      title: "İletişim",
      desc: (
        <>
          <Link href="/iletisime" className="underline">/iletisime</Link> sayfasını kullanabilir veya{" "}
          <a href="mailto:destek@kykyemekliste.com" className="underline">
            destek@kykyemekliste.com
          </a>{" "}
          adresine e-posta gönderebilirsiniz.
        </>
      ),
    },
    {
      title: "Değişiklikler",
      desc: (
        <>
          Bu politika zaman zaman güncellenebilir. Önemli değişiklikleri sitede
          duyururuz. Güncel sürüm her zaman bu sayfada yayınlanır.
        </>
      ),
    },
  ];

  return (
    <main className="relative">
      {/* Gradient arka plan */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(105,194,211,0.35),rgba(105,194,211,0)_60%)]" />

      <section className="mx-auto w-full max-w-5xl px-6 pt-12 pb-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-black/70 dark:text-white/70 backdrop-blur">
            Son güncelleme: {UPDATED}
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
            Gizlilik Politikası
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-black/70 dark:text-white/70 sm:text-base">
            Hangi verileri topladığımız, nasıl işlediğimiz ve haklarınız hakkında özet bilgiler.
          </p>
        </div>

        {/* Glass kart içerik */}
        <article className="mx-auto mt-8 max-w-3xl rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-semibold text-black dark:text-white">{s.title}</h2>
                {s.desc && (
                  <p className="mt-2 leading-relaxed text-black/70 dark:text-white/70">{s.desc}</p>
                )}
                {s.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-black/70 dark:text-white/70">
                    {s.list.map((li, i) => (
                      <li key={i} className="leading-relaxed">
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
                {"note" in s && s.note ? (
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">{s.note}</p>
                ) : null}
              </section>
            ))}

            {/* CTA kutusu */}
            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-black/10 bg-gradient-to-r from-[#69C2D3]/20 to-transparent p-4 sm:flex-row dark:border-white/10">
              <div>
                <h3 className="text-base font-semibold text-black dark:text-white">Veri talebi mi yapmak istiyorsunuz?</h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  KVKK/GDPR kapsamındaki talepleriniz için bize ulaşın.
                </p>
              </div>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                İletişime geç
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* JSON-LD: PrivacyPolicy (Schema.org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "name": "Yurt Menü Gizlilik Politikası",
            "url": "https://kykyemekliste.com/gizlilik-politikasi",
            "dateModified": "2025-09-01",
            "publisher": {
              "@type": "Organization",
              "name": "Yurt Menü",
              "url": "https://kykyemekliste.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kykyemekliste.com/icon.png"
              }
            }
          }),
        }}
      />
    </main>
  );
}
