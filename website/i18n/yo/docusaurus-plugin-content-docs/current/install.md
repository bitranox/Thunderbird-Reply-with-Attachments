---
id: install
title: 'Fífi ẹ̀ka'
slug: /install
sidebar_label: 'Fífi ẹ̀ka'
---

## Fífi ẹ̀ka nipasẹ "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Ẹ̀ka Thunderbird to pọju
Ẹ̀ka yìí ṣe atilẹyin fun Thunderbird **128 ESR tabi tuntun**. Ẹ̀ka atijọ ko ni atilẹyin.
:::

Eyi ni ọna fífi ẹ̀ka ti a ṣeduro. Awọn ẹ̀ka ti a fi sii lati ATN (addons.thunderbird.net) gba awọn imudojuiwọn aifọwọyi. Awọn fifi silẹ LOCAL/dev ko ṣe imudojuiwọn aifọwọyi.

- Ẹ̀ka Thunderbird to pọju: 128 ESR tabi tuntun.

1. Ninu Thunderbird, lọ si **Awọn irinṣẹ > Awọn ẹ̀ka ati Awọn akori**.
2. Wa fun "da esi pẹlu awọn asopọ".
3. Fi ẹ̀ka kun.

Tabi ṣii oju-iwe ẹ̀ka taara: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Fífi ẹ̀ka ni ọwọ lati XPI {#local-installation-in-thunderbird}

### Ṣe igbasilẹ faili XPI {#download-the-xpi-file}

1. Lọ si [Oju-iwe Ẹ̀ka Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Ṣe igbasilẹ ẹya tuntun ti ẹ̀ka gẹgẹ bi faili XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Fi sii ni Thunderbird {#install-in-thunderbird-local}

1. Ṣii Thunderbird.
2. Lọ si **Awọn irinṣẹ > Awọn ẹ̀ka ati Awọn akori**.
3. Ninu **Alakoso Ẹ̀ka**, tẹ aami gियर ni igun oke-otun.
4. Yan **Fi Ẹ̀ka Sii Lati Faili…** lati inu akojọ aṣayan.
5. Yan faili `reply_with_attachments-x.y.z-tb.xpi` ti a ṣe igbasilẹ.
6. Jẹrisi fifi sii nigbati a ba beere lọwọ rẹ.

---

## Fífi ẹ̀ka fun idagbasoke {#installation-for-development}

### Ṣe igbasilẹ àkójọ {#download-the-repository}

1. Ṣe igbasilẹ ẹya tuntun ti àkójọ GitHub.
2. Ṣe ṣiṣe `make help` fun alaye siwaju sii.

### Fi sii ni Thunderbird {#install-in-thunderbird-dev}

1. Ṣii Thunderbird.
2. Lọ si **Awọn irinṣẹ > Awọn ẹ̀ka ati Awọn akori**.
3. Ninu **Alakoso Ẹ̀ka**, tẹ aami gियर ni igun oke-otun.
4. Yan **Fi Ẹ̀ka Sii Lati Faili…** lati inu akojọ aṣayan.
5. Yan faili ti a ṣe `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Jẹrisi fifi sii nigbati a ba beere lọwọ rẹ.

Note: Ti Thunderbird ko ba gba `.zip` lori eto rẹ, pe orukọ rẹ si `.xpi` ki o tun gbiyanju “Fi Ẹ̀ka Sii Lati Faili…” lẹẹkansii.

### Nibo ni a ti le rii ZIP LOCAL {#where-local-zip}

- Ni akọkọ, ṣe apoti ẹ̀ka: ṣiṣe `make pack` ni ipilẹ àkójọ.
- Lẹhin gbigbe, wa ZIP “LOCAL” ni ipilẹ àkójọ (e.g., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ṣaaju ki o to tun-apoti fun idanwo, gbe awọn ẹya ni mejeeji `sources/manifest_ATN.json` ati `sources/manifest_LOCAL.json`.

---

## Dènà, Yọkuro, ati Imudojuiwọn {#disable-uninstall-updates}

- Dènà: Thunderbird → Awọn irinṣẹ → Awọn ẹ̀ka ati Awọn akori → wa ẹ̀ka → yipada pa.
- Yọkuro: iwo kanna → akojọ mẹta-ọrun → Yọ.
- Imudojuiwọn: Awọn fifi sori ATN ṣe imudojuiwọn aifọwọyi nigbati awọn ẹya tuntun ba jẹ akọsilẹ. Awọn fifi sori LOCAL/dev ko ṣe imudojuiwọn aifọwọyi; fi ẹya tuntun LOCAL sii ni ọwọ.
- Yọ awọn eto patapata: wo [Asiri → Yiyo data](privacy#data-removal).

Ri si tun

- [Ibẹrẹ Yara](quickstart)
