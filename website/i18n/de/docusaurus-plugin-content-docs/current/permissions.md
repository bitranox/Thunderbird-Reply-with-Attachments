---
id: permissions
title: Berechtigungen
---

Das Add-on fordert nur einen kleinen, gezielten Satz von Berechtigungen an. Warum jede erforderlich ist:

- `compose`: Ereignisse beim Verfassen beobachten, Anhänge in Ihrer Antwort auflisten/hinzufügen.
- `messagesRead`: Metadaten lesen und Anhangsdateien aus der ursprünglichen Nachricht abrufen.
- `scripting`: den kleinen Bestätigungsdialog beim Verfassen einblenden, wenn aktiviert.
- `windows`: ein kleines Bestätigungs-Popup als letzte Möglichkeit öffnen, wenn die interne Nachrichtenübermittlung fehlschlägt.
- `sessions`: eine Kennzeichnung pro Tab speichern, um doppelte Verarbeitung zu vermeiden.
- `storage`: Optionen (Blockliste, Bestätigungsschalter, Standardantwort) dauerhaft speichern.
- `tabs`: gezielte Nachrichtenübermittlung an den Verfassen-Tab für Bestätigungsanfragen.

Diese sind im Quellcode dokumentiert und in CI getestet. Das Add-on erhebt keine Telemetriedaten.

## Nicht angefordert

- `compose.save`, `compose.send` — das Add-on speichert oder sendet keine E-Mails in Ihrem Namen.
