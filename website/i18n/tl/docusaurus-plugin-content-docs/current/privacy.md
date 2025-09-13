---
id: privacy
title: 'Pribadong Impormasyon'
sidebar_label: 'Pribadong Impormasyon'
---

## Privacy

:::note Walang telemetry; walang background network
Ang add-on na ito ay **hindi** nangangalap ng analytics/telemetry at **wala** itong mga background network na kahilingan. Ang anumang access sa network ay nangyayari lamang kapag nag-click ka sa isang panlabas na link (Docs, GitHub, Donate).
:::

Ang Reply with Attachments ay hindi nangangalap ng analytics o telemetry at hindi nagpadala ng iyong data saanman.

Ano ang ginagawa ng add-on:

- Binabasa ang metadata ng attachment at mga file mula sa orihinal na mensahe nang lokal (Thunderbird API) upang i-attach ang mga ito sa iyong reply.
- Iniimbak ang iyong mga opsyon (blacklist, kumpirmasyon, default na sagot) sa lokal na storage ng Thunderbird.

Ano ang hindi ginagawa ng add-on:

- Walang pagsubaybay, analytics, crash reporting, o remote logging.
- Walang mga background network na kahilingan, maliban kung tahasang binubuksan mo ang mga panlabas na link (Docs, GitHub, Donate).

Ang mga pahintulot ay nakadokumento sa [Permissions](permissions) na pahina.

---

## Content Security Policy (CSP) {#content-security-policy-csp}

Ang mga opsyon at popup na pahina ay umiiwas sa inline scripts. Ang lahat ng JavaScript ay na-load mula sa mga file na kasama ng add-on upang sumunod sa mahigpit na CSP sa Thunderbird. Kung mag-embed ka ng mga code snippets sa docs, ito ay mga halimbawa lamang at hindi isinasagawa ng add-on.

---

## Data storage {#data-storage}

- Ang mga preference ng gumagamit (blacklist, toggle ng kumpirmasyon, default na sagot) ay iniimbak sa `storage.local` ng Thunderbird para sa add-on na ito.
- Walang cloud sync na isinasagawa ng add-on.

---

## Network {#network}

- Ang add-on ay walang background network activity na isinasagawa.
- Ang anumang access sa network ay nangyayari lamang kapag nag-click ka sa mga link (Docs, GitHub, Donate) o kapag ang Thunderbird mismo ay nagsasagawa ng normal na operasyon na hindi kaugnay ng add-on na ito.

---

## Data removal {#data-removal}

- Ang pag-uninstall ng add-on ay aalisin ang kanyang code.
- Ang mga setting ay pinanatili lamang sa `storage.local` ng Thunderbird at aalisin sa pag-uninstall; walang panlabas na storage ang ginagamit.
- I-reset ang mga setting nang hindi nag-uninstall:
  - Pahina ng mga opsyon: gamitin ang “I-reset sa mga default” para sa blacklist at blacklist warning.
  - Advanced: sa Thunderbird → Tools → Developer Tools → Debug Add-ons, buksan ang storage ng extension at linisin ang mga key kung kinakailangan.

---
