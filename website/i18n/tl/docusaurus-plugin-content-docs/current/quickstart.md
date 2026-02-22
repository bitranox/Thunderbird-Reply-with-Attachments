---
id: quickstart
title: 'Mabilis na Pagsisimula'
sidebar_label: 'Mabilis na Pagsisimula'
---

---

## Mabilisang Pagsisimula

:::important Pinakamababang Bersyon ng Thunderbird
Sinusuportahan ng add‑on na ito ang Thunderbird **128 ESR o mas bago**. Hindi sinusuportahan ang mas matatandang bersyon.
:::

:::note Walang telemetry; walang network sa background
Ang add‑on ay **hindi** nangongolekta ng analytics/telemetry at **walang** mga kahilingang network sa background. Nagkakaroon lamang ng access sa network kapag nag-click ka ng mga panlabas na link (Docs, GitHub, Donate).
:::

---

### I-install

1. I-install ang add‑on mula sa Thunderbird Add‑ons.
2. Opsyonal: I-enable ang kumpirmasyon (Options → “Magtanong bago magdagdag ng mga attachment”).
3. Opsyonal: Iwanang naka-enable ang babala sa blacklist (default): “Magbabala kung may mga attachment na ibinukod ng blacklist”.
4. Opsyonal: Magdagdag ng mga pattern para sa blacklist (isa kada linya), hal.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Tandaan: Ang “# …” sa itaas ay isang komento sa dokumentasyong ito; huwag magsama ng mga komento sa mga pattern na ididikit mo sa Options. Maglagay lamang ng isang pattern sa bawat linya.

Ngayon, mag-reply sa isang mensahe na may mga attachment — awtomatikong idaragdag ang mga orihinal o pagkatapos ng mabilis na kumpirmasyon. Kung may anumang file na ibinukod ng iyong blacklist, makakakita ka ng maikling babala na inililista ang mga iyon.

---

### I-verify {#verify}

- Mag-reply sa isang mensahe na may 1–2 attachment at tiyaking nadagdag ang mga orihinal sa iyong compose window.
- Upang ayusin ang pag-uugali, tingnan ang [Configuration](configuration) (toggle ng kumpirmasyon, default na sagot, mga pattern ng blacklist).

---

### Beripikahin ang babala sa blacklist {#verify-blacklist-warning}

- Mag-reply sa isang mensaheng may file na gaya ng “secret.txt”.
- Kapag naka-enable ang “Warn if attachments are excluded by blacklist”, magpapakita ang isang maliit na dialog ng listahan ng mga ibinukod na file at ang tumutugmang pattern.

Kung wala kang nakikitang babala, tiyaking eksaktong tumutugma ang pattern sa filename (filename‑only, hindi sensitibo sa laki ng titik). Tingnan ang Configuration → Blacklist.

---

### Tala tungkol sa keyboard {#keyboard-note}

- Ang dialog ng kumpirmasyon ay sumusuporta sa Y/J para sa Yes at N/Esc para sa No. Sa ilang hindi Latin na keyboard, maaaring mag-iba ang mga titik na susi; pinagtitibay ng Enter ang nakapokus na button.

---
