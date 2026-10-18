import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gioahumada.cl',
  markdown: {
    shikiConfig: {
      theme: 'nord', // Cambia esto al tema que prefieras
      wrap: true, // Opcional: para que el texto se ajuste dentro del bloque
    },
  },
});
