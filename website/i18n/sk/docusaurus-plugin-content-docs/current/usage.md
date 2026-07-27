---
id: usage
title: 'Použitie'
sidebar_label: 'Použitie'
---

---

## Použitie {#usage}

- Pri odpovedi doplnok automaticky pridá pôvodné prílohy — alebo sa najprv opýta, ak je to povolené v Možnostiach.
- Duplicity sa odstraňujú podľa názvu súboru; časti S/MIME sa vždy vynechávajú. Obrázky vložené do pôvodnej správy zostávajú v tele odpovede, tam, kam ich umiestňuje Thunderbird, a nekopírujú sa ako súbory.
- Prílohy na čiernej listine sa tiež preskakujú (na veľkosť písmen necitlivé glob vzory zodpovedajú názvom súborov, nie cestám). Pozri [Konfigurácia](configuration#blacklist-glob-patterns).

---

### Čo sa stane pri odpovedi {#what-happens}

- Zisti odpoveď → vypíš pôvodné prílohy → preskoč S/MIME a vložené obrázky → voliteľné potvrdenie → pridaj vhodné súbory (preskočením duplicít).

| Typ časti                                              | Skopírované do odpovede |
|--------------------------------------------------------|------------------------:|
| Súbor podpisu S/MIME `smime.p7s`                       | Nie                     |
| Typy MIME S/MIME (`application/pkcs7-*`)               | Nie                     |
| Obrázok vložený telom správy cez `cid:`                | Nie (je v tele)         |
| Obrázok označený ako `Content-Disposition: inline`     | Nie (je v tele)         |
| Obrázok s `Content-ID`, na ktorý telo nikdy neodkazuje | Áno                     |
| Priložený e-mail (`message/rfc822`) s názvom súboru    | Áno                     |
| Bežná príloha súboru s názvom súboru                   | Áno                     |

Obrázok sa považuje za vložený iba vtedy, keď naň pôvodná správa skutočne odkazuje, alebo keď ho odosielateľ výslovne
označil ako `Content-Disposition: inline`. Samotná hlavička `Content-ID` nestačí: niektorí e-mailoví klienti ju umiestňujú
na každú obrázkovú časť, vrátane skutočných príloh, a tie sa musia aj tak skopírovať.

---

### Krížové odkazy {#cross-reference}

- Preposlanie sa zámerne nemení (pozri Obmedzenia nižšie).
- Pre dôvody, prečo príloha nemusí byť pridaná, pozri „Prečo prílohy nemusia byť pridané“.

---

## Podrobnosti správania {#behavior-details}

- **Prevencia duplikátov:** Doplnok označí kartu písania správy ako spracovanú pomocou hodnoty relácie na úrovni karty a ochranou v pamäti. Pôvodné prílohy nepridá dvakrát.
- Zatvorenie a opätovné otvorenie okna písania sa považuje za novú kartu (t. j. je povolený nový pokus).
- **Rešpektovanie existujúcich príloh:** Ak už okno písania obsahuje nejaké prílohy, pôvodné sa aj tak pridajú presne raz, pričom sa preskočia názvy súborov, ktoré už existujú.
- **Vylúčenia:** Artefakty S/MIME a vložené obrázky sú vylúčené zo súborových príloh. Ak pri prvom priechode nič nevyhovuje, uvoľnený režim opätovne skontroluje ne‑S/MIME časti. Vložené obrázky sa riešia samostatne: obnovia sa v tele odpovede ako data URI (ak je to povolené).
  - **Názvy súborov:** `smime.p7s`
  - **Typy MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Vložené obrázky:** akákoľvek časť `image/*` odkazovaná pomocou Content‑ID — vylúčené zo súborových príloh, ale vložené do tela odpovede, keď je „Include inline pictures“ ZAP
  - **Priložené e‑maily (`message/rfc822`):** považujú sa za bežné prílohy, ak majú názov súboru; môžu byť pridané (podlieha kontrole duplikátov a čiernej listine).
- **Upozornenie na čiernu listinu (ak je povolené):** Keď kandidátov vylúči vaša čierna listina, doplnok zobrazí malé modálne okno so zoznamom dotknutých súborov a zodpovedajúcich vzorov. Toto upozornenie sa zobrazí aj v prípadoch, keď sa nepridá žiadna príloha, pretože všetko bolo vylúčené.

---

## Klávesové skratky {#keyboard-shortcuts}

- Potvrdzovacie dialógové okno: Y/J = Áno, N/Esc = Nie; Tab/Shift+Tab a šípky cyklujú zameranie.
  - „Predvolená odpoveď“ v [Konfigurácii](configuration#confirmation) nastavuje pôvodne zamerané tlačidlo.
  - Enter aktivuje zamerané tlačidlo. Tab/Shift+Tab a šípky presúvajú zameranie pre prístupnosť.

### Tahák klávesnice {#keyboard-cheat-sheet}

| Klávesy            | Akcia                                        |
|--------------------|----------------------------------------------|
| Y / J              | Potvrdiť Áno                                 |
| N / Esc            | Potvrdiť Nie                                 |
| Enter              | Aktivovať zamerané tlačidlo                  |
| Tab / Shift+Tab    | Posunúť zameranie dopredu/späť               |
| Šípky              | Presúvať zameranie medzi tlačidlami          |
| Predvolená odpoveď | Nastaví počiatočné zameranie (Áno alebo Nie) |

---

## Obmedzenia {#limitations}

- Preposlanie sa týmto doplnkom nemení (podporované sú Odpovedať a Odpovedať všetkým).
- Veľmi veľké prílohy môžu podliehať obmedzeniam Thunderbirdu alebo poskytovateľa.
  - Doplnok nesegmentuje ani nekomprimuje súbory; spolieha sa na bežné spracovanie príloh v Thunderbirde.
- Šifrované správy: časti S/MIME sú zámerne vylúčené.

---

## Prečo prílohy nemusia byť pridané {#why-attachments-might-not-be-added}

- Obrázky, ktoré vkladá pôvodná správa, sa nekopírujú ako súbory. Už sú v tele odpovede, tam, kam ich umiestnil Thunderbird. Pozri [Configuration](configuration#include-inline-pictures).
- Časti podpisu S/MIME sú zámerne vylúčené: preskakujú sa názvy súborov ako `smime.p7s` a typy MIME ako `application/pkcs7-signature` alebo `application/pkcs7-mime`.
- Vzory čiernej listiny môžu filtrovať kandidátov: pozri [Konfigurácia](configuration#blacklist-glob-patterns); porovnávanie nerozlišuje veľkosť písmen a týka sa iba názvov súborov.
- Duplicitné názvy súborov sa znovu nepridávajú: ak už okno písania obsahuje súbor s rovnakým normalizovaným názvom, je preskočený.
- Ne‑súborové časti alebo chýbajúce názvy: na pridanie sa zvažujú len časti pripomínajúce súbory s použiteľnými názvami.

---

Pozri tiež

- [Konfigurácia](configuration)
