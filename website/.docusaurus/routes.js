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
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', '7ee'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/is/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', '827'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/is/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', 'e5e'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/changelog', '960'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/compatibility', '5c2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/configuration', 'b27'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/development', '812'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/donation', 'eb1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/features', '8cf'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/glossary', '999'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/install', '322'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/languages', '442'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/license',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/license', 'bde'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/permissions', 'eaf'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/privacy', '617'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/quickstart', '5c2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/support', 'c40'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/is/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/usage', 'bfb'),
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
