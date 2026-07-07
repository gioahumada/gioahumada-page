export type StaggerConfig = {
  each: number;
  start?: number;
};

export type TargetConfig = {
  selector: string;
  delay?: number;
  stagger?: StaggerConfig;
};

export type PageAnimationConfig = {
  targets: TargetConfig[];
};

export const ANIMATION_DEFAULTS = {
  duration: 1.2,
  easing: [0.16, 1, 0.3, 1] as [number, number, number, number],
  blur: "10px",
  translateY: "30px",
} as const;

export const PAGE_ANIMATIONS: Record<string, PageAnimationConfig> = {
  default: {
    targets: [{ selector: "main", delay: 0 }],
  },
  home: {
    targets: [
      { selector: ".quote-container", delay: 0 },
      { selector: ".bento-wrapper", delay: 0.2 },
      { selector: ".section-divider", delay: 0.3 },
      { selector: ".project-card", stagger: { each: 0.15, start: 0.4 } },
      { selector: ".repo-link-container", delay: 1.0 },
    ],
  },
  documents: {
    targets: [
      { selector: ".quote-container", delay: 0 },
      { selector: ".document-card", stagger: { each: 0.15, start: 0.2 } },
    ],
  },
  resume: {
    targets: [
      { selector: ".resume-container > div", stagger: { each: 0.15, start: 0 } },
    ],
  },
  photos: {
    targets: [
      { selector: ".back-button", delay: 0 },
      { selector: ".app__photos", delay: 0.2 },
    ],
  },
  projectDetail: {
    targets: [
      { selector: ".project-header", delay: 0 },
      { selector: ".project-description", delay: 0.2 },
      { selector: ".content", delay: 0.35 },
      { selector: ".project-link", delay: 0.5 },
    ],
  },
  documentDetail: {
    targets: [
      { selector: ".document-header", delay: 0 },
      { selector: ".content", delay: 0.2 },
    ],
  },
};

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getConfig(pageKey: string | undefined): PageAnimationConfig | null {
  if (!pageKey) return null;
  return PAGE_ANIMATIONS[pageKey] ?? PAGE_ANIMATIONS.default;
}

function applyInitialStylesToElement(el: HTMLElement) {
  el.style.opacity = "0";
  el.style.filter = `blur(${ANIMATION_DEFAULTS.blur})`;
  el.style.transform = `translateY(${ANIMATION_DEFAULTS.translateY})`;
  el.style.willChange = "opacity, filter, transform";
}

function applyVisibleStylesToElement(el: HTMLElement) {
  el.style.opacity = "1";
  el.style.filter = "none";
  el.style.transform = "none";
  el.style.willChange = "";
}

function applyInitialStylesToElements(elements: ArrayLike<Element>) {
  for (let i = 0; i < elements.length; i++) {
    applyInitialStylesToElement(elements[i] as HTMLElement);
  }
}

function applyVisibleStylesToElements(elements: ArrayLike<Element>) {
  for (let i = 0; i < elements.length; i++) {
    applyVisibleStylesToElement(elements[i] as HTMLElement);
  }
}

function buildEasing(): string {
  return `cubic-bezier(${ANIMATION_DEFAULTS.easing.join(",")})`;
}

/**
 * Prepara el documento entrante ocultando los elementos animados antes del
 * swap, evitando un flash de contenido visible al navegar con ClientRouter.
 * Se debe llamar en el evento `astro:before-swap`.
 */
export function preparePageAnimation(newDoc: Document, pageKey: string | undefined) {
  const config = getConfig(pageKey);
  if (!config || prefersReducedMotion()) return;
  const selectors = new Set(config.targets.map((t) => t.selector));
  selectors.forEach((selector) => {
    applyInitialStylesToElements(newDoc.querySelectorAll(selector));
  });
}

/**
 * Ejecuta la animación de blur-in en la página actual usando la Web Animations
 * API nativa del browser. Se debe llamar en el evento `astro:page-load`.
 */
export function playPageAnimation(pageKey: string | undefined) {
  const config = getConfig(pageKey);
  if (!config) return;

  // Resolver los elementos una sola vez
  const groups: { target: TargetConfig; elements: HTMLElement[] }[] = [];
  const allElements = new Set<HTMLElement>();
  for (const target of config.targets) {
    const elements = Array.from(
      document.querySelectorAll(target.selector)
    ) as HTMLElement[];
    groups.push({ target, elements });
    elements.forEach((el) => allElements.add(el));
  }

  if (allElements.size === 0) return;

  if (prefersReducedMotion()) {
    allElements.forEach(applyVisibleStylesToElement);
    return;
  }

  // Estado inicial inmediato (antes del primer frame)
  allElements.forEach(applyInitialStylesToElement);

  // Safety net: si la Web Animations API falla, los elementos quedan visibles
  const safetyNetMs = ANIMATION_DEFAULTS.duration * 1000 + 800;
  const safetyNet = window.setTimeout(() => {
    allElements.forEach(applyVisibleStylesToElement);
  }, safetyNetMs);

  // Keyframes explícitos: la WAAPI los usa como origen/destino sin importar
  // los estilos computados actuales del elemento
  const startState: Keyframe = {
    opacity: 0,
    filter: `blur(${ANIMATION_DEFAULTS.blur})`,
    transform: `translateY(${ANIMATION_DEFAULTS.translateY})`,
  };
  const endState: Keyframe = {
    opacity: 1,
    filter: "blur(0px)",
    transform: "translateY(0)",
  };
  const baseOptions: KeyframeAnimationOptions = {
    duration: ANIMATION_DEFAULTS.duration * 1000,
    easing: buildEasing(),
    fill: "both",
  };

  // Esperar al siguiente frame para que el browser renderice el estado inicial
  // antes de lanzar la animación
  requestAnimationFrame(() => {
    const animations: Animation[] = [];

    for (const { target, elements } of groups) {
      if (elements.length === 0) continue;

      if (target.stagger && elements.length > 1) {
        const start = target.stagger.start ?? 0;
        elements.forEach((el, i) => {
          const animation = el.animate([startState, endState], {
            ...baseOptions,
            delay: (start + target.stagger!.each * i) * 1000,
          });
          animations.push(animation);
        });
      } else {
        const delay = (target.delay ?? 0) * 1000;
        elements.forEach((el) => {
          const animation = el.animate([startState, endState], {
            ...baseOptions,
            delay,
          });
          animations.push(animation);
        });
      }
    }

    // Limpiar el safety net cuando todas las animaciones terminen
    if (animations.length > 0) {
      Promise.all(animations.map((a) => a.finished))
        .catch(() => {})
        .finally(() => {
          window.clearTimeout(safetyNet);
          allElements.forEach((el) => {
            el.style.willChange = "";
          });
        });
    } else {
      window.clearTimeout(safetyNet);
    }
  });
}
