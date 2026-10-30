# Zelunko — Identidad institucional

Zelunko es un estudio de producto digital mexicano que crea y opera plataformas SaaS
verticales: hoy **Inkify** (agenda y vitrina para tatuadores y perforadores) y **RentaFácil**
(cobro de rentas residenciales con historial verificable). Cada producto vive en su
subdominio (`inkify.zelunko.com`, `rentafacil.zelunko.com`) y la marca madre en `zelunko.com`.

## Arquitectura de marca: *endorsed brands*

Cada producto conserva su personalidad (Inkify: tinta oscura + naranja; RentaFácil: teal +
mint) y Zelunko los respalda con:

1. **Sello de respaldo** “Un producto de Zelunko” en el pie de página y en la pantalla de
   acceso, con la Z geométrica en monocromo y enlace a `https://zelunko.com`.
2. **Mismo lenguaje de movimiento** (curvas, tiempos y patrones de abajo).
3. **Mismos principios de UI**: superficies limpias, un acento por pantalla, tipografía
   grande y con aire, íconos lineales, cero emojis, estados claros.

## Logo

- La Z está formada por dos piezas iguales giradas 180°: la **pieza aqua** (arriba, “lo que
  creamos”) y la **pieza marino** (abajo, “la base que lo sostiene”). Encajan sin tocarse.
- Archivos: `public/brand/zelunko-mark.svg` (símbolo), `zelunko-logo.svg` (horizontal sobre
  claro), `zelunko-logo-white.svg` (sobre oscuro), `zelunko-mark-mono.svg` (monocromo,
  `currentColor`, para sellos de respaldo).
- Área de protección: la altura de una barra de la Z alrededor. Tamaño mínimo: 20 px de alto.
- No: rotar, cambiar los colores de las piezas, agregar sombras al logo plano, ponerlo
  sobre fotos sin un velo.

## Color

| Token | Hex | Uso |
| --- | --- | --- |
| `navy-950` | `#050F24` | Fondo oscuro profundo (héroes, footer) |
| `navy-900` | `#0A1D42` | Superficies oscuras |
| `navy` (marino) | `#0E2C63` | Color institucional, texto de títulos sobre claro |
| `navy-600` | `#1D4590` | Hover / enlaces |
| `aqua` | `#03DAC0` | Acento, CTA, el 10 % de la pantalla |
| `aqua-300` | `#5FF0DC` | Brillos, gradientes |
| `aqua-50` | `#E6FCF8` | Fondos suaves de acento |
| `ink` | `#0B1220` | Texto principal sobre claro |
| `slate` | `#5B6B82` | Texto secundario |
| `mist` | `#F5F8FC` | Fondo claro |

Gradiente institucional: `linear-gradient(135deg, #0E2C63 0%, #1D4590 45%, #03DAC0 100%)`,
solo para héroes, bordes destacados y el sello 3D. Regla 60/30/10: marino/neutros/aqua.

## Tipografía

- **Outfit** (titulares, 600–800, tracking −0.02em): geométrica y redonda como el wordmark.
- **Inter** (texto, 400–600). Base 16–18 px, interlineado 1.6.

## Movimiento

- Curva base `cubic-bezier(0.16, 1, 0.3, 1)` (*ease-out-expo*), 500–800 ms para entradas,
  150–250 ms para hover.
- Patrones: aparición al hacer scroll (fade + 24 px hacia arriba, escalonado 80 ms),
  inclinación 3D sutil en tarjetas, brillo que sigue al cursor, contadores, marquee.
- Siempre respetar `prefers-reduced-motion: reduce` (sin animaciones, contenido visible).

## Voz

Directa, cercana y mexicana sin regionalismos: “Lo hacemos simple”, no “Soluciones
integrales de vanguardia”. Frases cortas, verbos al frente, cifras concretas.

**Promesa:** *Software que hace fácil lo importante.*
**Descriptor:** *Estudio de producto digital · Hecho en México.*
