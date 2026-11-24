import { Button } from 'glisse';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, opts: Record<string, unknown>): string;
      reset(id?: string): void;
      remove(id?: string): void;
    };
  }
}

// Clave pública de prueba de Cloudflare (siempre aprueba). En producción: PUBLIC_TURNSTILE_SITE_KEY.
const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA';
const WHO = ['un robot', 'Claude', 'ChatGPT', 'Gemini', 'un ATS'];

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('No se pudo cargar Turnstile'));
    document.head.appendChild(s);
  });
}

function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export default function CvButtons() {
  const [busy, setBusy] = useState<'human' | 'ats' | null>(null);
  const [message, setMessage] = useState('');
  const [who, setWho] = useState(0);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setWho((i) => (i + 1) % WHO.length), 2200);
    return () => clearInterval(id);
  }, []);

  const clearWidget = () => {
    if (widgetId.current) window.turnstile?.remove(widgetId.current);
    widgetId.current = undefined;
  };
  useEffect(() => clearWidget, []);

  async function fetchHuman(token: string) {
    const res = await fetch('/api/cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (res.status === 408) throw new Error('La verificación expiró. Inténtalo de nuevo.');
    if (!res.ok) throw new Error('No se pudo verificar. Inténtalo de nuevo.');
    save(await res.blob(), 'Giovanni-Ahumada-CV.pdf');
  }

  async function downloadHuman() {
    setBusy('human');
    setMessage('Verificando…');
    try {
      await loadTurnstile();
      clearWidget();
      const token = await new Promise<string>((resolve, reject) => {
        widgetId.current = window.turnstile!.render(widget.current!, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          callback: resolve,
          'error-callback': () => reject(new Error('La verificación falló. Inténtalo de nuevo.')),
        });
      });
      setMessage('Generando…');
      await fetchHuman(token);
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage(err instanceof Error ? err.message : 'No se pudo descargar el PDF.');
    } finally {
      clearWidget();
      setBusy(null);
    }
  }

  async function downloadAts() {
    setBusy('ats');
    setMessage('');
    try {
      const { buildAtsCv } = await import('../lib/typst-cv');
      save(await buildAtsCv(), 'Giovanni-Ahumada-CV-ATS.pdf');
    } catch (err) {
      console.error(err);
      setMessage('No se pudo generar el PDF. Intenta de nuevo.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <div className="cv-actions">
        <Button variant="filled" tint="var(--accent-color)" disabled={busy !== null} onClick={downloadHuman}>
          {busy === 'human' ? 'Descargando…' : 'Descargar CV'}
        </Button>
      </div>
      <div ref={widget} className="cv-widget" />
      <p className="cv-robot">
        <span className="visually-hidden">¿Eres un robot?</span>
        <span aria-hidden="true">
          ¿Eres <span key={who} className="cv-robot-who">{WHO[who]}</span>?
        </span>{' '}
        <button type="button" className="cv-robot-link" disabled={busy !== null} onClick={downloadAts}>
          {busy === 'ats' ? 'Generando…' : 'descarga tu versión acá'}
        </button>
      </p>
      <p className="cv-status" role="status" aria-live="polite">{message}</p>
    </>
  );
}
