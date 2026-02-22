---
id: usage
title: 'Përdorimi'
sidebar_label: 'Përdorimi'
---

---

## Përdorimi {#usage}

- Përgjigju dhe shtesa i shton automatikisht origjinalet — ose pyet fillimisht, nëse është aktivizuar te Opsionet.
- Pa dublikatë sipas emrit të skedarit; pjesët S/MIME anashkalohen gjithmonë. Imazhet inline rikthehen në trupin e përgjigjes si parazgjedhje (çaktivizoje te “Përfshi figurat inline” te Opsionet).
- Bashkëngjitjet në listën e zezë anashkalohen gjithashtu (modele glob jo të ndjeshme ndaj shkronjave të mëdha/vogla që përputhen me emrat e skedarëve, jo me shtegun). Shih [Konfigurimi](configuration#blacklist-glob-patterns).

---

### Çfarë ndodh kur përgjigjesh {#what-happens}

- Zbulon përgjigjen → liston bashkëngjitjet origjinale → filtron S/MIME + inline → konfirmim opsional → shton skedarët e përshtatshëm (anashkalon dublikatat) → rikthen imazhet inline në trup.

Kalimi strikt kundrejt atij të relaksuar: Shtesa fillimisht përjashton pjesët S/MIME dhe inline nga bashkëngjitjet e skedarëve. Nëse asgjë nuk kualifikohet, ajo kryen një kalim më të relaksuar që sërish përjashton S/MIME/inline por toleron më shumë raste (shih Detajet e Kodit). Imazhet inline nuk shtohen kurrë si bashkëngjitje skedarësh; në vend të kësaj, kur “Përfshi figurat inline” është aktiv (parazgjedhje), ato futen drejtpërdrejt në trupin e përgjigjes si data URI base64.

| Lloji i pjesës                                               |                      Kalim strikt |                 Kalim i relaksuar |
| ------------------------------------------------------------ | --------------------------------: | --------------------------------: |
| Skedari i nënshkrimit S/MIME `smime.p7s`                     |                       Përjashtuar |                       Përjashtuar |
| Llojet MIME të S/MIME (`application/pkcs7-*`)                |                       Përjashtuar |                       Përjashtuar |
| Imazh inline i referuar nga Content‑ID (`image/*`)           | Përjashtuar (rikthehet në trup\*) | Përjashtuar (rikthehet në trup\*) |
| Email i bashkëngjitur (`message/rfc822`) me një emër skedari |                       Nuk shtohet |                   Mund të shtohet |
| Bashkëngjitje e zakonshme skedari me emër skedari            |                   Mund të shtohet |                   Mund të shtohet |

\* Kur “Përfshi figurat inline” është aktiv (parazgjedhje: ON), imazhet inline futen në trupin e përgjigjes si data URI base64 në vend që të shtohen si bashkëngjitje skedarësh. Shih [Konfigurimi](configuration#include-inline-pictures).

Shembull: Disa bashkëngjitje mund t’u mungojnë disa header-a, por sërish janë skedarë të zakonshëm (jo inline/S/MIME). Nëse kalimi strikt nuk gjen asnjë, kalimi i relaksuar mund t’i pranojë dhe t’i bashkëngjisë.

---

### Kryq-referencë {#cross-reference}

- Përcjellja (Forward) nuk modifikohet sipas dizajnit (shih Kufizimet më poshtë).
- Për arsyet pse një bashkëngjitje mund të mos shtohet, shihni “Pse bashkëngjitjet mund të mos shtohen”.

---

## Detaje të sjelljes {#behavior-details}

- Parandalimi i dublikatave: Shtesa e shënon skedën e hartimit si të përpunuar duke përdorur një vlerë sesioni për çdo skedë dhe një mbrojtës në kujtesë. Nuk do t’i shtojë origjinalet dy herë.
- Mbyllja dhe rihapja e një dritareje hartimi trajtohet si një skedë e re (dmth lejohet një përpjekje e re).
- Respekton bashkëngjitjet ekzistuese: Nëse mesazhi në hartim ka tashmë disa bashkëngjitje, origjinalet shtohen sërish vetëm një herë, duke anashkaluar emrat e skedarëve që ekzistojnë.
- Përjashtime: Artefaktet S/MIME dhe imazhet inline përjashtohen nga bashkëngjitjet e skedarëve. Nëse asgjë nuk kualifikohet në kalimin e parë, një rikthim i relaksuar i kontrollon sërish pjesët jo‑S/MIME. Imazhet inline trajtohen veçmas: ato rikthehen në trupin e përgjigjes si data URI (kur aktivizohet).
  - Emrat e skedarëve: `smime.p7s`
  - Llojet MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Imazhe inline: çdo pjesë `image/*` e referuar nga Content‑ID — përjashtohet nga bashkëngjitjet e skedarëve por futet në trupin e përgjigjes kur “Përfshi figurat inline” është ON
  - Email-e të bashkëngjitura (`message/rfc822`): trajtohen si bashkëngjitje të rregullta nëse kanë emër skedari; mund të shtohen (me kushtin e kontrolleve për dublikatë dhe të listës së zezë).
- Paralajmërim për listën e zezë (nëse aktivizohet): Kur kandidatët përjashtohen nga lista juaj e zezë, shtesa shfaq një dritare të vogël me listën e skedarëve të prekur dhe modele(t) përkatëse. Ky paralajmërim shfaqet edhe kur nuk do të shtohet asnjë bashkëngjitje sepse gjithçka u përjashtua.

---

## Shkurtore tastiere {#keyboard-shortcuts}

- Dialogu i konfirmimit: Y/J = Po, N/Esc = Jo; Tab/Shift+Tab dhe shigjetat qarkullojnë fokusin.
  - “Përgjigjja e parazgjedhur” te [Konfigurimi](configuration#confirmation) përcakton butonin fillimisht në fokus.
  - Enter aktivizon butonin në fokus. Tab/Shift+Tab dhe shigjetat lëvizin fokusin për aksesueshmëri.

### Përmbledhje e shkurtesave të tastierës {#keyboard-cheat-sheet}

| Tastet                    | Veprimi                              |
| ------------------------- | ------------------------------------ |
| Y / J                     | Konfirmo Po                          |
| N / Esc                   | Konfirmo Jo                          |
| Enter                     | Aktivo butonin në fokus              |
| Tab / Shift+Tab           | Zhvendos fokusin përpara/mbrapa      |
| Shigjetat                 | Zhvendos fokusin mes butonave        |
| Përgjigjja e parazgjedhur | Cakton fokusin fillestar (Po ose Jo) |

---

## Kufizime {#limitations}

- Përcjellja (Forward) nuk modifikohet nga kjo shtesë (Përgjigju dhe Përgjigju të gjithëve mbështeten).
- Bashkëngjitjet shumë të mëdha mund t’u nënshtrohen kufijve të Thunderbird ose të ofruesit.
  - Shtesa nuk i ndan në pjesë apo kompreson skedarët; ajo mbështetet te trajtimi normal i bashkëngjitjeve nga Thunderbird.
- Mesazhe të enkriptuara: pjesët S/MIME përjashtohen qëllimisht.

---

## Pse bashkëngjitjet mund të mos shtohen {#why-attachments-might-not-be-added}

- Imazhet inline nuk shtohen si bashkëngjitje skedarësh. Kur “Përfshi figurat inline” është ON (parazgjedhje), ato futen në trupin e përgjigjes si data URI. Nëse cilësimi është OFF, imazhet inline hiqen plotësisht. Shih [Konfigurimi](configuration#include-inline-pictures).
- Pjesët e nënshkrimit S/MIME përjashtohen sipas dizajnit: emra skedarësh si `smime.p7s` dhe lloje MIME si `application/pkcs7-signature` ose `application/pkcs7-mime` anashkalohen.
- Modelet e listës së zezë mund të filtrojnë kandidatët: shih [Konfigurimi](configuration#blacklist-glob-patterns); përputhja nuk është e ndjeshme ndaj shkronjave të mëdha/vogla dhe bëhet vetëm sipas emrit të skedarit.
- Emrat e dublikuar të skedarëve nuk ri‑shtohen: nëse mesazhi në hartim përmban tashmë një skedar me të njëjtin emër të normalizuar, ai anashkalohet.
- Pjesë jo‑skedari ose pa emra skedarësh: vetëm pjesët që sillen si skedarë me emra të përdorshëm merren në konsideratë për t’u shtuar.

---

Shih edhe

- [Konfigurimi](configuration)
