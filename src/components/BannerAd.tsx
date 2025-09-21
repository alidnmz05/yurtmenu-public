// components/BannerAd.tsx
"use client";
import { useEffect, useRef } from "react";

type Props = { slot: string; test?: boolean };

export default function BannerAd({ slot, test = true }: Props) {
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) { console.log("[BannerAd] <ins> ref yok"); return; }

    // data-adtest kesin olsun
    if (test && el.getAttribute("data-adtest") !== "on") {
      el.setAttribute("data-adtest", "on");
    }

    // Durum izleyici
    const logStatus = (tag: string) => {
      console.log("[BannerAd]", tag, {
        "data-adsbygoogle-status": el.getAttribute("data-adsbygoogle-status"),
        "data-ad-status": el.getAttribute("data-ad-status"),
        size: { w: el.offsetWidth, h: el.offsetHeight },
        rect: el.getBoundingClientRect(),
      });
    };
    logStatus("before-push");

    const w = window as unknown as { adsbygoogle?: unknown[] };

    const doPush = () => {
      try {
        (w.adsbygoogle = w.adsbygoogle || []).push({});
        console.log("[BannerAd] push OK");
      } catch (e) {
        console.error("[BannerAd] push error", e);
      }
    };

    if (!w.adsbygoogle) {
      console.warn("[BannerAd] adsbygoogle yok, 300ms sonra denenecek");
      const t = setTimeout(doPush, 300);
      return () => clearTimeout(t);
    } else {
      // aynı <ins> ikinci kez push edilmesin
      const already = el.getAttribute("data-adsbygoogle-status");
      if (!already) doPush();
      else console.log("[BannerAd] zaten render edilmiş:", already);
    }

    // attribute değişikliklerini izle
    const mo = new MutationObserver(() => logStatus("mutated"));
    mo.observe(el, { attributes: true });
    return () => mo.disconnect();
  }, [slot, test]);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", width: "100%", minHeight: 280, height: 280 }}
      data-ad-client="ca-pub-2074568539798437"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest="on"
    />
  );
}
