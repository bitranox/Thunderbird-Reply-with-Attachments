---
id: install
title: 'Instalācija'
slug: /install
sidebar_label: 'Instalācija'
---

## Instalācija caur "Thunderbird paplašinājumiem un tēmām" {#installation-in-thunderbird-recommended}

:::important Minimālā Thunderbird versija
Šis paplašinājums atbalsta Thunderbird **128 ESR vai jaunāku**. Vecākas versijas netiek atbalstītas.
:::

Šī ir ieteicamā instalācijas metode. Paplašinājumi, kas instalēti no ATN (addons.thunderbird.net), saņem automātiskos atjauninājumus. LOCAL/dev instalācijas automātiski neatsvaidzina.

- Minimālā Thunderbird versija: 128 ESR vai jaunāka.

1. Thunderbird, dodieties uz **Rīki > Paplašinājumi un tēmas**.
2. Meklējiet "atbildēt ar pielikumiem".
3. Pievienojiet paplašinājumu.

Vai arī atveriet paplašinājuma lapu tieši: [Thunderbird Paplašinājumi (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuālā instalācija no XPI {#local-installation-in-thunderbird}

### Lejupielādējiet XPI failu {#download-the-xpi-file}

1. Dodieties uz [Thunderbird paplašinājuma lapu](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Lejupielādējiet jaunāko versiju no paplašinājuma kā XPI failu (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalējiet Thunderbird {#install-in-thunderbird-local}

1. Atveriet Thunderbird.
2. Dodieties uz **Rīki > Paplašinājumi un tēmas**.
3. **Paplašinājumu pārvaldniekā** noklikšķiniet uz zobrata ikonas augšējā labajā stūrī.
4. Izvēlieties **Instalēt paplašinājumu no faila…** no izvēlnes.
5. Atlasiet lejupielādēto `reply_with_attachments-x.y.z-tb.xpi` failu.
6. Apstipriniet instalāciju, kad tiks uzaicināts.

---

## Instalācija izstrādei {#installation-for-development}

### Lejupielādējiet repozitoriju {#download-the-repository}

1. Lejupielādējiet jaunāko GitHub repozitorija versiju.
2. Izpildiet `make help`, lai iegūtu vairāk informācijas.

### Instalējiet Thunderbird {#install-in-thunderbird-dev}

1. Atveriet Thunderbird.
2. Dodieties uz **Rīki > Paplašinājumi un tēmas**.
3. **Paplašinājumu pārvaldniekā** noklikšķiniet uz zobrata ikonas augšējā labajā stūrī.
4. Izvēlieties **Instalēt paplašinājumu no faila…** no izvēlnes.
5. Atlasiet ģenerēto failu `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Apstipriniet instalāciju, kad tiks uzaicināts.

Piezīme: Ja Thunderbird nepieņem `.zip` jūsu sistēmā, pārdēvējiet to par `.xpi` un mēģiniet vēlreiz “Instalēt paplašinājumu no faila…”.

### Kur atrast LOCAL ZIP {#where-local-zip}

- Vispirms iepakojiet paplašinājumu: izpildiet `make pack` repozitorija saknē.
- Pēc iepakošanas atrodiet “LOCAL” zip repozitorija saknē (piemēram, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pirms atkārtotas iepakošanas testēšanai, palieliniet versijas gan `sources/manifest_ATN.json`, gan `sources/manifest_LOCAL.json`.

---

## Atspējot, noņemt un atjaunināt {#disable-uninstall-updates}

- Atspējot: Thunderbird → Rīki → Paplašinājumi un tēmas → atrodiet paplašinājumu → atspējot.
- Noņemt: tādā pašā skatā → trīs punkti izvēlne → Noņemt.
- Atjauninājumi: ATN instalācijas automātiski tiek atjauninātas, kad jaunas versijas ir apstiprinātas. LOCAL/dev instalācijas automātiski neatsvaidzina; atkārtoti instalējiet jaunu LOCAL versiju manuāli.
- Noņemt iestatījumus pilnībā: skatīt [Privātums → Datu noņemšana](privacy#data-removal).

Skatīt arī

- [Ātrais sākums](quickstart)
