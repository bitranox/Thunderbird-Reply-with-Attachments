---
id: support
title: 'Unterstützung'
sidebar_label: 'Unterstützung'
---

## FAQ {#faq}

### Anhänge wurden nicht hinzugefügt — warum?

- Inline-Bilder und S/MIME-Teile sind absichtlich ausgeschlossen.
- Duplikate von Dateinamen werden übersprungen, wenn die E-Mail bereits dieselbe Datei enthält.
- Blacklist-Muster können Kandidaten filtern; siehe [Konfiguration](configuration#blacklist-glob-patterns).

### Kann ich bestätigen, bevor ich Anhänge hinzufüge?

Ja. Aktiviere „Vor dem Hinzufügen von Anhängen fragen“ unter [Konfiguration → Bestätigung](configuration#confirmation). Tastatur: Y/J = Ja, N/Esc = Nein.

### Sendet das Add-on irgendwelche Daten oder verfolgt die Nutzung?

Nein. Siehe [Datenschutz](privacy) — keine Telemetrie und keine Hintergrundnetzwerkanfragen.

### Weiterleiten fügt keine Anhänge hinzu — ist das zu erwarten?

Ja. Nur Antworten und Allen antworten werden von diesem Add-on modifiziert; Weiterleiten bleibt unverändert. Siehe [Einschränkungen](usage#limitations).

### Wo ist das Spenden-Snooze?

Optionen → Unterstützungsbereich. Siehe [Spenden-Sichtbarkeit](configuration#donation-visibility).

---

## Unterstützung

Brauchst du Hilfe oder möchtest du einen Fehler melden?

---

### Ein Problem auf GitHub melden:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Issues: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Thunderbird-Version (z.B. 128 ESR), Betriebssystem und Schritte zur Reproduktion angeben
- Relevante Protokolle aus der Fehlerkonsole von Thunderbird anhängen (Extras → Entwicklertools → Fehlerkonsole)

- Add-on-Seite (ATN): Du kannst auch Feedback über die [Add-on-Seite](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) hinterlassen.

---

### Tipps

- Stelle sicher, dass du eine unterstützte Thunderbird-Version (128 ESR oder neuer) verwendest.
- Überprüfe die Dokumentation zu Konfiguration und Nutzung für häufige Einrichtungfragen.
- Für Entwicklung/Tests siehe den Entwicklungsleitfaden.
- Wenn gespeicherte Einstellungen scheinbar nicht richtig angewendet werden, starte Thunderbird neu und versuche es erneut. (Thunderbird kann den Status über Sitzungen hinweg cachen; ein Neustart garantiert, dass frische Einstellungen geladen werden.)
- Minimale Reproduktion: Probiere es mit einer kleinen Test-E-Mail, die ein oder zwei einfache Datei-Anhänge enthält.
- Vergleiche das Verhalten mit aktivierter und deaktivierter Bestätigung, um herauszufinden, ob der Dialogfluss betroffen ist.

---

### Was in einem Bericht enthalten sein sollte

- Thunderbird-Version und Betriebssystem
- Exakte Schritte zur Reproduktion (was du getan hast, was du erwartet hast, was passiert ist)
- Ob die Bestätigung aktiviert war und deine Standard-Antwort-Einstellung
- Eine Beispiel deiner Blacklist-Muster (falls relevant)
- Protokolle der Fehlerkonsole während der Reproduktion (Extras → Entwicklertools → Fehlerkonsole)
- Debug-Logging aktivieren (optional):
  - In der Fehlerkonsole von Thunderbird ausführen: `messenger.storage.local.set({ debug: true })`
  - Das Problem reproduzieren und die relevanten `[RWA]` Protokollzeilen kopieren

---

### Issues-Vorlage (Kopieren/Einfügen) {#issue-template}

- Thunderbird-Version und Betriebssystem:
- Schritte zur Reproduktion:
- Bestätigung aktiviert? Standardantwort:
- Beispiel-Blacklist-Muster:
- Protokolle der Fehlerkonsole (Extras → Entwicklertools → Fehlerkonsole):
- Sonst noch relevant:

---

### Spenden

Wenn du dieses Projekt unterstützen möchtest, ziehe bitte einen kleinen Beitrag auf der [Spenden](donation)-Seite in Betracht. Vielen Dank!
