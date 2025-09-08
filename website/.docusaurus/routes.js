import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Thunderbird-Reply-with-Attachments/ja/search',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/search', 'bc9'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/ja/docs',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs', '33f'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/ja/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs', 'c4e'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/ja/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs', 'cde'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/changelog', '043'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/compatibility', '098'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/configuration', '647'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/development', '656'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/donation', '2ec'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/features', '05a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/glossary', 'bbe'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/install', 'b73'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/languages', '8dc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/licence',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/licence', '9f9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/permissions', 'df3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/privacy', '9c1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/quickstart', '531'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/support', 'a99'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/ja/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/docs/usage', 'fca'),
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
    path: '/Thunderbird-Reply-with-Attachments/ja/',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/ja/', '7b6'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
