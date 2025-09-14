# Especificación Funcional de Autentikapp v2

**Versión:** 1.1
**Autor:** Tony, Codirector Senior

## 1. Resumen

Este documento proporciona una especificación detallada de los módulos y funciones que componen la plataforma Autentikapp v2. Sirve como un desglose técnico de los requisitos del sistema.

---

## 2. Módulos del Sistema

La plataforma se divide en los siguientes módulos principales:

| Módulo                      | Descripción                                                                                             | Actor Principal    |
| :-------------------------- | :------------------------------------------------------------------------------------------------------ | :----------------- |
| **1.0 Autenticación y Acceso**  | Gestiona la identidad, el acceso y la seguridad de las cuentas de los Gerentes de Marca.                | Gerente de Marca   |
| **2.0 Gestión de Catálogo**     | Proporciona las herramientas para que los gerentes administren sus productos y códigos de autenticación. | Gerente de Marca   |
| **3.0 Analíticas y Reportes**   | Visualiza los datos recopilados de las verificaciones para ofrecer inteligencia de negocio.            | Gerente de Marca   |
| **4.0 Verificación Pública**    | Expone la interfaz y la lógica para que los Consumidores Finales verifiquen sus productos.              | Consumidor Final   |

---

## 3. Detalle de Funciones por Módulo

### Módulo 1.0: Autenticación y Acceso

-   **Característica 1.1: Gestión de Cuentas**
    -   **Función 1.1.1: Registro de Usuario**
        -   **Descripción:** Permite a un nuevo Gerente de Marca crear una cuenta.
        -   **Entradas:** Email, Contraseña.
        -   **Proceso:** Valida el formato del email, verifica que no exista, hashea la contraseña y crea el registro en `auth.users`.
        -   **Salidas:** Sesión de usuario iniciada (JWT), posible correo de confirmación.
    -   **Función 1.1.2: Inicio de Sesión**
        -   **Descripción:** Autentica a un usuario existente.
        -   **Entradas:** Email, Contraseña.
        -   **Proceso:** Valida las credenciales contra la base de datos.
        -   **Salidas:** Sesión de usuario iniciada (JWT) o mensaje de error.
    -   **Función 1.1.3: Cierre de Sesión**
        -   **Descripción:** Invalida la sesión activa del usuario.
        -   **Entradas:** Petición del usuario autenticado.
        -   **Proceso:** Elimina el token de sesión del cliente.
        -   **Salidas:** Redirección a la página de inicio de sesión.

### Módulo 2.0: Gestión de Catálogo

-   **Característica 2.1: Administración de Productos (CRUD)**
    -   **Función 2.1.1: Crear Producto**
        -   **Descripción:** Añade un nuevo producto al catálogo del gerente.
        -   **Entradas:** Nombre (requerido), Descripción, Imagen, otros metadatos.
        -   **Proceso:** Crea un nuevo registro en la tabla `products` asociado al `profile_id` del usuario autenticado.
        -   **Salidas:** El registro del producto recién creado.
    -   **Función 2.1.2: Listar Productos**
        -   **Descripción:** Muestra todos los productos pertenecientes al gerente.
        -   **Entradas:** Petición del usuario autenticado.
        -   **Proceso:** Ejecuta un `SELECT` en la tabla `products` filtrado por el `profile_id` del usuario.
        -   **Salidas:** Una lista paginada de productos.

-   **Característica 2.2: Gestión de Identificadores**
    -   **Función 2.2.1: Generar Lote de Identificadores**
        -   **Descripción:** Crea una cantidad específica de códigos QR únicos para un producto.
        -   **Entradas:** `product_id`, Cantidad (entero).
        -   **Proceso:** En un proceso de backend (posiblemente una Edge Function de Supabase para no bloquear la UI), genera N códigos únicos (ej. UUIDv4), los inserta en la tabla `identifiers` con estado `generated` y los asocia al `product_id`.
        -   **Salidas:** Confirmación de la creación del lote y un enlace para descargar el archivo CSV con los códigos.

### Módulo 3.0: Analíticas y Reportes

-   **Característica 3.1: Dashboard Principal**
    -   **Función 3.1.1: Calcular KPIs Globales**
        -   **Descripción:** Agrega datos de todo el sistema para mostrar métricas de alto nivel.
        -   **Entradas:** `profile_id` del gerente, Rango de Fechas (opcional).
        -   **Proceso:** Ejecuta consultas SQL agregadas (`COUNT`, `AVG`, etc.) sobre las tablas `verifications` e `identifiers` para calcular el total de verificaciones, la tasa de conversión, etc., siempre filtrando por los productos del gerente.
        -   **Salidas:** Un objeto JSON con los valores de los KPIs.
    -   **Función 3.1.2: Obtener Datos para Gráficos**
        -   **Descripción:** Proporciona datos formateados para las visualizaciones.
        -   **Entradas:** `profile_id`, Rango de Fechas, Dimensión (ej. `país`, `producto`).
        -   **Proceso:** Ejecuta consultas `GROUP BY` para agregar datos de verificaciones por la dimensión solicitada.
        -   **Salidas:** Un array de objetos listo para ser consumido por Chart.js.

### Módulo 4.0: Verificación Pública

-   **Característica 4.1: Endpoint de Verificación**
    -   **Función 4.1.1: Procesar Verificación de Código**
        -   **Descripción:** Es el corazón de la lógica de autenticación del consumidor.
        -   **Entradas:** `unique_code` (desde la URL).
        -   **Proceso:**
            1.  Busca el `unique_code` en la tabla `identifiers`.
            2.  **Caso A (No encontrado):** Devuelve el estado `INVÁLIDO`.
            3.  **Caso B (Encontrado, estado `generated`):**
                a. Inicia una transacción.
                b. Actualiza el estado del identificador a `verified` y establece `verified_at`.
                c. Inserta un nuevo registro en la tabla `verifications` con los datos del escaneo (IP, User-Agent, etc.).
                d. Cierra la transacción.
                e. Devuelve el estado `AUTÉNTICO` junto con los datos del producto asociado.
            4.  **Caso C (Encontrado, estado `verified`):**
                a. Inserta un nuevo registro en `verifications` (para registrar el intento).
                b. Devuelve el estado `YA VERIFICADO` y la fecha de la primera verificación.
        -   **Salidas:** Un objeto de estado y, opcionalmente, los datos del producto.
