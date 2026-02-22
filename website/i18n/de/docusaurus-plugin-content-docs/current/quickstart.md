---
id: quickstart
title: 'Schnellstart'
sidebar_label: 'Schnellstart'
---

---

## Schnellstart

:::important Minimale Thunderbird-Version
Dieses Add‑on unterstützt Thunderbird **128 ESR oder neuer**. Ältere Versionen werden nicht unterstützt.
:::

:::note Keine Telemetrie; kein Hintergrundnetzwerk
Das Add‑on sammelt **keine** Analysen/Telemetrie und führt **keine** Netzwerkzugriffe im Hintergrund aus. Netzwerkzugriff erfolgt nur, wenn Sie auf externe Links klicken (Doku, GitHub, Spenden).
:::

---

### Installation

1. Installieren Sie das Add‑on aus Thunderbird Add‑ons.
2. Optional: Bestätigung aktivieren (Optionen → “Vor dem Hinzufügen von Anhängen nachfragen”).
3. Optional: Lassen Sie die Blacklist-Warnung aktiviert (Standard): “Warnen, wenn Anhänge durch die Blacklist ausgeschlossen werden”.
4. Optional: Blacklist-Muster hinzufügen (eines pro Zeile), z. B.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Hinweis: Das “# …” oben ist ein Kommentar in dieser Dokumentation; fügen Sie in den Mustern, die Sie in die Optionen einfügen, keine Kommentare ein. Geben Sie jeweils genau ein Muster pro Zeile ein.

Antworten Sie nun auf eine Nachricht mit Anhängen — die Originale werden automatisch oder nach einer kurzen Bestätigung hinzugefügt. Wenn Dateien durch Ihre Blacklist ausgeschlossen werden, erscheint eine kurze Warnung, in der sie aufgeführt sind.

---

### Überprüfen {#verify}

- Antworten Sie auf eine Nachricht mit 1–2 Anhängen und bestätigen Sie, dass die Originale Ihrem Verfassen‑Fenster hinzugefügt werden.
- Um das Verhalten anzupassen, siehe [Konfiguration](configuration) (Bestätigungsabfrage, Standardantwort, Blacklist‑Muster).

---

### Blacklist-Warnung überprüfen {#verify-blacklist-warning}

- Antworten Sie auf eine Nachricht, die eine Datei wie “secret.txt” enthält.
- Wenn “Warnen, wenn Anhänge durch die Blacklist ausgeschlossen werden” aktiviert ist, listet ein kleines Dialogfenster die ausgeschlossenen Dateien und das passende Muster auf.

Wenn Sie keine Warnung sehen, stellen Sie sicher, dass das Muster exakt mit dem Dateinamen übereinstimmt (nur Dateiname, Groß-/Kleinschreibung wird ignoriert). Siehe Konfiguration → Blacklist.

---

### Tastaturhinweis {#keyboard-note}

- Der Bestätigungsdialog unterstützt Y/J für Ja und N/Esc für Nein. Auf einigen nicht‑lateinischen Tastaturen können die Buchstabentasten variieren; Enter bestätigt die fokussierte Schaltfläche.

---
