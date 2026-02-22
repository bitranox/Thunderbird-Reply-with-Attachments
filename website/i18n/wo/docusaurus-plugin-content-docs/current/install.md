---
id: install
title: 'Samp'
slug: /install
sidebar_label: 'Istalasiyoŋ'
---

---

## Istalaasioŋ ci “Thunderbird Add-ons and Themes” {#installation-in-thunderbird-recommended}

:::important Sumbu Thunderbird wu najmadi
Add‑on bii dafa dëggal Thunderbird **128 ESR walla yu bees**. Sumb yu gën ko xóot ñu ko dëggalul.
:::

Lii mooy anam bi ñuy laaj. Yokk‑yokk yi ñu istale ci ATN (addons.thunderbird.net) dañuy jot yeesal otomatik. Istalaasioŋ LOCAL/dev du yeesal boppam.

- Sumbu Thunderbird wu najmadi: 128 ESR walla yu bees.

1. Ci Thunderbird, demal ci **Tools > Add-ons and Themes**.
2. Seetal "reply with attachments".
3. Istalel add‑on bi.

Walla ubbi xët add‑on bi bamu yoon: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Istalaasioŋ ci loxo ci XPI {#local-installation-in-thunderbird}

### Yebbi fis XPI bi {#download-the-xpi-file}

1. Demal ci [xët Thunderbird Add‑on bi](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Yebbi sumbu bi gëna beesu add‑on bi muy fis XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Istalel ci Thunderbird {#install-in-thunderbird-local}

1. Ubbi Thunderbird.
2. Demal ci **Tools > Add-ons and Themes**.
3. Ci **Add-ons Manager**, bëss palanteer bi am na beneen dencukaay (gear) ci kow ndeyjoor.
4. Tann **Install Add-on From File…** ci menu bi.
5. Tannal fis `reply_with_attachments-x.y.z-tb.xpi` bi nga yebbi.
6. Dëggal istalaasioŋ bi su ñu la laaj.

---

## Istalaasioŋ ngir defar (development) {#installation-for-development}

### Yebbi repo bi {#download-the-repository}

1. Yebbi sumbu bi gëna beesu repo GitHub bi.
2. Dooral `make help` ngir xibaar yu gën bari.

### Istalel ci Thunderbird {#install-in-thunderbird-dev}

1. Ubbi Thunderbird.
2. Demal ci **Tools > Add-ons and Themes**.
3. Ci **Add-ons Manager**, bëss palanteer bi am na beneen dencukaay (gear) ci kow ndeyjoor.
4. Tann **Install Add-on From File…** ci menu bi.
5. Tannal fis bi ñu génne `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Dëggal istalaasioŋ bi su ñu la laaj.

Xamal: Bu Thunderbird bañee nangu `.zip` ci sa sistem, soppi turam ci `.xpi` te jéemaat “Install Add‑on From File…”.

### Fa nga gën a gis LOCAL ZIP bi {#where-local-zip}

- Jëkk, pakkal add‑on bi: dooral `make pack` ci boppu repo bi.
- Ginnaaw pakk, gis “LOCAL” zip bi ci boppu repo bi (misal, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Laata nga pakkaat ngir test, yëkkati sumb yi ci ñaari fis yii: `sources/manifest_ATN.json` ak `sources/manifest_LOCAL.json`.

---

## Tëj, Dindi, ak Yeesal yi {#disable-uninstall-updates}

- Tëj: Thunderbird → Tools → Add‑ons and Themes → seetal add‑on bi → toggale off.
- Dindi: wone bi itam → menu “tànk-ñeent” (three‑dot) → Remove.
- Yeesal yi: ATN dafay istale auto‑update bu ñu nangu sumb yu bees. Istalaasioŋ LOCAL/dev du auto‑update; istallelal sumbu LOCAL bu bees ci loxo.
- Dindi réglaj yi lépp: xool [Sutura (Privacy) → Mabb donn yi (Data removal)](privacy#data-removal).

Xool itam

- [Nataalu gaaw](quickstart)
