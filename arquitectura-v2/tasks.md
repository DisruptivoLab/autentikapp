# Tareas de Migración a v2 (Next.js)

Este documento describe un plan de alto nivel para la migración de Autentikapp v1 a la arquitectura v2 con Next.js. Se asume que se iniciará un proyecto nuevo y se migrará la lógica y los estilos.

## Fase 1: Inicialización y Configuración del Proyecto

-   **[ ] Tarea 1: Crear el nuevo proyecto Next.js.**
    -   **Acción:** Ejecutar el comando `npx create-next-app@latest --typescript --tailwind --eslint autentikapp-v2`.
    -   **Resultado:** Un nuevo proyecto Next.js con TypeScript y Tailwind CSS configurados.

-   **[ ] Tarea 2: Limpiar el proyecto inicial.**
    -   **Acción:** Eliminar las páginas y componentes de ejemplo del nuevo proyecto para empezar con una base limpia.

## Fase 2: Migración de la Interfaz de Usuario (UI)

-   **[ ] Tarea 3: Crear el Layout principal.**
    -   **Acción:** Migrar la estructura base del HTML (incluyendo la barra lateral) al archivo `src/app/layout.tsx`. Convertir la barra lateral en un componente de React (`Sidebar.tsx`).

-   **[ ] Tarea 4: Migrar las páginas estáticas.**
    -   **Acción:** Por cada archivo `.html` (ej. `login.html`, `customer.html`), crear su correspondiente página en Next.js (ej. `src/app/login/page.tsx`).
    -   **Implementación:** Convertir el contenido HTML en JSX dentro del componente de la página. Reemplazar las clases de Tailwind directamente.

## Fase 3: Migración del Backend y Lógica de Datos

-   **[ ] Tarea 5: Implementar la nueva API Route.**
    -   **Acción:** Crear el archivo `src/app/api/data/route.ts`.
    -   **Implementación:** Replicar la lógica de negocio (leer `business.json`, añadir metadatos) usando Node.js APIs dentro de una función `GET` exportada. La validación de la clave de API se hará contra `process.env.API_KEY`.

-   **[ ] Tarea 6: Conectar la UI con la API.**
    -   **Acción:** En las páginas que necesiten los datos (ej. `dashboard`), usar `fetch` (en el cliente) o una llamada directa en el servidor para obtener los datos desde el endpoint `/api/data`.

## Fase 4: Despliegue y Configuración Final

-   **[ ] Tarea 7: Configurar el nuevo proyecto en Vercel.**
    -   **Acción (Diego):** Crear un nuevo proyecto en Vercel y conectarlo al repositorio que contiene la nueva aplicación Next.js.

-   **[ ] Tarea 8: Configurar las Variables de Entorno.**
    -   **Acción (Diego):** En el nuevo proyecto de Vercel, añadir la variable de entorno `API_KEY` con el valor correspondiente.

-   **[ ] Tarea 9: Desplegar y verificar.**
    -   **Acción:** Hacer push del código al repositorio para que Vercel lo despliegue. Verificar que todas las páginas y la lógica de la API funcionan correctamente en producción.
