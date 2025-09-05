# Antwort mit Anhängen

![Tests](https://img.shields.io/badge/tests-vitest-blue)
![Thunderbird](https://img.shields.io/badge/thunderbird-MV3-green)
![Lizenz](https://img.shields.io/badge/lizenz-GPLv3-lightgrey)

## ![US Flag](https://github.com/ashleedawg/flags/blob/master/US.png?raw=true) [Switch to English version](README.md)

**Antwort mit Anhängen** ist ein Thunderbird‑Add‑on, das beim Antworten automatisch die Originalanhänge übernimmt.

---

## Schnellzugriff

- English Docs: https://bitranox.github.io/Thunderbird-Reply-with-Attachments/en/
- Deutsche Doku: https://bitranox.github.io/Thunderbird-Reply-with-Attachments/de/

## Funktionen (kurz)

- Fügt beim Antworten automatisch Anhänge aus der ursprünglichen E‑Mail hinzu.
- Konfigurierbares Verhalten: Anhänge können
  - automatisch hinzugefügt werden oder
  - erst nach Rückfrage (Bestätigungsdialog) hinzugefügt werden.
    In den Einstellungen lässt sich die Rückfrage aktivieren sowie die
    Standard‑Antwort (Ja/Nein) festlegen.
- Blacklist: Dateinamen‑Blacklist (Glob‑Muster) verhindert das automatische
  Anhängen bestimmter Dateien. Beispiele: `*.png`, `smime.*`, `*.p7s`.
  Die Prüfung erfolgt nur auf den Dateinamen, ist nicht
  Groß‑/Kleinschreibungs‑sensitiv und akzeptiert ein Muster pro Zeile.
- Fügt die Originalanhänge auch dann hinzu, wenn du bereits eigene Dateien
  angehängt hast; verhindert Duplikate anhand des Dateinamens.
- Überspringt SMIME‑Zertifikate und Inline‑Bilder, um unnötige Anhänge zu vermeiden.

Screenshot, der die Erweiterung in Aktion zeigt:

![Reply with Attachments Screenshot](screenshot.png)

---

## Installation - in Thunderbird (Empfohlene Methode)
1. in Thunderbird gehe zu Gehe zu **Extras > Add-ons und Themes** uns suche nach "reply with attachments"
2. füge das Addon hinzu

---

## Installation - PRIVATE - von der offiziellen Add-on-Page (für Entwicklung)

### Schritt 1: XPI-Datei herunterladen
1. Gehe zu [Thunderbird Add-on Seite](https://addons.thunderbird.net/de/thunderbird/search/?q=reply%20with%20attachments)
2. Lade die neueste Version des Add-ons als XPI-Datei herunter (`reply_with_attachments-x.y.z-tb.xpi`).

### Schritt 2: Installation in Thunderbird
1. Öffne Thunderbird.
2. Gehe zu **Extras > Add-ons und Themes**.
3. Klicke im **Add-ons-Manager** auf das Zahnrad-Symbol oben rechts.
4. Wähle im Dropdown-Menü **Add-on aus Datei installieren...**.
5. Wähle die heruntergeladene Datei `reply_with_attachments-x.y.z-tb.xpi` aus.
6. Bestätige die Installation, wenn du dazu aufgefordert wirst.

---

## Installation - PRIVATE - letzte Version von Github (für Entwicklung)

### Schritt 1: ZIP-Datei herunterladen
1. Gehe zum Bereich [Releases](https://github.com/bitranox/Thunderbird-Reply-with-Attachment/releases) dieses Repositorys.
2. Lade die neueste Version des Add-ons als ZIP-Datei herunter (`reply-with-attachments-plugin-PRIVATE.zip`)

### Schritt 2: Installation in Thunderbird
1. Öffne Thunderbird.
2. Gehe zu **Extras > Add-ons und Themes**.
3. Klicke im **Add-ons-Manager** auf das Zahnrad-Symbol oben rechts.
4. Wähle im Dropdown-Menü **Add-on aus Datei installieren...**.
5. Wähle die heruntergeladene Datei `reply-with-attachments-plugin-PRIVATE.zip` aus.
6. Bestätige die Installation, wenn du dazu aufgefordert wirst.

---

## Konfiguration

Optionen öffnen:

- Thunderbird → Extras → Add-ons und Themes → „Antwort mit Anhängen“ → Einstellungen

Einstellungen:

- Bestätigung: „Vor dem Hinzufügen bestätigen“ aktivieren/deaktivieren.
  - Standard‑Antwort: „Ja“ oder „Nein“ als Vorgabe für den Dialog.
  - Tastatur im Dialog: J oder Y = Ja; N oder Esc = Nein. Tab/Shift+Tab und Pfeiltasten bewegen den Fokus.
- Blacklist (Glob‑Muster): ein Muster pro Zeile, Groß‑/Kleinschreibung wird ignoriert, Abgleich nur gegen den Dateinamen.
  - Beispiele: `*.png`, `smime.*`, `*.p7s`
  - Nützlich, um Logos/Signaturen dauerhaft zu unterdrücken.

Tipp: Standardwerte sind beim ersten Start vorbelegt und können jederzeit zurückgesetzt werden.

---

## Verwendung (kurz)
- Antworten: Originale werden automatisch hinzugefügt – oder nach Rückfrage, wenn aktiviert.
- Duplikate werden nach Dateiname vermieden; SMIME & Inline‑Bilder werden nie hinzugefügt.

---

## Verhaltensdetails

- Duplikat‑Schutz: Der Status wird pro Tab mittels Sitzungswert und in‑Memory‑Wächter markiert. Originalanhänge werden nicht doppelt hinzugefügt.
- Respektiert vorhandene Anhänge: Enthält der Entwurf bereits Anhänge, werden die Originale einmalig ergänzt; schon vorhandene Dateinamen werden ausgelassen.
- Ausschlüsse: SMIME‑Artefakte (z. B. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) sowie Inline‑Bilder werden ignoriert. Falls im ersten Durchlauf nichts geeignet ist, prüft ein entspannter Fallback erneut (SMIME weiterhin ausgeschlossen).

---

## Debug‑Logging

Ausführliche Debug‑Logs können zur Laufzeit ein‑/ausgeschaltet werden (Fehler/Warnungen erscheinen immer):

1. Öffne die Fehlerkonsole: Extras → Entwicklerwerkzeuge → Fehlerkonsole.
2. Aktivieren: `messenger.storage.local.set({ debug: true })`
3. Deaktivieren: `messenger.storage.local.set({ debug: false })`
4. Die Ausgaben erscheinen in der Fehlerkonsole beim Antworten/Senden.

---

## Kompatibilität

- **Getestet mit Thunderbird Nebula 128.6.0esr (64-Bit).**
- **Ältere Thunderbird-Versionen werden nicht unterstützt.**

---

## Fehlerbehebung

- Wenn das Add-on nicht wie erwartet funktioniert, stelle sicher, dass du eine kompatible Version von Thunderbird verwendest (128.6.0esr oder neuer).
- Überprüfe die Fehlerkonsole von Thunderbird (**Extras > Entwicklerwerkzeuge > Fehlerkonsole**) auf Probleme, die mit dem Add-on zusammenhängen.

---

## Mitwirken

Wenn du zu diesem Projekt beitragen möchtest:
1. Forke das Repository.
2. Erstelle einen Feature-Branch (`git checkout -b feature-name`).
3. Committe deine Änderungen (`git commit -m "Add feature name"`).
4. Pushe deinen Branch (`git push origin feature-name`).
5. Öffne einen Pull-Request.

---

## Entwicklung

- Add-on-ZIPs bauen: `make pack`
- Tests ausführen (Vitest): `make test`
- Befehle anzeigen: `make help`

## Berechtigungen

Dieses Add-on verwendet nur die Berechtigungen, die für die Funktion erforderlich sind. Begründung pro Berechtigung:

- `compose`: Lese Zugriff auf den Composer, vorhandene Anhänge auflisten, neue Anhänge hinzufügen, Compose‑Ereignisse abonnieren.
- `messagesRead`: Nachrichten‑Metadaten lesen, um Originalanhänge zu finden und deren Dateien abzurufen.
- `messagesModify`: Derzeit in der Manifestdatei vorhanden; wird nicht aktiv zum Ändern von Nachrichten genutzt. Geplant: prüfen, ob diese Berechtigung entfernt werden kann.
- `windows`: Kleines Popup‑Fenster als letzte Bestätigungs‑Option öffnen, falls die In‑Dokument‑Bestätigung nicht verfügbar ist.

Weitere APIs (ohne explizite Berechtigung im TB‑Kontext):

- `storage`: Optionen und kleine Laufzeit‑Flags speichern.
- `sessions`: Pro‑Tab‑Idempotenz‑Marker setzen/löschen.
- `tabs`: GitHub/Spenden‑Links von der Optionsseite öffnen (Erweiterungsseite).
- `scripting.compose`: Bestätigungs‑Content‑Script (MV3) vorregistrieren und injizieren.

### Tests & Coverage
- `make test` führt die gesamte Vitest‑Suite aus. Wenn das optionale Coverage‑Plugin installiert ist, wird zusätzlich ein Abdeckungsbericht erzeugt.
- Coverage lokal aktivieren:
  1) `npm i -D @vitest/coverage-v8`
  2) `make test` erneut ausführen
  3) Konsolen‑Zusammenfassung lesen und `coverage/index.html` im Browser öffnen
- In CI oder eingeschränkten Umgebungen, in denen das Plugin nicht installiert werden kann, fällt `make test` automatisch auf einen Test‑Lauf ohne Coverage zurück.

#### Nur i18n‑Prüfungen
- Schneller Locale‑Check: `make test-i18n` führt nur Paritäts‑/Platzhalter‑/Titel‑Tests für Übersetzungen aus.

Die Pakete werden als `reply-with-attachments-plugin*.zip` im Repository-Root erstellt. Für manuelles Testen in Thunderbird: Extras → Add-ons und Themes → Zahnradsymbol → Add-on aus Datei installieren… und das erzeugte ZIP wählen.

---

## Unterstütze dieses Projekt

Wenn dir dieses Add-on gefällt, unterstütze die Entwicklung mit einem kleinen Beitrag:

[![Spenden via PayPal](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=7KJN33DHTA8WE)

---

## Lizenz

Dieses Projekt ist unter der GNU General Public License v3 lizenziert.  
Den vollständigen Lizenztext findest du [hier](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/LICENCE).

---

## Danksagungen

Vielen Dank an die Thunderbird-Add-on-Entwickler-Community für die hervorragende Dokumentation und Unterstützung.

--- 

## Versionsverlauf / Changelog

### V1.0.1
- Ersetzte die benutzerdefinierte Funktion `getAttachmentsFromMessage()`, die die MIME-Teile manuell durchlief, durch die Standardmethode `browser.messages.listAttachments()`.

### V1.0.0
- Erste Veröffentlichung.
