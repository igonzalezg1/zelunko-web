# Zelunko — zelunko.com

Sitio institucional de Zelunko, la empresa detrás de Inkify y RentaFácil. Sitio estático
(HTML + CSS + JS con Vite) con la Z del logo en 3D (Three.js, se carga después del primer
pintado). Todo el contenido está en el HTML para que Google y los asistentes de IA lo lean
sin ejecutar JavaScript.

| Ruta | Qué es |
| --- | --- |
| `index.html` | Landing: héroe 3D, qué es Zelunko, productos, servicios, proceso, principios, FAQ y contacto |
| `marca/index.html` | Identidad de marca: logos descargables, color, tipografía, arquitectura de marca y voz |
| `404.html` | Página no encontrada |
| `public/` | `robots.txt` (abre el sitio a buscadores y bots de IA), `sitemap.xml`, `llms.txt`, `llms-full.txt`, íconos, `og.png`, `.well-known/security.txt` y `brand/` (logos SVG) |
| `docs/` | `identidad-institucional.md`, `benchmark.md`, `seo-geo-checklist.md` y el logo original |
| `scripts/brand.mjs` | Regenera los logos horizontales (wordmark Outfit convertido a trazos) |

## Desarrollo

```sh
npm install
npm run dev        # http://localhost:4330
npm run build      # genera dist/
npm run preview
```

## Servidor

1. DNS en GoDaddy: registros `A` de `@` y `www` hacia la IP del servidor.
2. Clonar este proyecto en `/opt/zelunko-web` y levantarlo (requiere `zelunko-edge` arriba):

   ```sh
   docker compose -f deploy/docker-compose.yml up -d --build
   ```

3. En `zelunko-edge` ya están los bloques de `zelunko.com` y `www.zelunko.com` (redirige al
   dominio raíz). Recargar: `docker compose exec edge caddy reload --config /etc/caddy/Caddyfile`.

## SEO y buscadores de IA

- Datos estructurados JSON-LD (`Organization`, `WebSite`, `WebPage`, dos `SoftwareApplication`
  con precios y `FAQPage`) en `index.html`. Si cambian precios, actualizar también `llms.txt`,
  `llms-full.txt` y las respuestas del FAQ.
- Tras publicar: dar de alta `zelunko.com` en Google Search Console y Bing Webmaster Tools y
  enviar `sitemap.xml`. Ver `docs/seo-geo-checklist.md`.
