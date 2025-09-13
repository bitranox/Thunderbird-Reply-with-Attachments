---
id: install
title: 'Enstalasyon'
slug: /install
sidebar_label: 'Enstalasyon'
---

## Enstalasyon atravè "Add-ons ak Tèm Thunderbird" {#installation-in-thunderbird-recommended}

:::important Minimum Vèsyon Thunderbird
Add-on sa a sipòte Thunderbird **128 ESR oswa pi nouvo**. Vèsyon ki pi ansyen yo pa sipòte.
:::

Sa a se metòd enstalasyon rekomande a. Add-ons ki enstale nan ATN (addons.thunderbird.net) resevwa mizajou otomatik. Enstalasyon LOCAL/dev yo pa fè mizajou otomatik.

- Vèsyon minimòm Thunderbird: 128 ESR oswa pi nouvo.

1. Nan Thunderbird, ale nan **Zouti > Add-ons ak Tèm**.
2. Chèche "reponn ak atachman".
3. Ajoute add-on an.

Oswa ouvri paj add-on an dirèkteman: [Thunderbird Add-ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Enstalasyon manyèl soti nan XPI {#local-installation-in-thunderbird}

### Telechaje dosye XPI {#download-the-xpi-file}

1. Ale nan [paj Add-on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Telechaje dènye vèsyon add-on an kòm yon dosye XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Enstale nan Thunderbird {#install-in-thunderbird-local}

1. Ouvri Thunderbird.
2. Ale nan **Zouti > Add-ons ak Tèm**.
3. Nan **Manadjè Add-ons**, klike sou ikòn angrenaj la nan kwen anwo adwat.
4. Chwazi **Enstale Add-on Soti nan Dosye…** nan meni an.
5. Chwazi dosye `reply_with_attachments-x.y.z-tb.xpi` ki telechaje a.
6. Konfime enstalasyon an lè yo mande sa.

---

## Enstalasyon pou devlopman {#installation-for-development}

### Telechaje repozitò a {#download-the-repository}

1. Telechaje dènye vèsyon repozitò GitHub la.
2. Kouri `make help` pou plis enfòmasyon.

### Enstale nan Thunderbird {#install-in-thunderbird-dev}

1. Ouvri Thunderbird.
2. Ale nan **Zouti > Add-ons ak Tèm**.
3. Nan **Manadjè Add-ons**, klike sou ikòn angrenaj la nan kwen anwo adwat.
4. Chwazi **Enstale Add-on Soti nan Dosye…** nan meni an.
5. Chwazi dosye ki pwodwi a `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfime enstalasyon an lè yo mande sa.

Remak: Si Thunderbird pa aksepte `.zip` sou sistèm ou an, rename li kòm `.xpi` epi eseye "Enstale Add-on Soti nan Dosye…" ankò.

### Kote pou jwenn ZIP LOCAL la {#where-local-zip}

- Premye, pake add-on an: kouri `make pack` nan rasin repozitò a.
- Apre pake, jwenn zip "LOCAL" la nan rasin repozitò a (pa egzanp, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Anvan re-pakè pou tès, ogmante vèsyon yo nan `sources/manifest_ATN.json` ak `sources/manifest_LOCAL.json`.

---

## Dezaktive, Dezinstale, ak Mizajou {#disable-uninstall-updates}

- Dezaktive: Thunderbird → Zouti → Add-ons ak Tèm → jwenn add-on an → dekonekte.
- Dezinstale: menm gade → meni twa pwen → Retire.
- Mizajou: enstalasyon ATN fè mizajou otomatik lè nouvo vèsyon yo apwouve. Enstalasyon LOCAL/dev yo pa fè mizajou otomatik; reinstale yon nouvo LOCAL build manyèlman.
- Retire anviwònman yo konplètman: wè [Privacy → Retire done](privacy#data-removal).

Wè tou

- [Klike kòmanse](quickstart)
