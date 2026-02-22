---
id: usage
title: 'Itilizasyon'
sidebar_label: 'Itilizasyon'
---

---

## Itilizasyon {#usage}

- Reponn epi add-on nan ajoute orijinal yo otomatikman — oswa li mande w anvan, si sa aktive nan Opsyon yo.
- Retire doublon dapre non fichye; pati S/MIME yo toujou sote. Imaj anliy yo retabli nan kò repons lan pa default (dezaktive atravè "Include inline pictures" nan Opsyon yo).
- Atachman ki sou lis nwa yo tou sote (modèl glob ki pa sansib a majiskil/miniskil ki matche non fichye yo, pa chemen yo). Gade [Konfigirasyon](configuration#blacklist-glob-patterns).

---

### Kisa k pase lè w reponn {#what-happens}

- Detekte yon repons → lis atachman orijinal yo → filtre S/MIME + anliy → konfimasyon opsyonèl → ajoute fichye ki elijib (sote doublon) → retabli imaj anliy yo nan kò mesaj la.

Pase strik kont pase relaks: Add-on nan ekskli dabor pati S/MIME ak anliy nan atachman fichye yo. Si pa gen anyen ki kalifye, li kouri yon pase relaks ki toujou ekskli S/MIME/anliy men tolere plis ka (gade Detay Kòd la). Imaj anliy yo pa janm ajoute kòm atachman fichye; olye de sa, lè "Include inline pictures" aktive (default), yo entegre dirèkteman nan kò repons lan kòm URI done base64.

| Kalite pati                                         |                  Pase strik |                 Pase relaks |
| --------------------------------------------------- | --------------------------: | --------------------------: |
| Fichye siyati S/MIME `smime.p7s`                    |                      Ekskli |                      Ekskli |
| Tip MIME S/MIME (`application/pkcs7-*`)             |                      Ekskli |                      Ekskli |
| Imaj anliy ki referans pa Content‑ID (`image/*`)    | Ekskli (retabli nan kò a\*) | Ekskli (retabli nan kò a\*) |
| Imèl tache (`message/rfc822`) ki gen yon non fichye |                   Pa ajoute |                   Ka ajoute |
| Atachman fichye nòmal ki gen yon non fichye         |                   Ka ajoute |                   Ka ajoute |

\* Lè "Include inline pictures" aktive (default: ON), imaj anliy yo antere dirèkteman nan kò repons lan kòm URI done base64 olye yo ta ajoute yo kòm atachman fichye. Gade [Konfigirasyon](configuration#include-inline-pictures).

Egzanp: Gen kèk atachman ki ka pa gen kèk header, men yo toujou fichye nòmal (pa anliy/S/MIME). Si pase strik la pa jwenn okenn, pase relaks la ka aksepte yo epi tache yo.

---

### Kwa‑referans {#cross-reference}

- Forward pa modifye pa konsepsyon (gade Limitations pi ba a).
- Pou rezon ki fè yon atachman ka pa ajoute, gade “Poukisa atachman yo ka pa ajoute”.

---

## Detay Konpòtman {#behavior-details}

- Duplication prevansyon: Add-on nan make onglet konpozisyon an kòm trete lè l sèvi ak yon valè sesyon pou chak onglet ak yon gad nan memwa. Li pap ajoute orijinal yo de fwa.
- Fèmen epi reouvri yon fenèt konpozisyon trete kòm yon nouvo onglet (sa vle di, yon nouvo tantativ pèmèt).
- Respekte atachman ki deja la: Si fenèt konpozisyon an deja gen kèk atachman, orijinal yo toujou ajoute yon sèl fwa egzakteman, yo sote non fichye ki deja egziste.
- Ekzklizyon: Atikfak S/MIME ak imaj anliy yo eskli nan atachman fichye yo. Si pa gen anyen ki kalifye nan premye pase a, yon rekadrezman relaks relit pati ki pa S/MIME yo. Imaj anliy yo trete separeman: yo retabli nan kò repons lan kòm URI done (lè aktive).
  - Non fichye: `smime.p7s`
  - Tip MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Imaj anliy: nenpòt pati `image/*` ki referans pa Content‑ID — eskli nan atachman fichye yo men entegre nan kò repons lan lè "Include inline pictures" limen
  - Imèl tache (`message/rfc822`): trete kòm atachman nòmal si yo gen yon non fichye; yo ka ajoute (soumèt a tès doublon ak lis nwa).
- Avètisman lis nwa (si aktive): Lè kandida yo eskli pa lis nwa w la,
  add-on nan montre yon ti modal ki lis fichye ki afekte yo ak modèl
  ki koresponn yo. Avètisman sa a parèt tou lè pa gen okenn atachman ki pral
  ajoute paske tout bagay te eskli.

---

## Rakoursi klavye {#keyboard-shortcuts}

- Dyalo konfimasyon: Y/J = Wi, N/Esc = Non; Tab/Shift+Tab ak flèch yo sikile fokis la.
  - “Repons pa default” nan [Konfigirasyon](configuration#confirmation) mete bouton ki sou fokis okòmansman.
  - Enter aktive bouton ki sou fokis la. Tab/Shift+Tab ak flèch yo deplase fokis pou aksè.

### Fèy rapèl klavye {#keyboard-cheat-sheet}

| Touche            | Aksyon                           |
| ----------------- | -------------------------------- |
| Y / J             | Konfime Wi                       |
| N / Esc           | Konfime Non                      |
| Enter             | Aktive bouton ki sou fokis la    |
| Tab / Shift+Tab   | Deplase fokis pi devan/dèyè      |
| Touche flèch      | Deplase fokis ant bouton yo      |
| Repons pa default | Mete fokis inisyal (Wi oswa Non) |

---

## Limitasyon {#limitations}

- Forward pa modifye pa add-on sa a (Reply ak Reply all yo sipòte).
- Gwo atachman anpil ka sijè a limit Thunderbird oswa founisè a.
  - Add‑on nan pa separe an mòso ni konprese fichye; li konte sou fason nòmal Thunderbird jere atachman yo.
- Mesaj ankripte: pati S/MIME yo eskli entansyonèlman.

---

## Poukisa atachman yo ka pa ajoute {#why-attachments-might-not-be-added}

- Imaj anliy yo pa ajoute kòm atachman fichye. Lè "Include inline pictures" limen (default), yo antere nan kò repons lan kòm URI done olye. Si paramèt la OFF, imaj anliy yo retire nèt. Gade [Konfigirasyon](configuration#include-inline-pictures).
- Pati siyati S/MIME yo eskli pa konsepsyon: non fichye tankou `smime.p7s` ak tip MIME tankou `application/pkcs7-signature` oswa `application/pkcs7-mime` sote.
- Modèl lis nwa ka filtre kandida yo: gade [Konfigirasyon](configuration#blacklist-glob-patterns); matche a pa sansib a majiskil/miniskil epi li gade sèlman non fichye a.
- Non fichye ki an doub yo pa re‑ajoute: si fenèt konpozisyon an deja gen yon fichye ak menm non normalize a, yo sote li.
- Pati ki pa fichye oswa non fichye ki manke: se sèlman pati ki sanble ak fichye ki gen non fichye itilizab yo konsidere pou ajoute.

---

Gade tou

- [Konfigirasyon](configuration)
