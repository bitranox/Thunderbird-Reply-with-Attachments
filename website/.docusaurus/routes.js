import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Thunderbird-Reply-with-Attachments/de/search',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/search', '89b'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/de/docs',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs', 'fc0'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/de/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs', 'd9e'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/de/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs', 'acc'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/changelog', 'c03'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/compatibility', '064'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/configuration', '5de'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/development', '353'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/donation', 'ee0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/features', '6c2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/glossary', '9e7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/install', 'dee'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/languages', '7d9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/licence',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/licence', '0a7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/permissions', '5f9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/privacy', '967'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/quickstart', '43f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/support', '9e7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/usage', '698'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/de/',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/', 'df3'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
