---
id: privacy
title: Datenschutz
sidebar_label: Datenschutz
---

Reply with Attachments erfasst keine Analysen oder Telemetriedaten und sendet Ihre Daten nirgendwohin.

Was das Add-on tut:

- Liest Metadaten und Dateien von Anhängen aus der Originalnachricht lokal aus (Thunderbird-API), um sie Ihrer Antwort hinzuzufügen.
- Speichert Ihre Optionen (Blacklist, Bestätigung, Standardantwort) im lokalen Speicher von Thunderbird.

Was das Add-on nicht tut:

- Kein Tracking, keine Analysen, keine Absturzberichte und kein Remote-Logging.
- Keine Netzwerkzugriffe im Hintergrund, außer wenn Sie explizit externe Links öffnen (Dokumentation, GitHub, Spenden).

Die Berechtigungen sind auf der Seite [Berechtigungen](permissions) dokumentiert.

## Content Security Policy (CSP)

Die Options- und Popup-Seiten vermeiden Inline-Skripte. Sämtliches JavaScript wird aus mit dem Add-on ausgelieferten Dateien geladen, um der strengen CSP in Thunderbird zu entsprechen. Wenn Sie Codeausschnitte in der Dokumentation einbetten, sind dies lediglich Beispiele und werden vom Add-on nicht ausgeführt.

## Datenspeicherung

- Benutzereinstellungen (Blacklist, Bestätigung (Umschalter), Standardantwort) werden für dieses Add-on in Thunderbirds `storage.local` gespeichert.
- Das Add-on führt keine Cloud-Synchronisierung durch.

## Netzwerk

- Das Add-on führt keine Netzwerkaktivität im Hintergrund aus.
- Netzwerkzugriffe erfolgen nur, wenn Sie auf Links klicken (Dokumentation, GitHub, Spenden) oder wenn Thunderbird selbst normale, nicht mit diesem Add-on zusammenhängende Vorgänge ausführt.
