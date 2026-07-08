---
title: "Fixpert"
description: "Marketplace de servicios de oficios bajo demanda"
media:
  type: "video"
  url: "/videos/fixpert.mp4"
  thumbnail: "/images/fixpert.png"
date: 2026-06-18
tags: ["Flutter", "FastAPI"]
featured: true
---

Fixpert es un marketplace de servicios de oficios bajo demanda que conecta a clientes con prestadores verificados (fixers). Permite solicitar trabajos, recibir ofertas, coordinar la ejecución, pagar y calificar, con verificación de identidad, certificaciones, chat y panel administrativo — todo desde un único codebase Flutter que sirve a web y mobile, respaldado por una API en FastAPI y PostgreSQL.

## Expo Software PUCV 2026 — Premio Interdisciplinario

Fixpert fue presentado en la 19ª edición de la Expo Software de la Pontificia Universidad Católica de Valparaíso, donde recibió el **Premio Interdisciplinario** por su enfoque colaborativo entre Ingeniería Informática y la Facultad de Economía y Negocios, destacando como una solución con impacto real en la industria.

<div class="gallery">
  <div class="gallery-item gallery-tall">
    <img src="/images/fixpert/2.jpg" alt="Fixpert screenshot 2" loading="lazy" />
  </div>
  <div class="gallery-item">
    <img src="/images/fixpert/1.jpg" alt="Fixpert screenshot 1" loading="lazy" />
  </div>
  <div class="gallery-item">
    <img src="/images/fixpert/3.jpg" alt="Fixpert screenshot 3" loading="lazy" />
  </div>
</div>

<style>
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
  margin: 2rem 0;
  width: 100%;
  aspect-ratio: 4/3;
}

.gallery-item {
  position: relative;
  overflow: hidden;
}

.gallery-item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-tall {
  grid-row: span 2;
}

@media (max-width: 768px) {
  .gallery {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    aspect-ratio: 1/1;
  }
  .gallery-tall {
    grid-row: span 2;
    aspect-ratio: 9/16;
  }
}
</style>

<div class="ig-embed">
  <iframe 
    src="https://www.instagram.com/p/DZ8HVhAlijz/embed" 
    frameborder="0" 
    scrolling="no" 
    allowtransparency="true">
  </iframe>
</div>

<style>
.ig-embed {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 2rem auto;
  padding-bottom: 120%;
  height: 0;
  overflow: hidden;
}
.ig-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

## Stack tecnológico

El proyecto se compone de dos repositorios principales:

- **Backend**: API REST desarrollada en **Python** con **FastAPI**, usando **PostgreSQL** como base de datos y **Docker** para contenedores. Maneja autenticación, verificación de identidad, matching de servicios y procesamiento de pagos.
- **Frontend**: Aplicación en **Flutter** que compila a web, iOS y Android desde un único codebase, con soporte para chat en tiempo real, notificaciones push y un panel administrativo completo.

<br>

---

<br>

## Integrantes
- [⎋ Diego Negrín](https://github.com/DiegoRNR)
- [⎋ Xavier Montoya](https://github.com/XavierMSch)
- [⎋ Ignacio Córdova](https://github.com/Ignacio-Cordova)
- [⎋ Simón Vera](https://github.com/SimonVra)
- [⎋ Matías Díaz](https://github.com/MatiasDiazCastro21)
- [⎋ Simón Ledezma](https://github.com/luffy126)
- [⎋ Daniel Saavedra](https://github.com/DanielSaavedra1)
