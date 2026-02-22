---
id: usage
title: 'Paggamit'
sidebar_label: 'Paggamit'
---

---

## Paggamit {#usage}

- Mag-reply at awtomatikong idinadagdag ng add‑on ang mga orihinal — o magtatanong muna, kung naka-enable sa Options.
- Walang duplikado batay sa filename; laging nilalaktawan ang mga bahagi ng S/MIME. Ang mga inline na larawan ay ibinabalik sa katawan ng reply bilang default (i-disable sa pamamagitan ng "Include inline pictures" sa Options).
- Ang mga attachment na nasa blacklist ay nilalaktawan din (case‑insensitive na mga glob pattern na tumutugma sa mga filename, hindi sa mga path). Tingnan ang [Configuration](configuration#blacklist-glob-patterns).

---

### Ano ang nangyayari kapag nag-reply {#what-happens}

- Tukuyin ang reply → ilista ang mga orihinal na attachment → i-filter ang S/MIME + inline → opsyonal na kumpirmasyon → idagdag ang mga kuwalipikadong file (laktawan ang mga duplikado) → ibalik ang mga inline na larawan sa katawan.

Mahigpit vs. maluwag na pass: Unang inaalis ng add‑on ang mga bahagi ng S/MIME at inline mula sa mga file attachment. Kung walang pumasa, nagpapatakbo ito ng isang maluwag na pass na patuloy na nag-eexclude ng S/MIME/inline ngunit mas maraming kaso ang tinatanggap (tingnan ang Code Details). Ang mga inline na larawan ay hindi kailanman idinadagdag bilang mga file attachment; sa halip, kapag naka-enable ang "Include inline pictures" (ang default), direktang ini-embed ang mga ito sa katawan ng reply bilang mga base64 data URI.

| Uri ng bahagi                                            |                        Mahigpit na pass |                         Maluwag na pass |
| -------------------------------------------------------- | --------------------------------------: | --------------------------------------: |
| File ng lagdang S/MIME `smime.p7s`                       |                           Hindi isinama |                           Hindi isinama |
| Mga uri ng MIME ng S/MIME (`application/pkcs7-*`)        |                           Hindi isinama |                           Hindi isinama |
| Inline na larawan na tinutukoy ng Content‑ID (`image/*`) | Hindi isinama (ibinabalik sa katawan\*) | Hindi isinama (ibinabalik sa katawan\*) |
| Nakakabit na email (`message/rfc822`) na may filename    |                         Hindi idinagdag |                        Maaaring idagdag |
| Karaniwang file attachment na may filename               |                        Maaaring idagdag |                        Maaaring idagdag |

\* Kapag naka-enable ang "Include inline pictures" (default: ON), ang mga inline na larawan ay ini-embed sa katawan ng reply bilang mga base64 data URI sa halip na idagdag bilang mga file attachment. Tingnan ang [Configuration](configuration#include-inline-pictures).

Halimbawa: Maaaring kulang ang ilang attachment sa ilang header ngunit regular na mga file pa rin (hindi inline/S/MIME). Kung walang makita ang mahigpit na pass, maaaring tanggapin ng maluwag na pass ang mga iyon at i-attach ang mga ito.

---

### Cross-reference {#cross-reference}

- Ang Forward ay hindi binabago ayon sa disenyo (tingnan ang mga limitasyon sa ibaba).
- Para sa mga dahilan kung bakit maaaring hindi maidagdag ang isang attachment, tingnan ang “Bakit maaaring hindi maidagdag ang mga attachment”.

---

## Mga Detalye ng Pag-uugali {#behavior-details}

- **Pag-iwas sa duplikado:** Minamarkahan ng add‑on ang compose tab bilang naproseso gamit ang per‑tab session value at in‑memory guard. Hindi nito idadagdag ang mga orihinal nang dalawang beses.
- Ang pagsasara at muling pagbubukas ng compose window ay itinuturing na bagong tab (ibig sabihin, pinapayagan ang panibagong pagtatangka).
- **Paggalang sa umiiral na mga attachment:** Kung mayroon nang ilang attachment ang compose, idinadagdag pa rin ang mga orihinal nang isang beses lamang, nilalaktawan ang mga filename na mayroon na.
- **Mga pagbubukod:** Ang mga artipakto ng S/MIME at mga inline na larawan ay hindi isinasama sa mga file attachment. Kung walang pumasa sa unang pass, isang maluwag na fallback ang muling sumusuri sa mga non‑S/MIME na bahagi. Hiwalay na hinahawakan ang mga inline na larawan: ibinabalik ang mga ito sa katawan ng reply bilang mga data URI (kapag naka-enable).
  - **Mga filename:** `smime.p7s`
  - **Mga uri ng MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Mga inline na larawan:** anumang bahagi na `image/*` na tinutukoy ng Content‑ID — hindi isinasama sa mga file attachment ngunit ini-embed sa katawan ng reply kapag naka-ON ang "Include inline pictures"
  - **Mga nakakabit na email (`message/rfc822`):** tinuturing na karaniwang attachment kung mayroon silang filename; maaari silang idagdag (nakabatay sa pag-check ng duplikado at blacklist).
- **Babala ng blacklist (kung naka-enable):** Kapag na‑exclude ng iyong blacklist ang mga kandidato,
  nagpapakita ang add‑on ng isang maliit na modal na naglilista ng mga apektadong file at ng tumutugmang
  mga pattern. Lumilitaw din ang babalang ito sa mga kasong walang madaragdag na attachment
  dahil na‑exclude ang lahat.

---

## Mga shortcut sa keyboard {#keyboard-shortcuts}

- Dialog ng kumpirmasyon: Y/J = Yes, N/Esc = No; Tab/Shift+Tab at mga arrow key ay nagpapalipat-lipat ng focus.
  - Ang “Default answer” sa [Configuration](configuration#confirmation) ang nagtatakda ng button na unang naka-focus.
  - Ang Enter ay nagpapagana sa naka-focus na button. Ang Tab/Shift+Tab at mga arrow ay nagpapagalaw ng focus para sa accessibility.

### Talaan ng mga Shortcut sa Keyboard {#keyboard-cheat-sheet}

| Mga key         | Aksyon                                    |
| --------------- | ----------------------------------------- |
| Y / J           | Kumpirmahin ang Yes                       |
| N / Esc         | Kumpirmahin ang No                        |
| Enter           | I-activate ang naka-focus na button       |
| Tab / Shift+Tab | Ilipat ang focus pasulong/paurong         |
| Mga arrow key   | Ilipat ang focus sa pagitan ng mga button |
| Default answer  | Itinatakda ang paunang focus (Yes o No)   |

---

## Mga limitasyon {#limitations}

- Ang Forward ay hindi binabago ng add‑on na ito (sinusuportahan ang Reply at Reply all).
- Maaaring may mga limitasyon ng Thunderbird o ng provider para sa napakalalaking attachment.
  - Hindi hinahati o kinokompress ng add‑on ang mga file; umaasa ito sa normal na paghawak ng Thunderbird sa mga attachment.
- Mga naka-encrypt na mensahe: sadyang hindi isinasama ang mga bahagi ng S/MIME.

---

## Bakit maaaring hindi maidagdag ang mga attachment {#why-attachments-might-not-be-added}

- Ang mga inline na larawan ay hindi idinadagdag bilang mga file attachment. Kapag naka-ON ang "Include inline pictures" (ang default), ini-embed ang mga ito sa katawan ng reply bilang mga data URI sa halip. Kung naka-OFF ang setting, ganap na inaalis ang mga inline na larawan. Tingnan ang [Configuration](configuration#include-inline-pictures).
- Ang mga bahagi ng lagdang S/MIME ay hindi isinasama ayon sa disenyo: ang mga filename gaya ng `smime.p7s` at mga uri ng MIME tulad ng `application/pkcs7-signature` o `application/pkcs7-mime` ay nilalaktawan.
- Maaaring i-filter ng mga pattern ng blacklist ang mga kandidato: tingnan ang [Configuration](configuration#blacklist-glob-patterns); ang pagtutugma ay case‑insensitive at batay lamang sa filename.
- Ang mga dobleng filename ay hindi muling idinaragdag: kung ang compose ay mayroon nang file na may parehong normalisadong pangalan, ito ay nilalaktawan.
- Mga bahaging hindi file o kulang ang filename: tanging mga bahaging parang file na may magagamit na filename lamang ang isinasaalang-alang na idagdag.

---

Tingnan din

- [Configuration](configuration)
