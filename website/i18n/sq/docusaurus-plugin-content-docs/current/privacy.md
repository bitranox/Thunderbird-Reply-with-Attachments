---
id: privacy
title: 'Privaciteti'
sidebar_label: 'Privaciteti'
---

## Privaciteti

:::note Asnjë telemetri; asnjë rrjet në sfond
Ky add-on **nuk** mbledh analitika/telemetri dhe **nuk** bën kërkesa rrjeti në sfond. Çdo akses në rrjet ndodh vetëm kur klikoni në një lidhje të jashtme (Docs, GitHub, Donations).
:::

Reply with Attachments nuk mbledh analitika ose telemetri dhe nuk dërgon të dhënat tuaja askund.

Çfarë bën add-oni:

- Lexon të dhënat e etiketës dhe skedarët nga mesazhi origjinal lokal (Thunderbird API) për t'i bashkëngjitur me përgjigjen tuaj.
- Ruaj opsionet tuaja (listën e zezë, konfirmimin, përgjigjen paraprake) në ruajtjen lokale të Thunderbird.

Çfarë nuk bën add-oni:

- Asnjë ndjekje, analitika, raportim crash-i, ose regjistrim të largët.
- Asnjë kërkesë rrjeti në sfond, përveç kur ju hapni në mënyrë eksplicite lidhje të jashtme (Docs, GitHub, Donations).

Lejet dokumentohen në faqen [Lejet](permissions).

---

## Politika e Sigurisë së Përmbajtjes (CSP) {#content-security-policy-csp}

Opsionet dhe faqet e popup-it shmangin skriptet e brendshme. Të gjitha JavaScript ngarkohet nga skedarë të dorëzuar me add-onin për të përmbushur CSP të rreptë në Thunderbird. Nëse përfshini fragmente kodi në dokumente, ato janë vetëm shembuj dhe nuk ekzekutohen nga add-oni.

---

## Ruajtja e të dhënave {#data-storage}

- Preferencat e përdoruesit (lista e zezë, ndërrimi i konfirmimit, përgjigja paraprake) ruhen në `storage.local` të Thunderbird për këtë add-on.
- Asnjë sinkronizim në cloud nuk bëhet nga add-oni.

---

## Rrjeti {#network}

- Add-oni nuk kryen asnjë aktivitet rrjeti në sfond.
- Çdo akses në rrjet ndodh vetëm kur klikoni në lidhje (Docs, GitHub, Donations) ose kur Thunderbird vetë kryen operacione normale që nuk lidhen me këtë add-on.

---

## Shkëputja e të dhënave {#data-removal}

- Çinstalimi i add-onit heq kodin e tij.
- Cilësimet ruhen vetëm në `storage.local` të Thunderbird dhe hiqen në çinstalim; nuk përdoret asnjë ruajtje e jashtme.
- Rinisni cilësimet pa çinstalim:
  - Faqja e opsioneve: përdorni “Rivendos në parazgjedhje” për listën e zezë dhe paralajmërimin e listës së zezë.
  - Të avancuara: në Thunderbird → Veglat → Veglat për Zhvillues → Debug Add-ons, hapni magazinën e zgjerimit dhe pastroni çelësat nëse është e nevojshme.
