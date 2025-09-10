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
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs', '7e1'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/de/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs', '431'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/de/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs', '920'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/changelog', 'fa5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/compatibility', '5cc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/configuration', 'f60'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/development', '084'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/donation', '72d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/features', '1c3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/glossary', '1b2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/install', '0ce'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/languages', 'd96'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/license',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/license', 'ea5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/permissions', 'a4c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/privacy', '7e7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/quickstart', 'd4d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/support', 'a4f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/de/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/de/docs/usage', 'c7b'),
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
