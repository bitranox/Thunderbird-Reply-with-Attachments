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
          editUrl: 'https://github.com/bitranox/Thunderbird-Reply-with-Attachments/edit/main/website/'
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
      items: [
        { to: '/docs/intro', label: 'Home', position: 'left' },
        { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
        { href: 'https://github.com/bitranox/Thunderbird-Reply-with-Attachments', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Docs', items: [{ label: 'Home', to: '/docs/intro' }, { label: 'Install', to: '/docs/install' }] },
        { title: 'Project', items: [{ label: 'GitHub', href: 'https://github.com/bitranox/Thunderbird-Reply-with-Attachments' }] }
      ],
      copyright: `© ${new Date().getFullYear()} Reply with Attachments`
    }
  })
};

module.exports = config;
