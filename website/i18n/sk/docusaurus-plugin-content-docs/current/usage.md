---
id: usage
title: 'Použitie'
sidebar_label: 'Použitie'
---

---

## Použitie {#usage}

- Pri odpovedi doplnok automaticky pridá pôvodné prílohy — alebo sa najprv opýta, ak je to povolené v Možnostiach.
- Odstránenie duplikátov podľa názvu súboru; časti S/MIME sa vždy preskakujú. Vložené obrázky sa štandardne obnovia v tele odpovede (možno vypnúť cez „Include inline pictures“ v Možnostiach).
- Prílohy na čiernej listine sa tiež preskakujú (na veľkosť písmen necitlivé glob vzory zodpovedajú názvom súborov, nie cestám). Pozri [Konfigurácia](configuration#blacklist-glob-patterns).

---

### Čo sa stane pri odpovedi {#what-happens}

- Zistiť odpoveď → vypísať pôvodné prílohy → filtrovať S/MIME + inline → voliteľné potvrdenie → pridať vhodné súbory (preskočiť duplikáty) → obnoviť vložené obrázky v tele.

Prísny vs. uvoľnený priechod: Doplnok najprv vylúči časti S/MIME a inline z príloh súborov. Ak nič nespĺňa podmienky, spustí uvoľnený priechod, ktorý stále vylučuje S/MIME/inline, ale toleruje viac prípadov (pozri Podrobnosti kódu). Vložené obrázky sa nikdy nepridávajú ako súborové prílohy; namiesto toho, keď je zapnuté „Include inline pictures“ (predvolené), sú vložené priamo do tela odpovede ako base64 data URI.

| Typ časti                                             |              Prísny priechod |            Uvoľnený priechod |
| ----------------------------------------------------- | ---------------------------: | ---------------------------: |
| Súbor podpisu S/MIME `smime.p7s`                      |                     Vylúčené |                     Vylúčené |
| Typy MIME S/MIME (`application/pkcs7-*`)              |                     Vylúčené |                     Vylúčené |
| Vložený obrázok odkazovaný cez Content‑ID (`image/*`) | Vylúčené (obnovené v tele\*) | Vylúčené (obnovené v tele\*) |
| Priložený e‑mail (`message/rfc822`) s názvom súboru   |                    Nepridané |             Môže byť pridané |
| Bežná súborová príloha s názvom súboru                |             Môže byť pridané |             Môže byť pridané |

\* Keď je zapnuté „Include inline pictures“ (predvolené: ON), vložené obrázky sa vložia do tela odpovede ako base64 data URI namiesto pridania ako súborové prílohy. Pozri [Konfigurácia](configuration#include-inline-pictures).

Príklad: Niektorým prílohám môžu chýbať určité hlavičky, no stále ide o bežné súbory (nie inline/S/MIME). Ak prísny priechod nenájde žiadne, uvoľnený priechod ich môže akceptovať a pripojiť.

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
| ------------------ | -------------------------------------------- |
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

- Vložené obrázky sa nepridávajú ako súborové prílohy. Keď je „Include inline pictures“ ZAP (predvolené), vložia sa do tela odpovede ako data URI. Ak je nastavenie VYP, vložené obrázky sa úplne odstránia. Pozri [Konfigurácia](configuration#include-inline-pictures).
- Časti podpisu S/MIME sú zámerne vylúčené: preskakujú sa názvy súborov ako `smime.p7s` a typy MIME ako `application/pkcs7-signature` alebo `application/pkcs7-mime`.
- Vzory čiernej listiny môžu filtrovať kandidátov: pozri [Konfigurácia](configuration#blacklist-glob-patterns); porovnávanie nerozlišuje veľkosť písmen a týka sa iba názvov súborov.
- Duplicitné názvy súborov sa znovu nepridávajú: ak už okno písania obsahuje súbor s rovnakým normalizovaným názvom, je preskočený.
- Ne‑súborové časti alebo chýbajúce názvy: na pridanie sa zvažujú len časti pripomínajúce súbory s použiteľnými názvami.

---

Pozri tiež

- [Konfigurácia](configuration)
