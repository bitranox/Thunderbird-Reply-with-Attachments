---
id: permissions
title: 'Dozvole'
---

## Dozvole

:::note Minimalne dozvole
Nema zahtjeva za dozvole hosta (web). Ovaj dodatak ne prikuplja telemetriju niti izvodi pozadinske mrežne zahtjeve. Pogledajte [Privatnost](privacy).
:::

---

Dodatak zahtijeva mali, usmjeren skup dozvola. Zašto je svaka potrebna:

- `compose`: promatranje događaja sastavljanja, popis/dodavanje privitaka u vaš odgovor.
- `messagesRead`: čitanje metapodataka i preuzimanje datoteka privitaka iz originalne poruke.
- `scripting`: umetanje malog dijaloga za potvrdu tijekom sastavljanja kad je mogućnost omogućena.
- `windows`: otvaranje malog prozora za potvrdu kao posljednja opcija kad slanje poruka ne uspije.
- `sessions`: pohranjivanje oznake po karticama kako bi se izbjeglo duplicirano procesiranje.
- `storage`: trajno pohranjivanje opcija (crna lista, aktivacija potvrde, zadnji odgovor).
- `tabs`: usmjeravanje poruka na karticu sastavljanja za zahtjeve potvrde.

Dodatne napomene:

- Ovaj dodatak ne zahtijeva dozvole hosta (web adrese).
- Dozvola `tabs` koristi se samo za usmjeravanje na karticu sastavljanja prilikom koordinacije opcionalnog dijaloga za potvrdu; ne koristi se za čitanje povijesti ili navigaciju stranicama.

Sve je to dokumentirano u izvoru i testirano u CI-u. Dodatak ne prikuplja telemetriju.

---

### Sažetak (dozvole → svrha) {#permissions-summary}

| Dozvola         | Zašto je potrebna                                                                   |
| --------------- | ----------------------------------------------------------------------------------- |
| `compose`       | Promatranje događaja sastavljanja; popisivanje i dodavanje privitaka u vaš odgovor. |
| `messagesRead`  | Popisivanje privitaka iz originalne poruke i preuzimanje podataka o datoteci.       |
| `scripting`     | Umetanje/koordiranje laganog UI-a za potvrdu kada je omogućeno.                     |
| `windows`       | Rezerva prozora ako slanje poruka ne uspije (rijetko).                              |
| `sessions`      | Pohranjivanje oznake po karticama kako bi se spriječilo duplicirano procesiranje.   |
| `storage`       | Trajno pohranjivanje opcija (crna lista, aktivacija potvrde, zadnji odgovor).       |
| `tabs`          | Usmjeravanje poruka na karticu sastavljanja za zahtjeve potvrde.                    |
| (dozvole hosta) | Nema — dodatak ne zahtijeva web adrese.                                             |

---

## Nema zahtjeva {#not-requested}

- `compose.save`, `compose.send` — dodatak ne sprema niti šalje e-mail u vaše ime.

Pogledajte također: [Privatnost](privacy) — bez telemetrije, bez pozadinskih mreža, samo korisnički pokrenute veze.

---
