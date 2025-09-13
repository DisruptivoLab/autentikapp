# Ingeniería de Contexto (AS-IS)

## 1. Resumen del Proyecto

El proyecto `Autentikapp` es una aplicación web diseñada para la autenticación de productos. La versión actual es un **sitio web estático** compuesto por archivos HTML, CSS y JavaScript (puro).

## 2. Pila Tecnológica

- **Frontend:**
  - HTML5
  - CSS3 con **Tailwind CSS**
  - JavaScript (ES6+, Vanilla)
- **Backend (Local/Problemático):**
  - Un único script **PHP** (`src/api/data.php`) actúa como endpoint de API.
- **Entorno de Desarrollo:**
  - El `package.json` existe pero es engañoso. No se utiliza para gestionar dependencias de Node.js.
  - El servidor de desarrollo se ejecuta con un comando de **Python** (`python -m http.server`).
- **Plataforma de Despliegue (Target):**
  - **Vercel**, configurado para un sitio estático.

## 3. Arquitectura Actual

- **Tipo:** Aplicación de Múltiples Páginas (MPA). Cada vista principal es un archivo `.html` independiente.
- **Componentes:** La reutilización de código (ej. `sidebar.html`) se gestiona mediante carga dinámica con JavaScript del lado del cliente.
- **Enrutamiento:** Se utiliza un enrutador de JavaScript personalizado (`router.js`) para la navegación y un archivo `vercel.json` para reescribir las URLs a rutas amigables en producción.
- **Gestión de Datos:**
  - Un archivo `business.json` contiene los datos de negocio.
  - El script `data.php` actúa como una API primitiva para leer y servir el contenido de `business.json`, protegiéndolo con una clave de API hardcodeada.

## 4. Puntos Críticos y Vulnerabilidades

1.  **Incompatibilidad de Despliegue:** La configuración de Vercel es para un sitio estático y **no puede ejecutar el script `data.php`**. Esto significa que la API no funcionará en producción, rompiendo la funcionalidad principal de carga de datos.
2.  **Vulnerabilidad de Seguridad Grave:** La clave de API (`wm_auth_2025`) está escrita directamente en el código fuente de `data.php`. Esto expone la clave a cualquiera que pueda leer el archivo y es una mala práctica de seguridad fundamental.
3.  **Confusión Tecnológica:** La presencia de `package.json` (Node.js), un servidor de desarrollo en Python y una API en PHP crea una pila tecnológica híbrida y confusa que es difícil de mantener y escalar.
