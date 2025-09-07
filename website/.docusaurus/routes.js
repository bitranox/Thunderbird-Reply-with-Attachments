import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Thunderbird-Reply-with-Attachments/om/search',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/search', '72b'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/om/docs',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs', 'f69'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/om/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs', '0c2'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/om/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs', '0ba'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/changelog', '7a5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/compatibility', 'e47'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/configuration', 'b6f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/development', '480'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/donation', 'ce2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/features', '26b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/glossary', '4ff'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/install', 'ec6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/languages', '54f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/licence',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/licence', 'cf8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/permissions', '9dc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/privacy', '0b9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/quickstart', '4b8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/support', '56d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/om/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/docs/usage', '3ba'),
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
    path: '/Thunderbird-Reply-with-Attachments/om/',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/om/', '4d3'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
