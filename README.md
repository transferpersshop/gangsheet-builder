# Gangsheet Builder

DTF transfer vel builder voor [Transferpersshop](https://www.transferpersshop.nl), live op builder.transferpersshop.nl via GitHub Pages. Statische site zonder build-stap: open `index.html` in een browser. Wat er per versie veranderd is staat in `RELEASE-NOTES.md`.

## Smoke-test

Een korte automatische test (`tests/smoke.spec.js`) laadt de builder, plaatst een logo en exporteert een PDF. Een tweede test controleert dat elk CDN-script in `index.html` een exact versienummer en een integrity-hash heeft.

De test draait volledig lokaal: de bibliotheken komen uit `node_modules` (in dezelfde versie als in `index.html`, en de integrity-hash moet kloppen) en Supabase wordt nagebootst, dus er gaat niets naar de echte database.

Zelf draaien (Node 22):

```
npm ci
npx playwright install chromium
npm test
```

### Een CDN-bibliotheek bijwerken

Pas drie dingen samen aan: de versie in de `<script>`-URL in `index.html`, de `integrity`-hash daarbij (op jsDelivr te vinden met de knop "Copy HTML + SRI") en `devDependencies` in `package.json` (`npm install --save-dev --save-exact pakket@x.y.z`). Komt iets niet overeen, dan faalt de smoke-test.

## Werkwijze: branches en pull requests

`main` is wat live staat: elke commit op `main` gaat direct naar builder.transferpersshop.nl. Werk daarom zo:

1. Maak een branch (op GitHub: branch-menu → nieuwe naam, of `git switch -c mijn-wijziging`).
2. Zet je wijzigingen op die branch. Uploaden via de website mag ook: kies dan onderaan "Create a new branch for this commit".
3. Open een pull request naar `main`. De smoke-test draait automatisch en staat onder de PR.
4. Groen? Dan mergen. GitHub Pages zet het binnen een paar minuten live.
