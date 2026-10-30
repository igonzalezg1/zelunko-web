// Objetos 3D de Inkify: una máquina de bobinas reconocible (marco anodizado naranja, bobinas
// con estrellas flash, grip moleteado de acero), un brazo caricaturesco con tatuaje, frascos de
// tinta y un fondo con piezas del oficio. Mismos materiales y luz que el resto (zelunko3d.js).
import {
  CanvasTexture,
  CapsuleGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Mesh,
  MeshPhysicalMaterial,
  RepeatWrapping,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { fit, materials } from './zelunko3d.js';

const ORANGE = '#F97316';
const INK = '#1D1D20';
const SKIN = '#F1C3A0';

// ---------- Texturas dibujadas (estilo flash tradicional) ----------

function canvasTexture(w, h, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext('2d'), w, h);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Corazón con listón, el tatuaje flash más clásico. Centrado en (cx, cy) con tamaño s. */
function drawHeartFlash(ctx, cx, cy, s, text = 'MAMÁ') {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // Corazón.
  const heart = new Path2D();
  heart.moveTo(0, s * 0.42);
  heart.bezierCurveTo(-s * 0.62, -s * 0.02, -s * 0.5, -s * 0.52, -s * 0.18, -s * 0.5);
  heart.bezierCurveTo(-s * 0.06, -s * 0.5, 0, -s * 0.4, 0, -s * 0.32);
  heart.bezierCurveTo(0, -s * 0.4, s * 0.06, -s * 0.5, s * 0.18, -s * 0.5);
  heart.bezierCurveTo(s * 0.5, -s * 0.52, s * 0.62, -s * 0.02, 0, s * 0.42);
  ctx.fillStyle = ORANGE;
  ctx.fill(heart);
  ctx.save();
  ctx.clip(heart);
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.ellipse(-s * 0.24, -s * 0.28, s * 0.08, s * 0.14, -0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(120,30,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(s * 0.14, s * 0.12, s * 0.3, s * 0.2, -0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.lineWidth = s * 0.045;
  ctx.strokeStyle = INK;
  ctx.stroke(heart);
  // Listón con texto.
  const bw = s * 0.62;
  const bh = s * 0.17;
  const ribbon = new Path2D();
  ribbon.moveTo(-bw - s * 0.16, -bh * 0.2);
  ribbon.lineTo(-bw, -bh * 0.5);
  ribbon.quadraticCurveTo(0, -bh * 1.3, bw, -bh * 0.5);
  ribbon.lineTo(bw + s * 0.16, -bh * 0.2);
  ribbon.lineTo(bw + s * 0.06, bh * 0.25);
  ribbon.lineTo(bw + s * 0.16, bh * 0.7);
  ribbon.lineTo(bw, bh * 0.5);
  ribbon.quadraticCurveTo(0, -bh * 0.3, -bw, bh * 0.5);
  ribbon.lineTo(-bw - s * 0.16, bh * 0.7);
  ribbon.lineTo(-bw - s * 0.06, bh * 0.25);
  ribbon.closePath();
  ctx.fillStyle = '#FBF3E4';
  ctx.fill(ribbon);
  ctx.lineWidth = s * 0.03;
  ctx.stroke(ribbon);
  ctx.fillStyle = INK;
  ctx.font = `800 ${Math.round(s * 0.15)}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, -bh * 0.05);
  // Destellos.
  ctx.lineWidth = s * 0.025;
  for (const [x, y, r] of [[-0.55, -0.62, 0.07], [0.6, -0.55, 0.05], [0.52, 0.35, 0.06]]) {
    ctx.beginPath();
    ctx.moveTo(x * s - r * s, y * s);
    ctx.lineTo(x * s + r * s, y * s);
    ctx.moveTo(x * s, y * s - r * s);
    ctx.lineTo(x * s, y * s + r * s);
    ctx.stroke();
  }
  ctx.restore();
}

/** Estrella flash de cinco puntas, naranja con contorno negro (estampado de las bobinas). */
function drawStar(ctx, cx, cy, s) {
  ctx.save();
  ctx.translate(cx, cy);
  const star = new Path2D();
  for (let i = 0; i <= 10; i++) {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 ? s * 0.2 : s * 0.48;
    if (i === 0) star.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else star.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  star.closePath();
  ctx.fillStyle = ORANGE;
  ctx.fill(star);
  ctx.lineJoin = 'round';
  ctx.lineWidth = s * 0.06;
  ctx.strokeStyle = INK;
  ctx.stroke(star);
  ctx.restore();
}

// ---------- Máquina de bobinas ----------

const roundedRectShape = (x, y, w, h, r) => {
  const s = new Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
};

/** Perfil moleteado: anillos con ranura, como el grip de acero de una máquina real. */
function knurledGrip(radius, length, rings) {
  const pts = [new Vector2(0.001, 0)];
  const step = length / rings;
  for (let i = 0; i < rings; i++) {
    const y = i * step;
    pts.push(new Vector2(radius * 0.9, y + step * 0.02));
    pts.push(new Vector2(radius, y + step * 0.18));
    pts.push(new Vector2(radius, y + step * 0.72));
    pts.push(new Vector2(radius * 0.9, y + step * 0.92));
  }
  pts.push(new Vector2(radius * 0.9, length), new Vector2(0.001, length));
  return new LatheGeometry(pts, 96);
}

export function inkifyMachine() {
  const steel = materials.chrome('#E4E8EE');
  const brass = materials.satin('#D9A441', 0.9);
  const frameMat = new MeshPhysicalMaterial({ color: ORANGE, metalness: 0.55, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.15 });
  const inner = new Group();

  // Marco: poste trasero, base de las bobinas, brazo del tornillo de contacto y la nariz que
  // sujeta el tubo. Una sola placa extruida con un hueco decorativo.
  const frame = new Shape();
  frame.moveTo(-12, -4);
  frame.lineTo(56, -4);
  frame.quadraticCurveTo(62, -4, 62, 2);
  frame.lineTo(62, -16);
  frame.quadraticCurveTo(62, -24, 54, -24);
  frame.lineTo(48, -24);
  frame.lineTo(48, -10);
  frame.lineTo(44, 6);
  frame.lineTo(-2, 6);
  frame.lineTo(-2, 44);
  frame.lineTo(22, 50);
  frame.quadraticCurveTo(26, 51, 26, 55);
  frame.lineTo(26, 58);
  frame.quadraticCurveTo(26, 62, 22, 62);
  frame.lineTo(-6, 62);
  frame.quadraticCurveTo(-12, 62, -12, 56);
  frame.closePath();
  const hole = new Shape();
  hole.absarc(-7, 28, 3, 0, Math.PI * 2, true);
  frame.holes.push(hole);
  const frameGeo = new ExtrudeGeometry(frame, { depth: 5, bevelEnabled: true, bevelThickness: 1.2, bevelSize: 1, bevelSegments: 4, curveSegments: 24 });
  const plate = new Mesh(frameGeo, frameMat);
  plate.position.z = -15;
  inner.add(plate);

  // Dos bobinas sobre la base, con el cuerpo estampado y arandelas de latón.
  const coilTex = canvasTexture(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = '#F7F2EA';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 3; i++) drawStar(ctx, w * (0.17 + i * 0.33), h * 0.5, h * 0.6);
  });
  coilTex.wrapS = RepeatWrapping;
  const coilMat = new MeshPhysicalMaterial({ map: coilTex, roughness: 0.45, clearcoat: 0.8, clearcoatRoughness: 0.2 });
  for (const x of [12, 33]) {
    const body = new Mesh(new CylinderGeometry(9, 9, 26, 64), coilMat);
    body.position.set(x, 20, 0);
    body.rotation.y = -0.6;
    const capTop = new Mesh(new CylinderGeometry(10.2, 10.2, 2.4, 64), brass);
    capTop.position.set(x, 34, 0);
    const capBot = capTop.clone();
    capBot.position.y = 6.6;
    inner.add(body, capTop, capBot);
  }

  // Barra de armadura, resorte trasero y tornillo de contacto.
  const armature = new Mesh(new RoundedBoxGeometry(40, 3.2, 10, 3, 0.8), steel);
  armature.position.set(26, 39, 0);
  const spring = new Mesh(new RoundedBoxGeometry(10, 1, 8, 2, 0.4), steel);
  spring.position.set(4, 40.6, 0);
  const contact = new Mesh(new CylinderGeometry(1.4, 1.4, 14, 24), brass);
  contact.position.set(14, 49, 0);
  const contactNut = new Mesh(new CylinderGeometry(3, 3, 3, 6), steel);
  contactNut.position.set(14, 54, 0);
  inner.add(armature, spring, contact, contactNut);

  // Tornillos de latón en el marco.
  for (const [x, y] of [[-7, 54], [-7, 12], [55, -12], [40, 0]]) {
    const bolt = new Mesh(new CylinderGeometry(2.6, 2.6, 3, 32), brass);
    bolt.rotation.x = Math.PI / 2;
    bolt.position.set(x, y, -8.2);
    inner.add(bolt);
  }

  // Barra de agujas: de la armadura baja por dentro del tubo.
  const needleBar = new Mesh(new CylinderGeometry(0.9, 0.9, 70, 16), steel);
  needleBar.position.set(46, 6, 0);
  inner.add(needleBar);

  // Tubo: vástago, grip moleteado, punta cónica y la aguja.
  const stem = new Mesh(new CylinderGeometry(4.6, 4.6, 16, 48), steel);
  stem.position.set(55, -30, 0);
  const vise = new Mesh(new CylinderGeometry(6.4, 6.4, 7, 48), brass);
  vise.position.set(55, -22, 0);
  const grip = new Mesh(knurledGrip(13, 40, 9), steel);
  grip.position.set(55, -78, 0);
  const tipCone = new Mesh(new CylinderGeometry(5, 1.2, 18, 48), steel);
  tipCone.position.set(55, -87, 0);
  const needle = new Mesh(new CylinderGeometry(0.35, 0.05, 9, 12), steel);
  needle.position.set(55, -100, 0);
  inner.add(stem, vise, grip, tipCone, needle);

  // Inclinada como se sostiene: grip hacia abajo a la izquierda.
  inner.rotation.z = -0.55;
  return fit(inner, 2.5);
}

// ---------- Brazo con tatuaje ----------

/** Antebrazo caricaturesco con pulgar arriba, manga naranja y un corazón flash tatuado. */
export function tattooArm() {
  const tattoo = canvasTexture(2048, 1024, (ctx, w, h) => {
    ctx.fillStyle = SKIN;
    ctx.fillRect(0, 0, w, h);
    drawHeartFlash(ctx, w * 0.5, h * 0.52, h * 0.62);
  });
  tattoo.wrapS = RepeatWrapping;
  const skinTattoo = new MeshPhysicalMaterial({ map: tattoo, roughness: 0.55, sheen: 0.4, sheenColor: '#FFD9C2', clearcoat: 0.15 });
  const skin = new MeshPhysicalMaterial({ color: SKIN, roughness: 0.55, sheen: 0.4, sheenColor: '#FFD9C2', clearcoat: 0.15 });
  const sleeveMat = materials.satin(ORANGE, 0.05);
  const g = new Group();

  // Antebrazo: perfil con músculo marcado del codo a la muñeca.
  const L = 2.4;
  const prof = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const r = 0.5 + 0.1 * Math.sin(Math.min(t / 0.45, 1) * Math.PI * 0.9) - 0.16 * Math.max(0, (t - 0.35) / 0.65) ** 1.3;
    prof.push(new Vector2(r, t * L));
  }
  const forearm = new Mesh(new LatheGeometry(prof, 96), skinTattoo);
  // El tatuaje (centro del lienzo, u = 0.5) queda mirando a la cámara.
  forearm.rotation.y = Math.PI;
  g.add(forearm);

  // Manga enrollada en el codo.
  const sleeve = new Mesh(new CylinderGeometry(0.6, 0.66, 0.7, 64), sleeveMat);
  sleeve.position.y = -0.1;
  const roll = new Mesh(new TorusGeometry(0.62, 0.11, 24, 96), sleeveMat);
  roll.rotation.x = Math.PI / 2;
  roll.position.y = 0.25;
  g.add(sleeve, roll);

  // Puño con nudillos y el pulgar arriba.
  const fist = new Mesh(new RoundedBoxGeometry(0.98, 0.9, 0.82, 8, 0.32), skin);
  fist.position.set(0.04, L + 0.36, 0.02);
  g.add(fist);
  for (let i = 0; i < 4; i++) {
    const finger = new Mesh(new CapsuleGeometry(0.15, 0.48, 8, 24), skin);
    finger.rotation.z = Math.PI / 2;
    finger.position.set(0.12, L + 0.14 + i * 0.2, 0.36);
    g.add(finger);
  }
  const thumb = new Mesh(new CapsuleGeometry(0.15, 0.42, 8, 24), skin);
  thumb.position.set(-0.24, L + 1.0, 0.18);
  thumb.rotation.z = 0.12;
  g.add(thumb);
  const nail = new Mesh(new SphereGeometry(0.1, 24, 16), new MeshPhysicalMaterial({ color: '#F8DCCB', roughness: 0.25, clearcoat: 1 }));
  nail.scale.set(1, 1.2, 0.4);
  nail.position.set(-0.25, L + 1.24, 0.31);
  g.add(nail);

  // Diagonal, el puño arriba a la derecha.
  g.rotation.z = -0.5;
  return fit(g, 2.1);
}

// ---------- Frascos de tinta ----------

function inkBottle(ink, label) {
  const g = new Group();
  const body = [
    [0.001, 0], [0.42, 0], [0.5, 0.06], [0.52, 0.16], [0.52, 0.92], [0.48, 1.06], [0.34, 1.16], [0.22, 1.2], [0.2, 1.32], [0.001, 1.32],
  ].map(([x, y]) => new Vector2(x, y));
  g.add(new Mesh(new LatheGeometry(body, 96), materials.glass(ink, { frost: 0.12, thickness: 0.6 })));
  const capPts = [new Vector2(0.001, 1.3)];
  for (let i = 0; i <= 12; i++) {
    const y = 1.3 + i * 0.035;
    capPts.push(new Vector2(i % 2 ? 0.25 : 0.27, y));
  }
  capPts.push(new Vector2(0.24, 1.76), new Vector2(0.001, 1.77));
  g.add(new Mesh(new LatheGeometry(capPts, 64), materials.satin(INK, 0.2)));
  const tex = canvasTexture(1024, 256, (ctx, w, h) => {
    ctx.fillStyle = '#FBF7F1';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = ink;
    ctx.fillRect(w * 0.36, h * 0.12, w * 0.28, h * 0.12);
    ctx.fillStyle = INK;
    ctx.font = `800 ${h * 0.34}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, w * 0.5, h * 0.58);
    ctx.font = `600 ${h * 0.11}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('TINTA PARA TATUAJE', w * 0.5, h * 0.84);
  });
  const lbl = new Mesh(new CylinderGeometry(0.525, 0.525, 0.5, 96, 1, true), new MeshPhysicalMaterial({ map: tex, roughness: 0.6 }));
  lbl.position.y = 0.52;
  // u = 0.5 (centro del texto) queda al frente.
  lbl.rotation.y = Math.PI;
  g.add(lbl);
  return g;
}

/** Tres frascos de tinta: negro, naranja y rojo. */
export function inkBottles() {
  const g = new Group();
  const specs = [
    ['#C2272D', 'ROJO', 0.05, 0, -0.9, 0.85],
    ['#1B1B1F', 'NEGRO', -0.66, 0, 0.1, 1],
    ['#F97316', 'NARANJA', 0.68, 0, 0.25, 0.9],
  ];
  for (const [ink, label, x, y, z, s] of specs) {
    const b = inkBottle(ink, label);
    b.position.set(x, y, z);
    b.scale.setScalar(s);
    b.rotation.y = 0.45 - x * 0.2;
    g.add(b);
  }
  return fit(g, 2);
}

// ---------- Fondo ----------

const heartShape = () => {
  const s = new Shape();
  s.moveTo(0, -0.42);
  s.bezierCurveTo(-0.62, 0.02, -0.5, 0.52, -0.18, 0.5);
  s.bezierCurveTo(-0.06, 0.5, 0, 0.4, 0, 0.32);
  s.bezierCurveTo(0, 0.4, 0.06, 0.5, 0.18, 0.5);
  s.bezierCurveTo(0.5, 0.52, 0.62, 0.02, 0, -0.42);
  return s;
};
const starShape = (points = 5) => {
  const s = new Shape();
  for (let i = 0; i <= points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2 + Math.PI / 2;
    const r = i % 2 ? 0.2 : 0.48;
    if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  return s;
};

/** Piezas del oficio repartidas con hueco al centro: corazones y estrellas flash, gotas y caps de tinta. */
export function inkifyField() {
  const extrude = (shape) =>
    new ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 6, curveSegments: 32 }).center();
  const drop = (() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const th = (i / 64) * Math.PI;
      pts.push(new Vector2(Math.max(0.0001, Math.sin(th) * Math.sin(th / 2) ** 1.4 * 0.36), Math.cos(th) * 0.5));
    }
    return new LatheGeometry(pts, 64);
  })();
  const cap = new LatheGeometry(
    [[0.001, 0], [0.26, 0], [0.3, 0.05], [0.32, 0.44], [0.27, 0.44], [0.25, 0.08], [0.001, 0.08]].map(([x, y]) => new Vector2(x, y)),
    64,
  );
  const geos = [extrude(heartShape()), drop, extrude(starShape()), cap];
  const mats = [materials.satin(ORANGE, 0.2), materials.glass('#2A2A2E', { frost: 0.15 }), materials.satin('#FBF3E4', 0.1), materials.satin('#FDBA74', 0.15)];
  const spots = [
    [-3.3, 0.9, -0.6], [-2.4, -0.9, 0.4], [-1.7, 1.5, -1.6], [-4.2, -1.3, -1.8], [-2.0, 0.2, 1.2],
    [3.2, -0.8, -0.4], [2.4, 1.1, 0.5], [1.7, -1.5, -1.4], [4.2, 1.4, -1.9], [2.0, -0.1, 1.3],
    [-0.5, 2.1, -2.6], [0.7, -2.1, -2.4],
  ];
  const g = new Group();
  spots.forEach((pos, i) => {
    const m = new Mesh(geos[i % geos.length], mats[(i + Math.floor(i / 4)) % mats.length]);
    m.position.set(...pos);
    m.rotation.set(0.4 * i, 0.7 * i, 0.25 * i);
    m.scale.setScalar(1.5);
    m.userData.seed = i;
    g.add(m);
  });
  g.userData.update = ({ t = 0 }) => {
    for (const m of g.children) {
      const k = m.userData.seed;
      m.rotation.x = 0.4 * k + Math.sin((t + k * 0.13) * Math.PI * 2) * 0.25;
      m.rotation.y = 0.7 * k + t * Math.PI * 2 * (k % 2 ? 1 : -1) * 0.25;
    }
  };
  return g;
}

export const INKIFY_SCENES = {
  'inkify-machine': inkifyMachine,
  'inkify-arm': tattooArm,
  'inkify-bottles': inkBottles,
  'inkify-field': inkifyField,
};
