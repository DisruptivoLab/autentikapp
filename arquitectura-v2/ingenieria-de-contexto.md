# Ingeniería de Contexto (v2)

## 1. Justificación para la Versión 2.0

El análisis de la base de código actual de `Autentikapp` (referida como v1) revela una arquitectura de sitio estático con JavaScript y PHP. Si bien es funcional para un prototipo simple, presenta las siguientes limitaciones que justifican una re-arquitectura completa:

- **Fragilidad y Mantenimiento:** La lógica de enrutamiento y carga de componentes personalizada en JavaScript es propensa a errores y difícil de escalar. Añadir nuevas páginas o componentes complejos incrementa la deuda técnica.
- **Pila Tecnológica Híbrida:** La mezcla de un servidor de desarrollo en Python, un `package.json` de Node.js no utilizado y una API en PHP crea una sobrecarga de conocimiento y complejidad en el despliegue.
- **Vulnerabilidades de Seguridad:** El manejo de secretos (claves de API) directamente en el código es una práctica inaceptable que compromete la seguridad de la aplicación.
- **Incompatibilidad con Despliegue Moderno:** La arquitectura actual no es compatible de forma nativa con las plataformas de despliegue modernas como Vercel sin soluciones complejas (como la migración a Serverless Functions que se propuso en el plan de estabilización).

## 2. Visión para Autentikapp v2

La versión 2.0 de Autentikapp será una aplicación web moderna, segura, escalable y de alto rendimiento, construida sobre una pila tecnológica unificada y profesional. El objetivo es crear una base de código que facilite el crecimiento futuro y la adición de nuevas funcionalidades de forma rápida y segura.

## 3. Pila Tecnológica Propuesta

- **Framework Full-Stack:** **Next.js (con React)**. Proporciona la estructura para el frontend y el backend en un solo lugar.
- **Lenguaje:** **TypeScript**. Para añadir tipado estático, mejorar la calidad del código y reducir errores en tiempo de ejecución.
- **Estilos:** **Tailwind CSS**. Se mantiene la elección actual, ya que es una solución moderna y eficiente.
- **Plataforma de Despliegue:** **Vercel**. La sinergia entre Next.js y Vercel garantiza un rendimiento y una experiencia de desarrollo óptimos.
