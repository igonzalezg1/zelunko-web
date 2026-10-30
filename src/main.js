import './style.css';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
document.documentElement.classList.add('js');

// Barra de navegación: sólida al bajar y menú móvil.
const header = document.querySelector('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menu?.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
menu?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }),
);

// Aparición al hacer scroll, escalonada por grupo.
const revealables = document.querySelectorAll('[data-reveal]');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-visible'));
} else {
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    group.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => el.style.setProperty('--delay', `${i * 90}ms`));
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));
}

// Contadores.
const counters = document.querySelectorAll('[data-count]');
const runCounter = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  if (reducedMotion) return (el.textContent = target + suffix);
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / 1400, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterIo = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    runCounter(entry.target);
    counterIo.unobserve(entry.target);
  }
});
counters.forEach((el) => counterIo.observe(el));

// Brillo que sigue al cursor e inclinación 3D en tarjetas.
if (finePointer && !reducedMotion) {
  document.querySelectorAll('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    const max = Number(card.dataset.tilt) || 6;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
    });
    card.addEventListener('pointerleave', () => (card.style.transform = ''));
  });
}

// Año del pie de página.
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

// Z en 3D: después del primer pintado y solo si hay WebGL.
const canvas = document.querySelector('[data-hero-canvas]');
if (canvas) {
  const hasWebGL = (() => {
    try {
      return !!document.createElement('canvas').getContext('webgl2');
    } catch {
      return false;
    }
  })();
  if (hasWebGL) {
    const load = () =>
      import('./hero3d.js').then(({ mountHero3D }) => {
        if (mountHero3D(canvas, { reducedMotion })) {
          requestAnimationFrame(() => canvas.closest('[data-hero-visual]')?.classList.add('is-3d'));
        }
      });
    if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 1200 });
    else setTimeout(load, 300);
  }
}
