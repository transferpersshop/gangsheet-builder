# Gangsheet Builder v2.66.4 · 26-11-2026

Te uploaden: app.js, index.html

## Snellere undo bij grote vellen
- Undo-stappen bewaren de beelddata van PNG/JPG-logo's nog maar één keer, in plaats van één keer per kopie. Bij 100 kopieën van een PNG van 3,6 MB: undo-stap van 358 MB naar 0,1 MB, geheugen van ongeveer 1 GB naar ongeveer 22 MB, geen hapering meer bij het begin van slepen. Vanaf ongeveer 150 kopieën crashte de undo eerder ("Invalid string length").
- Eén klik op Ongedaan maken is nu genoeg. Voorheen moest je na veel acties (aantal wijzigen, verwijderen, opvullen) twee keer klikken voordat er iets gebeurde.

# Gangsheet Builder v2.65.0 · 23-11-2026

Te uploaden: app.js, index.html, logo-editor.js

## Logo bewerken > Kleur: nieuwe opzet (A — eerst kiezen wat je wilt doen)
Het paneel opent met drie keuzekaarten; daarna zie je alleen de knoppen van die taak, met "← Andere keuze" om terug te gaan:
1. **Hele logo zwart of wit** — Maak zwart / Maak wit.
2. **Een kleur vervangen** — 1. Welke kleur? (kleuren uit het logo of pipet) · 2. Wordt (kleur, RGB/CMYK) · Vervang kleur.
3. **Losse delen kleuren** (alleen bij vectorlogo's) — delen aanklikken in het voorbeeld (Shift = meer), kleur kiezen uit "Uit dit logo", "Standaard" of "Eigen kleur": de kleur komt direct op de selectie. Kleinere delen / Alles selecteren / Ongedaan / Opnieuw / Herstel alles.

- De schakelaar "Hele logo | Losse delen" uit v2.64 is vervallen.
- Een gekozen maar nog niet bevestigde kleurvervanging vervalt als je een andere keuze maakt (wordt dus niet per ongeluk bij Toepassen meegenomen).
- Terug vanuit "Losse delen" met niet-toegepaste kleuren kan niet: eerst Toepassen of Herstel alles.
- Alle nieuwe teksten ook in het Engels.
