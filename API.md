# Autentikapp API Documentation

## 🚀 Base URL
```
https://autentikapp.vercel.app/api
```

## 🔐 Autenticación

Todos los endpoints requieren autenticación mediante API Key.

### Obtener API Key
**Endpoint:** `POST /api/auth`

**Body:**
```json
{
  "username": "wmerch",
  "password": "demo2025"
}
```

**Respuesta:**
```json
{
  "success": true,
  "apiKeys": {
    "production": "ak_wmerch_live_7f8e9d2c1b4a5e6f",
    "testing": "ak_wmerch_test_3a2b1c4d5e6f7g8h",
    "demo": "ak_wmerch_demo_9i8j7k6l5m4n3o2p"
  },
  "usage": {
    "production": "Full access to all endpoints",
    "testing": "Access to verify and products endpoints",
    "demo": "Access to verify endpoint only"
  }
}
```

### Usar API Key
Incluye la API Key en el header `X-API-Key` de todas las requests:

```bash
curl -H "X-API-Key: ak_wmerch_live_7f8e9d2c1b4a5e6f" \
     "https://autentikapp.vercel.app/api/verify?id=AUT-2025-WM-A7B9C2D1"
```

## 📋 Endpoints

### 1. Verificar Producto
Verifica la autenticidad de un producto específico por su ID.

**Endpoint:** `GET /api/verify`

**Parámetros:**
- `id` (required): ID único del producto

**Ejemplo:**
```bash
curl -H "X-API-Key: ak_wmerch_live_7f8e9d2c1b4a5e6f" \
     "https://autentikapp.vercel.app/api/verify?id=AUT-2025-WM-A7B9C2D1"
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "business": {
    "name": "W Merch",
    "logo": "/w-merch/logo_w_merch.webp",
    "website": "https://wmerchshop.com/"
  },
  "product": {
    "id": "AUT-2025-WM-A7B9C2D1",
    "name": "Bolso 1",
    "image": "/w-merch/productos/Bolso 1/bolso 1.webp",
    "details": {
      "color": "Negro",
      "material": "Cuero",
      "tipo": "Bolso de hombro"
    },
    "manufacturer": {
      "name": "W Merch Premium",
      "country": "Colombia",
      "city": "Bogotá"
    },
    "registrationDate": "2025-01-10",
    "warranty": "24 meses",
    "status": "Claimed",
    "owner": "C001",
    "claimedDate": "2025-01-20",
    "creationDate": "2025-01-15",
    "batchId": "BATCH-1737123456789"
  },
  "verification": {
    "authentic": true,
    "verified_at": "2025-01-20T15:30:45.123Z",
    "security": "Blockchain",
    "certificate_url": "https://autentikapp.vercel.app/verify?id=AUT-2025-WM-A7B9C2D1"
  }
}
```

**Error 404 (Producto no encontrado):**
```json
{
  "error": "Product not found",
  "id": "AUT-INVALID-ID",
  "available_ids": ["AUT-2025-WM-A7B9C2D1", "AUT-2025-WM-E4F6G8H2", "..."]
}
```

**Error 400 (ID requerido):**
```json
{
  "error": "Product ID is required",
  "usage": "GET /api/verify?id=AUT-2025-WM-A7B9C2D1"
}
```

---

### 2. Listar Productos
Obtiene todos los productos disponibles con sus estadísticas.

**Endpoint:** `GET /api/products`

**Ejemplo:**
```bash
curl -H "X-API-Key: ak_wmerch_test_3a2b1c4d5e6f7g8h" \
     "https://autentikapp.vercel.app/api/products"
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "business": {
    "name": "W Merch",
    "logo": "/w-merch/logo_w_merch.webp",
    "website": "https://wmerchshop.com/"
  },
  "summary": {
    "totalProducts": 3,
    "totalItems": 57,
    "totalClaimed": 35,
    "totalAvailable": 22
  },
  "products": [
    {
      "name": "Bolso 1",
      "image": "/w-merch/productos/Bolso 1/bolso 1.webp",
      "details": {
        "color": "Negro",
        "material": "Cuero",
        "tipo": "Bolso de hombro"
      },
      "manufacturer": {
        "name": "W Merch Premium",
        "country": "Colombia",
        "city": "Bogotá"
      },
      "registrationDate": "2025-01-10",
      "warranty": "24 meses",
      "totalItems": 20,
      "claimedItems": 10,
      "availableItems": 10,
      "items": [
        {
          "id": "AUT-2025-WM-A7B9C2D1",
          "status": "Claimed",
          "owner": "C001",
          "claimedDate": "2025-01-20",
          "creationDate": "2025-01-15",
          "batchId": "BATCH-1737123456789"
        }
      ]
    }
  ]
}
```

---

### 3. Información del Negocio
Obtiene información completa del negocio y estadísticas generales.

**Endpoint:** `GET /api/business`

**Ejemplo:**
```bash
curl -H "X-API-Key: ak_wmerch_live_7f8e9d2c1b4a5e6f" \
     "https://autentikapp.vercel.app/api/business"
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "business": {
    "basic": {
      "name": "W Merch",
      "legalName": "W Merch S.A.S.",
      "logo": "/w-merch/logo_w_merch.webp",
      "description": "Plataforma líder en autenticación de productos...",
      "slogan": "Autenticidad Garantizada, Confianza Verificada",
      "foundedDate": "2023-03-15",
      "industry": "Tecnología - Autenticación de Productos"
    },
    "contact": {
      "address": {
        "street": "Carrera 11 #93-07",
        "city": "Bogotá",
        "country": "Colombia"
      },
      "phone": {
        "main": "+57 1 234-5678",
        "whatsapp": "+57 300 123-4567"
      },
      "email": {
        "general": "info@wmerch.co",
        "support": "soporte@wmerch.co"
      },
      "website": "https://wmerchshop.com/"
    },
    "socialMedia": {
      "instagram": {
        "url": "https://www.instagram.com/wmerch__/",
        "followers": 15420
      }
    }
  },
  "stats": {
    "totalClients": 40,
    "totalProducts": 3,
    "totalShops": 4,
    "totalItems": 57
  }
}
```

---

## 🔧 Características Técnicas

### CORS
Todos los endpoints tienen CORS habilitado para permitir acceso desde cualquier dominio.

### Métodos HTTP
- **GET**: Todos los endpoints
- **OPTIONS**: Para preflight requests

### Content-Type
- **Request**: No requerido para GET
- **Response**: `application/json`

### Rate Limiting
No hay límites de rate implementados actualmente.

---

## 📝 Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 400 | Solicitud incorrecta (parámetros faltantes) |
| 401 | No autorizado (API Key inválida o faltante) |
| 404 | Recurso no encontrado |
| 405 | Método no permitido |
| 500 | Error interno del servidor |

### Error 401 (No autorizado):
```json
{
  "error": "Authentication failed",
  "message": "API Key required",
  "instructions": "Get API Key from /api/auth with credentials wmerch/demo2025"
}
```

---

## 🧪 Ejemplos de Uso

### JavaScript/Fetch
```javascript
// Obtener API Key
const authResponse = await fetch('https://autentikapp.vercel.app/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'wmerch', password: 'demo2025' })
});
const authData = await authResponse.json();
const apiKey = authData.apiKeys.production;

// Verificar producto
const response = await fetch('https://autentikapp.vercel.app/api/verify?id=AUT-2025-WM-A7B9C2D1', {
  headers: { 'X-API-Key': apiKey }
});
const data = await response.json();

if (data.success) {
  console.log('Producto auténtico:', data.product.name);
} else {
  console.log('Error:', data.error);
}
```

### cURL
```bash
# Obtener API Key
curl -X POST "https://autentikapp.vercel.app/api/auth" \
     -H "Content-Type: application/json" \
     -d '{"username":"wmerch","password":"demo2025"}'

# Verificar producto
curl -H "X-API-Key: ak_wmerch_live_7f8e9d2c1b4a5e6f" \
     "https://autentikapp.vercel.app/api/verify?id=AUT-2025-WM-A7B9C2D1"

# Listar productos
curl -H "X-API-Key: ak_wmerch_test_3a2b1c4d5e6f7g8h" \
     "https://autentikapp.vercel.app/api/products"

# Información del negocio
curl -H "X-API-Key: ak_wmerch_live_7f8e9d2c1b4a5e6f" \
     "https://autentikapp.vercel.app/api/business"
```

### Python
```python
import requests

# Obtener API Key
auth_response = requests.post('https://autentikapp.vercel.app/api/auth', 
                             json={'username': 'wmerch', 'password': 'demo2025'})
api_key = auth_response.json()['apiKeys']['production']

# Verificar producto
headers = {'X-API-Key': api_key}
response = requests.get('https://autentikapp.vercel.app/api/verify', 
                       params={'id': 'AUT-2025-WM-A7B9C2D1'},
                       headers=headers)
data = response.json()

if data['success']:
    print(f"Producto auténtico: {data['product']['name']}")
else:
    print(f"Error: {data['error']}")
```

---

## 🔗 IDs de Prueba

### Bolso 1
- `AUT-2025-WM-A7B9C2D1` (Reclamado)
- `AUT-2025-WM-E4F6G8H2` (Disponible)
- `AUT-2025-WM-K9L3M5N7` (Disponible)

### Bolso 2
- `AUT-2025-WM-P8Q2R4S6` (Reclamado)
- `AUT-2025-WM-T7U9V1W3` (Disponible)
- `AUT-2025-WM-Q9R0S1T2` (Reclamado)

### Bolso 3
- `AUT-2025-WM-X5Y7Z9A1` (Reclamado)
- `AUT-2025-WM-B3C5D7E9` (Disponible)
- `AUT-2025-WM-C3D4E5F6` (Reclamado)

---

## 📞 Soporte

Para soporte técnico o preguntas sobre la API:
- **Email**: soporte@wmerch.co
- **WhatsApp**: +57 300 123-4567
- **Documentación**: https://autentikapp.vercel.app

---

*Última actualización: Enero 2025*