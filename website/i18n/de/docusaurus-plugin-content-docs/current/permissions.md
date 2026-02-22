---
id: permissions
title: 'Berechtigungen'
---

---

## Berechtigungen

:::note Minimale Berechtigungen
Dieses Add‑on fordert keine Host‑ (Web‑) Berechtigungen an. Das Add‑on erfasst keine Telemetrie und stellt keine Netzwerk‑Anfragen im Hintergrund. Siehe [Datenschutz](privacy).
:::

---

Das Add‑on fordert nur einen kleinen, fokussierten Satz an Berechtigungen an. Warum jede benötigt wird:

- `compose`: Verfassen‑Ereignisse beobachten, Anhänge in Ihrer Antwort auflisten/hinzufügen.
- `messagesRead`: Metadaten lesen und Anhangsdateien aus der Originalnachricht abrufen.
- `scripting`: den kleinen Bestätigungsdialog im Verfassen‑Fenster einfügen, wenn aktiviert.
- `windows`: als letzte Möglichkeit ein kleines Bestätigungs‑Popup öffnen, wenn Messaging fehlschlägt.
- `sessions`: eine pro‑Tab‑Markierung speichern, um doppelte Verarbeitung zu vermeiden.
- `storage`: Optionen dauerhaft speichern (Blockliste, Bestätigungsschalter, Standardantwort).
- `tabs`: gezieltes Messaging an den Verfassen‑Tab für Bestätigungsanfragen.

Zusätzliche Hinweise:

- Dieses Add‑on fordert keine Host‑Berechtigungen (Web‑Ursprünge) an.
- Die Berechtigung `tabs` wird nur verwendet, um beim Koordinieren des optionalen Bestätigungsdialogs gezielt den Verfassen‑Tab anzusprechen; sie wird nicht zum Lesen des Verlaufs oder zum Navigieren auf Seiten verwendet.

Dies ist im Quellcode dokumentiert und in der CI getestet. Das Add‑on erhebt keine Telemetrie.

---

### Zusammenfassung (Berechtigungen → Zweck) {#permissions-summary}

| Berechtigung          | Warum sie benötigt wird                                                             |
| --------------------- | ----------------------------------------------------------------------------------- |
| `compose`             | Verfassen‑Ereignisse beobachten; Anhänge in Ihrer Antwort auflisten und hinzufügen. |
| `messagesRead`        | Anhänge der Originalnachricht auflisten und die Dateidaten abrufen.                 |
| `scripting`           | Leichtgewichtiges UI für die Bestätigung einfügen/koordinieren, wenn aktiviert.     |
| `windows`             | Fallback‑Popup, falls Messaging fehlschlägt (selten).                               |
| `sessions`            | Eine pro‑Tab‑Markierung speichern, um doppelte Verarbeitung zu verhindern.          |
| `storage`             | Optionen persistent speichern (Blockliste, Bestätigungsschalter, Standardantwort).  |
| `tabs`                | Gezieltes Messaging an den Verfassen‑Tab für Bestätigungsanfragen.                  |
| (Host‑Berechtigungen) | Keine — das Add‑on fordert keine Web‑Ursprünge an.                                  |

---

## Nicht angefordert {#not-requested}

- `compose.save`, `compose.send` — das Add‑on speichert oder sendet keine E‑Mails in Ihrem Namen.

Siehe auch: [Datenschutz](privacy) — keine Telemetrie, kein Hintergrundnetzwerk, nur vom Benutzer initiierte Links.

---
