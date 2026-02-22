---
id: install
title: 'ಸ್ಥಾಪನೆ'
slug: /install
sidebar_label: 'ಸ್ಥಾಪನೆ'
---

---

## "Thunderbird Add-ons and Themes" ಮೂಲಕ ಸ್ಥಾಪನೆ {#installation-in-thunderbird-recommended}

:::important ಕನಿಷ್ಠ Thunderbird ಆವೃತ್ತಿ
ಈ ಆಡ್‑ಆನ್ Thunderbird **128 ESR ಅಥವಾ ಹೊಸದು** ಬೆಂಬಲಿಸುತ್ತದೆ. ಹಳೆಯ ಆವೃತ್ತಿಗಳಿಗೆ ಬೆಂಬಲವಿಲ್ಲ.
:::

ಇದು ಶಿಫಾರಸು ಮಾಡಿದ ಸ್ಥಾಪನಾ ವಿಧಾನ. ATN (addons.thunderbird.net) ನಿಂದ ಸ್ಥಾಪಿಸಿದ ಆಡ್‑ಆನ್‌ಗಳಿಗೆ ಸ್ವಯಂ ನವೀಕರಣಗಳು ದೊರಕುತ್ತವೆ. LOCAL/dev ಸ್ಥಾಪನೆಗಳು ಸ್ವಯಂ‑ನವೀಕರಿಸುವುದಿಲ್ಲ.

- ಕನಿಷ್ಠ Thunderbird ಆವೃತ್ತಿ: 128 ESR ಅಥವಾ ಹೊಸದು.

1. Thunderbird ನಲ್ಲಿ, **Tools > Add-ons and Themes** ಗೆ ಹೋಗಿ.
2. "reply with attachments" ಅನ್ನು ಹುಡುಕಿ.
3. ಆಡ್‑ಆನ್ ಅನ್ನು ಸೇರಿಸಿ.

ಅಥವಾ ಆಡ್‑ಆನ್ ಪುಟವನ್ನು ನೇರವಾಗಿ ತೆರೆಯಿರಿ: [Thunderbird ಆಡ್‑ಆನ್‌ಗಳು (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI ಇಂದ ಕೈಯಾರೆ ಸ್ಥಾಪನೆ {#local-installation-in-thunderbird}

### XPI ಫೈಲ್ ಅನ್ನು ಡೌನ್‍ಲೋಡ್ ಮಾಡಿ {#download-the-xpi-file}

1. [Thunderbird ಆಡ್‑ಆನ್ ಪುಟಕ್ಕೆ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ಹೋಗಿ.
2. ಆಡ್‑ಆನ್‌ನ ಇತ್ತೀಚಿನ ಆವೃತ್ತಿಯನ್ನು XPI ಫೈಲ್ ಆಗಿ (`reply_with_attachments-x.y.z-tb.xpi`) ಡೌನ್‍ಲೋಡ್ ಮಾಡಿ.

### Thunderbird ನಲ್ಲಿ ಸ್ಥಾಪಿಸಿ {#install-in-thunderbird-local}

1. Thunderbird ತೆರೆಯಿರಿ.
2. **Tools > Add-ons and Themes** ಗೆ ಹೋಗಿ.
3. **Add-ons Manager** ನಲ್ಲಿ, ಮೇಲಿನ ಬಲ ಮೂಲೆಯಲ್ಲಿರುವ ಗಿಯರ್ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.
4. ಮೆನುವಿನಲ್ಲಿ **Install Add-on From File…** ಆಯ್ಕೆಮಾಡಿ.
5. ಡೌನ್‍ಲೋಡ್ ಮಾಡಿದ `reply_with_attachments-x.y.z-tb.xpi` ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ.
6. ಕೇಳಿದಾಗ ಸ್ಥಾಪನೆಯನ್ನು ದೃಢೀಕರಿಸಿ.

---

## ಅಭಿವೃದ್ಧಿಗಾಗಿ ಸ್ಥಾಪನೆ {#installation-for-development}

### ರೆಪೊಸಿಟರಿಯನ್ನು ಡೌನ್‍ಲೋಡ್ ಮಾಡಿ {#download-the-repository}

1. GitHub ರೆಪೊಸಿಟರಿಯ ಇತ್ತೀಚಿನ ಆವೃತ್ತಿಯನ್ನು ಡೌನ್‍ಲೋಡ್ ಮಾಡಿ.
2. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ `make help` ಅನ್ನು ಚಲಾಯಿಸಿ.

### Thunderbird ನಲ್ಲಿ ಸ್ಥಾಪಿಸಿ {#install-in-thunderbird-dev}

1. Thunderbird ತೆರೆಯಿರಿ.
2. **Tools > Add-ons and Themes** ಗೆ ಹೋಗಿ.
3. **Add-ons Manager** ನಲ್ಲಿ, ಮೇಲಿನ ಬಲ ಮೂಲೆಯಲ್ಲಿರುವ ಗಿಯರ್ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.
4. ಮೆನುವಿನಲ್ಲಿ **Install Add-on From File…** ಆಯ್ಕೆಮಾಡಿ.
5. ರಚಿಸಲಾದ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ.
6. ಕೇಳಿದಾಗ ಸ್ಥಾಪನೆಯನ್ನು ದೃಢೀಕರಿಸಿ.

ಸೂಚನೆ: ನಿಮ್ಮ ಸಿಸ್ಟಮ್‌ನಲ್ಲಿ Thunderbird `.zip` ಅನ್ನು ಸ್ವೀಕರಿಸದಿದ್ದರೆ, ಅದನ್ನು `.xpi` ಎಂದು ಮರುಹೆಸರಿಸಿ ಮತ್ತು ಮತ್ತೆ “Install Add‑on From File…” ಪ್ರಯತ್ನಿಸಿ.

### LOCAL ZIP ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ {#where-local-zip}

- ಮೊದಲು, ಆಡ್‑ಆನ್ ಅನ್ನು ಪ್ಯಾಕೇಜ್ ಮಾಡಿ: ರೆಪೊಸಿಟರಿ ರೂಟ್‌ನಲ್ಲಿ `make pack` ಚಾಲನೆ ಮಾಡಿ.
- ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ನಂತರ, ರೆಪೊಸಿಟರಿ ರೂಟ್‌ನಲ್ಲಿ “LOCAL” zip ಅನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ (ಉದಾ., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- ಪರೀಕ್ಷೆಗೆ ಮರು‑ಪ್ಯಾಕೇಜ್ ಮಾಡುವ ಮೊದಲು, `sources/manifest_ATN.json` ಮತ್ತು `sources/manifest_LOCAL.json` ಎರಡರಲ್ಲಿಯೂ ಆವೃತ್ತಿಗಳನ್ನು ಹೆಚ್ಚಿಸಿ.

---

## ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವುದು, ಅನ್ಇನ್‌ಸ್ಟಾಲ್, ಮತ್ತು ನವೀಕರಣಗಳು {#disable-uninstall-updates}

- ನಿಷ್ಕ್ರಿಯಗೊಳಿಸು: Thunderbird → Tools → Add‑ons and Themes → ಆಡ್‑ಆನ್ ಅನ್ನು ಹುಡುಕಿ → ಟೋಗಲ್ ಅನ್ನು ಆಫ್ ಮಾಡಿ.
- ಅನ್ಇನ್‌ಸ್ಟಾಲ್: ಅದೇ ದೃಶ್ಯ → three‑dot ಮೆನು → Remove.
- ನವೀಕರಣಗಳು: ಹೊಸ ಆವೃತ್ತಿಗಳನ್ನು ಅನುಮೋದಿಸಿದಾಗ ATN ಸ್ಥಾಪನೆಗಳು ಸ್ವಯಂ‑ನವೀಕರಿಸುತ್ತವೆ. LOCAL/dev ಸ್ಥಾಪನೆಗಳು ಸ್ವಯಂ‑ನವೀಕರಿಸುವುದಿಲ್ಲ; ಹೊಸ LOCAL ಬಿಲ್ಡ್ ಅನ್ನು ಕೈಯಾರೆ ಮರುಸ್ಥಾಪಿಸಿ.
- ಸಂರಚನೆಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತೆಗೆದುಹಾಕುವುದು: [ಗೌಪ್ಯತೆ → ಡೇಟಾ ತೆರವು](privacy#data-removal) ವೀಕ್ಷಿಸಿ.

ಮತ್ತಷ್ಟು ನೋಡಿ

- [ಶೀಘ್ರ ಆರಂಭ](quickstart)
