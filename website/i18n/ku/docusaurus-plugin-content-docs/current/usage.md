---
id: usage
title: 'Bikaranîn'
sidebar_label: 'Bikaranîn'
---

---

## Bikaranîn {#usage}

- Bersiv bide û add‑on orîjînalan xweber zêde dike — an jî pêşî diprse, heke di Vebijarkan de çalak be.
- Dubarekirin ji hêla navê pelê ve tê astengkirin; beşên S/MIME her gav têne derxistin. Wêneyên hundirî bi xwerû di laşê bersivê de tên vegerandin (bêçalakkirin bi vebijarka "Include inline pictures" di Vebijarkan de).
- Pêvekên ku di blacklist de hene jî têne derxistin (şêwazên glob ên bêhîstiya mezin/biçûk ku bi navên pelan li hev digerin, ne bi rêçikan). Binêre [Mîheng](configuration#blacklist-glob-patterns).

---

### Çi dibe dema bersivê {#what-happens}

- Bersiv tê tesbît kirin → pêvekên orîjînal têne lîstekirin → S/MIME + hundirî hatin parzûn → pejirandina vebijarkî → pelên lihevhatî tên zêdekirin (dubare têne derxistin) → wêneyên hundirî di laşê nivîsê de tên vegerandin.

Derbasbûna tund li hember derbasbûna hêrgirt: Add‑on pêşî beşên S/MIME û hundirî ji pêvekên pelê derxistin dike. Heke tiştî lihevhat tune be, derbasbûnek hêrgirt dihêze ku hîn jî S/MIME/hundirî derxistin dike lê mijarên zêdetir qedandî dibe (binêre Hûragahiyên kodê). Wêneyên hundirî tu carî wek pêvekên pelê nayên zêdekirin; li gorî vê yekê, dema "Include inline pictures" çalak be (standard), ew rasterast di laşê bersivê de wekî base64 data URIs tên hevkirin.

| Cureyê beşê                                                      |                                    Derbasbûna tund |                                 Derbasbûna hêrgirt |
| ---------------------------------------------------------------- | -------------------------------------------------: | -------------------------------------------------: |
| Pelê îmzeya S/MIME `smime.p7s`                                   |                                     Hate derxistin |                                     Hate derxistin |
| Cureyên MIME yên S/MIME (`application/pkcs7-*`)                  |                                     Hate derxistin |                                     Hate derxistin |
| Wêneyê hundirî ya bi Content‑ID re tê referans kirin (`image/*`) | Hate derxistin (di laşê nivîsê de tê vegerandin\*) | Hate derxistin (di laşê nivîsê de tê vegerandin\*) |
| E-nameya girêdayî (`message/rfc822`) bi navê pelê                |                                     Nayê zêdekirin |                              Dikarê were zêdekirin |
| Pêveka pelê ya asayî bi navê pelê                                |                              Dikarê were zêdekirin |                              Dikarê were zêdekirin |

\* Dema "Include inline pictures" çalak be (standard: ON), wêneyên hundirî di laşê bersivê de wekî base64 data URIs tên hevkirin di nav nivîsê de, ne wek pêveka pelê. Binêre [Mîheng](configuration#include-inline-pictures).

Mînak: Hin pêvek dikarin çend serepêşên winda bin lê hîn jî pelên asayî bin (ne hundirî/S/MIME). Heke derbasbûna tund tiştekê ne dît, derbasbûna hêrgirt dikare wan bipejirîne û bizêde bike.

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
| ---------------- | ---------------------------------------- |
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

- Wêneyên hundirî wek pêvekên pelê nayên zêdekirin. Dema "Include inline pictures" ON be (standard), ew di laşê bersivê de wekî data URIs tên hevkirin. Heke mîheng OFF be, wêneyên hundirî tevahî têne rakirin. Binêre [Mîheng](configuration#include-inline-pictures).
- Beşên îmzeya S/MIME li gorî dizaynê hatine derxistin: navên pelan wek `smime.p7s` û cureyên MIME mîna `application/pkcs7-signature` an jî `application/pkcs7-mime` têne derxistin.
- Şêwazên blacklist dikarin berheman parzûn bikin: binêre [Mîheng](configuration#blacklist-glob-patterns); lihevgirtin ji mezin/biçûk bûnê tîpan ne girîng e û tenê li ser navê pelê ye.
- Navên pelan ên dubare nayên dîsa zêdekirin: heke di nivîsandinê de jixwe pelê bi heman navê normalkirî hebe, ew tê derxistin.
- Beşên ne‑pel an navên pelê yên wenda: tenê parçeyên wek‑pel bi navên pelê yên bikarhatî têne têgihiştin ji bo zêdekirin.

---

Her weha bibîne

- [Mîheng](configuration)
