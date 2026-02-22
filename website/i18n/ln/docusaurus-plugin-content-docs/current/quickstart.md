---
id: quickstart
title: 'Libandeli ya noki'
sidebar_label: 'Kobanda noki'
---

---

## Kobanda nokinoki

:::important Vɛrsio ya Thunderbird ya moke (minimum)
Add‑on oyo esungi Thunderbird 128 ESR to ya sika koleka. Ba vɛrsio ya kala esungami te.
:::

:::note Telemɛtri te; rézo na sima te
Add‑on oyo ekɔtɔlaka te ba-analytique/telemɛtri mpe esengaka te basɛngi ya rézo na sima. Bokɔti na rézo esalemi kaka tango okokliki na ba lien ya libanda (Docs, GitHub, Donate).
:::

---

### Kó installa

1. Installá add‑on uta na Thunderbird Add‑ons.
2. Ya kopona: Lakisa kondimisa (Options → “Ask before adding attachments”).
3. Ya kopona: Tiká boyebisi ya “blacklist” ezala na mosala (ndimama ya liboso): “Warn if attachments are excluded by blacklist”.
4. Ya kopona: Bakisá ba modèle ya “blacklist” (moko na molɔngɔkɔ moko), ndakisa:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Tikeli sango: “# …” likoló ezali commentaire na dokima oyo; kobakisa ba commentaire te na ba modèle oyo okotya na Options. Tyá kaka modèle moko na molɔngɔkɔ moko.

Sik’oyo bebotola sango moko oyo ezali na ba attachments — ya ebandeli ekobakisama na ndenge ya automatique to sima ya kondimisa ya noki. Soki fichiers mosusu ebɔyami na blacklist na yo, okozwa boyebisi mokuse oyo elobeli bango.

---

### Koverifia {#verify}

- Bebotola sango moko oyo ezali na attachments 1–2 mpe kondimisa ete ba originals ebakisami na lopango ya kokoma sango.
- Po na kobongisa ndenge esalaka mosala, tala [Configuration](configuration) (kondimisa on/off, eyano ya liboso (default), ba modèle ya blacklist).

---

### Verifia boyebisi ya blacklist {#verify-blacklist-warning}

- Bebotola sango moko oyo ezali na fichier lokola “secret.txt”.
- Soki “Warn if attachments are excluded by blacklist” etelemá, dialoge moko ya moke elakisa ba fichiers ebɔyami mpe modèle oyo ekokanaka na yango.

Soki omoni boyebisi te, kondimisa ete modèle ekokanaka na kombo ya fichier malamu mpenza (kombo ya fichier kaka, ekokanaka ata soki minuskil/mayiskil ekeseni te). Tala Configuration → Blacklist.

---

### Noti ya klavye {#keyboard-note}

- Dialoge ya kondimisa endimaka Y/J mpo na Ɛɛ mpe N/Esc mpo na Te. Na ba klavye mosusu oyo ezali te na alfabeti ya Latin, bakle ya makomi ekoki kosiyana; Enter ekonfirmaka bouton oyo ezali na fokus.
