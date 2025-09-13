---
id: features
title: 'Funkcie'
sidebar_label: 'Funkcie'
---

## Features {#features}

- Automaticky pridáva súbory z originálneho e-mailu pri odpovedaní.
- Konfigurovateľné správanie: prílohy môžu byť
  - pridané automaticky, alebo
  - pridané iba po potvrdení (malý, prístupný dialóg). V Možnostiach môžete
    povoliť potvrdenie a vybrať predvolenú odpoveď (Áno/Nie).
- Zoznam zakázaných názvov súborov (globálne vzory) zabraňuje pripojeniu konkrétnych súborov
  automaticky. Príklady: `*intern*`, `*secret*`, `*passwor*`.
  Porovnávanie je bez ohľadu na veľkosť písmen a kontroluje iba názov súboru; zadajte jeden vzor
  na riadok v Možnostiach.
- Upozornenie na zakázané súbory (voliteľné, predvolene zapnuté): keď sú súbory vylúčené vaším
  zoznamom zakázaných, malý modálny okno zobrazuje súbor a zodpovedajúce vzory. Priateľské k tmavému režimu
  a prístupné klávesnicou (Enter/Esc na zatvorenie).
- Funguje s Odpovedať a Odpovedať všetkým. Preposlanie nie je touto doplnkom upravené.
- Pridáva originály aj keď ste už niečo pridali sami; vyhýba sa duplikátom podľa názvu súboru.
- Strážca duplikátov na kartu zabraňuje opakovanému pridávaniu v tej istej karte na písanie.
- Preskočí certifikáty S/MIME a inline obrázky, aby sa predišlo zbytočným prílohám.

## How It Works {#how-it-works}

- Pri odpovedi, doplnok zobrazuje originálne prílohy.
- Filtruje S/MIME podpisy a inline obrázky.
- Voliteľne pýta na potvrdenie (priatelské k klávesnici).
- Pridáva spôsobilé súbory do vášho kompozície, čím sa vyhýba duplikátom podľa názvu súboru.
- Pozrite sa na „Prečo prílohy nemusia byť pridané“ v Použití pre okrajové prípady.

Poznámka o ochrane súkromia: Všetko spracovanie prebieha lokálne v Thunderbirde. Doplnok nevykonáva žiadne sieťové požiadavky na pozadí.
