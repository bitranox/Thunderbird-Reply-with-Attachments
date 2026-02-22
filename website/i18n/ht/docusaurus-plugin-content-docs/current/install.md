---
id: install
title: 'Enstalasyon'
slug: /install
sidebar_label: 'Enstalasyon'
---

---

## Enstalasyon atravè "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Vèsyon Minimòm Thunderbird
Add‑on sa a sipòte Thunderbird **128 ESR oswa pi nouvo**. Ansiyen vèsyon yo pa sipòte.
:::

Sa a se metòd enstalasyon yo rekòmande a. Add‑on yo ki enstale depi ATN (addons.thunderbird.net) resevwa mizajou otomatik. Enstalasyon LOCAL/dev pa mete ajou otomatikman.

- Vèsyon minimòm Thunderbird: 128 ESR oswa pi nouvo.

1. Nan Thunderbird, ale nan **Tools > Add-ons and Themes**.
2. Chèche "reply with attachments".
3. Ajoute add‑on nan.

Oswa louvri paj add‑on nan dirèkteman: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Enstalasyon manyèl soti nan XPI {#local-installation-in-thunderbird}

### Telechaje fichye XPI a {#download-the-xpi-file}

1. Ale nan [paj Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Telechaje dènye vèsyon add‑on nan kòm yon fichye XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Enstale nan Thunderbird {#install-in-thunderbird-local}

1. Louvri Thunderbird.
2. Ale nan **Tools > Add-ons and Themes**.
3. Nan **Add-ons Manager**, klike sou ikon angrenaj ki anwo adwat la.
4. Chwazi **Install Add-on From File…** nan meni an.
5. Chwazi fichye `reply_with_attachments-x.y.z-tb.xpi` ou telechaje a.
6. Konfime enstalasyon an lè yo mande w.

---

## Enstalasyon pou devlopman {#installation-for-development}

### Telechaje repozitwa a {#download-the-repository}

1. Telechaje dènye vèsyon repozitwa GitHub la.
2. Kouri `make help` pou plis enfòmasyon.

### Enstale nan Thunderbird {#install-in-thunderbird-dev}

1. Louvri Thunderbird.
2. Ale nan **Tools > Add-ons and Themes**.
3. Nan **Add-ons Manager**, klike sou ikon angrenaj ki anwo adwat la.
4. Chwazi **Install Add-on From File…** nan meni an.
5. Chwazi fichye ki te pwodwi a `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfime enstalasyon an lè yo mande w.

Nòt: Si Thunderbird pa aksepte `.zip` sou sistèm ou a, re‑nonmen li kòm `.xpi` epi eseye “Install Add‑on From File…” ankò.

### Ki kote pou jwenn LOCAL ZIP la {#where-local-zip}

- Premyeman, pake add‑on nan: kouri `make pack` nan rasin repozitwa a.
- Apre w fin pakete, jwenn zip “LOCAL” la nan rasin repozitwa a (egzanp, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Anvan re‑pakete pou tès, ogmante vèsyon yo nan tou de `sources/manifest_ATN.json` ak `sources/manifest_LOCAL.json`.

---

## Dezaktive, Dezinstale, ak Mizajou {#disable-uninstall-updates}

- Dezaktive: Thunderbird → Tools → Add‑ons and Themes → jwenn add‑on nan → dezaktive li.
- Dezinstale: menm vizyalizasyon an → meni twa pwen → Remove.
- Mizajou: Enstalasyon ATN mete ajou otomatikman lè nouvo vèsyon yo apwouve. Enstalasyon LOCAL/dev pa mete ajou otomatikman; re‑enstale yon nouvo build LOCAL manyèlman.
- Retire anviwònman yo nèt: gade [Konfidansyalite → Retire done](privacy#data-removal).

Gade tou

- [Demaraj rapid](quickstart)
