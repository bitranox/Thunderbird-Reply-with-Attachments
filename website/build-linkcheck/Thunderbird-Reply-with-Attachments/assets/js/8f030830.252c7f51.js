'use strict';
(self.webpackChunkrwa_docs = self.webpackChunkrwa_docs || []).push([
  [423],
  {
    7905: (e, n, s) => {
      (s.r(n),
        s.d(n, {
          assets: () => t,
          contentTitle: () => c,
          default: () => a,
          frontMatter: () => r,
          metadata: () => i,
          toc: () => o,
        }));
      const i = JSON.parse(
        '{"id":"development","title":"Development","description":"Development Guide","source":"@site/docs/development.md","sourceDirName":".","slug":"/development","permalink":"/Thunderbird-Reply-with-Attachments/docs/development","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1757108078000,"frontMatter":{"id":"development","title":"Development","sidebar_label":"Development"},"sidebar":"docs","previous":{"title":"Permissions","permalink":"/Thunderbird-Reply-with-Attachments/docs/permissions"},"next":{"title":"Languages","permalink":"/Thunderbird-Reply-with-Attachments/docs/languages"}}'
      );
      var l = s(4848),
        d = s(8453);
      const r = { id: 'development', title: 'Development', sidebar_label: 'Development' },
        c = void 0,
        t = {},
        o = [
          { value: 'Development Guide', id: 'development-guide', level: 2 },
          { value: 'Prerequisites', id: 'prerequisites', level: 3 },
          { value: 'Project Layout (high\u2011level)', id: 'project-layout-highlevel', level: 3 },
          { value: 'Install &amp; Tooling', id: 'install--tooling', level: 3 },
          { value: 'Make Targets (detailed)', id: 'make-targets-detailed', level: 3 },
          { value: 'Build &amp; Package', id: 'build--package', level: 3 },
          { value: 'Test', id: 'test', level: 3 },
          { value: 'Debugging &amp; Logs', id: 'debugging--logs', level: 3 },
          { value: 'Docs (website)', id: 'docs-website', level: 3 },
          {
            value: 'Security &amp; Configuration Tips',
            id: 'security--configuration-tips',
            level: 3,
          },
          { value: 'Troubleshooting', id: 'troubleshooting', level: 3 },
          { value: 'CI &amp; Coverage', id: 'ci--coverage', level: 3 },
          { value: 'Contributing', id: 'contributing', level: 3 },
          { value: 'Translations', id: 'translations', level: 3 },
        ];
      function h(e) {
        const n = {
          code: 'code',
          h2: 'h2',
          h3: 'h3',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, d.R)(),
          ...e.components,
        };
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)(n.h2, { id: 'development-guide', children: 'Development Guide' }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'prerequisites', children: 'Prerequisites' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: 'Node.js 18+ and npm (tested with Node 20)' }),
                '\n',
                (0, l.jsx)(n.li, { children: 'Thunderbird 128 ESR or newer (for manual testing)' }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, {
              id: 'project-layout-highlevel',
              children: 'Project Layout (high\u2011level)',
            }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Root: packaging script ',
                    (0, l.jsx)(n.code, { children: 'distribution_zip_packer.sh' }),
                    ', docs, screenshots',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    (0, l.jsx)(n.code, { children: 'sources/' }),
                    ': main addon code (background, options/popup UI, manifests, icons)',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [(0, l.jsx)(n.code, { children: 'tests/' }), ': Vitest suite'],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    (0, l.jsx)(n.code, { children: 'website/' }),
                    ': Docusaurus docs (with i18n under ',
                    (0, l.jsx)(n.code, { children: 'website/i18n/de/...' }),
                    ')',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'install--tooling', children: 'Install & Tooling' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: ['Install root deps: ', (0, l.jsx)(n.code, { children: 'npm ci' })],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Docs (optional): ',
                    (0, l.jsx)(n.code, { children: 'cd website && npm ci' }),
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: ['Discover targets: ', (0, l.jsx)(n.code, { children: 'make help' })],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'make-targets-detailed', children: 'Make Targets (detailed)' }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'The repository provides a thin Makefile to standardize common dev flows. Run ',
                (0, l.jsx)(n.code, { children: 'make help' }),
                ' to list targets.',
              ],
            }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, { children: (0, l.jsx)(n.code, { children: 'make help' }) }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Lists all available targets with one\u2011line descriptions (anything annotated with ',
                            (0, l.jsx)(n.code, { children: '##' }),
                            ' in the Makefile).',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, { children: 'make prettier' }),
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Formats the entire repo in place via Prettier (',
                            (0, l.jsx)(n.code, {
                              children: 'node_modules/prettier/bin/prettier.cjs --write .',
                            }),
                            ').',
                          ],
                        }),
                        '\n',
                        (0, l.jsx)(n.li, {
                          children: 'Used by other targets to ensure consistent formatting.',
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, { children: 'make prettier-write' }),
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Alias that simply runs ',
                            (0, l.jsx)(n.code, { children: 'make prettier' }),
                            '.',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, { children: 'make prettier-check' }),
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsx)(n.li, {
                          children:
                            'Runs Prettier in check mode (no writes). Fails if files would be reformatted.',
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, { children: (0, l.jsx)(n.code, { children: 'make eslint' }) }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Runs ESLint using the flat config (',
                            (0, l.jsx)(n.code, { children: 'npm run -s lint:eslint' }),
                            ').',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, { children: (0, l.jsx)(n.code, { children: 'make lint' }) }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Lints the MailExtension using ',
                            (0, l.jsx)(n.code, { children: 'web-ext lint' }),
                            ' against ',
                            (0, l.jsx)(n.code, { children: 'sources/' }),
                            '.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Implementation details:',
                            '\n',
                            (0, l.jsxs)(n.ul, {
                              children: [
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Temporarily copies ',
                                    (0, l.jsx)(n.code, { children: 'sources/manifest_LOCAL.json' }),
                                    ' to ',
                                    (0, l.jsx)(n.code, { children: 'sources/manifest.json' }),
                                    ' for the linter.',
                                  ],
                                }),
                                '\n',
                                (0, l.jsx)(n.li, {
                                  children: 'Ensures the temporary file is removed on exit.',
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Ignores built ZIP artifacts (',
                                    (0, l.jsx)(n.code, {
                                      children: 'reply-with-attachments-plugin*.zip',
                                    }),
                                    ').',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    (0, l.jsx)(n.code, { children: 'web-ext' }),
                                    ' findings do not fail the pipeline (',
                                    (0, l.jsx)(n.code, { children: '|| true' }),
                                    '), so review the output.',
                                  ],
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, { children: (0, l.jsx)(n.code, { children: 'make test' }) }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsx)(n.li, {
                          children:
                            'End\u2011to\u2011end developer check: format (write), format (check), ESLint, then Vitest.',
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Vitest runs with coverage when ',
                            (0, l.jsx)(n.code, { children: '@vitest/coverage-v8' }),
                            ' is installed; otherwise it runs without coverage.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Coverage settings and thresholds are configured in ',
                            (0, l.jsx)(n.code, { children: 'vitest.config.mjs' }),
                            ' (global: 85% lines/funcs/stmts, 70% branches).',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, { children: 'make test-i18n' }),
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children:
                        'Runs i18n\u2011focused test suites only, covering addon UI strings and website docs across all locales:',
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            (0, l.jsx)(n.code, { children: 'npm run test:i18n' }),
                            ' \u2192 executes ',
                            (0, l.jsx)(n.code, { children: 'tests/i18n.*.test.js' }),
                            ' (with coverage if available) for UI keys, placeholders, titles, URLs, and cross\u2011locale parity in messages.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            (0, l.jsx)(n.code, { children: 'npm run -s test:website-i18n' }),
                            ' \u2192 verifies website translations for every locale under ',
                            (0, l.jsx)(n.code, { children: 'website/i18n/<lang>/...' }),
                            ' with one test per EN doc per locale:',
                            '\n',
                            (0, l.jsxs)(n.ul, {
                              children: [
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Translation file exists (same filename or ',
                                    (0, l.jsx)(n.code, { children: '<id>.md' }),
                                    ' based on EN front\u2011matter ',
                                    (0, l.jsx)(n.code, { children: 'id' }),
                                    ').',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Translated front\u2011matter ',
                                    (0, l.jsx)(n.code, { children: 'id' }),
                                    ' exists and matches the EN ',
                                    (0, l.jsx)(n.code, { children: 'id' }),
                                    '.',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Translated ',
                                    (0, l.jsx)(n.code, { children: 'title' }),
                                    ' is non\u2011empty.',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'If EN has ',
                                    (0, l.jsx)(n.code, { children: 'sidebar_label' }),
                                    ', the translation has a non\u2011empty ',
                                    (0, l.jsx)(n.code, { children: 'sidebar_label' }),
                                    ' too.',
                                  ],
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, { children: (0, l.jsx)(n.code, { children: 'make pack' }) }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Builds both ATN and LOCAL ZIPs using ',
                            (0, l.jsx)(n.code, { children: 'distribution_zip_packer.sh' }),
                            '.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Depends on ',
                            (0, l.jsx)(n.code, { children: 'make lint' }),
                            ' first.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Outputs artifacts at the repo root (',
                            (0, l.jsx)(n.code, { children: 'reply-with-attachments-plugin*.zip' }),
                            '). Do not edit artifacts by hand.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Tip: bump versions in ',
                            (0, l.jsx)(n.code, { children: 'sources/manifest_ATN.json' }),
                            ' and ',
                            (0, l.jsx)(n.code, { children: 'sources/manifest_LOCAL.json' }),
                            ' before packaging.',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, { children: (0, l.jsx)(n.code, { children: 'make commit' }) }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Opinionated helper to stage typical changes and push:',
                            '\n',
                            (0, l.jsxs)(n.ul, {
                              children: [
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Prettier (write + check), ',
                                    (0, l.jsx)(n.code, { children: 'make test' }),
                                    ', ',
                                    (0, l.jsx)(n.code, { children: 'make test-i18n' }),
                                    '.',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Stages all changes; if there are staged diffs, appends a changelog entry (',
                                    (0, l.jsx)(n.code, {
                                      children: 'scripts/append-changelog-entry.sh',
                                    }),
                                    ').',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Commits with a standardized message and pushes to ',
                                    (0, l.jsx)(n.code, { children: 'origin/<current-branch>' }),
                                    '.',
                                  ],
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsx)(n.li, {
                          children:
                            'Requires a configured git remote and a clean repo state for best results.',
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, { children: 'make docs-build' }),
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Builds the Docusaurus website into ',
                            (0, l.jsx)(n.code, { children: 'website/build' }),
                            '.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Internals: ',
                            (0, l.jsx)(n.code, {
                              children:
                                'cd website && npm ci && node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build',
                            }),
                            '.',
                          ],
                        }),
                        '\n',
                        (0, l.jsx)(n.li, {
                          children: 'Run this before checking or deploying docs.',
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, { children: 'make docs-link-check' }),
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Builds docs (depends on ',
                            (0, l.jsx)(n.code, { children: 'docs-build' }),
                            ') and checks internal links using ',
                            (0, l.jsx)(n.code, { children: 'linkinator' }),
                            ' (installed as a devDependency at the repo root).',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Behavior is designed to be offline\u2011safe:',
                            '\n',
                            (0, l.jsxs)(n.ul, {
                              children: [
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Rewrites the GitHub Pages ',
                                    (0, l.jsx)(n.code, { children: 'baseUrl' }),
                                    ' (',
                                    (0, l.jsx)(n.code, {
                                      children: '/Thunderbird-Reply-with-Attachments/',
                                    }),
                                    ') to ',
                                    (0, l.jsx)(n.code, { children: '/' }),
                                    ' for local scanning.',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Skips all remote HTTP(S) links except ',
                                    (0, l.jsx)(n.code, { children: 'localhost' }),
                                    ' to avoid relying on the real website.',
                                  ],
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsx)(n.li, {
                          children:
                            'Useful to catch broken in\u2011site navigation before publishing.',
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, {
                        children: 'make translation DOC=<file(s)|all> TO=<lang(s)|all>',
                      }),
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Translates one or more docs from ',
                            (0, l.jsx)(n.code, { children: 'website/docs' }),
                            ' into the ',
                            (0, l.jsx)(n.code, { children: 'website/i18n/<lang>/...' }),
                            ' tree.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Examples:',
                            '\n',
                            (0, l.jsxs)(n.ul, {
                              children: [
                                '\n',
                                (0, l.jsx)(n.li, {
                                  children: (0, l.jsx)(n.code, {
                                    children: 'make translation DOC=changelog.md TO=de',
                                  }),
                                }),
                                '\n',
                                (0, l.jsx)(n.li, {
                                  children: (0, l.jsx)(n.code, {
                                    children:
                                      'make translation DOC="changelog.md features.md" TO="de fr"',
                                  }),
                                }),
                                '\n',
                                (0, l.jsx)(n.li, {
                                  children: (0, l.jsx)(n.code, {
                                    children: 'make translation DOC=all TO=all',
                                  }),
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Notes:',
                            '\n',
                            (0, l.jsxs)(n.ul, {
                              children: [
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Reads API key/model from ',
                                    (0, l.jsx)(n.code, { children: '.env' }),
                                    ' at the repo root (',
                                    (0, l.jsx)(n.code, { children: 'OPENAI_API_KEY' }),
                                    ', ',
                                    (0, l.jsx)(n.code, { children: 'OPENAI_MODEL' }),
                                    ', optional ',
                                    (0, l.jsx)(n.code, { children: 'OPENAI_TEMPERATURE' }),
                                    ').',
                                  ],
                                }),
                                '\n',
                                (0, l.jsxs)(n.li, {
                                  children: [
                                    'Preserves code blocks and front\u2011matter ',
                                    (0, l.jsx)(n.code, { children: 'id' }),
                                    '; translates ',
                                    (0, l.jsx)(n.code, { children: 'title' }),
                                    '/',
                                    (0, l.jsx)(n.code, { children: 'sidebar_label' }),
                                    '.',
                                  ],
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: (0, l.jsx)(n.code, { children: 'make docs-deploy' }),
                    }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Builds and deploys the website to a local ',
                            (0, l.jsx)(n.code, { children: 'gh-pages' }),
                            ' worktree via ',
                            (0, l.jsx)(n.code, { children: 'scripts/docs-local-deploy.sh' }),
                            '.',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Customize with ',
                            (0, l.jsx)(n.code, { children: 'OPTS' }),
                            ', for example:',
                            '\n',
                            (0, l.jsxs)(n.ul, {
                              children: [
                                '\n',
                                (0, l.jsx)(n.li, {
                                  children: (0, l.jsx)(n.code, {
                                    children:
                                      'make docs-deploy OPTS="--locales en --no-test --no-link-check"',
                                  }),
                                }),
                                '\n',
                                (0, l.jsx)(n.li, {
                                  children: (0, l.jsx)(n.code, {
                                    children: 'make docs-deploy OPTS="--locales all --dry-run"',
                                  }),
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Tip: You can override the package manager used by Make by setting ',
                (0, l.jsx)(n.code, { children: 'NPM=...' }),
                ' (defaults to ',
                (0, l.jsx)(n.code, { children: 'npm' }),
                ').',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'build--package', children: 'Build & Package' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Build ZIPs: ',
                    (0, l.jsx)(n.code, { children: 'make pack' }),
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsx)(n.li, {
                          children:
                            'Produces ATN and LOCAL ZIPs in the repo root (do not edit artifacts by hand)',
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Tip: update version in both ',
                            (0, l.jsx)(n.code, { children: 'sources/manifest_ATN.json' }),
                            ' and ',
                            (0, l.jsx)(n.code, { children: 'sources/manifest_LOCAL.json' }),
                            ' before packaging',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsx)(n.li, {
                  children:
                    'Manual install (dev): Thunderbird \u2192 Tools \u2192 Add\u2011ons and Themes \u2192 gear \u2192 Install Add\u2011on From File\u2026 \u2192 select the built ZIP',
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'test', children: 'Test' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Full suite: ',
                    (0, l.jsx)(n.code, { children: 'make test' }),
                    ' (Vitest)',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Coverage (optional):',
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsx)(n.li, {
                          children: (0, l.jsx)(n.code, {
                            children: 'npm i -D @vitest/coverage-v8',
                          }),
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Run ',
                            (0, l.jsx)(n.code, { children: 'make test' }),
                            '; open ',
                            (0, l.jsx)(n.code, { children: 'coverage/index.html' }),
                            ' for HTML report',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'i18n only: ',
                    (0, l.jsx)(n.code, { children: 'make test-i18n' }),
                    ' (UI keys/placeholders/titles + website per\u2011locale per\u2011doc parity with id/title/sidebar_label checks)',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'debugging--logs', children: 'Debugging & Logs' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, {
                  children: 'Error Console: Tools \u2192 Developer Tools \u2192 Error Console',
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Toggle verbose logs at runtime:',
                    '\n',
                    (0, l.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Enable: ',
                            (0, l.jsx)(n.code, {
                              children: 'messenger.storage.local.set({ debug: true })',
                            }),
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(n.li, {
                          children: [
                            'Disable: ',
                            (0, l.jsx)(n.code, {
                              children: 'messenger.storage.local.set({ debug: false })',
                            }),
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsx)(n.li, { children: 'Logs appear while composing/sending replies' }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'docs-website', children: 'Docs (website)' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Dev server: ',
                    (0, l.jsx)(n.code, { children: 'cd website && npm run start' }),
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Build static site: ',
                    (0, l.jsx)(n.code, { children: 'cd website && npm run build' }),
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Make equivalents: ',
                    (0, l.jsx)(n.code, { children: 'make docs-build' }),
                    ', ',
                    (0, l.jsx)(n.code, { children: 'make docs-link-check' }),
                    ', ',
                    (0, l.jsx)(n.code, { children: 'make docs-deploy' }),
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Before publishing, run the offline\u2011safe link check: ',
                    (0, l.jsx)(n.code, { children: 'make docs-link-check' }),
                    '.',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'i18n: English lives in ',
                    (0, l.jsx)(n.code, { children: 'website/docs/*.md' }),
                    '; German translations in ',
                    (0, l.jsx)(n.code, {
                      children: 'website/i18n/de/docusaurus-plugin-content-docs/current/*.md',
                    }),
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Search: If Algolia DocSearch env vars are set in CI (',
                    (0, l.jsx)(n.code, { children: 'DOCSEARCH_APP_ID' }),
                    ', ',
                    (0, l.jsx)(n.code, { children: 'DOCSEARCH_API_KEY' }),
                    ', ',
                    (0, l.jsx)(n.code, { children: 'DOCSEARCH_INDEX_NAME' }),
                    '), the site uses Algolia search; otherwise it falls back to local search. On the homepage, press ',
                    (0, l.jsx)(n.code, { children: '/' }),
                    ' or ',
                    (0, l.jsx)(n.code, { children: 'Ctrl+K' }),
                    ' to open the search box.',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, {
              id: 'security--configuration-tips',
              children: 'Security & Configuration Tips',
            }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Do not commit ',
                    (0, l.jsx)(n.code, { children: 'sources/manifest.json' }),
                    ' (created temporarily by the build)',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Keep ',
                    (0, l.jsx)(n.code, { children: 'browser_specific_settings.gecko.id' }),
                    ' stable to preserve the update channel',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'troubleshooting', children: 'Troubleshooting' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: 'Ensure Thunderbird is 128 ESR or newer' }),
                '\n',
                (0, l.jsx)(n.li, { children: 'Use the Error Console for runtime issues' }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'ci--coverage', children: 'CI & Coverage' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'GitHub Actions (',
                    (0, l.jsx)(n.code, { children: 'CI \u2014 Tests' }),
                    ') runs vitest with coverage thresholds (85% lines/functions/branches/statements). If thresholds are not met, the job fails.',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'The workflow uploads an artifact ',
                    (0, l.jsx)(n.code, { children: 'coverage-html' }),
                    ' with the HTML report; download it from the run page (Actions \u2192 latest run \u2192 Artifacts).',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'contributing', children: 'Contributing' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, {
                  children: 'See CONTRIBUTING.md for branch/commit/PR guidelines',
                }),
                '\n',
                (0, l.jsx)(n.li, {
                  children:
                    'Tip: Create a separate Thunderbird development profile for testing to avoid impacting your daily profile.',
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'translations', children: 'Translations' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, {
                  children:
                    'Running large \u201call \u2192 all\u201d translation jobs can be slow and expensive. Start with a subset (e.g., a few docs and 1\u20132 locales), review the result, then expand.',
                }),
                '\n',
              ],
            }),
          ],
        });
      }
      function a(e = {}) {
        const { wrapper: n } = { ...(0, d.R)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(h, { ...e }) }) : h(e);
      }
    },
    8453: (e, n, s) => {
      s.d(n, { R: () => r, x: () => c });
      var i = s(6540);
      const l = {},
        d = i.createContext(l);
      function r(e) {
        const n = i.useContext(d);
        return i.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e]
        );
      }
      function c(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(l)
              : e.components || l
            : r(e.components)),
          i.createElement(d.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
