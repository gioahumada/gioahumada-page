import { siGithub, siInstagram, siX } from 'simple-icons';

const filled = (path: string) => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
);
const stroked = (children: React.ReactNode) => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const LINKEDIN_PATH = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

const links = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/gioahumada/', icon: filled(LINKEDIN_PATH) },
  { name: 'GitHub', href: 'https://github.com/gioahumada', icon: filled(siGithub.path) },
  { name: 'Instagram', href: 'https://www.instagram.com/gio.ahumada1/', icon: filled(siInstagram.path) },
  { name: 'X', href: 'https://x.com/Rockjaj', icon: filled(siX.path) },
  { name: 'Correo', href: 'mailto:giovanni.ahumada@pucv.cl', icon: stroked(<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>) },
];

export default function SocialLinks() {
  return (
    <div className="cv-social">
      <p className="cv-social-label">Contáctame acá</p>
      <div className="cv-social-dock">
        {links.map(({ name, href, icon }) => (
          <a key={name} href={href} aria-label={name} title={name} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
