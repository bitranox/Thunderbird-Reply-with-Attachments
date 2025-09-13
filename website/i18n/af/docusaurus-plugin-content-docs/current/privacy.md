---
id: privacy
title: 'Privaatheid'
sidebar_label: 'Privaatheid'
---

## Privacy

:::note Geen telemetrie; geen agtergrondnetwerk
Hierdie byvoeging versamel **nie** analise/telemetrie nie en maak **geen** agtergrondnetwerk versoeke nie. Enige netwerktoegang gebeur slegs wanneer jy op 'n eksterne skakel (Docs, GitHub, Doneer) klik.
:::

Reply with Attachments versamel nie analise of telemetrie nie en stuur jou data nêrens heen nie.

Wat die byvoeging doen:

- Lees aanhangsel metadata en lêers van die oorspronklike boodskap plaaslik (Thunderbird API) om dit aan jou antwoord te heg.
- Stoor jou opsies (swartlys, bevestiging, standaard antwoord) in Thunderbird se plaaslike stoor.

Wat die byvoeging nie doen nie:

- Geen opsporing, analise, bogwettige verslagdoening, of afgeleë logging nie.
- Geen agtergrondnetwerk versoeke nie, behalwe wanneer jy eksplisiet eksterne skakels (Docs, GitHub, Doneer) open.

Toestemmings is gedokumenteer op die [Toestemmings](permissions) bladsy.

---

## Content Security Policy (CSP) {#content-security-policy-csp}

Die opsies en pop-up bladsye vermy inline skripte. Alle JavaScript word gelaai vanaf lêers wat saam met die byvoeging verskaf word om aan strenge CSP in Thunderbird te voldoen. As jy kode-snippets in dokumentasie inkorporeer, is hulle slegs voorbeelde en word nie deur die byvoeging uitgevoer nie.

---

## Data opslag {#data-storage}

- Gebruikersvoorkeure (swartlys, bevestigingskakel, standaard antwoord) word in Thunderbird se `storage.local` vir hierdie byvoeging gestoor.
- Geen wolk sinkronisasie word deur die byvoeging uitgevoer nie.

---

## Netwerk {#network}

- Die byvoeging doen geen agtergrondnetwerkaktiwiteit nie.
- Enige netwerktoegang gebeur slegs wanneer jy op skakels (Docs, GitHub, Doneer) klik of wanneer Thunderbird self normale operasies uitvoer wat nie met hierdie byvoeging verband hou nie.

---

## Data verwydering {#data-removal}

- Die onttrekking van die byvoeging verwyder sy kode.
- Instellings word slegs in Thunderbird se `storage.local` gehou en word tydens ontkoppeling verwyder; geen eksterne stoor word gebruik nie.
- Herstel instellings sonder om te ontkoppel:
  - Opsies bladsy: gebruik “Herstel na standaarde” vir die swartlys en swartlys waarskuwing.
  - Gevorderd: in Thunderbird → Gereedskap → Ontwikkelaars Gereedskap → Foutopsporing Byvoegings, open die uitbreiding se stoor en verwyder sleutels indien nodig.

---
