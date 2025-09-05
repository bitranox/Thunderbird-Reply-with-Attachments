import React, { useEffect } from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function pickLocale(available, def) {
  if (typeof window === 'undefined') return def;
  const nav = window.navigator || {};
  const langs = Array.from(new Set([
    ...(nav.languages || []),
    nav.language,
  ].filter(Boolean))).map(String);
  // Match exact, then by prefix (e.g., de-AT -> de)
  for (const l of langs) {
    if (available.includes(l)) return l;
    const p = l.split('-')[0];
    if (available.includes(p)) return p;
  }
  return def;
}

export default function Home() {
  const { i18n: { defaultLocale, locales } } = useDocusaurusContext();
  const loc = pickLocale(locales, defaultLocale);
  const to = useBaseUrl(loc === defaultLocale ? '/docs/intro' : `/${loc}/docs/intro`);
  // Render immediate redirect; also handle client-side after mount
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return <Redirect to={to} />;
}
