import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Thunderbird-Reply-with-Attachments/is/search',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/search', '418'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/is/docs',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', 'cfa'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/is/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', '520'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/is/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs', 'b29'),
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
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/donation', '7ae'),
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
                path: '/Thunderbird-Reply-with-Attachments/is/docs/licence',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/licence', '9f5'),
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
                path: '/Thunderbird-Reply-with-Attachments/is/docs/third-party-licenses',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/is/docs/third-party-licenses', '6fa'),
                exact: true
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
