import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function pickLocale(available, def) {
  if (typeof window === 'undefined') return def;
  const nav = window.navigator || {};
  const langs = Array.from(new Set([...(nav.languages || []), nav.language].filter(Boolean))).map(String);
  for (const l of langs) {
    if (available.includes(l)) return l;
    const p = l.split('-')[0];
    if (available.includes(p)) return p;
  }
  return def;
}

export default function Home() {
  const { i18n: { defaultLocale, locales, currentLocale } } = useDocusaurusContext();
  // Compute a locale-aware docs URL:
  // - If we're already on a localized page (currentLocale !== defaultLocale), use that.
  // - Otherwise, detect the user's preferred locale and use it when different from default.
  const detected = pickLocale(locales, defaultLocale);
  const targetLocale = currentLocale && currentLocale !== defaultLocale ? currentLocale : detected;
  const isDifferentLocale = targetLocale !== currentLocale;
  const hrefFor = (slug) => useBaseUrl(`${targetLocale !== defaultLocale ? `/${targetLocale}` : ''}/docs/${slug}/`);
  const toFor = (slug) => useBaseUrl(`/docs/${slug}/`);

  return (
    <Layout
      title="Reply with Attachments"
      description="Thunderbird Add-on: Reply including original attachments">
      <header className="heroGradient">
        <div className="container" style={{textAlign:'center'}}>
          <img className="brandIcon" alt="RWA" src="https://raw.githubusercontent.com/bitranox/Thunderbird-Reply-with-Attachments/master/sources/icons/icon-128.png" />
          <h1 className="heroTitle">Reply with Attachments</h1>
          <p className="heroSubtitle">Include original attachments when replying in Thunderbird — automatically or after a quick confirmation.</p>
          <div className="ctaRow">
            <Link
              className="button button--lg btnPrimary"
              to={isDifferentLocale ? hrefFor('features') : toFor('features')}
              reloadDocument={isDifferentLocale}
            >
              Open Docs
            </Link>
            <Link className="button button--lg btnGhost" href="https://addons.thunderbird.net/en-US/thunderbird/search/?q=reply%20with%20attachments">Install from Add‑ons</Link>
            <Link className="button button--lg btnGhost" href="https://github.com/bitranox/Thunderbird-Reply-with-Attachments">GitHub</Link>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="featureGrid">
          <article className="card">
            <h3>Automatic or Confirm‑First</h3>
            <p>Choose between automatic adding or a small confirmation dialog with handy keyboard shortcuts.</p>
          </article>
          <article className="card">
            <h3>Smart De‑Duplication</h3>
            <p>Respects existing attachments and avoids duplicates by filename, clean and predictable.</p>
          </article>
          <article className="card">
            <h3>Skip SMIME & Inline</h3>
            <p>SMIME signatures and inline images are excluded to keep replies lean.</p>
          </article>
          <article className="card">
            <h3>Blacklist Patterns</h3>
            <p>Case‑insensitive glob patterns like <code>*.png</code> or <code>smime.*</code> prevent adding noisy files.</p>
          </article>
        </section>

        <section style={{marginTop: 24}}>
          <h2 style={{fontSize: 18, margin: '0 0 12px 0'}}>Docs quick links</h2>
          <div className="ctaRow" style={{gap: 10, display: 'flex', flexWrap: 'wrap'}}>
            <Link className="button button--sm button--secondary" to={isDifferentLocale ? hrefFor('install') : toFor('install')} reloadDocument={isDifferentLocale}>Install</Link>
            <Link className="button button--sm button--secondary" to={isDifferentLocale ? hrefFor('configuration') : toFor('configuration')} reloadDocument={isDifferentLocale}>Configuration</Link>
            <Link className="button button--sm button--secondary" to={isDifferentLocale ? hrefFor('usage') : toFor('usage')} reloadDocument={isDifferentLocale}>Usage</Link>
            <Link className="button button--sm button--secondary" to={isDifferentLocale ? hrefFor('compatibility') : toFor('compatibility')} reloadDocument={isDifferentLocale}>Compatibility</Link>
            <Link className="button button--sm button--secondary" to={isDifferentLocale ? hrefFor('support') : toFor('support')} reloadDocument={isDifferentLocale}>Support</Link>
            <Link className="button button--sm button--secondary" to={isDifferentLocale ? hrefFor('licence') : toFor('licence')} reloadDocument={isDifferentLocale}>Licence</Link>
          </div>
          <p style={{marginTop: 10, color: 'var(--ifm-color-secondary-dark)'}}>
            Tip: Press <kbd>/</kbd> or <kbd>Ctrl</kbd>+<kbd>K</kbd> to search the docs.
          </p>
        </section>
      </main>
    </Layout>
  );
}
