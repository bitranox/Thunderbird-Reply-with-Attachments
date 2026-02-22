---
id: usage
title: 'Verwendung'
sidebar_label: 'Verwendung'
---

---

## Verwendung {#usage}

- Antworten, und das Add‑on fügt die Originale automatisch hinzu — oder fragt vorher nach, falls in den Optionen aktiviert.
- Dedupliziert nach Dateinamen; S/MIME‑Teile werden immer übersprungen. Inline‑Bilder werden standardmäßig im Antworttext wiederhergestellt (deaktivieren über „Inline‑Bilder einfügen“ in den Optionen).
- Gesperrte Anhänge werden ebenfalls übersprungen (Groß-/Kleinschreibung‑unabhängige Glob‑Muster, die Dateinamen, nicht Pfade, abgleichen). Siehe [Konfiguration](configuration#blacklist-glob-patterns).

---

### Was beim Antworten passiert {#what-happens}

- Antwort erkennen → Originalanhänge auflisten → S/MIME + Inline filtern → optional bestätigen → berechtigte Dateien hinzufügen (Duplikate überspringen) → Inline‑Bilder im Text wiederherstellen.

Strenger vs. entspannter Durchlauf: Das Add‑on schließt zunächst S/MIME‑ und Inline‑Teile von Datei‑Anhängen aus. Wenn nichts infrage kommt, führt es einen entspannteren Durchlauf aus, der weiterhin S/MIME/Inline ausschließt, aber mehr Fälle toleriert (siehe Code‑Details). Inline‑Bilder werden niemals als Datei‑Anhänge hinzugefügt; stattdessen werden sie, wenn „Inline‑Bilder einfügen“ aktiviert ist (der Standard), direkt im Antworttext als Base64‑Data‑URIs eingebettet.

| Teiltyp                                                 |                           Strenger Durchlauf |                        Entspannter Durchlauf |
| ------------------------------------------------------- | -------------------------------------------: | -------------------------------------------: |
| S/MIME‑Signaturdatei `smime.p7s`                        |                               Ausgeschlossen |                               Ausgeschlossen |
| S/MIME‑MIME‑Typen (`application/pkcs7-*`)               |                               Ausgeschlossen |                               Ausgeschlossen |
| Durch Content‑ID referenziertes Inline‑Bild (`image/*`) | Ausgeschlossen (im Text wiederhergestellt\*) | Ausgeschlossen (im Text wiederhergestellt\*) |
| Angehängte E‑Mail (`message/rfc822`) mit Dateinamen     |                            Nicht hinzugefügt |                      Kann hinzugefügt werden |
| Regulärer Dateianhang mit Dateinamen                    |                      Kann hinzugefügt werden |                      Kann hinzugefügt werden |

\* Wenn „Inline‑Bilder einfügen“ aktiviert ist (Standard: EIN), werden Inline‑Bilder im Antworttext als Base64‑Data‑URIs eingebettet statt als Datei‑Anhänge hinzugefügt. Siehe [Konfiguration](configuration#include-inline-pictures).

Beispiel: Bei einigen Anhängen fehlen möglicherweise bestimmte Header, sie sind aber dennoch reguläre Dateien (nicht Inline/S/MIME). Findet der strenge Durchlauf keine, kann der entspannte Durchlauf diese akzeptieren und anhängen.

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
| --------------- | ------------------------------------ |
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

- Inline‑Bilder werden nicht als Datei‑Anhänge hinzugefügt. Wenn „Inline‑Bilder einfügen“ EIN ist (der Standard), werden sie stattdessen im Antworttext als Data‑URIs eingebettet. Ist die Einstellung AUS, werden Inline‑Bilder vollständig entfernt. Siehe [Konfiguration](configuration#include-inline-pictures).
- S/MIME‑Signaturteile sind absichtlich ausgeschlossen: Dateinamen wie `smime.p7s` und MIME‑Typen wie `application/pkcs7-signature` oder `application/pkcs7-mime` werden übersprungen.
- Blacklist‑Muster können Kandidaten herausfiltern: siehe [Konfiguration](configuration#blacklist-glob-patterns); die Übereinstimmung ist groß-/kleinschreibungsunabhängig und nur auf den Dateinamen bezogen.
- Doppelte Dateinamen werden nicht erneut hinzugefügt: Wenn das Verfassen‑Fenster bereits eine Datei mit demselben normalisierten Namen enthält, wird sie übersprungen.
- Nicht‑Datei‑Teile oder fehlende Dateinamen: Es werden nur dateiähnliche Teile mit verwendbaren Dateinamen zum Hinzufügen berücksichtigt.

---

Siehe auch

- [Konfiguration](configuration)
