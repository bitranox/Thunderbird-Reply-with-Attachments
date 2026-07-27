---
id: changelog
title: 'Registre de canvis'
---

---

## Registre de canvis

Per a l’historial complet i detallat, consulteu
[CHANGELOG.md a GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md) del repositori.

- 2.4.0: les imatges ja no es descarten només perquè el remitent hi va posar un `Content-ID`; l'opció "Include inline pictures" ha desaparegut, ja que el Thunderbird manté les imatges incrustades al cos de la resposta pel seu compte; els enllaços ara s'obren al navegador del sistema; un límit de 50 adjunts / 100 MB per resposta, i s'informa de qualsevol cosa que quedi fora.
- 2.3.2: "Include inline pictures" incrustava les imatges al cos de la resposta com a URI de dades base64 (retirada de nou després de la revisió d'add-ons.thunderbird.net; el Thunderbird ja ho fa per si sol); millores de qualitat del codi i cobertura de proves ampliada.
- 2.3.1: Conserva els fitxers adjunts després que el Thunderbird deixi inactiva la pàgina d’esdeveniments en segon pla; afegeix ganxos de depuració dirigits per a la resolució de problemes.
- 2.3.0: S’ha perfeccionat la deduplicació d’adjunts, s’ha ampliat la cobertura de proves i s’han eliminat permisos obsolets per complir les polítiques de l’AMO.
- 2.1.0: Suport complet d’internacionalització per als 100 idiomes principals
- 2.0.0: Reescriptura a una versió completa (EN/DE)
- 1.0.1: S’ha passat a messages.listAttachments()
- 1.0.0: Llançament inicial

---

## Dates i canals {#dates-and-channels}

- Les publicacions a l’ATN poden endarrerir-se unes quantes hores després de l’empaquetament.
- Les compilacions LOCAL són només per a proves de desenvolupadors i no es distribueixen mitjançant l’ATN.

---
