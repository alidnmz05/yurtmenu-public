"use client";

import { useState } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ContactForm({ serverAction }: { serverAction: (formData: FormData) => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);
    
    if (validFiles.length < files.length) {
      setMessage({ 
        type: "error", 
        text: "Bazı dosyalar 10 MB limitini aşıyor ve kaldırıldı." 
      });
    }
    
    setSelectedFiles(validFiles);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Dosyaları ekle
      selectedFiles.forEach(file => {
        formData.append("attachment", file);
      });

      await serverAction(formData);
      
      setMessage({ 
        type: "success", 
        text: "Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız." 
      });
      
      // Formu temizle
      e.currentTarget.reset();
      setSelectedFiles([]);
    } catch {
      setMessage({ 
        type: "error", 
        text: "Bir hata oluştu. Lütfen tekrar deneyin." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Honeypot (görünmez) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {/* Mesaj bildirimi */}
        {message && (
          <div className={`rounded-lg p-4 ${
            message.type === "success" 
              ? "bg-green-50 border border-green-200 text-green-800" 
              : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        )}

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
            placeholder="Merhaba, size kalmakta olduğum yurdun menüsünü göndermek istiyorum..."
            className="w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 text-black shadow-sm outline-none placeholder:text-black/50 focus:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/60"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-black dark:text-white">
            Menü Fotoğrafı veya Dosya (Opsiyonel)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx,.xlsx,.xls"
              multiple
              onChange={handleFileChange}
              className="w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 text-sm text-black shadow-sm outline-none file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600 focus:border-black/30 dark:border-white/10 dark:bg-white/10 dark:text-white"
            />
          </div>
          <p className="mt-1 text-xs text-black/50 dark:text-white/50">
            📎 Menü fotoğrafı, PDF veya Excel dosyası ekleyebilirsiniz (Maks. 10 MB her dosya)
          </p>
          
          {/* Seçilen dosyalar */}
          {selectedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-white/50 px-3 py-2 text-sm dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-black dark:text-white">{file.name}</span>
                    <span className="text-black/50 dark:text-white/50">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="rounded p-1 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-black/60 dark:text-white/60">
            Gönderimle birlikte KVKK ve Gizlilik ilkelerini kabul ediyorum.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/10 dark:bg-white dark:text-black"
          >
            {isSubmitting ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Gönderiliyor...
              </>
            ) : (
              "Gönder"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
