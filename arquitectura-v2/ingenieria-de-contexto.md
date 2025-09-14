# Ingeniería de Contexto (v2)

## 1. Justificación para la Versión 2.0

El análisis de la base de código actual de `Autentikapp` (v1) revela una arquitectura de sitio estático con JavaScript y PHP. Si bien es funcional para un prototipo simple, presenta limitaciones fundamentales que justifican una re-arquitectura completa para construir una plataforma robusta y escalable.

-   **Gestión de Datos Primitiva:** El uso de un archivo `business.json` como base de datos es insostenible. Impide operaciones de escritura eficientes, no permite relaciones de datos complejas y presenta un riesgo de seguridad y rendimiento.
-   **Fragilidad y Mantenimiento:** La lógica de enrutamiento y carga de componentes personalizada en JavaScript es propensa a errores y difícil de escalar.
-   **Pila Tecnológica Híbrida y Obsoleta:** La mezcla de un servidor de desarrollo en Python, un `package.json` de Node.js no utilizado y una API en PHP crea una sobrecarga de conocimiento y complejidad en el despliegue.
-   **Vulnerabilidades de Seguridad:** El manejo de secretos (claves de API) directamente en el código es una práctica inaceptable.

## 2. Visión para Autentikapp v2

La versión 2.0 de Autentikapp será una **aplicación web moderna, segura, escalable y de alto rendimiento**, construida sobre una pila tecnológica unificada y profesional. El objetivo es crear una base de código que facilite el crecimiento futuro, la adición de nuevas funcionalidades y se alinee con la filosofía de marca **minimalista y de lujo**.
