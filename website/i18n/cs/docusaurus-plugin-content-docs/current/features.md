---
id: features
title: Funkce
sidebar_label: Funkce
---

## Funkce

- Při odpovědi automaticky připojí soubory z původního e‑mailu.
- Konfigurovatelné chování: přílohy mohou být
  - přidány automaticky, nebo
  - přidány až po potvrzení (malý, přístupný dialog). V Možnostech můžete zapnout potvrzení a zvolit výchozí odpověď (Ano/Ne).
- Seznam blokovaných názvů souborů (vzory glob) brání automatickému připojení určitých souborů. Příklady: `*intern*`, `*secret*`, `*passwor*`.
  Porovnávání nerozlišuje malá/velká písmena a kontroluje pouze název souboru; v Možnostech uveďte jeden vzor na řádek.
- Upozornění na blacklist (volitelné, ve výchozím stavu zapnuto): pokud jsou soubory vyloučeny vaším seznamem, malé modální okno vypíše soubor a odpovídající vzory. Přátelské k tmavému režimu a přístupné z klávesnice (Enter/Esc pro zavření).
- Přidá originály, i když jste již něco připojili; předchází duplicitám podle názvu souboru.
- Vynechá certifikáty SMIME a vložené obrázky, aby se zabránilo zbytečným přílohám.
