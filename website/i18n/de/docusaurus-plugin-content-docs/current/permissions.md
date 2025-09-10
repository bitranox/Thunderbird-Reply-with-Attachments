---
id: permissions
title: Berechtigungen
---

---

## Berechtigungen

---

Das Add-on fordert nur einen kleinen, fokussierten Satz an Berechtigungen an. Warum jede benötigt wird:

- `compose`: Verfassen-Ereignisse beobachten, Anhänge in Ihrer Antwort auflisten/hinzufügen.
- `messagesRead`: Metadaten lesen und Anhangsdateien aus der Originalnachricht abrufen.
- `scripting`: den kleinen Bestätigungsdialog im Verfassenfenster injizieren, wenn aktiviert.
- `windows`: ein kleines Bestätigungs-Popup als letzte Maßnahme öffnen, wenn das Messaging fehlschlägt.
- `sessions`: ein pro-Tab-Flag speichern, um doppelte Verarbeitung zu vermeiden.
- `storage`: Optionen persistieren (Blockliste, Bestätigungs-Umschalter, Standardantwort).
- `tabs`: gezielte Nachrichtenübermittlung an den Verfassen-Tab für Bestätigungsanforderungen.

Diese sind im Quellcode dokumentiert und in CI getestet. Das Add-on erhebt keine Telemetrie.

---

### Zusammenfassung (Berechtigungen → Zweck) {#permissions-summary}

| Berechtigung          | Warum sie benötigt wird                                                              |
| --------------------- | ------------------------------------------------------------------------------------ |
| `compose`             | Verfassen-Ereignisse beobachten; Anhänge in Ihrer Antwort auflisten und hinzufügen.  |
| `messagesRead`        | Anhänge der Originalnachricht auflisten und die Dateidaten abrufen.                  |
| `scripting`           | Leichtgewichtiges UI zur Bestätigung injizieren/koordinieren, wenn aktiviert.        |
| `windows`             | Fallback-Popup, falls Messaging fehlschlägt (selten).                                |
| `sessions`            | Pro-Tab-Flag speichern, um doppelte Verarbeitung zu verhindern.                      |
| `storage`             | Optionen persistieren (Blockliste, Bestätigungs-Umschalter, Standardantwort).        |
| `tabs`                | Gezielte Nachrichtenübermittlung an den Verfassen-Tab für Bestätigungsanforderungen. |
| (Host-Berechtigungen) | Keine — das Add-on fordert keine Web-Origins an.                                     |

---

## Nicht angefordert {#not-requested}

- `compose.save`, `compose.send` — das Add-on speichert oder sendet keine E-Mails in Ihrem Namen.

Siehe auch: [Datenschutz](privacy) — keine Telemetrie, kein Hintergrundnetzwerk, nur vom Benutzer initiierte Links.

---
