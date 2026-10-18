import nodemailer from 'nodemailer';

// Owner notifications for contact-form submissions.
// Channels are optional: a missing credential skips that channel instead of
// failing the request, and the result is reported so the Vercel logs show it.

const SITE = 'abhishekprotfolio.vercel.app';
const WHATSAPP_MAX = 1500; // keep CallMeBot messages comfortably short

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));
const clip = (s, n) => {
  const t = String(s ?? '').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
};

/* ---------------------------------- WhatsApp (CallMeBot, free) ---------------------------------- */

export async function sendWhatsApp({ name, email, message }) {
  const to = process.env.NOTIFY_WHATSAPP_TO || '917440497125';
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!apikey) return { channel: 'whatsapp', ok: false, skipped: 'CALLMEBOT_APIKEY not set' };

  const text = [
    'New portfolio message',
    '',
    `From: ${clip(name, 80)}`,
    `Email: ${clip(email, 120)}`,
    '',
    clip(message, WHATSAPP_MAX),
    '',
    `— ${SITE}`
  ].join('\n');

  const url = 'https://api.callmebot.com/whatsapp.php'
    + `?phone=${encodeURIComponent(to)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;

  const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
  const body = (await r.text().catch(() => '')).trim().slice(0, 200);
  // CallMeBot answers with plain text; errors come back as HTTP 200 + "ERROR ...".
  const ok = r.ok && !/error|invalid|limit/i.test(body);
  return { channel: 'whatsapp', ok, status: r.status, detail: body || undefined };
}

/* -------------------------------------- Email (SMTP) -------------------------------------- */

let transporter;
function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  const port = Number(process.env.SMTP_PORT) || 465;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
  return transporter;
}

export async function sendEmail({ name, email, message }) {
  const t = getTransporter();
  if (!t) return { channel: 'email', ok: false, skipped: 'SMTP credentials not set' };
  const from = process.env.SMTP_USER || process.env.GMAIL_USER;
  const to = process.env.NOTIFY_EMAIL_TO || from;

  await t.sendMail({
    from: `"Portfolio" <${from}>`,
    to,
    replyTo: `"${clip(name, 80).replace(/"/g, '')}" <${email}>`,
    subject: clip(`Portfolio: new message from ${name}`, 140),
    text: `New contact-form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nReply directly to this email to answer ${clip(name, 40)}.`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0b;padding:28px;color:#f2f2ee">
        <div style="max-width:560px;margin:auto;border:1px solid #26262a;border-radius:16px;background:#101013;padding:24px">
          <p style="margin:0 0 18px;color:#7cf5c8;font-size:13px;letter-spacing:.08em;text-transform:uppercase">New message · ${esc(SITE)}</p>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${esc(name)}</p>
          <p style="margin:0 0 18px;color:#8a8a85"><strong style="color:#f2f2ee">Email:</strong> ${esc(email)}</p>
          <div style="border-left:2px solid #7cf5c8;padding:2px 0 2px 14px;color:#d8d8d2;white-space:pre-wrap;line-height:1.6">${esc(message)}</div>
          <p style="margin:20px 0 0;color:#8a8a85;font-size:13px">Reply directly to this email to get back in touch.</p>
        </div>
      </div>`
  });
  return { channel: 'email', ok: true };
}

/* --------------------------------------------- Both --------------------------------------------- */

export async function notifyOwner(payload) {
  const results = await Promise.allSettled([sendWhatsApp(payload), sendEmail(payload)]);
  const summary = results.map((r) => (r.status === 'fulfilled' ? r.value : { ok: false, error: (r.reason && r.reason.message) || String(r.reason) }));
  console.log('[contact] notify:', JSON.stringify(summary));
  return summary;
}
