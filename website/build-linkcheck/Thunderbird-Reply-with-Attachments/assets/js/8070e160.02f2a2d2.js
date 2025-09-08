'use strict';
(self.webpackChunkrwa_docs = self.webpackChunkrwa_docs || []).push([
  [822],
  {
    4143: (t, e, n) => {
      (n.r(e),
        n.d(e, {
          assets: () => l,
          contentTitle: () => o,
          default: () => u,
          frontMatter: () => r,
          metadata: () => s,
          toc: () => c,
        }));
      const s = JSON.parse(
        '{"id":"quickstart","title":"Quickstart","description":"1. Install the addon from Thunderbird Add\u2011ons.","source":"@site/docs/quickstart.md","sourceDirName":".","slug":"/quickstart","permalink":"/Thunderbird-Reply-with-Attachments/docs/quickstart","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1757172437000,"frontMatter":{"id":"quickstart","title":"Quickstart","sidebar_label":"Quickstart"},"sidebar":"docs","previous":{"title":"Features","permalink":"/Thunderbird-Reply-with-Attachments/docs/features"},"next":{"title":"Installation","permalink":"/Thunderbird-Reply-with-Attachments/docs/install"}}'
      );
      var a = n(4848),
        i = n(8453);
      const r = { id: 'quickstart', title: 'Quickstart', sidebar_label: 'Quickstart' },
        o = void 0,
        l = {},
        c = [];
      function d(t) {
        const e = {
          a: 'a',
          code: 'code',
          li: 'li',
          ol: 'ol',
          p: 'p',
          pre: 'pre',
          ul: 'ul',
          ...(0, i.R)(),
          ...t.components,
        };
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsxs)(e.ol, {
              children: [
                '\n',
                (0, a.jsx)(e.li, { children: 'Install the addon from Thunderbird Add\u2011ons.' }),
                '\n',
                (0, a.jsx)(e.li, {
                  children:
                    'Optional: Enable confirmation (Options \u2192 \u201cAsk before adding attachments\u201d).',
                }),
                '\n',
                (0, a.jsx)(e.li, {
                  children:
                    'Optional: Leave the blacklist warning enabled (default): \u201cWarn if attachments are excluded by blacklist\u201d.',
                }),
                '\n',
                (0, a.jsx)(e.li, {
                  children: 'Optional: Add blacklist patterns (one per line), e.g.:',
                }),
                '\n',
              ],
            }),
            '\n',
            (0, a.jsx)(e.pre, {
              children: (0, a.jsx)(e.code, {
                children:
                  '*intern*\n*secret*\n*passwor*  # matches both \u201cpassword\u201d and \u201cPasswort\u201d families\n',
              }),
            }),
            '\n',
            (0, a.jsx)(e.p, {
              children:
                'Now reply to a message with attachments \u2014 originals will be added automatically or after a quick confirmation. If any files are excluded by your blacklist, you\u2019ll see a short warning listing them.',
            }),
            '\n',
            (0, a.jsx)(e.p, { children: 'Verify' }),
            '\n',
            (0, a.jsxs)(e.ul, {
              children: [
                '\n',
                (0, a.jsx)(e.li, {
                  children:
                    'Reply to a message with 1\u20132 attachments and confirm the originals are added to your compose window.',
                }),
                '\n',
                (0, a.jsxs)(e.li, {
                  children: [
                    'To adjust behavior, see ',
                    (0, a.jsx)(e.a, { href: 'configuration', children: 'Configuration' }),
                    ' (confirmation toggle, default answer, blacklist patterns).',
                  ],
                }),
                '\n',
              ],
            }),
          ],
        });
      }
      function u(t = {}) {
        const { wrapper: e } = { ...(0, i.R)(), ...t.components };
        return e ? (0, a.jsx)(e, { ...t, children: (0, a.jsx)(d, { ...t }) }) : d(t);
      }
    },
    8453: (t, e, n) => {
      n.d(e, { R: () => r, x: () => o });
      var s = n(6540);
      const a = {},
        i = s.createContext(a);
      function r(t) {
        const e = s.useContext(i);
        return s.useMemo(
          function () {
            return 'function' == typeof t ? t(e) : { ...e, ...t };
          },
          [e, t]
        );
      }
      function o(t) {
        let e;
        return (
          (e = t.disableParentContext
            ? 'function' == typeof t.components
              ? t.components(a)
              : t.components || a
            : r(t.components)),
          s.createElement(i.Provider, { value: e }, t.children)
        );
      }
    },
  },
]);
