# Volumes Lab — Log completo del proyecto (handoff)

Documento de transferencia para el equipo de desarrollo. Reconstruye toda la conversación de trabajo con Kimi, en orden cronológico, incluidos los rodeos y decisiones descartadas ("ruido" incluido). Al final, el estado actual del proyecto y los pendientes.

---

## 1. Contexto inicial

- **Repo**: https://github.com/erikhsu70/madrid-health-hub
- **Objetivo inicial**: extraer el copy de todas las páginas para mejorarlo, y luego mejorar las LPs (landing pages) a nivel de contenido, secciones e imágenes, manteniendo el diseño.
- Se trabajó primero el copy de todas las páginas (home, book, product pages, faq, contact) y luego se iteró la home varias veces.

## 2. Deck creativo de referencia

- Archivo: **"Volumes Web Creative V1.1"** (pptx). Es la fuente de verdad de marca y estructura.
- Del deck salieron: tipografía **Martian Mono** para labels/wordmark/navegación, Helvetica para cuerpo, estructura de header (VOLUMES LAB + MEMBERSHIPS / ASSESSMENTS / TESTS + CART + BOOK NOW), primera sección (mención + dirección + 3 párrafos de copy + mapa + horario), sección "WHAT WE OFFER" con 3 columnas, y footer plano (BOOK NOW, MEMBERSHIPS, ASSESSMENTS, INDIVIDUAL TESTS, BLOG, FAQ, PRIVACY, TERMS, email, Instagram, LinkedIn, copyright, dirección).
- Del deck también salió el color de acento cálido **#D33620** (el rojo del pin), implementado como `--warm` en CSS.
- Nombres de producto según deck: "Human Performance Membership", "Body Recomposition Membership (GLP-1)", "Foundational", "Longevity", "Performance".

## 3. Cronología de trabajo (con ruido)

### Fase 1 — Copy y mejora de LPs
1. Se reescribió el copy de las páginas principales y se añadieron bloques de conversión (eyebrows mono, sample reports, FAQs, testimonials) siguiendo el sistema de diseño existente.
2. Regla de estilo que vino del usuario (vía Lovable): **cero em dashes (—) en el copy**. Se usan comas. En dashes y "·" sí.
3. Se quitó el último em dash del SEO meta (commit `1e75ae5`).

### Fase 2 — Homepage v2 (feedback de diseño del usuario, 7 puntos)
El usuario pasó feedback concreto:
1. Hero 50/50 con foto del lab; la dirección "desamparada" a la derecha debía moverse a una barra de contacto.
2. Faltaba sección de equipo (grid con foto, nombre, especialidad, credencial).
3. "Three ways in" parecía carta de restaurante: cada ítem necesitaba duración, qué incluye y CTA propio; la columna Tests (8 ítems) desequilibraba → colapsar en "ver todos".
4. Paleta fría (crema/gris/negro) → acento cálido.
5. Jerarquía de CTAs: 6-7 iguales + dos barras negras "Book appointment" redundantes → un primario y secundarios diferenciados.
6. FAQ en el menú pero no en home → subir 4-5 preguntas antes del cierre.
7. "What we measure" muy plano → números/iconos.

Se implementó todo (commit `1b53527` / push `e705701`):
- Hero 50/50 con foto del lab **generada por IA (placeholder)** hasta tener fotos reales.
- Barra de contacto bajo el hero.
- Sección equipo con datos reales de dos CVs que pasó el usuario:
  - **Dr. Rodrigo Ortega**, Medical Director: cardiólogo deportivo (QuirónSalud Madrid + Olympia), PhD cum laude, investigador CNIC, Premio Nacional Fin de Carrera 2023. **Sin foto** (su CV no tenía) → monograma "RO" de placeholder.
  - **Mauricio Serrano Richards**, Head Performance Coach: MSc Sports Physiotherapy & Reconditioning, ex-Club Puebla (Liga MX), internship Atlético de Madrid. Foto recortada de su CV (`team-mauricio.jpg`, grayscale).
- Offer cards con tagline, duración · precio y "Book →"; tests colapsados con "View all 8 tests".
- Acento `#D33620` en labels, números y estrellas.
- BookBands eliminados de la home; FAQ home con 5 preguntas reales; What we measure numerado 01-06.

### Fase 3 — Deploy y lío con iCloud (ruido importante)
- El repo vive en `~/Documents/kimi/workspace`, carpeta sincronizada con iCloud. **iCloud corrompe git**: apareció una ref duplicada `.git/refs/heads/main 2` y luego `rev-list died of signal 10` (SIGBUS) al hacer fetch/push.
- Solución adoptada: commits locales en la ruta real, pero **push y builds desde clones en `/tmp`** (`/tmp/mhh-push` para git, `/tmp/mhh-check` para build/validación). tsc/vite también se cuelgan en la ruta de iCloud.
- Deploy: `npm run build && npx nitro deploy --prebuilt` → Worker de Cloudflare `tanstack-start-ts.erik-905.workers.dev`. (El usuario había pedido Cloudflare Pages originalmente; quedó como Workers + assets.)

### Fase 4 — Homepage fiel al deck (gran simplificación)
El usuario revisó y pidió alinear la home al ppt, eliminando casi todo lo añadido en la Fase 2:
- Header: sin logo arriba a la izquierda (entonces), wordmark en Martian Mono, nav solo Memberships / Assessments / Tests + Cart + Book Now (Journal, FAQ, Contact fuera). **Burger menu en móvil** (antes no colapsaba).
- Primera sección: mención pequeña en mono + dirección + 3 párrafos de copy + Book Now. Sin foto de hero (la foto IA se retiró aquí).
- Mapa Google a continuación, en **blanco y negro**, sin copy al lado, con horario debajo (Mon–Fri 7am–8pm / Sat–Sun 9am–6pm).
- Fuera: equipo, precios, contadores de ítems, How it works, What we measure, reviews (5.0 on Google), FAQ de home, CTAs tipo "The best time to measure…" (copy considerado "demasiado GPT").
- Footer plano sin titulares (Services/Studio/Follow eliminados).
- Renombres aplicados en toda la web: **Foundations → Foundational**, **Health & Performance → Human Performance**, **GLP-1 Program → Body Recomposition (GLP-1)**. Los slugs no cambiaron (`/assessments/foundations` etc. siguen igual).
- Commits: `542bf9b` / push `29ca466`.

### Fase 5 — Iteraciones de logo y detalle
1. Hero headline más grande: `text-2xl md:text-4xl` en Martian Mono (commit `894a6d2`).
2. Logo: el usuario pasó dos PNGs con fondo transparente:
   - `(27)` = solo el icono (abanico de líneas) → guardado como `public/volumes-icon.png`.
   - `(28)` = icono + "VOLUMES LAB" integrado → guardado como `public/volumes-mark.png`.
3. Secuencia de cambios de logo (con idas y vueltas):
   - Header no sticky + icono pequeño + wordmark mono; logo grande en hero (con wordmark debajo) y outro tras el footer (commit `6e18b51`).
   - Al integrar el wordmark en la imagen `(28)`, se quitaron los textos duplicados (commit `6466519`).
   - Logo del header grande como el del hero → demasiado grande (commit `e0799ba`).
   - Bajado a responsive `w-24 md:w-32` (commit `28f48b1`).
   - **Estado final**: header con **icono solo + texto "VOLUMES LAB" en mono** (como al principio); logo completo `(28)` grande solo en el hero y en el outro tras el footer (commit `255f28c`).
4. Otros ajustes de esa tanda: copy de la sección 1 a ancho completo (end-to-end), mapa con padding lateral (ya no end-to-end), y **dos hairlines verticales fijas** a los lados de toda la página como márgenes editoriales.

## 4. Estado actual

### Stack
- TanStack Start (React) + Tailwind CSS v4 + shadcn/ui. TypeScript estricto.
- Fuentes: Martian Mono (Google Fonts), stack Helvetica para display/cuerpo.

### Estructura clave
- `src/components/site/SiteChrome.tsx` — layout + líneas de margen verticales + outro de logo tras el footer.
- `src/components/site/SiteHeader.tsx` — header NO sticky, icono + wordmark, burger en móvil, mega menu desktop, CartDrawer.
- `src/components/site/SiteFooter.tsx` — footer plano mono sin titulares.
- `src/components/site/blocks.tsx` — bloques compartidos (Eyebrow, FaqList, SampleReport, etc.).
- `src/routes/index.tsx` — home: intro (logo grande + mención + dirección + 3 párrafos full-width + Book Now) → mapa B&W con horario → What we offer (3 columnas, sin precios, Book Now por columna).
- `src/data/catalog.ts` — catálogo de productos (nombres ya renombrados según deck; slugs intactos).
- `src/data/faq.ts`, `src/data/productContent.ts` — copy de FAQ y páginas de producto.
- `public/volumes-icon.png` (icono solo), `public/volumes-mark.png` (logo completo), `public/hero-lab.jpg` (foto IA, **sin usar actualmente**), `public/team-mauricio.jpg` (sin usar actualmente).

### Home actual (secciones en orden)
1. Intro: logo completo grande → "Madrid's first boutique Human Health & Performance Lab" (mono, text-2xl/md:text-4xl) → dirección (link a Maps) → 3 párrafos de copy a ancho completo → botón Book Now.
2. Mapa Google Maps en grayscale con padding lateral + línea de horario debajo.
3. What we offer: Memberships (2) / Assessments (3) / Tests (8), solo nombres enlazados + Book Now por columna.
4. Footer plano + outro de logo grande.

### Deploy
```bash
npm install
npm run dev          # local
npm run build
npx nitro deploy --prebuilt   # requiere wrangler logueado en la cuenta de Cloudflare del usuario
```
- URL live: https://tanstack-start-ts.erik-905.workers.dev
- Último commit en `main`: `255f28c`.

### Aviso iCloud (importante para el dev)
Si se clona el repo, hacerlo **fuera de carpetas sincronizadas con iCloud**. En la copia del usuario (`~/Documents/kimi/workspace/madrid-health-hub`), git se corrompe (refs duplicadas, SIGBUS) y tsc/vite se cuelgan. Todo push/build se ha hecho desde clones en `/tmp`.

## 5. Pendientes / flags

- **Foto real del lab**: la foto de hero de la Fase 2 era IA y ya no se usa; si se reintroduce imagen, debe ser fotografía real.
- **Foto de Rodrigo Ortega**: pendiente (la sección de equipo entera está retirada de la home por ahora; si vuelve, necesita su foto).
- **Teléfono placeholder**: `+34 910 000 000` en varias páginas (faq, contact, checkout). Sustituir por el real.
- **Dominio definitivo**: la web se sirve en el subdominio `workers.dev`; falta conectar el dominio de marca.
- **Instagram/LinkedIn del footer**: apuntan a `instagram.com` / `linkedin.com` genéricos; poner las URLs reales.
- **Privacy/Terms del footer**: enlazan a `/faq` como placeholder; no existen páginas legales.
- **Sección de equipo y reviews**: retiradas de la home a petición del usuario, pero los datos y componentes siguen en el repo por si se reutilizan en otra página (p.ej. About o Contact).
- **Favicon**: no personalizado todavía (se ofreció usar el icono, sin confirmar).
