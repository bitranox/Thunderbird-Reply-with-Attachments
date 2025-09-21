// @ts-check
// Optional runtime import: when running under Docusaurus, use its translate().
// In test environments where '@docusaurus/Translate' isn't installed at repo root,
// fall back to a no-op that returns the default message.
let translate = (opts) => (typeof opts === 'string' ? opts : (opts?.message ?? ''));
try {
  // eslint-disable-next-line global-require
  ({ translate } = require('@docusaurus/Translate'));
} catch (_e) {
  // no-op fallback used in tests
}

const CURRENT_YEAR = new Date().getFullYear().toString();
const YEAR_PLACEHOLDER = /\{\s*year\s*\}/gi;

const resolveYearToken = (value) =>
  typeof value === 'string' ? value.replace(YEAR_PLACEHOLDER, CURRENT_YEAR) : value;

const I18N_LOCALES = [
  'en',
  'zh',
  'hi',
  'es',
  'ar',
  'fr',
  'bn',
  'pt',
  'ru',
  'id',
  'ur',
  'de',
  'ja',
  'pa',
  'jv',
  'ms',
  'te',
  'vi',
  'ko',
  'mr',
  'ta',
  'tr',
  'it',
  'th',
  'gu',
  'fa',
  'pl',
  'ps',
  'kn',
  'ml',
  'or',
  'my',
  'uk',
  'ro',
  'nl',
  'ha',
  'sw',
  'am',
  'hu',
  'az',
  'uz',
  'sd',
  'he',
  'el',
  'cs',
  'sv',
  'bg',
  'da',
  'fi',
  'no',
  'sk',
  'sr',
  'hr',
  'bs',
  'sl',
  'lt',
  'lv',
  'et',
  'hy',
  'ka',
  'kk',
  'ky',
  'tg',
  'tk',
  'ne',
  'si',
  'km',
  'lo',
  'mn',
  'su',
  'yo',
  'ig',
  'om',
  'zu',
  'xh',
  'af',
  'so',
  'rw',
  'rn',
  'ln',
  'sn',
  'ak',
  'ff',
  'bm',
  'ny',
  'ti',
  'ug',
  'ks',
  'as',
  'tl',
  'ca',
  'be',
  'sq',
  'qu',
  'ht',
  'mg',
  'ku',
  'wo',
  'ga',
  'is',
];

// Allow overriding the built locales from environment (space or comma separated),
// useful for CI/linkcheck and local selective builds.
const SELECTED_LOCALES = (process.env.BUILD_LOCALES || '').trim();
const LOCALES = SELECTED_LOCALES ? SELECTED_LOCALES.split(/[ ,]+/).filter(Boolean) : I18N_LOCALES;

const DEFAULT_LOCALE = LOCALES.includes('en') ? 'en' : LOCALES[0] || 'en';

const config = {
  title: translate({ id: 'site.title', message: 'Reply with Attachments' }),
  tagline: translate({
    id: 'site.tagline',
    message: 'Thunderbird Add-on: Reply including original attachments',
  }),
  url: 'https://bitranox.github.io',
  baseUrl: '/Thunderbird-Reply-with-Attachments/',
  organizationName: 'bitranox',
  projectName: 'Thunderbird-Reply-with-Attachments',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  // Use multi-resolution ICO for broad compatibility.
  favicon: 'img/favicon.ico',
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    // Keep English as the source of truth; add all requested locales.
    locales: LOCALES,
    // Map locales to htmlLang (BCP‑47) and mark RTL languages.
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en-US' },
      zh: { htmlLang: 'zh' },
      hi: { htmlLang: 'hi-IN' },
      es: { htmlLang: 'es-ES' },
      ar: { htmlLang: 'ar', direction: 'rtl' },
      fr: { htmlLang: 'fr-FR' },
      bn: { htmlLang: 'bn-BD' },
      pt: { htmlLang: 'pt-PT' },
      ru: { htmlLang: 'ru-RU' },
      id: { htmlLang: 'id-ID' },
      ur: { htmlLang: 'ur-PK', direction: 'rtl' },
      de: { label: 'Deutsch', htmlLang: 'de-DE' },
      ja: { htmlLang: 'ja-JP' },
      pa: { htmlLang: 'pa-IN' },
      jv: { htmlLang: 'jv-ID' },
      ms: { htmlLang: 'ms-MY' },
      te: { htmlLang: 'te-IN' },
      vi: { htmlLang: 'vi-VN' },
      ko: { htmlLang: 'ko-KR' },
      mr: { htmlLang: 'mr-IN' },
      ta: { htmlLang: 'ta-IN' },
      tr: { htmlLang: 'tr-TR' },
      it: { htmlLang: 'it-IT' },
      th: { htmlLang: 'th-TH' },
      gu: { htmlLang: 'gu-IN' },
      fa: { htmlLang: 'fa-IR', direction: 'rtl' },
      pl: { htmlLang: 'pl-PL' },
      ps: { htmlLang: 'ps-AF', direction: 'rtl' },
      kn: { htmlLang: 'kn-IN' },
      ml: { htmlLang: 'ml-IN' },
      or: { htmlLang: 'or-IN' },
      my: { htmlLang: 'my-MM' },
      uk: { htmlLang: 'uk-UA' },
      ro: { htmlLang: 'ro-RO' },
      nl: { htmlLang: 'nl-NL' },
      ha: { htmlLang: 'ha-NG' },
      sw: { htmlLang: 'sw-TZ' },
      am: { htmlLang: 'am-ET' },
      hu: { htmlLang: 'hu-HU' },
      az: { htmlLang: 'az-AZ' },
      uz: { htmlLang: 'uz-UZ' },
      sd: { htmlLang: 'sd-PK', direction: 'rtl' },
      he: { htmlLang: 'he-IL', direction: 'rtl' },
      el: { htmlLang: 'el-GR' },
      cs: { htmlLang: 'cs-CZ' },
      sv: { htmlLang: 'sv-SE' },
      bg: { htmlLang: 'bg-BG' },
      da: { htmlLang: 'da-DK' },
      fi: { htmlLang: 'fi-FI' },
      no: { htmlLang: 'no-NO' },
      sk: { htmlLang: 'sk-SK' },
      sr: { htmlLang: 'sr-RS' },
      hr: { htmlLang: 'hr-HR' },
      bs: { htmlLang: 'bs-BA' },
      sl: { htmlLang: 'sl-SI' },
      lt: { htmlLang: 'lt-LT' },
      lv: { htmlLang: 'lv-LV' },
      et: { htmlLang: 'et-EE' },
      hy: { htmlLang: 'hy-AM' },
      ka: { htmlLang: 'ka-GE' },
      kk: { htmlLang: 'kk-KZ' },
      ky: { htmlLang: 'ky-KG' },
      tg: { htmlLang: 'tg-TJ' },
      tk: { htmlLang: 'tk-TM' },
      ne: { htmlLang: 'ne-NP' },
      si: { htmlLang: 'si-LK' },
      km: { htmlLang: 'km-KH' },
      lo: { htmlLang: 'lo-LA' },
      mn: { htmlLang: 'mn-MN' },
      su: { htmlLang: 'su-ID' },
      yo: { htmlLang: 'yo-NG' },
      ig: { htmlLang: 'ig-NG' },
      om: { htmlLang: 'om-ET' },
      zu: { htmlLang: 'zu-ZA' },
      xh: { htmlLang: 'xh-ZA' },
      af: { htmlLang: 'af-ZA' },
      so: { htmlLang: 'so-SO' },
      rw: { htmlLang: 'rw-RW' },
      rn: { htmlLang: 'rn-BI' },
      ln: { htmlLang: 'ln-CD' },
      sn: { htmlLang: 'sn-ZW' },
      ak: { htmlLang: 'ak-GH' },
      ff: { htmlLang: 'ff-SN' },
      bm: { htmlLang: 'bm-ML' },
      ny: { htmlLang: 'ny-MW' },
      ti: { htmlLang: 'ti-ER' },
      ug: { htmlLang: 'ug-CN', direction: 'rtl' },
      ks: { htmlLang: 'ks-IN', direction: 'rtl' },
      as: { htmlLang: 'as-IN' },
      tl: { htmlLang: 'tl-PH' },
      ca: { htmlLang: 'ca-ES' },
      be: { htmlLang: 'be-BY' },
      sq: { htmlLang: 'sq-AL' },
      qu: { htmlLang: 'qu-PE' },
      ht: { htmlLang: 'ht-HT' },
      mg: { htmlLang: 'mg-MG' },
      ku: { htmlLang: 'ku-TR' },
      wo: { htmlLang: 'wo-SN' },
      ga: { htmlLang: 'ga-IE' },
      is: { htmlLang: 'is-IS' },
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */ ({
        blog: false,
        sitemap: { changefreq: 'weekly', priority: 0.5, filename: 'sitemap.xml' },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove "Edit this page" links
          // editUrl removed intentionally
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ ({
    colorMode: {
      // Follow the browser/OS preference by default
      respectPrefersColorScheme: true,
      // Keep the toggle available; user choice is persisted automatically
      disableSwitch: false,
      defaultMode: 'light',
    },
    navbar: {
      title: translate({ id: 'navbar.title', message: 'Reply with Attachments' }),
      logo: {
        alt: translate({ id: 'navbar.logo.alt', message: 'Reply with Attachments' }),
        src: 'img/icon-48.png',
        // omit href/to to use baseUrl root by default
        target: '_self',
      },
      items: [
        {
          type: 'doc',
          docId: 'features',
          position: 'left',
          label: translate({ id: 'navbar.docs', message: 'Docs' }),
        },
        {
          to: '/docs/support',
          label: translate({ id: 'navbar.support', message: 'Support' }),
          position: 'right',
        },
        {
          to: '/docs/license',
          label: translate({ id: 'navbar.license', message: 'License' }),
          position: 'right',
        },
        {
          href: 'https://github.com/bitranox/Thunderbird-Reply-with-Attachments',
          label: translate({ id: 'navbar.github', message: 'GitHub' }),
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: translate({ id: 'footer.section.docs', message: 'Docs' }),
          items: [
            {
              label: translate({ id: 'footer.link.home', message: 'Home' }),
              to: '/docs/features',
            },
            {
              label: translate({ id: 'footer.link.install', message: 'Install' }),
              to: '/docs/install',
            },
          ],
        },
        {
          title: translate({ id: 'footer.section.project', message: 'Project' }),
          items: [
            {
              label: translate({ id: 'footer.link.github', message: 'GitHub' }),
              href: 'https://github.com/bitranox/Thunderbird-Reply-with-Attachments',
            },
          ],
        },
      ],
      copyright: resolveYearToken(
        translate({
          id: 'footer.copyright',
          message: '© {year} Reply with Attachments',
        }),
      ),
    },
    // Algolia DocSearch (enable via env vars DOCSEARCH_APP_ID, DOCSEARCH_API_KEY, DOCSEARCH_INDEX_NAME)
    ...(process.env.DOCSEARCH_APP_ID && process.env.DOCSEARCH_API_KEY
      ? {
          algolia: {
            appId: process.env.DOCSEARCH_APP_ID,
            apiKey: process.env.DOCSEARCH_API_KEY,
            indexName: process.env.DOCSEARCH_INDEX_NAME || 'thunderbird-reply-with-attachments',
            contextualSearch: true,
          },
        }
      : {}),
  }),
  // Fallback local search when DocSearch keys are not configured
  plugins: [
    ...(process.env.DOCSEARCH_APP_ID && process.env.DOCSEARCH_API_KEY
      ? []
      : (() => {
          try {
            const localSearch = require.resolve('@easyops-cn/docusaurus-search-local');
            // Limit to languages supported by the local search plugin.
            const supported = new Set([
              'ar',
              'bn',
              'cs',
              'da',
              'de',
              'en',
              'es',
              'fa',
              'fi',
              'fr',
              'gu',
              'he',
              'hi',
              'hr',
              'hu',
              'id',
              'it',
              'ja',
              'ko',
              'mr',
              'nl',
              'no',
              'pl',
              'pt',
              'ro',
              'ru',
              'sk',
              'sr',
              'sv',
              'ta',
              'te',
              'th',
              'tr',
              'uk',
              'vi',
              'zh',
            ]);
            // Build-time safe default: restrict local search stemming to English only
            // to avoid optional 'lunr-languages' module requirements for many locales.
            // This does not affect which locales are built — only search stemming.
            return [[localSearch, { hashed: true, language: ['en'] }]];
          } catch (_e) {
            return [];
          }
        })()),
  ],
};

module.exports = config;
