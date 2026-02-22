---
id: install
title: 'Fifi sori ẹrọ'
slug: /install
sidebar_label: 'Fifi sori ẹrọ'
---

---

## Fifi sori ẹrọ nipasẹ "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Ẹya Thunderbird ti o kere ju
Afikun yii n ṣe atilẹyin Thunderbird **128 ESR tàbí tuntun ju bẹ lọ**. A ko ṣe atilẹyin awọn ẹya atijọ.
:::

Eyi ni ọna fifi sori ẹrọ ti a ṣeduro. Awọn afikun ti a fi sori ẹrọ lati ATN (addons.thunderbird.net) maa n gba awọn imudojuiwọn aifọwọyi. Fifi sori LOCAL/dev kii ṣe aifọwọyi imudojuiwọn.

- Ẹya Thunderbird to kere ju: 128 ESR tàbí tuntun ju bẹ lọ.

1. Nínú Thunderbird, lọ sí **Tools > Add-ons and Themes**.
2. Wa “reply with attachments”.
3. Fi afikun naa kun.

Tabi ṣí ojú‑iwe afikun taara: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Fifi sori ẹrọ ni ọwọ lati XPI {#local-installation-in-thunderbird}

### Gba faili XPI wọlé {#download-the-xpi-file}

1. Lọ sí [Ojú-ìwé Afikun Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Gba ẹ̀dá tuntun jùlọ ti afikun naa gẹgẹ bí faili XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Fi sori ẹrọ ninu Thunderbird {#install-in-thunderbird-local}

1. Ṣí Thunderbird.
2. Lọ sí **Tools > Add-ons and Themes**.
3. Nínú **Add-ons Manager**, tẹ aami kẹkẹ ní igun ọtun òkè.
4. Yan **Install Add-on From File…** láti inu akojọ aṣayan.
5. Yan faili `reply_with_attachments-x.y.z-tb.xpi` tí o gbasilẹ.
6. Jẹrisi fifi sori ẹrọ nígbà tí a bá bẹ̀rẹ̀.

---

## Fifi sori ẹrọ fun idagbasoke {#installation-for-development}

### Gba ibi-ipamọ (repository) wọlé {#download-the-repository}

1. Gba ẹ̀dá tuntun jùlọ ti ibi-ipamọ GitHub naa wọlé.
2. Ṣe `make help` fun alaye siwaju sii.

### Fi sori ẹrọ ninu Thunderbird {#install-in-thunderbird-dev}

1. Ṣí Thunderbird.
2. Lọ sí **Tools > Add-ons and Themes**.
3. Nínú **Add-ons Manager**, tẹ aami kẹkẹ ní igun ọtun òkè.
4. Yan **Install Add-on From File…** láti inu akojọ aṣayan.
5. Yan faili tí a ti ṣẹda `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Jẹrisi fifi sori ẹrọ nígbà tí a bá bẹ̀rẹ̀.

Akiyesi: Bí Thunderbird kò bá gba `.zip` lori eto rẹ, tún lorukọ rẹ sí `.xpi` kí o sì tún gbìyànjú “Install Add‑on From File…” lẹ́ẹ̀kansi.

### Ibo ni a ti lè rí LOCAL ZIP {#where-local-zip}

- Kọ́kọ́, ṣe package afikun naa: ṣiṣẹ `make pack` ní gbongbo ibi-ipamọ naa.
- Lẹ́yìn didi package, wa zip “LOCAL” ní gbongbo ibi-ipamọ naa (àpẹẹrẹ, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Kí o tó ṣe package lẹ́ẹ̀kansi fún ìdánwò, mu awọn ẹya pọ si ní mejeeji `sources/manifest_ATN.json` àti `sources/manifest_LOCAL.json`.

---

## Pa iṣẹ, Yọ kuro, àti Imudojuiwọn {#disable-uninstall-updates}

- Pa iṣẹ: Thunderbird → Tools → Add‑ons and Themes → wa afikun naa → yí pada sí pipa.
- Yọ kuro: wiwo kanna → akojọ aṣayan mẹta‑dọ́tì → Remove.
- Imudojuiwọn: Fifi sori lati ATN maa n ṣe aifọwọyi imudojuiwọn nígbà tí a bá fọwọsi awọn ẹya tuntun. Fifi sori LOCAL/dev kò ṣe aifọwọyi imudojuiwọn; tún fi kọ LOCAL tuntun sílẹ̀ ní ọwọ́.
- Yọ awọn eto kuro patapata: wo [Asiri → Yiyọ data](privacy#data-removal).

Wo tún

- [Ìbẹrẹ kíákíá](quickstart)
