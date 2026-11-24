import {
  siLaravel, siReact, siNextdotjs, siTypescript, siAstro,
  siThreedotjs, siFlutter, siExpo, siMysql, siPostgresql,
} from "simple-icons";

// Datos del CV. Fuente única para la página, /resume.json y las plantillas Typst.
// bullets: string o { lead, text } (lead se muestra en negrita).

export type Bullet = string | { lead: string; text: string };
export interface Entry {
  org: string;
  place: string;
  role: string;
  period: string;
  bullets: Bullet[];
}
export interface Link { text: string; url?: string }

const PUCV = "Pontificia Universidad Católica de Valparaíso";
const VALPO = "Valparaíso, Chile";

const tech = (icon: { title: string; hex: string; path: string }, url: string) => ({
  name: icon.title, hex: icon.hex, path: icon.path, url,
});

export const profile = {
  name: "Giovanni Ahumada Tapia",
  role: "Estudiante de Ingeniería Informática",
  school: PUCV,
  email: "giovanni.ahumada@pucv.cl",
  site: "https://gioahumada.cl",
  contact: [
    [
      { text: "Valparaíso, Chile" },
      { text: "+56 9 8824 8792" },
      { text: "giovanni.ahumada@pucv.cl", url: "mailto:giovanni.ahumada@pucv.cl" },
      { text: "gioahumada.cl", url: "https://gioahumada.cl" },
    ],
    [
      { text: "linkedin.com/in/gioahumada", url: "https://www.linkedin.com/in/gioahumada/" },
      { text: "github.com/gioahumada", url: "https://github.com/gioahumada" },
      { text: "orcid.org/0009-0008-2288-1220", url: "https://orcid.org/0009-0008-2288-1220" },
    ],
  ] as Link[][],
  summaryLead: "Perfil académico.",
  summary:
    "Estudiante de Ingeniería Informática de la Pontificia Universidad Católica de Valparaíso, con experiencia en investigación aplicada en inteligencia artificial generativa, modelos de lenguaje y desarrollo de software. Coautor de una publicación en IEEE ICA-ACCA 2024 y ayudante de investigación desde 2024. Interés en el seguimiento y aplicación de avances recientes en LLM, IA generativa y sistemas inteligentes, especialmente en contextos de desarrollo de software y educación.",
  education: [
    {
      org: PUCV, place: VALPO, role: "Ingeniería Informática, en curso", period: "Marzo 2023 – Presente",
      bullets: [{ lead: "Proyecto de Título: Studilo.", text: "Plataforma de tutoría inteligente basada en RAG y evaluación multimodelo, combinando desarrollo de software e investigación aplicada en inteligencia artificial." }],
    },
  ] as Entry[],
  research: [
    {
      org: PUCV, place: VALPO, role: "Ayudante de Investigación", period: "Julio 2024 – Presente",
      bullets: [
        "Participación sostenida en actividades de investigación vinculadas con informática, inteligencia artificial generativa y modelos de lenguaje.",
        "Revisión de literatura y seguimiento de avances recientes en LLM e inteligencia artificial generativa, evaluando nuevas técnicas, herramientas y enfoques para su aplicación en proyectos y líneas de investigación.",
        "Colaboración en diseño y desarrollo de estudios, revisión de antecedentes, análisis de resultados y preparación de material académico.",
      ],
    },
  ] as Entry[],
  publications: [
    {
      authors: "Mellado, R., Cubillos, C., & Ahumada, G.",
      year: "2024",
      title: "Effectiveness of Generative Artificial Intelligence in learning programming to higher education students. 2024 IEEE ICA-ACCA, 1–7.",
      doi: "10.1109/ICA-ACCA62622.2024.10766746",
    },
  ],
  teaching: [
    {
      org: PUCV, place: VALPO, role: "Ayudante de Estructura de Datos - Escuela de Ingeniería Informática", period: "Julio 2024 – Presente",
      bullets: ["Cinco semestres consecutivos apoyando la enseñanza de algoritmos y estructuras de datos en ANSI C, además de supervisar y evaluar controles y colaborar en material de clases, ejercicios y evaluaciones."],
    },
    {
      org: PUCV, place: VALPO, role: "Ayudante de Big Data - Escuela de Comercio", period: "Agosto 2025 – Diciembre 2025",
      bullets: ["Apoyo en contenidos y actividades prácticas de modelado de procesos y SQL, resolución de dudas y acompañamiento del trabajo de estudiantes."],
    },
  ] as Entry[],
  experience: [
    {
      org: "Geolize", place: "Santiago, Chile", role: "Practicante de Desarrollo Full Stack", period: "Diciembre 2025 – Marzo 2026",
      bullets: ["Desarrollo e integración de agentes de inteligencia artificial aplicados a asistencia y automatización en programación; colaboración en software de nueva generación y sistemas reactivos utilizando Laravel, React y TypeScript."],
    },
    {
      org: PUCV, place: VALPO, role: "Desarrollador Full Stack - Unidad de Desarrollo Docente", period: "Marzo 2025 – Presente",
      bullets: ["Desarrollo de aplicaciones internas con Laravel, Blade y MySQL; implementación de APIs REST, Google OAuth y automatización de procesos administrativos universitarios."],
    },
    {
      org: PUCV, place: VALPO, role: "Desarrollador Full Stack - Proyecto Actíbese, Escuela de Educación Física", period: "Febrero 2025 – Junio 2025",
      bullets: ["Desarrollo de aplicación multiplataforma con React Native y Expo orientada al autocuidado físico de estudiantes, con backend Laravel e integración mediante APIs REST."],
    },
  ] as Entry[],
  projects: [
    { name: "Studilo", desc: "Tutoría inteligente con RAG y evaluación multimodelo; Proyecto de Título.", tags: "Laravel, Laravel AI SDK, RAG" },
    { name: "Gira", desc: "Repositorio académico y chatbot para estudiantes con consulta asistida por IA.", tags: "Laravel, React, Neuron AI" },
    { name: "Intervee", desc: "Simulador de entrevistas laborales con interacción asistida por IA.", tags: "Next.js, Three.js, Vercel AI SDK" },
    { name: "Fixpert", desc: "Marketplace móvil de servicios y oficios bajo demanda, con cliente y API separados.", tags: "Flutter, FastAPI" },
    { name: "Turbo C Online", desc: "Emulación web de Turbo C mediante DOSBox-X y WebAssembly.", tags: "C, React, WebAssembly" },
  ],
  // Versión humana: bloques con logo, en pirámide (1 + 2 + 3).
  // Si existe /public/logos/<logo>.svg se usa; si no, un cuadro neutro.
  photo: "foto",
  bio: "Investigo inteligencia artificial generativa y modelos de lenguaje en la Pontificia Universidad Católica de Valparaíso, desarrollo aplicaciones full stack con Laravel, React y TypeScript, y apoyo la docencia de algoritmos y Big Data.",
  degree: "Ingeniería Informática",
  degreeSchool: "Pontificia Universidad Católica de Valparaíso",
  degreePeriod: "Mar 2023 – 2026",
  spoken: [
    { text: "Español nativo", flag: "cl" },
    { text: "Inglés B1", flag: "gb" },
  ],
  // Stack de la versión humana: logo + enlace.
  stack: [
    tech(siReact, "https://react.dev"),
    tech(siNextdotjs, "https://nextjs.org"),
    tech(siTypescript, "https://www.typescriptlang.org"),
    tech(siAstro, "https://astro.build"),
    tech(siThreedotjs, "https://threejs.org"),
    tech(siLaravel, "https://laravel.com"),
    tech(siFlutter, "https://flutter.dev"),
    tech(siExpo, "https://expo.dev"),
    tech(siMysql, "https://www.mysql.com"),
    tech(siPostgresql, "https://www.postgresql.org"),
  ],
  links: [
    { icon: "linkedin", text: "LinkedIn", url: "https://www.linkedin.com/in/gioahumada/" },
    { icon: "github", text: "GitHub", url: "https://github.com/gioahumada" },
    { icon: "orcid", text: "ORCID", url: "https://orcid.org/0009-0008-2288-1220" },
  ],
  // Bloques con logo en pirámide (1 + 2 + 3). Siempre: título, cargo y período (formato "Mes AAAA – Mes AAAA").
  // Si existe /public/logos/<logo>.svg|png se usa; si no, un cuadro neutro.
  highlights: [
    { logo: "geolize", title: "Geolize", role: "Practicante Full Stack", period: "Dic 2025 – Mar 2026" },
    { logo: "desarrollo-docente", title: "Desarrollo Docente", role: "Desarrollador Full Stack", period: "Mar 2025 – Presente" },
    { logo: "pucv", title: "PUCV Investigación", role: "Ayudante de Investigación", period: "Jul 2024 – Presente" },
    { logo: "studilo", title: "Studilo", role: "Proyecto de Título", period: "2026 – Presente" },
    { logo: "actibese", title: "Actíbese", role: "Desarrollador Full Stack", period: "Feb 2025 – Jun 2025" },
    { logo: "pucv", title: "PUCV Pregrado", role: "Ayudante de pregrado", period: "Jul 2024 – Presente" },
  ],
  languages: [
    { lang: "Inglés", text: "Nivel B1 (pre-intermedio), acreditado por el Programa de Inglés como Lengua Extranjera de la Pontificia Universidad Católica de Valparaíso, 2026." },
  ],
};
