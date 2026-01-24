# Daniel Dieguez Portfolio

Portfolio web para Game & Web Developer construido con React, Tailwind CSS y Vite.

## Tecnologías

- **React** - Librería de UI
- **Tailwind CSS v4** - Framework de estilos
- **Vite** - Build tool y dev server

## Características

- Diseño minimalista y moderno
- Completamente responsive
- Smooth scroll navigation
- Imágenes de proyectos cargadas desde itch.io
- Componentes reutilizables y escalables
- Animaciones y efectos hover

## Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx      # Navegación principal
│   ├── Hero.jsx        # Sección de presentación
│   ├── Projects.jsx    # Grid de proyectos
│   ├── About.jsx       # Información y skills
│   ├── Contact.jsx     # Información de contacto
│   └── Footer.jsx      # Pie de página
├── App.jsx
└── index.css
```

## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Personalización

Para personalizar el portfolio:

1. **Proyectos**: Edita el array `projects` en `src/components/Projects.jsx`
2. **Skills**: Edita el array `skills` en `src/components/About.jsx`
3. **Links de contacto**: Modifica el array `contacts` en `src/components/Contact.jsx`
4. **Información personal**: Actualiza los textos en cada componente

## Deploy

Este proyecto puede ser desplegado en:
- Vercel
- Netlify
- GitHub Pages
- Cualquier hosting que soporte SPA

---

Desarrollado por Daniel Dieguez
