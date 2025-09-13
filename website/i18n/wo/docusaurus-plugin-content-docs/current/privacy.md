---
id: privacy
title: 'Kàddu gi'
sidebar_label: 'Kàddu gi'
---

## Kàddu gi

:::note Ndank-ndank, ndank-ndank, netwérk
Lii add-on bi **dëg**ul a jële analytics/telemetry te **dëg**ul a jox sa data ci kaw. Kóllëg netwérk bi ñu jëfandikoo ñu ko xam (Docs, GitHub, Donate).
:::

Reply with Attachments du jële analytics walla telemetry te du jox sa data ci kaw.

Lii add-on bi def:

- Jàmm ekk attachment metadata ak file yi ci bopp bu baax (Thunderbird API) ngir joxe ak sa jawab.
- Jàmm sa options (blacklist, confirmation, default answer) ci Thunderbirds local storage.

Lii add-on bi du def:

- Ndank-ndank, analytics, crash reporting, walla remote logging.
- Ndank-ndank xelaar, ci jéggi extérn links (Docs, GitHub, Donate) walla ba Thunderbirds moom jox ndigal ya ci ciy luy xam.

Permisions yi dañu jàpp ci [Permissions](permissions) page bi.

---

## Content Security Policy (CSP) {#content-security-policy-csp}

Njàng yi ak popup pages yi defar inline scripts. Nital JavaScript jox ci files yu joxoon ak l'add-on bi ngir jàmm ak CSP bu mag ci Thunderbird. So ko demes ci docs, dungi ci rëddu sa aasan, deesul jéffandikoo ak l'add-on bi.

---

## Data storage {#data-storage}

- User preferences (blacklist, confirmation toggle, default answer) dañu jàmm ci Thunderbird’s `storage.local` ngir l'add-on bi.
- Ndank-ndank cloud sync lanngoor ak l'add-on bi.

---

## Network {#network}

- L'add-on bi du defar netwérk ci kaw.
- Kóllëg netwérk bi yékkati ñooy jéggi links (Docs, GitHub, Donate) walla ba Thunderbird moom jox ndigal ya ci ciy luy xam.

---

## Data removal {#data-removal}

- Ndank-ndank l'add-on bi am na jox sa code.
- Settings yi dañu jàmm ci Thunderbirds `storage.local` te dañu jox ci uninstall; walla du jëfandikoo ci external storage.
- Reset settings ngir njiité:
  - Options page: jëfandikoo “Reset to defaults” ngir blacklist ak blacklist warning.
  - Advanced: ci Thunderbird → Tools → Developer Tools → Debug Add‑ons, jëfandikoo l'extension's storage te jox keys bi ma ngi bëgg.
