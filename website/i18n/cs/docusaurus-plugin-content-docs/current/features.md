---
id: features
title: 'Funkce'
sidebar_label: 'Funkce'
---

---

## Funkce {#features}

- Při odpovědi automaticky připojí soubory z původního e‑mailu.
- Konfigurovatelné chování: přílohy mohou být
  - přidány automaticky, nebo
  - přidány až po potvrzení (malý, přístupný dialog). V Možnostech
    můžete povolení potvrzení zapnout a zvolit výchozí odpověď (Ano/Ne).
- Černá listina názvů souborů (masky/glob) brání automatickému přidání
  konkrétních souborů. Příklady: `*intern*`, `*secret*`, `*passwor*`.
  Porovnávání nerozlišuje velikost písmen a kontroluje pouze název souboru; v Možnostech
  uveďte jeden vzor na řádek.
- Upozornění na černou listinu (volitelné, ve výchozím stavu zapnuto): když jsou soubory
  vyloučeny vaší černou listinou, malé modální okno vypíše soubor a odpovídající vzor(y).
  Přátelské k tmavému režimu a přístupné z klávesnice (Enter/Esc pro zavření).
- Funguje s Odpovědět a Odpovědět všem. Přeposlat tento doplněk neupravuje.
- Přidá původní přílohy, i když jste už nějaké připojili sami; vyhne se duplicitám podle názvu souboru.
- Ochrana proti duplicitám na úrovni karty brání dvojímu přidání ve stejné kartě pro psaní zprávy.
- Ve výchozím nastavení vynechává certifikáty S/MIME, aby se předešlo zbytečným přílohám.
- Zahrnout vložené obrázky (výchozí: ZAPNUTO). Vložené obrázky jsou obnoveny přímo v těle
  odpovědi jako base64 data URI, čímž se zachová původní vložené rozvržení. V Možnostech lze
  vypnout, abyste vložené obrázky úplně přeskočili.

---

## Jak to funguje {#how-it-works}

- Při odpovědi doplněk vypíše původní přílohy.
- Z příloh odfiltruje podpisy S/MIME; vložené obrázky jsou obnoveny v těle (pokud není zakázáno).
- Volitelně požádá o potvrzení (přátelské pro ovládání z klávesnice).
- Přidá vhodné soubory do rozepsané zprávy a vyhne se duplicitám podle názvu souboru.
- Viz „Proč se přílohy nemusí přidat“ v části Použití pro okrajové případy.

Poznámka k soukromí: Veškeré zpracování probíhá lokálně v Thunderbirdu. Doplněk neprovádí žádné síťové požadavky na pozadí.

---
