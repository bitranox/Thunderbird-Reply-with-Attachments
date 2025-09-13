---
id: support
title: 'Sipò'
sidebar_label: 'Sipò'
---

## FAQ {#faq}

### Atachman yo pa te ajoute — pouki sa?

- Imaj an liy ak pati S/MIME yo ekspre eklè.
- Non dosye ki repete yo neglije si konpozisyon an deja gen menm dosye a.
- Modèl nwa yo ka filtre kandida; gade [Konfigirasyon](configuration#blacklist-glob-patterns).

### Eske mwen ka konfime avan mwen ajoute atachman?

Wi. Aktive “Mande avan ajoute atachman” anba [Konfigirasyon → Konfimasyon](configuration#confirmation). Klavye: Y/J = Wi, N/Esc = Non.

### Eske add-on nan voye nenpòt done oswa swiv itilizasyon?

Non. Gade [Privasi](privacy) — pa gen telemetri ak pa gen demann rezo nan background.

### Transfè a pa ajoute atachman — sa a espere?

Wi. Sèlman Repons ak Repons tout yo modifye pa add-on sa a; Transfè a rete unchanged. Gade [Limitasyon](usage#limitations).

### Ki kote Dona snooze la ye?

Opsyon → seksyon Sipò. Gade [Vizibilite Dona](configuration#donation-visibility).

---

## Sipò

Bezwen èd oswa vle rapòte yon erè?

---

### Louvri yon pwoblèm sou GitHub:

- Reposwa: `bitranox/Thunderbird-Reply-with-Attachments`
- Pwoblèm: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Enklizyon vèsyon Thunderbird (pg: 128 ESR), OS, ak etap pou repwodui
- Atache logs ki gen rapò soti nan Konsòl Erè Thunderbird (Zouti → Zouti Devlopè → Konsòl Erè)

- Sit add-ons (ATN): Ou ka tou kite fidbak atravè [paj add-on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Konsèy

- Asire ou sou yon vèsyon Thunderbird sipòte (128 ESR oswa pi nouvo).
- Tcheke dokiman Konfigirasyon ak Itilizasyon pou kesyon ki komen sou anviwònman.
- Pou devlopman/tes, gade gid Devlopman an.
- Si anviwònman an sove yo sanble pa aplike korekteman, rdemare Thunderbird ak eseye ankò. (Thunderbird ka cache eta nan sesyon; yon rdemaraj asire nouvo anviwònman yo chaje.)
- Minimal repro: eseye ak yon ti imèl tès ki gen yon oswa de ti atachman dosye.
- Konpare konpòtman ak konfimasyon ON vs. OFF pou limite si kou fwa diaz la enplike.

---

### Kisa pou ou enkli nan yon rapò

- Vèsyon Thunderbird ak OS
- Etap egzak pou repwodui (sa ou te fè, sa ou te espere, sa ki pase)
- Si konfimasyon an te aktive ak anviwònman repons ou a
- Yon echantiyon nan modèl nwa ou yo (si sa aplike)
- Logs Konsòl Erè pandan w ap repwodui (Zouti → Zouti Devlopè → Konsòl Erè)
- Aktive logging debogaj (opsyonèl):
  - Kouri nan Konsòl Erè Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Repwodui pwoblèm nan ak kopye liy log ki gen rapò `[RWA]`

---

### Modèl pwoblèm (kopye/kole) {#issue-template}

- Vèsyon Thunderbird ak OS:
- Etap pou repwodui:
- Konfimasyon aktive? Repons default:
- Echantiyon modèl nwa:
- Logs Konsòl Erè (Zouti → Zouti Devlopè → Konsòl Erè):
- Nenpòt lòt bagay ki enpòtan:

---

### Dona

Si ou ta renmen sipòte pwojè sa a, tanpri konsidere yon ti kontribisyon sou paj [Dona](donation). Mèsi!
