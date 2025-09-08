---
id: usage
title: Verwendung
sidebar_label: Verwendung
---

## Verwendung

- Antworten, und das Add‑on fügt Originale automatisch hinzu — oder fragt vorher nach, wenn in den Optionen aktiviert.
- De‑dupliziert nach Dateinamen; S/MIME und Inline‑Bilder werden immer übersprungen.
- Auf der Blacklist stehende Anhänge werden ebenfalls übersprungen (Groß-/Kleinschreibung ignorierende Glob‑Muster, die Dateinamen, nicht Pfade, abgleichen). Siehe [Konfiguration](configuration#blacklist-glob-patterns).

---

## Details zum Verhalten

- Duplikatvermeidung: Das Add‑on markiert den Verfassen‑Tab als verarbeitet, indem es einen Sitzungswert pro Tab und einen In‑Memory‑Wächter verwendet. Es fügt Originale nicht zweimal hinzu.
- Das Schließen und erneute Öffnen eines Verfassen‑Fensters wird als neuer Tab behandelt (d. h., ein neuer Versuch ist erlaubt).
- Vorhandene Anhänge respektieren: Wenn der Verfassen‑Tab bereits Anhänge enthält, werden Originale trotzdem genau einmal hinzugefügt; dabei werden Dateinamen übersprungen, die bereits existieren.
- Ausschlüsse: S/MIME‑Artefakte und Inline‑Bilder werden ignoriert. Wenn beim ersten Durchlauf nichts in Frage kommt, überprüft ein weniger strenger Fallback die Nicht‑S/MIME‑Teile erneut.
  - Dateinamen: `smime.p7s`
  - MIME‑Typen: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline‑Bilder: jeder `image/*`‑Teil, der im Nachrichtentext per Content‑ID referenziert wird
- Blacklist‑Warnung (falls aktiviert): Wenn Kandidaten durch Ihre Blacklist ausgeschlossen werden, zeigt das Add‑on ein kleines Modal, das die betroffenen Dateien und die passenden Muster auflistet. Diese Warnung erscheint auch in Fällen, in denen keine Anhänge hinzugefügt werden, weil alles ausgeschlossen wurde.

---

## Tastenkürzel

- Bestätigungsdialog: Y/J = Ja, N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus.
  - Die „Standardantwort“ in der [Konfiguration](configuration#confirmation) legt die zunächst fokussierte Schaltfläche fest.

---

## Einschränkungen

- Weiterleiten wird von diesem Add‑on nicht verändert (Antworten und Allen antworten werden unterstützt).
- Sehr große Anhänge können den Beschränkungen von Thunderbird oder Ihres Anbieters unterliegen.
- Verschlüsselte Nachrichten: S/MIME‑Teile werden absichtlich ausgeschlossen.
