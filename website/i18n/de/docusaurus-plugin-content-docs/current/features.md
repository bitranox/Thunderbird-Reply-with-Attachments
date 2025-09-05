---
id: features
title: Funktionen
sidebar_label: Funktionen
---

## Funktionen

- Fügt beim Antworten automatisch Anhänge aus der ursprünglichen E‑Mail hinzu.
- Konfigurierbares Verhalten: Anhänge können
  - automatisch hinzugefügt werden oder
  - erst nach Bestätigung (kleiner, barrierefreier Dialog) hinzugefügt werden.
    In den Einstellungen kannst du die Rückfrage aktivieren und die Standard‑Antwort (Ja/Nein) wählen.
- Blacklist von Dateinamen (Glob‑Muster) verhindert das automatische Anhängen bestimmter Dateien. Beispiele: `*.png`, `smime.*`, `*.p7s`.
  Die Prüfung ist nicht groß/kleinschreibungssensitiv, prüft nur den Dateinamen und akzeptiert ein Muster pro Zeile in den Einstellungen.
- Ergänzt Originalanhänge auch dann, wenn du bereits eigene Dateien angehängt hast; vermeidet Duplikate anhand des Dateinamens.
- Überspringt SMIME‑Zertifikate und Inline‑Bilder, um unnötige Anhänge zu vermeiden.
