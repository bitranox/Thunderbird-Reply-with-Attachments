---
id: usage
title: Verwendung
sidebar_label: Verwendung
---

---

## Verwendung {#usage}

- Beim Antworten fügt das Add‑on die Originale automatisch hinzu — oder fragt zuerst nach, falls in den Optionen aktiviert.
- Dedupliziert nach Dateinamen; S/MIME und Inline‑Bilder werden immer übersprungen.
- Auf der Blacklist stehende Anhänge werden ebenfalls übersprungen (Groß‑/Kleinschreibung ignorierende Glob‑Muster, die auf Dateinamen passen, nicht auf Pfade). Siehe [Konfiguration](configuration#blacklist-glob-patterns).

---

### Was beim Antworten passiert {#what-happens}

- Antwort erkennen → Originalanhänge auflisten → S/MIME + Inline filtern → optional bestätigen → geeignete Dateien hinzufügen (Duplikate überspringen).

Strenger vs. entspannter Durchlauf: Das Add‑on schließt zuerst S/MIME‑ und Inline‑Teile aus. Wenn dann nichts in Frage kommt, führt es einen entspannteren Durchlauf aus, der S/MIME/Inline weiterhin ausschließt, aber mehr Fälle toleriert (siehe Code‑Details).

---

### Querverweis {#cross-reference}

- Weiterleiten wird absichtlich nicht verändert (siehe Einschränkungen unten).
- Zu Gründen, warum ein Anhang möglicherweise nicht hinzugefügt wird, siehe „Warum Anhänge möglicherweise nicht hinzugefügt werden“.

---

## Details zum Verhalten {#behavior-details}

- **Duplikatvermeidung:** Das Add‑on markiert den Verfassen‑Tab als verarbeitet mittels eines pro‑Tab‑Sitzungswerts und eines In‑Memory‑Schutzes. Es fügt Originale nicht zweimal hinzu.
- Das Schließen und erneute Öffnen eines Verfassen‑Fensters wird als neuer Tab behandelt (d. h., ein neuer Versuch ist erlaubt).
- **Vorhandene Anhänge respektieren:** Wenn der Verfassen‑Tab bereits einige Anhänge enthält, werden die Originale dennoch genau einmal hinzugefügt; Dateinamen, die bereits existieren, werden übersprungen.
- **Ausschlüsse:** S/MIME‑Artefakte und Inline‑Bilder werden ignoriert. Wenn auf dem ersten Durchlauf nichts qualifiziert, prüft ein entspannter Fallback nicht‑S/MIME‑Teile erneut.
  - **Dateinamen:** `smime.p7s`
  - **MIME‑Typen:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline‑Bilder:** jeder `image/*`‑Teil, der im Nachrichtenkörper per Content‑ID referenziert wird
- **Blacklist‑Warnung (falls aktiviert):** Wenn Kandidaten durch Ihre Blacklist ausgeschlossen werden,
  zeigt das Add‑on einen kleinen Modal‑Dialog mit den betroffenen Dateien und den passenden
  Muster(n). Diese Warnung erscheint auch in Fällen, in denen keine Anhänge hinzugefügt werden,
  weil alles ausgeschlossen wurde.

---

## Tastenkürzel {#keyboard-shortcuts}

- Bestätigungsdialog: Y/J = Ja, N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus.
  - Die „Standardantwort“ in der [Konfiguration](configuration#confirmation) legt die anfänglich fokussierte Schaltfläche fest.
  - Enter aktiviert die fokussierte Schaltfläche. Tab/Shift+Tab und Pfeiltasten verschieben den Fokus für die Barrierefreiheit.

---

## Einschränkungen {#limitations}

- Weiterleiten wird durch dieses Add‑on nicht verändert (Antworten und Allen antworten werden unterstützt).
- Sehr große Anhänge können den Limits von Thunderbird oder Ihrem Anbieter unterliegen.
- Verschlüsselte Nachrichten: S/MIME‑Teile werden absichtlich ausgeschlossen.

---

## Warum Anhänge möglicherweise nicht hinzugefügt werden {#why-attachments-might-not-be-added}

- Inline‑Bilder werden ignoriert: Teile, die über eine Content‑ID im Nachrichtenkörper referenziert werden, werden nicht als Dateien hinzugefügt.
- S/MIME‑Signaturteile sind bewusst ausgeschlossen: Dateinamen wie `smime.p7s` und MIME‑Typen wie `application/pkcs7-signature` oder `application/pkcs7-mime` werden übersprungen.
- Blacklist‑Muster können Kandidaten filtern: siehe [Konfiguration](configuration#blacklist-glob-patterns); die Übereinstimmung ist groß‑/kleinschreibungsunabhängig und bezieht sich nur auf den Dateinamen.
- Doppelte Dateinamen werden nicht erneut hinzugefügt: Wenn der Verfassen‑Tab bereits eine Datei mit demselben normalisierten Namen enthält, wird sie übersprungen.
- Nicht‑Datei‑Teile oder fehlende Dateinamen: Es werden nur dateiähnliche Teile mit verwendbaren Dateinamen zum Hinzufügen berücksichtigt.

---
