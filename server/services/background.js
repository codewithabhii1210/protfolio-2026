// Runs a promise after the HTTP response has been sent, without freezing it.
// Vercel keeps the function alive only for promises handed to waitUntil();
// elsewhere we return null and the caller decides how long to wait.
let schedule = null;
try {
  ({ waitUntil: schedule } = await import('@vercel/functions'));
} catch {
  schedule = null;
}

export function background(p) {
  if (!p || typeof p.then !== 'function') return null;
  // Never let a background rejection surface as an unhandled rejection.
  p.catch((e) => console.error('[background]', (e && e.message) || e));
  try {
    if (typeof schedule === 'function') { schedule(p); return 'waitUntil'; }
    if (typeof globalThis.waitUntil === 'function') { globalThis.waitUntil(p); return 'globalThis.waitUntil'; }
  } catch (e) {
    console.error('[background] waitUntil failed:', (e && e.message) || e);
  }
  return null;
}
