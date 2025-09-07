---
id: features
title: Funktionen
sidebar_label: Funktionen
---

## Funktionen

- Hängt beim Antworten automatisch Dateien aus der ursprünglichen E‑Mail an.
- Konfigurierbares Verhalten: Anhänge können
  - automatisch hinzugefügt werden, oder
  - nur nach Bestätigung hinzugefügt werden (ein kleines, barrierefreies Dialogfenster). In den Optionen können Sie die Bestätigung aktivieren und die Standardantwort wählen (Ja/Nein).
- Blacklist von Dateinamen (Glob‑Muster) verhindert, dass bestimmte Dateien automatisch angehängt werden. Beispiele: `*intern*`, `*secret*`, `*passwor*`. Die Übereinstimmung ignoriert Groß‑/Kleinschreibung und prüft nur den Dateinamen; geben Sie in den Optionen ein Muster pro Zeile an.
- Blacklist‑Warnung (optional, standardmäßig aktiviert): Wenn Dateien durch Ihre Blacklist ausgeschlossen werden, listet ein kleines Modal die Datei und das/die übereinstimmende(n) Muster auf. Dunkelmodus‑freundlich und per Tastatur bedienbar (Enter/Esc zum Schließen).
- Fügt Originale hinzu, selbst wenn Sie bereits etwas selbst angehängt haben; vermeidet Duplikate anhand des Dateinamens.
- Überspringt S/MIME‑Zertifikate und Inline‑Bilder, um unnötige Anhänge zu vermeiden.
