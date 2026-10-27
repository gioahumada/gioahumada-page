import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gioahumada.cl',
  integrations: [react()],
  markdown: {
    shikiConfig: {
      theme: 'nord', // Cambia esto al tema que prefieras
      wrap: true, // Opcional: para que el texto se ajuste dentro del bloque
    },
  },
});
