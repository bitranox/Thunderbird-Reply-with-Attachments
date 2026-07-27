---
id: changelog
title: 'Változási napló'
---

---

## Változásnapló

A teljes, részletes előzményekért lásd a repozitórium
[CHANGELOG.md fájlját a GitHubon](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: a képek már nem maradnak ki csupán azért, mert a küldő `Content-ID`-t tett rájuk; az "Include inline pictures" opció megszűnt, mivel a Thunderbird maga is megtartja a beágyazott képeket a válasz törzsében; a linkek mostantól a rendszer böngészőjében nyílnak meg; válaszonként 50 melléklet / 100 MB felső korlát van, és minden kihagyott elemről jelentés készül.
- 2.3.2: az "Include inline pictures" beágyazta a képeket a válasz törzsébe base64 adat-URI-ként (az add-ons.thunderbird.net felülvizsgálata után ismét eltávolítva; ezt a Thunderbird maga is elvégzi); kódminőségi fejlesztések és bővített tesztlefedettség.
- 2.3.1: Megtartja a mellékleteket, miután a Thunderbird üresjáratba állítja a háttér eseményoldalt; célzott debug hookokat ad a hibaelhárításhoz.
- 2.3.0: Finomított melléklet-deduplikáció, szélesebb tesztlefedettség, valamint elavult engedélyek eltávolítása az AMO irányelveinek való megfelelés érdekében.
- 2.1.0: A 100 legnépszerűbb nyelv teljes körű nemzetköziesítési támogatása
- 2.0.0: átírás teljes funkcionalitású verzióra (EN/DE)
- 1.0.1: áttérés a messages.listAttachments()-re
- 1.0.0: első kiadás

---

## Dátumok és csatornák {#dates-and-channels}

- Az ATN-re történő kiadások a csomagolást követően néhány órát is késhetnek.
- A LOCAL buildek kizárólag fejlesztői tesztelésre szolgálnak, és nem kerülnek terjesztésre az ATN-en keresztül.

---
