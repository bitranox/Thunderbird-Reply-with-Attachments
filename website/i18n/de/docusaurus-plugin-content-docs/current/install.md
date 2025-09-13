---
id: install
title: 'Installation'
slug: /install
sidebar_label: 'Installation'
---

## Installation via "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Mindestversion von Thunderbird
Dieses Add-on unterstützt Thunderbird **128 ESR oder neuer**. Ältere Versionen werden nicht unterstützt.
:::

Dies ist die empfohlene Installationsmethode. Add-ons, die von ATN (addons.thunderbird.net) installiert werden, erhalten automatische Updates. INSTALLationen in LOCAL/dev aktualisieren sich nicht automatisch.

- Mindestversion von Thunderbird: 128 ESR oder neuer.

1. Gehen Sie in Thunderbird zu **Extras > Add-ons und Themes**.
2. Suchen Sie nach "Antworten mit Anhängen".
3. Fügen Sie das Add-on hinzu.

Oder öffnen Sie die Add-on-Seite direkt: [Thunderbird Add-ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuelle Installation von XPI {#local-installation-in-thunderbird}

### XPI-Datei herunterladen {#download-the-xpi-file}

1. Gehen Sie zur [Thunderbird Add-on-Seite](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Laden Sie die neueste Version des Add-ons als XPI-Datei (`reply_with_attachments-x.y.z-tb.xpi`).

### In Thunderbird installieren {#install-in-thunderbird-local}

1. Öffnen Sie Thunderbird.
2. Gehen Sie zu **Extras > Add-ons und Themes**.
3. Klicken Sie im **Add-ons-Manager** auf das Zahnrad-Symbol in der oberen rechten Ecke.
4. Wählen Sie **Add-on aus Datei installieren...** aus dem Menü.
5. Wählen Sie die heruntergeladene `reply_with_attachments-x.y.z-tb.xpi` Datei aus.
6. Bestätigen Sie die Installation, wenn Sie dazu aufgefordert werden.

---

## Installation für die Entwicklung {#installation-for-development}

### Repository herunterladen {#download-the-repository}

1. Laden Sie die neueste Version des GitHub-Repositorys herunter.
2. Führen Sie `make help` für weitere Informationen aus.

### In Thunderbird installieren {#install-in-thunderbird-dev}

1. Öffnen Sie Thunderbird.
2. Gehen Sie zu **Extras > Add-ons und Themes**.
3. Klicken Sie im **Add-ons-Manager** auf das Zahnrad-Symbol in der oberen rechten Ecke.
4. Wählen Sie **Add-on aus Datei installieren...** aus dem Menü.
5. Wählen Sie die generierte Datei `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` aus.
6. Bestätigen Sie die Installation, wenn Sie dazu aufgefordert werden.

Hinweis: Wenn Thunderbird die `.zip` auf Ihrem System nicht akzeptiert, benennen Sie sie in `.xpi` um und versuchen Sie erneut, "Add-on aus Datei installieren..." auszuwählen.

### Wo man die LOCAL ZIP findet {#where-local-zip}

- Zunächst das Add-on paketieren: Führen Sie `make pack` im Root-Verzeichnis des Repositorys aus.
- Nach der Paketerstellung finden Sie die „LOCAL“ zip im Root-Verzeichnis des Repositorys (z. B. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Vor der Neuverpackung für Tests, erhöhen Sie die Versionen in `sources/manifest_ATN.json` und `sources/manifest_LOCAL.json`.

---

## Deaktivieren, Deinstallieren und Updates {#disable-uninstall-updates}

- Deaktivieren: Thunderbird → Extras → Add-ons und Themes → das Add-on finden → ausschalten.
- Deinstallieren: dieselbe Ansicht → Drei-Punkte-Menü → Entfernen.
- Updates: ATN-Installationen aktualisieren sich automatisch, wenn neue Versionen genehmigt werden. LOCAL/dev Installationen aktualisieren sich nicht automatisch; installieren Sie ein neues LOCAL-Build manuell erneut.
- Einstellungen vollständig entfernen: siehe [Datenschutz → Daten löschen](privacy#data-removal).

Siehe auch

- [Schnellstart](quickstart)
