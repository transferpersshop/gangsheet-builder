# Gangsheet Builder v2.64.0 · 23-11-2026

Te uploaden: app.js, index.html, logo-editor.js, text-editor.js

## Nieuw / gewijzigd
1. **Prijsindicatie als los blok** onder Samenvatting; bedragen zonder euroteken (16,95 / 20,51).
2. **Logo's groeperen op het vel**: selecteer 2+ logo's → "Groeperen" in Geselecteerde logo's, Ctrl+G of rechtermuisknop.
   - Klik op één groepslid selecteert de hele groep; slepen verplaatst hem in één keer (gestippeld kader).
   - Dubbelklik binnen een groep = één logo los selecteren (bv. voor Logo bewerken).
   - Optimaliseer indeling / automatisch indelen plaatst een groep als één blok (onderlinge positie en draaiing blijven).
   - "Groep opheffen" / Ctrl+Shift+G. Groepen blijven bewaard in undo en in .gsb-opdrachten.
3. **Kopiëren/plakken**: Ctrl+C / Ctrl+X / Ctrl+V (Mac: ⌘) en rechtermuismenu (Kopiëren, Knippen, Plakken, Dupliceren, Groeperen, Verwijderen).
   Plakken via het menu zet de kopie op de muisplek als die vrij is. Een geplakte groep wordt een nieuwe groep.
   "Dupliceer alles" kopieert een selectie nu als blok.
4. **Logo bewerken**: tool "Onderdelen" heet nu **"Bewerken"**.
5. **Logo bewerken > Kleur > Losse delen** (vectorlogo's): delen aanklikken (Shift/kader voor meer, "Groepen opbreken" voor kleinere delen) en een eigen kleur geven; met ongedaan/opnieuw. Toepassen werkt ook door op alle kopieën op het vel.

## Ook opgelost
- Na slepen van een meervoudige selectie werden de mm-posities van de logo's niet bijgewerkt (vrije-plek zoeken kon daardoor overlappen); nu wel, incl. binnen-het-vel-houden en undo.
- Pijltjestoetsen bij een meervoudige selectie verschoven niets.

## Bekend (niet aangepast)
- Bij o.a. Dupliceren en Verwijderen lijkt de eerste Ctrl+Z niets te doen (de undo-stap wordt ná de wijziging opgeslagen); de tweede Ctrl+Z werkt. De nieuwe acties in deze release hebben dit niet.

## Getest (headless Chromium, Fabric 5.3.0)
Groeperen, slepen, plakken (toetsenbord + menu), undo, optimaliseren met groep, dubbelklik, opheffen, kleur per deel (ook Illustrator-SVG met CSS-classes), Bewerken-tool verwijderen, prijsblok NL/EN. Geen consolefouten.
