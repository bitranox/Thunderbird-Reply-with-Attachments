---
id: features
title: 'Funkce'
sidebar_label: 'Funkce'
---

---

## Funkce {#features}

- Vložené obrázky jsou ponechány na Thunderbirdu: zůstávají v těle odpovědi a
  nekopírují se jako přílohy souborů. Obrázek, který nese pouze `Content-ID`, aniž
  by na něj bylo odkazováno, je považován za běžnou přílohu a zkopírován.

---

## Jak to funguje {#how-it-works}

- Při odpovědi doplněk vypíše původní přílohy.
- Z příloh odfiltruje podpisy S/MIME; vložené obrázky jsou obnoveny v těle (pokud není zakázáno).
- Volitelně požádá o potvrzení (přátelské pro ovládání z klávesnice).
- Přidá vhodné soubory do rozepsané zprávy a vyhne se duplicitám podle názvu souboru.
- Viz „Proč se přílohy nemusí přidat“ v části Použití pro okrajové případy.

Poznámka k soukromí: Veškeré zpracování probíhá lokálně v Thunderbirdu. Doplněk neprovádí žádné síťové požadavky na pozadí.

---
