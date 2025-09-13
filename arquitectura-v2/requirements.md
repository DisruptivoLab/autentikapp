# Requisitos v2 (Next.js)

Los requisitos funcionales de la aplicación no cambian en su esencia, pero se añaden requisitos no funcionales que garantizan la calidad y modernidad de la nueva base de código.

## 1. Requisitos Funcionales (RF) - Sin cambios

- **RF-001:** La aplicación debe presentar una página de inicio accesible desde la raíz.
- **RF-002:** La aplicación debe permitir la navegación a través de las diferentes páginas (login, dashboard, etc.).
- **RF-003:** Las URLs deben ser amigables.
- **RF-004:** La aplicación debe cargar y mostrar datos de negocio dinámicamente.
- **RF-005:** El acceso a los datos debe estar protegido por un sistema de autenticación/autorización.

## 2. Requisitos No Funcionales (RNF) - Actualizados

- **RNF-001 (Framework):** La aplicación **debe** ser construida utilizando el framework **Next.js**.
- **RNF-002 (Lenguaje):** Todo el código fuente **debe** ser escrito en **TypeScript** para garantizar la seguridad de tipos.
- **RNF-003 (Componentes):** Toda la interfaz de usuario **debe** ser implementada como una composición de componentes **React** reutilizables.
- **RNF-004 (Seguridad):** Los secretos (claves de API, tokens) **deben** gestionarse exclusivamente a través de Variables de Entorno de Vercel y nunca deben estar en el código fuente.
- **RNF-005 (Enrutamiento):** El enrutamiento de la aplicación **debe** ser manejado por el sistema de enrutamiento basado en archivos de Next.js.
- **RNF-006 (API):** La lógica de backend **debe** implementarse utilizando las **API Routes** de Next.js.
- **RNF-007 (Estilos):** La aplicación **debe** utilizar **Tailwind CSS** configurado para un entorno Next.js/React.
- **RNF-008 (Despliegue):** La aplicación debe ser continuamente desplegable en **Vercel** directamente desde el repositorio de Git.
