---
id: install
title: 'Koinstala'
slug: /install
sidebar_label: 'Instalasion'
---

---

## Kokɔtisa na nzela ya "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Version minimum ya Thunderbird
Add‑on oyo esungi Thunderbird **128 ESR to ya sika koleka**. Ba version ya kala esungami te.
:::

Oyo nde nzela ya kokɔtisa oyo esengami. Ba add‑on oyo batyami uta na ATN (addons.thunderbird.net) bazwaka mise à jour automatique. Ba install ya LOCAL/dev esalaka auto‑update te.

- Version minimum ya Thunderbird: 128 ESR to koleka.

1. Na Thunderbird, kende na **Tools > Add-ons and Themes**.
2. Luka "reply with attachments".
3. Bakisa add‑on.

To fungola lokasa ya add‑on mbala moko: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kokɔtisa na maboko uta na XPI {#local-installation-in-thunderbird}

### Télécharger fisyé XPI {#download-the-xpi-file}

1. Kende na [lokasa ya Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Télécharger version ya sika koleka ya add‑on lokola fisyé XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Kokɔtisa na Thunderbird {#install-in-thunderbird-local}

1. Fungola Thunderbird.
2. Kende na **Tools > Add-ons and Themes**.
3. Na **Add-ons Manager**, finá elembo ya gear na ngámbo ya likoló ya mobali.
4. Póna **Install Add-on From File…** na menu.
5. Pona fisyé `reply_with_attachments-x.y.z-tb.xpi` oyo otelechargaki.
6. Bondimisa kokɔtisa soki basengi.

---

## Kokɔtisa mpo na développement {#installation-for-development}

### Télécharger dépôt {#download-the-repository}

1. Télécharger version ya sika koleka ya dépôt GitHub.
2. Tambwisa `make help` mpo na sango mosusu.

### Kokɔtisa na Thunderbird {#install-in-thunderbird-dev}

1. Fungola Thunderbird.
2. Kende na **Tools > Add-ons and Themes**.
3. Na **Add-ons Manager**, finá elembo ya gear na ngámbo ya likoló ya mobali.
4. Póna **Install Add-on From File…** na menu.
5. Pona fisyé oyo esalemi `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bondimisa kokɔtisa soki basengi.

Toli: Soki Thunderbird andimí te `.zip` na sisteme na yo, bobenga kombo na yango na `.xpi` mpe meka lisusu “Install Add‑on From File…”.

### Esika ya kokuta LOCAL ZIP {#where-local-zip}

- Liboso, paketa add‑on: tambwisa `make pack` na racine ya dépôt.
- Na sima ya kopaketer, okokuta zip “LOCAL” na racine ya dépôt (ndakisa, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Liboso ya kopaketer lisusu mpo na kotɛsta, tombola ba version na `sources/manifest_ATN.json` mpe `sources/manifest_LOCAL.json`.

---

## Kofungola te, Kolongola, mpe Mise à jour {#disable-uninstall-updates}

- Kofungola te: Thunderbird → Tools → Add‑ons and Themes → zwa add‑on → salá “toggle off”.
- Kolongola: vue yango moko → menu ya bitendi misato → Remove.
- Mise à jour: ba install uta ATN esalaka auto‑update tango ba version ya sika endimisami. Ba install ya LOCAL/dev esalaka auto‑update te; tia lisusu na maboko build ya sika ya LOCAL.
- Kolongola baparamètre mobimba: tala [Privacy → Data removal](privacy#data-removal).

Talá mpe

- [Kobanda nokinoki](quickstart)
