---
id: privacy
title: 'Privaatsus'
sidebar_label: 'Privaatsus'
---

## Privaatsus

:::note Ei telemetry; ei taustavõrgustikku
See lisand ei **kogu** analüütikat/telemeetriaid ja ei teosta **ühtki** taustavõrgustiku päringut. Iga võrgu juurde pääsemine toimub ainult siis, kui klikkite välisele lingile (Dokumendid, GitHub, Anna).
:::

Reply with Attachments ei kogu analüütikat ega telemeetriaid ega saada teie andmeid kuhugi.

Mida see lisand teeb:

- Loeb manusete metaandmeid ja faile originaalsõnumist kohapeal (Thunderbirdi API), et need teie vastusele lisada.
- Salvestab teie valikud (must nimekiri, kinnitamine, vaikimisi vastus) Thunderbirdi lokaalsetesse salvestustesse.

Mida see lisand ei tee:

- Ei jälgi, ei kogu analüütikat, ei raporteeri kokkuvarisemist ega tee kauglogimist.
- Ei teosta taustavõrgustiku päringuid, välja arvatud juhul, kui avate selgelt väliseid lingid (Dokumendid, GitHub, Anna).

Luba on dokumenteeritud [Lubade](permissions) lehelt.

---

## Sisu Turvapoliitika (CSP) {#content-security-policy-csp}

Valikud ja hüpikaknad väldivad inline skripte. Kõik JavaScript laaditakse failidest, mis on lisandiga kaasas, et vastata Thunderbirdi rangetele CSP nõuetele. Kui te embedite koodilõike dokumentidesse, on need ainult näited ja neid ei käivita lisand.

---

## Andmete salvestamine {#data-storage}

- Kasutaja eelistused (must nimekiri, kinnitamise lüliti, vaikimisi vastus) salvestatakse Thunderbirdi `storage.local` jaoks selle lisandi jaoks.
- Lisand ei teosta pilvesünkroonimist.

---

## Võrk {#network}

- Lisand ei teosta taustavõrgustiku tegevust.
- Iga võrgu juurde pääsemine toimub ainult siis, kui klikkite linkidele (Dokumendid, GitHub, Anna) või siis, kui Thunderbird ise teostab tavalisi operatsioone, mis ei ole seotud selle lisandiga.

---

## Andmete eemaldamine {#data-removal}

- Lisandi desinstallimine eemaldab selle koodi.
- Seaded hoitakse ainult Thunderbirdi `storage.local` ja need eemaldatakse desinstallimisel; ei kasutata väliseid salvestusi.
- Resetti seadeid, ilma desinstallimata:
  - Valikud leht: kasutage “Taasta vaikimisi” musta nimekirja ja musta nimekirja hoiatuse jaoks.
  - Täiendav: Thunderbirdis → Tööriistad → Arendustööriistad → Debug Add‑ons, avage laienduse salvestus ja kustutage võtmed, kui see on vajalik.

---
