// La Z del logo en 3D: las dos piezas del símbolo se extruyen desde el mismo vector del SVG,
// flotan separadas y se acomodan siguiendo al cursor. Se carga después del primer pintado
// para no frenar la página; sin WebGL o con movimiento reducido se queda el póster estático.
import {
  ACESFilmicToneMapping,
  Color,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const AQUA_PATH = 'M52 2H248a26 26 0 0 1 24 38L172 154H116L202 56H4Z';
const NAVY_PATH = 'M222 224H26a26 26 0 0 1-24-38L102 72h56L72 170h198Z';

function shapesFrom(d) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
  return new SVGLoader().parse(svg).paths.flatMap((p) => SVGLoader.createShapes(p));
}

function piece(d, material) {
  const geometry = new ExtrudeGeometry(shapesFrom(d), {
    depth: 46,
    bevelEnabled: true,
    bevelThickness: 7,
    bevelSize: 5,
    bevelSegments: 6,
    curveSegments: 24,
  });
  // El SVG crece hacia abajo; se voltea y se centra en el centro del símbolo (137, 113).
  geometry.translate(-137, -113, -23);
  geometry.scale(1, -1, 1);
  geometry.computeVertexNormals();
  return new Mesh(geometry, material);
}

export function mountHero3D(canvas, { reducedMotion = false } = {}) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  // Reflejos suaves: con más intensidad el aqua se lava y el marino se vuelve celeste.
  scene.environmentIntensity = 0.55;

  const camera = new PerspectiveCamera(32, 1, 1, 4000);
  camera.position.set(0, 0, 900);

  const aqua = piece(
    AQUA_PATH,
    new MeshPhysicalMaterial({
      color: new Color('#03DAC0'),
      metalness: 0.05,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
            emissive: new Color('#03DAC0'),
      emissiveIntensity: 0.22,
    }),
  );
  const navy = piece(
    NAVY_PATH,
    new MeshPhysicalMaterial({
      // Sobre fondo oscuro la pieza marino va en blanco, igual que el logo en negativo.
      color: new Color('#F4F7FC'),
      metalness: 0.05,
      roughness: 0.35,
      emissive: new Color('#FFFFFF'),
      emissiveIntensity: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
  );

  const logo = new Group();
  logo.add(aqua, navy);
  scene.add(logo);
  
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // En pantallas angostas la Z se aleja un poco para que no se corte.
    camera.position.z = w < 640 ? 1080 : 900;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(canvas);

  const start = performance.now();
  let frame = 0;
  const render = (now) => {
    frame = requestAnimationFrame(render);
    if (!visible || document.hidden) return;
    const t = (now - start) / 1000;
    // Entrada: las piezas llegan desde lados opuestos y encajan. Después solo un vaivén lento.
    const intro = reducedMotion ? 1 : 1 - Math.pow(1 - Math.min(t / 1.8, 1), 4);
    aqua.position.set(140 * (1 - intro), 120 * (1 - intro) + 6, 30 + 40 * (1 - intro));
    navy.position.set(-140 * (1 - intro), -120 * (1 - intro) - 6, -30 - 40 * (1 - intro));

    eased.x += (pointer.x - eased.x) * 0.05;
    eased.y += (pointer.y - eased.y) * 0.05;
    const drift = reducedMotion ? 0 : Math.sin(t * 0.5) * 0.12;
    logo.rotation.y = -0.38 + eased.x * 0.45 + drift + (1 - intro) * 1.4;
    logo.rotation.x = 0.12 + eased.y * 0.25;
    

    renderer.render(scene, camera);
    if (reducedMotion && t > 0.1) cancelAnimationFrame(frame);
  };
  frame = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onPointer);
    renderer.dispose();
  };
}
