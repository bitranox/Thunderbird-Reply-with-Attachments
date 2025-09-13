---
id: configuration
title: 'Konfigurácia'
---

## Konfigurácia

Terminologická poznámka: pozrite si [Slovník](glossary) pre konzistentné pojmy používané v užívateľskom rozhraní a dokumentácii.

---

## Otvorte možnosti v Thunderbirde {#open-options-in-thunderbird}

- Thunderbird → Nástroje → Doplnky a témy → nájdite „Odpovedať s prílohami“ → Predvoľby/možnosti

---

### Nastavenia {#settings}

#### Potvrdenie {#confirmation}

- Prepínač „Opýtať sa pred pridaním príloh“
- Predvolená odpoveď: Áno alebo Nie (predvoľby klávesnice)
- Klávesnica: Y/J = Áno; N/Esc = Nie; Tab/Shift+Tab a klávesy so šípkami cyklujú zameranie
  - Pozrite si podrobnosti o klávesnici v [Použití](usage#keyboard-shortcuts).

---

#### Blacklist (glob vzory) {#blacklist-glob-patterns}

Súbory na čiernej listine sa pri odpovedi automaticky nepridajú. Pozrite si aj [Slovník](glossary) pre „Čierna lista (zoznam vylúčených)“.

- Jeden vzor na riadok; bez ohľadu na veľkosť písmen; zodpovedanie iba názvu súboru
- Príklady: `*intern*`, `*secret*`, `*passwor*`
- Podporované glob tokeny: `*` (akékoľvek znaky okrem `/`), `?` (jeden znak), znaky tried ako `[abc]`. Použite `\[` na zodpovedanie doslovnému `[`. Cesty (`**/`) sú ignorované, pretože sa zodpovedá iba názvom súborov.
- Nepodporované: negácia (`!`), expanzia zloženia (`{..}`), a zložité intervaly. Držte vzory jednoduché.
- Komentáre nie sú v vzoroch podporované. Nezahŕňajte `#` alebo inline komentáre; zadajte iba text vzoru na riadku.

---

##### Kuchárka vzorov {#pattern-cookbook}

- Zodpovedať akémukoľvek PDF: `*.pdf`
- Zodpovedať súborom začínajúcim na „scan“: `scan*`
- Trieda znakov: `report[0-9].txt`
- Escapovať doslovný `[`: `\[` (užitočné pri zodpovedaní zátvorky ako znaku)

---

##### Poznámky {#blacklist-notes}

- Poradie nie je dôležité; prvé/ktorékoľvek zhodovanie vylučuje súbor.
- Zodpovedanie je iba pre názov súboru (cesty/zložky sú ignorované).
- „Obnoviť predvoľby“ obnoví odporúčané vzory a prepínač varovania čiernej listiny.
- Prečo je príklad `*passwor*`? Zhoduje sa s rodinami „password“ a „Passwort“.
- Prednosť: ak sa akýkoľvek vzor zhoduje s názvom súboru, súbor je vylúčený (prvé/ktorékoľvek zhodovanie — poradie nemení výsledok).
- Tip — otestujte svoj vzor: pridajte dočasný vzor, odpovedzte na správu obsahujúcu súbor s zhodujúcim názvom a potvrďte, že je vylúčený v zozname varovania.

##### Rýchly pokus (bezpečný test) {#blacklist-try-it}

1. Otvorte možnosti → Čierna listina.
2. Pridajte dočasný vzor ako `*.tmp` a kliknite na Uložiť.
3. Odpovedzte na testovaciu poštu, ktorá má súbor končiaci na `.tmp` — súbor by sa mal zobraziť v zozname varovania a nemal by byť priložený.
4. Odstráňte dočasný vzor po dokončení, alebo kliknite na „Obnoviť predvoľby“.

---

#### Varovanie o vylúčených prílohách {#warning-on-excluded-attachments}

- Prepínač „Upozorniť, ak sú prílohy vylúčené čiernou listinou“ (predvolene: ZAP).
- Po zapnutí sa v malom modálnom okne zobrazujú vylúčené súbory a zodpovedajúce vzory. Varovanie sa objaví aj vtedy, keď nie je nič priložené, pretože všetci kandidáti boli vylúčení.

---

#### Uložte svoje nastavenia {#save-your-settings}

Nastavenia sa ukladajú stlačením tlačidla Uložiť. Môžete ručne vrátiť jednotlivé polia alebo resetovať predvolené hodnoty podľa potreby.

Ak sa uložené nastavenia zdajú nekorektne aplikované, reštartujte Thunderbird a skúste to znova. (Thunderbird môže uložiť stav medzi reláciami; reštart zabezpečí načítanie čerstvých nastavení.)

Tip: Ak chcete potvrdiť, že vaše nastavenia mali účinok, odpovedzte na akúkoľvek správu s prílohou a skontrolujte potvrdenie alebo varovanie čiernej listiny.

---

#### Viditeľnosť darovania (90-dňový spánok) {#donation-visibility}

Doplnok obsahuje funkciu pohodlia na skrytie výziev na darovanie na chvíľu po tom, čo ste darovali.

Kde to nájsť

- Možnosti → Sekcia podpory: uvidíte tlačidlo „Daroval(a) som“ a malú informačnú oblasť.
- Dialógové okno na potvrdenie odoslania tiež zobrazuje tlačidlo Darovať; automaticky sa skrýva, keď je spánok aktívny.

Ako to funguje

- Kliknutím na tlačidlo „Daroval(a) som“ skryjete tlačidlá na darovanie a súvisiace výzvy na 90 dní.
- Stavová poznámka zobrazuje „Skryté do YYYY-MM-DD“ (vo vašom miestnom dátume). Je tu aj tlačidlo „Zobraziť darovať znova“ na okamžitú obnovu viditeľnosti.
- Po 90 dňoch sa tlačidlo Darovať automaticky opäť zobrazuje.

Súkromie a úložisko

- Doplnok ukladá jediný časový údaj v lokálnom úložisku Thunderbirdu, aby si zapamätal periodu spánku. Kľúč: `donateHideUntil` (epoch milisekundy).
- Toto nastavenie je lokálne pre váš profil Thunderbirdu (nie je synchronizované v cloude). Táto funkcia nerobí žiadne sieťové požiadavky.

Riešenie problémov

- Ak sa tlačidlo Darovať stále zobrazuje hneď po kliknutí na „Daroval(a) som“, chvíľu počkajte alebo znovu otvorte stránku Možnosti; používateľské rozhranie sa aktualizuje hneď, ako sa nastavenie uloží.
- Ak chcete resetovať manuálne, kliknite na „Zobraziť darovať znova“. Môžete tiež počkať, kým sa uplynie dátum uvedený v informáciách.

Táto funkcia je čisto pre pohodlie; nikdy neblokuje funkciu doplnku a nezbiera žiadne osobné údaje.

---

### Normalizácia názvu súboru (prevencia duplicít) {#filename-normalization-duplicates-prevention}

Aby sa správal konzistentne na rôznych platformách, názvy súborov sa normalizujú pred kontrolami duplicít:

- Unicode sa normalizuje na NFC.
- Názvy sú prisposobené (používajú malé písmená).
- Koncové bodky/medzery sú orezané (prívetivosť pre Windows).

To udržuje detekciu duplicitných názvov predvídateľnou pre názvy ako `café.pdf` vs `café.pdf` (NFD) alebo `FILE.txt.` vs `file.txt`.

---

## Správanie potvrdenia {#confirmation-behavior}

- „Predvolená odpoveď“ nastavuje počiatočne zamerané tlačidlo v okne potvrdenia (užitočné pre užívateľov klávesnice).
- Funguje pre „Odpovedať“ aj „Odpovedať všetkým“. „Preposlať“ nie je týmto doplnkom upravené.

---

## Pokročilé: detekcia duplicít {#advanced-duplicate-detection}

Prevention duplicít je implementované pre každú záložku kompozície a podľa názvu súboru. Pozrite si [Použitie](usage#behavior-details) pre podrobné vysvetlenie.

---

Pozrite sa aj na

- [Oprávnenia](permissions)
- [Súkromie](privacy)
