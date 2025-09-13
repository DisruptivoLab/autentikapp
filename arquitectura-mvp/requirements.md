# Requisitos del MVP

## 1. Requisitos Funcionales (RF)

- **RF-001:** La aplicación debe presentar una página de inicio (`landing.html`) accesible desde la raíz del dominio.
- **RF-002:** La aplicación debe permitir la navegación a través de diferentes páginas estáticas: login, dashboard, clientes, productos, etc.
- **RF-003:** Las URLs de la aplicación deben ser amigables para el usuario (ej. `/login` en lugar de `/login.html`).
- **RF-004:** La aplicación debe cargar y mostrar dinámicamente datos de negocio (contenidos en `business.json`).
- **RF-005:** El acceso a los datos de negocio debe estar protegido y solo será posible proveyendo una clave de API válida.
- **RF-006:** Si la clave de API es inválida o no se provee, el sistema debe denegar el acceso a los datos con un código de estado de error apropiado.
- **RF-007:** La interfaz de usuario debe ser consistente en todas las páginas, reutilizando elementos comunes como la barra lateral de navegación.

## 2. Requisitos No Funcionales (RNF)

- **RNF-001 (Despliegue):** La aplicación completa (frontend y backend) debe ser desplegable y funcional en la plataforma Vercel.
- **RNF-002 (Seguridad):** Las claves de API y otros secretos no deben estar almacenados en el código fuente del repositorio. Deben gestionarse a través de un sistema seguro de variables de entorno.
- **RNF-003 (Tecnología):** La pila tecnológica del backend debe estar unificada. Se eliminará PHP en favor de Node.js para las Serverless Functions, alineándose con el ecosistema de Vercel.
- **RNF-004 (Mantenibilidad):** La configuración de la aplicación (como las URLs de los endpoints) debe estar centralizada en archivos de configuración para facilitar futuras modificaciones.
- **RNF-005 (Performance):** Las páginas estáticas deben cargar rápidamente. La carga de datos dinámicos desde la API no debe bloquear la renderización inicial de la página.
