# Portfolio Web Personal — Franco Frías Maier

Trabajo Final de **Diseño UX/UI** · Licenciatura en Sistemas de Información (FCyT UADER) · 2026.
Portfolio one-page con navegación por anclas y una sub-página de caso de estudio.

## Enlaces

| Recurso | URL |
| --- | --- |
| Sitio desplegado | https://francofriass.github.io/tp_final/ _(placeholder: se confirma tras el primer deploy)_ |
| Diseño en Figma | _(placeholder: pegar el link con permiso de visualización)_ |
| Repositorio | https://github.com/francofriass/tp_final |

## Stack

- **HTML5 semántico** (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **Tailwind CSS 3** compilado con el **CLI** (sin CDN en producción) + variables CSS en `:root`.
- **JavaScript vanilla** únicamente para el menú móvil (`assets/js/main.js`).
- **GitHub Pages + GitHub Actions** para el deploy automático.
- Tipografías: Inter y Space Grotesk (2 familias, `font-display: swap`).

Sin frameworks JS ni constructores visuales.

## Estructura del proyecto

```
tp_Final/
├── index.html            # One-page con las 9 secciones obligatorias
├── caso-estudio.html     # Caso de estudio de Cubrí Seguros (sub-página)
├── 404.html              # Página de error personalizada
├── src/input.css         # Fuente de Tailwind: tokens, base y componentes
├── tailwind.config.js    # Paleta, tipografías y breakpoints
├── package.json          # Scripts de build
├── assets/
│   ├── css/styles.css    # CSS compilado (generado por el CLI, se commitea)
│   ├── js/main.js        # Menú móvil accesible
│   └── img/              # Placeholders WebP, favicon y og-image
└── .github/workflows/deploy.yml
```

## Cómo correrlo en local

```bash
npm install
npm run build   # compila src/input.css -> assets/css/styles.css (minificado)
npm run dev     # modo watch mientras se edita
```

Después se abre `index.html` o se sirve la carpeta con cualquier servidor estático.

## Decisión técnica: Tailwind con CLI, sin el CDN

El CDN "Play" de Tailwind compila las clases **en el navegador**: descarga un script pesado, bloquea el render
y empeora Performance en Lighthouse. Además, la cátedra exige no usarlo en producción.

Con el CLI el CSS se genera **en tiempo de build**: solo incluye las clases realmente usadas, queda minificado y se sirve como un archivo estático chico.

### Pasos de la configuración

1. `npm init` y `npm install -D tailwindcss@3`.
2. Crear `tailwind.config.js` con `content: ['./*.html']` y los tokens del design system (paleta, fuentes, breakpoints).
3. Crear `src/input.css` con las directivas `@tailwind base; @tailwind components; @tailwind utilities;`, las variables `:root` y los componentes con `@apply`.
4. Agregar el script `build` en `package.json`:
   `tailwindcss -c ./tailwind.config.js -i ./src/input.css -o ./assets/css/styles.css --minify`.
5. Enlazar `assets/css/styles.css` en el `<head>` de cada página.
6. En el deploy, el workflow ejecuta `npm ci` y `npm run build`. Además el CSS compilado queda commiteado, por lo que el sitio también funciona sin el paso de build.

## Despliegue (GitHub Pages)

1. Crear el repo público `tp_final` en la cuenta `francofriass` y subir el código (`git push -u origin main`).
2. En **Settings → Pages**, elegir **Source: GitHub Actions**.
3. Cada push a `main` dispara `.github/workflows/deploy.yml`: instala dependencias, compila Tailwind y publica `index.html`, `caso-estudio.html`, `404.html` y `assets/`.
4. Pegar la URL final en este README y en la descripción del repositorio.

> Nota: `404.html` usa rutas absolutas con el prefijo `/tp_final/`, porque Pages la sirve desde cualquier profundidad de URL. Si el repo cambia de nombre, hay que actualizarlas.

## Declaración de uso de IA

Se utilizó IA generativa (Antigravity) para **estructurar el maquetado base** y **configurar el CLI de Tailwind**.
El código y el contenido fueron **revisados y adaptados manualmente** por el autor. Los textos de proyectos, experiencia y bio son propios. Las imágenes son placeholders generados con un script y deben reemplazarse por material real.

## Documentación de cambios arquitectónicos

| Decisión | Motivo |
| --- | --- |
| One-page en `index.html` + `caso-estudio.html` aparte | La cátedra pide one-page con anclas; el caso de estudio como sub-página es más simple de hacer accesible que un modal. |
| Tailwind compilado con CLI | Performance y cumplimiento del requisito (ver sección anterior). |
| Tokens duplicados en `:root` y `tailwind.config.js` | Los componentes en CSS plano y las utilidades comparten el mismo design system. |
| Tarjetas de proyecto clickeables con enlace "estirado" (`after:absolute`) | Toda la tarjeta es clickeable sin anidar enlaces, y el foco por teclado queda en el título. |
| `text-primary-soft` (#A78BFA) para texto violeta | El violeta de marca #7C3AED no llega a 4.5:1 como texto sobre el fondo; se usa solo como fondo de botones (texto blanco, ~5.7:1). |
| Menú móvil con `aria-expanded` / `aria-controls` + cierre con Escape | Requisito de accesibilidad WCAG 2.2 AA. |
| Imágenes WebP con `width`/`height` y `loading="lazy"` bajo el pliegue | Evita saltos de layout (CLS) y mejora Performance. |
| CI/CD con GitHub Actions | Deploy automático en cada push, sin subir archivos a mano. |

## Checklist de requisitos

**Estructura**
- [x] One-page con navegación por anclas y las 9 secciones (Header, Hero, Métricas, Skills, Proyectos, Experiencia, Sobre mí, Contacto, Footer)
- [x] Al menos 3 proyectos con imagen, título, año, descripción, resultado/aprendizaje, tags y link
- [x] Un proyecto con caso de estudio propio (`caso-estudio.html`)
- [x] Experiencia con 2 logros por ítem
- [x] Metadatos: `title`, `description`, Open Graph, `theme-color`, favicon, `viewport`

**Técnicos**
- [x] Sitio estático, sin frameworks JS ni constructores
- [x] Tailwind compilado con CLI (sin CDN)
- [x] Un solo `h1` por página y jerarquía sin saltos
- [x] Links externos con `target="_blank" rel="noopener noreferrer"`
- [x] Layout con Flexbox y Grid; mobile-first
- [x] `:hover`, `:focus-visible` y `:active` en elementos interactivos
- [x] `scroll-behavior: smooth` y `scroll-margin-top`
- [x] Máximo 2 familias tipográficas con `font-display: swap`

**Accesibilidad**
- [x] Enlace "Saltar al contenido"
- [x] `lang="es"` en `<html>`
- [x] Menú móvil con `aria-expanded` y `aria-controls`
- [x] `prefers-reduced-motion` respetado
- [ ] Contraste 4.5:1 verificado con herramienta (WebAIM / axe)
- [ ] Navegación 100% por teclado probada manualmente

**Verificación pendiente (la completa el autor)**
- [ ] Probado en 375 px, 768 px y 1280 px sin scroll horizontal
- [ ] Lighthouse mobile ≥ 90 en las 4 métricas (captura adjunta en la entrega)
- [ ] Repo público con al menos 10 commits incrementales
- [ ] Sitio desplegado en URL pública con HTTPS
- [ ] URL final agregada al README y a la descripción del repo
- [ ] Link de Figma agregado y fidelidad Figma ↔ sitio comparada
- [ ] Imágenes placeholder reemplazadas por material real
- [ ] URL de LinkedIn y links de Coffea y Mesa de Ayuda completados (`TODO` en `index.html`)

## Feedback de revisión entre pares

_(Pendiente. Completar con las observaciones de los compañeros y los cambios aplicados.)_

| Revisor | Hallazgo | Cambio aplicado |
| --- | --- | --- |
| | | |

## Créditos y recursos

- Inspiración de interfaz y componentes: [Basecoat UI](https://basecoatui.com/installation/).
- Estilo de referencia: interfaces de streaming (Personal Flow). El diseño visual es propio.
- Tipografías: [Inter](https://fonts.google.com/specimen/Inter) y [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts, licencia OFL).
- Framework de estilos: [Tailwind CSS](https://tailwindcss.com/).
- Imágenes: placeholders propios (provisorios).
