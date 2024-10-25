import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import envs from 'config/environment';

function GoogleAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag('config', `${envs.gTagId}`, {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${envs.gTagId}`} />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${envs.gTagId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default GoogleAnalytics;
