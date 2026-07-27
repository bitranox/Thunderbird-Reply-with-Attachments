---
id: features
title: 'Funkcie'
sidebar_label: 'Funkcie'
---

---

## Funkcie {#features}

- Vložené obrázky sa ponechávajú na Thunderbird: zostávajú v tele odpovede a nie sú
  kopírované ako súborové prílohy. Obrázok, ktorý nesie iba `Content-ID` bez toho, aby
  bol odkazovaný, sa považuje za bežnú prílohu a je skopírovaný.

---

## Ako to funguje {#how-it-works}

- Pri odpovedi doplnok vypíše pôvodné prílohy.
- Odfiltruje podpisy S/MIME zo súborových príloh; vložené obrázky sa obnovia v tele (pokiaľ nie sú zakázané).
- Voliteľne si vyžiada potvrdenie (priateľské ku klávesnici).
- Pridá vhodné súbory do okna písania správy, pričom sa vyhne duplicitám podľa názvu súboru.
- Pozrite si „Prečo sa prílohy nemusia pridať“ v časti Používanie pre okrajové prípady.

Poznámka k ochrane súkromia: Všetko spracovanie prebieha lokálne v Thunderbirde. Doplnok nevykonáva žiadne sieťové požiadavky na pozadí.

---
