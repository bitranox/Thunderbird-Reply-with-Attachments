import { useEffect } from 'react';
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

export default function DonateRedirect() {
  const {
    siteConfig,
    i18n: { defaultLocale, locales, currentLocale },
  } = useDocusaurusContext();

  // SSR fallback: useBaseUrl already includes the locale prefix in i18n builds
  const fallbackHref = useBaseUrl('/docs/donation');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const preferred = pickLocale(locales, defaultLocale);
    const targetLocale = currentLocale !== defaultLocale ? currentLocale : preferred;
    // Manually construct URL to support cross-locale redirect (useBaseUrl
    // always resolves relative to the *current* locale, not the target).
    const base = (siteConfig?.baseUrl || '/').replace(/\/+$/, '');
    const localePath = targetLocale === defaultLocale ? '' : `/${targetLocale}`;
    const url = `${base}${localePath}/docs/donation`;
    window.location.replace(url);
  }, [currentLocale, defaultLocale, locales, siteConfig]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${fallbackHref}`} />
      <noscript>
        <p>
          Redirecting to donation page… If you are not redirected,{' '}
          <a href={fallbackHref}>click here</a>.
        </p>
      </noscript>
    </>
  );
}
