---
id: usage
title: 'Kasutamine'
sidebar_label: 'Kasutamine'
---

---

## Kasutamine {#usage}

- Vastamisel lisab lisandmoodul algsed manused automaatselt — või küsib enne kinnitust, kui Options-is on see lubatud.
- Duplikaadid eemaldatakse failinime alusel; S/MIME osad jäetakse alati vahele. Sisepildid taastatakse vaikimisi vastuse kehas (saab keelata valikuga "Include inline pictures" menüüs Options).
- Mustas nimekirjas olevad manused jäetakse samuti vahele (tõstutundetud glob‑mustrid, mis vastenduvad failinimedele, mitte radadele). Vaata [Seadistus](configuration#blacklist-glob-patterns).

---

### Mis vastamisel juhtub {#what-happens}

- Tuvasta vastus → loetle algsed manused → filtreeri S/MIME + sisemised → valikuline kinnitus → lisa sobivad failid (jäta duplikaadid vahele) → taasta sisepildid kehas.

Range vs. leebem läbikäik: Lisandmoodul välistab esmalt S/MIME ja sisemised osad failimanuste hulgast. Kui miski ei kvalifitseeru, tehakse leebem läbikäik, mis jätab endiselt S/MIME/sisemised osad välja, kuid talub rohkem juhte (vt Koodi üksikasjad). Sisepilte ei lisata kunagi failimanustena; selle asemel, kui "Include inline pictures" on lubatud (vaikimisi), põimitakse need otse vastuse kehasse base64 andme‑URI-dena.

| Osa tüüp                                                    |                   Range läbikäik |                  Leebem läbikäik |
| ----------------------------------------------------------- | -------------------------------: | -------------------------------: |
| S/MIME allkirjafail `smime.p7s`                             |                       Välistatud |                       Välistatud |
| S/MIME MIME‑tüübid (`application/pkcs7-*`)                  |                       Välistatud |                       Välistatud |
| Sisemine pilt, millele viitab Content‑ID (`image/*`)        | Välistatud (taastatakse kehas\*) | Välistatud (taastatakse kehas\*) |
| Manusena lisatud e‑kiri (`message/rfc822`) koos failinimega |                        Ei lisata |                  Võidakse lisada |
| Tavaline failimanus koos failinimega                        |                  Võidakse lisada |                  Võidakse lisada |

\* Kui "Include inline pictures" on lubatud (vaikimisi: ON), põimitakse sisepildid vastuse kehasse base64 andme‑URI-dena, mitte ei lisata failimanustena. Vaata [Seadistus](configuration#include-inline-pictures).

Näide: Mõnel manusel võivad teatud päised puududa, kuid need on siiski tavalised failid (mitte sisemised/S/MIME). Kui range läbikäik ei leia ühtegi, võib leebem läbikäik need aktsepteerida ja manustada.

---

### Ristviited {#cross-reference}

- Edastamist ei muudeta disaini järgi (vt allpool piiranguid).
- Põhjuste kohta, miks manuseid ei pruugita lisada, vt „Miks manuseid ei pruugita lisada”.

---

## Käitumise üksikasjad {#behavior-details}

- **Duplikaatide vältimine:** Lisandmoodul märgib koostamisvahekaardi töödelduna vahekaardipõhise seansiväärtuse ja mälus hoitava valve abil. Originaale ei lisata kaks korda.
- Koostamisakna sulgemist ja taasavamist käsitletakse kui uut vahekaarti (st uus katse on lubatud).
- **Olemasolevate manuste arvestamine:** Kui koostamisel on juba manuseid, lisatakse originaalid siiski täpselt üks kord, jättes vahele juba olemasolevate failinimedega üksused.
- **Välistused:** S/MIME artefaktid ja sisepildid jäetakse failimanuste hulgast välja. Kui esimesel läbimisel ei kvalifitseeru midagi, kontrollib leebem varuvariant uuesti mitte‑S/MIME osi. Sisepilte käsitletakse eraldi: need taastatakse vastuse kehas andme‑URI-dena (kui on lubatud).
  - **Failinimed:** `smime.p7s`
  - **MIME‑tüübid:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Sisemised pildid:** iga `image/*` osa, millele viitab Content‑ID — jäetakse failimanustest välja, kuid põimitakse vastuse kehasse, kui "Include inline pictures" on ON
  - **Manusena lisatud e‑kirjad (`message/rfc822`):** käsitletakse tavaliste manustena, kui neil on failinimi; neid võidakse lisada (duplikaadikontrolli ja musta nimekirja tingimustel).
- **Must nimekiri — hoiatus (kui lubatud):** Kui kandidaadid välistatakse sinu musta nimekirja tõttu, kuvab lisandmoodul väikese modaalakna mõjutatud failide ja sobivate mustritega. See hoiatus kuvatakse ka juhtudel, kui manuseid ei lisata, kuna kõik välistati.

---

## Klaviatuuri otseteed {#keyboard-shortcuts}

- Kinnitusdialoog: Y/J = Jah, N/Esc = Ei; Tab/Shift+Tab ja nooleklahvid vahetavad fookust tsükliliselt.
  - „Default answer” [Seadistuses](configuration#confirmation) seab esialgu fookuses oleva nupu.
  - Enter käivitab fookuses oleva nupu. Tab/Shift+Tab ja nooled liigutavad fookust ligipääsetavuse tagamiseks.

### Klaviatuuri spikker {#keyboard-cheat-sheet}

| Klahvid         | Tegevus                           |
| --------------- | --------------------------------- |
| Y / J           | Kinnita Jah                       |
| N / Esc         | Kinnita Ei                        |
| Enter           | Aktiveeri fookuses olev nupp      |
| Tab / Shift+Tab | Liiguta fookust edasi/taha        |
| Nooleklahvid    | Liiguta fookust nuppude vahel     |
| Default answer  | Määrab algse fookuse (Jah või Ei) |

---

## Piirangud {#limitations}

- Edastamist see lisandmoodul ei muuda (toetatud on Vastamine ja Vasta kõigile).
- Väga suuri manuseid võivad piirata Thunderbirdi või teenusepakkuja limiidid.
  - Lisandmoodul ei tükelda ega paki faile; see tugineb Thunderbirdi tavapärasele manuste käsitlemisele.
- Krüpteeritud sõnumid: S/MIME osad jäetakse tahtlikult välja.

---

## Miks manuseid ei pruugita lisada {#why-attachments-might-not-be-added}

- Sisemisi pilte ei lisata failimanustena. Kui "Include inline pictures" on ON (vaikimisi), põimitakse need vastuse kehasse andme‑URI-dena. Kui säte on OFF, eemaldatakse sisepildid täielikult. Vaata [Seadistus](configuration#include-inline-pictures).
- S/MIME allkirjaosad jäetakse disaini järgi välja: failinimed nagu `smime.p7s` ja MIME‑tüübid nagu `application/pkcs7-signature` või `application/pkcs7-mime` jäetakse vahele.
- Musta nimekirja mustrid võivad kandidaate filtreerida: vt [Seadistus](configuration#blacklist-glob-patterns); sobitus on tõstutundetu ja ainult failinime põhine.
- Duplitseerunud failinimesid ei lisata uuesti: kui koostamisel on juba sama normaliseeritud nimega fail, jäetakse see vahele.
- Mittefailiosad või puuduvad failinimed: lisamiseks arvestatakse ainult faililaadseid osi kasutatavate failinimedega.

---

Vaata ka

- [Seadistus](configuration)
