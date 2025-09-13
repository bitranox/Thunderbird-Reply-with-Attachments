---
id: support
title: 'Mbështetje'
sidebar_label: 'Mbështetje'
---

## FAQ {#faq}

### Shtesat nuk u shtuan — pse?

- Imazhet inline dhe pjesët S/MIME janë përjashtuar qëllimisht.
- Emrat e skedarëve të dyfishtë anashkalohen nëse kompozita tashmë ka të njëjtin skedar.
- Modelet e bllokimit mund të filtrojnë kandidatët; shih [Konfigurimin](configuration#blacklist-glob-patterns).

### A mund ta konfirmoj para se të shtoj shtesa?

Po. Aktivizo "Pyet para se të shtosh shtesa" nën [Konfigurimin → Konfirmimi](configuration#confirmation). Tastiera: Y/J = Po, N/Esc = Jo.

### A dërgon ndonjë të dhënë ose ndjek përdorimin ky shtesë?

Jo. Shih [Privatësinë](privacy) — pa telemetri dhe kërkesa në rrjetin e prapavijës.

### Përsëritja nuk shton shtesa — është kjo e pritur?

Po. Vetëm Pëgjigj dhe Pëgjigj të gjithëve modifikohen nga ky shtesë; Përsëritja mbetet e pandryshuar. Shih [Kufizimet](usage#limitations).

### Ku ndodhet snooze për Donacion?

Opsionet → seksioni Mbështetje. Shih [Dukshmërinë e Donacionit](configuration#donation-visibility).

---

## Mbështetje

Keni nevojë për ndihmë apo dëshironi të raportoni një gabim?

---

### Hapni një çështje në GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Çështjet: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Përfshini versionin e Thunderbird (p.sh., 128 ESR), OS, dhe hapat për të riprodhuar
- Shtoni log-jet përkatëse nga Konsola e Gabimeve të Thunderbird (Mjetet → Mjetet e Zhvilluesve → Konsola e Gabimeve)

- Siti i shtesave (ATN): gjithashtu mund të lini komente përmes [faqes së shtesës](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Këshilla

- Sigurohuni që jeni në një version të mbështetur të Thunderbird (128 ESR ose më të rinj).
- Kontrolloni dokumentet e Konfigurimit dhe Përdorimit për pyetje të zakonshme.
- Për zhvillim/testim, shih udhëzuesin për Zhvillimin.
- Nëse cilësimet e ruajtura duket se nuk aplikohen siç duhet, rihapni Thunderbird dhe provoni përsëri. (Thunderbird mund të ruajnë gjendjen ndërmjet sesionet; një rihapje siguron se cilësimet e reja ngarkohen.)
- Riprodhim minimal: provoni me një email të vogël që përmban një ose dy shtesa të thjeshta skedari.
- Krahasoni sjelljen me konfirmimin ON vs. OFF për të ngushtuar nëse rrjedha e dialogut është e përfshirë.

---

### Çfarë të përfshihet në një raport

- Versioni i Thunderbird dhe OS
- Hapat e saktë për të riprodhuar (çfarë keni bërë, çfarë prisnit, çfarë ndodhi)
- Nëse konfirmimi ishte aktivizuar dhe cilësimi juaj i përgjigjes së paracaktuar
- Një shembull i modeleve tuaja të bllokimit (nëse është e rëndësishme)
- Log-jet e Konsolës së Gabimeve gjatë riprodhimit (Mjetet → Mjetet e Zhvilluesve → Konsola e Gabimeve)
- Aktivizoni regjistrimin e gabimeve (opsionale):
  - Ekzekutoni në Konsolën e Gabimeve të Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Riprodhoni problemin dhe kopjoni rreshtat përkatës të log-ut `[RWA]`

---

### Şabloni i çështjes (kopjoni/nxirrni) {#issue-template}

- Versioni i Thunderbird dhe OS:
- Hapat për të riprodhuar:
- Konfirmimi i aktivizuar? Pëgjigjja e paracaktuar:
- Shembuj të modeleve të bllokimit:
- Log-jet e Konsolës së Gabimeve (Mjetet → Mjetet e Zhvilluesve → Konsola e Gabimeve):
- Çfarëdo tjetër e rëndësishme:

---

### Dhuroni

Nëse dëshironi të mbështesni këtë projekt, ju lutemi merrni parasysh një kontribut të vogël në faqen [Dhuroni](donation). Faleminderit!

---
