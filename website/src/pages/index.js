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
  // Explicitly link to English docs/features as requested
  const docsUrl = useBaseUrl('/docs/features');

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
            <Link className="button button--lg btnPrimary" to={docsUrl}>Open Docs</Link>
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
      </main>
    </Layout>
  );
}
