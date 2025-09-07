---
id: features
title: Funktionen
sidebar_label: Funktionen
---

## Funktionen

- Fügt beim Antworten automatisch Anhänge aus der ursprünglichen E‑Mail hinzu.
- Konfigurierbares Verhalten: Anhänge können
  - automatisch hinzugefügt werden, oder
  - nur nach Bestätigung (ein kleiner, barrierefreier Dialog) hinzugefügt werden. In den Einstellungen kannst du die Bestätigung aktivieren und die Standardantwort (Ja/Nein) wählen.
- Blacklist von Dateinamen (Glob‑Muster) verhindert das automatische Anhängen bestimmter Dateien. Beispiele: `*intern*`, `*secret*`, `*passwor*`.
  Die Prüfung ist nicht groß/kleinschreibungssensitiv und prüft nur den Dateinamen; in den Einstellungen jeweils ein Muster pro Zeile angeben.
- Blacklist‑Warnung (optional, standardmäßig aktiviert): Wenn Dateien durch deine Blacklist ausgeschlossen werden, zeigt ein kleines modales Fenster die Datei und die passenden Muster an. Dark‑Mode‑freundlich und mit Tastatur bedienbar (Enter/Esc zum Schließen).
- Ergänzt Originale auch dann, wenn du bereits eigene Dateien angehängt hast; vermeidet Duplikate anhand des Dateinamens.
- Überspringt SMIME‑Zertifikate und Inline‑Bilder, um unnötige Anhänge zu vermeiden.
