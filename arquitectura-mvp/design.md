# Diseño de Arquitectura Propuesta (TO-BE)

## 1. Principios de Diseño

- **Consolidación Tecnológica:** Unificar la pila de desarrollo y producción en el ecosistema de Vercel (Node.js para backend, framework estático para frontend).
- **Seguridad por Diseño:** Eliminar secretos del código fuente y utilizar las mejores prácticas de la plataforma de despliegue.
- **Escalabilidad:** Utilizar una arquitectura sin servidor (serverless) que escala automáticamente con la demanda.
- **Mantenibilidad:** Simplificar la arquitectura para que sea más fácil de entender, depurar y extender.

## 2. Arquitectura Propuesta

El proyecto se rediseñará como una **Aplicación Web Híbrida sobre Vercel**, combinando un sitio estático con funcionalidades de backend dinámicas a través de Serverless Functions.

- **Frontend (Sin cambios mayores):**
  - Se mantiene la estructura de sitio estático con HTML, Tailwind CSS y JavaScript.
  - El único cambio requerido es la actualización de la URL del endpoint de la API en el archivo de configuración (`src/js/config.js`).

- **Backend (Serverless):**
  - Se elimina por completo la dependencia de PHP.
  - La lógica del backend se migra a una **Vercel Serverless Function** escrita en **Node.js/JavaScript**.
  - El nuevo endpoint de la API se ubicará en `src/api/data.js`. Vercel construirá y desplegará automáticamente este archivo como un endpoint `/api/data`.

## 3. Flujo de Datos

1.  El navegador del cliente carga la aplicación estática.
2.  El código JavaScript (`dataLoader.js` o similar) realiza una petición `fetch` a la URL `/api/data?key=SU_CLAVE`, obtenida desde `config.js`.
3.  Vercel invoca la Serverless Function `src/api/data.js`.
4.  La función:
    a. Lee la clave de API desde el parámetro de la URL.
    b. Lee la clave de API válida desde las **Variables de Entorno** del proyecto en Vercel (ej. `process.env.API_KEY`).
    c. Compara las claves. Si no coinciden, devuelve un error `401 Unauthorized`.
    d. Si coinciden, lee el archivo `business.json` del sistema de archivos del servidor.
    e. Añade los metadatos requeridos (timestamp, versión).
    f. Devuelve los datos completos como una respuesta JSON.
5.  El frontend recibe el JSON y renderiza los datos en la interfaz.

## 4. Gestión de Seguridad

- **Clave de API:** La clave de API (`wm_auth_2025` o una nueva) **DEBE** ser eliminada del código fuente.
- **Variables de Entorno de Vercel:** La clave se almacenará de forma segura como una variable de entorno en la configuración del proyecto de Vercel. Esto asegura que la clave no esté en el repositorio de Git y pueda ser gestionada (rotada, eliminada) sin necesidad de cambiar el código.
