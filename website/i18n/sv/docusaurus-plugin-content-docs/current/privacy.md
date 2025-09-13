---
id: privacy
title: 'Integritet'
sidebar_label: 'Integritet'
---

## Privacy

:::note Ingen telemetri; inga bakgrundsnätverk
Denna tillägg gör **inte** några analys-/telemetriinsamlingsaktioner och gör **inga** bakgrundsnätverksförfrågningar. All nätverksåtkomst sker endast när du klickar på en extern länk (Docs, GitHub, Donera).
:::

Reply with Attachments samlar inte in analyser eller telemetri och skickar inte dina data någonstans.

Vad tillägget gör:

- Läser bilagedata och filer från det ursprungliga meddelandet lokalt (Thunderbird API) för att bifoga dem till ditt svar.
- Lagrar dina alternativ (svart lista, bekräftelse, standard svar) i Thunderbirds lokala lagring.

Vad tillägget inte gör:

- Ingen spårning, analys, kraschrapportering eller fjärrloggning.
- Inga bakgrundsnätverksförfrågningar, förutom när du uttryckligen öppnar externa länkar (Docs, GitHub, Donera).

Behörigheter dokumenteras på [Permissions](permissions) sidan.

---

## Content Security Policy (CSP) {#content-security-policy-csp}

Alternativen och popup-sidorna undviker inline-skript. All JavaScript laddas från filer som levereras med tillägget för att följa strikt CSP i Thunderbird. Om du bäddar in kodsnuttar i dokument, är de bara exempel och körs inte av tillägget.

---

## Data storage {#data-storage}

- Användarpreferenser (svart lista, bekräftelseskyrka, standardsvar) lagras i Thunderbirds `storage.local` för detta tillägg.
- Ingen moln-synkronisering utförs av tillägget.

---

## Network {#network}

- Tillägget utför ingen bakgrundsnätverksaktivitet.
- All nätverksåtkomst sker endast när du klickar på länkar (Docs, GitHub, Donera) eller när Thunderbird själv utför normala operationer som inte är relaterade till detta tillägg.

---

## Data removal {#data-removal}

- Avinstallering av tillägget tar bort dess kod.
- Inställningar bevaras endast i Thunderbirds `storage.local` och tas bort vid avinstallation; ingen extern lagring används.
- Återställ inställningar utan att avinstallera:
  - Alternativsidan: använd "Återställ till standard" för svart lista och varning för svart lista.
  - Avancerat: i Thunderbird → Verktyg → Utvecklarverktyg → Debug Add‑ons, öppna tilläggets lagring och rensa nycklar vid behov.

---
