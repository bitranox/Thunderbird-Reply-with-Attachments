---
id: usage
title: 'Paggamit'
sidebar_label: 'Paggamit'
---

---

## Paggamit {#usage}

- Mag-reply at awtomatikong idinadagdag ng add‑on ang mga orihinal — o magtatanong muna, kung naka-enable sa Options.
- Inaalis ang mga duplicate batay sa filename; laging nilalaktawan ang mga bahagi ng S/MIME. Ang mga larawang naka-embed sa orihinal na mensahe ay nananatili sa body ng tugon, kung saan inilalagay ito ng Thunderbird, at hindi kinokopya bilang mga file.
- Ang mga attachment na nasa blacklist ay nilalaktawan din (case‑insensitive na mga glob pattern na tumutugma sa mga filename, hindi sa mga path). Tingnan ang [Configuration](configuration#blacklist-glob-patterns).

---

### Ano ang nangyayari kapag nag-reply {#what-happens}

- Tukuyin ang tugon → ilista ang mga orihinal na attachment → laktawan ang S/MIME at mga naka-embed na larawan → opsyonal na kumpirmasyon → idagdag ang mga kwalipikadong file (laktawan ang mga duplicate).

| Uri ng bahagi                                                    | Kinopya sa tugon         |
|------------------------------------------------------------------|-------------------------:|
| File ng S/MIME signature `smime.p7s`                             | Hindi                    |
| Mga uri ng MIME ng S/MIME (`application/pkcs7-*`)                | Hindi                    |
| Larawang naka-embed ng body ng mensahe sa pamamagitan ng `cid:`  | Hindi (nasa body na ito) |
| Larawang minarkahang `Content-Disposition: inline`               | Hindi (nasa body na ito) |
| Larawan na may `Content-ID` na hindi kailanman tinutukoy ng body | Oo                       |
| Naka-attach na email (`message/rfc822`) na may filename          | Oo                       |
| Karaniwang file attachment na may filename                       | Oo                       |

Ang isang larawan ay itinuturing na naka-embed lamang kapag talagang tinutukoy ito ng
orihinal na mensahe, o kapag tahasang minarkahan ito ng nagpadala bilang
`Content-Disposition: inline`. Hindi sapat ang isang `Content-ID` header lamang: naglalagay
ang ilang email client nito sa bawat bahagi ng larawan, kasama na ang mga tunay na
attachment, na dapat pa ring kopyahin.

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
|-----------------|-------------------------------------------|
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

- Ang mga larawang naka-embed ng orihinal na mensahe ay hindi kino-copy bilang mga file. Nasa katawan na ng tugon ang mga ito, kung saan inilagay ito ni Thunderbird. Tingnan ang [Configuration](configuration#include-inline-pictures).
- Ang mga bahagi ng lagdang S/MIME ay hindi isinasama ayon sa disenyo: ang mga filename gaya ng `smime.p7s` at mga uri ng MIME tulad ng `application/pkcs7-signature` o `application/pkcs7-mime` ay nilalaktawan.
- Maaaring i-filter ng mga pattern ng blacklist ang mga kandidato: tingnan ang [Configuration](configuration#blacklist-glob-patterns); ang pagtutugma ay case‑insensitive at batay lamang sa filename.
- Ang mga dobleng filename ay hindi muling idinaragdag: kung ang compose ay mayroon nang file na may parehong normalisadong pangalan, ito ay nilalaktawan.
- Mga bahaging hindi file o kulang ang filename: tanging mga bahaging parang file na may magagamit na filename lamang ang isinasaalang-alang na idagdag.

---

Tingnan din

- [Configuration](configuration)
