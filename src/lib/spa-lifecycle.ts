/**
 * SPA lifecycle helper para Astro ClientRouter.
 *
 * Los <script> de Astro se ejecutan una sola vez y los elementos del DOM se
 * recrean en cada navegación. `onPageLoad` resuelve esto: registra un setup
 * que se re-ejecuta en cada `astro:page-load` (carga inicial + SPA).
 *
 * El setup puede devolver una función de cleanup que se ejecuta antes del
 * siguiente setup, evitando memory leaks de listeners en window/document.
 *
 * Ejemplo:
 *   onPageLoad(() => {
 *     const handler = () => { ... };
 *     window.addEventListener('scroll', handler);
 *     return () => window.removeEventListener('scroll', handler);
 *   });
 *
 * El módulo debe importarse al menos una vez (idealmente desde un componente
 * global como el Layout) para registrar el listener de `astro:page-load`.
 */

type Setup = () => void | (() => void);
type Cleanup = () => void;

const setups: Setup[] = [];
let pendingCleanups: Cleanup[] = [];
let initialized = false;

function teardown(): void {
  for (const cleanup of pendingCleanups) {
    try {
      cleanup();
    } catch (e) {
      console.error("[spa-lifecycle] cleanup error:", e);
    }
  }
  pendingCleanups = [];
}

function runAll(): void {
  teardown();
  for (const setup of setups) {
    try {
      const result = setup();
      if (typeof result === "function") {
        pendingCleanups.push(result);
      }
    } catch (e) {
      console.error("[spa-lifecycle] setup error:", e);
    }
  }
}

export function onPageLoad(setup: Setup): void {
  setups.push(setup);
}

function init(): void {
  if (initialized || typeof document === "undefined") return;
  initialized = true;
  document.addEventListener("astro:page-load", runAll);
}

init();
