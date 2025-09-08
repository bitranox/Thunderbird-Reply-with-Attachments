---
id: configuration
title: Konfiguration
---

# Konfiguration

Hinweis zur Terminologie: Siehe das [Glossar](glossary) für konsistente Begriffe in UI und Doku.

## Optionen in Thunderbird öffnen

- Thunderbird → Extras → Add‑ons und Themes → „Reply with Attachments“ finden → Einstellungen/Optionen

### Einstellungen:

#### Bestätigung

- Umschalten „Vor dem Hinzufügen von Anhängen fragen“
- Standardantwort: Ja oder Nein (Fokus- & Tastaturstandard)
- Tastatur: Y/J = Ja; N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus
  - Siehe Tastaturdetails unter [Verwendung](usage#keyboard-shortcuts).

#### Blacklist (Glob-Muster)

Dateien auf der Blacklist werden beim Antworten nicht automatisch hinzugefügt. Siehe auch das [Glossar](glossary) zu „Blacklist (Ausschlussliste)“.

- Ein Muster pro Zeile; Groß-/Kleinschreibung wird ignoriert; Abgleich nur auf Dateinamen
- Beispiele: `*intern*`, `*secret*`, `*passwor*`
- Unterstützte Glob-Token: `*` (beliebige Zeichen außer `/`), `?` (ein Zeichen), Zeichenklassen wie `[abc]`. Verwenden Sie `\[`, um ein literales `[` zu treffen. Pfade (`**/`) werden ignoriert, da nur Dateinamen abgeglichen werden.
- Nicht unterstützt: Negation (`!`), Klammererweiterung (`{..}`) und komplexe Bereiche. Halten Sie die Muster einfach.
- Warum das Beispiel `*passwor*`? Es entspricht sowohl den „password“- als auch den „Passwort“-Familien.
- Vorrang: Wenn irgendein Muster auf einen Dateinamen passt, wird die Datei ausgeschlossen (erster/irgendein Treffer — die Reihenfolge ändert das Ergebnis nicht).
- Tipp — testen Sie Ihr Muster: Fügen Sie ein temporäres Muster hinzu, antworten Sie auf eine Nachricht mit einer Datei mit passendem Namen und bestätigen Sie, dass sie in der Warnliste ausgeschlossen wird.

Tipp: Mit „Auf Standardwerte zurücksetzen“ können die Vorgaben jederzeit wiederhergestellt werden.

#### Warnung bei ausgeschlossenen Anhängen

- Umschalten „Warnen, wenn Anhänge durch Blacklist ausgeschlossen werden“ (Standard: EIN).
- Wenn aktiviert, listet ein kleines Modal die ausgeschlossenen Dateien und die übereinstimmenden Muster auf. Die
  Warnung erscheint auch, wenn nichts angehängt wird, weil alle Kandidaten auf der Blacklist stehen.

#### Einstellungen speichern

Einstellungen werden durch Drücken der Schaltfläche „Speichern“ gesichert. Sie können einzelne Felder manuell zurücksetzen oder die Standardwerte bei Bedarf wiederherstellen.

---

### Dateinamen-Normalisierung (Vermeidung von Duplikaten)

Um plattformübergreifend konsistent zu arbeiten, werden Dateinamen vor Duplikatprüfungen normalisiert:

- Unicode wird zu NFC normalisiert.
- Namen werden in der Groß-/Kleinschreibung vereinheitlicht (in Kleinbuchstaben umgewandelt).
- Nachgestellte Punkte/Leerzeichen werden entfernt (Windows-Freundlichkeit).

Dies hält die Duplikaterkennung vorhersehbar für Namen wie `café.pdf` vs. `café.pdf` (NFD) oder `FILE.txt.` vs. `file.txt`.

---

## Bestätigungsverhalten

- „Standardantwort“ legt die anfänglich fokussierte Schaltfläche im Bestätigungsdialog fest (hilfreich für Tastaturnutzende).
- Funktioniert sowohl für „Antworten“ als auch „Allen antworten“. „Weiterleiten“ wird von diesem Add-on nicht verändert.

---

## Erweitert: Duplikaterkennung

Die Vermeidung von Duplikaten ist pro Verfassen-Tab und nach Dateinamen implementiert. Siehe [Verwendung](usage#behavior-details) für eine detaillierte Erklärung.
