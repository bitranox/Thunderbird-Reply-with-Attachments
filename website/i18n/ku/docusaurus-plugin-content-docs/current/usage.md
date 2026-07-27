---
id: usage
title: 'Bikaranîn'
sidebar_label: 'Bikaranîn'
---

---

## Bikaranîn {#usage}

- Bersiv bide û add‑on orîjînalan xweber zêde dike — an jî pêşî diprse, heke di Vebijarkan de çalak be.
- Li gorî navê pelê ji nû ve tê rakirin; beşên S/MIME her tim têne derbaskirin. Wêneyên di peyama orijînal de tên bicihkirin di nava beşa bersivê de dimînin, li cihê ku Thunderbird wan datîne, û wekî pel nayên kopîkirin.
- Pêvekên ku di blacklist de hene jî têne derxistin (şêwazên glob ên bêhîstiya mezin/biçûk ku bi navên pelan li hev digerin, ne bi rêçikan). Binêre [Mîheng](configuration#blacklist-glob-patterns).

---

### Çi dibe dema bersivê {#what-happens}

- Bersivê tespît bike → pêvekên orîjînal rêz bike → S/MIME û wêneyên tê de hatine bicihkirin derbas bike → erêkirina vebijarkî → pelên guncan zêde bike (dubareyan derbas bike).

| Cureyê beşê                                                    | Li bersivê hatiye kopîkirin |
|----------------------------------------------------------------|----------------------------:|
| Pelê îmzeya S/MIME `smime.p7s`                                 | Na                          |
| Cureyên MIME yên S/MIME (`application/pkcs7-*`)                | Na                          |
| Wêneyê ku beşa peyamê bi `cid:` datîne                         | Na (ew di nava beşê de ye)  |
| Wêneyê ku wekî `Content-Disposition: inline` hatiye nîşankirin | Na (ew di nava beşê de ye)  |
| Wêneyê xwedî `Content-ID` ku beş qet behsa wê nake             | Erê                         |
| E-nameya pêvekirî (`message/rfc822`) bi navekî pelê            | Erê                         |
| Pêvek a pelê ya asayî bi navekî pelê                           | Erê                         |

Wêneyek tenê wê demê wekî bicihkirî tê hesibandin ku peyama orijînal bi rastî behsa wê bike, an jî şander bi eşkere ew wekî `Content-Disposition: inline` nîşan kiribe. Serenavê `Content-ID` bitenê têrê nake: gelek nermalavên e-nameyê wê li ser her beşa wêneyê datînin, di nav de pêvekên rastîn jî, û ew hîn jî divê bêne kopîkirin.

---

### Referansa hevpar {#cross-reference}

- Pêşandin li gorî dizaynê nayê guherandin (binêre Sînorkirin li jêr).
- Ji bo sedemên ku pêvek dikare neyê zêdekirin, binêre “Çima pêvek dikarin neyên zêdekirin”.

---

## Hûragahiyên Tevgerê {#behavior-details}

- Rêgeriya dubarekirinê: Add‑on tabê nivîsandinê wekî xebitî nîşan dide bi rêya nirxekî danişînê ya per‑tab û parastinek di bîrê de. Ew orîjînalan du caran nake zêde.
- Girtin û ji nû ve vekirina paceya nivîsandinê wek tabekî nû tê hesibandin (yanî, hewldanekî nû destûr heye).
- Hêrsandina pêvekên heyî: Heke di nivîsandinê de jixwe hinek pêvek hebe, orîjînalan hîn tenê carekê têne zêdekirin, navên pelan ên jixwe heye têne derxistin.
- Derxistin: Artîfaktên S/MIME û wêneyên hundirî ji pêveka pelê derxistin dikin. Heke di derbasbûna yekem de tiştekî ne lihevhat, xwedîbariya hêrgirt ji nû ve beşên ne‑S/MIME dîsa kontrol dike. Wêneyên hundirî bi awayek cuda tên rêveberkirin: ew di laşê bersivê de wekî data URIs tên vegerandin (dema çalak be).
  - Navên pelan: `smime.p7s`
  - Cureyên MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Wêneyên hundirî: her parça `image/*` ku bi Content‑ID re tê referans kirin — ji pêvekên pelê derxistin dikin lê dema "Include inline pictures" ON be di laşê bersivê de tên hevkirin
  - E-nameyên girêdayî (`message/rfc822`): heke navê pelê hebin wek pêvekên asayî tên xemilandin; dikarin werin zêdekirin (li gorî kontrola dubarebûnê û blacklist).
- Hişyariya blacklist (heke çalak be): Dema berheman ji hêla blacklist a te ve hatin derxistin,
  add‑on modalekî biçûk nîşan dide ku pelên tesîrdar û şêwaz(ên) lihevhatî
  di lîsteyekê de pêşkeş dike. Ev hişyari jî di rewşên de xuya dibe ku tu pêvek
  nayê zêdekirin ji ber ku her tişt hat derxistin.

---

## Kurteriyên klavyeyê {#keyboard-shortcuts}

- Dîyaloga pejirandinê: Y/J = Erê, N/Esc = Na; Tab/Shift+Tab û bişkokên tîrê fokusê diguherînin.
  - “Bersiva standard” di [Mîheng](configuration#confirmation) de bişkokê ya destpêkê diyar dike.
  - Enter bişkokê ya fokusdar çalak dike. Tab/Shift+Tab û tîrên klavyeyê fokusê pêş û paş diguhezînin ji bo gihîştinê.

### Lîsteya kurteriyên klavyeyê {#keyboard-cheat-sheet}

| Bişkok           | Çalakî                                   |
|------------------|------------------------------------------|
| Y / J            | Pejirandin: Erê                          |
| N / Esc          | Pejirandin: Na                           |
| Enter            | Bişkokê ya fokusdar çalak bike           |
| Tab / Shift+Tab  | Fokusê pêş/paş biguhezîne                |
| Bişkokên tîrê    | Fokusê di navbera bişkokan de biguhezîne |
| Bersiva standard | Fokusê destpêkê diyar dike (Erê an Na)   |

---

## Sînorkirin {#limitations}

- Pêşandin ji hêla vê add‑on ê ve nayê guherandin (Bersiv bide û Hemûyan bersiv bide tê piştgirî kirin).
- Pêvekên pir mezin dikarin li sînoran a Thunderbird an pêşkêşker bixin.
  - Add‑on pelan parçe na dike an na jî têkşik dike; ew li ser rêveberiya asayî ya Thunderbird ya pêvekê rawestaye.
- Peyamên şîfrekirî: beşên S/MIME bi amance hatine derxistin.

---

## Çima pêvek dikarin neyên zêdekirin {#why-attachments-might-not-be-added}

- Wêneyên ku peyama orîjînal tê de bicih kiriye wekî pelan nayên kopîkirin. Ew jixwe di laşê bersivê de ne, li cihê ku Thunderbird ew danîne. Binêre [Configuration](configuration#include-inline-pictures).
- Beşên îmzeya S/MIME li gorî dizaynê hatine derxistin: navên pelan wek `smime.p7s` û cureyên MIME mîna `application/pkcs7-signature` an jî `application/pkcs7-mime` têne derxistin.
- Şêwazên blacklist dikarin berheman parzûn bikin: binêre [Mîheng](configuration#blacklist-glob-patterns); lihevgirtin ji mezin/biçûk bûnê tîpan ne girîng e û tenê li ser navê pelê ye.
- Navên pelan ên dubare nayên dîsa zêdekirin: heke di nivîsandinê de jixwe pelê bi heman navê normalkirî hebe, ew tê derxistin.
- Beşên ne‑pel an navên pelê yên wenda: tenê parçeyên wek‑pel bi navên pelê yên bikarhatî têne têgihiştin ji bo zêdekirin.

---

Her weha bibîne

- [Mîheng](configuration)
