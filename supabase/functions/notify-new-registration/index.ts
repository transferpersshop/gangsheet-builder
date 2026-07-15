// Edge function: notify-new-registration
// Stuurt een e-mail naar info@transferpersshop.nl wanneer een nieuwe gebruiker
// zich registreert en wacht op goedkeuring.
//
// Vereiste env vars (stel in via Supabase Dashboard > Edge Functions > Secrets):
//   RESEND_API_KEY  — API key van resend.com (gratis tot 100 mails/dag)
//
// Of als je liever SMTP gebruikt:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
//
// Deploy: supabase functions deploy notify-new-registration

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const NOTIFY_TO = 'info@transferpersshop.nl'
const FROM_EMAIL = 'Gangsheet Builder <noreply@transferpersshop.nl>'

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { display_name, company_name, email } = await req.json()

    const name = display_name || '(niet opgegeven)'
    const company = company_name || '(niet opgegeven)'
    const userEmail = email || '(niet opgegeven)'

    const subject = `Nieuwe registratie: ${name} — ${company}`
    const htmlBody = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:20px">
        <h2 style="color:#1d9aaf;margin:0 0 16px">Nieuwe registratie in Gangsheet Builder</h2>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;width:120px">Naam</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">${escHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Bedrijf</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">${escHtml(company)}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">E-mail</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">
              <a href="mailto:${escHtml(userEmail)}" style="color:#1d9aaf">${escHtml(userEmail)}</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:14px;color:#6b7280">
          Ga naar het <a href="https://builder.transferpersshop.nl" style="color:#1d9aaf">admin panel</a> om dit account goed te keuren of af te wijzen.
        </p>
      </div>
    `

    // ── Verstuur via Resend ──
    const resendKey = Deno.env.get('RESEND_API_KEY')
    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [NOTIFY_TO],
          subject,
          html: htmlBody,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
        return jsonResp({ error: 'Mail versturen mislukt', detail: err }, 500)
      }

      return jsonResp({ success: true })
    }

    // ── Geen mail provider geconfigureerd ──
    console.warn('Geen RESEND_API_KEY ingesteld — notificatie niet verstuurd.')
    console.log('Nieuwe registratie:', { name, company, email: userEmail })
    return jsonResp({ success: false, warning: 'Geen mail provider geconfigureerd. Stel RESEND_API_KEY in.' })

  } catch (e) {
    console.error('notify-new-registration error:', e)
    return jsonResp({ error: e.message || 'Onbekende fout' }, 500)
  }
})

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function jsonResp(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
