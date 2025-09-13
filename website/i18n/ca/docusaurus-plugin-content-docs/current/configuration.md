---
id: configuration
title: 'Configuració'
---

## Configuració

Nota sobre terminologia: consulta el [Glossari](glossary) per a termes coherents utilitzats a la interfície i a la documentació.

---

## Obrir opcions a Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Eines → Afegits i Temes → trobar “Respondre amb Adjunts” → Preferències/Opcions

---

### Configuració {#settings}

#### Confirmació {#confirmation}

- Alternar “Preguntar abans d'afegir adjunts”
- Resposta per defecte: Sí o No (enfocament i teclat per defecte)
- Teclat: Y/J = Sí; N/Esc = No; Tab/Shift+Tab i tecles de fletxa canvien l'enfocament
  - Consulta els detalls del teclat a [Ús](usage#keyboard-shortcuts).

---

#### Llista negra (patrons glob) {#blacklist-glob-patterns}

Els fitxers a la llista negra no s'afegiran automàticament a la resposta. Consulta també el [Glossari](glossary) per a “Llista negra (llista d'exclusió)”.

- Un patró per línia; sense distingir entre majúscules i minúscules; coincidència només de noms de fitxers
- Exemple: `*intern*`, `*secret*`, `*passwor*`
- Tokens glob suportats: `*` (qualsevol caràcter excepte `/`), `?` (un caràcter), classes de caràcters com `[abc]`. Utilitza `\[` per coincidir amb un `[` literador. Els camins (`**/`) es ignoren ja que només es fixa en noms de fitxers.
- No es suporten: negació (`!`), expansió de claudàtors (`{..}`), i gammes complexes. Mantingues els patrons simples.
- No es suporten comentaris en patrons. No incloguis `#` o comentaris en línia; escriu només el text del patró per línia.

---

##### Llibre de patrons {#pattern-cookbook}

- Coincideix amb qualsevol PDF: `*.pdf`
- Coincideix amb fitxers que comencen amb “scan”: `scan*`
- Classe de caràcters: `report[0-9].txt`
- Escapa un `[` literador: `\[` (útil a l'hora d'ajustar un claudàtor com a caràcter)

---

##### Notes {#blacklist-notes}

- L'ordre no importa; la primera/qualsevol coincidència exclou el fitxer.
- La coincidència és només de noms de fitxers (camins/ carpetes es ignoren).
- “Restablir a valors predeterminats” restaura els patrons recomanats i alterna l'advertència de la llista negra.
- Per què l'exemple `*passwor*`? Coincideix amb les famílies “password” i “Passwort”.
- Precedència: si qualsevol patró coincideix amb un nom de fitxer, el fitxer és exclòs (primera/qualsevol coincidència — l'ordre no canvia el resultat).
- Consell: prova el teu patró: afegeix un patró temporal, respon a un missatge que contingui un fitxer amb un nom coincident, i confirma que es troba exclòs a la llista d'advertències.

##### Prova ràpida (prova segura) {#blacklist-try-it}

1. Obre Opcions → Llista negra.
2. Afegeix un patró temporal com `*.tmp` i fes clic a Desa.
3. Respon a un correu de prova que tingui un fitxer que acabi amb `.tmp` — el fitxer hauria d'aparèixer a la llista d'advertències i no ser adjuntat.
4. Elimina el patró temporal quan hagis acabat, o fes clic a “Restablir a valors predeterminats”.

---

#### Advertència sobre els adjunts excloïts {#warning-on-excluded-attachments}

- Alternar “Advertir si els adjunts són excloïts per la llista negra” (per defecte: ACTIVAT).
- Quan és activat, un petit modal enumera els fitxers excloïts i els patrons coincidents. L'advertència també apareix quan no s'adjuntarà res perquè tots els candidats han estat excloïts.

---

#### Desa la teva configuració {#save-your-settings}

Les configuracions es desa prement el botó Desa. Pots revertir manualment camps individuals o restablir valors predeterminats segons sigui necessari.

Si les configuracions emmagatzemades semblen no aplicar-se correctament, reinicia Thunderbird i prova de nou. (Thunderbird pot emmagatzemar l'estat entre sessions; un reinici assegura que es carreguin configuracions noves.)

Consell: per assegurar-te que les teves configuracions han tingut efecte, respon a qualsevol missatge amb un adjunt i comprova l'advertència de confirmació o llista negra.

---

#### Visibilitat de donacions (suspensió de 90 dies) {#donation-visibility}

L'afegit inclou una funcionalitat de conveniència per amagar els suggeriments de donació durant un temps després d'haver donat.

On trobar-ho

- Opcions → Secció de suport: veuràs un botó “He donat” i una petita àrea d'indicacions.
- El diàleg de confirmació d'enviament també mostra un botó de Donar; s'amaga automàticament quan la suspensió és activa.

Com funciona

- Fer clic a “He donat” amaga botons de donació i suggeriments relacionats durant 90 dies.
- Una indicació d'estat mostra “Amagat fins a YYYY‑MM‑DD” (en la teva data local). També hi ha un botó “Mostrar Donar de nou” per restaurar immediatament la visibilitat.
- Després de 90 dies, el botó Donar torna a ser visible automàticament.

Privadesa i emmagatzematge

- L'afegit emmagatzema un únic segell de temps a l'emmagatzematge local de Thunderbird per recordar el període de suspensió. Clau: `donateHideUntil` (mil·lisegons època).
- Aquesta configuració és local al teu perfil de Thunderbird (no sincronitzada al núvol). No es realitzen sol·licituds de xarxa per aquesta funció.

Solució de problemes

- Si Donar segueix mostrant-se immediatament després de fer clic a “He donat”, espera un moment o torna a obrir la pàgina d'Opcions; la interfície d'usuari s'actualitza tan aviat com la configuració és desada.
- Per restablir manualment, fes clic a “Mostrar Donar de nou”. També pots esperar fins que passi la data indicada a la indicació.

Aquesta funció és purament per conveniència; mai bloqueja la funcionalitat de l'afegit i no recopila cap dada personal.

---

### Normalització de noms de fitxers (prevenció de duplicats) {#filename-normalization-duplicates-prevention}

Per comportar-se de manera coherent a través de les plataformes, els noms de fitxers es normalitzen abans de les comprovacions de duplicats:

- Unicode es normalitza a NFC.
- Els noms es canvien a minúscules.
- Els punts/espaïs en una part posterior es retallen (amigabilitat per a Windows).

Això manté la detecció de duplicats previsible per a noms com `café.pdf` vs `café.pdf` (NFD) o `FILE.txt.` vs `file.txt`.

---

## Comportament de confirmació {#confirmation-behavior}

- “Resposta per defecte” estableix el botó que té l'enfocament inicial al diàleg de confirmació (útil per a usuaris de teclat).
- Funciona tant per “Respondre” com per “Respondre a tots”. “Reenviar” no es modifica per aquest afegit.

---

## Avançat: detecció de duplicats {#advanced-duplicate-detection}

La prevenció de duplicats s'implementa per pestanya de composició i per nom de fitxer. Vegeu [Ús](usage#behavior-details) per a una explicació detallada.

---

Consulta també

- [Permisos](permissions)
- [Privadesa](privacy)
