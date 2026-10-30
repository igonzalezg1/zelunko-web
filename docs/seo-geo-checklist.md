# Checklist SEO + GEO/AEO — zelunko.com, Inkify y RentaFácil

**Fecha de consulta de fuentes:** 29 de octubre de 2026. Alcance: `zelunko.com`, `inkify.zelunko.com`, `rentafacil.zelunko.com`.
GEO/AEO = optimización para que buscadores y asistentes de IA (Google AI Overviews/AI Mode, ChatGPT, Perplexity, Gemini, Claude) encuentren, entiendan y **citen** las páginas.

Principio rector (Google): AI Overviews y AI Mode usan la misma elegibilidad que la búsqueda normal; **no hay requisitos técnicos adicionales ni archivos especiales para IA**. La página debe estar indexada y ser elegible para mostrar fragmento ([Google, AI features](https://developers.google.com/search/docs/appearance/ai-features)). Por eso el orden es: primero SEO técnico, luego contenido citable, luego extras (llms.txt).

Leyenda: **[Z]** zelunko.com · **[I]** Inkify · **[R]** RentaFácil · **[T]** todos.

---

## 1. Rastreo e indexación (bloqueante)

- [ ] **[T] Contenido público renderizado en el servidor.** Inkify (Angular) y RentaFácil deben servir HTML con el texto ya presente (SSR/prerender) en landing, perfiles de artista, diseños, páginas por ciudad y fichas de propiedad. Los bots de IA de búsqueda en general no ejecutan JavaScript de forma fiable; comprobar con `curl -A "OAI-SearchBot" <url>` que el texto aparece.
- [ ] **[T] Un `robots.txt` por subdominio** (cada subdominio necesita el suyo; Anthropic lo indica explícitamente para ClaudeBot) ([Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-the-web)).
- [ ] **[T] Bloquear zonas privadas:** `/admin`, `/consola`, `/tenant`, `/landlord`, `/api`, paneles de artista, checkout, mensajería. Además `noindex` en esas vistas (robots.txt no impide indexar URLs enlazadas).
- [ ] **[T] `sitemap.xml` por subdominio**, con `lastmod` real, declarado en robots.txt y enviado en Google Search Console y Bing Webmaster Tools (Bing alimenta a varios asistentes; verificar alcance actual).
- [ ] **[T] Canonical** absoluto en cada página; un solo host (https, sin `www` o con `www`, pero uno). Paginación y filtros del catálogo con canonical a la versión limpia.
- [ ] **[T] Códigos correctos:** 404 real para perfiles o propiedades dados de baja (no 200 con "no encontrado"); 301 al mover URLs (p. ej. `/consola` → `/admin` ya existe).
- [ ] **[T] Caddy/CDN/WAF no debe retar a los bots verificados** (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot). Perplexity pide permitir por User-Agent **y** rango de IP publicado, y advierte que modos tipo Bot Fight pueden bloquearlo ([Perplexity](https://docs.perplexity.ai/guides/bots)).
- [ ] **[T] `hreflang`/`lang`:** `<html lang="es-MX">` en todas las páginas.

### Plantilla de robots.txt (decisión: permitir búsqueda, decidir aparte entrenamiento)

```txt
# Buscadores y asistentes (búsqueda / citas)
User-agent: Googlebot
User-agent: Bingbot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Claude-SearchBot
User-agent: Claude-User
Allow: /
Disallow: /admin
Disallow: /consola
Disallow: /api
Disallow: /tenant
Disallow: /landlord

# Entrenamiento de modelos: decisión de negocio (Allow = más presencia de marca en respuestas futuras)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
Allow: /
Disallow: /admin
Disallow: /consola
Disallow: /api
Disallow: /tenant
Disallow: /landlord

User-agent: *
Disallow: /admin
Disallow: /consola
Disallow: /api
Disallow: /tenant
Disallow: /landlord

Sitemap: https://<subdominio>.zelunko.com/sitemap.xml
```

Notas verificadas:
- **OpenAI:** `OAI-SearchBot` determina la aparición en ChatGPT search; `GPTBot` es entrenamiento; `ChatGPT-User` son visitas iniciadas por usuarios y puede no seguir robots.txt. Los cambios tardan ~24 h ([OpenAI bots](https://developers.openai.com/api/docs/bots)).
- **Anthropic:** `ClaudeBot` (entrenamiento), `Claude-SearchBot` (índice de búsqueda), `Claude-User` (consultas de usuarios); respeta robots.txt y `Crawl-delay` ([Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-the-web)).
- **Perplexity:** `PerplexityBot` (resultados, no entrenamiento), `Perplexity-User` (acciones de usuario, generalmente ignora robots.txt) ([Perplexity](https://docs.perplexity.ai/guides/bots)).
- **Google:** `Google-Extended` controla entrenamiento y grounding en otros sistemas de Google, **no** la aparición en AI Overviews, que depende de Googlebot ([Google](https://developers.google.com/search/docs/appearance/ai-features)).
- Ajuste para RentaFácil: si se teme que se rastreen datos de inquilinos, la protección es que **no sean públicos** (autenticación), no robots.txt.

---

## 2. Rendimiento y experiencia

- [ ] **[T] Core Web Vitals** en verde en móvil (LCP < 2.5 s, INP < 200 ms, CLS < 0.1). Imágenes de diseños y propiedades en AVIF/WebP, `srcset`, `loading="lazy"` salvo la portada, dimensiones explícitas.
- [ ] **[Z] Animaciones** (scroll reveal, inclinación 3D) sin bloquear el contenido: el texto debe estar en el HTML y visible sin JS; respetar `prefers-reduced-motion` (ya está en la guía de identidad).
- [ ] **[T] Móvil primero**, sin scroll horizontal, objetivos táctiles ≥ 44 px.
- [ ] **[T] HTTPS, HSTS**, sin contenido mixto.

---

## 3. Datos estructurados (JSON-LD)

Regla de Google: el marcado debe coincidir con el texto visible; no hay marcado especial para IA ([Google](https://developers.google.com/search/docs/appearance/ai-features)).

- [ ] **[Z] `Organization`** en la portada: `name: Zelunko`, `url`, `logo`, `sameAs` (redes, LinkedIn, App Store), `address` (MX), `founder`, `contactPoint`. Relacionar productos con `brand`/`subOrganization` o `owns`.
- [ ] **[Z] `WebSite`** con `name` y `publisher` → Zelunko.
- [ ] **[I][R] `SoftwareApplication`/`MobileApplication`** en cada landing: `applicationCategory` (BusinessApplication), `operatingSystem` (iOS, Android, Web), `offers` con precio en MXN de cada plan (`priceCurrency: "MXN"`), `publisher` → Zelunko. Precios idénticos a los visibles.
- [ ] **[I] Perfil de artista/estudio:** `TattooParlor` (existe en schema.org: LocalBusiness > HealthAndBeautyBusiness > TattooParlor) ([schema.org](https://schema.org/TattooParlor)) o `Person` para artista independiente; `address`, `geo`, `openingHoursSpecification`, `image`, `priceRange`, `aggregateRating` **solo** con reseñas reales recogidas en Inkify y visibles en la página.
- [ ] **[I] Diseño de tatuaje:** `ImageObject`/`CreativeWork` con `creator` (artista), `name`, `keywords` (estilo), `license` si aplica.
- [ ] **[R] Ficha de propiedad:** `RealEstateListing` con `about` → `Apartment`/`House`/`SingleFamilyResidence`, `numberOfRooms`, `floorSize`, `address` (sin número exterior si el propietario no lo quiere público), `offers` con `price`/`priceCurrency: MXN` y `businessFunction` de renta.
- [ ] **[T] `BreadcrumbList`** en páginas profundas (ciudad > estilo > artista; ciudad > colonia > propiedad).
- [ ] **[T] `Article`/`BlogPosting`** en guías con `author` (`Person` con página propia), `datePublished`, `dateModified`.
- [ ] **[T] No depender de FAQ rich results:** Google dejó de mostrarlos el 7 de mayo de 2026 y retiró la documentación en junio de 2026 ([Google FAQPage](https://developers.google.com/search/docs/appearance/structured-data/faqpage)). Mantener secciones de preguntas frecuentes en HTML porque los asistentes las citan; el `FAQPage` JSON-LD es opcional.
- [ ] **[T] Validar** con Rich Results Test y el validador de schema.org en cada despliegue.

---

## 4. Contenido citable (núcleo de GEO/AEO)

Los asistentes citan fragmentos que responden una pregunta de forma completa, con datos y fuente. Aplicar en cada página pública:

- [ ] **[T] Respuesta primero:** el primer párrafo bajo cada H2 contesta la pregunta en 1–3 frases autocontenidas (sin "como dijimos arriba").
- [ ] **[T] Encabezados con forma de pregunta real** ("¿Cuánto cuesta Inkify?", "¿Cómo funciona el certificado de historial de renta?").
- [ ] **[T] Cifras concretas con fecha y fuente** (precios, comisiones, número de artistas o propiedades). Nada de cifras infladas: si se cita una métrica, que sea verificable.
- [ ] **[T] Tablas HTML reales** (no imágenes) para planes y comparativas.
- [ ] **[I][R] Página de precios pública e indexable** con todos los planes, qué incluye cada uno, comisión por método de pago y quién la paga. Es la página más consultada por asistentes en búsquedas comerciales.
- [ ] **[I][R] Páginas "vs." honestas** (Inkify vs. Booksy / AgendaPro / Fresha; RentaFácil vs. Mi Renta App / iRent) con tabla, fecha y enlaces a las fuentes del competidor.
- [ ] **[I] Datos propios publicables:** "precio promedio de un tatuaje pequeño por ciudad", "estilos más reservados" — agregados y anónimos, actualizados trimestralmente. Los datos originales son lo que más se cita.
- [ ] **[I] Páginas por ciudad y estilo** generadas desde datos reales (mínimo N artistas activos para publicar; si no, `noindex`). Evitar páginas vacías.
- [ ] **[I] Guías de cliente:** cuidados de tatuaje y perforación, cómo elegir artista, qué es la tarjeta sanitaria y qué exige COFEPRIS (con enlace a fuente oficial).
- [ ] **[R] Página del certificado:** qué es, cómo se verifica (URL/QR), ejemplo de certificado ficticio claramente marcado como ejemplo, qué datos contiene y cuáles no, quién puede verlo.
- [ ] **[R] Guías regulatorias** con fuente oficial y fecha: tope de incremento de renta en CDMX, Registro Digital de Contratos de Arrendamiento, póliza jurídica vs. aval vs. historial. Revisar cada 3 meses (`dateModified`).
- [ ] **[R] Herramientas gratuitas** con página propia: generador de recibo de renta, calculadora de incremento por inflación. Captan búsquedas informativas y enlaces.
- [ ] **[Z] Página "Qué es Zelunko"** con una definición de una frase que un asistente pueda citar literalmente: "Zelunko es un estudio de producto digital mexicano que crea y opera Inkify y RentaFácil."
- [ ] **[T] Consistencia de entidad:** mismo nombre, descripción y precios en el sitio, App Store/Google Play, redes y directorios. Las contradicciones hacen que los asistentes omitan o mezclen datos.

---

## 5. E-E-A-T (experiencia, pericia, autoridad, confianza)

- [ ] **[Z] Página "Nosotros"** con personas reales (nombre, rol, foto, LinkedIn), misión, principios y forma de trabajar (modelo Doist/37signals).
- [ ] **[Z][I][R] Razón social, RFC o domicilio fiscal y contacto** visibles en el pie (patrón Kavak); sello "Un producto de Zelunko" enlazado.
- [ ] **[T] Autoría en guías:** firma de una persona con experiencia (un tatuador para cuidados; un abogado o especialista inmobiliario para temas de arrendamiento) y fecha de revisión.
- [ ] **[I][R] Aviso de privacidad (LFPDPPP), términos y política de reembolsos/cancelación** enlazados desde cada página.
- [ ] **[R] Transparencia financiera:** quién procesa los pagos (Conekta), cuándo se deposita al propietario, qué pasa si un pago falla. Es un tema YMYL (dinero): la confianza es determinante.
- [ ] **[I] Reseñas verificadas** (solo de clientes con cita cumplida) y política pública de moderación.
- [ ] **[T] Menciones externas:** prensa especializada, convenciones de tatuaje, asociaciones inmobiliarias, directorios (GetApp/Capterra MX), App Store. Los asistentes se apoyan en fuentes de terceros sobre la marca.

---

## 6. llms.txt y versiones Markdown (complemento, no sustituto)

Google afirma que no necesita archivos específicos para IA ([Google](https://developers.google.com/search/docs/appearance/ai-features)); llms.txt es una propuesta comunitaria útil para agentes y herramientas que la lean. Costo bajo, implementarlo.

- [ ] **[T] `/llms.txt` en la raíz de cada subdominio**, en Markdown: H1 con el nombre (único obligatorio), cita (`>`) con resumen, párrafos sin encabezados, secciones H2 con listas de enlaces `[nombre](url): nota`, y una sección `## Optional` para lo secundario ([llmstxt.org](https://llmstxt.org/)).
- [ ] **[T] Versiones `.md`** de páginas clave (precios, cómo funciona, certificado, guías) en la misma URL con `.md` o `index.md`, y anunciarlas con `<link rel="alternate" type="text/markdown" href="...">`; enlazar el llms.txt con `rel="describedby"` ([llmstxt.org](https://llmstxt.org/)).
- [ ] **[T] Mantenerlo sincronizado** con precios reales (generar en el build, no a mano).

Ejemplo para `rentafacil.zelunko.com/llms.txt`:

```md
# RentaFácil

> Plataforma mexicana para cobrar rentas residenciales con tarjeta o SPEI y generar un certificado verificable de historial de renta. Un producto de Zelunko.

El propietario publica su propiedad y vincula al inquilino con un código. El inquilino paga sin comisión. Plan Básico gratis para 1 propiedad.

## Producto
- [Cómo funciona](https://rentafacil.zelunko.com/como-funciona.md): flujo propietario e inquilino
- [Precios](https://rentafacil.zelunko.com/precios.md): Básico, Pro e Inmobiliaria, comisiones por método de pago
- [Certificado de historial de renta](https://rentafacil.zelunko.com/certificado.md): qué es y cómo se verifica

## Guías
- [Tope de aumento de renta en CDMX](https://rentafacil.zelunko.com/guias/tope-renta-cdmx.md)

## Optional
- [Zelunko](https://zelunko.com/llms.txt)
```

---

## 7. SEO local (Inkify, sobre todo)

- [ ] **[I] Incentivar a cada estudio a tener Perfil de Empresa de Google** y enlazar su perfil de Inkify como sitio de reservas (NAP idéntico).
- [ ] **[I] URL limpias y estables:** `/tatuadores/cdmx/roma-norte`, `/tatuadores/guadalajara/fine-line`, `/artista/<slug>`.
- [ ] **[I] Mapa con lista HTML** de resultados debajo (el mapa solo en JS no se indexa).
- [ ] **[R] Catálogo por ciudad/colonia** solo donde haya inventario suficiente; si no, `noindex`.

---

## 8. Medición

- [ ] **[T] Google Search Console** por subdominio (propiedad de dominio `zelunko.com` cubre todos). Las apariciones en AI Overviews/AI Mode se cuentan en el informe de Rendimiento, tipo "Web" ([Google](https://developers.google.com/search/docs/appearance/ai-features)).
- [ ] **[T] Bing Webmaster Tools** por subdominio.
- [ ] **[T] Tráfico de referencia de IA:** segmentar en analítica `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, `copilot.microsoft.com` y parámetros `utm_source=chatgpt.com`.
- [ ] **[T] Logs de Caddy:** contar visitas de OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot por subdominio (confirma rastreo real).
- [ ] **[T] Panel de prompts mensual:** preguntar a ChatGPT, Perplexity, Gemini y Claude 10–15 consultas objetivo ("mejor app para tatuadores en México", "cómo cobrar la renta en línea en México", "cómo demostrar historial de renta sin buró") y registrar si se menciona y cita la marca.

---

## 9. Orden de ejecución sugerido

1. SSR/prerender + robots.txt + sitemaps + Search Console (semana 1–2).
2. Páginas de precios y "cómo funciona" indexables con JSON-LD `SoftwareApplication` y `Organization` (semana 2–3).
3. Página del certificado [R] y perfiles de artista con `TattooParlor`/`Person` [I] (semana 3–4).
4. llms.txt + versiones .md generadas en build (semana 4).
5. Páginas por ciudad/estilo [I], guías regulatorias [R], comparativas (mes 2–3).
6. Datos propios trimestrales y panel de prompts (continuo).
