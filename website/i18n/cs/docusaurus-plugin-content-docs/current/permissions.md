---
id: permissions
title: 'Oprávnění'
---

## Oprávnění

:::note Minimální oprávnění
Tento doplněk nevyžaduje žádná oprávnění hostitele (web). Doplněk nesbírá telemetrii ani neprovádí síťové požadavky na pozadí. Viz [Ochrana osobních údajů](privacy).
:::

---

Doplněk žádá pouze o malou, zaměřenou sadu oprávnění. Proč je každé potřebné:

- `compose`: pozorovat události při sestavování, seznam/přidat přílohy do vaší odpovědi.
- `messagesRead`: číst metadata a stahovat soubory příloh z původní zprávy.
- `scripting`: vložit malý dialog potvrzení při sestavování, když je povolen.
- `windows`: otevřít malou potvrzovací vyskakovací nabídku jako poslední možnost, když zpráva selže.
- `sessions`: uložit příznak pro každou kartu, aby se zabránilo duplikovanému zpracování.
- `storage`: uchovávat možnosti (blacklist, přepínač potvrzení, výchozí odpověď).
- `tabs`: cílené zprávy na kartu pro potvrzení žádostí.

Další poznámky:

- Tento doplněk nevyžaduje žádná oprávnění hostitele (webové zdroje).
- Oprávnění `tabs` se používá pouze k cílení na kartu sestavení při koordinaci volitelného dialogu potvrzení; nepoužívá se k čtení historie nebo navigaci mezi stránkami.

Tyto informace jsou zdokumentovány ve zdroji a testovány v CI. Doplněk nesbírá telemetrii.

---

### Shrnutí (permissions → purpose) {#permissions-summary}

| Oprávnění      | Proč je potřeba                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| `compose`      | Pozorovat události při sestavování; seznam a přidat přílohy do vaší odpovědi.  |
| `messagesRead` | Seznam příloh původní zprávy a stahovat data souboru.                          |
| `scripting`    | Vložit/koordinovat lehké uživatelské rozhraní pro potvrzení, když je povoleno. |
| `windows`      | Rezervní vyskakovací nabídka, pokud zpráva selže (vzácně).                     |
| `sessions`     | Uložit příznak pro každou kartu, aby se zabránilo duplikovanému zpracování.    |
| `storage`      | Uchovávat možnosti (blacklist, přepínač potvrzení, výchozí odpověď).           |
| `tabs`         | Cílené zprávy na kartu pro žádosti o potvrzení.                                |
| (host perms)   | Žádné — doplněk nevyžaduje webové zdroje.                                      |

---

## Nevyžadováno {#not-requested}

- `compose.save`, `compose.send` — doplněk neukládá ani neposílá poštu vaším jménem.

Viz také: [Ochrana osobních údajů](privacy) — žádná telemetrie, žádné síťové požadavky na pozadí, pouze odkazy iniciované uživateli.

---
