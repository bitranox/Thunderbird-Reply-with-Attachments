---
id: install
title: 'ການຕິດຕັ້ງ'
slug: /install
sidebar_label: 'ການຕິດຕັ້ງ'
---

---

## ການຕິດຕັ້ງຜ່ານ "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important ລຸ້ນ Thunderbird ຕ່ໍາສຸດ
Add‑on ນີ້ຮອງຮັບ Thunderbird **128 ESR ຫຼືໃໝ່ກວ່າ**. ບໍ່ຮອງຮັບລຸ້ນເກົ່າ.
:::

ນີ້ແມ່ນວິທີການຕິດຕັ້ງທີ່ແນະນໍາ. Add‑ons ທີ່ຕິດຕັ້ງຈາກ ATN (addons.thunderbird.net) ຈະໄດ້ຮັບການອັບເດດອັດຕະໂນມັດ. ການຕິດຕັ້ງ LOCAL/dev ບໍ່ອັບເດດອັດຕະໂນມັດ.

- ລຸ້ນ Thunderbird ຕ່ໍາສຸດ: 128 ESR ຫຼືໃໝ່ກວ່າ.

1. ໃນ Thunderbird, ໄປທີ່ **Tools > Add-ons and Themes**.
2. ຄົ້ນຫາ "reply with attachments".
3. ເພີ່ມ add-on.

ຫຼືເປີດໜ້າ add‑on ໂດຍກົງ: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## ການຕິດຕັ້ງດ້ວຍຕົນເອງຈາກ XPI {#local-installation-in-thunderbird}

### ດາວນ໌ໂຫຼດໄຟລ໌ XPI {#download-the-xpi-file}

1. ໄປທີ່ [ໜ້າ Add‑on ຂອງ Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. ດາວນ໌ໂຫຼດລຸ້ນຫຼ້າສຸດຂອງ add-on ເປັນໄຟລ໌ XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### ຕິດຕັ້ງໃນ Thunderbird {#install-in-thunderbird-local}

1. ເປີດ Thunderbird.
2. ໄປທີ່ **Tools > Add-ons and Themes**.
3. ໃນ **Add-ons Manager**, ຄລິກໄອຄອນຟັນຟືນຢູ່ມຸມຂວາເທິງ.
4. ເລືອກ **Install Add-on From File…** ຈາກເມນູ.
5. ເລືອກໄຟລ໌ `reply_with_attachments-x.y.z-tb.xpi` ທີ່ດາວນ໌ໂຫຼດມາ.
6. ຢືນຢັນການຕິດຕັ້ງເມື່ອມີການຮ້ອງຂໍ.

---

## ການຕິດຕັ້ງສໍາລັບການພັດທະນາ {#installation-for-development}

### ດາວນ໌ໂຫຼດຄັງໂປແກຼມ {#download-the-repository}

1. ດາວນ໌ໂຫຼດລຸ້ນຫຼ້າສຸດຂອງຄັງ GitHub.
2. ລັ່ນ `make help` ເພື່ອຂໍ້ມູນເພີ່ມເຕີມ.

### ຕິດຕັ້ງໃນ Thunderbird {#install-in-thunderbird-dev}

1. ເປີດ Thunderbird.
2. ໄປທີ່ **Tools > Add-ons and Themes**.
3. ໃນ **Add-ons Manager**, ຄລິກໄອຄອນຟັນຟືນຢູ່ມຸມຂວາເທິງ.
4. ເລືອກ **Install Add-on From File…** ຈາກເມນູ.
5. ເລືອກໄຟລ໌ທີ່ສ້າງຂຶ້ນ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. ຢືນຢັນການຕິດຕັ້ງເມື່ອມີການຮ້ອງຂໍ.

ໝາຍເຫດ: ຖ້າ Thunderbird ບໍ່ຮັບ `.zip` ໃນລະບົບຂອງທ່ານ, ແກ້ຊື່ເປັນ `.xpi` ແລະລອງ “Install Add‑on From File…” ອີກຄັ້ງ.

### ຈະຫາ LOCAL ZIP ໄດ້ບ່ອນໃດ {#where-local-zip}

- ອັນດັບທໍາອິດ, ແພັກ add‑on: ລັ່ນ `make pack` ໃນຮາກຄັງ.
- ຫຼັງຈາກແພັກແລ້ວ, ຊອກຫາ zip “LOCAL” ຢູ່ໃນຮາກຄັງ (ຕົວຢ່າງ, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- ກ່ອນຈະແພັກໃໝ່ເພື່ອທົດສອບ, ເພີ່ມເວີຊັນໃນ `sources/manifest_ATN.json` ແລະ `sources/manifest_LOCAL.json` ທັງສອງ.

---

## ປິດໃຊ້ງານ, ຖອນການຕິດຕັ້ງ, ແລະການອັບເດດ {#disable-uninstall-updates}

- ປິດໃຊ້ງານ: Thunderbird → Tools → Add‑ons and Themes → ຊອກຫາ add‑on → ປິດ.
- ຖອນການຕິດຕັ້ງ: ໜ້າດຽວກັນ → ເມນູສາມຈຸດ → Remove.
- ອັບເດດ: ການຕິດຕັ້ງ ATN ຈະອັບເດດອັດຕະໂນມັດເມື່ອລຸ້ນໃໝ່ຖືກອະນຸມັດ. ການຕິດຕັ້ງ LOCAL/dev ບໍ່ອັບເດດອັດຕະໂນມັດ; ຕິດຕັ້ງຊຸດສ້າງ LOCAL ໃໝ່ດ້ວຍມື.
- ລຶບຕັ້ງຄ່າອອກໝົດ: ເບິ່ງ [Privacy → Data removal](privacy#data-removal).

ເບິ່ງເພີ່ມເຕີມ

- [ເລີ່ມຕົ້ນດ່ວນ](quickstart)
