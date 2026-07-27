---
id: changelog
title: 'Registro delle modifiche'
---

---

## Registro delle modifiche

Per la cronologia completa e dettagliata, vedi il
[CHANGELOG.md su GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: le immagini non vengono più scartate solo perché il mittente vi ha messo un `Content-ID`; l'opzione "Include inline pictures" è stata rimossa, poiché Thunderbird mantiene autonomamente le immagini incorporate nel corpo della risposta; i link ora si aprono nel browser di sistema; un limite di 50 allegati / 100 MB per risposta, con segnalazione di tutto ciò che viene escluso.
- 2.3.2: "Include inline pictures" incorporava le immagini nel corpo della risposta come URI di dati base64 (rimossa di nuovo dopo la revisione di add-ons.thunderbird.net; Thunderbird lo fa già da solo); miglioramenti alla qualità del codice ed estensione della copertura dei test.
- 2.3.1: Mantiene gli allegati dopo che Thunderbird mette in inattività la pagina degli eventi in background; aggiunge hook di debug mirati per la risoluzione dei problemi.
- 2.3.0: Deduplicazione degli allegati perfezionata, copertura dei test ampliata e rimozione dei permessi obsoleti per soddisfare le politiche di AMO.
- 2.1.0: Supporto completo all'internazionalizzazione per le prime 100 lingue
- 2.0.0: riscrittura in una versione completa di funzionalità (EN/DE)
- 1.0.1: passaggio a messages.listAttachments()
- 1.0.0: rilascio iniziale

---

## Date e canali {#dates-and-channels}

- I rilasci su ATN possono ritardare di alcune ore dopo l'impacchettamento.
- Le build LOCAL sono solo per i test degli sviluppatori e non vengono distribuite tramite ATN.

---
