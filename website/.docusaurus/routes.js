import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Thunderbird-Reply-with-Attachments/search',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/search', '10b'),
    exact: true
  },
  {
    path: '/Thunderbird-Reply-with-Attachments/docs',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs', '1fa'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs', '42f'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs', 'e06'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/changelog', '807'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/compatibility', '6ca'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/configuration', 'a9f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/development', '7d0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/donation', '119'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/features', '9f0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/glossary', '019'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/install', 'db3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/languages', '749'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/licence',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/licence', '893'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/permissions', '37c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/privacy', 'b87'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/quickstart', 'bc3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/support', 'e8c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/third-party-licenses',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/third-party-licenses', '73f'),
                exact: true
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/usage', '133'),
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
    path: '/Thunderbird-Reply-with-Attachments/',
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/', 'e74'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
