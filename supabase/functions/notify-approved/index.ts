// Edge function: notify-approved — mailt de gebruiker dat zijn account is goedgekeurd.
// Alleen admins. v2.58 security hardening. Vereist secret: RESEND_API_KEY
import { createClient } from 'npm:@supabase/supabase-js@2';

// v2.58 security: CORS alleen voor eigen domeinen (was '*') + lokaal testen.
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
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Aanroeper moet ingelogd zijn, admin zijn én niet geblokkeerd.
async function requireAdmin(req: Request) {
  const supaUrl = Deno.env.get('SUPABASE_URL')!;
  const anon = createClient(supaUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
  });
  const { data: { user } } = await anon.auth.getUser();
  if (!user) return { error: json(req, { error: 'unauthorized' }, 401) };
  const admin = createClient(supaUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: prof } = await admin.from('profiles').select('role, blocked').eq('id', user.id).single();
  if (!prof || prof.role !== 'admin' || prof.blocked) return { error: json(req, { error: 'forbidden' }, 403) };
  return { user, admin };
}

const FROM_EMAIL = 'Gangsheet Builder <noreply@transferpersshop.nl>';
const BUILDER_URL = 'https://builder.transferpersshop.nl';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsFor(req) });
  if (req.method !== 'POST') return json(req, { error: 'method not allowed' }, 405);
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const admin = auth.admin!;
    const { userId } = await req.json();
    if (typeof userId !== 'string' || !UUID_RE.test(userId)) return json(req, { error: 'Ongeldige gebruiker' }, 400);

    const { data: target, error: uErr } = await admin.auth.admin.getUserById(userId);
    if (uErr || !target?.user?.email) return json(req, { error: 'gebruiker niet gevonden' }, 404);
    const email = target.user.email;
    const { data: tProf } = await admin.from('profiles').select('display_name').eq('id', userId).single();
    const name = tProf?.display_name || '';

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) { console.warn('Geen RESEND_API_KEY ingesteld'); return json(req, { success: false }); }

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:20px">
        <h2 style="color:#1d9aaf;margin:0 0 16px">Je account is goedgekeurd</h2>
        <p style="font-size:15px">Hoi${name ? ' ' + escHtml(name) : ''},</p>
        <p style="font-size:15px">Je account voor de Gangsheet Builder van Transferpersshop is goedgekeurd. Je kunt nu inloggen en direct aan de slag met je transfervellen.</p>
        <p style="margin:24px 0"><a href="${BUILDER_URL}" style="background:#1d9aaf;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Open de Gangsheet Builder</a></p>
        <p style="font-size:14px;color:#6b7280">Vragen? Mail ons op <a href="mailto:info@transferpersshop.nl" style="color:#1d9aaf">info@transferpersshop.nl</a>.</p>
      </div>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: [email], subject: 'Je Gangsheet Builder account is goedgekeurd', html: htmlBody }),
    });
    if (!res.ok) { console.error('Resend error:', await res.text()); return json(req, { error: 'Mail versturen mislukt' }, 502); }
    return json(req, { success: true });
  } catch (e) {
    console.error('notify-approved error:', e);
    return json(req, { error: 'Er ging iets mis' }, 500);
  }
});

function escHtml(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
