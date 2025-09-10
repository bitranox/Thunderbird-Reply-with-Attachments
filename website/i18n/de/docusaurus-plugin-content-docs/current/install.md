---
id: install
title: Installation
slug: /install
sidebar_label: Installation
---

---

## Installation über "Thunderbird Add-ons und Themes" {#installation-in-thunderbird-recommended}

Dies ist die empfohlene Installationsmethode; auf diese Weise erhalten Sie automatische Updates.

1. Gehen Sie in Thunderbird zu **Extras > Add-ons und Themes**.
2. Suchen Sie nach "reply with attachments".
3. Fügen Sie das Add-on hinzu.

Oder öffnen Sie die Add‑on-Seite direkt: https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments

---

## Lokale Installation {#local-installation-in-thunderbird}

### XPI-Datei herunterladen {#download-the-xpi-file}

1. Gehen Sie zur [Thunderbird-Add‑on-Seite](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Laden Sie die neueste Version des Add-ons als XPI-Datei (`reply_with_attachments-x.y.z-tb.xpi`) herunter.

### In Thunderbird installieren {#install-in-thunderbird-local}

1. Öffnen Sie Thunderbird.
2. Gehen Sie zu **Extras > Add-ons und Themes**.
3. Klicken Sie im **Add-ons-Manager** auf das Zahnradsymbol oben rechts.
4. Wählen Sie im Menü **Add-on aus Datei installieren…**.
5. Wählen Sie die heruntergeladene `reply_with_attachments-x.y.z-tb.xpi`-Datei aus.
6. Bestätigen Sie die Installation, wenn Sie dazu aufgefordert werden.

---

## Installation für die Entwicklung {#installation-for-development}

### Repository herunterladen {#download-the-repository}

1. Laden Sie die neueste Version des GitHub-Repositories herunter.
2. Führen Sie `make help` für weitere Informationen aus.

### In Thunderbird installieren {#install-in-thunderbird-dev}

1. Öffnen Sie Thunderbird.
2. Gehen Sie zu **Extras > Add-ons und Themes**.
3. Klicken Sie im **Add-ons-Manager** auf das Zahnradsymbol oben rechts.
4. Wählen Sie im Menü **Add-on aus Datei installieren…**.
5. Wählen Sie die erzeugte Datei `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` aus.
6. Bestätigen Sie die Installation, wenn Sie dazu aufgefordert werden.

Hinweis: Falls Thunderbird die `.zip` auf Ihrem System nicht akzeptiert, benennen Sie sie in `.xpi` um und versuchen Sie „Add‑on aus Datei installieren…“ erneut.

### Wo finde ich das LOCAL-ZIP {#where-local-zip}

- Nach dem Packen finden Sie das „LOCAL“-ZIP im Repository-Stammverzeichnis (z. B. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Bevor Sie zum Testen erneut paketieren, erhöhen Sie die Versionen sowohl in `sources/manifest_ATN.json` als auch in `sources/manifest_LOCAL.json`.

---
