// Centro de ayuda: búsqueda y filtro de preguntas, verificador de certificados de RentaFácil y
// formulario de soporte que abre el correo con el mensaje armado (no hay backend en zelunko.com).
const faq = document.querySelector('[data-help-faq]');
const items = [...faq.querySelectorAll('.faq-item')];
const empty = faq.querySelector('[data-help-empty]');
const input = document.querySelector('[data-help-input]');
const tabs = [...document.querySelectorAll('[data-help-tabs] button')];
let topic = 'all';

// Sin acentos ni mayúsculas: «spei» encuentra «SPEI», «contrasena» encuentra «contraseña».
const plain = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const texts = items.map((el) => plain(el.textContent));

function apply() {
  const words = plain(input.value).split(/\s+/).filter(Boolean);
  let shown = 0;
  items.forEach((el, i) => {
    const match = (topic === 'all' || el.dataset.topic === topic) && words.every((w) => texts[i].includes(w));
    el.hidden = !match;
    if (match) shown++;
    // Con búsqueda, se abre la primera coincidencia para leerla sin otro clic.
    if (words.length) el.open = match && shown === 1;
  });
  empty.hidden = shown > 0;
}

input.addEventListener('input', apply);
document.querySelector('[data-help-search]').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('preguntas').scrollIntoView({ behavior: 'smooth' });
});
tabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    topic = tab.dataset.filter;
    tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
    tabs.forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
    apply();
  }),
);

// Si llegan con ?q=..., se busca de inmediato (sirve para enlazar desde las apps).
const q = new URLSearchParams(location.search).get('q');
if (q) {
  input.value = q;
  apply();
}

document.querySelector('[data-verify-form]').addEventListener('submit', (e) => {
  e.preventDefault();
  const code = e.currentTarget.code.value.trim().toUpperCase().replace(/\s+/g, '');
  if (code) location.href = `https://rentafacil.zelunko.com/verify/${encodeURIComponent(code)}`;
});

document.querySelector('[data-support-form]').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const subject = `[${f.product.value}] ${f.topic.value}`;
  const body = `${f.message.value.trim()}\n\n—\nEnviado desde el centro de ayuda de zelunko.com`;
  location.href = `mailto:hola@zelunko.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
