---
id: features
title: 'Veçoritë'
sidebar_label: 'Veçoritë'
---

---

## Veçoritë {#features}

- Bashkëngjit automatikisht skedarët nga emaili origjinal kur përgjigjeni.
- Sjellje e konfigurueshme: bashkëngjitjet mund të
  - shtohen automatikisht, ose
  - shtohen vetëm pas konfirmimit (një dialog i vogël, i aksesueshëm). Në Opsione mund të
    aktivizoni konfirmimin dhe të zgjidhni përgjigjen e parazgjedhur (Po/Jo).
- Lista e zezë e emrave të skedarëve (modele glob) parandalon që skedarë të caktuar të
  bashkëngjiten automatikisht. Shembuj: `*intern*`, `*secret*`, `*passwor*`.
  Përputhja është e pandjeshme ndaj shkronjave të mëdha/vogla dhe kontrollon vetëm emrin e skedarit; jepni një model
  për rresht në Opsione.
- Paralajmërim i listës së zezë (opsional, aktivizuar si parazgjedhje): kur skedarët përjashtohen nga
  lista juaj e zezë, një modal i vogël liston skedarin dhe model(et) përputhës. Miqësor me
  mënyrën e errët dhe i aksesueshëm me tastierë (Enter/Esc për ta mbyllur).
- Funksionon me Përgjigju dhe Përgjigju të gjithëve. Përcjellja nuk modifikohet nga kjo shtesë.
- Shton origjinalet edhe nëse keni bashkëngjitur diçka vetë; shmang dublikatat sipas emrit të skedarit.
- Mbrojtja kundër dublikatave për çdo skedë parandalon shtimin dy herë në të njëjtën skedë të hartimit.
- Anashkalon certifikatat S/MIME si parazgjedhje për të shmangur bashkëngjitjet e panevojshme.
- Përfshin figura brenda tekstit (parazgjedhje: AKTIVE). Imazhet e futura rikthehen drejtpërdrejt në
  trupin e përgjigjes si URI të të dhënave base64, duke ruajtur paraqitjen origjinale brenda tekstit. Çaktivizoje në
  Opsione për t’i anashkaluar plotësisht imazhet brenda tekstit.

---

## Si Funksionon {#how-it-works}

- Gjatë përgjigjes, shtesa liston bashkëngjitjet origjinale.
- Filtron nënshkrimet S/MIME nga bashkëngjitjet e skedarëve; imazhet brenda tekstit rikthehen në trup (përveç nëse çaktivizohet).
- Opsionalisht kërkon konfirmim (miqësore me tastierën).
- Shton skedarët e përshtatshëm në hartimin tuaj, duke shmangur dublikatat sipas emrit të skedarit.
- Shih “Pse bashkëngjitjet mund të mos shtohen” te Përdorimi për raste të veçanta.

Shënim mbi privatësinë: I gjithë përpunimi ndodh lokalisht në Thunderbird. Shtesa nuk bën kërkesa rrjeti në sfond.

---
