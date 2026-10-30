// Edificios y casas 3D de RentaFácil (se suman a la casa del logo, el sello y los cubos de
// zelunko3d.js): casa caricaturesca, torre de departamentos y una cuadra en miniatura.
import { BoxGeometry, CylinderGeometry, ExtrudeGeometry, Group, Mesh, Shape, SphereGeometry } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { fit, materials } from './zelunko3d.js';

const TEAL = '#0B5C58';
const TEAL_DARK = '#064C4C';
const MINT = '#45D99A';
const WALL = '#F3F6F4';

const wallMat = () => materials.satin(WALL, 0.02);
const windowMat = () => materials.glass('#9FE3C8', { frost: 0.18, thickness: 0.3 });

/** Casa de dos aguas: muros claros, techo teal, puerta menta, ventanas de vidrio y chimenea. */
export function cartoonHouse({ roof = TEAL, door = MINT } = {}) {
  const g = new Group();
  const body = new Mesh(new RoundedBoxGeometry(1.6, 1.1, 1.3, 6, 0.08), wallMat());
  body.position.y = 0.55;
  g.add(body);

  // Techo: prisma triangular extruido a lo profundo, un poco más grande que los muros.
  const tri = new Shape();
  tri.moveTo(-0.98, 0);
  tri.lineTo(0, 0.78);
  tri.lineTo(0.98, 0);
  tri.closePath();
  const roofGeo = new ExtrudeGeometry(tri, { depth: 1.5, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4 });
  roofGeo.translate(0, 0, -0.75);
  const roofMesh = new Mesh(roofGeo, materials.satin(roof, 0.3));
  roofMesh.position.y = 1.08;
  g.add(roofMesh);
  // Hastial (triángulo de muro bajo el techo).
  const gable = new Mesh(new ExtrudeGeometry(tri, { depth: 1.26, bevelEnabled: false }), wallMat());
  gable.scale.set(0.82, 0.82, 1);
  gable.position.set(0, 1.1, -0.63);
  g.add(gable);

  const chimney = new Mesh(new RoundedBoxGeometry(0.24, 0.5, 0.24, 3, 0.04), materials.satin(TEAL_DARK, 0.3));
  chimney.position.set(0.48, 1.62, -0.2);
  g.add(chimney);

  const doorMesh = new Mesh(new RoundedBoxGeometry(0.34, 0.6, 0.08, 3, 0.04), materials.satin(door, 0.2));
  doorMesh.position.set(-0.3, 0.32, 0.66);
  const knob = new Mesh(new SphereGeometry(0.03, 16, 12), materials.satin('#D9A441', 0.9));
  knob.position.set(-0.2, 0.32, 0.71);
  g.add(doorMesh, knob);
  for (const [x, y] of [[0.36, 0.6]]) {
    const frame = new Mesh(new RoundedBoxGeometry(0.5, 0.42, 0.06, 3, 0.03), materials.satin(TEAL_DARK, 0.3));
    frame.position.set(x, y, 0.66);
    const glass = new Mesh(new RoundedBoxGeometry(0.4, 0.32, 0.06, 3, 0.02), windowMat());
    glass.position.set(x, y, 0.69);
    g.add(frame, glass);
  }
  const ventana = new Mesh(new CylinderGeometry(0.14, 0.14, 0.06, 32), windowMat());
  ventana.rotation.x = Math.PI / 2;
  ventana.position.set(0, 1.4, 0.66);
  g.add(ventana);
  return g;
}

/** Torre de departamentos: cuerpo teal con retícula de ventanas de vidrio menta y azotea. */
export function apartmentTower({ floors = 6 } = {}) {
  const g = new Group();
  const h = floors * 0.42 + 0.2;
  const body = new Mesh(new RoundedBoxGeometry(1.1, h, 1.1, 6, 0.08), materials.satin(TEAL, 0.25));
  body.position.y = h / 2;
  g.add(body);
  const win = new RoundedBoxGeometry(0.22, 0.24, 0.05, 2, 0.03);
  const glass = windowMat();
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < 3; c++) {
      const y = 0.32 + f * 0.42;
      const off = (c - 1) * 0.32;
      const front = new Mesh(win, glass);
      front.position.set(off, y, 0.56);
      const side = new Mesh(win, glass);
      side.rotation.y = Math.PI / 2;
      side.position.set(0.56, y, off);
      g.add(front, side);
    }
  }
  const roof = new Mesh(new RoundedBoxGeometry(1.2, 0.1, 1.2, 3, 0.04), materials.satin(TEAL_DARK, 0.3));
  roof.position.y = h + 0.03;
  const tank = new Mesh(new CylinderGeometry(0.16, 0.16, 0.3, 32), materials.satin(WALL, 0.1));
  tank.position.set(-0.25, h + 0.22, -0.2);
  g.add(roof, tank);
  // Entrada de vidrio.
  const lobby = new Mesh(new RoundedBoxGeometry(0.42, 0.3, 0.06, 3, 0.03), windowMat());
  lobby.position.set(0, 0.16, 0.56);
  g.add(lobby);
  return g;
}

function tree() {
  const g = new Group();
  const trunk = new Mesh(new CylinderGeometry(0.04, 0.05, 0.25, 12), materials.satin('#8A6A4F', 0.05));
  trunk.position.y = 0.12;
  const crown = new Mesh(new SphereGeometry(0.2, 32, 24), materials.satin(MINT, 0.05));
  crown.position.y = 0.38;
  g.add(trunk, crown);
  return g;
}

/** Cuadra en miniatura sobre una base: dos casas, una torre, árboles y la banqueta. */
export function neighborhood() {
  const g = new Group();
  const base = new Mesh(new RoundedBoxGeometry(4.6, 0.24, 3, 6, 0.1), materials.satin('#E7F3EE', 0.02));
  base.position.y = -0.12;
  const street = new Mesh(new BoxGeometry(4.5, 0.02, 0.6), materials.satin('#D3E3DD', 0.02));
  street.position.set(0, 0.01, 1.05);
  g.add(base, street);

  const tower = apartmentTower({ floors: 6 });
  tower.position.set(0.15, 0, -0.45);
  const h1 = cartoonHouse();
  h1.scale.setScalar(0.72);
  h1.position.set(-1.45, 0, -0.2);
  const h2 = cartoonHouse({ roof: MINT, door: TEAL });
  h2.scale.setScalar(0.62);
  h2.position.set(1.55, 0, 0.05);
  h2.rotation.y = -0.15;
  g.add(tower, h1, h2);
  for (const [x, z] of [[-0.6, 0.35], [0.95, -0.85], [-2.0, -0.95], [2.0, -0.8]]) {
    const t = tree();
    t.position.set(x, 0, z);
    g.add(t);
  }
  return fit(g, 2.3);
}

export const RENTAFACIL_SCENES = {
  'rentafacil-cartoon-house': () => fit(cartoonHouse(), 1.75),
  'rentafacil-tower': () => fit(apartmentTower(), 1.9),
  'rentafacil-neighborhood': neighborhood,
};
