---
id: features
title: 'Funktionen'
sidebar_label: 'Funktionen'
---

---

## Funktionen {#features}

- Hängt beim Antworten automatisch Dateien aus der Original‑E‑Mail an.
- Konfigurierbares Verhalten: Anhänge können
  - automatisch hinzugefügt werden, oder
  - erst nach Bestätigung hinzugefügt werden (ein kleiner, barrierefreier Dialog). In den Optionen
    können Sie die Bestätigung aktivieren und die Standardantwort (Ja/Nein) wählen.
- Blacklist von Dateinamen (Glob‑Muster) verhindert, dass bestimmte Dateien
  automatisch angehängt werden. Beispiele: `*intern*`, `*secret*`, `*passwor*`.
  Die Übereinstimmung ist unabhängig von der Groß-/Kleinschreibung und prüft nur den Dateinamen; geben Sie in den Optionen
  pro Zeile ein Muster an.
- Blacklist‑Warnung (optional, standardmäßig aktiviert): Wenn Dateien durch Ihre
  Blacklist ausgeschlossen werden, listet ein kleines Modal die Datei und das/die passende(n) Muster auf. Dunkelmodus‑
  freundlich und tastaturzugänglich (Enter/Esc zum Schließen).
- Funktioniert mit Antworten und Allen antworten. Weiterleiten wird von diesem Add‑on nicht verändert.
- Fügt Originale hinzu, selbst wenn Sie bereits etwas angehängt haben; vermeidet Duplikate anhand des Dateinamens.
- Pro‑Tab‑Duplikatschutz verhindert doppeltes Hinzufügen im selben Verfassen‑Tab.
- Überspringt S/MIME‑Zertifikate standardmäßig, um unnötige Anhänge zu vermeiden.
- Inline‑Bilder einschließen (Standard: EIN). Eingebettete Bilder werden direkt im
  Antworttext als base64‑Daten‑URIs wiederhergestellt und bewahren das ursprüngliche Inline‑Layout. In den
  Optionen deaktivieren, um Inline‑Bilder vollständig zu überspringen.

---

## So funktioniert es {#how-it-works}

- Beim Antworten listet das Add‑on die ursprünglichen Anhänge auf.
- Filtert S/MIME‑Signaturen aus Datei‑Anhängen heraus; Inline‑Bilder werden im Textkörper wiederhergestellt (sofern deaktiviert).
- Fragt optional nach Bestätigung (tastaturfreundlich).
- Fügt geeignete Dateien Ihrem Verfassenfenster hinzu und vermeidet Duplikate anhand des Dateinamens.
- Siehe „Warum Anhänge möglicherweise nicht hinzugefügt werden“ unter Nutzung für Sonderfälle.

Hinweis zum Datenschutz: Die gesamte Verarbeitung erfolgt lokal in Thunderbird. Das Add‑on stellt keine Netzwerkanfragen im Hintergrund.

---
