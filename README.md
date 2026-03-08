# Portfolio de Antonio Jesús

Portfolio personal desarrollado con Astro, React, TypeScript, Tailwind CSS y Framer Motion. El objetivo del proyecto es presentar mi trabajo como desarrollador freelance centrado en Flutter y Astro, con una interfaz cuidada, animaciones fluidas y una estructura fácil de mantener.

## Demo

El despliegue final se publicará en Vercel. Mientras tanto, este repositorio contiene el código fuente completo del portfolio.

## Stack

- Astro 5
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Qué incluye

- Hero animado con presentación personal y llamadas a la acción
- Sección Sobre mí orientada a trabajo freelance para clientes
- Sección de habilidades organizada por categorías
- Grid de proyectos destacados con contenido gestionado desde Markdown
- Sección de experiencia y contacto
- Estética glassmorphism con fondo dinámico y microinteracciones

## Proyectos destacados

- Lupi Moda Caballero: e-commerce minimalista para cliente con Astro, Nano Stores, Supabase, Cloudinary y Stripe
- La Novia Jerez: blog para cliente con Astro, Supabase y Cloudinary
- Este portfolio: sitio estático con Astro, React, Tailwind CSS y Framer Motion

## Estructura

```text
src/
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── content/
│   └── projects/
├── data/
├── hooks/
├── layouts/
├── pages/
└── styles/
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Personalización

- Edita los proyectos en `src/content/projects/`
- Actualiza experiencia y habilidades en `src/data/`
- Cambia textos y enlaces en `src/components/sections/` y `src/components/layout/`
- Ajusta estilos globales y animaciones en `src/styles/global.css`

## Despliegue

La opción prevista para producción es Vercel. Cuando exista dominio final, conviene añadir la propiedad `site` en `astro.config.mjs` para generar canonical y metadatos absolutos correctamente.

## Estado del repositorio

Este repositorio está preparado para usarse como referencia pública del portfolio. El contenido se centra en proyectos reales y en una implementación visual orientada a rendimiento y presentación profesional.

## Enlaces

- Repositorio: https://github.com/ajesusdl27/PortfolioAjesusdl
- GitHub: https://github.com/ajesusdl27
- LinkedIn: https://www.linkedin.com/in/antonio-jes%C3%BAs-dom%C3%ADnguez-l%C3%B3pez-3882b5385/
