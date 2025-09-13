---
id: permissions
title: 'Baýatdanlar'
---

## Baýatdanlar

:::note Minimum baýatdanlar
Bu goşma ýa-da goşmaçanyň hiç hili web bilen baglanyşykly beýlekiler üçin rugsat talap edilmeýär. Goşma, telemetry ýygnamok ýa-da fon boýunça tor isleglerini edýär. [Gizlinlik](privacy) sahy sýgyna göz aýlaň.
:::

---

Goşma diňe kiçi, niýetlenilen baýatdanlar toplumy talap edýär. Her biri näme üçin zerurdyr:

- `compose`: ýazmak köpügi wakalaryna gözegçilik etmek, jogapyňyzyň içinde goşmaçalary sanamak/ goşmak.
- `messagesRead`: metadata okamak we esasy hatdan goşmaça faýllaryny keçirip almak.
- `scripting`: açyk goýlanda kiçi ýazmakda tassyklamak jankyny goşmak.
- `windows`: habarlaşmak başarýsyz bolsa, iň soňky çaknan bir kiçi tassyklama popupyny açmak.
- `sessions`: gaýtalanýan işlemleri öňüni almak üçin her tab üçin bir görkezgi saklamak.
- `storage`: mümkinçilikleri (gara san, tassyklama geçirişi, kesgitli jogap) saklamak.
- `tabs`: tassyklama islegleri üçin ýazmak köpügi eýe tabyna niýetlenen habarlaşma.

Düşünjeler:

- Goşma hiç hili web bilen baglanyşykly rugsat talap etmeýär.
- `tabs` rugsady diňe tassyklama jankyny koordina etmek üçin ýazmak köpügi eýe tabyna niýetlenip ulanylýar; bu, taryhy okaýyş ýa-da sahypalara geçmek üçin ulanylmaýar.

Bular çeşmede dokumentirlenendir we CI-de synanylypdyr. Goşma telemetry ýygnamok.

---

### Jemleýiş (baýatdanlar → maksat) {#permissions-summary}

| Baýatdan          | Näme üçin zerurdyr                                                                      |
| ----------------- | --------------------------------------------------------------------------------------- |
| `compose`         | Yazmak köpügi wakalaryna gözegçilik etmek; jogaplaryňyza goşmaçalary sanamak we goşmak. |
| `messagesRead`    | Esasy hatdan goşmaça faýllaryny sanamak we faýl maglumatlaryny geçirmeli.               |
| `scripting`       | Açyk goýlanda tassyklamak üçin ýalňyz UI goşmak/koordina etmek.                         |
| `windows`         | Habarlaşmak başarýsyz bolsa (gaty az ýagdaýda) çaknan popup.                            |
| `sessions`        | Gaýtalanýan işlemleri öňüni almak üçin her tab üçin bir görkezgi saklamak.              |
| `storage`         | mümkinçiligini (gara san, tassyklama geçirişi, kesgitli jogap) saklamak.                |
| `tabs`            | Tassyklama islegleri üçin esasy tabyna niýetlenen habarlaşma.                           |
| (host rugsatlary) | Hiç hili — goşma web bilen baglanyşykly rugsat talap etmeýär.                           |

---

## Talap edilmeýär {#not-requested}

- `compose.save`, `compose.send` — goşma siziň adyňyzdan poçta üzdürmeýär ýa-da ibermek etmeýär.

Şeýle hem: [Gizlinlik](privacy) — hiç hili telemetry, hiç hili fon boýunça tor, diňe ulanyjynyň ädimleri.

---
