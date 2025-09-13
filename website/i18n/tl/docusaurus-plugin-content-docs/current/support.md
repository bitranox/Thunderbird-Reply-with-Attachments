---
id: support
title: 'Suporta'
sidebar_label: 'Suporta'
---

## FAQ {#faq}

### Bakit hindi nadagdag ang mga attachment?

- Ang mga inline na larawan at mga bahagi ng S/MIME ay sinadyang hindi naisama.
- Ang mga duplicate na filename ay hindi isinasama kung ang compose ay mayroon nang parehong file.
- Ang mga pattern ng blacklist ay maaaring magsala ng mga kandidato; tingnan ang [Configuration](configuration#blacklist-glob-patterns).

### Maaari bang mag-confirm bago magdagdag ng mga attachment?

Oo. I-enable ang “Ask before adding attachments” sa ilalim ng [Configuration → Confirmation](configuration#confirmation). Keyboard: Y/J = Oo, N/Esc = Hindi.

### Nagpapadala ba ang add-on ng anumang data o nagta-track ng paggamit?

Hindi. Tingnan ang [Privacy](privacy) — walang telemetry at walang background network requests.

### Bakit hindi nadagdag ang mga attachment sa Forward — ito ba ay inaasahan?

Oo. Tanging ang Reply at Reply all ang binago ng add-on na ito; ang Forward ay hindi binago. Tingnan ang [Limitations](usage#limitations).

### Nasaan ang Donate snooze?

Options → Support section. Tingnan ang [Donation Visibility](configuration#donation-visibility).

---

## Suporta

Kailangan ng tulong o nais mag-ulat ng bug?

---

### Magbukas ng isyu sa GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Issues: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Isama ang bersyon ng Thunderbird (hal., 128 ESR), OS, at mga hakbang upang muling likhain
- Idagdag ang mga nauugnay na log mula sa Error Console ng Thunderbird (Tools → Developer Tools → Error Console)

- Site ng mga add-ons (ATN): Maaari ka ring mag-iwan ng feedback sa pamamagitan ng [add-on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Mga Tip

- Tiyaking ikaw ay nasa suportadong bersyon ng Thunderbird (128 ESR o mas bago).
- Suriin ang mga dokumento ng Configuration at Usage para sa mga karaniwang tanong sa setup.
- Para sa pag-develop/test, tingnan ang Development guide.
- Kung ang mga naka-store na setting ay tila hindi naaangkop ng maayos, i-restart ang Thunderbird at subukang muli. (Maaaring i-cache ng Thunderbird ang estado sa mga session; ang pag-restart ay tinitiyak na ang mga bagong setting ay na-load.)
- Minimal repro: subukan gamit ang isang maliit na test mail na naglalaman ng isang o dalawang simpleng file attachments.
- Ikumpara ang pag-uugali sa confirmation ON vs. OFF upang ma-narrow down kung ang flow ng dialog ay kasangkot.

---

### Ano ang isasama sa isang report

- Bersyon ng Thunderbird at OS
- Eksaktong mga hakbang upang muling likhain (kung ano ang ginawa mo, kung ano ang inaasahan mo, kung ano ang nangyari)
- Kung ang confirmation ay na-enable at ang iyong default na sagot na setting
- Isang sample ng iyong mga pattern ng blacklist (kung naaangkop)
- Mga log ng Error Console habang muling binubuo (Tools → Developer Tools → Error Console)
- I-enable ang debug logging (opsyonal):
  - Patakbuhin sa Error Console ng Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Muliang likhain ang isyu at kopyahin ang mga naaangkop na `[RWA]` log lines

---

### Template ng isyu (kopyahin/i-paste) {#issue-template}

- Bersyon ng Thunderbird at OS:
- Mga hakbang upang muling likhain:
- Na-enable ang confirmation? Default na sagot:
- Sample ng mga pattern ng blacklist:
- Mga log ng Error Console (Tools → Developer Tools → Error Console):
- Anumang iba pang kaugnay:

---

### Mag-donate

Kung nais mong suportahan ang proyektong ito, mangyaring isaalang-alang ang isang maliit na kontribusyon sa [Donate](donation) na pahina. Salamat!
