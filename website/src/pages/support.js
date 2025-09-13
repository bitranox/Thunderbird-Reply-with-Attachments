import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

function pickLocale(available, def) {
  if (typeof window === 'undefined') return def;
  const nav = window.navigator || {};
  const langs = Array.from(new Set([...(nav.languages || []), nav.language].filter(Boolean))).map(
    String
  );
  for (const l of langs) {
    if (available.includes(l)) return l;
    const p = l.split('-')[0];
    if (available.includes(p)) return p;
  }
  return def;
}

export default function SupportRedirect() {
  const {
    i18n: { defaultLocale, locales, currentLocale },
  } = useDocusaurusContext();

  const preferred = pickLocale(locales, defaultLocale);
  const targetLocale = currentLocale && currentLocale !== defaultLocale ? currentLocale : preferred;
  const targetPath =
    targetLocale === defaultLocale ? '/docs/support' : `/${targetLocale}/docs/support`;
  const href = useBaseUrl(targetPath);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace(href);
    }
  }, [href]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${href}`} />
      <noscript>
        <p>
          Redirecting to support page… If you are not redirected, <a href={href}>click here</a>.
        </p>
      </noscript>
    </>
  );
}
