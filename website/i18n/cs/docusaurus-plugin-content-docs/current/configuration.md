---
id: configuration
title: 'Konfigurace'
---

## Konfigurace

Terminologická poznámka: viz [Slovník](glossary) pro konzistentní termíny používané v uživatelském rozhraní a dokumentaci.

---

## Otevřít možnosti v Thunderbirdu {#open-options-in-thunderbird}

- Thunderbird → Nástroje → Dopňky a motivy → najít “Odpovědět s přílohami” → Předvolby/možnosti

---

### Nastavení {#settings}

#### Potvrzení {#confirmation}

- Přepnout “Ptát se před přidáním příloh”
- Výchozí odpověď: Ano nebo Ne (výchozí pro zaměření a klávesnici)
- Klávesnice: Y/J = Ano; N/Esc = Ne; Tab/Shift+Tab a šipkové klávesy cyklí zaměření
  - Viz podrobnosti o klávesnici v [Použití](usage#keyboard-shortcuts).

---

#### Černá listina (globální vzory) {#blacklist-glob-patterns}

Na černou listinu zařazené soubory nebudou automaticky přidány při odpovědi. Viz také [Slovník](glossary) pro “Černá listina (vylučovací seznam)”.

- Jeden vzor na řádek; bez ohledu na velikost písmen; shoda pouze názvu souboru
- Příklady: `*intern*`, `*secret*`, `*passwor*`
- Podporované globální tokeny: `*` (jakékoliv znaky kromě `/`), `?` (jeden znak), třídění znaků jako `[abc]`. Použijte `\[` pro shodu s doslovným `[`. Cesty (`**/`) jsou ignorovány, protože se shodují pouze názvy souborů.
- Nepodporuje se: negace (`!`), expanze složených závorek (`{..}`) a složité intervaly. Udržujte vzory jednoduché.
- Komentáře ve vzorech nejsou podporovány. Nezahrnujte `#` ani inline komentáře; zadejte pouze text vzoru na řádek.

---

##### Kuchařka vzorů {#pattern-cookbook}

- Shoda s jakýmikoliv PDF: `*.pdf`
- Shoda se soubory začínajícími na “scan”: `scan*`
- Třída znaků: `report[0-9].txt`
- Únik doslovného `[`: `\[` (užitečné při shodě s hranatým závorkou jako znakem)

---

##### Poznámky {#blacklist-notes}

- Pořadí není důležité; první/jakákoliv shoda vylučuje soubor.
- Shoda se provádí pouze nad názvem souboru (cesty/složky jsou ignorovány).
- “Obnovit do výroby” obnovuje doporučené vzory a přepínač varování černé listiny.
- Proč příklad `*passwor*`? Shoduje se s “password” a “Passwort” rodinami.
- Přednost: pokud jakýkoliv vzor odpovídá názvu souboru, soubor je vyloučen (první/jakákoliv shoda — pořadí nemění výsledek).
- Tip — otestujte svůj vzor: přidejte dočasný vzor, odpovězte na zprávu obsahující soubor se shodujícím názvem a potvrďte, že je vyloučen v seznamu upozornění.

##### Rychlý pokus (bezpečný test) {#blacklist-try-it}

1. Otevřít možnosti → Černá listina.
2. Přidat dočasný vzor jako `*.tmp` a kliknout na Uložit.
3. Odpovědět na testovací e-mail, který má soubor končící na `.tmp` — soubor by se měl objevit v seznamu varování a neměl by být připojen.
4. Po dokončení odstraňte dočasný vzor, nebo klikněte na “Obnovit do výroby”.

---

#### Varování na vyloučené přílohy {#warning-on-excluded-attachments}

- Přepnout “Varovat, pokud jsou přílohy vyloučeny černou listinou” (výchozí: ANO).
- Když je povoleno, malé okno zobrazuje vyloučené soubory a shodující se vzor(y). Varování se také objeví, když se nic nebude připojovat, protože všichni kandidáti byli zablokováni.

---

#### Uložení vašich nastavení {#save-your-settings}

Nastavení se uloží stisknutím tlačítka Uložit. Můžete ručně vrátit jednotlivá pole nebo podle potřeby obnovit výchozí hodnoty.

Pokud se uložená nastavení neaplikují správně, restartujte Thunderbird a zkuste to znovu. (Thunderbird může ukládat stav mezi relacemi; restart zajistí, že se načtou čerstvá nastavení.)

Tip: Chcete-li potvrdit, že vaše nastavení se projevila, odpovězte na jakoukoliv zprávu s přílohou a zkontrolujte potvrzení nebo varování černé listiny.

---

#### Viditelnost daru (90denní odklad) {#donation-visibility}

Doplněk obsahuje užitečnou funkci pro skrytí výzev na dary na určitou dobu po provedení daru.

Kde to najít

- Možnosti → Sekce podpory: uvidíte tlačítko “Daroval jsem” a malou nápovědní oblast.
- Dialog pro potvrzení odeslání také zobrazuje tlačítko Dar, které se automaticky skryje, když je odklad aktivní.

Jak to funguje

- Kliknutím na “Daroval jsem” skryjete tlačítka pro dary a související výzvy na 90 dní.
- Stavový tip ukazuje “Skryto do YYYY‑MM‑DD” (ve vašem místním datu). Existuje také tlačítko “Znovu zobrazit dar” pro okamžité obnovení viditelnosti.
- Po 90 dnech se tlačítko Dar automaticky znovu zviditelní.

Soukromí a úložiště

- Doplněk ukládá jediný časový údaj v místním úložišti Thunderbirdu, aby si zapamatoval období odkladu. Klíč: `donateHideUntil` (epoch milisekundy).
- Toto nastavení je místní pro váš profil Thunderbirdu (ne synchronizováno v cloudu). Tato funkce nevytváří žádné síťové požadavky.

Odstraňování problémů

- Pokud se tlačítko Dar zobrazuje ihned po kliknutí na “Daroval jsem”, počkejte chvíli nebo znovu otevřete stránku Možnosti; uživatelské rozhraní se aktualizuje hned, jakmile se nastavení uloží.
- Chcete-li resetovat ručně, klikněte na “Znovu zobrazit dar”. Můžete také počkat, dokud neprojde datum uvedené v nápovědě.

Tato funkce je čistě pro pohodlí; nikdy neblokuje funkčnost doplňku a neshromažďuje žádné osobní údaje.

---

### Normalizace názvů souborů (prevence duplikátů) {#filename-normalization-duplicates-prevention}

Aby se chovalo konzistentně napříč platformami, názvy souborů jsou normalizovány před kontrolou duplikátů:

- Unicode je normalizováno na NFC.
- Názvy jsou převedeny na malá písmena.
- Závěrečné tečky/prostory jsou ořezány (přátelské k Windows).

Toztr jí dokáže předvídat detekci duplikátů pro názvy jako `café.pdf` vs `café.pdf` (NFD) nebo `FILE.txt.` vs `file.txt`.

---

## Chování potvrzení {#confirmation-behavior}

- “Výchozí odpověď” nastaví výchozí tlačítko v potvrzovacím dialogu (užitečné pro uživatele klávesnice).
- Funguje pro “Odpovědět” i “Odpovědět všem”. “Přeposlat” není tímto doplňkem modificováno.

---

## Pokročilé: detekce duplikátů {#advanced-duplicate-detection}

Prevence duplikátů je implementována pro každou kartu pro psaní a podle názvu souboru. Viz [Použití](usage#behavior-details) pro podrobný popis.

---

Viz také

- [Oprávnění](permissions)
- [Soukromí](privacy)
