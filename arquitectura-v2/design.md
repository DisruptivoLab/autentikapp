# Diseño de Arquitectura v2

## 1. Arquitectura General

Autentikapp v2 se construirá como una **aplicación web full-stack con Next.js**, utilizando **Supabase** como su backend de datos. Esta arquitectura desacoplada pero integrada simplifica el desarrollo y garantiza la escalabilidad.

-   **Frontend:** Construido con Next.js y React, renderizado de forma híbrida (estático para páginas de marketing, dinámico para el dashboard).
-   **Backend (Capa Intermedia):** Las API Routes de Next.js actuarán como una capa intermedia segura que se comunica con Supabase. No contendrán lógica de negocio compleja, sino que su principal función será la de proxy y la gestión de sesiones.
-   **Backend (Capa de Datos):** Supabase proporcionará la base de datos PostgreSQL, el sistema de autenticación y las APIs de datos.

## 2. Estructura de Carpetas Propuesta (Next.js App Router)

```
/src
├── /app
│   ├── /api            # API Routes que interactúan con Supabase
│   ├── /(auth)         # Rutas de autenticación (login, etc.)
│   ├── /(dashboard)    # Rutas protegidas del panel de control
│   │   ├── /dashboard
│   │   └── /productos
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página de inicio (landing)
├── /components         # Componentes de React reutilizables
├── /lib                # Clientes de Supabase, helpers
└── /styles             # Estilos globales
```

## 3. Flujo de Datos y Autenticación

1.  El **Gerente de Marca** se registra o inicia sesión a través de una página de autenticación. El frontend utiliza el cliente de Supabase para comunicarse directamente con el servicio de **Supabase Auth**.
2.  Supabase Auth devuelve un token de sesión (JWT) que se almacena de forma segura en el navegador.
3.  Para las peticiones a páginas protegidas o a la API, el token se envía en las cabeceras.
4.  Una API Route en Next.js recibe la petición, valida el token con Supabase y, si es válido, ejecuta la lógica.
5.  La lógica de la API Route utiliza el cliente de servidor de Supabase para realizar una consulta a la base de datos **PostgreSQL**.
6.  Supabase, a través de su sistema de **Row Level Security (RLS)**, asegura que la consulta solo devuelva los datos que pertenecen al usuario autenticado.
7.  Los datos se devuelven al frontend, que los renderiza en la interfaz.

Este flujo garantiza que la lógica de negocio y la seguridad de los datos residan en la base de datos, mientras que Next.js se encarga de la presentación y la interacción con el usuario.
