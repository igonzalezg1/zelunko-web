# Benchmark competitivo — Zelunko, Inkify y RentaFácil

**Fecha de consulta de todas las fuentes:** 29 de octubre de 2026.
**Método:** páginas oficiales de precios y producto (fuente primaria) cuando fue posible; cuando un sitio bloqueó la consulta (403/404) o no publica precios, se indica explícitamente y se usa la mejor fuente secundaria marcada como tal. Las cifras sin verificar se señalan con **(sin verificar)**. Precios en MXN salvo indicación; los precios en USD no se convierten para no introducir un tipo de cambio inventado.

---

## 1. Resumen ejecutivo

1. **Inkify entra con precio competitivo en un mercado sin especialista local.** En México la agenda para tatuadores la ocupan herramientas genéricas de belleza/servicios: Booksy (desde $499/mes), AgendaPro (Individual $299/mes + IVA), Fresha (Independiente $239.95/mes). Ninguna combina vitrina de diseños + reseñas + mapa por cercanía + tarjeta sanitaria pensada para tatuaje y perforación. Tattoodo es el único vertical global fuerte, pero es un marketplace en inglés con suscripción en USD (Artist Pro USD 29.99, sin verificar en sitio oficial) y sin pagos locales. **Hueco claro: "el Booksy de los tatuadores mexicanos", con pagos en pesos (Conekta) y cero comisión por cliente nuevo.**
2. **El mayor riesgo de Inkify no es el precio, es el lado de la demanda.** Booksy y Fresha cobran 30 % y 20 % por cliente nuevo de marketplace porque su marketplace trae clientes; Inkify debe demostrar tráfico propio (SEO local "tatuadores en [ciudad]") para justificar $299–$549/mes frente a "Instagram + WhatsApp gratis".
3. **RentaFácil compite en dos frentes distintos:** (a) portales de anuncios (Inmuebles24/Vivanuncios, ambos de QuintoAndar; Lamudi; Propiedades.com), donde su catálogo público es secundario; y (b) un nicho naciente de apps de cobro de renta en México (Mi Renta App, iRent, Rentora, PagaRenta, RentioPro), que es su competencia real. **Su diferenciador único verificado es el certificado verificable de historial de renta**: en México el pago de renta todavía no alimenta a los burós; Círculo de Crédito apenas impulsa una propuesta para incorporarlo.
4. **Alerta de margen en RentaFácil (crítica).** La tarifa oficial estándar de Conekta es **3.4 % + $3.00 MXN + IVA por tarjeta** y **$12.50 MXN + IVA por SPEI** (conekta.com/pricing). El costo efectivo con IVA ronda **3.96–4.02 %** de la renta. Con eso, **Pro (3.9 %) queda en punto de equilibrio o pierde, e Inmobiliaria (3.5 %) pierde ~0.45 puntos por cada pago con tarjeta**; el SPEI "sin comisión" cuesta ~$14.50 por pago a Zelunko. Los valores por defecto del código (2.9 % + $2.50) provienen de terceros y están desactualizados. Hay que renegociar con Conekta o reajustar las tasas antes de escalar.
5. **Precio de RentaFácil vs. apps locales:** Mi Renta App cobra $499/mes (10 propiedades) + 2.9 % + $3 con tarjeta, SPEI gratis; iRent $390/año (2 propiedades) sin comisión sobre renta (solo registra pagos, no los procesa); Rentora tiene plan gratis (3 propiedades) y Pro $149/mes (sin verificar en sitio oficial). El Básico gratis de RentaFácil es competitivo; **Pro a $249 con solo 5 propiedades queda caro frente a Rentora y corto frente a Mi Renta**.
6. **Regulación favorable al diferenciador:** la CDMX creó un Registro Digital de Contratos de Arrendamiento (art. 2448 F del Código Civil; validado por la SCJN en febrero de 2026, según prensa) y tiene en curso un tope a incrementos atado a la inflación. Recibos, contratos y comprobantes ordenados son ahora un dolor regulatorio, no solo de comodidad.
7. **Zelunko como marca madre:** los referentes (37signals, Bending Spoons, Doist/Todoist) presentan el portafolio con pocas palabras, cifras concretas y una tesis clara de cómo operan. Clip y Kavak muestran el patrón mexicano: titular de beneficio + precio/comisión explícita + cifras de confianza + "Hecho en México".
8. **GEO/AEO 2026:** Google afirma que AI Overviews/AI Mode no requieren archivos ni marcado especiales (sí indexación y fragmentos); OpenAI, Anthropic y Perplexity separan bots de entrenamiento de bots de búsqueda, así que se puede **permitir búsqueda y decidir aparte sobre entrenamiento**. Los resultados enriquecidos de FAQ dejaron de mostrarse en Google en mayo de 2026: el contenido de preguntas frecuentes sigue siendo útil para LLM, pero no por el rich result.

---

## 2. Inkify — competidores

### 2.1 Tabla comparativa

| Competidor | Precio (fuente) | Modelo | Funciones clave | Fortalezas | Huecos frente a Inkify |
|---|---|---|---|---|---|
| **Inkify** | Esencial $299/mes o $2,990/año (15 diseños); Pro $549/mes o $5,490/año (ilimitados, insignia, prioridad en Destacados) | Suscripción del artista; pagos Conekta | Vitrina de diseños, reseñas, mapa por cercanía, reservas, mensajería, recordatorios, tarjeta sanitaria, app iOS/Android, consola admin | Vertical tatuaje/perforación; pesos y Conekta; sin comisión por cliente nuevo | Marca y tráfico nuevos; sin efecto red aún |
| **Booksy** | Desde $499 MXN/mes + impuestos; $100/mes por miembro extra; 14 días de prueba; 100 SMS de marketing/mes ([biz.booksy.com/es-mx/pricing](https://biz.booksy.com/es-mx/pricing)) | Suscripción + marketplace; **Boost**: comisión única de 30 % sobre la primera visita de cliente nuevo (mín. US$10, máx. US$100 en EE. UU.) ([support.booksy.com](https://support.booksy.com/hc/en-us/articles/16486248108946-How-does-Boost-pricing-work)) | Agenda ilimitada, recordatorios, reservas con Google, formularios, reportes, cobro | Marca global, marketplace con demanda, app de cliente pulida | Orientado a barbería/belleza; no hay vitrina de diseños ni tarjeta sanitaria; disponibilidad de Boost en MX **sin verificar**; tarifas de procesamiento no publicadas |
| **Fresha** | Independiente MXN 239.95/mes (1 miembro); Equipo MXN 159.95 por miembro/mes; Empresa a medida. SMS transaccional MXN 4.40, WhatsApp MXN 1.40–3 ([fresha.com/es/pricing](https://www.fresha.com/es/pricing)) | Suscripción + tarifa por cliente nuevo de marketplace (20 % de la primera reserva según terceros; el monto en MX **sin verificar**) ([centro de ayuda](https://www.fresha.com/help-center/knowledge-base/billing-and-fees/101357-marketplace-new-client-fees)) | Agenda, marketplace, pagos como complemento, marketing | Precio de entrada bajo; marketplace grande; tiene listados de estudios de tatuaje en CDMX | Cobros por mensaje y por cliente nuevo encarecen; generalista de belleza |
| **AgendaPro** | Individual $299/mes + IVA (1 profesional); Básico $550; Premium $1,500; Pro $4,500 (2–20 prof.); anual "2 meses gratis"; Terminal de Pagos $250/mes + 2.29 % + IVA; WhatsApp desde $100/mes por 50 mensajes ([agendapro.com/mx/planes](https://agendapro.com/mx/planes)) | Suscripción SaaS + complementos | Agenda online, sitio de citas, recordatorios, pago en línea, fichas, inventario, comisiones, email marketing | Líder LATAM; página SEO "software para tatuadores #1 en México" ([agendapro.com/mx/tatuajes](https://agendapro.com/mx/tatuajes/software-para-tatuadores)); soporte en español | Sin marketplace de diseños ni descubrimiento por mapa; WhatsApp y pagos se cobran aparte |
| **Tattoodo** | Artist Pro USD 29.99 y Studio Pro USD 79.99 como compras dentro de la app (App Store; **sin verificar en sitio oficial**) ([apps.apple.com](https://apps.apple.com/app/apple-store/id1057590314)); página "Pro" oficial devolvió 404 | Marketplace + suscripción + tarifa por reserva (según Dealroom, terceros) | Feed de tatuajes, portafolio, solicitud de cita vía asistentes, depósito en plataforma ([ayuda Tattoodo](https://tattoodo-clients.helpscoutdocs.com/article/363-howdoesthetattoodobookingprocesswork)) | Comunidad e inspiración global; vertical tatuaje | En inglés, USD, sin pagos locales ni enfoque México; no gestiona perforación ni tarjeta sanitaria |
| **Square Appointments** | Free / Plus / Premium / Square Pro (custom); montos no visibles en la página oficial; terceros citan Plus US$29 y Premium US$69 (**sin verificar**) ([squareup.com](https://squareup.com/us/en/appointments/pricing)) | Freemium + procesamiento | Reservas, recordatorios, políticas de no-show, lista de espera | Integración con POS | **No disponible para cobrar en México** según comunidad de Square y comparadores (sin página oficial vigente que lo confirme) |
| **Setmore** | Free US$0 (hasta 4 usuarios); Pro US$5/usuario/mes anual (la página muestra cifras contradictorias: $12 y $5) ([setmore.com/pricing](https://www.setmore.com/pricing)) | Freemium | Página de reservas, apps, depósitos (Pro), Square/Stripe/PayPal | Gratis real para empezar | Pagos con pasarelas no locales; genérico; sin vitrina |
| **Vagaro** | US$30/mes (o US$23.99 promo 6 meses), +US$10 por calendario hasta 7 ([vagaro.com/pro/pricing](https://www.vagaro.com/pro/pricing)) | Suscripción + marketplace | Agenda, POS, app de marca, nómina | Suite completa para salones | Página solo con precios de EE. UU.; disponibilidad en México **sin verificar** |
| **Otros (LATAM/nicho)** | TattooGenda (ficha en GetApp MX), Inkalendar (iPad), Venue, Koalendar ([koalendar.com](https://koalendar.com/es/blog/mejores-sofware-de-reservas-para-tatuadores)) | Varios | Agenda especializada o genérica | — | No se encontró una plataforma **mexicana** vertical para tatuadores con marketplace y pagos locales |

### 2.2 Lectura

- **Precio:** Inkify Esencial ($299) empata con AgendaPro Individual y queda 40 % abajo de Booksy ($499). Fresha es más barato de entrada pero suma cargos por mensaje y por cliente nuevo. Pro a $549 es razonable si "prioridad en Destacados" trae clientes medibles.
- **Diferenciador defendible:** vitrina de diseños (flash) reservable + mapa por cercanía + tarjeta sanitaria + perforación. Nadie de la lista lo ofrece junto.
- **Riesgo:** el artista mexicano hoy agenda por Instagram y WhatsApp sin costo. El argumento de venta debe ser "menos mensajes, menos plantones, cobras el anticipo".

---

## 3. RentaFácil — competidores

### 3.1 Portales de anuncios (México)

| Competidor | Precio para el propietario | Modelo | Funciones | Fortalezas | Huecos frente a RentaFácil |
|---|---|---|---|---|---|
| **Inmuebles24** (Grupo QuintoAndar) | Sitio bloqueó la consulta (403); precio para particulares **sin verificar** | Clasificados con planes para inmobiliarias; **Inmuebles24 Full** (ex-Benvi, abril 2024) con garantía de pago de renta, solo CDMX y Edomex ([onlinemarketplaces.com](https://www.onlinemarketplaces.com/articles/quintoandar-to-change-branding-and-mission-of-benvi-in-mexico/)) | Anuncios, leads, gestión (Full) | Mayor audiencia; respaldo de QuintoAndar (compró Navent en 2021, [LexLatin](https://lexlatin.com/noticias/quintoandar-se-expande-america-latina-compra-negocio-inmobiliario-navent)) | No genera historial del inquilino; el cobro solo existe en Full y con cobertura limitada |
| **Vivanuncios** (QuintoAndar) | Publicar "no tiene costo alguno"; promociones de visibilidad de pago ([vivanuncios.com.mx](https://www.vivanuncios.com.mx/como-vender-una-casa-en-mexico/)) | Clasificados freemium | Anuncios | Gratis y con tráfico | Sin cobro ni gestión de renta |
| **Lamudi** | Condiciones para particulares **sin verificar** ([lamudi.com.mx](https://www.lamudi.com.mx/asistente-personal)) | Clasificados | Anuncios, asistente de búsqueda | Marca conocida | Sin cobro ni historial |
| **Propiedades.com** | Promete "publicar inmuebles gratis"; detalle **sin verificar** (403) ([propiedades.com/publicar](https://propiedades.com/publicar)) | Clasificados | Anuncios, contenido editorial (blog de póliza jurídica) | SEO editorial fuerte | Sin cobro ni historial |
| **Homie** | Comisiones públicas inconsistentes en prensa (25 % a éxito + 5 % mensual; u 8 % el primer año) **sin verificar**; en 2026 lanzó "Renta Continua": pago fijo al propietario hasta 5 años ([descubre.vc](https://www.descubre.vc/noticia/homie-mx-lanza-renta-continua-para-garantizar-ingresos-a-propietarios-en-m-xico-2026-04-26)) | Administración integral / inquilino institucional | Publicación, selección de inquilino, contrato, cobro, renta sin aval | Garantía de ingreso; resuelve el aval | Caro para el propietario; quita el control; no es software para quien quiere administrar solo |

### 3.2 Cobro de renta, gestión y garantías (México) — competencia directa

| Competidor | Precio | Comisiones de cobro | Funciones | Comentario |
|---|---|---|---|---|
| **RentaFácil** | Básico gratis (1 prop.); Pro $249/mes (5); Inmobiliaria $799/mes (30) | Tarjeta 4.9 / 3.9 / 3.5 % a cargo del propietario; SPEI sin comisión | Catálogo público, vinculación por código, pagos con tarjeta/SPEI, **certificado verificable de historial**, apps | Único con certificado verificable |
| **Mi Renta App** | Básico $499/mes (hasta 10 prop.); Avanzado $1,299/mes; a medida >10 ([mirenta.app](https://www.mirenta.app/)) | Tarjeta 2.9 % + $3; SPEI y efectivo sin comisión | Contratos, recordatorios email/WhatsApp, portal del inquilino, recibos, reportes, contabilidad (Avanzado) | Competidor más parecido; comisión de tarjeta menor que RentaFácil |
| **iRent** | Esencial $390/año (2 prop.); Profesional $790/año (6 prop.); Agencia a medida ([irent.haus](https://irent.haus/)) | No cobra comisión sobre la renta (registra pagos con comprobante; no procesa) | Contratos Word/PDF, aval, finanzas, publicación de anuncios, visitas; CFDI y verificación "próximamente" | Muy barato; no procesa pagos ni certifica |
| **Rentora** | Free hasta 3 prop.; Pro $149/mes (**sin verificar**: el sitio falló por TLS; dato vía buscador) ([rentora.mx](https://rentora.mx/)) | SPEI ~3.5 % Free / 2.5 % Pro (sin verificar); tarjeta/SPEI/OXXO vía Stripe Connect | Cobro automático, depósito directo | Precio agresivo; cobra el SPEI que RentaFácil regala |
| **PagaRenta** | No publica precio; cobro calculado sobre rentas recibidas ([pagarenta.com.mx](https://www.pagarenta.com.mx/propietarios/)) | Tarjeta, AMEX, SPEI, CoDi, cripto | "Score de Renta", contratos NOM-151 + blockchain, propietarios en el extranjero | Lo más cercano a un historial/score; no publica certificado verificable para el inquilino |
| **RentioPro** | 14 días de prueba; precio no consultado ([rentiopro.com](https://rentiopro.com/)) | — | Cobro + CFDI 4.0 + tablero | Fuerte en facturación |
| **Póliza jurídica** (varios despachos) | Típicamente 40 % a 100 % de una renta mensual por año ([Expansión, 2023](https://expansion.mx/finanzas-personales/2023/12/14/poliza-juridica-cobro-anual)) | — | Investigación del inquilino, contrato, juicio de desalojo | Iniciativa en CDMX (dic. 2025) para hacerla opcional ([Publimetro](https://www.publimetro.com.mx/noticias/2025/12/02/polizas-juridicas-de-arrendamiento-seran-opcionales-en-cdmx-esta-es-la-propuesta/)). Oportunidad: el historial verificable reduce la necesidad de póliza/aval |
| **Truora** | Bajo cotización ([truora.com/truchecks](https://truora.com/truchecks)) | — | Antecedentes (judiciales, INE, RENAPO), KYC | Socio potencial (Homie es cliente), no competidor |
| **Círculo de Crédito / Buró** | — | — | Hoy el pago de renta no se reporta de forma general; Círculo de Crédito impulsa una propuesta ([El Cronista](https://www.cronista.com/mexico/finanzas-economia/el-giro-que-convertira-a-la-mitad-de-la-cdmx-en-inquilinos-en-2040-y-la-nueva-regla-para-sobrevivir-al-alquiler/)) | Amenaza y oportunidad: si lo lanzan, RentaFácil debe ser "proveedor de datos", no rival |

No se encontraron ofertas públicas de "Arrendamiento Seguro", "Rentas.com", "Avalúo" o "Renta Segura" como apps de cobro con precios verificables; **no se incluyen cifras**.

### 3.3 Referentes internacionales

| Referente | Precio propietario | Cobro de renta | Reporte a burós |
|---|---|---|---|
| **TurboTenant** | Free $0; Essentials desde US$149/año; Pro desde US$199/año (1–10 unidades) ([turbotenant.com/pricing](https://www.turbotenant.com/pricing/)) | Tarjeta 3.49 % (inquilino); ACH $0 o $2 | Sí, US$4.99/mes (inquilino) |
| **Avail** | Unlimited $0; Unlimited Plus US$9/unidad/mes ([avail.com/pricing](https://www.avail.com/pricing)) | Tarjeta 3.5 %; ACH US$2.50 (gratis en Plus) | "CreditBoost" (plan no especificado) |
| **Baselane** | Core $0; Smart US$20/mes anual ([baselane.com/pricing](https://www.baselane.com/pricing)) | Tarjeta 3.49 % (inquilino); ACH US$2 | Sí, US$5/mes |
| **Zillow Rental Manager** | Sitio bloqueó la consulta (403). Terceros: primer anuncio gratis, US$9.99/semana adicionales; ACH gratis; tarjeta 2.75–2.95 % (**sin verificar**) | — | Sin verificar |

**Lección:** en EE. UU. el software es gratis o barato y **el inquilino paga la comisión de tarjeta (≈3.5 %)**; el reporte a burós es un complemento de pago (~US$5/mes) que el inquilino compra porque construye crédito. RentaFácil hace lo contrario (paga el propietario, el inquilino nunca) — es un buen mensaje de venta al inquilino, pero presiona el margen.

### 3.4 Economía unitaria con tarifa oficial de Conekta

Tarifa estándar publicada: tarjeta **3.4 % + $3.00 + IVA**; SPEI **$12.50 + IVA** ([conekta.com/pricing](https://conekta.com/pricing)).

| Renta | Costo Conekta con IVA | % efectivo | Margen Básico 4.9 % | Margen Pro 3.9 % | Margen Inmobiliaria 3.5 % |
|---|---|---|---|---|---|
| $5,000 | $200.68 | 4.01 % | +$44 | −$6 | −$26 |
| $10,000 | $397.88 | 3.98 % | +$92 | −$8 | −$48 |
| $20,000 | $792.28 | 3.96 % | +$188 | −$12 | −$92 |

SPEI absorbido: $14.50 por pago (sin IVA acreditable considerado). Si las comisiones se cobran como ingreso de Zelunko, también causan IVA; validar con contador. Recordatorio pendiente en memoria del proyecto: revisión legal de cobro de rentas de terceros (Ley Fintech).

---

## 4. Referentes de estudio/holding (imagen institucional)

| Referente | Cómo presenta el portafolio | Qué tomar para Zelunko |
|---|---|---|
| **37signals** ([37signals.com](https://37signals.com/)) | Productos como lista de nombres (Basecamp, HEY, Fizzy, ONCE); el cuerpo es un índice numerado de principios ("Meetings aren't free") | Una tesis propia y breve; principios publicados como contenido citable |
| **Bending Spoons** ([bendingspoons.com](https://bendingspoons.com/)) | "We acquire and improve iconic products."; métricas grandes (1 000 M+ usuarios registrados, 7 M+ clientes de pago); tarjeta por producto con fecha y mejoras | Tarjeta por producto con 2–3 cifras reales y enlace; métricas solo cuando sean verdaderas |
| **Doist / Todoist** ([todoist.com/about-us](https://www.todoist.com/about-us)) | Misión ("simple yet powerful productivity tools"), valores, equipo remoto con cifras | Página "Nosotros" con misión, valores y forma de trabajar (E-E-A-T) |
| **Clip** ([clip.mx](https://www.clip.mx/)) | "Todo lo que necesitas para potenciar tu negocio"; comisión explícita "2.99 % + $1 por venta"; pilares Cobra/Gestiona/Crece | Transparencia de precio en la portada; tres verbos |
| **Kavak** ([kavak.com/mx](https://www.kavak.com/mx)) | "Transforma tu camino"; "más de 300,000 clientes", 7 días de prueba; sello "Hecho en México"; razón social visible | Cifras de confianza, sello "Hecho en México" y razón social en el pie |

---

## 5. Propuesta de valor diferenciada

**Zelunko.** Estudio mexicano que construye y opera software vertical para oficios y mercados que el software genérico atiende mal. Un equipo, una plataforma de pagos en pesos, productos con nombre propio. *Promesa: "Software que hace fácil lo importante."*

**Inkify.** La única agenda + vitrina hecha para tatuaje y perforación en México: tus diseños se reservan solos, el cliente te encuentra por cercanía, cobras el anticipo en pesos y llevas la tarjeta sanitaria en regla. Sin comisión por cliente nuevo (vs. 20–30 % en Fresha/Booksy).

**RentaFácil.** Cobra la renta con tarjeta o SPEI y convierte cada pago puntual en un **certificado verificable de historial de renta** que el inquilino puede mostrar a su siguiente arrendador. El inquilino nunca paga comisión. Para el propietario: menos cobranza; para el inquilino: reputación portátil que hoy ningún buró registra.

### Frases de posicionamiento para landing

- **Zelunko:** "Hacemos en México el software que tu oficio merecía: simple, en pesos y hecho para durar."
- **Inkify:** "Tu agenda y tu portafolio de tatuajes en un solo lugar: los clientes te encuentran, reservan y dejan anticipo, sin pagar comisión por cliente nuevo."
- **RentaFácil:** "Cobra tu renta sin perseguir a nadie y dale a tu inquilino un historial de pagos verificable que vale para su próxima casa."

---

## 6. Mensajes clave y palabras clave SEO (español de México)

Los volúmenes de búsqueda **no se verificaron** (no se usó una herramienta de palabras clave); la priorización es cualitativa por intención. Validar con Google Search Console y Keyword Planner.

### 6.1 Inkify

Mensajes: "Reserva tu tatuaje con el artista correcto, cerca de ti" (cliente) · "Menos DMs, más sesiones" · "Cobra el anticipo y olvídate de los plantones" · "Tu flash disponible, reservable en un clic" · "Tarjeta sanitaria al día, confianza para tu cliente".

| Palabra clave | Intención | Página destino |
|---|---|---|
| tatuadores cerca de mí / tatuadores en [CDMX, Guadalajara, Monterrey…] | Local / transaccional (cliente) | Páginas por ciudad con mapa y perfiles |
| estudio de tatuajes en [colonia/ciudad] | Local | Página por ciudad/colonia |
| perforaciones cerca de mí / piercing en [ciudad] | Local | Página por ciudad (perforación) |
| cuánto cuesta un tatuaje en México / precio tatuaje pequeño | Informativa → comercial | Guía de precios con datos de la plataforma |
| diseños de tatuajes [estilo: fine line, tradicional, blackwork, realismo] | Inspiración / descubrimiento | Galerías por estilo |
| agenda para tatuadores / app para tatuadores | Comercial (artista) | Landing de artista |
| software para estudio de tatuajes | Comercial B2B | Landing de estudio + comparativa |
| alternativa a Booksy para tatuadores / Booksy vs AgendaPro tatuajes | Comparativa | Página "Inkify vs." honesta |
| cómo cobrar anticipo de tatuaje / depósito tatuaje | Informativa (artista) | Blog + CTA |
| cuidados de un tatuaje nuevo / cuidados de una perforación | Informativa (cliente) | Guía citable con autor (artista) |
| requisitos COFEPRIS estudio de tatuajes / tarjeta sanitaria tatuador | Informativa regulatoria | Guía con fuentes oficiales |

### 6.2 RentaFácil

Mensajes: "Tu renta, cobrada a tiempo" · "Paga con tarjeta o SPEI, sin comisión para el inquilino" · "Cada pago puntual cuenta: certificado verificable de historial de renta" · "Renta sin aval demostrando tu historial" · "Empieza gratis con tu primera propiedad".

| Palabra clave | Intención | Página destino |
|---|---|---|
| app para cobrar renta / cómo cobrar la renta en línea | Comercial (propietario) | Landing propietario |
| administrar mis rentas / software para administrar rentas | Comercial | Landing + planes |
| pagar renta con tarjeta de crédito | Transaccional (inquilino) | Landing inquilino |
| pagar renta por SPEI / transferencia | Transaccional | Landing inquilino |
| historial de renta / constancia de pago de renta / carta de buen inquilino | Informativa → producto | Página del certificado (con ejemplo verificable) |
| rentar sin aval / rentar sin póliza jurídica | Informativa | Guía + certificado como alternativa |
| cuánto cuesta una póliza jurídica | Informativa | Guía comparativa (cifras con fuente) |
| recibo de renta formato / recibo de arrendamiento | Informativa / herramienta | Generador gratuito de recibos (captación) |
| tope aumento renta CDMX 2026 / registro de contratos de arrendamiento CDMX | Informativa regulatoria | Guía actualizada con fuentes oficiales |
| departamentos en renta en [ciudad/colonia] | Transaccional (catálogo) | Catálogo público por ciudad (cola larga; competir con portales es difícil) |
| alternativa a Mi Renta App / Inmuebles24 vs RentaFácil | Comparativa | Página "vs." |

### 6.3 Zelunko

| Palabra clave | Intención |
|---|---|
| Zelunko (marca) | Navegacional |
| estudio de producto digital México / empresa de software SaaS mexicana | Institucional, prensa, talento |
| software vertical hecho en México | Institucional |

---

## 7. FODA breve

### Inkify
- **Fortalezas:** vertical único (tatuaje + perforación); vitrina de diseños reservables; mapa por cercanía; Conekta en pesos; sin comisión por cliente nuevo; apps nativas y mensajería.
- **Debilidades:** marketplace sin demanda inicial; marca nueva; el valor de "Destacados" depende del tráfico; sin plan gratis para probar sin compromiso.
- **Oportunidades:** ningún competidor mexicano vertical encontrado; SEO local por ciudad y estilo; contenido regulatorio (COFEPRIS, cuidados) citable por buscadores de IA; convenciones de tatuaje.
- **Amenazas:** Instagram/WhatsApp gratis; AgendaPro ya posiciona "software para tatuadores #1 en México"; Booksy/Fresha pueden bajar precio o agregar vitrina.

### RentaFácil
- **Fortalezas:** certificado verificable de historial (único verificado); SPEI sin costo para el inquilino; plan gratis; catálogo público; apps.
- **Debilidades:** **margen negativo en Pro e Inmobiliaria con la tarifa estándar de Conekta**; liquidaciones manuales a la CLABE; sin CFDI, contrato digital ni investigación de inquilino (que ofrecen Mi Renta, RentioPro, PagaRenta); límite de 5 propiedades en Pro.
- **Oportunidades:** renta aún fuera de los burós; registro digital de contratos y tope de incrementos en CDMX; iniciativa para que la póliza sea opcional; alianzas con Truora (identidad) o Círculo de Crédito (datos).
- **Amenazas:** Inmuebles24 Full/QuintoAndar y Homie con capital y garantía de renta; regulación fintech por custodia de fondos de terceros; Círculo de Crédito podría lanzar su propio historial.

---

## 8. Recomendaciones priorizadas

### Prioridad 1 (antes de escalar)
1. **RentaFácil — corregir economía unitaria.** Confirmar tarifa negociada con Conekta y actualizar `CONEKTA_FEE_PCT/FIXED` (hoy 2.9 %/$2.50 vs. oficial 3.4 %/$3.00). Opciones: (a) subir tasas a ~5.5 / 4.5 / 4.2 %; (b) mantener tasas y pedir a Conekta tarifa por volumen; (c) empujar SPEI como método preferido y cobrar un fijo bajo por SPEI en planes de pago. No anunciar 3.5 % hasta que el costo esté por debajo.
2. **RentaFácil — revisión legal** del cobro de rentas de terceros (Ley Fintech / agregador) y de las liquidaciones manuales; considerar un modelo de dispersión directa (split/marketplace) de Conekta.
3. **Inkify — prueba sin fricción:** 14–30 días de Pro gratis (Booksy da 14, Fresha 7) en lugar de plan gratis permanente.

### Prioridad 2 (producto y precio)
4. **RentaFácil Pro:** ampliar a 10 propiedades para igualar a Mi Renta ($499/10) y diferenciarse de Rentora ($149/3, sin verificar).
5. **Certificado de historial como producto estrella:** página pública de verificación (URL + código QR + firma), descargable en PDF, compartible; medir cuántos certificados se verifican por terceros. Explorar acuerdo de datos con Círculo de Crédito.
6. **RentaFácil — paridad mínima:** recibos con CFDI (o integración con un PAC), contrato digital (NOM-151) y verificación de identidad del inquilino (Truora).
7. **Inkify — anticipo obligatorio configurable** y política de cancelación visible: es el dolor #1 que resuelven Square/Setmore (no-show fees).
8. **Inkify Pro:** hacer medible "prioridad en Destacados" (vistas y reservas atribuidas en el panel del artista).

### Prioridad 3 (marketing)
9. **SEO local de Inkify:** páginas por ciudad y estilo generadas desde datos reales de artistas (no páginas vacías). Empezar por CDMX, Guadalajara, Monterrey, Puebla, Querétaro, Tijuana.
10. **Contenido citable:** guías con datos propios ("precio promedio de un tatuaje pequeño en CDMX según reservas en Inkify") y regulatorias (COFEPRIS, tope de rentas CDMX) con fuentes oficiales y autor identificado.
11. **Páginas comparativas honestas** ("Inkify vs. Booksy", "RentaFácil vs. Mi Renta App") con tabla y fecha.
12. **zelunko.com:** estructura tipo Bending Spoons/Clip: titular + tarjeta por producto (qué hace, para quién, precio desde, enlace) + principios (37signals) + "Hecho en México" y razón social (Kavak).

---

## 9. Fuentes (consultadas el 29/10/2026)

Inkify: [Booksy MX precios](https://biz.booksy.com/es-mx/pricing) · [Booksy Boost](https://support.booksy.com/hc/en-us/articles/16486248108946-How-does-Boost-pricing-work) · [Fresha precios](https://www.fresha.com/es/pricing) · [Fresha tarifa cliente nuevo](https://www.fresha.com/help-center/knowledge-base/billing-and-fees/101357-marketplace-new-client-fees) · [AgendaPro MX planes](https://agendapro.com/mx/planes) · [AgendaPro tatuadores](https://agendapro.com/mx/tatuajes/software-para-tatuadores) · [Tattoodo App Store](https://apps.apple.com/app/apple-store/id1057590314) · [Tattoodo ayuda](https://tattoodo-clients.helpscoutdocs.com/article/363-howdoesthetattoodobookingprocesswork) · [Square Appointments](https://squareup.com/us/en/appointments/pricing) · [Square en México (comunidad)](https://www.sellercommunity.com/t5/New-To-Square/Is-Square-available-in-Mexico-I-need-people-make-payments/m-p/177301) · [Setmore](https://www.setmore.com/pricing) · [Vagaro](https://www.vagaro.com/pro/pricing) · [Koalendar (terceros)](https://koalendar.com/es/blog/mejores-sofware-de-reservas-para-tatuadores)

RentaFácil: [Conekta pricing](https://conekta.com/pricing) · [Mi Renta App](https://www.mirenta.app/) · [iRent](https://irent.haus/) · [Rentora](https://rentora.mx/) · [PagaRenta](https://www.pagarenta.com.mx/propietarios/) · [RentioPro](https://rentiopro.com/) · [Vivanuncios](https://www.vivanuncios.com.mx/como-vender-una-casa-en-mexico/) · [Propiedades.com](https://propiedades.com/publicar) · [Inmuebles24 Full](https://www.onlinemarketplaces.com/articles/quintoandar-to-change-branding-and-mission-of-benvi-in-mexico/) · [QuintoAndar–Navent](https://lexlatin.com/noticias/quintoandar-se-expande-america-latina-compra-negocio-inmobiliario-navent) · [Homie Renta Continua](https://www.descubre.vc/noticia/homie-mx-lanza-renta-continua-para-garantizar-ingresos-a-propietarios-en-m-xico-2026-04-26) · [Póliza jurídica, Expansión](https://expansion.mx/finanzas-personales/2023/12/14/poliza-juridica-cobro-anual) · [Póliza opcional CDMX](https://www.publimetro.com.mx/noticias/2025/12/02/polizas-juridicas-de-arrendamiento-seran-opcionales-en-cdmx-esta-es-la-propuesta/) · [Tope de rentas CDMX](https://www.chilango.com/noticias/renta-en-cdmx-asi-se-frenara-el-aumento-y-obligara-a-que-no-supere-inflacion/) · [Registro de contratos, Expansión](https://politica.expansion.mx/cdmx/2024/08/22/congreso-de-cdmx-aprueba-tope-a-rentas) · [Círculo de Crédito y rentas](https://www.cronista.com/mexico/finanzas-economia/el-giro-que-convertira-a-la-mitad-de-la-cdmx-en-inquilinos-en-2040-y-la-nueva-regla-para-sobrevivir-al-alquiler/) · [Truora](https://truora.com/truchecks) · [TurboTenant](https://www.turbotenant.com/pricing/) · [Avail](https://www.avail.com/pricing) · [Baselane](https://www.baselane.com/pricing)

Institucional: [37signals](https://37signals.com/) · [Bending Spoons](https://bendingspoons.com/) · [Todoist about](https://www.todoist.com/about-us) · [Clip](https://www.clip.mx/) · [Kavak](https://www.kavak.com/mx)

**No consultables o sin precio público:** inmuebles24.com/publicar (403), propiedades.com/publicar (403), zillow.com/rental-manager/pricing (403), tattoodo.com/pro (404), rentora.mx (error TLS; dato vía buscador), Lamudi (sin página de precios para particulares encontrada).
