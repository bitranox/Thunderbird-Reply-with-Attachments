---
id: quickstart
title: Schnellstart
sidebar_label: Schnellstart
---

---

## Schnellstart

---

### Installieren

1. Installieren Sie das Add-on aus den Thunderbird-Add-ons.
2. Optional: Bestätigung aktivieren (Optionen → „Vor dem Hinzufügen von Anhängen nachfragen“).
3. Optional: Lassen Sie die Blocklisten-Warnung aktiviert (Standard): „Warnen, wenn Anhänge durch die Blockliste ausgeschlossen werden“.
4. Optional: Fügen Sie Blocklistenmuster hinzu (eines pro Zeile), z. B.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Hinweis: Das „# …“ oben ist ein Kommentar in dieser Dokumentation; fügen Sie in die Optionen keine Kommentare in Muster ein. Geben Sie nur ein Muster pro Zeile ein.

Antworten Sie nun auf eine Nachricht mit Anhängen — die Originale werden automatisch oder nach einer kurzen Bestätigung hinzugefügt. Wenn Dateien durch Ihre Blockliste ausgeschlossen werden, sehen Sie eine kurze Warnung, die sie auflistet.

---

### Überprüfen {#verify}

- Antworten Sie auf eine Nachricht mit 1–2 Anhängen und bestätigen Sie, dass die Originale Ihrem Verfassenfenster hinzugefügt wurden.
- Um das Verhalten anzupassen, siehe [Konfiguration](configuration) (Bestätigung ein/aus, Standardantwort, Blocklistenmuster).

---

### Blocklisten-Warnung überprüfen {#verify-blacklist-warning}

- Antworten Sie auf eine Nachricht, die eine Datei wie „secret.txt“ enthält.
- Mit „Warnen, wenn Anhänge durch die Blockliste ausgeschlossen werden“ aktiviert, listet ein kleines Dialogfenster die ausgeschlossenen Dateien und das passende Muster auf.

Wenn Sie keine Warnung sehen, stellen Sie sicher, dass das Muster genau zum Dateinamen passt (nur Dateiname, Groß-/Kleinschreibung wird ignoriert). Siehe Konfiguration → Blockliste.

---

### Hinweis zur Tastatur {#keyboard-note}

- Der Bestätigungsdialog unterstützt Y/J für Ja und N/Esc für Nein. Auf einigen nicht-lateinischen Tastaturen können die Buchstabentasten abweichen; Enter bestätigt die fokussierte Schaltfläche.

---
