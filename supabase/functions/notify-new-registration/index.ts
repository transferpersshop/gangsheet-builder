// Edge function: notify-new-registration
// Mailt info@transferpersshop.nl dat een nieuwe gebruiker wacht op goedkeuring.
//
// v2.58 security hardening:
// - Was door iedereen met de publieke anon key aan te roepen, met vrije inhoud
//   (spam naar info@ en het Resend-quotum). Nu alleen voor een INGELOGDE, nieuwe,
//   nog niet goedgekeurde gebruiker, en maximaal één keer per account.
// - Naam/bedrijf/e-mail komen server-side uit het profiel, niet uit de request body.
// - CORS alleen eigen domeinen, generieke foutmeldingen.
// Vereist secret: RESEND_API_KEY
import { createClient } from 'npm:@supabase/supabase-js@2';

const NOTIFY_TO = 'info@transferpersshop.nl';
const FROM_EMAIL = 'Gangsheet Builder <noreply@transferpersshop.nl>';
const MAX_AGE_MS = 60 * 60 * 1000; // account max 1 uur oud

const ALLOWED_ORIGINS = [
  'https://builder.transferpersshop.nl',
  'https://www.transferpersshop.nl',
  'http://localhost:8765',
  'http://127.0.0.1:8765',
];
function corsFor(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };
}
function json(req: Request, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsFor(req) });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsFor(req) });
  if (req.method !== 'POST') return json(req, { error: 'method not allowed' }, 405);
  try {
    const supaUrl = Deno.env.get('SUPABASE_URL')!;
    const anon = createClient(supaUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    });
    const { data: { user } } = await anon.auth.getUser();
    if (!user) return json(req, { error: 'unauthorized' }, 401);

    // Alleen verse accounts, en maar één melding per account
    const age = Date.now() - new Date(user.created_at).getTime();
    if (age > MAX_AGE_MS || user.app_metadata?.reg_notified) return json(req, { success: true, skipped: true });

    const admin = createClient(supaUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: prof } = await admin.from('profiles')
      .select('display_name, company_name, approved, blocked').eq('id', user.id).single();
    if (!prof || prof.approved || prof.blocked) return json(req, { success: true, skipped: true });

    // Eerst markeren (voorkomt dubbele mails bij herhaald aanroepen)
    await admin.auth.admin.updateUserById(user.id, { app_metadata: { ...user.app_metadata, reg_notified: true } });

    const name = (prof.display_name || '(niet opgegeven)').slice(0, 200);
    const company = (prof.company_name || '(niet opgegeven)').slice(0, 200);
    const userEmail = user.email || '(niet opgegeven)';

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) { console.warn('Geen RESEND_API_KEY ingesteld'); return json(req, { success: false }); }

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:20px">
        <h2 style="color:#1d9aaf;margin:0 0 16px">Nieuwe registratie in Gangsheet Builder</h2>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;width:120px">Naam</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">${escHtml(name)}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Bedrijf</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">${escHtml(company)}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">E-mail</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">
                <a href="mailto:${escHtml(userEmail)}" style="color:#1d9aaf">${escHtml(userEmail)}</a></td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:14px;color:#6b7280">
          Ga naar het <a href="https://builder.transferpersshop.nl" style="color:#1d9aaf">admin panel</a> om dit account goed te keuren of af te wijzen.
        </p>
      </div>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: [NOTIFY_TO], subject: `Nieuwe registratie: ${name} — ${company}`, html: htmlBody }),
    });
    if (!res.ok) { console.error('Resend error:', await res.text()); return json(req, { error: 'Mail versturen mislukt' }, 502); }
    return json(req, { success: true });
  } catch (e) {
    console.error('notify-new-registration error:', e);
    return json(req, { error: 'Er ging iets mis' }, 500);
  }
});

function escHtml(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
