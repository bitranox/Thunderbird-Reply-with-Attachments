---
id: features
title: 'Funkcie'
sidebar_label: 'Funkcie'
---

---

## Funkcie {#features}

- Pri odpovedi automaticky pripojí súbory z pôvodného e‑mailu.
- Nastaviteľné správanie: prílohy môžu byť
  - pridané automaticky, alebo
  - pridané len po potvrdení (malé, prístupné dialógové okno). V Možnostiach
    môžete povoliť potvrdenie a zvoliť predvolenú odpoveď (Áno/Nie).
- Čierna listina názvov súborov (glob vzory) zabraňuje, aby sa
  konkrétne súbory pripájali automaticky. Príklady: `*intern*`, `*secret*`, `*passwor*`.
  Porovnávanie nerozlišuje veľkosť písmen a kontroluje iba názov súboru; uveďte jeden vzor
  na riadok v Možnostiach.
- Upozornenie na čiernu listinu (voliteľné, predvolene zapnuté): keď súbory vylúči vaša
  čierna listina, malé modálne okno vypíše súbor a zodpovedajúci(-e) vzor(y). Vhodné pre
  tmavý režim a prístupné z klávesnice (Enter/Esc na zatvorenie).
- Funguje s Odpovedať a Odpovedať všetkým. Funkcia Preposlať nie je týmto doplnkom upravená.
- Pridá pôvodné prílohy aj vtedy, ak ste už niečo pripojili; vyhýba sa duplicitám podľa názvu súboru.
- Ochrana proti duplicitám na úrovni karty zabraňuje dvojitému pridaniu v tej istej karte písania.
- Predvolene preskakuje certifikáty S/MIME, aby sa predišlo zbytočným prílohám.
- Zahrnúť vložené (inline) obrázky (predvolené: ZAPNUTÉ). Vložené obrázky sú obnovené priamo v
  tele odpovede ako data URI v kódovaní base64, pričom sa zachová pôvodné inline rozloženie. V
  Možnostiach to môžete vypnúť, aby sa vložené obrázky úplne vynechali.

---

## Ako to funguje {#how-it-works}

- Pri odpovedi doplnok vypíše pôvodné prílohy.
- Odfiltruje podpisy S/MIME zo súborových príloh; vložené obrázky sa obnovia v tele (pokiaľ nie sú zakázané).
- Voliteľne si vyžiada potvrdenie (priateľské ku klávesnici).
- Pridá vhodné súbory do okna písania správy, pričom sa vyhne duplicitám podľa názvu súboru.
- Pozrite si „Prečo sa prílohy nemusia pridať“ v časti Používanie pre okrajové prípady.

Poznámka k ochrane súkromia: Všetko spracovanie prebieha lokálne v Thunderbirde. Doplnok nevykonáva žiadne sieťové požiadavky na pozadí.

---
