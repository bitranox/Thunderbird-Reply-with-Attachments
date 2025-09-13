---
id: privacy
title: 'Prive'
sidebar_label: 'Prive'
---

## Prive

:::note Pa gen telemetry; pa gen rezo nan background
Aneks sa a **pa** kolekte analiz/telemetry e li **pa** fè demann rezo nan background. Nenpòt aksè rezo fèt sèlman lè ou klike sou yon lyen ekstèn (Dokiman, GitHub, Don).
:::

Reply with Attachments pa kolekte analiz oswa telemetry e li pa voye done ou nenpòt kote.

Sa ane ks sa a fè:

- Li metadata ak fichiers atachman yo soti nan mesaj orijinal la lokalman (Thunderbird API) pou atache yo nan repons ou.
- Li estoke opsyon ou yo (blacklist, konfimasyon, repons default) nan depo lokal Thunderbird.

Sa ane ks sa a pa fè:

- Pa gen swiv, analiz, rapò sou plant, oswa logging aleka.
- Pa gen demann rezo nan background, eksepte lè ou eksprime ouvè lyen ekstèn (Dokiman, GitHub, Don).

Otorizasyon yo dokimante sou paj [Otorizasyon](permissions).

---

## Politique Sekirite Kontni (CSP) {#content-security-policy-csp}

Opsyon yo ak paj popup yo evite scripts an ligne. Tout JavaScript chaje soti nan fichiers ki ak ane ks sa a pou konfòme ak CSP strik nan Thunderbird. Si ou enkli kòd nan dokiman, yo se sèlman egzanp e yo pa egzekite pa ane ks la.

---

## Estokaj done {#data-storage}

- Preferans itilizatè yo (blacklist, ot Switch konfimasyon, repons default) estoke nan `storage.local` Thunderbird pou ane ks sa a.
- Pa gen senkronizasyon nan nwaj ki fèt pa ane ks la.

---

## Rezo {#network}

- Ane ks la pa fè okenn aktivite rezo nan background.
- Nenpòt aksè rezo fèt sèlman lè ou klike sou lyen (Dokiman, GitHub, Don) oswa lè Thunderbird li menm fè operasyon nòmal ki pa gen rapò ak ane ks sa a.

---

## Retire done {#data-removal}

- Désinstaller ane ks la retire kòd li.
- Anviwònman yo kenbe sèlman nan `storage.local` Thunderbird e yo retire lè yo désinstaller; pa gen okenn depo ekstèn ki itilize.
- Reyajiste anviwònman san ou pa désinstaller:
  - Paj opsyon: itilize "Reyajiste nan default" pou blacklist ak avètisman blacklist.
  - Avanse: nan Thunderbird → Zouti → Zouti Devlopè → Debug Add‑ons, ouvri depo ekstansyon an e klere kle si sa nesesè.

---
