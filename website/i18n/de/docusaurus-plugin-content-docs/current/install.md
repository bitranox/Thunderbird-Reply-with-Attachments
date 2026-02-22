---
id: install
title: 'Installation'
slug: /install
sidebar_label: 'Installation'
---

---

## Installation über "Thunderbird-Add-ons und -Themes" {#installation-in-thunderbird-recommended}

:::important Minimale Thunderbird-Version
Dieses Add‑on unterstützt Thunderbird **128 ESR oder neuer**. Ältere Versionen werden nicht unterstützt.
:::

Dies ist die empfohlene Installationsmethode. Aus ATN (addons.thunderbird.net) installierte Add‑ons erhalten automatische Updates. Lokale/Dev-Installationen werden nicht automatisch aktualisiert.

- Minimale Thunderbird-Version: 128 ESR oder neuer.

1. Wechseln Sie in Thunderbird zu **Extras > Add-ons und Themes**.
2. Suchen Sie nach "reply with attachments".
3. Fügen Sie das Add‑on hinzu.

Oder öffnen Sie die Add‑on-Seite direkt: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuelle Installation aus XPI {#local-installation-in-thunderbird}

### XPI-Datei herunterladen {#download-the-xpi-file}

1. Gehen Sie zur [Thunderbird-Add‑on-Seite](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Laden Sie die neueste Version des Add‑ons als XPI-Datei (`reply_with_attachments-x.y.z-tb.xpi`) herunter.

### In Thunderbird installieren {#install-in-thunderbird-local}

1. Öffnen Sie Thunderbird.
2. Gehen Sie zu **Extras > Add-ons und Themes**.
3. Klicken Sie im **Add-ons-Manager** oben rechts auf das Zahnrad-Symbol.
4. Wählen Sie im Menü **Add-on aus Datei installieren…**.
5. Wählen Sie die heruntergeladene Datei `reply_with_attachments-x.y.z-tb.xpi` aus.
6. Bestätigen Sie die Installation, wenn Sie dazu aufgefordert werden.

---

## Installation für die Entwicklung {#installation-for-development}

### Repository herunterladen {#download-the-repository}

1. Laden Sie die neueste Version des GitHub-Repositories herunter.
2. Führen Sie `make help` aus, um weitere Informationen zu erhalten.

### In Thunderbird installieren {#install-in-thunderbird-dev}

1. Öffnen Sie Thunderbird.
2. Gehen Sie zu **Extras > Add-ons und Themes**.
3. Klicken Sie im **Add-ons-Manager** oben rechts auf das Zahnrad-Symbol.
4. Wählen Sie im Menü **Add-on aus Datei installieren…**.
5. Wählen Sie die erstellte Datei `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` aus.
6. Bestätigen Sie die Installation, wenn Sie dazu aufgefordert werden.

Hinweis: Falls Thunderbird die `.zip` auf Ihrem System nicht akzeptiert, benennen Sie sie in `.xpi` um und versuchen Sie "Add‑on aus Datei installieren…" erneut.

### Wo finde ich die LOCAL-ZIP {#where-local-zip}

- Paketieren Sie zuerst das Add‑on: Führen Sie `make pack` im Repository-Stammverzeichnis aus.
- Nach dem Paketieren finden Sie die "LOCAL"-ZIP im Repository-Stammverzeichnis (z. B. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Bevor Sie zum Testen neu paketieren, heben Sie die Versionsnummern sowohl in `sources/manifest_ATN.json` als auch in `sources/manifest_LOCAL.json` an.

---

## Deaktivieren, Deinstallieren und Updates {#disable-uninstall-updates}

- Deaktivieren: Thunderbird → Extras → Add‑ons und Themes → Add‑on finden → auf Aus schalten.
- Deinstallieren: gleiche Ansicht → Drei‑Punkte-Menü → Entfernen.
- Updates: ATN-Installationen werden automatisch aktualisiert, sobald neue Versionen freigegeben sind. Lokale/Dev-Installationen werden nicht automatisch aktualisiert; installieren Sie ein neues LOCAL-Build manuell neu.
- Einstellungen vollständig entfernen: siehe [Datenschutz → Datenlöschung](privacy#data-removal).

Siehe auch

- [Schnellstart](quickstart)
