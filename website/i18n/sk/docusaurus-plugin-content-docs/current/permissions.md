---
id: permissions
title: 'Oprávnenia'
---

## Oprávnenia

:::note Minimálne oprávnenia
Žiadne hostiteľské (webové) oprávnenia nie sú požadované týmto doplnkom. Doplnok nezbiera telemetry ani nevykonáva sieťové požiadavky na pozadí. Pozrite si [Ochranu súkromia](privacy).
:::

---

Doplnok požaduje len malú, cielenú sadu oprávnení. Prečo sú jednotlivé potrebné:

- `compose`: pozorovať udalosti písania, zoznam/Pridať prílohy vo vašej odpovedi.
- `messagesRead`: čítať metadáta a získavať súbory príloh z pôvodnej správy.
- `scripting`: injektovať malý potvrdenný dialóg pri písaní, keď je povolený.
- `windows`: otvoriť malú potvrdennú vyskakovaciu okno ako poslednú možnosť, keď zlyhá odosielanie správ.
- `sessions`: uchovávať príznak pre každú kartu na zabránenie duplicitnému spracovaniu.
- `storage`: uchovávať možnosti (čiernu listinu, prepínač potvrdenia, predvolenú odpoveď).
- `tabs`: cielené správy na kartu písania pre požiadavky na potvrdenie.

Ďalšie poznámky:

- Žiadne hostiteľské oprávnenia (webové pôvody) nie sú požadované týmto doplnkom.
- Oprávnenie `tabs` sa používa len na cielenie na kartu písania pri koordinácii voliteľného potvrdenného dialógu; nepoužíva sa na čítanie histórie ani navigáciu na stránkach.

Tieto sú zdokumentované v zdrojovom kóde a testované v CI. Doplnok nezbiera telemetry.

---

### Zhrnutie (oprávnenia → účel) {#permissions-summary}

| Oprávnenie             | Prečo je potrebné                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `compose`              | Pozorovať udalosti písania; zoznam a pridávať prílohy vo vašej odpovedi.           |
| `messagesRead`         | Zoznam príloh pôvodnej správy a získať údaje o súboroch.                           |
| `scripting`            | Injektovať/koordinovať ľahké užívateľské rozhranie na potvrdenie, keď je povolené. |
| `windows`              | Záložný vyskakovací okno, ak odosielanie správ zlyhá (zriedkavo).                  |
| `sessions`             | Uchovávať príznak pre každú kartu, aby sa zabránilo duplicitnému spracovaniu.      |
| `storage`              | Uchovávať možnosti (čiernu listinu, prepínač potvrdenia, predvolenú odpoveď).      |
| `tabs`                 | Cielené správy na kartu písania pre požiadavky na potvrdenie.                      |
| (hosťovské oprávnenia) | Žiadne — doplnok nepožaduje webové pôvody.                                         |

---

## Nepožaduje sa {#not-requested}

- `compose.save`, `compose.send` — doplnok neukladá ani neodosiela poštu vaším menom.

Pozrite sa tiež: [Ochrana súkromia](privacy) — žiadna telemetria, žiadne sieťové pozadie, len odkazy iniciované používateľom.

---
