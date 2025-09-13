---
id: support
title: 'Támogatás'
sidebar_label: 'Támogatás'
---

## FAQ {#faq}

### Csatolmányok nem kerültek hozzáadásra — miért?

- Az inline képek és S/MIME részek szándékosan kizárásra kerülnek.
- A duplikált fájlnevek kihagyásra kerülnek, ha a levél már tartalmazza ugyanazt a fájlt.
- A feketelistás minták szűrhetik a jelölteket; lásd a [Konfigurációt](configuration#blacklist-glob-patterns).

### Megerősíthetem, mielőtt csatolmányokat adok hozzá?

Igen. Engedélyezze az „Kérdezzen mielőtt csatolmányokat ad hozzá” lehetőséget a [Konfiguráció → Megerősítés](configuration#confirmation) alatt. Billentyűzet: Y/J = Igen, N/Esc = Nem.

### Küld az add-on adatokat vagy követi a használatot?

Nem. Lásd a [Adatvédelem](privacy) — nincs telemetria és nincsenek háttérhálózati kérések.

### A továbbítás nem ad hozzá csatolmányokat — ez várható?

Igen. Csak a Válasz és a Válasz mindenkinek funkciókat módosítja ez az add-on; a Továbbítás változatlan marad. Lásd a [Korlátozásokat](usage#limitations).

### Hol találom a Donate szundítót?

Beállítások → Támogatás szakasz. Lásd a [Adomány láthatóságát](configuration#donation-visibility).

---

## Támogatás

Szüksége van segítségre vagy hibát szeretne jelenteni?

---

### Jelentsen egy hibát a GitHub-on:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Kérdések: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Tartalmazza a Thunderbird verzióját (pl. 128 ESR), az operációs rendszert és a reprodukálás lépéseit
- Csatolja a Thunderbird Hibakonzolból származó releváns naplókat (Eszközök → Fejlesztői eszközök → Hibakonzol)

- Add-ons oldal (ATN): Visszajelzést a [kiegészítő oldalán](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) is hagyhat.

---

### Tippek

- Győződjön meg róla, hogy egy támogatott Thunderbird verzión van (128 ESR vagy újabb).
- Ellenőrizze a Konfigurációs és Használati dokumentumokat a gyakori beállítási kérdésekhez.
- Fejlesztés/tesztelés esetén lásd a Fejlesztési útmutatót.
- Ha a tárolt beállítások nem tűnnek működőképesnek, indítsa újra a Thunderbirdot és próbálja újra. (A Thunderbird esetleg cache-eli az állapotot különböző munkamenetek között; egy újraindítás biztosítja, hogy az új beállítások legyenek betöltve.)
- Minimális reprodukció: próbáljon ki egy kis teszt e-mailt, amely tartalmaz egy vagy két egyszerű fájl csatolmányt.
- Hasonlítsa össze a viselkedést megerősítés BE és KI állapotban, hogy szűkítse, hogy a párbeszédablak folyamata részt vesz-e.

---

### Mit kell megadni egy jelentésben

- Thunderbird verzió és operációs rendszer
- Pontos lépések a reprodukáláshoz (mit tett, mit várt, mi történt)
- Megerősítés engedélyezve volt? Alapértelmezett válasz beállítás:
- Feketelistás minták mintája (ha releváns)
- Hibakonzol naplók a reprodukálás alatt (Eszközök → Fejlesztői eszközök → Hibakonzol)
- Engedélyezze a hibakeresési naplózást (opcionális):
  - Futtassa a Thunderbird Hibakonzoljában: `messenger.storage.local.set({ debug: true })`
  - Reprodukáld a problémát, és másold ki a releváns `[RWA]` napló sorokat

---

### Probléma sablon (másold/beilleszd) {#issue-template}

- Thunderbird verzió és operációs rendszer:
- Lépések a reprodukáláshoz:
- Megerősítés engedélyezve? Alapértelmezett válasz:
- Feketelistás minták mintája:
- Hibakonzol naplók (Eszközök → Fejlesztői eszközök → Hibakonzol):
- Minden egyéb releváns információ:

---

### Adományozás

Ha támogatni szeretné ezt a projektet, kérjük, fontolja meg, hogy egy kis hozzájárulást ajánl fel a [Donálás](donation) oldalon. Köszönöm!
