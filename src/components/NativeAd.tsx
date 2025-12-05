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
      const adElement = adRef.current;
      if (adElement && typeof window !== 'undefined') {
        // Eğer reklam zaten yüklenmişse (data-adsbygoogle-status var), işlem yapma
        const adStatus = adElement.getAttribute('data-adsbygoogle-status');
        if (adStatus === 'done') {
          return;
        }
        
        // AdSense script'i yüklenmişse reklamı göster
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
          // Push hatası görmezden gel (development mode'da olabilir)
        }
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
