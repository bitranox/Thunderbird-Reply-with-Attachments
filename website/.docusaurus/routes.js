import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Thunderbird-Reply-with-Attachments/is/donate',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/donate', 'f1b'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/is/search',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/search', '418'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/is/support',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/support', '64c'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/is/docs',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', 'de4'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/is/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', 'bd3'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/is/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', 'ca9'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/changelog', 'a78'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/compatibility', '28e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/configuration', '7c3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/development', 'bdd'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/donation', '91a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/features', '760'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/glossary', 'd29'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/install', '250'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/languages', 'ba8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/license',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/license', 'a68'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/permissions', '6b8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/privacy', 'f05'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/quickstart', '1ad'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/support', '51b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/usage', 'f6d'),
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
    path: '/Thunderbird-Reply-with-Attachments/is/',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/', '8e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
