---
id: changelog
title: 'Jurnal de modificări'
---

---

## Jurnal de modificări

Pentru istoricul complet și detaliat, consultați
[CHANGELOG.md pe GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: imaginile nu mai sunt eliminate doar pentru că expeditorul a pus un `Content-ID` pe ele; opțiunea "Include inline pictures" a dispărut, deoarece Thunderbird păstrează singur imaginile încorporate în corpul răspunsului; linkurile se deschid acum în browserul sistemului; o limită de 50 de atașamente / 100 MB per răspuns, iar tot ce este exclus este raportat.
- 2.3.2: "Include inline pictures" încorpora imaginile în corpul răspunsului ca URI-uri de date base64 (eliminată din nou după recenzia de pe add-ons.thunderbird.net; Thunderbird face asta singur); îmbunătățiri ale calității codului și acoperire extinsă de teste.
- 2.3.1: Păstrează atașamentele după ce Thunderbird pune în inactivitate pagina de evenimente de fundal; adaugă hook-uri de depanare țintite pentru diagnosticare.
- 2.3.0: Deduplicare a atașamentelor îmbunătățită, acoperire de testare extinsă și eliminarea permisiunilor învechite pentru a respecta politicile AMO.
- 2.1.0: Suport complet de internaționalizare pentru primele 100 de limbi
- 2.0.0: rescriere într-o versiune cu funcționalitate completă (EN/DE)
- 1.0.1: s-a trecut la messages.listAttachments()
- 1.0.0: lansare inițială

---

## Date și canale {#dates-and-channels}

- Lansările către ATN pot întârzia câteva ore după pachetizare.
- Build-urile LOCAL sunt doar pentru testarea de către dezvoltatori și nu sunt distribuite prin ATN.

---
