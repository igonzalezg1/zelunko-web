// Lenguaje 3D común de Zelunko, Inkify y RentaFácil: cada logo convertido en un objeto físico
// (cromo, vidrio esmerilado, satinado) bajo la misma luz de estudio. Lo usan los héroes en vivo
// de las tres webs y el estudio que pre-renderiza imágenes y videos para las apps.
// Ver docs/sistema-de-diseno.md § 3D.
import {
  ACESFilmicToneMapping,
  Box3,
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  LineCurve3,
  Mesh,
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShadowMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// ---------- Materiales ----------

export const materials = {
  /** Vidrio esmerilado de color: el material protagonista de las tres marcas. */
  glass: (color, { frost = 0.22, thickness = 18 } = {}) =>
    new MeshPhysicalMaterial({
      color: new Color(color),
      transmission: 1,
      thickness,
      roughness: frost,
      ior: 1.45,
      attenuationColor: new Color(color),
      attenuationDistance: 40,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      specularIntensity: 1,
      envMapIntensity: 1.1,
    }),
  chrome: (tint = '#E9EEF4') =>
    new MeshPhysicalMaterial({ color: new Color(tint), metalness: 1, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 }),
  satin: (color, metal = 0.25) =>
    new MeshPhysicalMaterial({ color: new Color(color), metalness: metal, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.3 }),
};

// ---------- Utilidades de geometría ----------

/** Tubo con extremos y esquinas redondeadas a lo largo de una polilínea (coordenadas SVG 0–100). */
function strokeTube(points, radius, material) {
  const group = new Group();
  const v = points.map(([x, y]) => new Vector3(x, -y, 0));
  for (let i = 0; i < v.length - 1; i++) {
    group.add(new Mesh(new TubeGeometry(new LineCurve3(v[i], v[i + 1]), 8, radius, 32, false), material));
  }
  const cap = new SphereGeometry(radius, 32, 24);
  for (const p of v) {
    const s = new Mesh(cap, material);
    s.position.copy(p);
    group.add(s);
  }
  return group;
}

function extrudeSvgPath(d, depth, bevel = 4) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
  const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => SVGLoader.createShapes(p));
  const geometry = new ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.8,
    bevelSegments: 8,
    curveSegments: 32,
  });
  geometry.scale(1, -1, 1);
  geometry.computeVertexNormals();
  return geometry;
}

/** Centra un grupo en el origen y lo escala para que su lado mayor mida `size`. */
function fit(group, size) {
  group.updateMatrixWorld(true);
  const box = new Box3().setFromObject(group);
  const center = box.min.clone().add(box.max).multiplyScalar(0.5);
  const extent = Math.max(box.max.x - box.min.x, box.max.y - box.min.y);
  const wrapper = new Group();
  group.position.sub(center);
  wrapper.add(group);
  wrapper.scale.setScalar(size / extent);
  return wrapper;
}

// ---------- Zelunko ----------

const Z_AQUA = 'M52 2H248a26 26 0 0 1 24 38L172 154H116L202 56H4Z';
const Z_BASE = 'M222 224H26a26 26 0 0 1-24-38L102 72h56L72 170h198Z';

/**
 * La Z en dos piezas: vidrio aqua (lo que creamos) y la base. `explode` 0–1 las separa.
 * Base perla sobre fondo oscuro (como el logo en negativo) y marino sobre claro (como el logo).
 */
export function zelunkoMark({ base: baseTone = 'pearl' } = {}) {
  const aqua = new Mesh(extrudeSvgPath(Z_AQUA, 40, 6), materials.glass('#03DAC0', { frost: 0.16, thickness: 40 }));
  const base = new Mesh(extrudeSvgPath(Z_BASE, 40, 6), baseTone === 'navy' ? materials.satin('#0E2C63', 0.45) : materials.satin('#E6ECF4', 0.3));
  for (const m of [aqua, base]) m.geometry.translate(-137, 113, -20);
  const inner = new Group();
  inner.add(aqua, base);
  const root = fit(inner, 2);
  root.userData.update = ({ explode = 0 }) => {
    aqua.position.set(60 * explode, 50 * explode, 60 * explode);
    base.position.set(-60 * explode, -50 * explode, -60 * explode);
  };
  return root;
}

/** Dos anillos entrelazados: los productos sobre una misma base. */
export function zelunkoRings() {
  const g = new Group();
  const a = new Mesh(new TorusGeometry(0.62, 0.075, 48, 160), materials.chrome());
  const b = new Mesh(new TorusGeometry(0.62, 0.075, 48, 160), materials.glass('#03DAC0', { frost: 0.12 }));
  a.position.x = -0.3;
  b.position.x = 0.3;
  b.rotation.x = Math.PI / 2;
  g.add(a, b);
  g.userData.update = ({ t = 0 }) => {
    a.rotation.y = t * Math.PI * 2 * 0.25;
    b.rotation.z = t * Math.PI * 2 * 0.25;
  };
  return g;
}

// ---------- RentaFácil ----------

/** La casa del logo: techo teal satinado, alero de vidrio menta y ventanas de vidrio blanco. */
export function rentaFacilHouse() {
  const inner = new Group();
  inner.add(strokeTube([[30, 84], [30, 54], [54, 30]], 6, materials.satin('#0B5C58', 0.35)));
  inner.add(strokeTube([[54, 30], [76, 52]], 6, materials.glass('#45D99A', { frost: 0.14, thickness: 12 })));
  const pane = materials.glass('#8FD8BC', { frost: 0.3, thickness: 6 });
  const box = new RoundedBoxGeometry(6.5, 6.5, 6.5, 4, 1.4);
  for (const [x, y] of [[50.25, 52.25], [58.75, 52.25], [50.25, 60.75], [58.75, 60.75]]) {
    const m = new Mesh(box, pane);
    m.position.set(x, -y, 0);
    inner.add(m);
  }
  return fit(inner, 2);
}

/** Sello del certificado de historial de renta: moneda de metal menta con una palomita en relieve. */
export function rentaFacilSeal() {
  const profile = [
    [0, -0.09],
    [0.86, -0.09],
    [0.93, -0.06],
    [0.95, 0],
    [0.93, 0.06],
    [0.86, 0.09],
    [0.8, 0.09],
    [0.78, 0.06],
    [0, 0.06],
  ].map(([x, y]) => new Vector2(x, y));
  const coin = new Mesh(new LatheGeometry(profile, 96), materials.satin('#7FE0B8', 0.9));
  coin.rotation.x = Math.PI / 2;
  const check = new Mesh(
    new TubeGeometry(new CatmullRomCurve3([new Vector3(-0.32, 0, 0), new Vector3(-0.08, -0.24, 0), new Vector3(0.36, 0.26, 0)], false, 'catmullrom', 0), 64, 0.07, 24),
    materials.satin('#064C4C', 0.5),
  );
  check.position.z = 0.08;
  const ring = new Mesh(new TorusGeometry(0.68, 0.025, 16, 128), materials.satin('#45D99A', 0.95));
  ring.position.z = 0.065;
  const g = new Group();
  g.add(coin, check, ring);
  return g;
}

/** Cubos de vidrio: cada uno es un pago. */
export function paymentCubes(color = '#45D99A', count = 5) {
  const g = new Group();
  const geo = new RoundedBoxGeometry(0.42, 0.42, 0.42, 6, 0.09);
  const mats = [materials.glass(color, { frost: 0.25 }), materials.glass('#B9DCEB', { frost: 0.35 })];
  const spots = [[-0.9, 0.4, 0], [-0.3, -0.35, 0.3], [0.35, 0.45, -0.2], [0.9, -0.2, 0.1], [0.05, 0.05, 0.6], [-0.6, -0.8, -0.3]];
  for (let i = 0; i < count; i++) {
    const m = new Mesh(geo, mats[i % 2]);
    m.position.set(...spots[i % spots.length]);
    m.rotation.set(0.5 + i, 0.3 * i, 0.2 * i);
    m.userData.seed = i;
    g.add(m);
  }
  g.userData.update = ({ t = 0 }) => {
    for (const m of g.children) {
      const k = m.userData.seed;
      m.rotation.y = 0.3 * k + t * Math.PI * 2 * 0.15;
      m.position.y += Math.sin((t + k * 0.17) * Math.PI * 2) * 0.0008;
    }
  };
  return g;
}

// ---------- Inkify ----------

/** La máquina del logo de Inkify: marco y aguja de cromo, bobina satinada y grip de vidrio naranja. */
export function inkifyMachine() {
  const inner = new Group();
  const chrome = materials.chrome();
  // Marco: rectángulo redondeado como en el logo.
  inner.add(strokeTube([[22, 20], [22, 46], [50, 46], [50, 26]], 4.4, chrome));
  inner.add(strokeTube([[22, 20], [40, 20]], 4.4, chrome));
  // Bobina: el círculo de la esquina superior derecha.
  const coil = new Mesh(new TorusGeometry(6.4, 3.6, 32, 96), materials.satin('#2A2A2E', 0.6));
  coil.position.set(52, -16, 0);
  inner.add(coil);
  // Grip de vidrio naranja con tinta dentro.
  const grip = new Mesh(new CylinderGeometry(7.6, 6.2, 32, 64, 1), materials.glass('#F97316', { frost: 0.18, thickness: 14 }));
  grip.position.set(36, -64, 0);
  const capTop = new Mesh(new SphereGeometry(7.6, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), grip.material);
  capTop.position.set(36, -48, 0);
  inner.add(grip, capTop);
  // Aguja.
  const needle = new Mesh(new CylinderGeometry(1, 3, 16, 32), chrome);
  needle.position.set(36, -88, 0);
  inner.add(needle);
  inner.add(strokeTube([[36, 46], [36, 48]], 4.4, chrome));
  return fit(inner, 2);
}

/** Gota de tinta en vidrio naranja. */
export function inkDrop(color = '#FF8A3D') {
  const pts = [];
  for (let i = 0; i <= 96; i++) {
    const th = (i / 96) * Math.PI;
    pts.push(new Vector2(Math.max(0.0001, Math.sin(th) * Math.sin(th / 2) ** 1.4 * 0.78), Math.cos(th) * 1.05));
  }
  const m = materials.glass(color, { frost: 0.06, thickness: 1.2 });
  m.attenuationDistance = 6;
  return new Mesh(new LatheGeometry(pts, 128), m);
}

/** Cartuchos de agujas: cuerpo de vidrio claro con núcleo de tinta. */
export function inkCartridges(count = 4) {
  const g = new Group();
  const body = materials.glass('#FDBA8C', { frost: 0.22, thickness: 0.3 });
  const ink = materials.satin('#F97316', 0.2);
  const tip = materials.chrome();
  for (let i = 0; i < count; i++) {
    const c = new Group();
    c.add(new Mesh(new CylinderGeometry(0.11, 0.11, 0.9, 48), body));
    const core = new Mesh(new CylinderGeometry(0.045, 0.045, 0.82, 24), ink);
    const point = new Mesh(new CylinderGeometry(0.008, 0.05, 0.22, 24), tip);
    point.position.y = -0.56;
    c.add(core, point);
    c.position.set(-0.75 + i * 0.5, (i % 2) * 0.25 - 0.1, (i % 3) * 0.2 - 0.2);
    c.rotation.set(0.25, 0, -0.5 + i * 0.25);
    g.add(c);
  }
  return g;
}

/**
 * Fondo de marca: piezas de vidrio y satinado repartidas a lo ancho y en profundidad, con
 * hueco al centro para el texto. Pensado para banners anchos (CTA, encabezados de app).
 */
export function glassField(colors) {
  const g = new Group();
  const geos = [
    new RoundedBoxGeometry(0.9, 0.9, 0.9, 6, 0.2),
    new TorusGeometry(0.5, 0.17, 32, 96),
    new SphereGeometry(0.42, 48, 32),
    new CylinderGeometry(0.28, 0.28, 1.2, 48),
  ];
  const mats = [materials.glass(colors[0], { frost: 0.2 }), materials.satin(colors[1], 0.4), materials.glass(colors[2] ?? '#FFFFFF', { frost: 0.32 })];
  // Posiciones fijas (no aleatorias) para que cada render salga igual.
  const spots = [
    [-3.3, 0.9, -0.6], [-2.4, -0.9, 0.4], [-1.7, 1.5, -1.6], [-4.2, -1.3, -1.8], [-2.0, 0.2, 1.2],
    [3.2, -0.8, -0.4], [2.4, 1.1, 0.5], [1.7, -1.5, -1.4], [4.2, 1.4, -1.9], [2.0, -0.1, 1.3],
    [-0.5, 2.1, -2.6], [0.7, -2.1, -2.4],
  ];
  spots.forEach((pos, i) => {
    const m = new Mesh(geos[i % geos.length], mats[i % mats.length]);
    m.position.set(...pos);
    m.rotation.set(0.6 * i, 0.9 * i, 0.3 * i);
    m.userData.seed = i;
    g.add(m);
  });
  g.userData.update = ({ t = 0 }) => {
    for (const m of g.children) {
      const k = m.userData.seed;
      m.rotation.x = 0.6 * k + Math.sin((t + k * 0.13) * Math.PI * 2) * 0.25;
      m.rotation.y = 0.9 * k + t * Math.PI * 2 * (k % 2 ? 1 : -1) * 0.25;
    }
  };
  return g;
}

/**
 * Sobre fondos oscuros el vidrio transmite el negro del fondo y se apaga: se vuelve resina con
 * más color propio y un brillo interno leve. Llamar después de agregar el objeto.
 */
export function adaptToDarkBackground(object) {
  object.traverse((o) => {
    const m = o.material;
    if (!o.isMesh || !m?.transmission) return;
    if (m.userData.darkAdapted) return;
    m.userData.darkAdapted = true;
    m.transmission = 0.35;
    m.emissive = m.color.clone();
    m.emissiveIntensity = 0.22;
    m.attenuationDistance = Infinity;
  });
}

// ---------- Escenario ----------

export const SCENES = {
  'zelunko-mark': zelunkoMark,
  'zelunko-mark-navy': () => zelunkoMark({ base: 'navy' }),
  'zelunko-rings': zelunkoRings,
  'rentafacil-house': rentaFacilHouse,
  'rentafacil-seal': rentaFacilSeal,
  'rentafacil-cubes': () => paymentCubes('#45D99A'),
  'inkify-machine': inkifyMachine,
  'inkify-drop': () => inkDrop(),
  'inkify-cartridges': inkCartridges,
  'zelunko-field': () => glassField(['#03DAC0', '#E6ECF4', '#9FB6E0']),
  'rentafacil-field': () => glassField(['#45D99A', '#0B5C58', '#BFEBDB']),
  'inkify-field': () => glassField(['#F97316', '#2A2A2E', '#FFD8BD']),
};

/**
 * Crea un escenario con la luz de estudio común. `shadow` agrega una sombra de contacto suave
 * bajo el objeto (para fondos claros) y `background` el color de la sección detrás. Devuelve { renderer, scene, camera, stage, render, resize, dispose }.
 */
export function createStage(canvas, { shadow = false, alpha = true, exposure = 1, fov = 30, distance = 5.2, background = null } = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.shadowMap.enabled = shadow;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  scene.environmentIntensity = 0.9;
  // Con fondo, el vidrio refracta el color de la sección; sin fondo se ve opaco.
  if (background) scene.background = new Color(background);

  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 5, 4);
  key.castShadow = shadow;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 8;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 20;
  scene.add(key);
  const rim = new DirectionalLight(0xbfe9ff, 0.8);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  if (shadow) {
    const floor = new Mesh(new PlaneGeometry(12, 12), new ShadowMaterial({ opacity: 0.16 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.25;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  const camera = new PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.set(0, 0, distance);

  const stage = new Group();
  scene.add(stage);

  const resize = (w = canvas.clientWidth, h = canvas.clientHeight) => {
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  const castShadows = () => stage.traverse((o) => o.isMesh && (o.castShadow = shadow));

  return {
    renderer,
    scene,
    camera,
    stage,
    castShadows,
    resize,
    render: () => renderer.render(scene, camera),
    dispose: () => {
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
