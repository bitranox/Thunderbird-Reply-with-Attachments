---
id: features
title: Funktionen
sidebar_label: Funktionen
---

## Funktionen

- Fügt beim Antworten automatisch Dateien aus der ursprünglichen E‑Mail an.
- Konfigurierbares Verhalten: Anhänge können
  - automatisch hinzugefügt werden, oder
  - nur nach Bestätigung hinzugefügt werden (ein kleiner, barrierefreier Dialog). In den Optionen können Sie
    die Bestätigung aktivieren und die Standardantwort (Ja/Nein) festlegen.
- Blacklist für Dateinamen (Glob‑Muster) verhindert, dass bestimmte Dateien automatisch
  angehängt werden. Beispiele: `*intern*`, `*secret*`, `*passwor*`.
  Die Übereinstimmung erfolgt ohne Beachtung der Groß‑/Kleinschreibung und prüft nur den Dateinamen; geben Sie
  in den Optionen pro Zeile ein Muster an.
- Blacklist‑Warnung (optional, standardmäßig aktiviert): Wenn Dateien durch Ihre
  Blacklist ausgeschlossen werden, listet ein kleines modales Fenster die Datei und die passenden Muster auf. Dark‑Mode‑freundlich und per Tastatur bedienbar (Enter/Esc zum Schließen).
- Funktioniert mit Antworten und Allen antworten. Weiterleiten wird von diesem Add‑on nicht verändert.
- Fügt Originale hinzu, selbst wenn Sie bereits etwas angehängt haben; vermeidet Duplikate anhand des Dateinamens.
- Schutz vor Duplikaten pro Tab verhindert das doppelte Hinzufügen im selben Verfassen‑Tab.
- Überspringt S/MIME‑Zertifikate und Inline‑Bilder, um unnötige Anhänge zu vermeiden.
