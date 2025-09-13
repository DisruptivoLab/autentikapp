# Aplicación Práctica de la Identidad Visual v2

Este documento detalla cómo aplicar la nueva identidad visual (definida en `identidad-visual.md`) a los componentes existentes de la aplicación, específicamente el `dashboard.html` y la `sidebar`.

## 1. Aplicación en la Sidebar

La sidebar es un componente persistente y clave para la identidad. Debe ser elegante y funcional.

-   **Fondo:** Reemplazar `bg-gray-900` con nuestro color primario, `Carbón Profundo` (`#1E1E1E`). Esto crea una base sofisticada.
-   **Logotipo:**
    1.  **Archivo:** Reemplazar `logotipo-oficial.webp` por la versión vectorial `autentikapp.svg`. Esto garantiza la máxima nitidez en todas las pantallas.
    2.  **Color:** El SVG debe ser modificado para que su color de relleno (`fill`) sea `Blanco Hueso` (`#F9F9F9`). Un logo monocromático sobre el fondo oscuro es la quintaesencia del minimalismo de lujo.
    3.  **Texto del Logo:** El texto "autentikapp" que acompaña al logo debe usar el color `Blanco Hueso` (`#F9F9F9`).
-   **Iconos y Texto de Navegación:**
    -   **Estado Normal:** El texto y los iconos de los enlaces deben usar `Gris Sutil` (`#CCCCCC`). Esto los hace legibles pero no dominantes.
    -   **Estado Hover/Activo:** Al pasar el mouse o en la página activa, el texto y el icono deben cambiar a `Blanco Hueso` (`#F9F9F9`) y el fondo del enlace a una versión ligeramente más clara del fondo principal para dar feedback visual.
-   **Espaciado:** Incrementar ligeramente el espaciado vertical entre los elementos de navegación para que el componente "respire" y se sienta menos denso.

## 2. Aplicación en el Dashboard

El dashboard debe sentirse como un espacio de trabajo premium: limpio, enfocado y con toques de elegancia.

-   **Fondo General:** Cambiar el fondo del `<body>` y del `<main>` de `bg-white` a `Blanco Hueso` (`#F9F9F9`). Este pequeño cambio reduce la dureza del blanco puro y añade calidez.
-   **Tipografía y Títulos:**
    -   **Título Principal ("Tablero"):** Debe usar `Poppins SemiBold` y el color `Carbón Profundo` (`#1E1E1E`).
    -   **Subtítulo ("Análisis..."):** Debe usar `Poppins Regular` y `Gris Sutil` (`#CCCCCC`).
    -   **Texto General:** Todo el texto de párrafos, tablas y tarjetas debe ser `Carbón Profundo` (`#1E1E1E`) para el máximo contraste y legibilidad.
-   **Contenedores (Tarjetas, Gráficos):**
    -   Las tarjetas (`metric-card`, `glass-card`) y los contenedores de gráficos deben tener un fondo de `Blanco Puro` (`#FFFFFF`) y una sombra muy sutil (`box-shadow`) para que se eleven ligeramente sobre el fondo `Blanco Hueso`. Esto crea una jerarquía visual clara y una sensación de profundidad.
    -   Los bordes deben usar `Gris Sutil` (`#CCCCCC`) o ser eliminados en favor de las sombras.
-   **Botones y Elementos de Acento:**
    -   **Botón Primario ("Actualizar", "Aplicar"):** Aquí es donde se utiliza el color de acento. Estos botones deben tener un fondo de `Oro Apagado` (`#D4AF37`) y el texto en `Carbón Profundo` (`#1E1E1E`).
    -   **Botón Secundario ("Exportar"):** Debe tener un fondo transparente, un borde de `Gris Sutil` (`#CCCCCC`) y el texto en `Carbón Profundo` (`#1E1E1E`).
-   **Gráficos (Chart.js):**
    -   **Color Principal:** Las líneas, barras o segmentos principales de los gráficos deben usar el color `Carbón Profundo` (`#1E1E1E`).
    -   **Colores Secundarios:** Para otros datos, se puede usar `Gris Sutil` (`#CCCCCC`).
    -   **Rejilla y Ejes:** Las líneas de la rejilla y el texto de los ejes deben usar una versión muy clara del `Gris Sutil` para no distraer de los datos.
    -   **Eliminar Colores:** Se deben eliminar los colores brillantes (azul, verde, etc.) de los KPIs y gráficos para mantener la paleta monocromática y sofisticada. El estado se puede comunicar con iconos o texto, no necesariamente con color.
