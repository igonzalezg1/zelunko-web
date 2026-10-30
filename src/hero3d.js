// Escenas 3D en vivo de zelunko.com: la Z de vidrio aqua y base perla (src/three/zelunko3d.js).
// - Héroe: las piezas llegan y encajan; siguen al cursor y se separan al salir del héroe con el scroll.
// - Historia: sección fija donde el scroll arma, gira y separa la Z al ritmo del texto.
// Solo se dibuja mientras el canvas está en pantalla. Con movimiento reducido queda una pose fija.
import { adaptToDarkBackground, createStage, zelunkoMark } from './three/zelunko3d.js';

const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 4);

function mount(canvas, { reducedMotion, base, pose }) {
  let stage;
  try {
    stage = createStage(canvas, { distance: 5.4 });
  } catch {
    return null;
  }
  const z = zelunkoMark({ base });
  stage.stage.add(z);
  // El canvas es transparente: sin fondo que refractar, el vidrio pasa a resina para no verse lavado.
  adaptToDarkBackground(z);

  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = (e.clientY / innerHeight) * 2 - 1;
  };
  addEventListener('pointermove', onPointer, { passive: true });

  const resize = () => {
    stage.resize();
    // En pantallas angostas la Z se aleja un poco para que no se corte.
    stage.camera.position.z = canvas.clientWidth < 640 ? 6.2 : 5.4;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(canvas);

  const start = performance.now();
  let frame = 0;
  const loop = (now) => {
    frame = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const t = (now - start) / 1000;
    eased.x += (pointer.x - eased.x) * 0.05;
    eased.y += (pointer.y - eased.y) * 0.05;
    const p = pose({ t, pointer: eased, reducedMotion });
    z.rotation.set(p.rx, p.ry, p.rz ?? 0);
    z.position.y = p.y ?? 0;
    z.userData.update({ explode: p.explode });
    stage.render();
    if (reducedMotion && t > 0.1) cancelAnimationFrame(frame);
  };
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    io.disconnect();
    removeEventListener('pointermove', onPointer);
    stage.dispose();
  };
}

/** Avance 0–1 del scroll dentro de un elemento (0 cuando su borde superior toca el de la pantalla). */
const scrollProgress = (el) => () => {
  const r = el.getBoundingClientRect();
  return Math.min(Math.max(-r.top / Math.max(r.height - innerHeight, 1), 0), 1);
};

export function mountHero3D(canvas, { reducedMotion = false } = {}) {
  const hero = canvas.closest('.hero');
  return mount(canvas, {
    reducedMotion,
    base: 'pearl',
    pose: ({ t, pointer }) => {
      const intro = reducedMotion ? 1 : ease(t / 1.8);
      // Al bajar, las piezas se separan y la Z sube un poco: lo que sigue es la historia.
      const leave = reducedMotion ? 0 : Math.min(Math.max(-hero.getBoundingClientRect().top / hero.offsetHeight, 0), 1);
      const drift = reducedMotion ? 0 : Math.sin(t * 0.5) * 0.1;
      return {
        explode: (1 - intro) * 1.2 + leave * 0.5,
        rx: 0.14 + pointer.y * 0.22 + leave * 0.3,
        ry: -0.4 + pointer.x * 0.4 + drift + (1 - intro) * 1.3,
        y: leave * 0.4,
      };
    },
  });
}

/**
 * Historia fija: 0–0.33 la Z gira de tres cuartos a frente; 0.33–0.66 se separan la base y la pieza aqua;
 * 0.66–1 vuelven a encajar. Marca el paso activo en `[data-story-step]` para el texto.
 */
export function mountStory3D(canvas, { reducedMotion = false } = {}) {
  const section = canvas.closest('[data-story]');
  const progress = scrollProgress(section);
  const steps = [...section.querySelectorAll('[data-story-step]')];
  let current = -1;
  return mount(canvas, {
    reducedMotion,
    base: 'navy',
    pose: ({ t }) => {
      const p = progress();
      const step = Math.min(steps.length - 1, Math.floor(p * steps.length));
      if (step !== current) {
        current = step;
        steps.forEach((el, i) => el.classList.toggle('is-active', i === step));
      }
      if (reducedMotion) return { explode: 0, rx: 0.12, ry: -0.35 };
      const turn = ease(p / 0.33);
      const split = Math.sin(Math.min(Math.max((p - 0.33) / 0.62, 0), 1) * Math.PI);
      return {
        explode: split * 0.7,
        rx: 0.1 + split * 0.25,
        ry: -0.9 * (1 - turn) - 0.3 + split * 0.6 + Math.sin(t * 0.4) * 0.05,
        rz: split * -0.12,
      };
    },
  });
}
