---
id: changelog
title: 'Änderungsprotokoll'
---

---

## Änderungsprotokoll

Für die vollständige, detaillierte Historie siehe die
[CHANGELOG.md auf GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md) des Repositorys.

- 2.4.0: Bilder werden nicht mehr nur deshalb verworfen, weil der Absender eine `Content-ID` darauf gesetzt hat; die Option "Include inline pictures" ist entfallen, da Thunderbird eingebettete Bilder ohnehin selbst im Antworttext behält; Links öffnen sich jetzt im Systembrowser; eine Obergrenze von 50 Anhängen / 100 MB pro Antwort, wobei alles Ausgelassene gemeldet wird.
- 2.3.2: "Include inline pictures" bettete eingebettete Bilder als base64-Daten-URIs in den Antworttext ein (nach der add-ons.thunderbird.net-Prüfung wieder entfernt; Thunderbird erledigt das selbst); Verbesserungen der Codequalität und erweiterte Testabdeckung.
- 2.3.1: Behält Anhänge bei, nachdem Thunderbird die Hintergrund-Event-Seite in den Leerlauf versetzt; fügt gezielte Debug-Hooks zur Fehlersuche hinzu.
- 2.3.0: Verfeinerte Deduplizierung von Anhängen, erweiterte Testabdeckung und Entfernung veralteter Berechtigungen zur Erfüllung der AMO-Richtlinien.
- 2.1.0: Umfassende Internationalisierungsunterstützung für die Top 100 Sprachen
- 2.0.0: Neuschreibung zu einer vollwertigen Version (EN/DE)
- 1.0.1: umgestellt auf messages.listAttachments()
- 1.0.0: Erstveröffentlichung

---

## Veröffentlichungstermine und Kanäle {#dates-and-channels}

- Veröffentlichungen auf ATN können sich um einige Stunden nach dem Paketieren verzögern.
- LOCAL-Builds sind ausschließlich für Entwicklertests und werden nicht über ATN verteilt.

---
