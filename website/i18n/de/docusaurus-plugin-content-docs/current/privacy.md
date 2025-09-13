---
id: privacy
title: 'Datenschutz'
sidebar_label: 'Datenschutz'
---

## Datenschutz

:::note Keine Telemetrie; keine Hintergrundnetzwerkverbindung
Dieses Add-on sammelt **keine** Analysen/Telemetrie und sendet **keine** Hintergrundnetzwerkanfragen. Jeglicher Netzwerkzugriff erfolgt nur, wenn Sie einen externen Link (Docs, GitHub, Spenden) anklicken.
:::

Reply with Attachments sammelt keine Analysen oder Telemetrie und sendet Ihre Daten nirgendwohin.

Was das Add-on tut:

- Liest Metadaten und Dateien von der ursprünglichen Nachricht lokal (Thunderbird API), um sie an Ihre Antwort anzuhängen.
- Speichert Ihre Optionen (Blackliste, Bestätigung, Standardantwort) im lokalen Speicher von Thunderbird.

Was das Add-on nicht tut:

- Keine Nachverfolgung, Analysen, Absturzberichte oder Remote-Protokollierung.
- Keine Hintergrundnetzwerkanfragen, es sei denn, Sie öffnen explizit externe Links (Docs, GitHub, Spenden).

Berechtigungen sind auf der [Berechtigungen](permissions) Seite dokumentiert.

---

## Inhalts-Sicherheitsrichtlinie (CSP) {#content-security-policy-csp}

Die Optionen und Popup-Seiten vermeiden Inline-Skripte. Alle JavaScript-Dateien werden von Dateien geladen, die mit dem Add-on ausgeliefert werden, um den strengen CSP in Thunderbird zu entsprechen. Wenn Sie Code-Snippets in Dokumente einbetten, sind diese nur Beispiele und werden vom Add-on nicht ausgeführt.

---

## Datenspeicherung {#data-storage}

- Benutzerpräferenzen (Blackliste, Bestätigungsschalter, Standardantwort) werden im `storage.local` von Thunderbird für dieses Add-on gespeichert.
- Es erfolgt keine Cloud-Synchronisierung durch das Add-on.

---

## Netzwerk {#network}

- Das Add-on führt keine Hintergrundnetzwerkaktivitäten durch.
- Jeglicher Netzwerkzugriff erfolgt nur, wenn Sie auf Links (Docs, GitHub, Spenden) klicken oder wenn Thunderbird selbst normale Operationen durchführt, die nichts mit diesem Add-on zu tun haben.

---

## Datenlöschung {#data-removal}

- Die Deinstallation des Add-ons entfernt dessen Code.
- Einstellungen werden nur im `storage.local` von Thunderbird gespeichert und bei der Deinstallation entfernt; es wird kein externes Speicher verwendet.
- Einstellungen zurücksetzen, ohne das Add-on zu deinstallieren:
  - Optionen-Seite: Verwenden Sie "Auf Standard zurücksetzen" für die Blackliste und die Blacklist-Warnung.
  - Erweitert: in Thunderbird → Werkzeuge → Entwicklertools → Add-ons Debuggen, öffnen Sie den Speicher der Erweiterung und löschen Sie die Schlüssel, falls erforderlich.

---
