import { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';

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

export default function Home() {
  const {
    siteConfig,
    i18n: { defaultLocale, locales, currentLocale },
  } = useDocusaurusContext();

  const detected = pickLocale(locales, defaultLocale);
  const targetLocale = currentLocale && currentLocale !== defaultLocale ? currentLocale : detected;
  const isDifferentLocale = targetLocale !== currentLocale;
  const hrefFor = (slug) =>
    useBaseUrl(`${targetLocale !== defaultLocale ? `/${targetLocale}` : ''}/docs/${slug}`);
  const toFor = (slug) => useBaseUrl(`/docs/${slug}`);

  // Redirect EN homepage subtree to preferred locale under baseUrl (e.g., /Thunderbird-Reply-with-Attachments/de/)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const base = ((siteConfig && siteConfig.baseUrl) || '/').replace(/\/+/g, '/');
      const preferred = pickLocale(locales, defaultLocale);
      if (currentLocale === defaultLocale && preferred && preferred !== defaultLocale) {
        const path = window.location.pathname.replace(/\/+/g, '/');
        const prefix = `${base}${preferred}/`.replace(/\/+/g, '/');
        const alreadyLocalized = path.startsWith(prefix);
        const onBaseTree = path.startsWith(base) && !alreadyLocalized;
        if (onBaseTree) {
          const remainder = path.slice(base.length);
          const newPath = `${prefix}${remainder}`.replace(/\/+/g, '/');
          const url = `${newPath}${window.location.search || ''}${window.location.hash || ''}`;
          window.location.replace(url);
        }
      }
    } catch (_e) {}
  }, [currentLocale, defaultLocale, locales, siteConfig]);

  return (
    <Layout
      title={translate({ id: 'homepage.meta.title', message: 'Reply with Attachments' })}
      description={translate({
        id: 'homepage.meta.description',
        message: 'Thunderbird Add-on: Reply including original attachments',
      })}
    >
      <header className="heroGradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <img
            className="brandIcon"
            alt={translate({ id: 'homepage.icon.alt', message: 'RWA icon' })}
            src={useBaseUrl('/img/icon-128.png')}
          />
          <h1 className="heroTitle">
            <Translate id="homepage.hero.title">Reply with Attachments</Translate>
          </h1>
          <p className="heroSubtitle">
            <Translate id="homepage.hero.subtitle">
              Include original attachments when replying in Thunderbird — automatically or after a
              quick confirmation.
            </Translate>
          </p>
          <div className="ctaRow">
            <Link
              className="button button--lg btnPrimary"
              to={isDifferentLocale ? hrefFor('features') : toFor('features')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.cta.openDocs">Open Docs</Translate>
            </Link>
            <Link
              className="button button--lg btnGhost"
              to={isDifferentLocale ? hrefFor('quickstart') : toFor('quickstart')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.cta.quickstart">Quickstart</Translate>
            </Link>
            <Link
              className="button button--lg btnGhost"
              href="https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments"
            >
              <Translate id="homepage.cta.installFromAddons">Install from Add‑ons</Translate>
            </Link>
            <Link
              className="button button--lg btnGhost"
              href="https://github.com/bitranox/Thunderbird-Reply-with-Attachments"
            >
              <Translate id="homepage.cta.github">GitHub</Translate>
            </Link>
            <Link
              className="button button--lg btnGhost"
              to={isDifferentLocale ? hrefFor('donation') : toFor('donation')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.cta.donate">Donate</Translate>
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 12px 0' }}>
            <Translate id="homepage.whatsNew.title">What’s New</Translate>
          </h2>
          <p style={{ margin: 0 }}>
            <Translate
              id="homepage.whatsNew.desc"
              values={{
                changelog: (
                  <Link
                    to={isDifferentLocale ? hrefFor('changelog') : toFor('changelog')}
                    reloadDocument={isDifferentLocale}
                  >
                    <Translate id="homepage.whatsNew.changelogLink">Changelog</Translate>
                  </Link>
                ),
              }}
            >
              {'Read the latest changes in the {changelog}.'}
            </Translate>
          </p>
        </section>

        <section className="featureGrid">
          <article className="card">
            <h3>
              <Translate id="homepage.features.autoConfirm.title">
                Automatic or Confirm‑First
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.autoConfirm.body">
                Choose between automatic adding or a small confirmation dialog with handy keyboard
                shortcuts.
              </Translate>
            </p>
          </article>
          <article className="card">
            <h3>
              <Translate id="homepage.features.dedupe.title">Smart De‑Duplication</Translate>
            </h3>
            <p>
              <Translate id="homepage.features.dedupe.body">
                Respects existing attachments and avoids duplicates by filename, clean and
                predictable.
              </Translate>
            </p>
          </article>
          <article className="card">
            <h3>
              <Translate id="homepage.features.skipSmime.title">
                Skip SMIME & Restore Inline
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.skipSmime.body">
                SMIME signatures are excluded. Inline images are embedded directly in the reply body
                as data URIs so recipients see them exactly where they appeared.
              </Translate>
            </p>
          </article>
          <article className="card">
            <h3>
              <Translate id="homepage.features.blacklist.title">Blacklist Patterns</Translate>
            </h3>
            <p>
              <Translate
                id="homepage.features.blacklist.body"
                values={{ code1: <code>*.png</code>, code2: <code>smime.*</code> }}
              >
                {
                  'Case‑insensitive glob patterns like {code1} or {code2} prevent adding noisy files.'
                }
              </Translate>
            </p>
          </article>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 12px 0' }}>
            <Translate id="homepage.quicklinks.title">Docs quick links</Translate>
          </h2>
          <div className="ctaRow" style={{ gap: 10, display: 'flex', flexWrap: 'wrap' }}>
            <Link
              className="button button--sm button--secondary"
              to={isDifferentLocale ? hrefFor('install') : toFor('install')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.quicklinks.install">Install</Translate>
            </Link>
            <Link
              className="button button--sm button--secondary"
              to={isDifferentLocale ? hrefFor('configuration') : toFor('configuration')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.quicklinks.configuration">Configuration</Translate>
            </Link>
            <Link
              className="button button--sm button--secondary"
              to={isDifferentLocale ? hrefFor('usage') : toFor('usage')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.quicklinks.usage">Usage</Translate>
            </Link>
            <Link
              className="button button--sm button--secondary"
              to={isDifferentLocale ? hrefFor('compatibility') : toFor('compatibility')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.quicklinks.compatibility">Compatibility</Translate>
            </Link>
            <Link
              className="button button--sm button--secondary"
              to={isDifferentLocale ? hrefFor('support') : toFor('support')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.quicklinks.support">Support</Translate>
            </Link>
            <Link
              className="button button--sm button--secondary"
              to={isDifferentLocale ? hrefFor('license') : toFor('license')}
              reloadDocument={isDifferentLocale}
            >
              <Translate id="homepage.quicklinks.license">License</Translate>
            </Link>
          </div>
          <p style={{ marginTop: 10, color: 'var(--ifm-color-secondary-dark)' }}>
            <Translate
              id="homepage.search.tip"
              values={{ slash: <kbd>/</kbd>, ctrl: <kbd>Ctrl</kbd>, k: <kbd>K</kbd> }}
            >
              {'Tip: Press {slash} or {ctrl}+{k} to search the docs.'}
            </Translate>
          </p>
        </section>
      </main>
    </Layout>
  );
}
