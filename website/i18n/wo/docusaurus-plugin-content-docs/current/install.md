---
id: install
title: 'Sosna'
slug: /install
sidebar_label: 'Sosna'
---

## Sosna ci "Thunderbird Add-ons ak Themes" {#installation-in-thunderbird-recommended}

:::important Dafa jeex Thunderbird Yuuyal
Sosna bu ñuy wàcce add-on bi **128 ESR walla yeneen**. Version yu njëkk dañu sëriñ.
:::

Lii mooy sosna bu jeexal. Add-ons yu jot ci ATN (addons.thunderbird.net) amna àttan jëfandikoo. LOCAL/dev sosnañul àttan jëfandikoo.

- Dafa jeex Thunderbird yuuyal: 128 ESR walla yeneen.

1. Ci Thunderbird, joge ci **Tools > Add-ons ak Themes**.
2. Soppali "reply with attachments".
3. Jotee add-on bi.

Wall ak alal add-on bi ci: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Sosna bu nekk ci XPI {#local-installation-in-thunderbird}

### Jottali XPI file bi {#download-the-xpi-file}

1. Jogee ci [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Jottali version bu jëkk ci add-on bi ni XPI file (`reply_with_attachments-x.y.z-tb.xpi`).

### Sosna ci Thunderbird {#install-in-thunderbird-local}

1. Soor Thunderbird.
2. Jogee ci **Tools > Add-ons ak Themes**.
3. Ci **Add-ons Manager**, suqali icon bi ci kaw-gis.
4. Rëw ci **Install Add-on From File…** ci menu bi.
5. Sëggee XPI file bi `reply_with_attachments-x.y.z-tb.xpi`.
6. Wënee sosna bi sooy jàngale.

---

## Sosna ci jëlel {#installation-for-development}

### Jottali repository bi {#download-the-repository}

1. Jottali version bu jëkk ci GitHub repository bi.
2. Jàppale `make help` ngir seetlu lien.

### Sosna ci Thunderbird {#install-in-thunderbird-dev}

1. Soor Thunderbird.
2. Jogee ci **Tools > Add-ons ak Themes**.
3. Ci **Add-ons Manager**, suqali icon bi ci kaw-gis.
4. Rëw ci **Install Add-on From File…** ci menu bi.
5. Sëggee file bi aada bu `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Wënee sosna bi sooy jàngale.

Nota: Su Thunderbird mënul ànd ak `.zip` ci sa système, yewwi ko ci `.xpi` te jàpp “Install Add‑on From File…” bu baax.

### Fu jéem LOCAL ZIP {#where-local-zip}

- Lu jeex, boxal add‑on bi: jàppale `make pack` ci root bi.
- Ba mu boxal, jëfandikoo “LOCAL” zip ci root bi (ndax, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Mbind bi ci true jéek, sañ-sañ ak version yi ci `sources/manifest_ATN.json` ak `sources/manifest_LOCAL.json`.

---

## Yewwi, Lekk, ak Updates {#disable-uninstall-updates}

- Yewwi: Thunderbird → Tools → Add‑ons ak Themes → cankoo add‑on bi → togglée off.
- Lekk: sañ-sañ bi → three‑dot menu → Remove.
- Updates: ATN installations àttan jëfandikoo sooy sédd, new versions ci jàngale. LOCAL/dev installations doo sükk, nangu jëfandikoo jéem LOCAL bi.
- Wutee settings képp: bëgge [Privacy → Data removal](privacy#data-removal).

Wujj nag

- [Quickstart](quickstart)
