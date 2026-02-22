---
id: support
title: 'Unterstützung'
sidebar_label: 'Unterstützung'
---

---

## FAQ {#faq}

### Anhänge wurden nicht hinzugefügt — warum?

- Inline‑Bilder und S/MIME‑Teile sind absichtlich ausgeschlossen.
- Doppelte Dateinamen werden übersprungen, wenn das Verfassenfenster bereits dieselbe Datei enthält.
- Blacklist‑Muster können Kandidaten herausfiltern; siehe [Konfiguration](configuration#blacklist-glob-patterns).

### Kann ich vor dem Hinzufügen von Anhängen bestätigen?

Ja. Aktivieren Sie „Vor dem Hinzufügen von Anhängen nachfragen“ unter [Konfiguration → Bestätigung](configuration#confirmation). Tastatur: Y/J = Ja, N/Esc = Nein.

### Sendet das Add‑on Daten oder zeichnet die Nutzung auf?

Nein. Siehe [Datenschutz](privacy) — keine Telemetrie und keine Netzwerkzugriffe im Hintergrund.

### Weiterleiten fügt keine Anhänge hinzu — ist das erwartungsgemäß?

Ja. Nur Antworten und Allen antworten werden von diesem Add‑on geändert; Weiterleiten bleibt unverändert. Siehe [Einschränkungen](usage#limitations).

### Wo ist das Spenden‑Snooze?

Optionen → Bereich Support. Siehe [Spenden‑Sichtbarkeit](configuration#donation-visibility).

---

## Unterstützung

Brauchen Sie Hilfe oder möchten Sie einen Fehler melden?

---

### Ein Issue auf GitHub eröffnen:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Issues: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Geben Sie Thunderbird‑Version (z. B. 128 ESR), Betriebssystem und Schritte zum Reproduzieren an
- Fügen Sie relevante Protokolle aus der Thunderbird‑Fehlerkonsole bei (Extras → Entwickler‑Werkzeuge → Fehlerkonsole)

- Add‑ons‑Website (ATN): Sie können auch über die [Add‑on‑Seite](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) Feedback hinterlassen.

---

### Tipps

- Stellen Sie sicher, dass Sie eine unterstützte Thunderbird‑Version verwenden (128 ESR oder neuer).
- Prüfen Sie die Dokumentation zu Konfiguration und Nutzung bei häufigen Einrichtungsfragen.
- Für Entwicklung/Tests siehe den Entwicklungsleitfaden.
- Wenn gespeicherte Einstellungen scheinbar nicht korrekt angewendet werden, starten Sie Thunderbird neu und versuchen Sie es erneut. (Thunderbird kann Status über Sitzungen hinweg zwischenspeichern; ein Neustart stellt sicher, dass frische Einstellungen geladen werden.)
- Minimales Repro: Versuchen Sie es mit einer kleinen Testmail mit ein oder zwei einfachen Dateianhängen.
- Vergleichen Sie das Verhalten mit Bestätigung EIN vs. AUS, um einzugrenzen, ob der Dialogablauf beteiligt ist.

---

### Was in einen Bericht gehört

- Thunderbird‑Version und Betriebssystem
- Genaue Schritte zum Reproduzieren (was Sie getan haben, was Sie erwartet haben, was passiert ist)
- Ob die Bestätigung aktiviert war und welche Standardantwort eingestellt ist
- Ein Beispiel Ihrer Blacklist‑Muster (falls relevant)
- Protokolle der Fehlerkonsole beim Reproduzieren (Extras → Entwickler‑Werkzeuge → Fehlerkonsole)
- Debug‑Protokollierung aktivieren (optional):
  - In der Thunderbird‑Fehlerkonsole ausführen: `messenger.storage.local.set({ debug: true })`
  - Das Problem reproduzieren und relevante `[RWA]` Logzeilen kopieren

---

### Issue‑Vorlage (kopieren/einfügen) {#issue-template}

- Thunderbird‑Version und Betriebssystem:
- Schritte zum Reproduzieren:
- Bestätigung aktiviert? Standardantwort:
- Beispiel‑Blacklist‑Muster:
- Fehlerkonsolen‑Protokolle (Extras → Entwickler‑Werkzeuge → Fehlerkonsole):
- Alles Weitere Relevante:

---

### Spenden

Wenn Sie dieses Projekt unterstützen möchten, erwägen Sie bitte einen kleinen Beitrag auf der Seite [Spenden](donation). Vielen Dank!

---
