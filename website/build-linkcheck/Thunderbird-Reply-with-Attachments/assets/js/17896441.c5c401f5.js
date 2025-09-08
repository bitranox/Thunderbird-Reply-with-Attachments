(self.webpackChunkrwa_docs = self.webpackChunkrwa_docs || []).push([
  [401],
  {
    62: (e, n, t) => {
      'use strict';
      (t.r(n), t.d(n, { default: () => Dt }));
      var a = t(6540),
        s = t(5500),
        r = t(542),
        i = t(4848);
      function c() {
        var e,
          n = (0, r.u)(),
          t = n.metadata,
          a = n.frontMatter,
          c = n.assets;
        return (0, i.jsx)(s.be, {
          title: t.title,
          description: t.description,
          keywords: a.keywords,
          image: null != (e = c.image) ? e : a.image,
        });
      }
      var o = t(4164),
        l = t(4581),
        d = t(1312),
        u = t(8774);
      function m(e) {
        var n = e.permalink,
          t = e.title,
          a = e.subLabel,
          s = e.isNext;
        return (0, i.jsxs)(u.A, {
          className: (0, o.A)(
            'pagination-nav__link',
            s ? 'pagination-nav__link--next' : 'pagination-nav__link--prev'
          ),
          to: n,
          children: [
            a && (0, i.jsx)('div', { className: 'pagination-nav__sublabel', children: a }),
            (0, i.jsx)('div', { className: 'pagination-nav__label', children: t }),
          ],
        });
      }
      function h(e) {
        var n = e.className,
          t = e.previous,
          a = e.next;
        return (0, i.jsxs)('nav', {
          className: (0, o.A)(n, 'pagination-nav'),
          'aria-label': (0, d.T)({
            id: 'theme.docs.paginator.navAriaLabel',
            message: 'Docs pages',
            description: 'The ARIA label for the docs pagination',
          }),
          children: [
            t &&
              (0, i.jsx)(
                m,
                Object.assign({}, t, {
                  subLabel: (0, i.jsx)(d.A, {
                    id: 'theme.docs.paginator.previous',
                    description: 'The label used to navigate to the previous doc',
                    children: 'Previous',
                  }),
                })
              ),
            a &&
              (0, i.jsx)(
                m,
                Object.assign({}, a, {
                  subLabel: (0, i.jsx)(d.A, {
                    id: 'theme.docs.paginator.next',
                    description: 'The label used to navigate to the next doc',
                    children: 'Next',
                  }),
                  isNext: !0,
                })
              ),
          ],
        });
      }
      function f() {
        var e = (0, r.u)().metadata;
        return (0, i.jsx)(h, { className: 'docusaurus-mt-lg', previous: e.previous, next: e.next });
      }
      var v = t(4586),
        g = t(4070),
        b = t(7559),
        p = t(3886),
        j = t(3025);
      var x = {
        unreleased: function (e) {
          var n = e.siteTitle,
            t = e.versionMetadata;
          return (0, i.jsx)(d.A, {
            id: 'theme.docs.versions.unreleasedVersionLabel',
            description:
              "The label used to tell the user that he's browsing an unreleased doc version",
            values: { siteTitle: n, versionLabel: (0, i.jsx)('b', { children: t.label }) },
            children: 'This is unreleased documentation for {siteTitle} {versionLabel} version.',
          });
        },
        unmaintained: function (e) {
          var n = e.siteTitle,
            t = e.versionMetadata;
          return (0, i.jsx)(d.A, {
            id: 'theme.docs.versions.unmaintainedVersionLabel',
            description:
              "The label used to tell the user that he's browsing an unmaintained doc version",
            values: { siteTitle: n, versionLabel: (0, i.jsx)('b', { children: t.label }) },
            children:
              'This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.',
          });
        },
      };
      function N(e) {
        var n = x[e.versionMetadata.banner];
        return (0, i.jsx)(n, Object.assign({}, e));
      }
      function A(e) {
        var n = e.versionLabel,
          t = e.to,
          a = e.onClick;
        return (0, i.jsx)(d.A, {
          id: 'theme.docs.versions.latestVersionSuggestionLabel',
          description: 'The label used to tell the user to check the latest version',
          values: {
            versionLabel: n,
            latestVersionLink: (0, i.jsx)('b', {
              children: (0, i.jsx)(u.A, {
                to: t,
                onClick: a,
                children: (0, i.jsx)(d.A, {
                  id: 'theme.docs.versions.latestVersionLinkLabel',
                  description: 'The label used for the latest version suggestion link label',
                  children: 'latest version',
                }),
              }),
            }),
          },
          children: 'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).',
        });
      }
      function C(e) {
        var n,
          t = e.className,
          a = e.versionMetadata,
          s = (0, v.A)().siteConfig.title,
          r = (0, g.useActivePlugin)({ failfast: !0 }).pluginId,
          c = (0, p.g1)(r).savePreferredVersionName,
          l = (0, g.useDocVersionSuggestions)(r),
          d = l.latestDocSuggestion,
          u = l.latestVersionSuggestion,
          m =
            null != d
              ? d
              : (n = u).docs.find(function (e) {
                  return e.id === n.mainDocId;
                });
        return (0, i.jsxs)('div', {
          className: (0, o.A)(
            t,
            b.G.docs.docVersionBanner,
            'alert alert--warning margin-bottom--md'
          ),
          role: 'alert',
          children: [
            (0, i.jsx)('div', { children: (0, i.jsx)(N, { siteTitle: s, versionMetadata: a }) }),
            (0, i.jsx)('div', {
              className: 'margin-top--md',
              children: (0, i.jsx)(A, {
                versionLabel: u.label,
                to: m.path,
                onClick: function () {
                  return c(u.name);
                },
              }),
            }),
          ],
        });
      }
      function y(e) {
        var n = e.className,
          t = (0, j.r)();
        return t.banner ? (0, i.jsx)(C, { className: n, versionMetadata: t }) : null;
      }
      function k(e) {
        var n = e.className,
          t = (0, j.r)();
        return t.badge
          ? (0, i.jsx)('span', {
              className: (0, o.A)(n, b.G.docs.docVersionBadge, 'badge badge--secondary'),
              children: (0, i.jsx)(d.A, {
                id: 'theme.docs.versionBadge.label',
                values: { versionLabel: t.label },
                children: 'Version: {versionLabel}',
              }),
            })
          : null;
      }
      const L = {
        tag: 'tag_zVej',
        tagRegular: 'tagRegular_sFm0',
        tagWithCount: 'tagWithCount_h2kH',
      };
      function w(e) {
        var n = e.permalink,
          t = e.label,
          a = e.count,
          s = e.description;
        return (0, i.jsxs)(u.A, {
          rel: 'tag',
          href: n,
          title: s,
          className: (0, o.A)(L.tag, a ? L.tagWithCount : L.tagRegular),
          children: [t, a && (0, i.jsx)('span', { children: a })],
        });
      }
      const _ = { tags: 'tags_jXut', tag: 'tag_QGVx' };
      function O(e) {
        var n = e.tags;
        return (0, i.jsxs)(i.Fragment, {
          children: [
            (0, i.jsx)('b', {
              children: (0, i.jsx)(d.A, {
                id: 'theme.tags.tagsListLabel',
                description: 'The label alongside a tag list',
                children: 'Tags:',
              }),
            }),
            (0, i.jsx)('ul', {
              className: (0, o.A)(_.tags, 'padding--none', 'margin-left--sm'),
              children: n.map(function (e) {
                return (0, i.jsx)(
                  'li',
                  { className: _.tag, children: (0, i.jsx)(w, Object.assign({}, e)) },
                  e.permalink
                );
              }),
            }),
          ],
        });
      }
      var T = t(8587);
      const B = { iconEdit: 'iconEdit_Z9Sw' };
      var E = ['className'];
      function H(e) {
        var n = e.className,
          t = (0, T.A)(e, E);
        return (0, i.jsx)(
          'svg',
          Object.assign(
            {
              fill: 'currentColor',
              height: '20',
              width: '20',
              viewBox: '0 0 40 40',
              className: (0, o.A)(B.iconEdit, n),
              'aria-hidden': 'true',
            },
            t,
            {
              children: (0, i.jsx)('g', {
                children: (0, i.jsx)('path', {
                  d: 'm34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z',
                }),
              }),
            }
          )
        );
      }
      function M(e) {
        var n = e.editUrl;
        return (0, i.jsxs)(u.A, {
          to: n,
          className: b.G.common.editThisPage,
          children: [
            (0, i.jsx)(H, {}),
            (0, i.jsx)(d.A, {
              id: 'theme.common.editThisPage',
              description: 'The link label to edit the current page',
              children: 'Edit this page',
            }),
          ],
        });
      }
      function I(e) {
        void 0 === e && (e = {});
        var n = (0, v.A)().i18n.currentLocale,
          t = (function () {
            var e = (0, v.A)().i18n,
              n = e.currentLocale;
            return e.localeConfigs[n].calendar;
          })();
        return new Intl.DateTimeFormat(n, Object.assign({ calendar: t }, e));
      }
      function S(e) {
        var n = e.lastUpdatedAt,
          t = new Date(n),
          a = I({ day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(t);
        return (0, i.jsx)(d.A, {
          id: 'theme.lastUpdated.atDate',
          description: 'The words used to describe on which date a page has been last updated',
          values: {
            date: (0, i.jsx)('b', {
              children: (0, i.jsx)('time', {
                dateTime: t.toISOString(),
                itemProp: 'dateModified',
                children: a,
              }),
            }),
          },
          children: ' on {date}',
        });
      }
      function V(e) {
        var n = e.lastUpdatedBy;
        return (0, i.jsx)(d.A, {
          id: 'theme.lastUpdated.byUser',
          description: 'The words used to describe by who the page has been last updated',
          values: { user: (0, i.jsx)('b', { children: n }) },
          children: ' by {user}',
        });
      }
      function U(e) {
        var n = e.lastUpdatedAt,
          t = e.lastUpdatedBy;
        return (0, i.jsxs)('span', {
          className: b.G.common.lastUpdated,
          children: [
            (0, i.jsx)(d.A, {
              id: 'theme.lastUpdated.lastUpdatedAtBy',
              description:
                'The sentence used to display when a page has been last updated, and by who',
              values: {
                atDate: n ? (0, i.jsx)(S, { lastUpdatedAt: n }) : '',
                byUser: t ? (0, i.jsx)(V, { lastUpdatedBy: t }) : '',
              },
              children: 'Last updated{atDate}{byUser}',
            }),
            !1,
          ],
        });
      }
      const R = { lastUpdated: 'lastUpdated_JAkA' };
      function z(e) {
        var n = e.className,
          t = e.editUrl,
          a = e.lastUpdatedAt,
          s = e.lastUpdatedBy;
        return (0, i.jsxs)('div', {
          className: (0, o.A)('row', n),
          children: [
            (0, i.jsx)('div', { className: 'col', children: t && (0, i.jsx)(M, { editUrl: t }) }),
            (0, i.jsx)('div', {
              className: (0, o.A)('col', R.lastUpdated),
              children: (a || s) && (0, i.jsx)(U, { lastUpdatedAt: a, lastUpdatedBy: s }),
            }),
          ],
        });
      }
      function D() {
        var e = (0, r.u)().metadata,
          n = e.editUrl,
          t = e.lastUpdatedAt,
          a = e.lastUpdatedBy,
          s = e.tags,
          c = s.length > 0,
          l = !!(n || t || a);
        return c || l
          ? (0, i.jsxs)('footer', {
              className: (0, o.A)(b.G.docs.docFooter, 'docusaurus-mt-lg'),
              children: [
                c &&
                  (0, i.jsx)('div', {
                    className: (0, o.A)('row margin-top--sm', b.G.docs.docFooterTagsRow),
                    children: (0, i.jsx)('div', {
                      className: 'col',
                      children: (0, i.jsx)(O, { tags: s }),
                    }),
                  }),
                l &&
                  (0, i.jsx)(z, {
                    className: (0, o.A)('margin-top--sm', b.G.docs.docFooterEditMetaRow),
                    editUrl: n,
                    lastUpdatedAt: t,
                    lastUpdatedBy: a,
                  }),
              ],
            })
          : null;
      }
      var P = t(1422),
        G = t(6342),
        F = ['parentIndex'];
      function W(e) {
        var n = e.map(function (e) {
            return Object.assign({}, e, { parentIndex: -1, children: [] });
          }),
          t = Array(7).fill(-1);
        n.forEach(function (e, n) {
          var a = t.slice(2, e.level);
          ((e.parentIndex = Math.max.apply(Math, a)), (t[e.level] = n));
        });
        var a = [];
        return (
          n.forEach(function (e) {
            var t = e.parentIndex,
              s = (0, T.A)(e, F);
            t >= 0 ? n[t].children.push(s) : a.push(s);
          }),
          a
        );
      }
      function q(e) {
        var n = e.toc,
          t = e.minHeadingLevel,
          a = e.maxHeadingLevel;
        return n.flatMap(function (e) {
          var n = q({ toc: e.children, minHeadingLevel: t, maxHeadingLevel: a });
          return (function (e) {
            return e.level >= t && e.level <= a;
          })(e)
            ? [Object.assign({}, e, { children: n })]
            : n;
        });
      }
      function J(e) {
        var n = e.getBoundingClientRect();
        return n.top === n.bottom ? J(e.parentNode) : n;
      }
      function Z(e, n) {
        var t,
          a,
          s = n.anchorTopOffset,
          r = e.find(function (e) {
            return J(e).top >= s;
          });
        return r
          ? (function (e) {
              return e.top > 0 && e.bottom < window.innerHeight / 2;
            })(J(r))
            ? r
            : null != (a = e[e.indexOf(r) - 1])
              ? a
              : null
          : null != (t = e[e.length - 1])
            ? t
            : null;
      }
      function $() {
        var e = (0, a.useRef)(0),
          n = (0, G.p)().navbar.hideOnScroll;
        return (
          (0, a.useEffect)(
            function () {
              e.current = n ? 0 : document.querySelector('.navbar').clientHeight;
            },
            [n]
          ),
          e
        );
      }
      function Y(e) {
        var n = (0, a.useRef)(void 0),
          t = $();
        (0, a.useEffect)(
          function () {
            if (!e) return function () {};
            var a = e.linkClassName,
              s = e.linkActiveClassName,
              r = e.minHeadingLevel,
              i = e.maxHeadingLevel;
            function c() {
              var e = (function (e) {
                  return Array.from(document.getElementsByClassName(e));
                })(a),
                c = (function (e) {
                  for (
                    var n = e.minHeadingLevel, t = e.maxHeadingLevel, a = [], s = n;
                    s <= t;
                    s += 1
                  )
                    a.push('h' + s + '.anchor');
                  return Array.from(document.querySelectorAll(a.join()));
                })({ minHeadingLevel: r, maxHeadingLevel: i }),
                o = Z(c, { anchorTopOffset: t.current }),
                l = e.find(function (e) {
                  return (
                    o &&
                    o.id ===
                      (function (e) {
                        return decodeURIComponent(e.href.substring(e.href.indexOf('#') + 1));
                      })(e)
                  );
                });
              e.forEach(function (e) {
                !(function (e, t) {
                  t
                    ? (n.current && n.current !== e && n.current.classList.remove(s),
                      e.classList.add(s),
                      (n.current = e))
                    : e.classList.remove(s);
                })(e, e === l);
              });
            }
            return (
              document.addEventListener('scroll', c),
              document.addEventListener('resize', c),
              c(),
              function () {
                (document.removeEventListener('scroll', c),
                  document.removeEventListener('resize', c));
              }
            );
          },
          [e, t]
        );
      }
      function Q(e) {
        var n = e.toc,
          t = e.className,
          a = e.linkClassName,
          s = e.isChild;
        return n.length
          ? (0, i.jsx)('ul', {
              className: s ? void 0 : t,
              children: n.map(function (e) {
                return (0, i.jsxs)(
                  'li',
                  {
                    children: [
                      (0, i.jsx)(u.A, {
                        to: '#' + e.id,
                        className: null != a ? a : void 0,
                        dangerouslySetInnerHTML: { __html: e.value },
                      }),
                      (0, i.jsx)(Q, {
                        isChild: !0,
                        toc: e.children,
                        className: t,
                        linkClassName: a,
                      }),
                    ],
                  },
                  e.id
                );
              }),
            })
          : null;
      }
      const X = a.memo(Q);
      var K = [
        'toc',
        'className',
        'linkClassName',
        'linkActiveClassName',
        'minHeadingLevel',
        'maxHeadingLevel',
      ];
      function ee(e) {
        var n = e.toc,
          t = e.className,
          s = void 0 === t ? 'table-of-contents table-of-contents__left-border' : t,
          r = e.linkClassName,
          c = void 0 === r ? 'table-of-contents__link' : r,
          o = e.linkActiveClassName,
          l = void 0 === o ? void 0 : o,
          d = e.minHeadingLevel,
          u = e.maxHeadingLevel,
          m = (0, T.A)(e, K),
          h = (0, G.p)(),
          f = null != d ? d : h.tableOfContents.minHeadingLevel,
          v = null != u ? u : h.tableOfContents.maxHeadingLevel,
          g = (function (e) {
            var n = e.toc,
              t = e.minHeadingLevel,
              s = e.maxHeadingLevel;
            return (0, a.useMemo)(
              function () {
                return q({ toc: W(n), minHeadingLevel: t, maxHeadingLevel: s });
              },
              [n, t, s]
            );
          })({ toc: n, minHeadingLevel: f, maxHeadingLevel: v });
        return (
          Y(
            (0, a.useMemo)(
              function () {
                if (c && l)
                  return {
                    linkClassName: c,
                    linkActiveClassName: l,
                    minHeadingLevel: f,
                    maxHeadingLevel: v,
                  };
              },
              [c, l, f, v]
            )
          ),
          (0, i.jsx)(X, Object.assign({ toc: g, className: s, linkClassName: c }, m))
        );
      }
      const ne = {
        tocCollapsibleButton: 'tocCollapsibleButton_TO0P',
        tocCollapsibleButtonExpanded: 'tocCollapsibleButtonExpanded_MG3E',
      };
      var te = ['collapsed'];
      function ae(e) {
        var n = e.collapsed,
          t = (0, T.A)(e, te);
        return (0, i.jsx)(
          'button',
          Object.assign({ type: 'button' }, t, {
            className: (0, o.A)(
              'clean-btn',
              ne.tocCollapsibleButton,
              !n && ne.tocCollapsibleButtonExpanded,
              t.className
            ),
            children: (0, i.jsx)(d.A, {
              id: 'theme.TOCCollapsible.toggleButtonLabel',
              description: 'The label used by the button on the collapsible TOC component',
              children: 'On this page',
            }),
          })
        );
      }
      const se = {
        tocCollapsible: 'tocCollapsible_ETCw',
        tocCollapsibleContent: 'tocCollapsibleContent_vkbj',
        tocCollapsibleExpanded: 'tocCollapsibleExpanded_sAul',
      };
      function re(e) {
        var n = e.toc,
          t = e.className,
          a = e.minHeadingLevel,
          s = e.maxHeadingLevel,
          r = (0, P.u)({ initialState: !0 }),
          c = r.collapsed,
          l = r.toggleCollapsed;
        return (0, i.jsxs)('div', {
          className: (0, o.A)(se.tocCollapsible, !c && se.tocCollapsibleExpanded, t),
          children: [
            (0, i.jsx)(ae, { collapsed: c, onClick: l }),
            (0, i.jsx)(P.N, {
              lazy: !0,
              className: se.tocCollapsibleContent,
              collapsed: c,
              children: (0, i.jsx)(ee, { toc: n, minHeadingLevel: a, maxHeadingLevel: s }),
            }),
          ],
        });
      }
      const ie = { tocMobile: 'tocMobile_ITEo' };
      function ce() {
        var e = (0, r.u)(),
          n = e.toc,
          t = e.frontMatter;
        return (0, i.jsx)(re, {
          toc: n,
          minHeadingLevel: t.toc_min_heading_level,
          maxHeadingLevel: t.toc_max_heading_level,
          className: (0, o.A)(b.G.docs.docTocMobile, ie.tocMobile),
        });
      }
      const oe = {
        tableOfContents: 'tableOfContents_bqdL',
        docItemContainer: 'docItemContainer_F8PC',
      };
      var le = ['className'],
        de = 'table-of-contents__link toc-highlight',
        ue = 'table-of-contents__link--active';
      function me(e) {
        var n = e.className,
          t = (0, T.A)(e, le);
        return (0, i.jsx)('div', {
          className: (0, o.A)(oe.tableOfContents, 'thin-scrollbar', n),
          children: (0, i.jsx)(
            ee,
            Object.assign({}, t, { linkClassName: de, linkActiveClassName: ue })
          ),
        });
      }
      function he() {
        var e = (0, r.u)(),
          n = e.toc,
          t = e.frontMatter;
        return (0, i.jsx)(me, {
          toc: n,
          minHeadingLevel: t.toc_min_heading_level,
          maxHeadingLevel: t.toc_max_heading_level,
          className: b.G.docs.docTocDesktop,
        });
      }
      var fe = t(1107),
        ve = t(8453),
        ge = t(5260),
        be = t(2303),
        pe = t(5293);
      function je() {
        var e = (0, G.p)().prism,
          n = (0, pe.G)().colorMode,
          t = e.theme,
          a = e.darkTheme || t;
        return 'dark' === n ? a : t;
      }
      var xe = t(8634),
        Ne = t(8426),
        Ae = t.n(Ne),
        Ce = t(3807),
        ye = (0, xe.A)(/title=(["'])(.*?)\1/, { quote: 1, title: 2 }),
        ke = (0, xe.A)(/\{([\d,-]+)\}/, { range: 1 }),
        Le = {
          js: { start: '\\/\\/', end: '' },
          jsBlock: { start: '\\/\\*', end: '\\*\\/' },
          jsx: { start: '\\{\\s*\\/\\*', end: '\\*\\/\\s*\\}' },
          bash: { start: '#', end: '' },
          html: { start: '\x3c!--', end: '--\x3e' },
        },
        we = Object.assign({}, Le, {
          lua: { start: '--', end: '' },
          wasm: { start: '\\;\\;', end: '' },
          tex: { start: '%', end: '' },
          vb: { start: "['\u2018\u2019]", end: '' },
          vbnet: { start: "(?:_\\s*)?['\u2018\u2019]", end: '' },
          rem: { start: '[Rr][Ee][Mm]\\b', end: '' },
          f90: { start: '!', end: '' },
          ml: { start: '\\(\\*', end: '\\*\\)' },
          cobol: { start: '\\*>', end: '' },
        }),
        _e = Object.keys(Le);
      function Oe(e, n) {
        var t = e
          .map(function (e) {
            var t = we[e],
              a = t.start,
              s = t.end;
            return (
              '(?:' +
              a +
              '\\s*(' +
              n
                .flatMap(function (e) {
                  var n, t;
                  return [
                    e.line,
                    null == (n = e.block) ? void 0 : n.start,
                    null == (t = e.block) ? void 0 : t.end,
                  ].filter(Boolean);
                })
                .join('|') +
              ')\\s*' +
              s +
              ')'
            );
          })
          .join('|');
        return new RegExp('^\\s*(?:' + t + ')\\s*$');
      }
      function Te(e) {
        var n = e.showLineNumbers,
          t = e.metastring;
        return 'boolean' == typeof n
          ? n
            ? 1
            : void 0
          : 'number' == typeof n
            ? n
            : (function (e) {
                var n =
                  null == e
                    ? void 0
                    : e.split(' ').find(function (e) {
                        return e.startsWith('showLineNumbers');
                      });
                if (n) {
                  if (n.startsWith('showLineNumbers=')) {
                    var t = n.replace('showLineNumbers=', '');
                    return parseInt(t, 10);
                  }
                  return 1;
                }
              })(t);
      }
      function Be(e, n) {
        var t = n.language,
          a = n.magicComments;
        if (void 0 === t) return { lineClassNames: {}, code: e };
        for (
          var s = (function (e, n) {
              switch (e) {
                case 'js':
                case 'javascript':
                case 'ts':
                case 'typescript':
                  return Oe(['js', 'jsBlock'], n);
                case 'jsx':
                case 'tsx':
                  return Oe(['js', 'jsBlock', 'jsx'], n);
                case 'html':
                  return Oe(['js', 'jsBlock', 'html'], n);
                case 'python':
                case 'py':
                case 'bash':
                  return Oe(['bash'], n);
                case 'markdown':
                case 'md':
                  return Oe(['html', 'jsx', 'bash'], n);
                case 'tex':
                case 'latex':
                case 'matlab':
                  return Oe(['tex'], n);
                case 'lua':
                case 'haskell':
                  return Oe(['lua'], n);
                case 'sql':
                  return Oe(['lua', 'jsBlock'], n);
                case 'wasm':
                  return Oe(['wasm'], n);
                case 'vb':
                case 'vba':
                case 'visual-basic':
                  return Oe(['vb', 'rem'], n);
                case 'vbnet':
                  return Oe(['vbnet', 'rem'], n);
                case 'batch':
                  return Oe(['rem'], n);
                case 'basic':
                  return Oe(['rem', 'f90'], n);
                case 'fsharp':
                  return Oe(['js', 'ml'], n);
                case 'ocaml':
                case 'sml':
                  return Oe(['ml'], n);
                case 'fortran':
                  return Oe(['f90'], n);
                case 'cobol':
                  return Oe(['cobol'], n);
                default:
                  return Oe(_e, n);
              }
            })(t, a),
            r = e.split(/\r?\n/),
            i = Object.fromEntries(
              a.map(function (e) {
                return [e.className, { start: 0, range: '' }];
              })
            ),
            c = Object.fromEntries(
              a
                .filter(function (e) {
                  return e.line;
                })
                .map(function (e) {
                  var n = e.className;
                  return [e.line, n];
                })
            ),
            o = Object.fromEntries(
              a
                .filter(function (e) {
                  return e.block;
                })
                .map(function (e) {
                  var n = e.className;
                  return [e.block.start, n];
                })
            ),
            l = Object.fromEntries(
              a
                .filter(function (e) {
                  return e.block;
                })
                .map(function (e) {
                  var n = e.className;
                  return [e.block.end, n];
                })
            ),
            d = 0;
          d < r.length;

        ) {
          var u = r[d].match(s);
          if (u) {
            var m = u.slice(1).find(function (e) {
              return void 0 !== e;
            });
            (c[m]
              ? (i[c[m]].range += d + ',')
              : o[m]
                ? (i[o[m]].start = d)
                : l[m] && (i[l[m]].range += i[l[m]].start + '-' + (d - 1) + ','),
              r.splice(d, 1));
          } else d += 1;
        }
        var h = {};
        return (
          Object.entries(i).forEach(function (e) {
            var n = e[0],
              t = e[1].range;
            Ae()(t).forEach(function (e) {
              (null != h[e] || (h[e] = []), h[e].push(n));
            });
          }),
          { code: r.join('\n'), lineClassNames: h }
        );
      }
      function Ee(e, n) {
        var t,
          a = e.replace(/\r?\n$/, '');
        return null !=
          (t = (function (e, n) {
            var t = n.metastring,
              a = n.magicComments;
            if (t && ke.test(t)) {
              var s = t.match(ke).groups.range;
              if (0 === a.length)
                throw new Error(
                  "A highlight range has been given in code block's metastring (``` " +
                    t +
                    "), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges."
                );
              var r = a[0].className,
                i = Ae()(s)
                  .filter(function (e) {
                    return e > 0;
                  })
                  .map(function (e) {
                    return [e - 1, [r]];
                  });
              return { lineClassNames: Object.fromEntries(i), code: e };
            }
            return null;
          })(a, Object.assign({}, n)))
          ? t
          : Be(a, Object.assign({}, n));
      }
      function He(e) {
        var n,
          t,
          a,
          s = (function (e) {
            var n, t, a, s;
            return null !=
              (n =
                null ==
                (s =
                  null !=
                  (t =
                    null != (a = e.language)
                      ? a
                      : (function (e) {
                          if (e) {
                            var n = e.split(' ').find(function (e) {
                              return e.startsWith('language-');
                            });
                            return null == n ? void 0 : n.replace(/language-/, '');
                          }
                        })(e.className))
                    ? t
                    : e.defaultLanguage)
                  ? void 0
                  : s.toLowerCase())
              ? n
              : 'text';
          })({ language: e.language, defaultLanguage: e.defaultLanguage, className: e.className }),
          r = Ee(e.code, { metastring: e.metastring, magicComments: e.magicComments, language: s }),
          i = r.lineClassNames,
          c = r.code,
          l = (function (e) {
            var n = e.className,
              t = e.language;
            return (0, o.A)(n, t && !(null != n && n.includes('language-' + t)) && 'language-' + t);
          })({ className: e.className, language: s }),
          d =
            ((n = e.metastring),
            (null != (t = null == n || null == (a = n.match(ye)) ? void 0 : a.groups.title)
              ? t
              : '') || e.title),
          u = Te({ showLineNumbers: e.showLineNumbers, metastring: e.metastring });
        return {
          codeInput: e.code,
          code: c,
          className: l,
          language: s,
          title: d,
          lineNumbersStart: u,
          lineClassNames: i,
        };
      }
      var Me = (0, a.createContext)(null);
      function Ie(e) {
        var n = e.metadata,
          t = e.wordWrap,
          s = e.children,
          r = (0, a.useMemo)(
            function () {
              return { metadata: n, wordWrap: t };
            },
            [n, t]
          );
        return (0, i.jsx)(Me.Provider, { value: r, children: s });
      }
      function Se() {
        var e = (0, a.useContext)(Me);
        if (null === e) throw new Ce.dV('CodeBlockContextProvider');
        return e;
      }
      const Ve = 'codeBlockContainer_Ckt0';
      var Ue = ['as'];
      function Re(e) {
        var n = e.as,
          t = (0, T.A)(e, Ue),
          a = (function (e) {
            var n = { color: '--prism-color', backgroundColor: '--prism-background-color' },
              t = {};
            return (
              Object.entries(e.plain).forEach(function (e) {
                var a = e[0],
                  s = e[1],
                  r = n[a];
                r && 'string' == typeof s && (t[r] = s);
              }),
              t
            );
          })(je());
        return (0, i.jsx)(
          n,
          Object.assign({}, t, {
            style: a,
            className: (0, o.A)(t.className, Ve, b.G.common.codeBlock),
          })
        );
      }
      const ze = 'codeBlock_bY9V',
        De = 'codeBlockStandalone_MEMb',
        Pe = 'codeBlockLines_e6Vv',
        Ge = 'codeBlockLinesWithNumbering_o6Pm';
      function Fe(e) {
        var n = e.children,
          t = e.className;
        return (0, i.jsx)(Re, {
          as: 'pre',
          tabIndex: 0,
          className: (0, o.A)(De, 'thin-scrollbar', t),
          children: (0, i.jsx)('code', { className: Pe, children: n }),
        });
      }
      var We = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
      function qe(e, n) {
        var t = (0, a.useState)(),
          s = t[0],
          r = t[1],
          i = (0, a.useCallback)(
            function () {
              var n;
              r(null == (n = e.current) ? void 0 : n.closest('[role=tabpanel][hidden]'));
            },
            [e, r]
          );
        ((0, a.useEffect)(
          function () {
            i();
          },
          [i]
        ),
          (function (e, n, t) {
            void 0 === t && (t = We);
            var s = (0, Ce._q)(n),
              r = (0, Ce.Be)(t);
            (0, a.useEffect)(
              function () {
                var n = new MutationObserver(s);
                return (
                  e && n.observe(e, r),
                  function () {
                    return n.disconnect();
                  }
                );
              },
              [e, s, r]
            );
          })(
            s,
            function (e) {
              e.forEach(function (e) {
                'attributes' === e.type && 'hidden' === e.attributeName && (n(), i());
              });
            },
            { attributes: !0, characterData: !1, childList: !1, subtree: !1 }
          ));
      }
      function Je(e) {
        return e.children;
      }
      var Ze = t(1765),
        $e = ['line', 'token'];
      function Ye(e) {
        (e.line, e.token);
        var n = (0, T.A)(e, $e);
        return (0, i.jsx)('span', Object.assign({}, n));
      }
      const Qe = 'codeLine_lJS_',
        Xe = 'codeLineNumber_Tfdd',
        Ke = 'codeLineContent_feaV';
      function en(e) {
        var n = e.line,
          t = e.classNames,
          a = e.showLineNumbers,
          s = e.getLineProps,
          r = e.getTokenProps,
          c = (function (e) {
            var n = 1 === e.length && '\n' === e[0].content ? e[0] : void 0;
            return n ? [Object.assign({}, n, { content: '' })] : e;
          })(n),
          l = s({ line: c, className: (0, o.A)(t, a && Qe) }),
          d = c.map(function (e, n) {
            var t = r({ token: e });
            return (0, i.jsx)(
              Ye,
              Object.assign({}, t, { line: c, token: e, children: t.children }),
              n
            );
          });
        return (0, i.jsxs)(
          'span',
          Object.assign({}, l, {
            children: [
              a
                ? (0, i.jsxs)(i.Fragment, {
                    children: [
                      (0, i.jsx)('span', { className: Xe }),
                      (0, i.jsx)('span', { className: Ke, children: d }),
                    ],
                  })
                : d,
              (0, i.jsx)('br', {}),
            ],
          })
        );
      }
      var nn = a.forwardRef(function (e, n) {
        return (0, i.jsx)(
          'pre',
          Object.assign({ ref: n, tabIndex: 0 }, e, {
            className: (0, o.A)(e.className, ze, 'thin-scrollbar'),
          })
        );
      });
      function tn(e) {
        var n = Se().metadata;
        return (0, i.jsx)(
          'code',
          Object.assign({}, e, {
            className: (0, o.A)(e.className, Pe, void 0 !== n.lineNumbersStart && Ge),
            style: Object.assign({}, e.style, {
              counterReset:
                void 0 === n.lineNumbersStart ? void 0 : 'line-count ' + (n.lineNumbersStart - 1),
            }),
          })
        );
      }
      function an(e) {
        var n = e.className,
          t = Se(),
          a = t.metadata,
          s = t.wordWrap,
          r = je(),
          c = a.code,
          l = a.language,
          d = a.lineNumbersStart,
          u = a.lineClassNames;
        return (0, i.jsx)(Ze.f4, {
          theme: r,
          code: c,
          language: l,
          children: function (e) {
            var t = e.className,
              a = e.style,
              r = e.tokens,
              c = e.getLineProps,
              l = e.getTokenProps;
            return (0, i.jsx)(nn, {
              ref: s.codeBlockRef,
              className: (0, o.A)(n, t),
              style: a,
              children: (0, i.jsx)(tn, {
                children: r.map(function (e, n) {
                  return (0, i.jsx)(
                    en,
                    {
                      line: e,
                      getLineProps: c,
                      getTokenProps: l,
                      classNames: u[n],
                      showLineNumbers: void 0 !== d,
                    },
                    n
                  );
                }),
              }),
            });
          },
        });
      }
      function sn(e) {
        var n = e.children,
          t = e.fallback;
        return (0, be.A)()
          ? (0, i.jsx)(i.Fragment, { children: null == n ? void 0 : n() })
          : null != t
            ? t
            : null;
      }
      var rn = ['className'];
      function cn(e) {
        var n = e.className,
          t = (0, T.A)(e, rn);
        return (0, i.jsx)(
          'button',
          Object.assign({ type: 'button' }, t, { className: (0, o.A)('clean-btn', n) })
        );
      }
      function on(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 24 24' }, e, {
            children: (0, i.jsx)('path', {
              fill: 'currentColor',
              d: 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z',
            }),
          })
        );
      }
      function ln(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 24 24' }, e, {
            children: (0, i.jsx)('path', {
              fill: 'currentColor',
              d: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
            }),
          })
        );
      }
      const dn = {
        copyButtonCopied: 'copyButtonCopied_Vdqa',
        copyButtonIcons: 'copyButtonIcons_IEyt',
        copyButtonIcon: 'copyButtonIcon_TrPX',
        copyButtonSuccessIcon: 'copyButtonSuccessIcon_cVMy',
      };
      function un(e) {
        return e
          ? (0, d.T)({
              id: 'theme.CodeBlock.copied',
              message: 'Copied',
              description: 'The copied button label on code blocks',
            })
          : (0, d.T)({
              id: 'theme.CodeBlock.copyButtonAriaLabel',
              message: 'Copy code to clipboard',
              description: 'The ARIA label for copy code blocks button',
            });
      }
      function mn() {
        var e = Se().metadata.code,
          n = (0, a.useState)(!1),
          t = n[0],
          s = n[1],
          r = (0, a.useRef)(void 0),
          i = (0, a.useCallback)(
            function () {
              (!(function (e, n) {
                var t = (void 0 === n ? {} : n).target,
                  a = void 0 === t ? document.body : t;
                if ('string' != typeof e)
                  throw new TypeError(
                    'Expected parameter `text` to be a `string`, got `' + typeof e + '`.'
                  );
                var s = document.createElement('textarea'),
                  r = document.activeElement;
                ((s.value = e),
                  s.setAttribute('readonly', ''),
                  (s.style.contain = 'strict'),
                  (s.style.position = 'absolute'),
                  (s.style.left = '-9999px'),
                  (s.style.fontSize = '12pt'));
                var i = document.getSelection(),
                  c = i.rangeCount > 0 && i.getRangeAt(0);
                (a.append(s), s.select(), (s.selectionStart = 0), (s.selectionEnd = e.length));
                var o = !1;
                try {
                  o = document.execCommand('copy');
                } catch (l) {}
                (s.remove(), c && (i.removeAllRanges(), i.addRange(c)), r && r.focus());
              })(e),
                s(!0),
                (r.current = window.setTimeout(function () {
                  s(!1);
                }, 1e3)));
            },
            [e]
          );
        return (
          (0, a.useEffect)(function () {
            return function () {
              return window.clearTimeout(r.current);
            };
          }, []),
          { copyCode: i, isCopied: t }
        );
      }
      function hn(e) {
        var n = e.className,
          t = mn(),
          a = t.copyCode,
          s = t.isCopied;
        return (0, i.jsx)(cn, {
          'aria-label': un(s),
          title: (0, d.T)({
            id: 'theme.CodeBlock.copy',
            message: 'Copy',
            description: 'The copy button label on code blocks',
          }),
          className: (0, o.A)(n, dn.copyButton, s && dn.copyButtonCopied),
          onClick: a,
          children: (0, i.jsxs)('span', {
            className: dn.copyButtonIcons,
            'aria-hidden': 'true',
            children: [
              (0, i.jsx)(on, { className: dn.copyButtonIcon }),
              (0, i.jsx)(ln, { className: dn.copyButtonSuccessIcon }),
            ],
          }),
        });
      }
      function fn(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 24 24' }, e, {
            children: (0, i.jsx)('path', {
              fill: 'currentColor',
              d: 'M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z',
            }),
          })
        );
      }
      const vn = 'wordWrapButtonIcon_b1P5',
        gn = 'wordWrapButtonEnabled_uzNF';
      function bn(e) {
        var n = e.className,
          t = Se().wordWrap;
        if (!(t.isEnabled || t.isCodeScrollable)) return !1;
        var a = (0, d.T)({
          id: 'theme.CodeBlock.wordWrapToggle',
          message: 'Toggle word wrap',
          description: 'The title attribute for toggle word wrapping button of code block lines',
        });
        return (0, i.jsx)(cn, {
          onClick: function () {
            return t.toggle();
          },
          className: (0, o.A)(n, t.isEnabled && gn),
          'aria-label': a,
          title: a,
          children: (0, i.jsx)(fn, { className: vn, 'aria-hidden': 'true' }),
        });
      }
      const pn = 'buttonGroup_M5ko';
      function jn(e) {
        var n = e.className;
        return (0, i.jsx)(sn, {
          children: function () {
            return (0, i.jsxs)('div', {
              className: (0, o.A)(n, pn),
              children: [(0, i.jsx)(bn, {}), (0, i.jsx)(hn, {})],
            });
          },
        });
      }
      const xn = 'codeBlockContent_QJqH',
        Nn = 'codeBlockTitle_OeMC';
      function An(e) {
        var n = e.className,
          t = Se().metadata;
        return (0, i.jsxs)(Re, {
          as: 'div',
          className: (0, o.A)(n, t.className),
          children: [
            t.title &&
              (0, i.jsx)('div', { className: Nn, children: (0, i.jsx)(Je, { children: t.title }) }),
            (0, i.jsxs)('div', {
              className: xn,
              children: [(0, i.jsx)(an, {}), (0, i.jsx)(jn, {})],
            }),
          ],
        });
      }
      function Cn(e) {
        var n,
          t,
          s,
          r,
          c,
          o,
          l,
          d,
          u,
          m = (function (e) {
            var n = (0, G.p)().prism;
            return He({
              code: e.children,
              className: e.className,
              metastring: e.metastring,
              magicComments: n.magicComments,
              defaultLanguage: n.defaultLanguage,
              language: e.language,
              title: e.title,
              showLineNumbers: e.showLineNumbers,
            });
          })(e),
          h =
            ((n = (0, a.useState)(!1)),
            (t = n[0]),
            (s = n[1]),
            (r = (0, a.useState)(!1)),
            (c = r[0]),
            (o = r[1]),
            (l = (0, a.useRef)(null)),
            (d = (0, a.useCallback)(
              function () {
                var e = l.current.querySelector('code');
                (t
                  ? e.removeAttribute('style')
                  : ((e.style.whiteSpace = 'pre-wrap'), (e.style.overflowWrap = 'anywhere')),
                  s(function (e) {
                    return !e;
                  }));
              },
              [l, t]
            )),
            (u = (0, a.useCallback)(
              function () {
                var e = l.current,
                  n =
                    e.scrollWidth > e.clientWidth ||
                    l.current.querySelector('code').hasAttribute('style');
                o(n);
              },
              [l]
            )),
            qe(l, u),
            (0, a.useEffect)(
              function () {
                u();
              },
              [t, u]
            ),
            (0, a.useEffect)(
              function () {
                return (
                  window.addEventListener('resize', u, { passive: !0 }),
                  function () {
                    window.removeEventListener('resize', u);
                  }
                );
              },
              [u]
            ),
            { codeBlockRef: l, isEnabled: t, isCodeScrollable: c, toggle: d });
        return (0, i.jsx)(Ie, { metadata: m, wordWrap: h, children: (0, i.jsx)(An, {}) });
      }
      var yn = ['children'];
      function kn(e) {
        var n = e.children,
          t = (0, T.A)(e, yn),
          s = (0, be.A)(),
          r = (function (e) {
            return a.Children.toArray(e).some(function (e) {
              return (0, a.isValidElement)(e);
            })
              ? e
              : Array.isArray(e)
                ? e.join('')
                : e;
          })(n),
          c = 'string' == typeof r ? Cn : Fe;
        return (0, i.jsx)(c, Object.assign({}, t, { children: r }), String(s));
      }
      function Ln(e) {
        return (0, i.jsx)('code', Object.assign({}, e));
      }
      var wn = t(3427);
      const _n = 'details_lb9f',
        On = 'isBrowser_bmU9',
        Tn = 'collapsibleContent_i85q';
      var Bn = ['summary', 'children'];
      function En(e) {
        return !!e && ('SUMMARY' === e.tagName || En(e.parentElement));
      }
      function Hn(e, n) {
        return !!e && (e === n || Hn(e.parentElement, n));
      }
      function Mn(e) {
        var n = e.summary,
          t = e.children,
          s = (0, T.A)(e, Bn);
        (0, wn.A)().collectAnchor(s.id);
        var r = (0, be.A)(),
          c = (0, a.useRef)(null),
          l = (0, P.u)({ initialState: !s.open }),
          d = l.collapsed,
          u = l.setCollapsed,
          m = (0, a.useState)(s.open),
          h = m[0],
          f = m[1],
          v = a.isValidElement(n)
            ? n
            : (0, i.jsx)('summary', { children: null != n ? n : 'Details' });
        return (0, i.jsxs)(
          'details',
          Object.assign({}, s, {
            ref: c,
            open: h,
            'data-collapsed': d,
            className: (0, o.A)(_n, r && On, s.className),
            onMouseDown: function (e) {
              En(e.target) && e.detail > 1 && e.preventDefault();
            },
            onClick: function (e) {
              e.stopPropagation();
              var n = e.target;
              En(n) && Hn(n, c.current) && (e.preventDefault(), d ? (u(!1), f(!0)) : u(!0));
            },
            children: [
              v,
              (0, i.jsx)(P.N, {
                lazy: !1,
                collapsed: d,
                onCollapseTransitionEnd: function (e) {
                  (u(e), f(!e));
                },
                children: (0, i.jsx)('div', { className: Tn, children: t }),
              }),
            ],
          })
        );
      }
      const In = 'details_b_Ee';
      function Sn(e) {
        var n = Object.assign(
          {},
          ((function (e) {
            if (null == e) throw new TypeError('Cannot destructure ' + e);
          })(e),
          e)
        );
        return (0, i.jsx)(
          Mn,
          Object.assign({}, n, { className: (0, o.A)('alert alert--info', In, n.className) })
        );
      }
      function Vn(e) {
        var n = a.Children.toArray(e.children),
          t = n.find(function (e) {
            return a.isValidElement(e) && 'summary' === e.type;
          }),
          s = (0, i.jsx)(i.Fragment, {
            children: n.filter(function (e) {
              return e !== t;
            }),
          });
        return (0, i.jsx)(Sn, Object.assign({}, e, { summary: t, children: s }));
      }
      function Un(e) {
        return (0, i.jsx)(fe.A, Object.assign({}, e));
      }
      const Rn = 'containsTaskList_mC6p';
      function zn(e) {
        if (void 0 !== e)
          return (0, o.A)(e, (null == e ? void 0 : e.includes('contains-task-list')) && Rn);
      }
      const Dn = 'img_ev3q';
      function Pn(e) {
        var n,
          t = (function (e) {
            var n = a.Children.toArray(e),
              t = n.find(function (e) {
                return a.isValidElement(e) && 'mdxAdmonitionTitle' === e.type;
              }),
              s = n.filter(function (e) {
                return e !== t;
              });
            return {
              mdxAdmonitionTitle: null == t ? void 0 : t.props.children,
              rest: s.length > 0 ? (0, i.jsx)(i.Fragment, { children: s }) : null,
            };
          })(e.children),
          s = t.mdxAdmonitionTitle,
          r = t.rest,
          c = null != (n = e.title) ? n : s;
        return Object.assign({}, e, c && { title: c }, { children: r });
      }
      const Gn = 'admonition_xJq3',
        Fn = 'admonitionHeading_Gvgb',
        Wn = 'admonitionIcon_Rf37',
        qn = 'admonitionContent_BuS1';
      function Jn(e) {
        var n = e.type,
          t = e.className,
          a = e.children;
        return (0, i.jsx)('div', {
          className: (0, o.A)(b.G.common.admonition, b.G.common.admonitionType(n), Gn, t),
          children: a,
        });
      }
      function Zn(e) {
        var n = e.icon,
          t = e.title;
        return (0, i.jsxs)('div', {
          className: Fn,
          children: [(0, i.jsx)('span', { className: Wn, children: n }), t],
        });
      }
      function $n(e) {
        var n = e.children;
        return n ? (0, i.jsx)('div', { className: qn, children: n }) : null;
      }
      function Yn(e) {
        var n = e.type,
          t = e.icon,
          a = e.title,
          s = e.children,
          r = e.className;
        return (0, i.jsxs)(Jn, {
          type: n,
          className: r,
          children: [
            a || t ? (0, i.jsx)(Zn, { title: a, icon: t }) : null,
            (0, i.jsx)($n, { children: s }),
          ],
        });
      }
      function Qn(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 14 16' }, e, {
            children: (0, i.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z',
            }),
          })
        );
      }
      var Xn = {
        icon: (0, i.jsx)(Qn, {}),
        title: (0, i.jsx)(d.A, {
          id: 'theme.admonition.note',
          description: 'The default label used for the Note admonition (:::note)',
          children: 'note',
        }),
      };
      function Kn(e) {
        return (0, i.jsx)(
          Yn,
          Object.assign({}, Xn, e, {
            className: (0, o.A)('alert alert--secondary', e.className),
            children: e.children,
          })
        );
      }
      function et(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 12 16' }, e, {
            children: (0, i.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z',
            }),
          })
        );
      }
      var nt = {
        icon: (0, i.jsx)(et, {}),
        title: (0, i.jsx)(d.A, {
          id: 'theme.admonition.tip',
          description: 'The default label used for the Tip admonition (:::tip)',
          children: 'tip',
        }),
      };
      function tt(e) {
        return (0, i.jsx)(
          Yn,
          Object.assign({}, nt, e, {
            className: (0, o.A)('alert alert--success', e.className),
            children: e.children,
          })
        );
      }
      function at(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 14 16' }, e, {
            children: (0, i.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z',
            }),
          })
        );
      }
      var st = {
        icon: (0, i.jsx)(at, {}),
        title: (0, i.jsx)(d.A, {
          id: 'theme.admonition.info',
          description: 'The default label used for the Info admonition (:::info)',
          children: 'info',
        }),
      };
      function rt(e) {
        return (0, i.jsx)(
          Yn,
          Object.assign({}, st, e, {
            className: (0, o.A)('alert alert--info', e.className),
            children: e.children,
          })
        );
      }
      function it(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 16 16' }, e, {
            children: (0, i.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z',
            }),
          })
        );
      }
      var ct = {
        icon: (0, i.jsx)(it, {}),
        title: (0, i.jsx)(d.A, {
          id: 'theme.admonition.warning',
          description: 'The default label used for the Warning admonition (:::warning)',
          children: 'warning',
        }),
      };
      function ot(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 12 16' }, e, {
            children: (0, i.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z',
            }),
          })
        );
      }
      var lt = {
        icon: (0, i.jsx)(ot, {}),
        title: (0, i.jsx)(d.A, {
          id: 'theme.admonition.danger',
          description: 'The default label used for the Danger admonition (:::danger)',
          children: 'danger',
        }),
      };
      var dt = {
        icon: (0, i.jsx)(it, {}),
        title: (0, i.jsx)(d.A, {
          id: 'theme.admonition.caution',
          description: 'The default label used for the Caution admonition (:::caution)',
          children: 'caution',
        }),
      };
      var ut = {
          note: Kn,
          tip: tt,
          info: rt,
          warning: function (e) {
            return (0, i.jsx)(
              Yn,
              Object.assign({}, ct, e, {
                className: (0, o.A)('alert alert--warning', e.className),
                children: e.children,
              })
            );
          },
          danger: function (e) {
            return (0, i.jsx)(
              Yn,
              Object.assign({}, lt, e, {
                className: (0, o.A)('alert alert--danger', e.className),
                children: e.children,
              })
            );
          },
        },
        mt = {
          secondary: function (e) {
            return (0, i.jsx)(Kn, Object.assign({ title: 'secondary' }, e));
          },
          important: function (e) {
            return (0, i.jsx)(rt, Object.assign({ title: 'important' }, e));
          },
          success: function (e) {
            return (0, i.jsx)(tt, Object.assign({ title: 'success' }, e));
          },
          caution: function (e) {
            return (0, i.jsx)(
              Yn,
              Object.assign({}, dt, e, {
                className: (0, o.A)('alert alert--warning', e.className),
                children: e.children,
              })
            );
          },
        };
      const ht = Object.assign({}, ut, mt);
      function ft(e) {
        var n,
          t = Pn(e),
          a =
            ((n = t.type),
            ht[n] ||
              (console.warn(
                'No admonition component found for admonition type "' +
                  n +
                  '". Using Info as fallback.'
              ),
              ht.info));
        return (0, i.jsx)(a, Object.assign({}, t));
      }
      const vt = {
        Head: ge.A,
        details: Vn,
        Details: Vn,
        code: function (e) {
          return (function (e) {
            return (
              void 0 !== e.children &&
              a.Children.toArray(e.children).every(function (e) {
                return 'string' == typeof e && !e.includes('\n');
              })
            );
          })(e)
            ? (0, i.jsx)(Ln, Object.assign({}, e))
            : (0, i.jsx)(kn, Object.assign({}, e));
        },
        a: function (e) {
          return (0, i.jsx)(u.A, Object.assign({}, e));
        },
        pre: function (e) {
          return (0, i.jsx)(i.Fragment, { children: e.children });
        },
        ul: function (e) {
          return (0, i.jsx)('ul', Object.assign({}, e, { className: zn(e.className) }));
        },
        li: function (e) {
          return ((0, wn.A)().collectAnchor(e.id), (0, i.jsx)('li', Object.assign({}, e)));
        },
        img: function (e) {
          return (0, i.jsx)(
            'img',
            Object.assign({ decoding: 'async', loading: 'lazy' }, e, {
              className: ((n = e.className), (0, o.A)(n, Dn)),
            })
          );
          var n;
        },
        h1: function (e) {
          return (0, i.jsx)(Un, Object.assign({ as: 'h1' }, e));
        },
        h2: function (e) {
          return (0, i.jsx)(Un, Object.assign({ as: 'h2' }, e));
        },
        h3: function (e) {
          return (0, i.jsx)(Un, Object.assign({ as: 'h3' }, e));
        },
        h4: function (e) {
          return (0, i.jsx)(Un, Object.assign({ as: 'h4' }, e));
        },
        h5: function (e) {
          return (0, i.jsx)(Un, Object.assign({ as: 'h5' }, e));
        },
        h6: function (e) {
          return (0, i.jsx)(Un, Object.assign({ as: 'h6' }, e));
        },
        admonition: ft,
        mermaid: function () {
          return null;
        },
      };
      function gt(e) {
        var n = e.children;
        return (0, i.jsx)(ve.x, { components: vt, children: n });
      }
      function bt(e) {
        var n,
          t,
          a,
          s,
          c = e.children,
          l =
            ((n = (0, r.u)()),
            (t = n.metadata),
            (a = n.frontMatter),
            (s = n.contentTitle),
            a.hide_title || void 0 !== s ? null : t.title);
        return (0, i.jsxs)('div', {
          className: (0, o.A)(b.G.docs.docMarkdown, 'markdown'),
          children: [
            l && (0, i.jsx)('header', { children: (0, i.jsx)(fe.A, { as: 'h1', children: l }) }),
            (0, i.jsx)(gt, { children: c }),
          ],
        });
      }
      var pt = t(4718),
        jt = t(9169),
        xt = t(6025);
      function Nt(e) {
        return (0, i.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 24 24' }, e, {
            children: (0, i.jsx)('path', {
              d: 'M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z',
              fill: 'currentColor',
            }),
          })
        );
      }
      const At = { breadcrumbHomeIcon: 'breadcrumbHomeIcon_YNFT' };
      function Ct() {
        var e = (0, xt.Ay)('/');
        return (0, i.jsx)('li', {
          className: 'breadcrumbs__item',
          children: (0, i.jsx)(u.A, {
            'aria-label': (0, d.T)({
              id: 'theme.docs.breadcrumbs.home',
              message: 'Home page',
              description: 'The ARIA label for the home page in the breadcrumbs',
            }),
            className: 'breadcrumbs__link',
            href: e,
            children: (0, i.jsx)(Nt, { className: At.breadcrumbHomeIcon }),
          }),
        });
      }
      var yt = t(3336);
      function kt(e) {
        var n = (0, yt.D)({ breadcrumbs: e.breadcrumbs });
        return (0, i.jsx)(ge.A, {
          children: (0, i.jsx)('script', {
            type: 'application/ld+json',
            children: JSON.stringify(n),
          }),
        });
      }
      const Lt = { breadcrumbsContainer: 'breadcrumbsContainer_Z_bl' };
      function wt(e) {
        var n = e.children,
          t = e.href,
          a = 'breadcrumbs__link';
        return e.isLast
          ? (0, i.jsx)('span', { className: a, children: n })
          : t
            ? (0, i.jsx)(u.A, {
                className: a,
                href: t,
                children: (0, i.jsx)('span', { children: n }),
              })
            : (0, i.jsx)('span', { className: a, children: n });
      }
      function _t(e) {
        var n = e.children,
          t = e.active;
        return (0, i.jsx)('li', {
          className: (0, o.A)('breadcrumbs__item', { 'breadcrumbs__item--active': t }),
          children: n,
        });
      }
      function Ot() {
        var e = (0, pt.OF)(),
          n = (0, jt.Dt)();
        return e
          ? (0, i.jsxs)(i.Fragment, {
              children: [
                (0, i.jsx)(kt, { breadcrumbs: e }),
                (0, i.jsx)('nav', {
                  className: (0, o.A)(b.G.docs.docBreadcrumbs, Lt.breadcrumbsContainer),
                  'aria-label': (0, d.T)({
                    id: 'theme.docs.breadcrumbs.navAriaLabel',
                    message: 'Breadcrumbs',
                    description: 'The ARIA label for the breadcrumbs',
                  }),
                  children: (0, i.jsxs)('ul', {
                    className: 'breadcrumbs',
                    children: [
                      n && (0, i.jsx)(Ct, {}),
                      e.map(function (n, t) {
                        var a = t === e.length - 1,
                          s = 'category' === n.type && n.linkUnlisted ? void 0 : n.href;
                        return (0, i.jsx)(
                          _t,
                          {
                            active: a,
                            children: (0, i.jsx)(wt, { href: s, isLast: a, children: n.label }),
                          },
                          t
                        );
                      }),
                    ],
                  }),
                }),
              ],
            })
          : null;
      }
      function Tt() {
        return (0, i.jsx)(d.A, {
          id: 'theme.contentVisibility.unlistedBanner.title',
          description: 'The unlisted content banner title',
          children: 'Unlisted page',
        });
      }
      function Bt() {
        return (0, i.jsx)(d.A, {
          id: 'theme.contentVisibility.unlistedBanner.message',
          description: 'The unlisted content banner message',
          children:
            'This page is unlisted. Search engines will not index it, and only users having a direct link can access it.',
        });
      }
      function Et() {
        return (0, i.jsx)(ge.A, {
          children: (0, i.jsx)('meta', { name: 'robots', content: 'noindex, nofollow' }),
        });
      }
      function Ht() {
        return (0, i.jsx)(d.A, {
          id: 'theme.contentVisibility.draftBanner.title',
          description: 'The draft content banner title',
          children: 'Draft page',
        });
      }
      function Mt() {
        return (0, i.jsx)(d.A, {
          id: 'theme.contentVisibility.draftBanner.message',
          description: 'The draft content banner message',
          children:
            'This page is a draft. It will only be visible in dev and be excluded from the production build.',
        });
      }
      function It(e) {
        var n = e.className;
        return (0, i.jsx)(ft, {
          type: 'caution',
          title: (0, i.jsx)(Ht, {}),
          className: (0, o.A)(n, b.G.common.draftBanner),
          children: (0, i.jsx)(Mt, {}),
        });
      }
      function St(e) {
        var n = e.className;
        return (0, i.jsx)(ft, {
          type: 'caution',
          title: (0, i.jsx)(Tt, {}),
          className: (0, o.A)(n, b.G.common.unlistedBanner),
          children: (0, i.jsx)(Bt, {}),
        });
      }
      function Vt(e) {
        return (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)(Et, {}), (0, i.jsx)(St, Object.assign({}, e))],
        });
      }
      function Ut(e) {
        var n = e.metadata,
          t = n.unlisted,
          a = n.frontMatter;
        return (0, i.jsxs)(i.Fragment, {
          children: [(t || a.unlisted) && (0, i.jsx)(Vt, {}), a.draft && (0, i.jsx)(It, {})],
        });
      }
      const Rt = { docItemContainer: 'docItemContainer_Djhp', docItemCol: 'docItemCol_VOVn' };
      function zt(e) {
        var n,
          t,
          a,
          s,
          c,
          d,
          u = e.children,
          m =
            ((n = (0, r.u)()),
            (t = n.frontMatter),
            (a = n.toc),
            (s = (0, l.l)()),
            (c = t.hide_table_of_contents),
            (d = !c && a.length > 0),
            {
              hidden: c,
              mobile: d ? (0, i.jsx)(ce, {}) : void 0,
              desktop: !d || ('desktop' !== s && 'ssr' !== s) ? void 0 : (0, i.jsx)(he, {}),
            }),
          h = (0, r.u)().metadata;
        return (0, i.jsxs)('div', {
          className: 'row',
          children: [
            (0, i.jsxs)('div', {
              className: (0, o.A)('col', !m.hidden && Rt.docItemCol),
              children: [
                (0, i.jsx)(Ut, { metadata: h }),
                (0, i.jsx)(y, {}),
                (0, i.jsxs)('div', {
                  className: Rt.docItemContainer,
                  children: [
                    (0, i.jsxs)('article', {
                      children: [
                        (0, i.jsx)(Ot, {}),
                        (0, i.jsx)(k, {}),
                        m.mobile,
                        (0, i.jsx)(bt, { children: u }),
                        (0, i.jsx)(D, {}),
                      ],
                    }),
                    (0, i.jsx)(f, {}),
                  ],
                }),
              ],
            }),
            m.desktop && (0, i.jsx)('div', { className: 'col col--3', children: m.desktop }),
          ],
        });
      }
      function Dt(e) {
        var n = 'docs-doc-id-' + e.content.metadata.id,
          t = e.content;
        return (0, i.jsx)(r._, {
          content: e.content,
          children: (0, i.jsxs)(s.e3, {
            className: n,
            children: [(0, i.jsx)(c, {}), (0, i.jsx)(zt, { children: (0, i.jsx)(t, {}) })],
          }),
        });
      }
    },
    8426: (e, n) => {
      function t(e) {
        let n,
          t = [];
        for (let a of e.split(',').map((e) => e.trim()))
          if (/^-?\d+$/.test(a)) t.push(parseInt(a, 10));
          else if ((n = a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))) {
            let [e, a, s, r] = n;
            if (a && r) {
              ((a = parseInt(a)), (r = parseInt(r)));
              const e = a < r ? 1 : -1;
              ('-' !== s && '..' !== s && '\u2025' !== s) || (r += e);
              for (let n = a; n !== r; n += e) t.push(n);
            }
          }
        return t;
      }
      ((n.default = t), (e.exports = t));
    },
    8453: (e, n, t) => {
      'use strict';
      t.d(n, { R: () => i, x: () => c });
      var a = t(6540);
      const s = {},
        r = a.createContext(s);
      function i(e) {
        const n = a.useContext(r);
        return a.useMemo(
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
              ? e.components(s)
              : e.components || s
            : i(e.components)),
          a.createElement(r.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
