# Gangsheet Builder v2.57.0 — 16-09-2026

Gewijzigde bestanden: `app.js`, `index.html` (alleen het versielabel).

## Logo verdween uit drukproef en print-PDF (Freshwear)

**Symptoom:** het originele Freshwear-logo stond wél op het werkblad maar
ontbrak volledig in de drukproef en de print-ready PDF — groot én klein. De
naar wit en zwart omgezette varianten van hetzelfde logo kwamen er wél op.

**Oorzaak:** svg2pdf 2.2.0 kan de kleurnotatie
`rgb(11.764526%, 12.156677%, 14.117432%)` niet lezen en laat zo'n element
**volledig** vallen — geen foutmelding, geen spoor. Cairo schrijft kleuren
standaard in procenten, en dit logo komt daar vandaan (29 voorkomens, twee
kleuren: `#1e1f24` en `#3a7477`).

Dat de wit/zwart-varianten wél goed gingen was toeval: `_makeMonoSvgSource`
schrijft de kleuren als hex terug en ruimt de kapotte notatie daarmee op.

Omdat svg2pdf geen fout gooit, sprong de bestaande fallback naar raster niet
aan — het logo werd niet vervangen door een beeld, het was er gewoon niet.

**Fix:** `_normalizeSvgColors()` zet procent-notatie om naar hex, meteen bij
het laden in `loadSvg`. Alles stroomafwaarts profiteert mee: het
kleurenpaneel zag deze kleuren namelijk óók niet, want
`_extractColorsFromSvgSource` kent alleen hex en `rgb()` in 0-255. Voor
projecten die vóór deze versie zijn opgeslagen draait dezelfde normalisatie
nog een keer in de export.

Gemeten op `Freshwear-logo.svg` door svg2pdf:
- vóór: **0 vectorpaden** — lege pagina
- ná:  **29 vectorpaden**, kleuren `#1e1f24` en `#3a7477`

## Vangnet: geen stille gaten meer in de export

svg2pdf laat vaker dingen stilzwijgend vallen (in v2.56.9 was dat `<mask>`).
`_svgExportRisk()` controleert de SVG-bron nu vóór de vectorroute op
constructies waarvan gemeten is dat ze leeg uitkomen, en stuurt zo'n logo
naar de rasterroute met een melding in de console. Liever 300 DPI dan een gat
op het vel.

Getest met svg2pdf 2.2.0 — veertien constructies:

| constructie | resultaat |
|---|---|
| `<style>` + class (Illustrator) | werkt |
| `<use>`, `<use href>`, `<symbol>` | werkt |
| `clipPath`, `mask`, group opacity | werkt |
| inline `style="fill:…"`, hex, `rgb()` 0-255 | werkt |
| geen viewBox, wel width/height | werkt |
| **`rgb()` in procenten** | **leeg** → genormaliseerd |
| **`<switch>` wrapper** | **leeg** → rasterroute |
| **fill via CSS-variabele `var(--x)`** | **leeg** → rasterroute |

Terzijde: de lengte van de PDF-contentstream is géén bruikbare controle. Bij
47 procent-rgb paden schrijft svg2pdf 3372 tekens weg terwijl er nul paden
zichtbaar zijn — het schrijft de paden wel, maar zonder geldige kleur-operator.
Vandaar dat de controle op de invoer zit en niet op het resultaat.

## Vectorlogo uit een PDF kwam als bitmap uit de export (KBM)

**Symptoom:** het KBM-logo — een PDF met tien vectorpaden — stond als vector
op het werkblad, maar kwam er in de drukproef als 300 DPI-beeld uit. Dat leek
aan de logo-editor te liggen, maar het ging al mis bij het laden.

**Oorzaak:** een PDF mag een transform (`cm`) doen zonder omringende `q`/`Q`,
en cairo doet dat standaard met de y-flip aan het begin van de pagina.
`pdfToSvg` opent dan wél een `<g transform="…">` maar krijgt nooit de
bijbehorende `restore`, dus de SVG-string eindigt met een **ongesloten groep**
— twee `<g>` open, één `</g>` dicht.

Waarom dat zo lang onzichtbaar bleef: fabric's parser is tolerant en zette het
logo gewoon goed op het canvas. De export parseert diezelfde bron **strikt**
(`DOMParser` met `'image/svg+xml'`), kreeg een parse error, en viel terug op
raster. Vector op het scherm, bitmap in de PDF — zonder dat er ergens een
foutmelding verscheen.

**Fix:** `pdfToSvg` sluit nog openstaande groepen nu zelf af (en verwijdert
overtollige sluitingen), en valideert de eigen uitvoer met dezelfde strikte
parser als de export. Bij een fout staat er voortaan luid `ONGELDIGE SVG` in
de console in plaats van een stille terugval.

Die validatie vond meteen een tweede fout: `pdfToSvg` schreef bij live tekst
`font-family=""Poster Gothic ATF Light", sans-serif"` — dubbele quotes binnen
een attribuut dat zelf met dubbele quotes staat, dus ongeldige XML
("attributes construct error"). Nu enkele quotes.

Gemeten, eind-tot-eind in de builder:
- vóór: `SVG vector embed FAILED … Opening and ending tag mismatch: g line 2 and svg` → `falling back to raster`
- ná:  `1 niet-gesloten <g> aangevuld` → `SVG vector embed OK`

Dit trof elke PDF met een ongebalanceerde `q`/`Q` — cairo-, Inkscape- en
sommige Illustrator-exports. Die kwamen allemaal stilzwijgend als raster uit
de export.

## Regressie

`_normalizeSvgColors` raakt uitsluitend `rgb(x%, y%, z%)`. Getest: hex,
`rgb()` in 0-255, `opacity:50%` in een style, en bestanden zonder procenten
blijven onveranderd. Stroke-kleuren worden net zo goed omgezet als fills.

De hele builder is voor deze release lokaal nagebouwd en in Chromium gedraaid
(bibliotheken uit npm in plaats van de CDN, Supabase vervangen door een stub),
zodat laden, logo-editor, vel vullen en export echt doorlopen zijn in plaats
van alleen beredeneerd. Routecontrole op drie bestanden na de wijziging:

| bestand | route | SVG geldig |
|---|---|---|
| `KBM-groep-1-kleur.pdf` | PATH A (bewerkbare SVG) → Track 1 vector | ja (was: nee) |
| `west aan zee.pdf` | PATH B (live tekst) — ongewijzigd | ja (was: nee) |
| `Test123.pdf` | PATH B (stencil-mask) — ongewijzigd | ja |
| `Freshwear-logo.svg` | Track 1 vector, kleuren `#1e1f24` / `#3a7477` | ja (was: leeg) |
