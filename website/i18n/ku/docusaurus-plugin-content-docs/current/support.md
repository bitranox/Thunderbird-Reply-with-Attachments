---
id: support
title: 'Piştgirî'
sidebar_label: 'Piştgirî'
---

## FAQ {#faq}

### Belgeyan lê nehatin zêdekirin - çima?

- Wêneya inline û parçeyên S/MIME bi amanca qetandinê derxistin.
- Navên dosyayên duzî têne derxistin heke kompoz dîsa heman pel hebe.
- Şablonên blacklist dikarin kandidan filter bikin; bibînin [Konfigürasyon](configuration#blacklist-glob-patterns).

### Ma dikarim piştrast bikim berî ku belgeyên zêde bikim?

Erê. "Pêşî zêdekirina belgeyan bipirsin" bişopînin li ser [Konfigürasyon → Pêşniyar](configuration#confirmation). Klavye: Y/J = Erê, N/Esc = Na.

### Ma add-on her çi daneyekî şandine an jî bikarhêneriyê hêsib dike?

Na. Bibînin [Mahremiyet](privacy) - tu telemetry nîne û tu daxwaza torî ya paşîn nîne.

### Veger ne belgeyên zêde dike - ev ew çi ye?

Erê. Tenê Bersiv û Bersiv hemû hatine guhertin ji hêla vê add-on ve; Veger bê guhertin e. Bibînin [Sınırlamalar](usage#limitations).

### Ma Donasiya xwe zêde dike?

Vebijêrk → Piştgirî beş. Bibînin [Dîtina Donasiya](configuration#donation-visibility).

---

## Piştgirî

Ma alîkariyê hewce ye an ma xwedeqimkî deke?

---

### Daya pirsgirêka li ser GitHub:

- Pergala: `bitranox/Thunderbird-Reply-with-Attachments`
- Pirsgirêkan: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Versiyona Thunderbird (mîsalan, 128 ESR), OS, û gavên ku hûn zêde dikin bide.
- Logên girîng ên ji Konsolê Çewtiyê ya Thunderbird (Amûr → Amûrên Pêşandan → Konsolê Çewtiyê) zêde bikin.

- Malpera add-ons (ATN): Hûn dikarin bi rêvebirinê ji [rûpela add-on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) re feedback bidin.

---

### Şîret

- Pêşî piştrast bikin ku hûn li ser versiyona tenê ya Thunderbird (128 ESR yan nûter).
- Pêşniyazên Konfigürasyon û Bikaranîn ji bo pirsgirêkan girîng binêrin.
- Ji bo pêşveçûn/test, bibînin rêbernameya Pêşveçûn.
- Heke mîhengan ku hûn hêsan nehatin sepandin, Thunderbird vegerînin û dîsa pêşniyar bikin. (Thunderbird dikare durustkariya state di nav şexs nekin; vegerina nû piştrast dike ku mîhengan nû hatine barkirin.)
- Reproduksiyonê minîmal: bi mailekî test kêm di hekûlê de têkildar bêtin.
- Mîna encama vegerê bi pêşniyar ON vs. OFF heya ku bihayê dijalogê tê deştin.

---

### Çi ji berê derbarê pirsgirêkê zêde bikin

- Versiyona Thunderbird û OS
- Gavhan hûrgulî ku hûn zêde dikin (têkiliya ku hûn kirin, çi hûn bîhnirîn, çi bû)
- Ma pêşniyar hatî kirin û hûn hêsabeke bingeha xwe û giring
- Mînakên şablonên blacklist yên hûn taybetî (eger girîng be)
- Logên Konsolê Çewtiyê dema zêdekirinê (Amûr → Amûrên Pêşandan → Konsolê Çewtiyê)
- Mîn cihê şîrêliya debugê (bidawî):
  - Li Konsolê Çewtiyê ya Thunderbird ve çalak bide: `messenger.storage.local.set({ debug: true })`
  - Mîna pirsgirêkê zêde dikin û linîyan logê `[RWA]` yên girîng li kopî bikin

---

### Şablona pirsgirêkê (kopi/pejî) {#issue-template}

- Versiyona Thunderbird û OS:
- Gavhan zêdekirinê:
- Ma pêşniyar hatî kirin? Bingeha bersiv:
- Mînakên şablonên blacklist:
- Logên Konsolê Çewtiyê (Amûr → Amûrên Pêşandan → Konsolê Çewtiyê):
- Her tiştî din girîng:

---

### Donasiya

Heke hûn hewceye ku ev projeya piştrast bikin, ji kerema xwe hinek pêşniyara piçûkê herça zor bide li ser [Donasiya](donation) rûpelê. Spas!
