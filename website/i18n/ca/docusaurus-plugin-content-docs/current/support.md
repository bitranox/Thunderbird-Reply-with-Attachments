---
id: support
title: 'Suport'
sidebar_label: 'Suport'
---

## FAQ {#faq}

### Les adreces adjuntades no s'han afegit — per què?

- Les imatges en línia i les parts S/MIME són intencionadament excloses.
- Es salten noms de fitxers duplicats si la composició ja té el mateix fitxer.
- Els patrons de la llista negra poden filtrar candidats; vegeu [Configuració](configuration#blacklist-glob-patterns).

### Puc confirmar abans d'afegir els adjunts?

Sí. Activa "Preguntar abans d'afegir adjunts" a [Configuració → Confirmació](configuration#confirmation). Teclat: Y/J = Sí, N/Esc = No.

### L'add‑on envia dades o fa un seguiment de l'ús?

No. Vegeu [Privacitat](privacy) — sense telemetria i sense sol·licituds de xarxa en segon pla.

### El reenvio no afegeix adjunts — és això esperat?

Sí. Només Respon i Respondre a tots són modificats per aquest add‑on; Reenvia queda inalterat. Vegeu [Limitacions](usage#limitations).

### On és la funció de "Snooze" per donar?

Opcions → secció de suport. Vegeu [Visibilitat de Donacions](configuration#donation-visibility).

---

## Suport

Necessites ajuda o vols informar d'un error?

---

### Obre un problema a GitHub:

- Repositori: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemes: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Inclou la versió de Thunderbird (per exemple, 128 ESR), SO i passos per reproduir
- Adjunta registres rellevants de la Consola d'Errors de Thunderbird (Eines → Eines de desenvolupador → Consola d'errors)

- Pàgina d'add‑ons (ATN): També pots deixar comentaris a través de la [pàgina d'add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Consells

- Assegura't que estàs en una versió suportada de Thunderbird (128 ESR o més nova).
- Comprova la documentació de Configuració i Ús per a preguntes de configuració comunes.
- Per a desenvolupament/proves, consulta la guia de Desenvolupament.
- Si les configuracions emmagatzemades semblen no aplicar-se correctament, reinicia Thunderbird i torna a provar. (Thunderbird pot emmagatzemar l'estat entre sessions; un reinici assegura que es carreguin configuracions noves.)
- Reproducció mínima: prova amb un correu de prova petit que contingui un o dos adjunts simples.
- Compara el comportament amb la confirmació ACTIVADA vs. DESACTIVADA per restringir si el flux de diàleg està implicat.

---

### Què incloure en un informe

- Versió de Thunderbird i SO
- Passos exactes per reproduir (què vas fer, què esperaves, què va passar)
- Si la confirmació estava activada i la teva configuració de resposta predeterminada
- Una mostra dels teus patrons de llista negra (si és rellevant)
- Registres de la Consola d'Errors durant la reproducció (Eines → Eines de desenvolupador → Consola d'errors)
- Activa el registre de depuració (opcional):
  - Executa a la Consola d'Errors de Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Reproduïu el problema i copia les línies de registre `[RWA]` rellevants

---

### Plantilla de problema (copia/enganxa) {#issue-template}

- Versió de Thunderbird i SO:
- Passos per reproduir:
- Confirmació activada? Resposta predeterminada:
- Mostra de patrons de llista negra:
- Registres de la Consola d'Errors (Eines → Eines de desenvolupador → Consola d'errors):
- Altres detalls rellevants:

---

### Dona

Si vols donar suport a aquest projecte, considera fer una petita contribució a la pàgina de [Dona](donation). Gràcies!
