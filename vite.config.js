import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Sitio estático de varias páginas: todo el contenido va en el HTML para que buscadores y
// asistentes de IA lo lean sin ejecutar JavaScript.
export default defineConfig({
  build: {
    target: 'es2022',
    // three.js va en su propio chunk que se carga tarde; no frena el primer pintado.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        ayuda: resolve(import.meta.dirname, 'ayuda/index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
  server: { port: 4330 },
});
