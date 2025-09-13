---
id: configuration
title: 'Beállítások'
---

## Configuration

Terminológiai megjegyzés: a [Szószedet](glossary) segítséget nyújt az UI-ban és a dokumentációban használt következetes kifejezésekhez.

---

## Open options in Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Eszközök → Kiegészítők és témák → keresse meg a „Válasz csatolmányokkal” lehetőséget → Beállítások

---

### Settings {#settings}

#### Confirmation {#confirmation}

- Kapcsolja be a „Kérdés a csatolmányok hozzáadása előtt” lehetőséget
- Alapértelmezett válasz: Igen vagy Nem (fókusz és billentyűzet alapértelmezett)
- Billentyűzet: Y/J = Igen; N/Esc = Nem; Tab/Shift+Tab és nyíl billentyűk váltják a fókuszt
  - A billentyűparancsok részleteit lásd a [Használat](usage#keyboard-shortcuts) szakaszban.

---

#### Blacklist (glob patterns) {#blacklist-glob-patterns}

A feketelistás fájlok automatikusan nem kerülnek hozzáadásra a válasz során. Lásd még a [Szószedet](glossary) a „Feketelista (kizáró lista)” értelmezéséhez.

- Egy minta soronként; kis- és nagybetű érzéketlen; csak a fájlnevek egyezése
- Példák: `*intern*`, `*secret*`, `*passwor*`
- Támogatott glob tokenek: `*` (minden karakter kivéve `/`), `?` (egy karakter), karakterosztályok mint `[abc]`. Használja a `\[`-t, hogy egy literális `[`-at egyezzen meg. Az útvonalak (`**/`) figyelmen kívül vannak hagyva, mivel csak a fájlneveket hasonlítják.
- Nem támogatott: tagadás (`!`), zárójelek kiterjesztése (`{..}`), és összetett tartományok. Tartsa a mintákat egyszerűnek.
- A mintákban a megjegyzések nem támogatottak. Ne tartalmazzon `#`-t vagy inline megjegyzéseket; csak a minta szövegét írja be soronként.

---

##### Pattern cookbook {#pattern-cookbook}

- Bármely PDF egyezése: `*.pdf`
- A „scan”-nel kezdődő fájlok egyezése: `scan*`
- Karakterosztály: `report[0-9].txt`
- Egy literális `[` escape-elése: `\[` (hasznos, amikor zárójelet egyeztetünk karakterként)

---

##### Notes {#blacklist-notes}

- A sorrend nem számít; az első/bármely egyezés kizárja a fájlt.
- Az egyezés csak a fájlnevekre vonatkozik (az útvonalak/mappák figyelmen kívül hagyva).
- A „Visszaállítás alapértelmezett értékekre” helyreállítja az ajánlott mintákat és a feketelista figyelmeztetés kapcsolót.
- Miért a példa `*passwor*`? Mert mind a „password”, mind a „Passwort” családokat egyezteti.
- Elsőbbség: ha bármely minta egyezik egy fájlnevével, a fájl kizárásra kerül (első/bármely egyezés — a sorrend nem változtatja meg az eredményt).
- Tipp — tesztelje a mintáját: adjon hozzá egy ideiglenes mintát, válaszoljon egy olyan üzenetre, amely tartalmaz egy fájlt, amelynek neve egyezik, és erősítse meg, hogy az ki van zárva a figyelmeztetési listából.

##### Quick try‑it (safe test) {#blacklist-try-it}

1. Nyissa meg a Beállításokat → Feketelista.
2. Adjon hozzá egy ideiglenes mintát, mint például `*.tmp`, és kattintson a Mentés gombra.
3. Válaszoljon egy tesztlevélre, amely tartalmaz egy `.tmp`-al végződő fájlt — a fájlnak meg kell jelennie a figyelmeztetési listában, és nem szabad csatolva lennie.
4. Távolítsa el az ideiglenes mintát, amikor elkészült, vagy kattintson a „Visszaállítás alapértelmezett értékekre” lehetőségre.

---

#### Warning on excluded attachments {#warning-on-excluded-attachments}

- Kapcsolja be a „Figyelmeztessen, ha a csatolmányok ki vannak zárva a feketelistáról” lehetőséget (alapértelmezés: BE).
- Ha engedélyezve van, egy kis ablakban felsorolja a kizárt fájlokat és az egyező mintát. A figyelmeztetés akkor is megjelenik, ha semmit nem fognak csatolni, mert minden jelölt feketelistán van.

---

#### Save your settings {#save-your-settings}

A beállításokat a Mentés gombra kattintva tárolja. Egyes mezőket manuálisan visszaállíthat, vagy alapértelmezett értékekre állíthatja őket szükség szerint.

Ha a tárolt beállítások nem tűnnek megfelelően alkalmazva, indítsa újra a Thunderbird-ot, és próbálja újra. (A Thunderbird tárolhat állapotot a munkamenetek között; az újraindítás biztosítja, hogy új beállítások kerüljenek betöltésre.)

Tipp: Annak érdekében, hogy megbizonyosodjon arról, hogy a beállítások érvénybe léptek, válaszoljon bármely üzenetre egy csatolmánnyal, és ellenőrizze a megerősítést vagy a feketelista figyelmeztetést.

---

#### Donation Visibility (90‑day snooze) {#donation-visibility}

A kiegészítő egy kényelmi funkciót tartalmaz, amely elrejti a támogatási kéréseket egy ideig, miután adományozott.

Hol találja

- Beállítások → Támogatás szakasz: egy „Adományoztam” gombot és egy kis tipp területet lát.
- A Küldés megerősítés párbeszédablakban is található egy Adomány gomb; automatikusan elrejti, amikor a szünet aktív.

Hogyan működik

- Az „Adományoztam” gombra kattintva elrejti az adomány gombokat és a kapcsolódó kéréseket 90 napra.
- Egy állapot tipp mutatja: „Rejtett YYYY‑MM‑DD-ig” (helyi idő szerint). Van egy „Aman adományozás megjelenítése” gomb is, amely azonnal helyreállítja a láthatóságot.
- 90 nap után az Adomány gomb automatikusan ismét láthatóvá válik.

Adatvédelem és tárolás

- A kiegészítő egy időbélyeget tárol a Thunderbird helyi tárolójában, hogy emlékezzen a szünet időszakára. Kulcs: `donateHideUntil` (epoch milliszekundum).
- Ez a beállítás helyi a Thunderbird profiljában (nem felhő-összeszinkronizált). E funkció által nem küldenek hálózati kéréseket.

Hibaelhárítás

- Ha az Adomány még mindig megjelenik az „Adományoztam” gombra kattintás után, várjon egy pillanatot, vagy nyissa meg újra a Beállítások oldalt; a felhasználói felület a beállítás mentése után frissül.
- A manuális visszaállításhoz kattintson az „Aman adományozás megjelenítése” gombra. Azt is megteheti, hogy megvárja, amíg a tipsz fizikai dátuma eltelik.

Ez a funkció csak egy kényelem; soha nem blokkolja a kiegészítő funkcióját, és nem gyűjt semmilyen személyes adatot.

---

### Filename normalization (duplicates prevention) {#filename-normalization-duplicates-prevention}

A platformok közötti következetes működés érdekében a fájlneveket normalizálják a duplikátumok ellenőrzése előtt:

- Az Unicode normálódik NFC-re.
- A nevek kicsinyítve vannak (kisbetűs).
- A végső pontokat/helyeket levágják (Windows-barát).

Ez megtartja a duplikátumok észlelését előrejelzhetően az olyan nevek esetében, mint `café.pdf` vs `café.pdf` (NFD) vagy `FILE.txt.` vs `file.txt`.

---

## Confirmation behavior {#confirmation-behavior}

- Az „Alapértelmezett válasz” beállítja a kezdetben fókuszált gombot a megerősítő párbeszédablakban (hasznos a billentyűzet használók számára).
- Mind a „Válasz”, mind a „Mindenki válasza” lehetőségekhez működik. A „Továbbítás” nem módosul e kiegészítő által.

---

## Advanced: duplicate detection {#advanced-duplicate-detection}

A duplikáció megelőzését az egyes megfogalmazás fülön és fájlnév szerint végezzük. Lásd a [Használat](usage#behavior-details) szakaszt egy részletes magyarázatért.

---

See also

- [Permissions](permissions)
- [Privacy](privacy)
