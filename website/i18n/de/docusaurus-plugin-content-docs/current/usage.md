---
id: usage
title: Verwendung
sidebar_label: Verwendung
---

## Verwendung

- Beim Antworten fügt die Erweiterung die Originalanhänge automatisch hinzu – oder fragt zuerst nach, wenn die Option in den Einstellungen aktiviert ist.
- Deduplizierung nach Dateiname; SMIME und Inline‑Bilder werden immer übersprungen.
- Geblacklistete Anhänge werden ebenfalls übersprungen (Groß-/Kleinschreibung egal, Glob‑Muster).

---

## Verhaltensdetails

- Duplikatvermeidung: Der Add‑on markiert den Compose‑Tab als verarbeitet (per Tab‑Sitzungswert und In‑Memory‑Schutz) und fügt Originale nicht doppelt hinzu.
- Vorhandene Anhänge respektieren: Wenn bereits Anhänge im Entwurf vorhanden sind, werden Originale genau einmal ergänzt; vorhandene Dateinamen werden übersprungen.
- Ausschlüsse: SMIME‑Artefakte (z. B. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) und Inline‑Bilder werden ignoriert. Wenn beim ersten Durchgang nichts qualifiziert, prüft ein entspannter Fallback erneut nicht‑SMIME‑Teile.
