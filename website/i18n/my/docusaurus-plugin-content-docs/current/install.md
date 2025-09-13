---
id: install
title: 'ဦးတည်ရာ'
slug: /install
sidebar_label: 'ဦးတည်ရာ'
---

## Installation via "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Version
This add‑on supports Thunderbird **128 ESR or newer**. Older versions are not supported.
:::

This is the recommended installation method. Add‑ons installed from ATN (addons.thunderbird.net) receive automatic updates. LOCAL/dev installs do not auto‑update.

- Minimum Thunderbird version: 128 ESR or newer.

1. In Thunderbird, go to **Tools > Add-ons and Themes**.
2. Search for "reply with attachments".
3. Add the add-on.

Or open the add‑on page directly: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manual installation from XPI {#local-installation-in-thunderbird}

### Download the XPI file {#download-the-xpi-file}

1. Go to the [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Download the latest version of the add-on as an XPI file (`reply_with_attachments-x.y.z-tb.xpi`).

### Install in Thunderbird {#install-in-thunderbird-local}

1. Open Thunderbird.
2. Go to **Tools > Add-ons and Themes**.
3. In the **Add-ons Manager**, click the gear icon in the top-right corner.
4. Choose **Install Add-on From File…** from the menu.
5. Select the downloaded `reply_with_attachments-x.y.z-tb.xpi` file.
6. Confirm the installation when prompted.

---

## Installation for development {#installation-for-development}

### Download the repository {#download-the-repository}

1. Download the latest version of the GitHub repository.
2. Run `make help` for more information.

### Install in Thunderbird {#install-in-thunderbird-dev}

1. Open Thunderbird.
2. Go to **Tools > Add-ons and Themes**.
3. In the **Add-ons Manager**, click the gear icon in the top-right corner.
4. Choose **Install Add-on From File…** from the menu.
5. Select the generated file `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirm the installation when prompted.

Note: If Thunderbird does not accept the `.zip` on your system, rename it to `.xpi` and try “Install Add‑on From File…” again.

### Where to find the LOCAL ZIP {#where-local-zip}

- First, package the add‑on: run `make pack` in the repository root.
- After packaging, find the “LOCAL” zip in the repository root (e.g., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Before re‑packaging for testing, bump versions in both `sources/manifest_ATN.json` and `sources/manifest_LOCAL.json`.

---

## Disable, Uninstall, and Updates {#disable-uninstall-updates}

- Disable: Thunderbird → Tools → Add‑ons and Themes → find the add‑on → toggle off.
- Uninstall: same view → three‑dot menu → Remove.
- Updates: ATN installs auto‑update when new versions are approved. LOCAL/dev installs do not auto‑update; reinstall a new LOCAL build manually.
- Remove settings completely: see [Privacy → Data removal](privacy#data-removal).

See also

- [Quickstart](quickstart)
