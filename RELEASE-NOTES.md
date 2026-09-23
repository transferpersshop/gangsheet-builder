# Gangsheet Builder v2.58.0 — 23-09-2026 — security-release

Bouwt voort op v2.57.1. Geen functionele wijzigingen voor gebruikers; alleen beveiliging.

Gewijzigde bestanden:
- Frontend (uploaden naar hosting): `index.html`, `app.js`, `login-ui.js`
- Database (1× uitvoeren in Supabase SQL Editor): `supabase/migrations/2026-09-23-security-hardening.sql`
- Edge functions (deployen): `admin-set-password`, `admin-delete-user`, `notify-approved`, `notify-new-registration`

## Volgorde van live zetten

1. **SQL** — `supabase/migrations/2026-09-23-security-hardening.sql` in de SQL Editor. Alles zit in één
   transactie: faalt er iets, dan verandert er niets. Kan veilig vóór de frontend (oude frontend blijft werken).
2. **Edge functions** deployen (`supabase functions deploy <naam>` voor alle 4, of laat Claude het doen via de connector).
   Compatibel met de oude frontend. CORS staat localhost:8765 toe, dus lokaal testen blijft werken.
3. **Edge function `convert-eps` verwijderen** (Dashboard > Edge Functions). Wordt niet meer gebruikt
   (EPS gaat via `eps-worker.js` in de browser) en draaide Ghostscript voor iedereen met de anon key.
4. **Frontend uploaden**: `index.html`, `app.js`, `login-ui.js`.
5. **Dashboard-instellingen** (geen code): Auth > Passwords → *Leaked password protection* aan, minimale lengte 10.

## Wat er is opgelost

**Kritiek — zelf-promotie naar admin (SQL).** De policy "Users can update own profile" liet elke ingelogde gebruiker
zijn eigen `role`/`approved`/`blocked` wijzigen. Nieuwe trigger `profiles_protect_privileged` blokkeert dat voor
niet-admins; bij een INSERT door een gebruiker worden die velden geforceerd op user/false/false.

**Goedkeuring en blokkade server-side (SQL).** Nieuwe functie `is_active_user()`. Projecten lezen/opslaan/verwijderen
en usage-logs schrijven kan alleen nog als je goedgekeurd en niet geblokkeerd bent (signup-log uitgezonderd).
Voorheen checkte alleen `auth.js` dit in de browser.

**Stored XSS in adminpaneel (`login-ui.js`).** Namen kwamen in inline `onclick="...('NAAM')"` terecht; HTML-escaping
beschermt daar niet (de browser zet `&#39;` terug naar `'` vóór de JS draait). Nieuwe helper `_jsArg()` maakt er
een echte JS-string van (JSON) én escapet voor het attribuut. `_esc()` escapet nu ook `'`. `thumbnail_path` en
instellingswaarden worden nu ge-escaped.

**pdf.js CVE-2024-4367 (`app.js`, `login-ui.js`).** `isEvalSupported: false` op alle 4 `getDocument()`-aanroepen
(3× import, 1× proeflogo). Daarnaast staat eval via de CSP nu ook uit. Export getest: identiek.

**Externe libraries (`index.html`).** Alle 7 scripts vastgepind op exacte versie met SRI-hash (`integrity`).
cdnjs vervangen door jsDelivr (npm-bestanden, byte-identiek, zodat de hash klopt). `supabase-js` stond op `@2`
(automatische updates) en staat nu vast op 2.117.1 (= wat `@2` nu serveert).

**Content-Security-Policy (`index.html`).** Via `<meta>`. Scripts alleen van eigen domein/jsDelivr/unpkg/imgly;
de pagina mag alleen praten met Supabase, jsDelivr, Google Fonts en imgly. Dat blokkeert het wegsturen van een
gestolen sessie naar een vreemde server. `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`.
Beperking: inline scripts/handlers moeten nog (`'unsafe-inline'`); `frame-ancestors`/HSTS kan niet via meta → Cloudflare.

**Edge functions.** Admin-functies eisen nu ook `blocked = false`. CORS alleen eigen domeinen + localhost:8765.
Generieke foutmeldingen naar de browser (details alleen in de logs). UUID-validatie.
`notify-new-registration` was door iedereen aan te roepen met vrije inhoud (spam naar info@ / Resend-quotum):
werkt nu alleen voor een ingelogde, nieuwe (<1 uur), niet-goedgekeurde gebruiker, max. 1× per account, en haalt
naam/bedrijf/e-mail zelf uit het profiel.

**Invoer en veldvervalsing (SQL).** `usage_logs.action` alleen bekende waarden, metadata ≤ 2 KB. Lengtelimieten op
profielvelden; `proof_logo` moet een `data:image/…`-URL zijn. Projectnaam ≤ 200 tekens, canvas ≤ 20 MB.
Bestaande data valt ruim binnen de limieten (gecontroleerd).

**Thumbnails-bucket privé (SQL).** Leeg en ongebruikt, maar stond publiek.

**Audit-log (SQL).** Nieuwe tabel `admin_audit_log`: elke wijziging van rol/goedkeuring/blokkade wordt met
actor en tijdstip vastgelegd. Alleen admins kunnen lezen, niemand kan wijzigen.

**Rechten opgeschoond (SQL).** `handle_new_user()` niet meer als RPC aanroepbaar; `is_admin()` niet voor anon;
anon heeft geen tabelrechten meer; TRUNCATE ingetrokken.

## Getest

- SQL: gedraaid op een lokale Postgres-kopie van het schema (zelfde policies, grants en triggers als live).
  Vóór de fix: gewone gebruiker maakt zichzelf admin → lukt. Na de fix: geweigerd. Klant kan thema/naam/proeflogo
  nog opslaan en projecten opslaan/lezen; admin kan goedkeuren en rollen wijzigen; niet-goedgekeurde en geblokkeerde
  accounts kunnen niet bij projecten; signup-trigger werkt; audit-log vult zich; script is 2× te draaien.
- Frontend: Chromium met CSP + SRI: alle 7 libraries laden, geen CSP-meldingen, PDF-import werkt met
  `isEvalSupported: false`. XSS-helper getest met o.a. `x');alert(1);//` en `"><img onerror>` → blijft tekst.

## Lokaal testen — let hierop

`python3 -m http.server 8765` in de projectmap → http://localhost:8765. Controleer:
- inloggen, project opslaan/openen/verwijderen
- PDF/AI importeren, EPS importeren, tekst met Google Font, achtergrond verwijderen (imgly), export
- adminpaneel: goedkeuren, blokkeren, rol wijzigen, tijdelijk wachtwoord
- console: zoek op `Content-Security-Policy` of `integrity` — elke melding daar = iets wat de CSP/SRI tegenhoudt
