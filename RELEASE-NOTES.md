# Gangsheet Builder v2.57.1 — 23-09-2026

Gewijzigde bestanden: `app.js`, `logo-editor.js`, `index.html` (versielabel).
Bouwt voort op v2.57.0 — `app.js` bevat alles uit die release.

## "Maak wit": canvas wit, maar editor-preview en export bleven zwart

**Symptoom:** SVG-logo (VADO, `logo-black.svg`) naar wit gezet via "Logo
bewerken" of via het kleurenpaneel. Op het canvas werd het wit, maar de
preview in de logo-editor bleef zwart en de drukproef/print-PDF kwam er zwart
uit.

**Oorzaak:** het bestand bevat **nul** `fill`-attributen. Een SVG-vorm zonder
fill wordt zwart getekend — dat is de standaard, het staat niet in het
bestand. Exports uit o.a. Affinity/Serif laten die fill vaak weg.

De builder houdt twee versies van een logo bij:
- de fabric-objecten op het canvas — die kennen de paden wél als
  `rgb(0,0,0)`, dus daar werkte "Maak wit";
- de SVG-bron (`_svgSource`) — die gebruiken de editor-preview én de export.

Alle herkleurfuncties op die bron (`_makeMonoSvgSource`,
`recolorSvgSourceString`, `recolorSvgPaths`, `_updateSvgSourceAllColor` in de
logo-editor) vervangen alleen fill-waarden die er al stáán. Zonder fill viel
er niets te vervangen, dus de bron bleef zwart. Eén ontbrekende schakel,
drie symptomen.

**Fix:** `_ensureExplicitRootFill()` schrijft de standaardkleur één keer uit
op het `<svg>`-root (`fill="#000000"`). Vormen zonder eigen fill erven die, dus
het beeld verandert niet — maar elke herkleuring heeft nu iets om aan te
passen. Vormen met een eigen fill, een CSS-class of `fill="none"` blijven
gewoon winnen. Wordt toegepast bij het laden (`loadSvg`) en aan het begin van
alle vier de herkleurfuncties, zodat ook eerder geladen bronnen meegaan.

Gemeten in de nagebouwde builder (Chromium):

| | vóór | ná |
|---|---|---|
| canvas na "Maak wit" | wit | wit |
| editor-preview na "Maak wit" | 0 witte / 76.036 zwarte px | 76.036 witte / 0 zwarte px |
| export (logo-editor) | 2 paden zwart | 2 paden **wit** |
| export (kleurenpaneel) | 2 paden zwart | 2 paden **wit** |

## Regressie (eind-tot-eind, export uitgelezen met pymupdf)

| geval | export |
|---|---|
| VADO origineel | 2 paden zwart, vector |
| VADO kleur vervangen zwart → rood | 2 paden rood, vector |
| Freshwear origineel | 12× `#1e1f24` + 17× `#3a7477`, vector |
| Freshwear Maak wit | 29× wit, vector |
| KBM (pdf) origineel | 10 paden, vector |
| KBM (pdf) Maak wit | 10× wit, vector |

Helper-randgevallen: root met eigen `fill`, root met `style="fill:…"` (ook
met enkele quotes) en bestanden zonder `<svg>`-tag blijven ongewijzigd;
`fill-rule` telt terecht niet als fill.

## Let op

Een opdracht (`.gsb`) die vóór deze versie is opgeslagen met een al
"wit gemaakt" logo van dit type, heeft de zwarte bron nog in het bestand
staan. Na openen één keer opnieuw "Maak wit" doen, dan klopt het weer.
