---
id: install
title: 'Aafgol'
slug: /install
sidebar_label: 'Aafgol'
---

---

## Aafgol e "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Yamre Thunderbird seeɗaaka
Ceŋol ngol naamnii Thunderbird **128 ESR walla yeeso**. Yamre ɓaylaaɗe jaɓaaka.
:::

Ɗum ko feere aafgol baɗɗo. Ceŋe aafaaɗe iwde e ATN (addons.thunderbird.net) heɓi hesɗitine e jaajol. Aafgol LOCAL/dev wonaa hesɗitde e jaajol.

- Yamre Thunderbird seeɗaaka: 128 ESR walla yeeso.

1. E Thunderbird, yah to **Tools > Add-ons and Themes**.
2. Yiylo "reply with attachments".
3. Ɓeydu ceŋol ngal.

Walla uddit hello ceŋol ngal goɗngol: [Ceŋe Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Aafgol junngol e XPI {#local-installation-in-thunderbird}

### Aawto fiilde XPI {#download-the-xpi-file}

1. Yah to [Hello Ceŋol Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Aawto yamre yeeso ceŋol ngal no fiilde XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Aaf e Thunderbird {#install-in-thunderbird-local}

1. Uddit Thunderbird.
2. Yah to **Tools > Add-ons and Themes**.
3. E **Add-ons Manager**, doɓɓo 'gear icon' mo wondi e sawndo dow‑ñamirgal.
4. Suɓo **Install Add-on From File…** e njeñtu.
5. Suɓo fiilde `reply_with_attachments-x.y.z-tb.xpi` nde aawtaa.
6. Teeŋtin aafgol ngol so ñoɗii maa.

---

## Aafgol ngam topirde {#installation-for-development}

### Aawto repo {#download-the-repository}

1. Aawto yamre yeeso e repo GitHub.
2. Hurmiti `make help` ngam ɓeydu humpito.

### Aaf e Thunderbird {#install-in-thunderbird-dev}

1. Uddit Thunderbird.
2. Yah to **Tools > Add-ons and Themes**.
3. E **Add-ons Manager**, doɓɓo 'gear icon' mo wondi e sawndo dow‑ñamirgal.
4. Suɓo **Install Add-on From File…** e njeñtu.
5. Suɓo fiilde mo waɗi `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Teeŋtin aafgol ngol so ñoɗii maa.

Ɗaɓɓitannde: So Thunderbird waawaa jaɓde `.zip` e yuɓɓo maa, inndito ɗum ko `.xpi` tee eto “Install Add‑on From File…” kadi.

### Hol ko yiyta LOCAL ZIP {#where-local-zip}

- Hakkunde, pakkito ceŋol ngol: hurmiti `make pack` e 'root' repo.
- Caggal pakkitde, yiy “LOCAL” zip e 'root' repo (ngam misal, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Hade e pakkitde kadi ngam ƴeewtere, hesɗit no yamre e ɗiɗi `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json`.

---

## Dartin, Ittu, e Hesɗitine {#disable-uninstall-updates}

- Dartin: Thunderbird → Tools → Add‑ons and Themes → yiy ceŋol ngal → toggle to 'off'.
- Ittu: ndee ɗoo yiyde → njeñtu poɗe tati → Remove.
- Hesɗitine: Aafgol iwɗe e ATN maa hesɗittoo e jaajol so yamre keseen ɗiŋii e jaɓɓude. Aafgol LOCAL/dev wonaa hesɗitde e jaajol; aaf humpito LOCAL keso e junngol.
- Momtu teelte haa timmi: ƴeew [Suturo → Momtugol keɓe](privacy#data-removal).

Ƴeew kadi

- [Fuɗɗorde Ciggo](quickstart)
