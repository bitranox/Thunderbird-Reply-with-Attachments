---
id: configuration
title: 'Konfiguration'
---

---

## Konfiguration

Terminologiehinweis: Siehe das [Glossar](glossary) für konsistente Begriffe in der Benutzeroberfläche und in der Dokumentation.

---

## Optionen in Thunderbird öffnen {#open-options-in-thunderbird}

- Thunderbird → Extras → Add‑ons und Themes → „Reply with Attachments“ suchen → Einstellungen/Optionen

---

### Einstellungen {#settings}

#### Bestätigung {#confirmation}

- Umschalten „Vor dem Hinzufügen von Anhängen nachfragen“
- Standardantwort: Ja oder Nein (Fokus- & Tastaturstandard)
- Tastatur: Y/J = Ja; N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus zyklisch
  - Siehe Tastaturdetails in [Verwendung](usage#keyboard-shortcuts).

---

#### Blockliste (Glob-Muster) {#blacklist-glob-patterns}

Dateien auf der Blockliste werden beim Antworten nicht automatisch hinzugefügt. Siehe auch das [Glossar](glossary) zu „Blockliste (Ausschlussliste)“.

- Ein Muster pro Zeile; Groß-/Kleinschreibung wird ignoriert; Abgleich nur nach Dateinamen
- Beispiele: `*intern*`, `*secret*`, `*passwor*`
- Unterstützte Glob-Token: `*` (beliebige Zeichen außer `/`), `?` (ein Zeichen), Zeichenklassen wie `[abc]`. Verwenden Sie `\[`, um ein wörtliches `[` zu treffen. Pfade (`**/`) werden ignoriert, da nur Dateinamen abgeglichen werden.
- Nicht unterstützt: Negation (`!`), Klammererweiterung (`{..}`) und komplexe Bereiche. Halten Sie die Muster einfach.
- Kommentare werden in Mustern nicht unterstützt. Fügen Sie `#` oder Inline-Kommentare nicht ein; geben Sie pro Zeile nur den Mustertext ein.

---

##### Muster‑Kochbuch {#pattern-cookbook}

- Beliebige PDF-Datei abgleichen: `*.pdf`
- Dateien abgleichen, die mit „scan“ beginnen: `scan*`
- Zeichenklasse: `report[0-9].txt`
- Ein wörtliches `[` maskieren: `\[` (nützlich, wenn eine Klammer als Zeichen abgeglichen werden soll)

---

##### Hinweise {#blacklist-notes}

- Die Reihenfolge spielt keine Rolle; der erste/irgendein Treffer schließt die Datei aus.
- Der Abgleich erfolgt nur anhand des Dateinamens (Pfade/Ordner werden ignoriert).
- „Auf Standard zurücksetzen“ stellt die empfohlenen Muster und die Einstellung für die Blocklistenwarnung wieder her.
- Warum das Beispiel `*passwor*`? Es passt sowohl auf die „password“- als auch die „Passwort“-Familie.
- Priorität: Wenn ein beliebiges Muster auf einen Dateinamen passt, wird die Datei ausgeschlossen (erster/irgendein Treffer — die Reihenfolge ändert das Ergebnis nicht).
- Tipp — testen Sie Ihr Muster: Fügen Sie ein temporäres Muster hinzu, antworten Sie auf eine Nachricht mit einer Datei mit passendem Namen und prüfen Sie, ob sie in der Warnliste ausgeschlossen ist.

##### Schnell ausprobieren (sicherer Test) {#blacklist-try-it}

1. Optionen → Blockliste öffnen.
2. Fügen Sie ein temporäres Muster wie `*.tmp` hinzu und klicken Sie auf Speichern.
3. Antworten Sie auf eine Test‑Mail, die eine Datei hat, die auf `.tmp` endet — die Datei sollte in der Warnliste erscheinen und nicht angehängt werden.
4. Entfernen Sie das temporäre Muster anschließend oder klicken Sie auf „Auf Standard zurücksetzen“.

---

#### Inline‑Bilder einbeziehen {#include-inline-pictures}

- Umschalten „Inline‑Bilder (eingebettete Bilder) einbeziehen“ (Standard: EIN).
- Wenn aktiviert, werden Bilder, die im ursprünglichen Nachrichtentext eingebettet sind,
  direkt in der Antwort als base64‑Daten‑URIs wiederhergestellt. So bleibt das ursprüngliche Inline‑
  Layout erhalten und Empfänger sehen die Bilder genau an der Stelle, an der sie erschienen sind.
- Wenn deaktiviert, werden Inline‑Bilder aus dem Antworttext entfernt (Thunderbirds
  Standardverhalten entfernt sie).

---

#### Warnung bei ausgeschlossenen Anhängen {#warning-on-excluded-attachments}

- Umschalten „Warnen, wenn Anhänge durch die Blockliste ausgeschlossen werden“ (Standard: EIN).
- Wenn aktiviert, listet ein kleines Modal ausgeschlossene Dateien und die passenden Muster auf. Die
  Warnung erscheint auch, wenn nichts angehängt wird, weil alle Kandidaten auf der Blockliste standen.

---

#### Einstellungen speichern {#save-your-settings}

Einstellungen werden durch Klicken auf die Schaltfläche „Speichern“ gesichert. Sie können einzelne Felder manuell zurücknehmen oder bei Bedarf die Standardwerte wiederherstellen.

Wenn gespeicherte Einstellungen scheinbar nicht korrekt angewendet werden, starten Sie Thunderbird neu und versuchen Sie es erneut. (Thunderbird kann Status über Sitzungen hinweg zwischenspeichern; ein Neustart stellt sicher, dass frische Einstellungen geladen werden.)

Tipp: Um zu bestätigen, dass Ihre Einstellungen wirksam sind, antworten Sie auf eine beliebige Nachricht mit Anhang und prüfen Sie die Bestätigung oder die Blocklistenwarnung.

---

#### Sichtbarkeit von Spendenhinweisen (90‑Tage‑Ausblendung) {#donation-visibility}

Das Add‑on enthält eine Komfortfunktion, um Spendenaufforderungen nach einer Spende für eine Weile auszublenden.

Wo zu finden

- Optionen → Bereich Unterstützung: Sie sehen eine Schaltfläche „Ich habe gespendet“ und einen kleinen Hinweisteil.
- Der Sende‑Bestätigungsdialog zeigt ebenfalls eine Schaltfläche „Spenden“; sie wird automatisch ausgeblendet, wenn die Ausblendung aktiv ist.

Funktionsweise

- Ein Klick auf „Ich habe gespendet“ blendet Spenden‑Schaltflächen und zugehörige Hinweise für 90 Tage aus.
- Ein Statushinweis zeigt „Ausgeblendet bis YYYY‑MM‑DD“ (in Ihrem lokalen Datum). Es gibt auch eine Schaltfläche „Spenden erneut anzeigen“, um die Sichtbarkeit sofort wiederherzustellen.
- Nach 90 Tagen wird die Schaltfläche „Spenden“ automatisch wieder sichtbar.

Datenschutz & Speicherung

- Das Add‑on speichert einen einzigen Zeitstempel im lokalen Speicher von Thunderbird, um sich die Ausblendungsdauer zu merken. Schlüssel: `donateHideUntil` (Epoch‑Millisekunden).
- Diese Einstellung ist lokal für Ihr Thunderbird‑Profil (nicht Cloud‑synchronisiert). Diese Funktion führt keine Netzwerk­anfragen durch.

Fehlerbehebung

- Wenn „Spenden“ unmittelbar nach dem Klick auf „Ich habe gespendet“ weiterhin angezeigt wird, warten Sie einen Moment oder öffnen Sie die Seite Optionen erneut; die Oberfläche aktualisiert sich, sobald die Einstellung gespeichert ist.
- Um manuell zurückzusetzen, klicken Sie auf „Spenden erneut anzeigen“. Sie können auch warten, bis das im Hinweis angegebene Datum verstrichen ist.

Diese Funktion dient ausschließlich der Bequemlichkeit; sie blockiert niemals die Add‑on‑Funktionalität und erhebt keinerlei personenbezogene Daten.

---

### Dateinamen‑Normalisierung (Vermeidung von Duplikaten) {#filename-normalization-duplicates-prevention}

Um sich plattformübergreifend konsistent zu verhalten, werden Dateinamen vor Duplikatprüfungen normalisiert:

- Unicode wird nach NFC normalisiert.
- Groß-/Kleinschreibung wird vereinheitlicht (in Kleinbuchstaben umgewandelt).
- Nachgestellte Punkte/Leerzeichen werden entfernt (Windows‑Freundlichkeit).

Dies macht die Duplikaterkennung vorhersagbar für Namen wie `café.pdf` vs `café.pdf` (NFD) oder `FILE.txt.` vs `file.txt`.

---

## Bestätigungsverhalten {#confirmation-behavior}

- „Standardantwort“ setzt die anfänglich fokussierte Schaltfläche im Bestätigungsdialog (hilfreich für Tastaturnutzer).
- Gilt sowohl für „Antworten“ als auch für „Allen antworten“. „Weiterleiten“ wird von diesem Add‑on nicht verändert.

---

## Erweitert: Duplikaterkennung {#advanced-duplicate-detection}

Die Duplikatverhinderung ist pro Verfassen‑Tab und nach Dateiname implementiert. Siehe [Verwendung](usage#behavior-details) für eine ausführliche Erklärung.

---

Siehe auch

- [Berechtigungen](permissions)
- [Datenschutz](privacy)
