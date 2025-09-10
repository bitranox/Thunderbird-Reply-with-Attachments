---
id: privacy
title: Datenschutz
sidebar_label: Datenschutz
---

---

## Datenschutz

Reply with Attachments erfasst keine Analyse- oder Telemetriedaten und sendet Ihre Daten nirgendwohin.

Was das Add-on macht:

- Liest lokal (Thunderbird-API) die Metadaten und Dateien der Anhänge aus der Originalnachricht, um sie Ihrer Antwort anzufügen.
- Speichert Ihre Optionen (Blockliste, Bestätigung, Standardantwort) im lokalen Speicher von Thunderbird.

Was das Add-on nicht macht:

- Kein Tracking, keine Analysen, keine Crash-Berichte und kein Remote-Logging.
- Keine Netzwerkzugriffe im Hintergrund, außer wenn Sie ausdrücklich externe Links öffnen (Docs, GitHub, Donate).

Die Berechtigungen sind auf der Seite [Berechtigungen](permissions) dokumentiert.

---

## Content-Sicherheitsrichtlinie (CSP) {#content-security-policy-csp}

Die Optionen- und Popup-Seiten verzichten auf Inline-Skripte. Sämtliches JavaScript wird aus Dateien geladen, die mit dem Add-on ausgeliefert werden, um der strengen CSP in Thunderbird zu entsprechen. Wenn in der Dokumentation Codeausschnitte eingebettet sind, dienen sie nur als Beispiele und werden vom Add-on nicht ausgeführt.

---

## Datenspeicherung {#data-storage}

- Benutzereinstellungen (Blockliste, Bestätigungsschalter, Standardantwort) werden für dieses Add-on in Thunderbirds `storage.local` gespeichert.
- Das Add-on führt keine Cloud-Synchronisierung durch.

---

## Netzwerk {#network}

- Das Add-on führt keine Netzwerkaktivität im Hintergrund aus.
- Jeglicher Netzwerkzugriff erfolgt nur, wenn Sie auf Links klicken (Docs, GitHub, Donate), oder wenn Thunderbird selbst normale, nicht mit diesem Add-on zusammenhängende Vorgänge ausführt.

---

## Datenlöschung {#data-removal}

- Die Deinstallation des Add-ons entfernt dessen Code.
- Einstellungen werden nur in Thunderbirds `storage.local` gespeichert und bei der Deinstallation entfernt; es wird kein externer Speicher verwendet.
  Um nur die Einstellungen zurückzusetzen, ohne zu deinstallieren, verwenden Sie auf der Optionen-Seite „Reset to defaults“ für Blockliste und Warnung, oder aktualisieren Sie die Werte manuell auf der Thunderbird-Seite „Add-ons debuggen“.

---

## Netzwerk (Zusammenfassung) {#network-recap}

- Keine Netzwerkaktivität im Hintergrund.
- Netzwerkanfragen erfolgen nur, wenn Sie auf Links klicken (Docs, GitHub, Donate).

---
