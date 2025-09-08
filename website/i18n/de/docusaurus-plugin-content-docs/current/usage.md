---
id: usage
title: Verwendung
sidebar_label: Nutzung
---

## Verwendung

- Antworten, und das Add‑on fügt Originale automatisch hinzu — oder fragt zuerst, falls in den Optionen aktiviert.
- Dedupliziert nach Dateinamen; S/MIME und Inline‑Bilder werden stets übersprungen.
- Auf der Blacklist stehende Anhänge werden ebenfalls übersprungen (Groß-/Kleinschreibung ignorierende Glob‑Muster, die Dateinamen, nicht Pfade, abgleichen). Siehe [Konfiguration](configuration#blacklist-glob-patterns).

---

## Details zum Verhalten

- Duplikatvermeidung: Das Add‑on markiert die Verfassen‑Registerkarte als verarbeitet, indem es einen pro‑Tab‑Sitzungswert und einen In‑Memory‑Schutz verwendet. Es fügt Originale nicht zweimal hinzu.
- Das Schließen und erneute Öffnen eines Verfassenfensters wird als neuer Tab behandelt (d. h., ein neuer Versuch ist zulässig).
- Vorhandene Anhänge respektieren: Wenn das Verfassenfenster bereits Anhänge enthält, werden Originale dennoch genau einmal hinzugefügt; Dateinamen, die bereits existieren, werden übersprungen.
- Ausschlüsse: S/MIME‑Artefakte und Inline‑Bilder werden ignoriert. Falls beim ersten Durchlauf nichts qualifiziert, prüft ein lockererer Fallback die Nicht‑S/MIME‑Teile erneut.
  - Dateinamen: `smime.p7s`
  - MIME‑Typen: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline‑Bilder: jeder `image/*`‑Teil, der im Nachrichtenrumpf per Content‑ID referenziert wird
- Blacklist‑Warnung (falls aktiviert): Wenn Kandidaten durch Ihre Blacklist ausgeschlossen werden,
  zeigt das Add‑on ein kleines modales Fenster mit den betroffenen Dateien und dem/den passenden
  Muster(n). Diese Warnung erscheint auch in Fällen, in denen keine Anhänge hinzugefügt werden,
  weil alles ausgeschlossen wurde.

---

## Tastenkürzel

- Bestätigungsdialog: Y/J = Ja, N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten durchlaufen den Fokus.
  - Die „Standardantwort“ in [Konfiguration](configuration#confirmation) legt die initial fokussierte Schaltfläche fest.

---

## Einschränkungen

- Weiterleiten wird von diesem Add‑on nicht verändert (Antworten und Allen antworten werden unterstützt).
- Sehr große Anhänge können den Beschränkungen von Thunderbird oder Ihres Anbieters unterliegen.
- Verschlüsselte Nachrichten: S/MIME‑Teile werden bewusst ausgeschlossen.
