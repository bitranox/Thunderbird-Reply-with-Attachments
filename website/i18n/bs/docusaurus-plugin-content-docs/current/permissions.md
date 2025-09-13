---
id: permissions
title: 'Dozvole'
---

## Dozvole

:::note Minimalne dozvole
Ovaj dodatak ne zahtijeva host (web) dozvole. Dodatak ne prikuplja telemetriju niti vrši pozadinske mrežne zahtjeve. Pogledajte [Privatnost](privacy).
:::

---

Dodatak zahtijeva mali, fokusirani set dozvola. Zašto je svaka potrebna:

- `compose`: posmatranje događaja sastavljanja, lista/dodavanje priloga u vašem odgovoru.
- `messagesRead`: čitanje metapodataka i preuzimanje datoteka priloga iz originalne poruke.
- `scripting`: injektovanje malog dijaloga za potvrdu tijekom sastavljanja kada je omogućeno.
- `windows`: otvaranje malog iskačućeg prozora kao posljednje sredstvo kada poruka ne uspije.
- `sessions`: pohranjivanje oznake po kartici kako bi se izbjeglo duplicirano procesiranje.
- `storage`: trajno pohranjivanje opcija (crna lista, prekidač za potvrdu, zadnji odgovor).
- `tabs`: ciljanje poruka na karticu za sastavljanje za zahtjeve za potvrdu.

Dodatne napomene:

- Ovaj dodatak ne zahtijeva dozvole za host (web izvore).
- Dozvola `tabs` se koristi samo za ciljanje kartice za sastavljanje kada se koordinira opcioni dijalog za potvrdu; ne koristi se za čitanje historije niti navigaciju stranicama.

Ove dozvole su dokumentovane u izvoru i testirane u CI. Dodatak ne prikuplja telemetriju.

---

### Sažetak (dozvole → svrha) {#permissions-summary}

| Dozvola           | Zašto je potrebna                                                                   |
| ----------------- | ----------------------------------------------------------------------------------- |
| `compose`         | Posmatranje događaja sastavljanja; lista i dodavanje priloga u vašem odgovoru.      |
| `messagesRead`    | Lista originalnih poruka i preuzimanje podataka datoteka.                           |
| `scripting`       | Injektovanje/koordinacija laganog korisničkog sučelja za potvrdu kada je omogućeno. |
| `windows`         | Iskačući prozor u slučaju da poruka ne uspije (rijetko).                            |
| `sessions`        | Pohranjivanje oznake po kartici kako bi se spriječilo duplicirano procesiranje.     |
| `storage`         | Trajno pohranjivanje opcija (crna lista, prekidač za potvrdu, zadnji odgovor).      |
| `tabs`            | Ciljano slanje poruka na karticu za sastavljanje za zahtjeve za potvrdu.            |
| (dozvole za host) | Nijedna — dodatak ne zahtijeva web izvore.                                          |

---

## Nije zatraženo {#not-requested}

- `compose.save`, `compose.send` — dodatak ne sprema niti šalje mail u vaše ime.

Pogledajte takođe: [Privatnost](privacy) — nema telemetrije, nema pozadinskih mreža, samo korisnički inicirani linkovi.

---
