---
id: usage
title: 'Kasutamine'
sidebar_label: 'Kasutamine'
---

---

## Kasutamine {#usage}

- Vastamisel lisab lisandmoodul algsed manused automaatselt — või küsib enne kinnitust, kui Options-is on see lubatud.
- Duplikaadid eemaldatakse failinime järgi; S/MIME osad jäetakse alati vahele. Algsesse sõnumisse manustatud pildid jäävad vastuse põhiosasse, kuhu Thunderbird need paigutab, ega kopeerita failidena.
- Mustas nimekirjas olevad manused jäetakse samuti vahele (tõstutundetud glob‑mustrid, mis vastenduvad failinimedele, mitte radadele). Vaata [Seadistus](configuration#blacklist-glob-patterns).

---

### Mis vastamisel juhtub {#what-happens}

- Tuvasta vastus → loetle algsed manused → jäta vahele S/MIME ja manustatud pildid → valikuline kinnitus → lisa sobivad failid (duplikaadid vahele jättes).

| Osa tüüp                                                | Kopeeritakse vastusesse |
|---------------------------------------------------------|------------------------:|
| S/MIME allkirjafail `smime.p7s`                         | Ei                      |
| S/MIME MIME-tüübid (`application/pkcs7-*`)              | Ei                      |
| Pilt, mille sõnumi põhiosa manustab `cid:` kaudu        | Ei (see on põhiosas)    |
| Pilt, mis on märgitud kui `Content-Disposition: inline` | Ei (see on põhiosas)    |
| Pilt `Content-ID`-ga, millele põhiosa kunagi ei viita   | Jah                     |
| Manustatud e-kiri (`message/rfc822`) failinimega        | Jah                     |
| Tavaline manustatud fail failinimega                    | Jah                     |

Pilti loetakse manustatuks ainult siis, kui algne sõnum tegelikult sellele viitab,
või kui saatja on selle sõnaselgelt märkinud kui `Content-Disposition: inline`. Pelgalt
`Content-ID` päisest ei piisa: paljud e-posti kliendid lisavad selle igale pildiosale,
sealhulgas tõelistele manustele, ja need tuleb sellegipoolest kopeerida.

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
|-----------------|-----------------------------------|
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

- Pilte, mida algne sõnum manustab, ei kopeerita failidena. Need on juba vastuse sisus, kuhu Thunderbird need pani. Vt [Konfiguratsioon](configuration#include-inline-pictures).
- S/MIME allkirjaosad jäetakse disaini järgi välja: failinimed nagu `smime.p7s` ja MIME‑tüübid nagu `application/pkcs7-signature` või `application/pkcs7-mime` jäetakse vahele.
- Musta nimekirja mustrid võivad kandidaate filtreerida: vt [Seadistus](configuration#blacklist-glob-patterns); sobitus on tõstutundetu ja ainult failinime põhine.
- Duplitseerunud failinimesid ei lisata uuesti: kui koostamisel on juba sama normaliseeritud nimega fail, jäetakse see vahele.
- Mittefailiosad või puuduvad failinimed: lisamiseks arvestatakse ainult faililaadseid osi kasutatavate failinimedega.

---

Vaata ka

- [Seadistus](configuration)
