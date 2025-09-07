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
    component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs', '954'),
    routes: [
      {
        path: '/Thunderbird-Reply-with-Attachments/docs',
        component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs', 'd03'),
        routes: [
          {
            path: '/Thunderbird-Reply-with-Attachments/docs',
            component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs', '76c'),
            routes: [
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/changelog',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/changelog', 'fd9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/compatibility',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/compatibility', '4c8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/configuration',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/configuration', 'c3f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/development',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/development', '672'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/donation',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/donation', '323'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/features',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/features', '99b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/glossary',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/glossary', '86c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/install',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/install', 'c77'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/languages',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/languages', 'ca9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/licence',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/licence', 'f12'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/permissions',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/permissions', 'fb4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/privacy',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/privacy', 'adb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/quickstart',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/quickstart', '6af'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/support',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/support', '0b5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/Thunderbird-Reply-with-Attachments/docs/usage',
                component: ComponentCreator('/Thunderbird-Reply-with-Attachments/docs/usage', '201'),
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
