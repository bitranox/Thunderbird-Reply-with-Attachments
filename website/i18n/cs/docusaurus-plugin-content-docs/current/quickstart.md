---
id: quickstart
title: 'Rychlý start'
sidebar_label: 'Rychlý start'
---

## Rychlý start

:::important Minimální verze Thunderbirdu
Tento doplněk podporuje Thunderbird **128 ESR nebo novější**. Starší verze nejsou podporovány.
:::

:::note Žádná telemetry; žádná síť na pozadí
Doplněk **nesbírá** analytiku/telemetrii a **neprovádí** žádné síťové požadavky na pozadí. Přístup k síti nastává pouze tehdy, když kliknete na externí odkazy (Dokumenty, GitHub, Darovat).
:::

---

### Instalace

1. Nainstalujte doplněk z doplňků Thunderbirdu.
2. Volitelné: Aktivujte potvrzení (Možnosti → “Zeptat se před přidáním příloh”).
3. Volitelné: Nechte varování blacklistu povolené (výchozí): “Varovat, pokud jsou přílohy vyloučeny blacklistem”.
4. Volitelné: Přidejte vzory blacklistu (jeden na řádek), např.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Poznámka: “# …” výše je komentář v této dokumentaci; nezapomeňte nezahrnovat komentáře do vzorů, které vložíte do Možností. Zadejte pouze jeden vzor na řádek.

Nyní odpovězte na zprávu s přílohami — originály budou přidány automaticky nebo po rychlém potvrzení. Pokud jsou nějaké soubory vyloučeny vaším blacklistem, zobrazí se krátké varování s jejich seznamem.

---

### Ověřit {#verify}

- Odpovězte na zprávu s 1–2 přílohami a potvrďte, že originály jsou přidány do vašeho okna pro psaní.
- Chcete-li upravit chování, podívejte se na [Konfiguraci](configuration) (přepínač potvrzení, výchozí odpověď, vzory blacklistu).

---

### Ověřit varování blacklistu {#verify-blacklist-warning}

- Odpovězte na zprávu obsahující soubor jako “secret.txt”.
- Při povoleném “Varovat, pokud jsou přílohy vyloučeny blacklistem” se zobrazí malé dialogové okno, které uvádí vyloučené soubory a odpovídající vzor.

Pokud nevidíte varování, ujistěte se, že vzor přesně odpovídá názvu souboru (pouze název souboru, bez ohledu na velikost písmen). Viz Konfigurace → Blacklist.

---

### Poznámka k klávesnici {#keyboard-note}

- Potvrzovací dialog podporuje Y/J pro Ano a N/Esc pro Ne. Na některých klávesnicích bez latinky se mohou klávesy lišit; Enter potvrzuje zaměřené tlačítko.

---
