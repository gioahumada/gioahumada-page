import { Button, Glass } from 'glisse';

export function PhotoBack() {
  return <Glass className="back-button" data-theme="dark"><a href="/" aria-label="Volver al inicio"><span className="material-symbols-outlined" aria-hidden="true">arrow_back</span></a></Glass>;
}

export function PhotoShare() {
  return <Button className="share-button" data-theme="dark" aria-label="Compartir" icon={<span className="material-symbols-outlined" aria-hidden="true">ios_share</span>} />;
}
