# Especificación de la API de Autentikapp v2

**Versión:** 1.0
**Autor:** Tony, Codirector Senior

## 1. Filosofía de Diseño de API

La API de Autentikapp v2 sigue un patrón **Backend-For-Frontend (BFF)**. La aplicación cliente (Next.js frontend) no interactúa directamente con la API de datos de Supabase, sino con una capa de API intermedia construida con **Next.js API Routes**.

### Responsabilidades:

-   **API de Next.js (BFF):**
    -   Expone endpoints específicos para las necesidades de la UI.
    -   Orquesta y agrega llamadas a la API de Supabase.
    -   Maneja la lógica de negocio compleja.
    -   Actúa como una fachada de seguridad, protegiendo las claves y la estructura de Supabase.
-   **API de Supabase (PostgREST):**
    -   Provee acceso CRUD de bajo nivel a la base de datos.
    -   Es consumida exclusivamente por la API de Next.js.

## 2. Autenticación

Todas las peticiones a endpoints protegidos **deben** incluir un `Authorization Header` con el token JWT proporcionado por Supabase Auth.

`Authorization: Bearer <SUPABASE_JWT>`

La API de Next.js validará este token en cada petición antes de interactuar con Supabase.

---

## 3. Definición de Endpoints (API de Next.js)

A continuación se detallan los endpoints principales que el frontend consumirá.

### Módulo: Autenticación

-   **`POST /api/auth/login`**
    -   **Descripción:** Inicia sesión un usuario. (Este es uno de los pocos casos donde el frontend puede hablar directamente con Supabase Auth, pero un endpoint de BFF es una buena práctica para el futuro).
    -   **Request Body:** `{ "email": "...", "password": "..." }`
    -   **Response (200 OK):** `{ "user": {...}, "session": {...} }`
    -   **Response (401 Unauthorized):** `{ "error": "Credenciales inválidas" }`

-   **`POST /api/auth/logout`**
    -   **Descripción:** Cierra la sesión del usuario.
    -   **Response (200 OK):** `{ "message": "Sesión cerrada" }`

### Módulo: Productos

-   **`GET /api/products`**
    -   **Descripción:** Obtiene una lista paginada de los productos del gerente autenticado.
    -   **Query Params:** `?page=1&limit=20&sortBy=created_at`
    -   **Response (200 OK):** `{ "data": [ { "id": "...", "name": "...", ... } ], "pagination": { ... } }`

-   **`POST /api/products`**
    -   **Descripción:** Crea un nuevo producto.
    -   **Request Body:** `{ "name": "...", "description": "...", ... }`
    -   **Response (201 Created):** `{ "id": "...", "name": "...", ... }`

-   **`GET /api/products/{productId}`**
    -   **Descripción:** Obtiene los detalles de un producto específico.
    -   **Response (200 OK):** `{ "id": "...", "name": "...", ... }`

-   **`PUT /api/products/{productId}`**
    -   **Descripción:** Actualiza un producto existente.
    -   **Request Body:** `{ "name": "...", "description": "..." }`
    -   **Response (200 OK):** `{ "id": "...", "name": "...", ... }`

### Módulo: Identificadores

-   **`POST /api/products/{productId}/identifiers`**
    -   **Descripción:** Genera un nuevo lote de identificadores para un producto.
    -   **Request Body:** `{ "quantity": 1000 }`
    -   **Response (202 Accepted):** `{ "message": "La generación del lote ha comenzado.", "batchId": "..." }` (La operación es asíncrona).

### Módulo: Analíticas

-   **`GET /api/analytics/kpis`**
    -   **Descripción:** Obtiene los KPIs principales para el dashboard.
    -   **Query Params:** `?from=YYYY-MM-DD&to=YYYY-MM-DD`
    -   **Response (200 OK):** `{ "totalVerifications": 1250, "verificationRate": 0.75, ... }`

-   **`GET /api/analytics/verifications-by-country`**
    -   **Descripción:** Obtiene el número de verificaciones agrupadas por país.
    -   **Query Params:** `?from=YYYY-MM-DD&to=YYYY-MM-DD`
    -   **Response (200 OK):** `{ "data": [ { "country": "México", "count": 450 }, { "country": "España", "count": 320 } ] }`
