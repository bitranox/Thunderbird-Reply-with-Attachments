---
id: privacy
title: 'Datenschutz'
sidebar_label: 'Datenschutz'
---

---

## Datenschutz

:::note Keine Telemetrie; kein Netzwerkverkehr im Hintergrund
Dieses Add‑on erhebt **keine** Analysen/Telemetrie und stellt **keine** Hintergrund‑Netzwerkanfragen. Jeglicher Netzwerkzugriff erfolgt nur, wenn Sie auf einen externen Link klicken (Docs, GitHub, Spenden).
:::

Reply with Attachments erhebt keine Analyse- oder Telemetriedaten und sendet Ihre Daten nirgendwohin.

Was das Add‑on tut:

- Liest lokal (Thunderbird‑API) die Metadaten und Dateien von Anhängen aus der Originalnachricht, um sie Ihrer Antwort hinzuzufügen.
- Speichert Ihre Optionen (Blacklist, Bestätigung, Standardantwort) im lokalen Speicher von Thunderbird.

Was das Add‑on nicht tut:

- Kein Tracking, keine Analysen, keine Absturzberichte und kein Remote‑Logging.
- Keine Hintergrund‑Netzwerkanfragen, außer wenn Sie ausdrücklich externe Links öffnen (Docs, GitHub, Spenden).

Die Berechtigungen sind auf der Seite [Berechtigungen](permissions) dokumentiert.

---

## Inhaltsicherheitsrichtlinie (CSP) {#content-security-policy-csp}

Die Options- und Popup-Seiten vermeiden Inline-Skripte. Sämtliches JavaScript wird aus mit dem Add‑on ausgelieferten Dateien geladen, um der strikten CSP in Thunderbird zu entsprechen. Falls in der Dokumentation Codeausschnitte eingebettet sind, dienen sie nur als Beispiele und werden nicht vom Add‑on ausgeführt.

---

## Datenspeicherung {#data-storage}

- Benutzereinstellungen (Blacklist, Bestätigungsschalter, Standardantwort) werden in Thunderbirds `storage.local` für dieses Add‑on gespeichert.
- Das Add‑on führt keine Cloud‑Synchronisierung durch.

---

## Netzwerk {#network}

- Das Add‑on führt keine Netzwerkaktivitäten im Hintergrund aus.
- Jeglicher Netzwerkzugriff erfolgt nur, wenn Sie auf Links klicken (Docs, GitHub, Spenden) oder wenn Thunderbird selbst normale, nicht mit diesem Add‑on zusammenhängende Vorgänge ausführt.

---

## Datenentfernung {#data-removal}

- Die Deinstallation des Add‑ons entfernt dessen Code.
- Einstellungen werden nur in Thunderbirds `storage.local` gespeichert und bei der Deinstallation entfernt; es wird kein externer Speicher verwendet.
- Einstellungen zurücksetzen, ohne zu deinstallieren:
  - Optionsseite: Verwenden Sie „Reset to defaults“ für die Blacklist und die Blacklist-Warnung.
  - Erweitert: In Thunderbird → Extras → Entwicklerwerkzeuge → Add‑ons debuggen den Speicher der Erweiterung öffnen und bei Bedarf Schlüssel löschen.

---
