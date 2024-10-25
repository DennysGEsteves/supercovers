import Script from 'next/script';
import { useEffect } from 'react';

export const AdSense = ({ pId }: { pId: string }) => {
  useEffect(() => {
    try {
      // ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});

      if (typeof (window as any) !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin='anonymous'
      strategy='afterInteractive'
    />
  );
};
