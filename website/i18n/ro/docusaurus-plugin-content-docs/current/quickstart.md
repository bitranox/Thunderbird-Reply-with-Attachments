---
id: quickstart
title: 'Ghid de pornire rapidă'
sidebar_label: 'Pornire rapidă'
---

---

## Ghid rapid

:::important Versiunea minimă de Thunderbird
Acest supliment este compatibil cu Thunderbird **128 ESR sau mai nou**. Versiunile mai vechi nu sunt acceptate.
:::

:::note Fără telemetrie; fără rețea în fundal
Suplimentul **nu** colectează analitice/telemetrie și **nu** face cereri de rețea în fundal. Accesul la rețea are loc doar când faci clic pe linkuri externe (Docs, GitHub, Donate).
:::

---

### Instalare

1. Instalează suplimentul din Thunderbird Add‑ons.
2. Opțional: Activează confirmarea (Opțiuni → „Întreabă înainte de a adăuga atașamente”).
3. Opțional: Lasă avertizarea listei negre activată (implicit): „Avertizează dacă atașamentele sunt excluse de pe lista neagră”.
4. Opțional: Adaugă șabloane pentru lista neagră (câte unul pe linie), de ex.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Notă: „# …” de mai sus este un comentariu în această documentație; nu include comentarii în șabloanele pe care le inserezi în Opțiuni. Introdu doar un singur șablon pe fiecare linie.

Acum răspunde la un mesaj cu atașamente — originalele vor fi adăugate automat sau după o confirmare rapidă. Dacă unele fișiere sunt excluse de lista ta neagră, vei vedea un avertisment scurt care le enumeră.

---

### Verifică {#verify}

- Răspunde la un mesaj cu 1–2 atașamente și confirmă că originalele sunt adăugate în fereastra de compunere.
- Pentru a ajusta comportamentul, vezi [Configurare](configuration) (comutator pentru confirmare, răspuns implicit, șabloane de listă neagră).

---

### Verifică avertizarea listei negre {#verify-blacklist-warning}

- Răspunde la un mesaj care conține un fișier precum „secret.txt”.
- Cu „Avertizează dacă atașamentele sunt excluse de pe lista neagră” activată, un dialog mic listează fișierele excluse și șablonul care se potrivește.

Dacă nu vezi un avertisment, asigură-te că șablonul se potrivește exact cu numele fișierului (doar numele fișierului, insensibil la majuscule/minuscule). Vezi Configurare → Lista neagră.

---

### Notă despre tastatură {#keyboard-note}

- Fereastra de confirmare acceptă Y/J pentru Da și N/Esc pentru Nu. Pe unele tastaturi non‑latine, tastele literelor pot varia; Enter confirmă butonul focalizat.

---
