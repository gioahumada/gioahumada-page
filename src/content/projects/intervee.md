---
title: "Intervee"
description: "Simulador de entrevistas laborales"
media:
  type: "video"
  url: "/videos/intervee.mp4"
  thumbnail: "/images/intervee.jpg"
date: 2026-04-01
tags: ["Next.js", "Three.js", "Vercel AI SDK"]
featured: true
---

Intervee es un prototipo de entorno virtual inmersivo diseñado para simular entrevistas de trabajo de forma interactiva. El sistema sitúa al usuario en una plaza isométrica 3D donde puede explorar y acceder a edificios corporativos para someterse a simulaciones técnicas guiadas por un agente reclutador impulsado por Inteligencia Artificial. Permite procesar respuestas en tiempo real, evaluar competencias técnicas, proporcionar retroalimentación analítica detallada y guardar el historial de sesiones, todo bajo una arquitectura web centralizada y modular.

## Desarrollo y Validación Empírica en la PUCV

Desarrollado por un equipo de estudiantes de la Escuela de Ingeniería Informática de la Pontificia Universidad Católica de Valparaíso (PUCV), el proyecto llevó su propuesta más allá del código, siendo sometido a una estricta validación empírica con más de 40 usuarios reales. Los estudios pre y post intervención demostraron que el uso de la plataforma ayuda a disminuir la ansiedad anticipada ante las entrevistas, al mismo tiempo que destaca por su inmersión cognitiva, utilidad y facilidad de uso sin requerir asistencia técnica.

## Stack tecnológico

La arquitectura de Intervee se sostiene sobre tecnologías web modernas, orquestando la experiencia visual y la lógica del modelo de lenguaje en un entorno robusto:

- **Frontend y Motor 3D**: La experiencia inmersiva está construida con **React Three Fiber**, lo que permite renderizar el mundo isométrico, gestionar físicas de colisiones y animar el avatar directamente en el navegador. La interfaz también administra el flujo de la entrevista mediante un chat bidireccional y presenta un dashboard dinámico con las métricas de compatibilidad.
- **Backend e Inteligencia Artificial**: Desarrollado sobre el **Stack T3** (Next.js, TypeScript, Zod, Prisma), el servidor se encarga de la lógica de negocio, la validación estricta de datos, la gestión de sesiones y el panel administrativo. El motor de evaluación se nutre de **Vercel AI SDK**, que empaqueta el contexto del perfil corporativo (como el caso de Microsoft) y procesa el lenguaje natural del usuario para generar calificaciones y sugerencias de mejora.

<br>

---

<br>

## Integrantes
- [⎋ Bastián Mejías](https://github.com/bastiivc)
- [⎋ Patricio Hernández](https://github.com/PytricioPUCV)
- [⎋ Rigoberto Canales](https://github.com/ItsRigozzi)

## Enlaces del Proyecto

- [⎋ Ver en GitHub](https://github.com/Mx4-2V/intervee) — Repositorio completo del entorno virtual y la API.
- [⎋ Ver Video Demo)](https://www.youtube.com/watch?v=KIjuq1jO8KQ) — Demostración audiovisual del flujo completo de uso del prototipo.
