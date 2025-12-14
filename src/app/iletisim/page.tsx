// app/iletisime/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişime Geç | KYK Yemek Liste",
  description: "Menü bilgisi paylaşın, öneri ve geri bildirimlerinizi iletin. Fotoğraf veya dosya ekleyerek menü paylaşabilirsiniz.",
};

// Server Action — şimdilik boş
async function sendMessage(formData: FormData) {
  "use server";
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const files = formData.getAll("attachment") as File[];
  
  // Dosya bilgilerini logla
  const fileInfo = files
    .filter(f => f.size > 0)
    .map(f => ({ name: f.name, size: f.size, type: f.type }));
  
  console.log("Form gönderildi:", {
    name,
    email,
    message,
    attachments: fileInfo
  });
  
  // TODO: Buraya e-posta gönderme veya veritabanı kaydetme eklenecek
  // Örnek: nodemailer, resend.com, veya file storage (S3, etc.)
}

export default async function IletisimePage() {
  return (
    <main className="relative">
      {/* Gradient arka plan */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(105,194,211,0.35),rgba(105,194,211,0)_60%)]" />

      <section className="mx-auto w-full max-w-5xl px-6 pt-12 pb-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-black/70 dark:text-white/70 backdrop-blur">
            Geri bildirimin değerli
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
            İletişime Geç
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-black/70 dark:text-white/70 sm:text-base">
            Öneri ve düzeltmelerinle Yurt Menü’yü iyileştirebiliriz.
          </p>
        </div>

        {/* Glass kart form */}
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
          <form action={sendMessage} className="grid gap-4">
            {/* Honeypot (görünmez) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Ad Soyad
                </label>
                <input
                  name="name"
                  required
                  placeholder="Ali Yılmaz"
                  className="w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 text-black shadow-sm outline-none placeholder:text-black/50 focus:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  E-posta
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="ornek@posta.com"
                  className="w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 text-black shadow-sm outline-none placeholder:text-black/50 focus:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/60"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Mesaj
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Merhaba..."
                className="w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 text-black shadow-sm outline-none placeholder:text-black/50 focus:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/60"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Menü Fotoğrafı veya Dosya (Opsiyonel)
              </label>
              <div className="relative">
                <input
                  name="attachment"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx,.xlsx,.xls"
                  multiple
                  className="w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 text-sm text-black shadow-sm outline-none file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600 focus:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white"
                />
              </div>
              <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                📎 Menü fotoğrafı, PDF veya Excel dosyası ekleyebilirsiniz (Maks. 10 MB)
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-black/60 dark:text-white/60">
                Gönderimle birlikte KVKK ve Gizlilik ilkelerini kabul ediyorum.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white dark:text-black"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
