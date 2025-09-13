---
id: support
title: 'Asistență'
sidebar_label: 'Asistență'
---

## FAQ {#faq}

### Anexele nu au fost adăugate — de ce?

- Imaginile inline și părțile S/MIME sunt excluse intenționat.
- Numele de fișiere duplicate sunt omise dacă compunerea are deja același fișier.
- Modelele de blacklist pot filtra candidații; vezi [Configurare](configuration#blacklist-glob-patterns).

### Pot să confirm înainte de a adăuga anexele?

Da. Activează „Cere înainte de a adăuga anexele” sub [Configurare → Confirmare](configuration#confirmation). Tastatură: Y/J = Da, N/Esc = Nu.

### Adiția nu trimite niciun fel de date sau urmărește utilizarea?

Nu. Vezi [Confidențialitate](privacy) — nu există telemetrie și nu sunt solicitări de rețea în fundal.

### Redirecționarea nu adaugă anexele — este așteptat?

Da. Doar Răspunde și Răspunde tuturor sunt modificate de acest add-on; Redirecționare rămâne neschimbată. Vezi [Limitări](usage#limitations).

### Unde este amânarea Donației?

Opțiuni → secțiunea Asistență. Vezi [Vizibilitatea Donației](configuration#donation-visibility).

---

## Asistență

Ai nevoie de ajutor sau vrei să raportezi o eroare?

---

### Deschide o problemă pe GitHub:

- Repozitoriu: `bitranox/Thunderbird-Reply-with-Attachments`
- Probleme: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Include versiunea Thunderbird (de exemplu, 128 ESR), OS și pașii pentru a reproduce
- Atașează jurnale relevante din Consola de Erori Thunderbird (Instrumente → Instrumente pentru Dezvoltatori → Consola de Erori)

- Site-ul cu add-on-uri (ATN): Poți lăsa feedback prin [pagina add-on-ului](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Sfaturi

- Asigură-te că ești pe o versiune acceptată de Thunderbird (128 ESR sau mai recent).
- Verifică documentele de Configurare și Utilizare pentru întrebări frecvente de configurare.
- Pentru dezvoltare/testare, vezi ghidul de Dezvoltare.
- Dacă setările stocate par să nu se aplice corect, repornește Thunderbird și încearcă din nou. (Thunderbird poate salva starea între sesiuni; o repornire asigură că setările proaspete sunt încărcate.)
- Repro minim: încearcă cu un email de test mic care conține unul sau două atașamente simple.
- Compară comportamentul cu confirmarea ACTIVATĂ față de cea DEZACTIVATĂ pentru a restrânge dacă fluxul de dialog este implicat.

---

### Ce să incluzi într-un raport

- Versiunea Thunderbird și OS
- Pașii exacti pentru a reproduce (ce ai făcut, ce te așteptai, ce s-a întâmplat)
- Dacă confirmarea a fost activată și setarea ta de răspuns implicit
- Un exemplu al modelelor tale de blacklist (dacă este relevant)
- Jurnalele Consola de Erori în timpul reproducerii (Instrumente → Instrumente pentru Dezvoltatori → Consola de Erori)
- Activează jurnalizarea de debug (opțional):
  - Rulează în Consola de Erori Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Reproduci problema și copiază liniile de jurnal relevante `[RWA]`

---

### Șablon de problemă (copiază/inserează) {#issue-template}

- Versiunea Thunderbird și OS:
- Pașii pentru a reproduce:
- Confirmarea activată? Răspuns implicit:
- Exemple de modele de blacklist:
- Jurnalele Consola de Erori (Instrumente → Instrumente pentru Dezvoltatori → Consola de Erori):
- Orice altceva relevant:

---

### Donație

Dacă dorești să susții acest proiect, te rugăm să iei în considerare o mică contribuție pe pagina [Donație](donation). Mulțumim!
