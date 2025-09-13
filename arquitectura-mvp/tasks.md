# Tareas de Implementación del MVP

## Fase 1: Refactorización del Backend y Seguridad

El objetivo de esta fase es eliminar la deuda técnica, solucionar la vulnerabilidad de seguridad y hacer que la aplicación sea funcional en Vercel.

### Asignado a: Yarbis (Programador Senior)

-   **[ ] Tarea 1: Eliminar el backend PHP.**
    -   **Acción:** Borrar el archivo `src/api/data.php` del proyecto.

-   **[ ] Tarea 2: Crear el nuevo endpoint de API Serverless.**
    -   **Acción:** Crear un nuevo archivo en `src/api/data.js`.
    -   **Implementación:** Escribir la lógica en Node.js para:
        1.  Recibir y leer un parámetro `key` de la URL.
        2.  Comparar el `key` recibido con el valor de `process.env.API_KEY`.
        3.  Si la clave es válida, leer el archivo `src/business.json`.
        4.  Añadir los metadatos (`_meta`) al objeto JSON.
        5.  Devolver el objeto JSON con un código 200.
        6.  Si la clave es inválida, devolver un error 401.

-   **[ ] Tarea 3: Actualizar la configuración del Frontend.**
    -   **Acción:** Modificar el archivo `src/js/config.js`.
    -   **Cambio:** Cambiar la línea `business: 'data.php'` por `business: '/api/data'`.

### Asignado a: Diego (Director)

-   **[ ] Tarea 4: Gestionar el secreto de la API.**
    -   **Acción:** Acceder a la configuración del proyecto `Autentikapp` en Vercel.
    -   **Implementación:** Navegar a la sección de "Environment Variables" y crear una nueva variable:
        -   **Key:** `API_KEY`
        -   **Value:** `wm_auth_2025` (o una clave nueva y más segura).
    -   **Importante:** Esta tarea es crucial y bloquea el funcionamiento de la Tarea 2 en producción.

## Fase 2: Verificación y Cierre

-   **[ ] Tarea 5: Probar la implementación en Vercel.**
    -   **Acción:** Una vez que Yarbis complete sus tareas y Diego configure la variable de entorno, desplegar los cambios en Vercel.
    -   **Verificación:** Navegar a la aplicación desplegada y confirmar que los datos de negocio se cargan correctamente. Verificar en la red del navegador que la llamada a `/api/data` devuelve un código 200.
