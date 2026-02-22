---
id: install
title: 'Gushiraho'
slug: /install
sidebar_label: 'Gushiraho'
---

---

## Kwinjiza biciye kuri "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Verisiyo nkeya ya Thunderbird
Iki kiyunguruzwa gishigikira Thunderbird **128 ESR canke izishasha**. Verisiyo zishaje ntizishigikirwa.
:::

Ubu ni bwo buryo bwo kwinjiza bwasabwe. Ivyiyunguruzwa vyinjiijwe bivuye kuri ATN (addons.thunderbird.net) biraronka kuvugururwa kwikoresha. Iyinjizwa rya LOCAL/dev ntirivugururwa ryikoresha.

- Verisiyo ya Thunderbird nkeya isabwa: 128 ESR canke iyishasha.

1. Muri Thunderbird, jya kuri **Tools > Add-ons and Themes**.
2. Shaka "reply with attachments".
3. Ongeramwo ikiyunguruzwa.

Canke fungura urupapuro rw'ikiyunguruzwa mu buryo butaziguye: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kwinjiza n’intoke uvuye kuri XPI {#local-installation-in-thunderbird}

### Kuramura idosiye ya XPI {#download-the-xpi-file}

1. Jya kuri [urupapuro rwa Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Kuramura verisiyo nshasha y’ikiyunguruzwa nk’idosiye ya XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Kwinjiza muri Thunderbird {#install-in-thunderbird-local}

1. Fungura Thunderbird.
2. Jya kuri **Tools > Add-ons and Themes**.
3. Muri **Add-ons Manager**, kanda akamenyetso ka gear ku ruhande rwo hejuru iburyo.
4. Hitamwo **Install Add-on From File…** muri menu.
5. Hitemwo idosiye `reply_with_attachments-x.y.z-tb.xpi` waramuruye.
6. Emeza iyinjizwa igihe ubisabwe.

---

## Kwinjiza ku iterambere {#installation-for-development}

### Kuramura ububikoshingiro (repository) {#download-the-repository}

1. Kuramura verisiyo nshasha y’ububikoshingiro bwa GitHub.
2. Koresha `make help` kugira uronke ayandi makuru.

### Kwinjiza muri Thunderbird {#install-in-thunderbird-dev}

1. Fungura Thunderbird.
2. Jya kuri **Tools > Add-ons and Themes**.
3. Muri **Add-ons Manager**, kanda akamenyetso ka gear ku ruhande rwo hejuru iburyo.
4. Hitamwo **Install Add-on From File…** muri menu.
5. Hitemwo idosiye yakorewe `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Emeza iyinjizwa igihe ubisabwe.

Noti: Nimba Thunderbird itemera `.zip` kuri sisitemu yawe, ihindurire izina ribe `.xpi` hanyuma wongere ugerageze “Install Add‑on From File…”.

### Aho woronkera LOCAL ZIP {#where-local-zip}

- Ubanza, pakiša (package) ikiyunguruzwa: kora `make pack` mu mizi (root) y’ububikoshingiro.
- Inyuma yo gupakira, rondera zip ya “LOCAL” mu mizi y’ububikoshingiro (urugero, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Imbere yo gusubira gupakira ku rwego rwo kugerageza, zamura verisiyo muri vyompi `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json`.

---

## Guhagarika, Gukuramwo, no Kuvugurura {#disable-uninstall-updates}

- Guhagarika: Thunderbird → Tools → Add‑ons and Themes → rondera ikiyunguruzwa → kanda kuri toggle kugira kigire off.
- Gukuramwo: aho nyene → menu y’udutudomo dutatu → Remove.
- Kuvugurura: ivyinjijwe biciye kuri ATN birivugurura bwikoresha igihe verisiyo nshasha zemejwe. Iyinjizwa rya LOCAL/dev ntirivugururwa ryikoresha; winjiza ukundi (reinstall) LOCAL nshasha n’intoke.
- Gukuraho burundu ivyo washizeho (settings): raba [Privacy → Data removal](privacy#data-removal).

Raba kandi

- [Gutangura vuba](quickstart)
