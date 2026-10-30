// Pre-renderiza los objetos 3D de las tres marcas con la GPU (Chrome headless + Metal):
// imágenes PNG/WebP (con transparencia si no se pasa `bg`) para webs y apps, y videos en bucle MP4.
// Uso: node scripts/render3d.mjs [lista.json]   (por defecto scripts/renders.json)
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const list = JSON.parse(readFileSync(process.argv[2] ?? join(root, 'scripts/renders.json'), 'utf8'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const server = await createServer({ root, logLevel: 'error', server: { port: 4350 } });
await server.listen();
const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });

try {
  for (const job of list) {
    const { out, scene, size = [1200, 1200], frames = 0, fps = 30, params = {} } = job;
    const page = await browser.newPage();
    await page.setViewport({ width: size[0], height: size[1], deviceScaleFactor: 1 });
    const qs = new URLSearchParams({ scene, ...params });
    await page.goto(`http://localhost:4350/studio/?${qs}`, { waitUntil: 'load' });
    await page.waitForFunction('window.__ready === true', { timeout: 60000 });
    const target = join(root, out);
    mkdirSync(dirname(target), { recursive: true });
    const shoot = async (t, path) => {
      await page.evaluate((t) => window.frame(t), t);
      await page.screenshot({ path, omitBackground: true });
    };
    if (!frames) {
      const png = target.replace(/\.\w+$/, '.png');
      await shoot(params.t ? Number(params.t) : 0, png);
      if (target.endsWith('.webp')) execFileSync('cwebp', ['-quiet', '-q', '86', '-alpha_q', '90', png, '-o', target]);
      if (target.endsWith('.webp')) rmSync(png);
    } else {
      const tmp = join(root, '.render-tmp');
      rmSync(tmp, { recursive: true, force: true });
      mkdirSync(tmp);
      for (let i = 0; i < frames; i++) await shoot(i / frames, join(tmp, `f${String(i).padStart(4, '0')}.png`));
      const input = ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', join(tmp, 'f%04d.png')];
      const base = target.replace(/\.\w+$/, '');
      // MP4 H.264 con el fondo de la sección ya incluido: se reproduce igual en todos los navegadores
      // (los videos con alfa no son confiables entre Safari y Chrome). El borde se difumina con CSS.
      // Sin etiquetas de color Chrome pinta el fondo con otro tono y se nota el cuadro del video.
      execFileSync('ffmpeg', [...input, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '22', '-preset', 'slow', '-color_primaries', 'bt709', '-color_trc', 'iec61966-2-1', '-colorspace', 'smpte170m', '-color_range', 'tv', '-movflags', '+faststart', '-an', `${base}.mp4`]);
      // Póster: el primer cuadro, para mostrar antes de que cargue el video y con movimiento reducido.
      execFileSync('cwebp', ['-quiet', '-q', '84', join(tmp, 'f0000.png'), '-o', `${base}.webp`]);
      rmSync(tmp, { recursive: true, force: true });
    }
    console.log('listo', out);
    await page.close();
  }
} finally {
  await browser.close();
  await server.close();
}
