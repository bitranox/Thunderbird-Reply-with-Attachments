---
id: quickstart
title: 'Schnellstart'
sidebar_label: 'Schnellstart'
---

## Schnellstart

:::important Mindestversion von Thunderbird
Dieses Add-on unterstützt Thunderbird **128 ESR oder neuer**. Ältere Versionen werden nicht unterstützt.
:::

:::note Keine Telemetrie; kein Hintergrundnetzwerk
Das Add-on sammelt **keine** Analysen/Telemetrie und führt **keine** Hintergrundnetzwerkanfragen durch. Der Netzwerkzugriff erfolgt nur, wenn Sie auf externe Links klicken (Docs, GitHub, Spenden).
:::

---

### Installieren

1. Installieren Sie das Add-on aus den Thunderbird Add-ons.
2. Optional: Bestätigungsanfrage aktivieren (Optionen → „Fragen, bevor Anhänge hinzugefügt werden“).
3. Optional: Warnung bei Schwarzer Liste aktiviert lassen (Standard): „Warnen, wenn Anhänge durch die Schwarze Liste ausgeschlossen werden“.
4. Optional: Muster für die Schwarze Liste hinzufügen (ein Muster pro Zeile), z.B.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Hinweis: Die „# …“ oben ist ein Kommentar in dieser Dokumentation; fügen Sie keine Kommentare in die Muster ein, die Sie in die Optionen einfügen. Geben Sie nur ein Muster pro Zeile ein.

Jetzt auf eine Nachricht mit Anhängen antworten — die Originale werden automatisch hinzugefügt oder nach einer kurzen Bestätigung. Wenn Dateien durch Ihre Schwarze Liste ausgeschlossen werden, sehen Sie eine kurze Warnung, die diese auflistet.

---

### Überprüfen {#verify}

- Antworten Sie auf eine Nachricht mit 1–2 Anhängen und bestätigen Sie, dass die Originale in Ihr Eingabefenster hinzugefügt wurden.
- Um das Verhalten anzupassen, siehe [Konfiguration](configuration) (Bestätigungsumschalter, Standardantwort, Muster der Schwarzen Liste).

---

### Warnung bei schwarzer Liste überprüfen {#verify-blacklist-warning}

- Antworten Sie auf eine Nachricht, die eine Datei wie „secret.txt“ enthält.
- Wenn „Warnen, wenn Anhänge durch die Schwarze Liste ausgeschlossen werden“ aktiviert ist, zeigt ein kleines Dialogfeld die ausgeschlossenen Dateien und das entsprechende Muster an.

Wenn Sie keine Warnung sehen, stellen Sie sicher, dass das Muster genau mit dem Dateinamen übereinstimmt (nur Dateiname, nicht fallabhängig). Siehe Konfiguration → Schwarze Liste.

---

### Hinweis zur Tastatur {#keyboard-note}

- Der Bestätigungsdialog unterstützt Y/J für Ja und N/Esc für Nein. Auf einigen nicht-lateinischen Tastaturen können die Buchstabentasten variieren; Enter bestätigt die fokussierte Schaltfläche.

---
