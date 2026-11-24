import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gioahumada.cl',
  adapter: vercel(),
  integrations: [react(), mdx()],
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    shikiConfig: {
      theme: 'nord', // Cambia esto al tema que prefieras
      wrap: true, // Opcional: para que el texto se ajuste dentro del bloque
    },
  },
});