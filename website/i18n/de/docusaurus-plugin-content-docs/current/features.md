---
id: features
title: Funktionen
sidebar_label: Funktionen
---

---

## Funktionen {#features}

- Hängt beim Antworten automatisch Dateien aus der ursprünglichen E-Mail an.
- Konfigurierbares Verhalten: Anhänge können
  - automatisch hinzugefügt werden oder
  - erst nach Bestätigung hinzugefügt werden (ein kleines, barrierefreies Dialogfenster). In den Optionen können Sie die Bestätigung aktivieren und die Standardantwort (Ja/Nein) wählen.
- Eine Blockliste von Dateinamen (Glob-Muster) verhindert, dass bestimmte Dateien automatisch angehängt werden. Beispiele: `*intern*`, `*secret*`, `*passwor*`.
  Die Prüfung ignoriert die Groß-/Kleinschreibung und betrachtet nur den Dateinamen; geben Sie in den Optionen pro Zeile ein Muster an.
- Blocklisten-Warnung (optional, standardmäßig aktiviert): Wenn Dateien durch Ihre Blockliste ausgeschlossen werden, listet ein kleines modales Fenster die Datei und das/die passende(n) Muster auf. Dunkelmodus‑freundlich und per Tastatur bedienbar (Enter/Esc zum Schließen).
- Funktioniert mit Antworten und Allen antworten. Weiterleiten wird von diesem Add-on nicht verändert.
- Fügt Originalanhänge hinzu, selbst wenn Sie bereits etwas selbst angehängt haben; vermeidet Duplikate anhand des Dateinamens.
- Ein Duplikatschutz pro Tab verhindert doppeltes Hinzufügen im selben Verfassen-Tab.
- Überspringt S/MIME-Zertifikate und Inline-Bilder, um unnötige Anhänge zu vermeiden.

---

## So funktioniert es {#how-it-works}

- Beim Antworten listet das Add-on die ursprünglichen Anhänge auf.
- Filtert S/MIME-Signaturen und Inline-Bilder heraus.
- Fragt optional nach einer Bestätigung (tastaturfreundlich).
- Fügt geeignete Dateien im Verfassen-Fenster hinzu und vermeidet Duplikate anhand des Dateinamens.
- Siehe “Warum Anhänge möglicherweise nicht hinzugefügt werden” unter Verwendung für Sonderfälle.

Datenschutzhinweis: Die gesamte Verarbeitung erfolgt lokal in Thunderbird. Das Add-on führt keine Netzwerkzugriffe im Hintergrund aus.

---
