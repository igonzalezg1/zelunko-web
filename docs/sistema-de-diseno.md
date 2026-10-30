# Sistema de diseño Zelunko (web y móvil)

Contrato común para **zelunko.com, Inkify y RentaFácil** en web y en las apps. Cada producto
cambia solo sus **tokens de color** y su logo; todo lo demás (tipografía, retícula, componentes,
movimiento, voz) es igual en los tres. Base: `identidad-institucional.md` y la skill
`ui-ux-pro-max` (patrón *Trust & Authority*, dial variación 4 · movimiento 4 · densidad 4).

## 1. Principios: que se vea profesional, no "hecho por IA"

Prohibido (son las señales más obvias de diseño genérico):

- Texto con degradado. Si hace falta énfasis, una palabra en el color de acento, sólido.
- Manchas de luz, neón, `box-shadow` de color tipo "glow", grano y auroras de fondo.
- Tarjetas flotando sin parar, chips decorativos alrededor del héroe y glassmorphism.
- Inclinación 3D (tilt) en tarjetas de contenido. El 3D va en objetos de marca (§ 7), no en la UI.
- Rejillas repetidas de "ícono en cuadrito + título + texto" sección tras sección.
- Emojis, cifras inventadas, frases vacías ("de vanguardia", "soluciones integrales").
- Más de una animación continua por pantalla.

Sí:

- Mucho aire, alineación a la izquierda, jerarquía con tamaño y peso, no con color.
- Fotos o capturas **reales** del producto en lugar de ilustraciones genéricas.
- Bordes de 1 px y sombras neutras y bajas. Un solo color de acento por pantalla.
- Datos concretos (precios, pasos, plazos) y copy específico del producto.

## 2. Tipografía (los tres productos)

**Plus Jakarta Sans** para todo (títulos y texto), cargada localmente.
El logo de cada producto se queda como imagen/SVG; Bebas Neue sale de la interfaz de Inkify.

| Estilo | Web (desktop / móvil) | App | Peso | Interletrado |
| --- | --- | --- | --- | --- |
| Display (héroe) | 64 / 40 px, lh 1.05 | 34 | 800 | −0.03em |
| H1 | 48 / 34 | 28 | 700 | −0.02em |
| H2 | 36 / 28 | 22 | 700 | −0.02em |
| H3 | 22 / 20 | 18 | 600 | −0.01em |
| Cuerpo grande | 19 / 17 | 17 | 400 | 0 |
| Cuerpo | 16 | 15–16 | 400–500 | 0 |
| Etiqueta / overline | 13, mayúsculas | 12 | 600 | 0.08em |
| Pequeño | 14 | 13 | 500 | 0 |

Interlineado del cuerpo 1.6. Nunca texto de cuerpo menor a 14 px (13 en app).

## 3. Color: mismos roles, distinto valor

| Rol | Zelunko | RentaFácil | Inkify |
| --- | --- | --- | --- |
| `brand` (estructura, títulos, héroe, footer) | `#0E2C63` | `#064C4C` | `#1D1D20` |
| `brand-strong` (héroe y footer oscuros) | `#050F24` | `#023838` | `#141416` |
| `accent` (CTA, enlaces, 10 % de la pantalla) | `#03DAC0` | `#45D99A` | `#F97316` |
| `on-accent` (texto sobre el acento) | `#050F24` | `#023838` | `#141416` |
| `accent-soft` (fondos de badges, íconos) | `#E6FCF8` | `#DDF8EC` | `#FFF1E7` |
| `bg` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `surface` (secciones alternas) | `#F5F8FC` | `#F8FAF9` | `#FAF8F6` |
| `border` | `#E3E9F2` | `#E3EAE8` | `#ECE7E3` |
| `text` | `#0B1220` | `#172121` | `#18181B` |
| `text-muted` | `#5B6B82` | `#5F6E6E` | `#6B6560` |

Estados (iguales en los tres): éxito `#18A874`, aviso `#E7A72B`, error `#D9534F`, info `#3787D6`.
Regla 60/30/10: blanco y `surface` 60 %, `brand` 30 %, `accent` 10 %.
**Inkify deja de ser una web negra**: base clara como las otras dos; el negro tinta (`brand`)
queda para el héroe, el footer y los botones oscuros. El naranja es solo acento.

## 4. Retícula y espaciado

- Contenedor máximo 1200 px, márgenes laterales de 24 px (16 px en móvil).
- Escala de espaciado: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Secciones: 112 px arriba/abajo en escritorio, 72 px en móvil. Encabezado de sección:
  overline + H2 + párrafo de máx. 640 px, alineado a la izquierda (centrado solo en CTA final).
- App: márgenes de pantalla 20 px, separación entre bloques 24 px, entre elementos 12 px.

## 5. Componentes (mismas medidas en los tres)

- **Botón**: alto 48 px web / 52 app, radio 12, padding horizontal 20–24, peso 600.
  Primario = `accent` con `on-accent`; secundario = borde 1 px `border` sobre blanco;
  oscuro = `brand` con blanco. Hover: oscurece 6 % y sube 1 px (150 ms). Presionado: escala 0.98.
- **Tarjeta**: fondo blanco, borde 1 px `border`, radio 16 (app 16), sombra
  `0 1px 2px rgb(16 24 40 / .04), 0 8px 24px -12px rgb(16 24 40 / .08)`. Hover web: sombra un poco
  mayor y −2 px. Nada de brillo de color.
- **Input**: alto 48, radio 12, borde 1 px, etiqueta visible arriba, error debajo en rojo.
  Foco: borde `brand` + anillo 3 px del acento al 25 %.
- **Badge**: radio 999, 12–13 px, peso 600, fondo `accent-soft`, texto `brand`.
- **Íconos**: Lucide, trazo 1.75–2, 20 px (24 en app). Contenedor opcional 40 px radio 12 `accent-soft`.
- **Header web**: blanco con borde inferior al hacer scroll (sobre héroe oscuro, transparente con
  texto blanco). **Footer**: `brand-strong`, columnas, y el sello.
- **Sello de respaldo**: "Un producto de Zelunko" + símbolo monocromo (`currentColor`), 13 px,
  en el footer web, en la pantalla de acceso y en "Acerca de"/perfil de las apps.
- **Héroe de landing** (estructura común): fondo `brand-strong` sólido (se permite un degradado
  lineal sutil de `brand-strong` a `brand`, sin manchas), columna izquierda con overline, display,
  párrafo y dos botones; columna derecha con **una** pieza visual (Zelunko: la Z 3D; productos:
  captura/maqueta real del producto en un marco de dispositivo). Debajo, franja de 3–4 datos.

## 6. Movimiento: en todos lados, sin saturar

Una sola curva: `cubic-bezier(0.16, 1, 0.3, 1)` (web) / `Easing.bezier(0.16, 1, 0.3, 1)` (app).

| Qué | Cómo | Duración |
| --- | --- | --- |
| Entrada de pantalla/página | opacidad 0→1 + 12 px hacia arriba | 350 ms |
| Aparición al hacer scroll (web) | opacidad + 16 px, **una sola vez** por elemento | 500 ms |
| Listas y rejillas | escalonado de 50 ms, máximo 6 elementos (el resto entra junto) | 400 ms c/u |
| Hover (web) | color/sombra/−1–2 px | 150–200 ms |
| Presionar (app) | escala 0.97 y regreso | 120 ms / 180 ms |
| Modales y hojas | fondo fade 200 ms; panel sube 24 px | 280 ms (salida 200 ms) |
| Skeleton | brillo lineal suave | 1.4 s en bucle |
| Confirmaciones | check que se dibuja o escala 0.8→1 | 300 ms |
| Contadores | solo en la franja de datos del héroe | 1.2 s, una vez |

Reglas: máximo **una** animación continua por pantalla (la Z 3D, o un skeleton mientras carga);
nada de flotados infinitos ni marquees; las salidas son más rápidas que las entradas; animar solo
`opacity` y `transform`; con *reducir movimiento* activado (web `prefers-reduced-motion`, app
`AccessibilityInfo.isReduceMotionEnabled`) todo aparece directo sin desplazamiento.
En React Native usar `Animated` con `useNativeDriver: true` (no agregar librerías nativas nuevas).

## 7. 3D: objetos de marca

El 3D no decora la interfaz: **cada marca tiene objetos físicos** (su logo y su mundo) hechos con
los mismos materiales y la misma luz de estudio, al estilo de los sitios de producto premium
(turnoev.com, sisa.ai). Fuente única: `Zelunko/src/three/zelunko3d.js`.

- **Materiales**: vidrio esmerilado de color (protagonista), satinado y cromo. Sobre fondo
  transparente u oscuro el vidrio pasa a "resina" (`adaptToDarkBackground`) para no verse negro.
- **Objetos**: Zelunko = la Z (aqua + base perla en oscuro / marino en claro), anillos.
  RentaFácil = la casa del logo, sello de certificado, cubos de pago. Inkify = la máquina del logo,
  gota de tinta, cartuchos. Cada marca tiene además un **fondo** (`*-field`) con hueco al centro.
- **Dónde**: héroe (Zelunko en vivo con three.js; productos con video en bucle pre-renderizado),
  una pieza por sección como acento (con parallax de ±40 px), fondo en el CTA final y en
  encabezados de app; en app: acceso, inicio, estados vacíos y confirmaciones.
- **Render**: `node scripts/render3d.mjs` (Chrome con GPU) genera PNG/WebP y MP4 en
  `Zelunko/renders/<producto>/` y `Zelunko/public/img/3d/`. Los MP4 llevan el color del héroe
  dentro; el borde se funde con `mask-image` radial. Nunca usar video con alfa.
- **Reglas**: máximo un objeto 3D por sección, un solo elemento animado continuo por pantalla
  (el objeto 3D o el video), nada de 3D en tarjetas o botones, y con *reducir movimiento* se
  muestra el póster fijo.

## 8. Voz

Directa y cercana, frases cortas, verbo al frente, cifras reales. Igual en los tres productos.
