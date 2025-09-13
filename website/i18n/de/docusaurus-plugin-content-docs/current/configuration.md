---
id: configuration
title: 'Konfiguration'
---

## Konfiguration

Terminologiehinweis: siehe das [Glossar](glossary) für konsistente Begriffe, die in der UI und der Dokumentation verwendet werden.

---

## Optionen in Thunderbird öffnen {#open-options-in-thunderbird}

- Thunderbird → Werkzeuge → Add‑ons und Designs → finden Sie „Antworten mit Anhängen“ → Einstellungen/Optionen

---

### Einstellungen {#settings}

#### Bestätigung {#confirmation}

- Aktivieren Sie „Vor dem Hinzufügen von Anhängen fragen“
- Standardantwort: Ja oder Nein (Fokus & Tastaturstandard)
- Tastatur: Y/J = Ja; N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus
  - Siehe Tastaturdetails in [Benutzung](usage#keyboard-shortcuts).

---

#### Blacklist (glob Muster) {#blacklist-glob-patterns}

Schwarze Listen Dateien werden automatisch nicht bei Antworten hinzugefügt. Siehe auch das [Glossar](glossary) für „Blacklist (Ausschlussliste)“.

- Ein Muster pro Zeile; Groß- und Kleinschreibung ignorierend; nur Dateinamen-Matching
- Beispiele: `*intern*`, `*secret*`, `*passwor*`
- Unterstützte Glob-Tokens: `*` (beliebige Zeichen außer `/`), `?` (ein Zeichen), Zeichensatzklassen wie `[abc]`. Verwenden Sie `\[`, um ein literal `[` zu erfassen. Pfade (`**/`) werden ignoriert, da nur Dateinamen abgeglichen werden.
- Nicht unterstützt: Negation (`!`), geschweifte Erweiterung (`{..}`) und komplexe Bereiche. Halten Sie Muster einfach.
- Kommentare werden in Mustern nicht unterstützt. Fügen Sie `#` oder Inline-Kommentare nicht hinzu; geben Sie nur den Mustertxt pro Zeile ein.

---

##### Musterkochbuch {#pattern-cookbook}

- Alle PDFs erfassen: `*.pdf`
- Dateien, die mit „scan“ beginnen: `scan*`
- Zeichenklasse: `report[0-9].txt`
- Escape einen literal `[`: `\[` (nützlich beim Abgleichen einer Klammer als Zeichen)

---

##### Hinweise {#blacklist-notes}

- Reihenfolge spielt keine Rolle; das erste/jede übereinstimmende Muster schließt die Datei aus.
- Abgleich erfolgt nur anhand des Dateinamens (Pfade/Ordner werden ignoriert).
- „Auf die Standardwerte zurücksetzen“ stellt die empfohlenen Muster und den Warnungs-Umschalter für die Blacklist wieder her.
- Warum das Beispiel `*passwor*`? Es erfasst sowohl „password“ als auch „Passwort“ Familien.
- Vorrang: wenn ein Muster mit einem Dateinamen übereinstimmt, wird die Datei ausgeschlossen (erstes/jedes Matching — die Reihenfolge ändert das Ergebnis nicht).
- Tipp — testen Sie Ihr Muster: Fügen Sie ein temporäres Muster hinzu, antworten Sie auf eine Nachricht, die eine Datei mit einem übereinstimmenden Namen enthält, und bestätigen Sie, dass sie in der Warnliste ausgeschlossen ist.

##### Schnell ausprobieren (sicherer Test) {#blacklist-try-it}

1. Optionen → Blacklist öffnen.
2. Fügen Sie ein temporäres Muster wie `*.tmp` hinzu und klicken Sie auf Speichern.
3. Antworten Sie auf eine Testmail, die eine Datei mit der Endung `.tmp` enthält — die Datei sollte in der Warnliste erscheinen und nicht angehängt werden.
4. Entfernen Sie das temporäre Muster, wenn Sie fertig sind, oder klicken Sie auf „Auf die Standardwerte zurücksetzen“.

---

#### Warnung zu ausgeschlossen Anhängen {#warning-on-excluded-attachments}

- Aktivieren Sie „Warnen, wenn Anhänge von der Blacklist ausgeschlossen sind“ (Standard: EIN).
- Wenn aktiviert, zeigt ein kleines Modal ausgeschlossen Dateien und die übereinstimmenden Muster an. Die
  Warnung erscheint auch, wenn nichts angehängt wird, da alle Kandidaten
  auf der Blacklist stehen.

---

#### Speichern Sie Ihre Einstellungen {#save-your-settings}

Einstellungen werden durch Drücken der Schaltfläche Speichern gespeichert. Sie können einzelne Felder manuell zurücksetzen oder bei Bedarf die Standardwerte wiederherstellen.

Wenn gespeicherte Einstellungen nicht richtig angewendet erscheinen, starten Sie Thunderbird neu und versuchen Sie es erneut. (Thunderbird kann den Zustand über Sitzungen hinweg cachen; ein Neustart stellt sicher, dass frische Einstellungen geladen werden.)

Tipp: Um zu bestätigen, dass Ihre Einstellungen wirksam wurden, antworten Sie auf eine beliebige Nachricht mit einem Anhang und überprüfen Sie die Bestätigung oder die Warnung zur Blacklist.

---

#### Sichtbarkeit der Spenden (90‑tägige Ruhephase) {#donation-visibility}

Das Add-on enthält eine bequeme Funktion, um Spendenaufforderungen eine Weile auszublenden, nachdem Sie gespendet haben.

Wo man es findet

- Optionen → Unterstützungsbereich: Sie sehen eine „Ich habe gespendet“ Schaltfläche und einen kleinen Hinweisbereich.
- Der Sendebestätigungsdialog zeigt auch eine Schaltfläche „Spenden“; sie wird automatisch ausgeblendet, wenn die Ruhephase aktiv ist.

Wie es funktioniert

- Ein Klick auf „Ich habe gespendet“ blendet die Spenden-Schaltflächen und verwandte Aufforderungen für 90 Tage aus.
- Ein Statushinweis zeigt „Überblendet bis YYYY‑MM‑DD“ (in Ihrem lokalen Datum). Es gibt auch eine Schaltfläche „Spende erneut anzeigen“, um die Sichtbarkeit sofort wiederherzustellen.
- Nach 90 Tagen wird die Spenden-Schaltfläche automatisch erneut sichtbar.

Privatsphäre & Speicherung

- Das Add-on speichert einen einzelnen Zeitstempel im lokalen Speicher von Thunderbird, um die Ruhephase zu erinnern. Schlüssel: `donateHideUntil` (epoch milliseconds).
- Diese Einstellung ist lokal für Ihr Thunderbird-Profil (nicht cloud-synchronisiert). Es werden keine Netzwerk-Anfragen von dieser Funktion gemacht.

Fehlerbehebung

- Wenn „Spende“ direkt nach dem Klicken auf „Ich habe gespendet“ immer noch angezeigt wird, warten Sie einen Moment oder öffnen Sie die Optionsseite erneut; die UI aktualisiert sich sofort, sobald die Einstellung gespeichert ist.
- Um manuell zurückzusetzen, klicken Sie auf „Spende erneut anzeigen“. Sie können auch warten, bis das im Hinweis angegebene Datum vergangen ist.

Diese Funktion dient ausschließlich der Bequemlichkeit; sie blockiert niemals die Funktionalität des Add-ons und sammelt keine persönlichen Daten.

---

### Dateinamen-Normalisierung (Vermeidung von Duplikaten) {#filename-normalization-duplicates-prevention}

Um konsistent über Plattformen hinweg zu agieren, werden Dateinamen vor Duplikatsprüfungen normalisiert:

- Unicode wird auf NFC normalisiert.
- Namen werden in Groß-/Kleinbuchstaben umgewandelt (in Kleinbuchstaben).
- Nachgestellte Punkte/Räume werden abgeschnitten (Windows-Freundlichkeit).

Dies hält die Duplikaterkennung bei Namen wie `café.pdf` im Vergleich zu `café.pdf` (NFD) oder `FILE.txt.` im Vergleich zu `file.txt` vorhersehbar.

---

## Bestätigungsverhalten {#confirmation-behavior}

- „Standardantwort“ legt die anfänglich fokussierte Schaltfläche im Bestätigungsdialog fest (hilfreich für Tastaturbenutzer).
- Funktioniert sowohl für „Antworten“ als auch für „Allen antworten“. „Weiterleiten“ wird von diesem Add-on nicht geändert.

---

## Erweitert: Duplikaterkennung {#advanced-duplicate-detection}

Die Duplikatvermeidung wird pro Komponierungstablette und nach Dateiname implementiert. Siehe [Benutzung](usage#behavior-details) für eine detaillierte Erklärung.

---

Siehe auch

- [Berechtigungen](permissions)
- [Datenschutz](privacy)
