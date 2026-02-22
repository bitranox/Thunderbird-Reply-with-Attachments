---
id: install
title: 'Instalēšana'
slug: /install
sidebar_label: 'Instalēšana'
---

---

## Instalēšana, izmantojot "Thunderbird Paplašinājumi un motīvi" {#installation-in-thunderbird-recommended}

:::important Minimālā Thunderbird versija
Šis paplašinājums atbalsta Thunderbird **128 ESR vai jaunāku**. Vecākas versijas netiek atbalstītas.
:::

Šī ir ieteicamā instalēšanas metode. No ATN (addons.thunderbird.net) instalētie paplašinājumi saņem automātiskus atjauninājumus. LOCAL/dev instalācijas netiek atjauninātas automātiski.

- Minimālā Thunderbird versija: 128 ESR vai jaunāka.

1. Programmā Thunderbird atveriet **Rīki > Paplašinājumi un motīvi**.
2. Meklējiet "reply with attachments".
3. Pievienojiet paplašinājumu.

Vai atveriet paplašinājuma lapu tieši: [Thunderbird paplašinājumi (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuāla instalēšana no XPI {#local-installation-in-thunderbird}

### Lejupielādējiet XPI failu {#download-the-xpi-file}

1. Atveriet [Thunderbird paplašinājuma lapu](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Lejupielādējiet jaunāko paplašinājuma versiju kā XPI failu (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalēšana programmā Thunderbird {#install-in-thunderbird-local}

1. Atveriet Thunderbird.
2. Atveriet **Rīki > Paplašinājumi un motīvi**.
3. **Paplašinājumu pārvaldniekā** noklikšķiniet uz zobrata ikonas augšējā labajā stūrī.
4. No izvēlnes izvēlieties **Instalēt paplašinājumu no faila…**.
5. Izvēlieties lejupielādēto `reply_with_attachments-x.y.z-tb.xpi` failu.
6. Kad tiek piedāvāts, apstipriniet instalēšanu.

---

## Instalēšana izstrādei {#installation-for-development}

### Lejupielādējiet repozitoriju {#download-the-repository}

1. Lejupielādējiet jaunāko GitHub repozitorija versiju.
2. Informācijai palaidiet `make help`.

### Instalēšana programmā Thunderbird {#install-in-thunderbird-dev}

1. Atveriet Thunderbird.
2. Atveriet **Rīki > Paplašinājumi un motīvi**.
3. **Paplašinājumu pārvaldniekā** noklikšķiniet uz zobrata ikonas augšējā labajā stūrī.
4. No izvēlnes izvēlieties **Instalēt paplašinājumu no faila…**.
5. Izvēlieties ģenerēto failu `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Kad tiek piedāvāts, apstipriniet instalēšanu.

Piezīme: Ja Thunderbird jūsu sistēmā nepieņem `.zip`, pārdēvējiet to par `.xpi` un mēģiniet vēlreiz “Instalēt paplašinājumu no faila…”.

### Kur atrast LOCAL ZIP {#where-local-zip}

- Vispirms iepakojiet paplašinājumu: palaidiet `make pack` repozitorija saknē.
- Pēc iepakošanas atrodiet “LOCAL” zip repozitorija saknē (piem., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pirms atkārtotas iepakošanas testēšanai palieliniet versijas gan `sources/manifest_ATN.json`, gan `sources/manifest_LOCAL.json`.

---

## Atspējot, atinstalēt un atjauninājumi {#disable-uninstall-updates}

- Atspējot: Thunderbird → Rīki → Paplašinājumi un motīvi → atrodiet paplašinājumu → izslēdziet pārslēgu.
- Atinstalēt: tajā pašā skatā → trīs punktu izvēlne → Noņemt.
- Atjauninājumi: ATN instalācijas tiek atjauninātas automātiski, kad jaunās versijas ir apstiprinātas. LOCAL/dev instalācijas netiek atjauninātas automātiski; jaunu LOCAL būvējumu jāinstalē manuāli.
- Iestatījumu pilnīga noņemšana: skatiet [Privātums → Datu noņemšana](privacy#data-removal).

Skatiet arī

- [Ātrā sākšana](quickstart)
