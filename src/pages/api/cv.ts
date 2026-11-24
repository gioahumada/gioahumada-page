import type { APIRoute } from 'astro';
import { cvHumanBase64 } from '../../generated/cv-human';

export const prerender = false;

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
// Tiempo máximo entre que el visitante resuelve el captcha y pide el PDF.
const MAX_AGE_MS = 60_000;
// Clave de prueba pública de Cloudflare (documentada, siempre aprueba). Solo se usa en desarrollo
// y este archivo es código de servidor: no es un secreto ni llega al navegador.
// react-doctor-disable-next-line react-doctor/no-secrets-in-client-code
const DEV_SECRET = '1x0000000000000000000000000000000AA';

const json = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.TURNSTILE_SECRET_KEY ?? (import.meta.env.DEV ? DEV_SECRET : undefined);
  if (!secret) return json(500, 'Servidor sin configurar');

  let token: unknown;
  try {
    ({ token } = await request.json());
  } catch {
    return json(400, 'Solicitud inválida');
  }
  if (typeof token !== 'string' || !token) return json(400, 'Falta la verificación');

  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (ip) body.set('remoteip', ip);

  const verification = await fetch(VERIFY_URL, { method: 'POST', body }).catch(() => null);
  // Si Cloudflare no responde bien no es culpa del visitante: que pueda reintentar.
  if (!verification?.ok) return json(502, 'No se pudo verificar, inténtalo de nuevo');
  const check = await verification.json().catch(() => null);
  if (!check?.success) return json(403, 'Verificación fallida');

  // Límite de tiempo: el captcha caduca a los 60 s
  const solvedAt = Date.parse(check.challenge_ts);
  if (!Number.isNaN(solvedAt) && Date.now() - solvedAt > MAX_AGE_MS) {
    return json(408, 'La verificación expiró');
  }

  return new Response(Buffer.from(cvHumanBase64, 'base64'), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Giovanni-Ahumada-CV.pdf"',
      'Cache-Control': 'no-store',
    },
  });
};
