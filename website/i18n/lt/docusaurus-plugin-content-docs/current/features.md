---
id: features
title: Funkcijos
sidebar_label: Funkcijos
---

## Funkcijos

- Atsakant automatiškai prideda failus iš originalaus el. laiško.
- Konfigūruojamas elgesys: priedai gali būti
  - pridedami automatiškai, arba
  - pridedami tik po patvirtinimo (mažas, prieinamas dialogas). Parinktyse galite įjungti patvirtinimą ir pasirinkti numatytąjį atsakymą (Taip/Ne).
- Failų vardų juodasis sąrašas (glob raštai) neleidžia automatiškai pridėti tam tikrų failų. Pavyzdžiai: `*intern*`, `*secret*`, `*passwor*`.
  Atitikimas nejautrus raidžių dydžiui ir tikrina tik failo vardą; Parinktyse nurodykite po vieną raštą eilutei.
- Įspėjimas apie juodąjį sąrašą (pasirinktinai, pagal numatymą įjungta): kai failai atmetami dėl jūsų juodojo sąrašo, mažas modalinis langas parodo failą ir atitinkančius raštus. Tinka tamsiam režimui ir pasiekiama iš klaviatūros (Enter/Esc uždarymui).
- Prideda originalus net jei jau ką nors pridėjote; vengia dublikatų pagal failo vardą.
- Praleidžia SMIME sertifikatus ir įterptus vaizdus, kad būtų išvengta nereikalingų priedų.
