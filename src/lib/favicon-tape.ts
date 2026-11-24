import faviconSvg from "../../public/favicon.svg?raw";

// Chrome no anima los favicon SVG, así que dibujamos la cinta "gio" en un canvas
// y reemplazamos el icono cuadro a cuadro.
const PATH = faviconSvg.match(/<path id="t" d="([^"]+)"/)?.[1];
const SIZE = 64;
const PERIOD = 320; // palabra (~118) + hueco; con icono de 100, ~100 de hueco = icono vacío
const SECONDS = 7; // una vuelta completa
const FPS = 15;

function ensureLink(): HTMLLinkElement {
  let link = document.querySelector<HTMLLinkElement>("link#tape-favicon");
  if (!link) {
    document.querySelectorAll('link[rel~="icon"]').forEach((l) => l.remove());
    link = document.createElement("link");
    link.id = "tape-favicon";
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);
  }
  return link;
}

export function startFaviconTape() {
  if (!PATH || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const glyphs = new Path2D(PATH);
  const scale = SIZE / 100;
  const start = performance.now();

  const draw = () => {
    if (document.hidden) return;
    const offset = (((performance.now() - start) / 1000 / SECONDS) % 1) * PERIOD;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, SIZE, SIZE, 20 * scale);
    ctx.clip();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#fff";
    ctx.scale(scale, scale);
    for (const x of [-offset, PERIOD - offset]) {
      ctx.save();
      ctx.translate(x, 0);
      ctx.fill(glyphs);
      ctx.restore();
    }
    ctx.restore();
    ensureLink().href = canvas.toDataURL("image/png");
  };

  setInterval(draw, 1000 / FPS);
  document.addEventListener("astro:after-swap", draw);
  draw();
}
