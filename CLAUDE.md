# Mis Contactos — Guía para Claude Code

## ¿Qué es este proyecto?
App web sencilla de registro de contactos.
Construida con HTML, CSS y JavaScript puro (sin frameworks).
Pensada para aprender a usar Claude Code.

## Estructura de archivos
```
contactos-app/
├── index.html          → Estructura de la página (HTML)
├── css/
│   └── styles.css      → Todos los estilos visuales
└── js/
    ├── datos.js        → Lógica de almacenamiento (localStorage)
    └── app.js          → Lógica principal (añadir, eliminar, buscar)
```

## Cómo abrir la app
Abre el archivo `index.html` directamente en el navegador.
No necesita servidor ni instalaciones.

## Bugs conocidos (para practicar)
1. **`generarId()` en datos.js** — falla si la lista de contactos está vacía
2. **`validarFormulario()` en app.js** — la validación del teléfono es insuficiente

## Mejoras pendientes (ideas para practicar)
- Buscar también por teléfono y email (no solo nombre)
- Añadir campo de notas al contacto
- Ordenar la lista alfabéticamente
- Botón para exportar contactos a CSV
- Modo edición (modificar un contacto existente)

## Convenciones del código
- Comentarios en español
- Variables y funciones en camelCase en español (ej: `anadirContacto`)
- Sin librerías externas, todo en JS vanilla
