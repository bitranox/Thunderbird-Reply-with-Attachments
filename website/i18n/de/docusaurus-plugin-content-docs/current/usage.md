---
id: usage
title: 'Verwendung'
sidebar_label: 'Verwendung'
---

---

## Verwendung {#usage}

- Antworten, und das Add‑on fügt die Originale automatisch hinzu — oder fragt vorher nach, falls in den Optionen aktiviert.
- Duplikate werden anhand des Dateinamens entfernt; S/MIME-Teile werden immer übersprungen. Bilder, die in der ursprünglichen Nachricht eingebettet sind, verbleiben im Textkörper der Antwort, wo Thunderbird sie platziert, und werden nicht als Dateien kopiert.
- Gesperrte Anhänge werden ebenfalls übersprungen (Groß-/Kleinschreibung‑unabhängige Glob‑Muster, die Dateinamen, nicht Pfade, abgleichen). Siehe [Konfiguration](configuration#blacklist-glob-patterns).

---

### Was beim Antworten passiert {#what-happens}

- Antwort erkennen → ursprüngliche Anhänge auflisten → S/MIME und eingebettete Bilder überspringen → optionale Bestätigung → geeignete Dateien hinzufügen (Duplikate überspringen).

| Teiltyp                                                    | Wird in die Antwort kopiert     |
|------------------------------------------------------------|--------------------------------:|
| S/MIME-Signaturdatei `smime.p7s`                           | Nein                            |
| S/MIME-MIME-Typen (`application/pkcs7-*`)                  | Nein                            |
| Bild, das der Nachrichtentext per `cid:` einbettet         | Nein (es befindet sich im Text) |
| Bild, das als `Content-Disposition: inline` markiert ist   | Nein (es befindet sich im Text) |
| Bild mit einer `Content-ID`, auf die der Text nie verweist | Ja                              |
| Angehängte E-Mail (`message/rfc822`) mit einem Dateinamen  | Ja                              |
| Normaler Dateianhang mit einem Dateinamen                  | Ja                              |

Ein Bild gilt nur dann als eingebettet, wenn die ursprüngliche Nachricht tatsächlich darauf verweist,
oder wenn der Absender es ausdrücklich als `Content-Disposition: inline` markiert hat. Ein bloßer
`Content-ID`-Header reicht nicht aus: Mehrere Mail-Clients setzen einen auf jeden Bildteil,
einschließlich echter Anhänge, und diese müssen trotzdem kopiert werden.

---

### Querverweis {#cross-reference}

- Weiterleiten wird absichtlich nicht verändert (siehe Einschränkungen unten).
- Gründe, warum ein Anhang möglicherweise nicht hinzugefügt wird, siehe „Warum Anhänge möglicherweise nicht hinzugefügt werden“.

---

## Verhaltensdetails {#behavior-details}

- **Duplikatvermeidung:** Das Add‑on markiert den Verfassen‑Tab als verarbeitet, mithilfe eines pro‑Tab‑Sitzungswerts und einer In‑Memory‑Sperre. Es fügt Originale nicht zweimal hinzu.
- Das Schließen und erneute Öffnen eines Verfassen‑Fensters wird als neuer Tab behandelt (d. h. ein neuer Versuch ist zulässig).
- **Vorhandene Anhänge respektieren:** Wenn das Verfassen‑Fenster bereits einige Anhänge enthält, werden Originale trotzdem genau einmal hinzugefügt; dabei werden bereits vorhandene Dateinamen übersprungen.
- **Ausschlüsse:** S/MIME‑Artefakte und Inline‑Bilder werden von Datei‑Anhängen ausgeschlossen. Wenn im ersten Durchlauf nichts infrage kommt, überprüft ein entspannter Fallback die Nicht‑S/MIME‑Teile erneut. Inline‑Bilder werden separat behandelt: Sie werden im Antworttext als Data‑URIs wiederhergestellt (wenn aktiviert).
  - **Dateinamen:** `smime.p7s`
  - **MIME‑Typen:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline‑Bilder:** jeder `image/*`‑Teil, der per Content‑ID referenziert wird — von Datei‑Anhängen ausgeschlossen, aber im Antworttext eingebettet, wenn „Inline‑Bilder einfügen“ EIN ist
  - **Angehängte E‑Mails (`message/rfc822`):** werden als reguläre Anhänge behandelt, wenn sie einen Dateinamen haben; sie können hinzugefügt werden (vorbehaltlich Duplikatprüfung und Blacklist).
- **Blacklist‑Warnung (falls aktiviert):** Wenn Kandidaten durch Ihre Blacklist ausgeschlossen werden,
  zeigt das Add‑on ein kleines Modal mit den betroffenen Dateien und den passenden
  Muster(n) an. Diese Warnung erscheint auch in Fällen, in denen keine Anhänge
  hinzugefügt werden, weil alles ausgeschlossen wurde.

---

## Tastenkürzel {#keyboard-shortcuts}

- Bestätigungsdialog: Y/J = Ja, N/Esc = Nein; Tab/Shift+Tab und Pfeiltasten wechseln den Fokus.
  - Die „Standardantwort“ in der [Konfiguration](configuration#confirmation) legt die anfangs fokussierte Schaltfläche fest.
  - Enter löst die fokussierte Schaltfläche aus. Tab/Shift+Tab und Pfeile verschieben den Fokus für die Barrierefreiheit.

### Tastatur‑Spickzettel {#keyboard-cheat-sheet}

| Tasten          | Aktion                               |
|-----------------|--------------------------------------|
| Y / J           | Ja bestätigen                        |
| N / Esc         | Nein bestätigen                      |
| Enter           | Fokussierte Schaltfläche aktivieren  |
| Tab / Shift+Tab | Fokus vor/zurück bewegen             |
| Pfeiltasten     | Fokus zwischen Schaltflächen bewegen |
| Standardantwort | Setzt Anfangsfokus (Ja oder Nein)    |

---

## Einschränkungen {#limitations}

- Weiterleiten wird von diesem Add‑on nicht verändert (Antworten und Allen antworten werden unterstützt).
- Sehr große Anhänge können den Beschränkungen von Thunderbird oder Ihres Providers unterliegen.
  - Das Add‑on teilt oder komprimiert Dateien nicht; es verlässt sich auf Thunderbirds normale Handhabung von Anhängen.
- Verschlüsselte Nachrichten: S/MIME‑Teile werden absichtlich ausgeschlossen.

---

## Warum Anhänge möglicherweise nicht hinzugefügt werden {#why-attachments-might-not-be-added}

- Bilder, die die ursprüngliche Nachricht einbettet, werden nicht als Dateien kopiert. Sie stehen bereits im Antworttext, wo Thunderbird sie platziert hat. Siehe [Konfiguration](configuration#include-inline-pictures).
- S/MIME‑Signaturteile sind absichtlich ausgeschlossen: Dateinamen wie `smime.p7s` und MIME‑Typen wie `application/pkcs7-signature` oder `application/pkcs7-mime` werden übersprungen.
- Blacklist‑Muster können Kandidaten herausfiltern: siehe [Konfiguration](configuration#blacklist-glob-patterns); die Übereinstimmung ist groß-/kleinschreibungsunabhängig und nur auf den Dateinamen bezogen.
- Doppelte Dateinamen werden nicht erneut hinzugefügt: Wenn das Verfassen‑Fenster bereits eine Datei mit demselben normalisierten Namen enthält, wird sie übersprungen.
- Nicht‑Datei‑Teile oder fehlende Dateinamen: Es werden nur dateiähnliche Teile mit verwendbaren Dateinamen zum Hinzufügen berücksichtigt.

---

Siehe auch

- [Konfiguration](configuration)
