# Deploy instructies v2.18.0

## 1. SQL migratie uitvoeren

Open het Supabase Dashboard > SQL Editor en voer `migrations/add-email-to-profiles.sql` uit.

Dit doet drie dingen:
- Voegt de `email` kolom toe aan de `profiles` tabel
- Vult bestaande profielen met het emailadres uit `auth.users`
- Updatet de `handle_new_user` trigger zodat nieuwe registraties automatisch email opslaan

**Let op:** Controleer of je bestaande `handle_new_user` trigger extra kolommen instelt (zoals `role`). Als dat zo is, voeg die toe aan de `INSERT` in het SQL-script voordat je het uitvoert.

## 2. Edge function deployen

Vanuit de project root:

```bash
supabase functions deploy notify-new-registration
```

## 3. Resend API key instellen

Maak een gratis account op [resend.com](https://resend.com) (100 mails/dag gratis).

Stel de API key in via Supabase Dashboard > Edge Functions > Secrets:

```
RESEND_API_KEY = re_xxxxxxxxxxxxx
```

**Domein verificatie:** Voeg in Resend je domein `transferpersshop.nl` toe en stel de DNS-records in. Tot die tijd kun je alleen mailen naar je eigen geverifieerde emailadres.

## 4. Frontend bestanden uploaden

Upload de gewijzigde bestanden naar je hosting:
- `auth.js` — email opslaan in profiel + notificatie-aanroep
- `login-ui.js` — e-mail kolom in admin gebruikerstabel

## Wat er veranderd is

**auth.js:**
- `listUsers()` haalt nu ook `email` op uit profiles
- `signUp()` slaat email op in profiel en roept `notify-new-registration` edge function aan
- `adminCreateUser()` slaat email op in profiel
- Nieuwe interne functie `_notifyNewRegistration()`

**login-ui.js:**
- Admin gebruikerstabel heeft nu een E-mail kolom

**Nieuw: edge function `notify-new-registration`**
- Ontvangt naam, bedrijfsnaam en email
- Stuurt een nette HTML-mail naar info@transferpersshop.nl
- Gebruikt Resend als mail provider
