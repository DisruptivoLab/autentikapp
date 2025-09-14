# Stack Tecnológico de Autentikapp v2

Este documento describe la pila tecnológica seleccionada para el desarrollo de Autentikapp v2. Cada componente ha sido elegido para construir una aplicación moderna, segura, escalable y alineada con la filosofía de diseño de la marca.

## 1. Descripción General

Autentikapp v2 es una **aplicación web full-stack** construida sobre un ecosistema unificado de JavaScript/TypeScript, con una base de datos relacional y desplegada en una plataforma sin servidor (Serverless).

---

## 2. Componentes del Stack

### a. Framework Principal: Next.js

-   **Descripción:** Next.js es un framework de React para construir aplicaciones web full-stack.
-   **Rol en Autentikapp:** Es el **corazón de la aplicación**. Gestionará el enrutamiento, el renderizado de la interfaz de usuario con React y servirá como la capa intermedia que se comunica con el backend.
-   **Justificación:** Elegido por su integración nativa con Vercel, su rendimiento optimizado y por proporcionar una estructura robusta y unificada.

### b. Lenguaje de Programación: TypeScript

-   **Descripción:** TypeScript es un superconjunto de JavaScript que añade tipado estático.
-   **Rol en Autentikapp:** Será el **único lenguaje de programación** utilizado.
-   **Justificación:** Se adopta para mejorar la calidad del código, detectar errores durante el desarrollo y facilitar el mantenimiento a largo plazo.

### c. Librería de UI: React

-   **Descripción:** React es una librería de JavaScript para construir interfaces de usuario interactivas y reutilizables.
-   **Rol en Autentikapp:** Es la base sobre la que Next.js está construido. Se usará para crear todos los elementos visuales como componentes modulares.
-   **Justificación:** Es el estándar de la industria para el desarrollo de interfaces modernas y permite construir un sistema de diseño consistente.

### d. Framework de CSS: Tailwind CSS

-   **Descripción:** Tailwind CSS es un framework de CSS "utility-first".
-   **Rol en Autentikapp:** Será la **única herramienta para estilizar la aplicación**.
-   **Justificación:** Permite implementar rápidamente el diseño minimalista y de lujo definido, asegurando consistencia y facilitando la creación de componentes bien encapsulados.

### e. Capa de Persistencia y Backend: Supabase

-   **Descripción:** Supabase es una plataforma de "Backend como Servicio" (BaaS) que proporciona una base de datos PostgreSQL, autenticación de usuarios, y APIs RESTful generadas automáticamente.
-   **Rol en Autentikapp:** Será la **columna vertebral de todos los datos de la aplicación**.
    -   **Base de Datos (PostgreSQL):** Almacenará de forma estructurada y relacional toda la información (usuarios, productos, etc.), reemplazando al archivo `business.json`.
    -   **Autenticación:** Gestionará el inicio de sesión seguro para los Gerentes de Marca.
    -   **APIs de Datos:** Las API Routes de Next.js interactuarán con la API de Supabase para realizar operaciones CRUD.
-   **Justificación:** Se elige para acelerar radicalmente el desarrollo, proporcionando una base de datos potente y escalable sin la complejidad de administrar un servidor.

### f. Plataforma de Despliegue: Vercel

-   **Descripción:** Vercel es una plataforma en la nube optimizada para el despliegue de aplicaciones Next.js.
-   **Rol en Autentikapp:** Será el **entorno de producción** donde la aplicación se alojará.
-   **Justificación:** Ofrece despliegues automáticos desde Git, escalado automático y una red de distribución de contenido (CDN) global, garantizando el máximo rendimiento.
