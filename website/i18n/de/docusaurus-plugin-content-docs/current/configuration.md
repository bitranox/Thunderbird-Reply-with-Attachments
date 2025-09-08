---
id: configuration
title: Konfiguration
---

# Konfiguration

Hinweis zur Terminologie: Siehe das [Glossar](glossary) für einheitliche Begriffe in UI und Dokumentation.

## Optionen in Thunderbird öffnen

- Thunderbird → Extras → Add‑ons und Themes → „Reply with Attachments“ finden → Einstellungen/Optionen

### Einstellungen:

#### Bestätigung

- Option „Vor dem Hinzufügen von Anhängen nachfragen“ ein-/ausschalten
- Standardantwort: Ja oder Nein (Fokus & Tastaturstandard)
- Tastatur: Y/J = Ja; N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus
  - Siehe Tastaturdetails in [Verwendung](usage#keyboard-shortcuts).

#### Blacklist (Glob‑Muster)

Dateien auf der Blacklist werden beim Antworten nicht automatisch hinzugefügt. Siehe auch das [Glossar](glossary) für „Blacklist (Ausschlussliste)“.

- Ein Muster pro Zeile; Groß-/Kleinschreibung wird ignoriert; es wird nur der Dateiname abgeglichen
- Beispiele: `*.png`, `smime.*`, `*.p7s`
- Unterstützte Glob‑Tokens: `*` (beliebige Zeichen außer `/`), `?` (ein Zeichen), Zeichenklassen wie `[abc]`. Verwenden Sie `\[`, um ein wörtliches `[` zu matchen. Pfade (`**/`) werden ignoriert, da nur Dateinamen abgeglichen werden.
- Nicht unterstützt: Negation (`!`), Klammererweiterung (`{..}`) und komplexe Bereiche. Halten Sie die Muster einfach.
- Warum das Beispiel `*passwor*`? Es erfasst sowohl die „password“- als auch die „Passwort“-Familien.
- Vorrang: Wenn ein beliebiges Muster auf einen Dateinamen passt, wird die Datei ausgeschlossen (erster/irgendein Treffer — die Reihenfolge ändert das Ergebnis nicht).
- Tipp — testen Sie Ihr Muster: Fügen Sie ein temporäres Muster hinzu, beantworten Sie eine Nachricht, die eine Datei mit passendem Namen enthält, und bestätigen Sie, dass sie in der Warnliste ausgeschlossen ist.

Tipp: Standardwerte sind beim ersten Öffnen vorausgefüllt und können jederzeit zurückgesetzt werden.

#### Warnung bei ausgeschlossenen Anhängen

- Option „Warnen, wenn Anhänge durch die Blacklist ausgeschlossen werden“ ein-/ausschalten (Standard: EIN).
- Wenn aktiviert, zeigt ein kleines Modal die ausgeschlossenen Dateien und die passenden Muster an. Die
  Warnung erscheint auch, wenn nichts angehängt wird, weil alle Kandidaten auf der Blacklist stehen.

#### Einstellungen speichern

Einstellungen werden automatisch gespeichert, sobald Schalter/Eingaben auf der Optionsseite geändert werden. Es gibt keine separate Speichern‑Schaltfläche. Sie können einzelne Felder manuell zurücknehmen oder die Standardwerte bei Bedarf zurücksetzen.

---

### Dateinamen‑Normalisierung (Vermeidung von Duplikaten)

Um sich plattformübergreifend konsistent zu verhalten, werden Dateinamen vor den Duplikatprüfungen normalisiert:

- Unicode wird auf NFC normalisiert.
- Groß-/Kleinschreibung wird vereinheitlicht (in Kleinbuchstaben umgewandelt).
- Abschließende Punkte/Leerzeichen werden entfernt (Windows‑Kompatibilität).

Dies hält die Duplikaterkennung vorhersagbar für Namen wie `café.pdf` vs `café.pdf` (NFD) oder `FILE.txt.` vs `file.txt`.

---

## Bestätigungsverhalten

- „Standardantwort“ legt die anfänglich fokussierte Schaltfläche im Bestätigungsdialog fest (hilfreich für Tastaturnutzer).
- Funktioniert sowohl für „Antworten“ als auch „Allen antworten“. „Weiterleiten“ wird von diesem Add‑on nicht verändert.

---

## Fortgeschritten: Duplikaterkennung

Die Duplikatvermeidung ist pro Verfassen‑Tab und nach Dateinamen implementiert. Siehe [Verwendung](usage#behavior-details) für eine ausführliche Erklärung.
