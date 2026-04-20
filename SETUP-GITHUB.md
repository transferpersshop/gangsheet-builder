# Gang Sheet Builder online zetten via GitHub Pages

## Wat je krijgt

Een werkende URL zoals: `https://transferpersshop.github.io/gangsheet-builder/`
Later kun je hier een eigen domein aan koppelen (bijv. `builder.transferpersshop.nl`).

---

## Stap 1: Nieuwe repository aanmaken op GitHub

1. Ga naar **github.com** en log in
2. Klik rechtsboven op het **+** icoon → **New repository**
3. Vul in:
   - **Repository name:** `gangsheet-builder`
   - **Description:** `DTF gang sheet builder tool`
   - **Public** aanvinken (nodig voor gratis GitHub Pages)
   - **NIET** aanvinken: "Add a README file" (die zit al in de bestanden)
4. Klik **Create repository**
5. Je komt nu op een pagina met instructies — **laat deze pagina open staan**, je hebt het adres nodig

---

## Stap 2: Bestanden uploaden

De makkelijkste manier (geen command line nodig):

1. Op de repository-pagina die je net hebt aangemaakt, klik op **"uploading an existing file"**
2. Sleep alle bestanden uit de `github-ready/` map naar het uploadvenster:
   - `index.html`
   - `app.js`
   - `logo-wit.svg`
   - `README.md`
3. Typ onderaan bij "Commit changes": `Initial release gang sheet builder`
4. Klik **Commit changes**

---

## Stap 3: GitHub Pages activeren

1. Ga naar je repository → tabblad **Settings** (bovenin)
2. Klik links in het menu op **Pages**
3. Onder "Source" kies:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Klik **Save**
5. Wacht 1-2 minuten. Refresh de pagina.
6. Bovenaan verschijnt: **"Your site is live at https://transferpersshop.github.io/gangsheet-builder/"**

Klaar! De tool is nu live.

---

## Stap 4 (optioneel): Eigen domein koppelen

Als je de builder wilt bereiken via bijv. `builder.transferpersshop.nl`:

### In GitHub:
1. Ga naar **Settings → Pages**
2. Vul bij **Custom domain** in: `builder.transferpersshop.nl`
3. Klik **Save**
4. Vink **Enforce HTTPS** aan

### Bij je domeinprovider (DNS):
Voeg een **CNAME-record** toe:

| Type  | Naam      | Waarde                                  |
|-------|-----------|-----------------------------------------|
| CNAME | builder   | transferpersshop.github.io              |

Dit doe je in het DNS-beheer van je domeinregistrar (bijv. TransIP, Antagonist, of waar transferpersshop.nl is geregistreerd).

Het kan tot 24 uur duren voordat DNS is doorgespeeld, maar meestal werkt het binnen een uur.

---

## Updates deployen

Als je later een update wilt doen:

1. Ga naar je repository op github.com
2. Klik op het bestand dat je wilt updaten (bijv. `app.js`)
3. Klik op het **potlood-icoon** (Edit) rechtsboven
4. Vervang de inhoud door de nieuwe versie
5. Klik **Commit changes**

GitHub Pages update automatisch binnen 1-2 minuten.

**Snellere manier:** sleep de nieuwe bestanden naar de repository via **Add file → Upload files**.
