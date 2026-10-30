// Página de render: ?scene=inkify-machine&rx=0.2&ry=-0.5&shadow=1&explode=0
// El script de render llama a window.frame(t) para cada cuadro y captura el canvas.
import { adaptToDarkBackground, createStage, SCENES } from '../src/three/zelunko3d.js';

const q = new URLSearchParams(location.search);
const num = (k, d) => (q.has(k) ? Number(q.get(k)) : d);
const stage = createStage(document.getElementById('c'), {
  shadow: q.get('shadow') === '1',
  distance: num('distance', 5.2),
  exposure: num('exposure', 1),
  background: q.get('bg') ? `#${q.get('bg')}` : null,
});
const object = SCENES[q.get('scene') ?? 'zelunko-mark']();
stage.stage.add(object);
// Fondo oscuro: el vidrio pasa a resina para no verse negro.
const bg = q.get('bg');
// `dark=1` lo fuerza también sin fondo (render transparente para poner sobre un fondo oscuro).
const isDark = (hex) => parseInt(hex.slice(0, 2), 16) + parseInt(hex.slice(2, 4), 16) + parseInt(hex.slice(4, 6), 16) < 200;
// Sin fondo detrás el vidrio no tiene qué refractar: también pasa a resina (sólida sobre cualquier color).
if (q.get('dark') === '1' || !bg || isDark(bg)) adaptToDarkBackground(object);
stage.castShadows();
stage.resize(innerWidth, innerHeight);

const rx = num('rx', 0.15);
const ry = num('ry', -0.45);
const isField = (q.get('scene') ?? '').endsWith('-field');
const spin = num('spin', 0); // vueltas en Y a lo largo de un ciclo t 0→1
const bob = num('bob', 0); // flotado vertical
window.frame = (t = 0) => {
  if (!isField) object.rotation.set(rx + Math.sin(t * Math.PI * 2) * 0.04, ry + spin * t * Math.PI * 2 + Math.sin(t * Math.PI * 2) * 0.12, 0);
  object.position.y = bob * Math.sin(t * Math.PI * 2);
  object.userData.update?.({ t, explode: num('explode', 0) });
  stage.render();
};
window.frame(0);
window.__ready = true;
