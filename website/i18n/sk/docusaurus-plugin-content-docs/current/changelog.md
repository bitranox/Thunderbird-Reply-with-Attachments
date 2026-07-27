---
id: changelog
title: 'Zoznam zmien'
---

---

## Zoznam zmien

Pre úplnú, podrobnú históriu si pozrite repozitár
[CHANGELOG.md na GitHube](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: obrázky sa už nevynechávajú len preto, že odosielateľ na ne umiestnil `Content-ID`; možnosť "Include inline pictures" bola odstránená, keďže Thunderbird sám zachováva vložené obrázky v tele odpovede; odkazy sa teraz otvárajú v systémovom prehliadači; limit 50 príloh / 100 MB na odpoveď, pričom všetko vynechané sa nahlási.
- 2.3.2: "Include inline pictures" vkladala obrázky do tela odpovede ako base64 dátové URI (znova odstránená po kontrole na add-ons.thunderbird.net; Thunderbird to robí sám); vylepšenia kvality kódu a rozšírené pokrytie testami.
- 2.3.1: Zachová prílohy po tom, čo Thunderbird nechá stránku udalostí na pozadí prejsť do nečinnosti; pridáva cielené ladiace háčiky na odstraňovanie problémov.
- 2.3.0: Spresnená deduplikácia príloh, rozšírené pokrytie testami a odstránené zastarané oprávnenia na splnenie zásad AMO.
- 2.1.0: Úplná podpora internacionalizácie pre 100 najpoužívanejších jazykov
- 2.0.0: prepísanie na plnohodnotnú verziu (EN/DE)
- 1.0.1: prechod na messages.listAttachments()
- 1.0.0: počiatočné vydanie

---

## Dátumy a kanály {#dates-and-channels}

- Vydania na ATN sa môžu oneskoriť o niekoľko hodín po zabalení.
- Zostavenia LOCAL sú určené len na testovanie pre vývojárov a nešíria sa cez ATN.

---
