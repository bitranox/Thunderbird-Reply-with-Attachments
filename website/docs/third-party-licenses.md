---
id: third-party-licenses
title: Third‑party licenses
sidebar_label: Third‑party licenses
---

This page summarizes third‑party licenses used by this repository. For the
authoritative list in the source tree, see `THIRD_PARTY_LICENSES.md` at the
repository root.

Tools and libraries (development/test/docs)

- vitest — MIT
- jsdom — MIT
- @docusaurus/core — MIT
- @docusaurus/preset-classic — MIT
- react — MIT
- react-dom — MIT
- clsx — MIT
- web‑ext (used via npx only) — MPL‑2.0 (dev tool; not distributed with the addon)

Notes

- Thunderbird MailExtension APIs are platform APIs; no third‑party code is bundled from them.
- Project icons in `sources/icons` are project assets (MIT unless stated otherwise). The GitHub logo/icon is a GitHub trademark and not covered by MIT; it is used per GitHub brand guidelines.

If you add new dependencies or bundle third‑party code, please update both this
page and `THIRD_PARTY_LICENSES.md` accordingly.
