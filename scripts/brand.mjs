// Genera los logos horizontales con el wordmark convertido a trazos (Outfit Medium), para que
// se vean igual en cualquier lugar sin depender de la fuente instalada.
// Uso: node scripts/brand.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import opentype from 'opentype.js';

const require = createRequire(import.meta.url);
const fontFile = require.resolve('@fontsource/outfit/files/outfit-latin-500-normal.woff');
const buf = readFileSync(fontFile);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const [AQUA, NAVY] = readFileSync(new URL('../docs/.mark-paths', import.meta.url), 'utf8').trim().split('|');

// Se arma glifo por glifo (con kerning) porque opentype.js no soporta todas las features de Outfit.
function textPath(text, x, y, size) {
  const scale = size / font.unitsPerEm;
  const out = new opentype.Path();
  let prev = null;
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    if (prev) x += font.getKerningValue(prev, glyph) * scale;
    out.extend(glyph.getPath(x, y, size));
    x += glyph.advanceWidth * scale - size * 0.005;
    prev = glyph;
  }
  return out;
}

// El símbolo mide 274×226; el wordmark se centra a lo alto del símbolo.
const size = 268;
const box = textPath('zelunko', 0, 0, size).getBoundingBox();
const markH = 226;
const gap = 62;
// Línea base un poco arriba del pie del símbolo, como en el logo original.
const ty = markH - 26;
const word = textPath('zelunko', 274 + gap - box.x1, ty, size).toPathData(1);
const width = Math.ceil(274 + gap + (box.x2 - box.x1));

const svg = (aqua, navy, text) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 ${width + 8} ${markH + 8}" role="img" aria-label="Zelunko">` +
  `<g stroke-width="3" stroke-linejoin="round"><path fill="${aqua}" stroke="${aqua}" d="${AQUA}"/><path fill="${navy}" stroke="${navy}" d="${NAVY}"/></g>` +
  `<path fill="${text}" d="${word}"/></svg>\n`;

const out = new URL('../public/brand/', import.meta.url);
writeFileSync(new URL('zelunko-logo.svg', out), svg('#03DAC0', '#0E2C63', '#0E2C63'));
writeFileSync(new URL('zelunko-logo-white.svg', out), svg('#03DAC0', '#FFFFFF', '#FFFFFF'));
console.log('logos listos', width);
