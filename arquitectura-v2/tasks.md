# Plan de Tareas de Alto Nivel (v2)

Este documento describe las fases y tareas principales para la construcción de Autentikapp v2 desde cero.

## Fase 1: Fundación y Backend (Supabase)

-   **[ ] Tarea 1: Configurar el proyecto en Supabase.**
    -   **Acción:** Crear un nuevo proyecto en Supabase.
    -   **Acción:** Diseñar e implementar el esquema de la base de datos (`productos`, `identificadores`, `verificaciones`) usando el editor de tablas o scripts SQL.

-   **[ ] Tarea 2: Configurar la Autenticación.**
    -   **Acción:** Habilitar la autenticación por correo y contraseña en Supabase Auth.
    -   **Acción:** Configurar las plantillas de correo electrónico si es necesario.

-   **[ ] Tarea 3: Implementar la Seguridad de Datos (RLS).**
    -   **Acción:** Escribir y activar las políticas de Row Level Security para asegurar que un gerente solo pueda ver y modificar sus propios productos e identificadores.

## Fase 2: Desarrollo Frontend (Next.js)

-   **[ ] Tarea 4: Inicializar el proyecto Next.js.**
    -   **Acción:** Ejecutar `npx create-next-app` con las opciones de TypeScript y Tailwind CSS.
    -   **Acción:** Conectar el proyecto a Supabase utilizando las claves de API en variables de entorno.

-   **[ ] Tarea 5: Construir el sistema de autenticación.**
    -   **Acción:** Crear las páginas de Login, Registro y Olvido de Contraseña.
    -   **Acción:** Implementar la lógica para interactuar con Supabase Auth.

-   **[ ] Tarea 6: Desarrollar el Layout del Dashboard.**
    -   **Acción:** Crear el layout principal que incluya la `Sidebar` y la navegación.
    -   **Acción:** Implementar la lógica para proteger las rutas del dashboard.

-   **[ ] Tarea 7: Implementar los módulos de gestión (CRUD).**
    -   **Acción:** Desarrollar la interfaz para listar, crear, editar y eliminar productos.
    -   **Acción:** Crear la funcionalidad para generar lotes de identificadores para un producto.

-   **[ ] Tarea 8: Desarrollar el Dashboard de Analíticas.**
    -   **Acción:** Crear las API Routes en Next.js para obtener los datos agregados desde Supabase.
    -   **Acción:** Implementar los componentes de gráficos (Chart.js) y las tarjetas de KPIs.

## Fase 3: Experiencia del Consumidor Final

-   **[ ] Tarea 9: Crear la página de verificación.**
    -   **Acción:** Desarrollar la página pública que recibirá el `codigo_unico` del QR.
    -   **Acción:** Implementar la lógica que busca el código en la base de datos y muestra el resultado (éxito, ya verificado, no encontrado).

## Fase 4: Despliegue y Pruebas

-   **[ ] Tarea 10: Configurar el proyecto en Vercel.**
    -   **Acción:** Conectar el repositorio de Git al proyecto de Vercel.
    -   **Acción:** Configurar todas las variables de entorno necesarias (claves de Supabase).

-   **[ ] Tarea 11: Desplegar y probar.**
    -   **Acción:** Realizar el despliegue en producción y llevar a cabo pruebas de extremo a extremo.
