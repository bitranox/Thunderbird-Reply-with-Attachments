---
id: configuration
title: Einstellungen
---

---

## Konfiguration

Hinweis zur Terminologie: Siehe das [Glossar](glossary) für einheitliche Begriffe in UI und Dokumentation.

---

## Optionen in Thunderbird öffnen {#open-options-in-thunderbird}

- Thunderbird → Extras → Add‑ons und Themes → „Reply with Attachments“ suchen → Einstellungen/Optionen

---

### Einstellungen {#settings}

#### Bestätigung {#confirmation}

- „Vor dem Hinzufügen von Anhängen nachfragen“ umschalten
- Standardantwort: Ja oder Nein (Fokus & Tastaturstandard)
- Tastatur: Y/J = Ja; N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus
  - Siehe Tastaturdetails unter [Verwendung](usage#keyboard-shortcuts).

---

#### Blacklist (Glob-Muster) {#blacklist-glob-patterns}

Dateien auf der Blacklist werden beim Antworten nicht automatisch hinzugefügt. Siehe auch das [Glossar](glossary) zu „Blacklist (Ausschlussliste)“.

- Ein Muster pro Zeile; Groß-/Kleinschreibung wird ignoriert; Abgleich nur anhand des Dateinamens
- Beispiele: `*intern*`, `*secret*`, `*passwor*`
- Unterstützte Glob-Tokens: `*` (beliebige Zeichen außer `/`), `?` (ein Zeichen), Zeichenklassen wie `[abc]`. Verwenden Sie `\[`, um ein wörtliches `[` zu treffen. Pfade (`**/`) werden ignoriert, da nur Dateinamen abgeglichen werden.
- Nicht unterstützt: Negation (`!`), Klammererweiterung (`{..}`) und komplexe Bereiche. Halten Sie die Muster einfach.
- Kommentare werden in Mustern nicht unterstützt. Fügen Sie `#` oder Inline-Kommentare nicht ein; geben Sie pro Zeile nur den Mustertext ein.

---

##### Muster-Kochbuch {#pattern-cookbook}

- Alle PDFs abgleichen: `*.pdf`
- Dateien abgleichen, die mit „scan“ beginnen: `scan*`
- Zeichenklasse: `report[0-9].txt`
- Ein wörtliches `[` maskieren: `\[` (nützlich, wenn eine Klammer als Zeichen abgeglichen werden soll)

---

##### Hinweise {#blacklist-notes}

- Die Reihenfolge spielt keine Rolle; der erste/irgendein Treffer schließt die Datei aus.
- Abgleich nur anhand des Dateinamens (Pfade/Ordner werden ignoriert).
- „Auf Standard zurücksetzen“ stellt die empfohlenen Muster und die Blacklist-Warnoption wieder her.
- Warum das Beispiel `*passwor*`? Es passt sowohl auf die „password“- als auch die „Passwort“-Familien.
- Vorrang: Wenn irgendein Muster zu einem Dateinamen passt, wird die Datei ausgeschlossen (erster/irgendein Treffer — die Reihenfolge ändert das Ergebnis nicht).
- Tipp — Testen Sie Ihr Muster: Fügen Sie ein temporäres Muster hinzu, antworten Sie auf eine Nachricht mit einer Datei mit passendem Namen und bestätigen Sie, dass sie in der Warnliste ausgeschlossen wird.

Tipp: Klicken Sie jederzeit auf „Auf Standard zurücksetzen“, um die empfohlenen Muster wiederherzustellen.

---

#### Warnung bei ausgeschlossenen Anhängen {#warning-on-excluded-attachments}

- „Warnen, wenn Anhänge durch die Blacklist ausgeschlossen werden“ umschalten (Standard: EIN).
- Wenn aktiviert, listet ein kleiner modaler Dialog die ausgeschlossenen Dateien und das/die passende(n) Muster auf. Die
  Warnung erscheint auch, wenn nichts angehängt wird, weil alle Kandidaten
  auf der Blacklist stehen.

---

#### Einstellungen speichern {#save-your-settings}

Einstellungen werden durch Drücken der Schaltfläche „Speichern“ gesichert. Sie können einzelne Felder manuell zurücksetzen oder bei Bedarf die Standardwerte wiederherstellen.

Wenn gespeicherte Einstellungen scheinbar nicht korrekt angewendet werden, starten Sie Thunderbird neu und versuchen Sie es erneut. (Thunderbird kann Zustand über Sitzungen hinweg zwischenspeichern; ein Neustart stellt sicher, dass frische Einstellungen geladen werden.)

Tipp: Um zu bestätigen, dass Ihre Einstellungen wirksam sind, antworten Sie auf eine beliebige Nachricht mit Anhang und prüfen Sie die Bestätigung oder die Blacklist-Warnung.

---

### Die Dateinamen-Normalisierung (Duplikatvermeidung) {#filename-normalization-duplicates-prevention}

Um sich plattformübergreifend konsistent zu verhalten, werden Dateinamen vor Duplikatprüfungen normalisiert:

- Unicode wird auf NFC normalisiert.
- Namen werden hinsichtlich der Groß-/Kleinschreibung vereinheitlicht (in Kleinbuchstaben).
- Nachgestellte Punkte/Leerzeichen werden entfernt (Windows‑Kompatibilität).

Das hält die Duplikaterkennung für Namen wie `café.pdf` vs. `café.pdf` (NFD) oder `FILE.txt.` vs. `file.txt` vorhersehbar.

---

## Bestätigungsverhalten {#confirmation-behavior}

- „Standardantwort“ bestimmt die anfänglich fokussierte Schaltfläche im Bestätigungsdialog (hilfreich für Tastaturnutzer).
- Funktioniert sowohl für „Antworten“ als auch „Allen antworten“. „Weiterleiten“ wird von diesem Add-on nicht verändert.

---

## Erweitert: Duplikaterkennung {#advanced-duplicate-detection}

Die Duplikatvermeidung ist pro Verfassen-Tab und nach Dateinamen implementiert. Eine ausführliche Erklärung finden Sie unter [Verwendung](usage#behavior-details).

---
