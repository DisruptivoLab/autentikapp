# Modelo de Datos (Supabase/PostgreSQL)

Este documento define la estructura de la base de datos para Autentikapp v2, que se implementará en Supabase (PostgreSQL). El modelo está diseñado para ser relacional, escalable y para dar soporte a las historias de usuario definidas.

## 1. Diagrama de Entidad-Relación (Conceptual)

```
+-----------------+      +-----------------+      +--------------------+      +--------------------+
| Gerentes        |      | Productos       |      | Identificadores    |      | ClientesFinales    |
| (Users)         |      | (Products)      |      | (QRCodes)          |      | (Consumers)        |
+-----------------+      +-----------------+      +--------------------+      +--------------------+
| user_id (PK)    |----->| product_id (PK) |----->| qr_id (PK)         |----->| consumer_id (PK)   |
| email           |      | user_id (FK)    |      | product_id (FK)    |      | qr_id (FK)         |
| ...             |      | nombre          |      | codigo_unico       |      | fecha_escaneo      |
+-----------------+      | descripcion     |      | fecha_creacion     |      | ubicacion          |
                       | ...             |      | fecha_escaneo      |      | datos_demograficos |
                       +-----------------+      | consumer_id (FK)   |      | ...                |
                                              +--------------------+      +--------------------+
```

## 2. Definición de Tablas

### a. Tabla `gerentes` (Gestionada por Supabase Auth)

Esta tabla almacenará la información de los usuarios que pueden acceder al dashboard. Supabase Auth la gestiona en gran medida.

-   **`id`** (UUID, PK): Identificador único del usuario.
-   **`email`** (VARCHAR): Correo electrónico para el inicio de sesión.
-   **`encrypted_password`** (VARCHAR): Contraseña hasheada.
-   **`created_at`** (TIMESTAMPTZ): Fecha de creación.

### b. Tabla `productos`

Almacena la información del catálogo de productos de cada gerente.

-   **`id`** (UUID, PK): Identificador único del producto.
-   **`gerente_id`** (UUID, FK a `gerentes.id`): Indica qué gerente es el dueño de este producto.
-   **`nombre`** (VARCHAR): Nombre del producto (ej. "Bolso de Cuero Edición Limitada").
-   **`descripcion`** (TEXT): Descripción detallada del producto.
-   **`material`** (VARCHAR): Material principal.
-   **`color`** (VARCHAR): Color del producto.
-   **`imagen_url`** (VARCHAR): URL a la imagen principal del producto (almacenada en Supabase Storage).
-   **`created_at`** (TIMESTAMPTZ): Fecha de creación del registro.

### c. Tabla `identificadores`

Contiene cada código QR único generado y su estado.

-   **`id`** (UUID, PK): Identificador único del registro del QR.
-   **`producto_id`** (UUID, FK a `productos.id`): El producto al que este QR está asociado.
-   **`codigo_unico`** (VARCHAR, UNIQUE): El string único que se codifica en el QR. Es el corazón de la autenticación.
-   **`estado`** (ENUM: `generado`, `verificado`): El estado actual del código.
-   **`fecha_creacion`** (TIMESTAMPTZ): Cuándo se generó el lote de este código.
-   **`fecha_verificacion`** (TIMESTAMPTZ, NULLABLE): Cuándo fue verificado por primera vez.
-   **`created_at`** (TIMESTAMPTZ): Fecha de creación del registro.

### d. Tabla `verificaciones`

Registra cada evento de escaneo por parte de un consumidor final.

-   **`id`** (UUID, PK): Identificador único del evento de verificación.
-   **`identificador_id`** (UUID, FK a `identificadores.id`): El código QR que fue escaneado.
-   **`fecha_escaneo`** (TIMESTAMPTZ): El momento exacto del escaneo.
-   **`ubicacion_lat`** (DECIMAL, NULLABLE): Latitud del escaneo.
-   **`ubicacion_lon`** (DECIMAL, NULLABLE): Longitud del escaneo.
-   **`pais`** (VARCHAR, NULLABLE): País del escaneo.
-   **`ciudad`** (VARCHAR, NULLABLE): Ciudad del escaneo.
-   **`datos_dispositivo`** (JSONB, NULLABLE): Información anónima del dispositivo que escaneó (ej. navegador, tipo de dispositivo).
-   **`created_at`** (TIMESTAMPTZ): Fecha de creación del registro.

## 3. Relaciones Clave

-   Un `gerente` puede tener muchos `productos`.
-   Un `producto` puede tener muchos `identificadores`.
-   Un `identificador` puede tener muchas `verificaciones` (aunque la primera es la que cambia el estado a `verificado`). Esto permite detectar intentos de escaneo múltiples en un código ya usado, lo cual es un indicador de posible falsificación.
