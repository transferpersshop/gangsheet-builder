// Edge function: admin-set-password — v2.58 security hardening
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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsFor(req) });
  if (req.method !== 'POST') return json(req, { error: 'method not allowed' }, 405);
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const { userId, password } = await req.json();
    if (typeof userId !== 'string' || !UUID_RE.test(userId)) return json(req, { error: 'Ongeldige gebruiker' }, 400);
    if (typeof password !== 'string' || password.length < 10 || password.length > 72) {
      return json(req, { error: 'Wachtwoord moet 10 tot 72 tekens zijn' }, 400);
    }
    const { error } = await auth.admin!.auth.admin.updateUserById(userId, { password });
    if (error) { console.error('admin-set-password:', error); return json(req, { error: 'Wachtwoord instellen mislukt' }, 500); }
    console.log('admin-set-password: door', auth.user!.id, 'voor', userId);
    return json(req, { ok: true });
  } catch (e) {
    console.error('admin-set-password error:', e);
    return json(req, { error: 'Er ging iets mis' }, 500);
  }
});
