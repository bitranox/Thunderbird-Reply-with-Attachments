---
id: quickstart
title: 'Rychlý start'
sidebar_label: 'Rychlý start'
---

---

## Rychlý start

:::important Minimální verze Thunderbirdu
Tento doplněk podporuje Thunderbird **128 ESR nebo novější**. Starší verze nejsou podporovány.
:::

:::note Bez telemetrie; bez síťové komunikace na pozadí
Doplněk **neshromažďuje** analytická data/telemetrii a **neprovádí žádné** síťové požadavky na pozadí. Přístup k síti nastává pouze při kliknutí na externí odkazy (Dokumentace, GitHub, Darovat).
:::

---

### Instalace

1. Nainstalujte doplněk z webu Thunderbird Add‑ons.
2. Volitelné: Zapněte potvrzení (Možnosti → „Zeptat se před přidáním příloh“).
3. Volitelné: Nechte zapnuté varování černé listiny (výchozí): „Varovat, pokud jsou přílohy vyloučeny černou listinou“.
4. Volitelné: Přidejte vzory černé listiny (jeden na řádek), např.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Poznámka: „# …“ výše je komentář v této dokumentaci; do vzorů, které vkládáte do Možností, komentáře nevkládejte. Zadejte pouze jeden vzor na každý řádek.

Nyní odpovězte na zprávu s přílohami — původní přílohy budou přidány automaticky nebo po rychlém potvrzení. Pokud některé soubory vyloučí vaše černá listina, zobrazí se krátké varování s jejich seznamem.

---

### Ověření {#verify}

- Odpovězte na zprávu s 1–2 přílohami a ověřte, že se původní přílohy přidaly do okna pro psaní.
- Chcete-li upravit chování, viz [Konfigurace](configuration) (přepínač potvrzení, výchozí odpověď, vzory černé listiny).

---

### Ověření varování černé listiny {#verify-blacklist-warning}

- Odpovězte na zprávu obsahující soubor jako „secret.txt“.
- Se zapnutou volbou „Varovat, pokud jsou přílohy vyloučeny černou listinou“ se v malém dialogu zobrazí seznam vyloučených souborů a odpovídající vzor.

Pokud varování nevidíte, ujistěte se, že vzor přesně odpovídá názvu souboru (pouze název souboru, nerozlišuje se velikost písmen). Viz Konfigurace → Blacklist.

---

### Poznámka ke klávesnici {#keyboard-note}

- Dialog s potvrzením podporuje klávesy Y/J pro Ano a N/Esc pro Ne. Na některých nelatinkových klávesnicích se mohou písmena lišit; Enter potvrdí zaměřené tlačítko.

---
