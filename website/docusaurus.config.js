// @ts-check

const config = {
  title: 'Reply with Attachments',
  tagline: 'Thunderbird Add-on: Reply including original attachments',
  url: 'https://bitranox.github.io',
  baseUrl: '/Thunderbird-Reply-with-Attachments/',
  organizationName: 'bitranox',
  projectName: 'Thunderbird-Reply-with-Attachments',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeConfigs: {
      en: { label: 'English' },
      de: { label: 'Deutsch' }
    }
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */ ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove "Edit this page" links
          // editUrl removed intentionally
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ ({
    navbar: {
      title: 'Reply with Attachments',
      logo: {
        alt: 'Reply with Attachments',
        src: 'https://raw.githubusercontent.com/bitranox/Thunderbird-Reply-with-Attachments/master/sources/icons/icon-48.png',
        href: '/',
        target: '_self'
      },
      items: [
        { to: '/docs/features', label: 'Features', position: 'left' },
        { type: 'doc', docId: 'features', position: 'left', label: 'Docs' },
        { to: '/docs/support', label: 'Support', position: 'right' },
        { to: '/docs/licence', label: 'Licence', position: 'right' },
        { href: 'https://github.com/bitranox/Thunderbird-Reply-with-Attachments', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Docs', items: [{ label: 'Home', to: '/docs/features' }, { label: 'Install', to: '/docs/install' }] },
        { title: 'Project', items: [{ label: 'GitHub', href: 'https://github.com/bitranox/Thunderbird-Reply-with-Attachments' }] }
      ],
      copyright: `© ${new Date().getFullYear()} Reply with Attachments`
    },
    // Algolia DocSearch (enable via env vars DOCSEARCH_APP_ID, DOCSEARCH_API_KEY, DOCSEARCH_INDEX_NAME)
    ...(process.env.DOCSEARCH_APP_ID && process.env.DOCSEARCH_API_KEY ? {
      algolia: {
        appId: process.env.DOCSEARCH_APP_ID,
        apiKey: process.env.DOCSEARCH_API_KEY,
        indexName: process.env.DOCSEARCH_INDEX_NAME || 'thunderbird-reply-with-attachments',
        contextualSearch: true,
      }
    } : {})
  }),
  // Fallback local search when DocSearch keys are not configured
  plugins: [
    ...(process.env.DOCSEARCH_APP_ID && process.env.DOCSEARCH_API_KEY
      ? []
      : (() => {
          try {
            const localSearch = require.resolve('@easyops-cn/docusaurus-search-local');
            return [[localSearch, { hashed: true, language: ['en', 'de'] }]];
          } catch (e) {
            return [];
          }
        })())
  ]
};

module.exports = config;
