"use client";

import { useEffect, useRef } from "react";

type NativeAdProps = {
  adSlot?: string; // Opsiyonel - auto ads için
  adFormat?: string;
  className?: string;
};

export default function NativeAd({ 
  adSlot = "auto", // Auto ads için default "auto"
  adFormat = "auto",
  className = "" 
}: NativeAdProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && typeof window !== 'undefined') {
        // AdSense script'i yüklenmişse reklamı göster
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`native-ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format={adFormat}
        data-ad-client="ca-pub-2074568539798437"
        data-ad-slot={adSlot}
      />
    </div>
  );
}
