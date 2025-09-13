---
id: permissions
title: 'Dovoljenja'
---

## Dovoljenja

:::note Minimalna dovoljenja
Ta dodatek ne zahteva dovoljenj za gostitelje (splet). Dodatek ne zbira telemetrije ali ne izvaja omrežnih pozivov v ozadju. Glejte [Zasebnost](privacy).
:::

---

Dodatek zahteva majhen, usmerjen nabor dovoljenj. Zakaj je vsako od teh potrebno:

- `compose`: opazovanje dogodkov sestavljanja, seznam/dodajanje priponk v vašo odgovor.
- `messagesRead`: branje metapodatkov in prenos datotek priponk iz izvirnega sporočila.
- `scripting`: vstavitev majhnega potrditvenega dialoga med sestavljanjem, ko je omogočeno.
- `windows`: odprtje majhnega potrditvenega pojavnega okna kot zadnja možnost, ko sporočanje ne uspe.
- `sessions`: shranjevanje oznake na podlagi zavihek za preprečevanje dvojnega obdelovanja.
- `storage`: ohranjanje možnosti (črna lista, preklop potrditve, privzeti odgovor).
- `tabs`: usmerjeno sporočanje na zavihek za sestavljanje za zahteve po potrditvi.

Dodatne opombe:

- Ta dodatek ne zahteva dovoljenj gostitelja (spletnih izvorov).
- Dovoljenje `tabs` se uporablja samo za usmerjanje na zavihek za sestavljanje pri usklajevanju neobveznega potrditvenega dialoga; ne uporablja se za branje zgodovine ali navigacijo po straneh.

Ta so dokumentirana v izvoru in testirana v CI. Dodatek ne zbira telemetrije.

---

### Povzetek (dovoljenja → namen) {#permissions-summary}

| Dovoljenje              | Zakaj je potrebno                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `compose`               | Opazovanje dogodkov sestavljanja; seznam in dodajanje priponk v vašo odgovor.      |
| `messagesRead`          | Seznam priponk izvirnega sporočila in prenos datotek.                              |
| `scripting`             | Vstavljanje/usklajevanje lahke uporabniške vmesnike za potrditev, ko je omogočeno. |
| `windows`               | Pojavno okno za rezervno kopiranje, če sporočanje ne uspe (redko).                 |
| `sessions`              | Shranjevanje oznake na podlagi zavihka za preprečevanje dvojnega obdelovanja.      |
| `storage`               | Ohranitev možnosti (črna lista, preklop potrditve, privzeti odgovor).              |
| `tabs`                  | Usmerjeno sporočanje na zavihek za sestavljanje za zahteve po potrditvi.           |
| (dovoljenja gostitelja) | Nobeno — dodatek ne zahteva spletnih izvorov.                                      |

---

## Ni zahtevana {#not-requested}

- `compose.save`, `compose.send` — dodatek ne shranjuje ali pošilja pošte v vaše ime.

Glejte tudi: [Zasebnost](privacy) — brez telemetrije, brez omrežja v ozadju, samo povezave, ki jih sproži uporabnik.
