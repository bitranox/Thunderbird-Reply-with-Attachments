---
id: configuration
title: Konfiguration
---

Hinweis zur Terminologie: Siehe das [Glossar](glossary) für konsistente Bezeichnungen in UI und Doku.

Einstellungen öffnen:

- Thunderbird → Extras → Add‑ons und Themes → „Antwort mit Anhängen“ → Einstellungen

Optionen:

- Bestätigung
  - „Vor dem Hinzufügen bestätigen“ umschalten
  - Standard‑Antwort: Ja/Nein (Fokus & Tastatur)
  - Tastatur: J/Y = Ja; N/Esc = Nein; Tab/Shift+Tab & Pfeiltasten bewegen den Fokus
- Blacklist (Glob‑Muster)
  - Ein Muster pro Zeile; Groß/Klein wird ignoriert; Abgleich nur gegen den Dateinamen
  - Beispiele: `*.png`, `smime.*`, `*.p7s`
  - Unterstützte Tokens: `*` (beliebig viele Zeichen außer `/`), `?` (ein Zeichen), Zeichenklassen wie `[abc]`. Für ein literales `[` bitte `\\[` verwenden. Pfadangaben (`**/`) werden ignoriert, da nur Dateinamen geprüft werden.
  - Nicht unterstützt: Negation (`!`), Brace‑Expansion (`{..}`) und komplexe Bereiche. Muster einfach halten.

Tipp: Standardwerte sind vorbelegt und können zurückgesetzt werden.

#### Warnung bei ausgeschlossenen Anhängen

- „Warnen, wenn Anhänge durch Blacklist ausgeschlossen werden“ (Standard: AN)
- Bei Aktivierung zeigt ein kleiner Hinweis die betroffenen Dateien und die passenden Muster. Die Warnung erscheint auch dann, wenn am Ende nichts angehängt wird, weil alle Kandidaten ausgeschlossen wurden.

#### Einstellungen speichern

- Klicke auf „Speichern“, um deine Änderungen zu übernehmen.
- Mit „Zurücksetzen“ stellst du die Standardwerte wieder her.

---

### Dateinamen‑Normalisierung (Duplikatschutz)

Zur konsistenten Erkennung von Duplikaten werden Dateinamen vor dem Vergleich normalisiert:

- Unicode nach NFC normalisiert.
- Kleinschreibung (Case‑Folding).
- Abschließende Punkte/Leerzeichen werden entfernt (Windows‑Kompatibilität).

Beispiele: `café.pdf` vs. `café.pdf` (NFD) oder `FILE.txt.` vs. `file.txt`.
