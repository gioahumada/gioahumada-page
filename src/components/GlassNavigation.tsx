import { Button, Glass, TabBar } from 'glisse';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const icons = [
  <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h8M8 9h2"/></>,
  <><path d="M14 2v4a2 2 0 0 0 2 2h4M15 18a3 3 0 1 0-6 0M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="12" cy="13" r="2"/></>,
  <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
];
const socials = [
  { href: 'https://x.com/Rockjaj', name: '𝕏' },
  { href: 'https://www.linkedin.com/in/gioahumada/', name: 'LinkedIn' },
  { href: 'https://github.com/gioahumada', name: 'Github' },
  { href: 'https://www.instagram.com/gio.ahumada1/', name: 'Instagram' },
  { href: 'https://orcid.org/0009-0008-2288-1220', name: 'Orcid' },
];
const pages = [
  { href: '/', name: 'Inicio' },
  { href: '/documents', name: 'Documentos' },
  { href: '/resume', name: 'Résumé' },
  { href: '/photos', name: 'Fotografías' },
];

export default function GlassNavigation({ pathname }: { pathname: string }) {
  const selected = pages.findLast(({ href }) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  const [open, setOpen] = useState(false);
  const social = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState({ right: 0, bottom: 0 });
  useEffect(() => {
    const close = (event: MouseEvent) => { const target = event.target as Node; if (!social.current?.contains(target) && !menu.current?.contains(target)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('click', close);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', escape); };
  }, []);
  return <Glass className="dock-controls">
    <TabBar aria-label="Navegación principal" value={selected?.href ?? null} items={pages.map(({ href, name }, index) => ({
      value: href, href, label: <><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[index]}</svg><span className="visually-hidden">{name}</span></>,
    }))} />
    <div className="dock-separator" aria-hidden="true" />
    <div className="dock-social" ref={social}>
      <Button icon={<img src="/logo.webp" alt="" />} aria-label="Redes sociales" aria-expanded={open} aria-controls="social-menu" onClick={() => {
        const sound = new Audio('/sounds/click.wav');
        sound.volume = 0.1;
        sound.play().catch(() => {});
        const rect = social.current?.getBoundingClientRect();
        if (rect) setAnchor({ right: window.innerWidth - rect.right, bottom: window.innerHeight - rect.top + 12 });
        setOpen(!open);
      }} />
      {open && createPortal(
        <Glass ref={menu} id="social-menu" className="dock-social-menu" style={{ right: anchor.right, bottom: anchor.bottom }}>
          {socials.map(({ href, name }) => (
            <a key={name} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{name}</a>
          ))}
        </Glass>,
        document.querySelector('.bottom-nav-container') ?? document.body,
      )}
    </div>
  </Glass>;
}
