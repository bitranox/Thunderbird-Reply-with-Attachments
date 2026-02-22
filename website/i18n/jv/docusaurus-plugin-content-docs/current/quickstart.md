---
id: quickstart
title: 'Wiwitan Cepet'
sidebar_label: 'Miwiti Cepet'
---

---

## Pandhuan Cepet

:::important Versi Thunderbird Minimal
Add‑on iki ndhukung Thunderbird **128 ESR utawa luwih anyar**. Versi sing luwih lawas ora didhukung.
:::

:::note Ora ana telemetri; ora ana jaringan latar mburi
Add‑on iki ora nglumpukaké analitik/telemetri lan ora nggawe panyuwunan jaringan ing latar mburi. Akses jaringan mung kelakon nalika sampeyan ngeklik pranala eksternal (Docs, GitHub, Donate).
:::

---

### Pasang

1. Pasang add‑on saka Thunderbird Add‑ons.
2. Opsional: Aktifaké konfirmasi (Options → "Ask before adding attachments").
3. Opsional: Tetep aktifaké pèngetan blacklist (standar): "Warn if attachments are excluded by blacklist".
4. Opsional: Tambahna pola blacklist (saben baris siji), umpamané:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Cathetan: “# …” ing ndhuwur kuwi komentar ing dokumentasi iki; aja kalebu komentar ing pola sing sampeyan tempel ing Options. Lebokna mung siji pola saben baris.

Saiki wangsulana pesen sing ana lampirané — sing asli bakal ditambahaké kanthi otomatis utawa sawise konfirmasi cepet. Yen ana file sing dikecualèkaké dening blacklist sampeyan, sampeyan bakal ndeleng pèngetan cekak sing ndhaptar file-file mau.

---

### Priksa {#verify}

- Balesa pesen sing ana 1–2 lampiran lan konfirmasèkna yen sing asli ditambahaké menyang jendhela nyusun (compose) sampeyan.
- Kanggo nyetel prilaku, delengen [Konfigurasi](configuration) (tombol-ganti konfirmasi, jawaban standar, pola blacklist).

---

### Priksa pèngetan blacklist {#verify-blacklist-warning}

- Balesa pesen sing isiné file kaya “secret.txt”.
- Yen “Warn if attachments are excluded by blacklist” diaktifaké, dialog cilik bakal ndhaptar file sing dikecualèkaké lan polané sing cocog.

Yèn sampeyan ora ndeleng pèngetan, pastèkna polané pas karo jeneng file kanthi persis (mung jeneng file, ora mbedakaké gedhé‑cilik huruf). Delengen Konfigurasi → Blacklist.

---

### Cathetan papan ketik {#keyboard-note}

- Dialog konfirmasi ndhukung Y/J kanggo Yes lan N/Esc kanggo No. Ing sawetara papan ketik non‑Latin, tombol hurufé bisa béda; Enter ngonfirmasi tombol sing fokus.

---
