---
id: features
title: 'Funktsioonid'
sidebar_label: 'Funktsioonid'
---

---

## Funktsioonid {#features}

- Lisab vastamisel automaatselt algse e-kirja manused.
- Seadistatav käitumine: manused saab
  - lisada automaatselt või
  - lisada alles kinnituse järel (väike, ligipääsetav dialoog). Valikutes
    saab kinnituse lubada ja valida vaikimisi vastuse (Jah/Ei).
- Failinimede must nimekiri (glob-mustrid) takistab teatud failide
  automaatset lisamist. Näited: `*intern*`, `*secret*`, `*passwor*`.
  Vastendamine on tõstutundetu ja kontrollib ainult failinime; esita Valikutes
  üks muster rea kohta.
- Musta nimekirja hoiatus (valikuline, vaikimisi lubatud): kui failid jäetakse sinu
  musta nimekirja tõttu välja, loetleb väike modaalaken faili ja sobiva(d) mustri(d).
  Sobib tumerežiimiga ja on klaviatuuriga ligipääsetav (sulgemiseks Enter/Esc).
- Töötab käskudega Vasta ja Vasta kõigile. Edastamist see lisandmoodul ei muuda.
- Lisab algsed manused ka siis, kui oled juba midagi ise lisanud; väldib duplikaate failinime järgi.
- Vahekaardi‑põhine duplikaadikaitse hoiab ära topeltlisamise samas koostamisvahekaardis.
- Välistab vaikimisi S/MIME‑sertifikaadid, et vältida tarbetuid manuseid.
- Kaasab reasisesed pildid (vaikimisi: sees). Manustatud pildid taastatakse otse
  vastuse kehasse base64 andme‑URIdena, säilitades algse reasisese paigutuse. Keela
  Valikutes, et jätta reasisesed pildid täielikult vahele.

---

## Kuidas see töötab {#how-it-works}

- Vastamisel loetleb lisandmoodul algsed manused.
- Filtreerib failimanustest välja S/MIME‑allkirjad; reasisesed pildid taastatakse kehas (kui pole keelatud).
- Soovi korral küsib kinnitust (klaviatuurisõbralik).
- Lisab sobivad failid sinu koostatavasse kirja, vältides duplikaate failinime alusel.
- Vaata jaotises Kasutamine teemat „Miks manuseid ei pruugita lisada”, et näha erijuhte.

Privaatsusmärkus: kogu töötlemine toimub Thunderbirdis lokaalselt. Lisandmoodul ei tee taustal võrgupäringuid.

---
