// app/hakkinda/page.tsx  (veya mevcut route'un)
import Link from "next/link";

export default function Page() {
  const features = [
    {
      title: "Hızlı Erişim",
      desc: "Şehir ve öğüne göre menüler tek ekranda. Mobil dostu, hafif ve hızlı.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M7 12l-4-4m4 4l-4 4" />
        </svg>
      ),
    },
    {
      title: "Beslenme Takibi",
      desc: "Seçtiğin öğünlerle bilinçli beslenme hedeflerine yaklaş.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8M4 6h16v12H4z" />
        </svg>
      ),
    },
    {
      title: "Şeffaf Kaynak",
      desc: "Veriler kamuya açık kaynaklardan derlenir, topluluk geri bildirimiyle iyileştirilir.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      ),
    },
  ];

  return (
    <main className="relative">
      {/* Gradient arka plan */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(105,194,211,0.35),rgba(105,194,211,0)_60%)]" />

      <section className="mx-auto w-full max-w-5xl px-6 pt-12 pb-8">
        {/* Üst başlık */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-black/70 dark:text-white/70 backdrop-blur">
            Bağımsız öğrenci projesi
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
            Hakkında
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-black/70 dark:text-white/70 sm:text-base">
            KYK Yemek Liste, Türkiye genelindeki KYK yurtlarının aylık yemek menülerini kolayca görüntüleyebileceğiniz ücretsiz bir platformdur. Öğrencilerin yurt yemeklerini önceden görerek günlerini planlamalarına yardımcı olmayı amaçlıyoruz.
          </p>
        </div>

        {/* Cam efekti kart */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">Misyon</h2>
              <p className="mt-2 leading-relaxed text-black/70 dark:text-white/70">
                KYK yurtlarında kalan milyonlarca öğrencinin günlük menülere hızlı ve kolay erişimini sağlamak, 
                beslenme planlamalarını kolaylaştırmak ve yemek tercihlerini önceden görmelerini sağlamak. 
                Öğrenci dostu, hızlı ve mobil uyumlu bir platform sunmak temel misyonumuzdur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">Vizyon</h2>
              <p className="mt-2 leading-relaxed text-black/70 dark:text-white/70">
                Türkiye&apos;nin en kapsamlı ve güncel KYK yurt menü platformu olmak. Öğrencilere sadece menü 
                bilgisi sunmakla kalmayıp, beslenme tavsiyeleri, besin değerleri ve yurt yaşamını 
                kolaylaştıracak diğer hizmetleri de sağlamak.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">Projemizin Hikayesi</h2>
              <p className="mt-2 leading-relaxed text-black/70 dark:text-white/70">
                KYK Yemek Liste, yurtta kalan bir öğrenci tarafından geliştirilmeye başlandı. 
                Günlük menülere ulaşmanın zorluğunu yaşayan öğrencilerin ihtiyacından doğdu. 
                Bugün binlerce öğrenciye hizmet veren bağımsız bir platform haline geldi.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">İçerik Kaynağı</h2>
              <p className="mt-2 leading-relaxed text-black/70 dark:text-white/70">
                Menü bilgileri KYK&apos;nın resmi kaynaklarından ve yurt idarelerinden düzenli olarak güncellenir. 
                Verilerimiz doğruluk ve güncellik açısından sürekli kontrol edilir. Hatalı veya eksik bilgi 
                görürseniz lütfen bize bildirin, en kısa sürede düzeltelim.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">Gizlilik ve Güvenlik</h2>
              <p className="mt-2 leading-relaxed text-black/70 dark:text-white/70">
                Sitemizde kişisel bilgi toplamıyoruz. Sadece şehir tercihiniz tarayıcınızda saklanır. 
                Üçüncü parti reklam ağları kullanıyoruz ancak kişisel verileriniz asla paylaşılmaz. 
                Daha fazla bilgi için <Link href="/gizlilik-politikasi" className="text-[#69C2D3] hover:underline">gizlilik politikamızı</Link> inceleyebilirsiniz.
              </p>
            </div>

            {/* Özellikler */}
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">Neden Yurt Menü?</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {features.map((f) => (
                  <li
                    key={f.title}
                    className="group rounded-xl border border-black/10 bg-white/60 p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-black/5 p-2 text-black/70 dark:bg-white/10 dark:text-white">
                        {f.icon}
                      </span>
                      <span className="font-medium text-black dark:text-white">{f.title}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-black/70 dark:text-white/70">{f.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Küçük istatistikler (dummy; hazır dursa hoş görünür) */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "Şehir", v: "Çoklu" },
                { k: "Öğün", v: "2" },
                { k: "Hızlı yükleme", v: "<1 sn" },
                { k: "Mobil uyum", v: "Evet" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-black/10 bg-white/60 p-4 text-center dark:border-white/10 dark:bg-white/5"
                >
                  <div className="text-lg font-semibold text-black dark:text-white">{s.v}</div>
                  <div className="text-xs text-black/60 dark:text-white/60">{s.k}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-black/10 bg-gradient-to-r from-[#69C2D3]/20 to-transparent p-4 sm:flex-row dark:border-white/10">
              <div>
                <h3 className="text-base font-semibold text-black dark:text-white">Geri bildirimin kıymetli</h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  Öneri veya düzeltme için bize yazabilirsin.
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
        </div>
      </section>
    </main>
  );
}
