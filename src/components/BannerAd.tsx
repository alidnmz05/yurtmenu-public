// components/BannerAd.tsx
"use client";
import { useEffect, useRef } from "react";

export default function BannerAd({ slot }: { slot: string }) {
  const ref = useRef<HTMLModElement | null>(null); // <ins> ref

  useEffect(() => {
    if (!ref.current) return;

    // Aynı <ins> için tekrar push etmeyelim
    const status = ref.current.getAttribute("data-adsbygoogle-status");
    if (!status) {
      try {
        // @ts-expect-error: 'adsbygoogle' may not be defined on window in TypeScript types
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("AdSense push error", e);
      }
    }
  }, [slot]);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", minHeight: 90 }} // layout shift olmasın
      data-ad-client="ca-pub-2074568539798437"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      // ✅ Lokal geliştirmede test reklamı
      {...(isDev ? { "data-adtest": "on" } : {})}
    />
  );
}
