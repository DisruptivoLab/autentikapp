# Diseño de Arquitectura v2 (Next.js)

## 1. Arquitectura General

Autentikapp v2 se construirá como una aplicación **Next.js**. Esta arquitectura monolítica de frontend y backend simplifica el desarrollo y el despliegue.

- **Renderizado:** Se utilizará una estrategia híbrida. Las páginas mayormente estáticas (landing, login) se generarán de forma estática (SSG) para un rendimiento máximo. Las páginas que requieran datos del usuario (dashboard) se renderizarán en el lado del servidor (SSR) o en el cliente (CSR) para asegurar que los datos estén actualizados.
- **Lenguaje:** Todo el código se escribirá en **TypeScript** (`.tsx` para componentes, `.ts` para lógica).

## 2. Estructura de Carpetas Propuesta

```
/src
├── /app                # Enrutador de Aplicaciones de Next.js 13+
│   ├── /api            # Rutas de API (ej. /api/data)
│   │   └── /data
│   │       └── route.ts
│   ├── /dashboard      # Ruta /dashboard
│   │   └── page.tsx
│   ├── /login          # Ruta /login
│   │   └── page.tsx
│   ├── layout.tsx      # Layout principal de la aplicación
│   └── page.tsx        # Página de inicio (landing)
├── /components         # Componentes de React reutilizables (Sidebar, Button, etc.)
├── /lib                # Lógica de negocio, helpers, etc.
└── /styles             # Estilos globales
```

## 3. Componentes Clave

- **Enrutamiento:** Desaparece `router.js`. Next.js manejará el enrutamiento basado en la estructura de carpetas dentro de `/app`. Por ejemplo, `app/dashboard/page.tsx` se convierte automáticamente en la ruta `/dashboard`.

- **Layout Principal (`app/layout.tsx`):** Este archivo reemplaza la necesidad de cargar `sidebar.html` con JavaScript. El layout definirá la estructura común de la página (incluyendo la `Sidebar`) y envolverá a todas las demás páginas.

- **Componentes de UI (`/components`):** Todos los elementos de la interfaz, como la barra lateral, botones, tarjetas, etc., se convertirán en componentes de React (`.tsx`). Por ejemplo, `sidebar.html` se convierte en `Sidebar.tsx`.

- **Rutas de API (`app/api/**/route.ts`):**
  - La lógica de `data.php` se migrará a `app/api/data/route.ts`.
  - Este archivo exportará funciones `GET`, `POST`, etc., que se ejecutan en el servidor.
  - El acceso a las variables de entorno (ej. `process.env.API_KEY`) es nativo y seguro.

## 4. Flujo de Autenticación y Datos

1.  El usuario navega a una página protegida (ej. `/dashboard`).
2.  Next.js, a través de un componente de layout o middleware, verifica si el usuario está autenticado (ej. buscando un token en las cookies).
3.  Si no está autenticado, lo redirige a `/login`.
4.  Si está autenticado, la página del dashboard puede obtener los datos necesarios de dos maneras:
    - **SSR:** La página se renderiza en el servidor, llama a la función de la API internamente, y se envía al cliente como HTML completo.
    - **CSR:** La página se renderiza en el cliente y hace una llamada `fetch` al endpoint `/api/data`, que es manejado por la API Route de Next.js.
