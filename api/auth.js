import crypto from 'crypto';

// API Keys válidas (en producción esto estaría en una base de datos)
const API_KEYS = {
  'ak_wmerch_live_7f8e9d2c1b4a5e6f': {
    name: 'W Merch Production',
    permissions: ['verify', 'products', 'business'],
    created: '2025-01-20',
    lastUsed: null,
    active: true
  },
  'ak_wmerch_test_3a2b1c4d5e6f7g8h': {
    name: 'W Merch Testing',
    permissions: ['verify', 'products'],
    created: '2025-01-20',
    lastUsed: null,
    active: true
  },
  'ak_wmerch_demo_9i8j7k6l5m4n3o2p': {
    name: 'W Merch Demo',
    permissions: ['verify'],
    created: '2025-01-20',
    lastUsed: null,
    active: true
  }
};

// Validar API Key
export function validateApiKey(apiKey, requiredPermission = null, referer = null) {
  // Permitir acceso desde el mismo dominio (navegador)
  if (!apiKey && referer && referer.includes('autentikapp.vercel.app')) {
    return { 
      valid: true, 
      keyData: {
        name: 'Browser Access',
        permissions: ['verify', 'products', 'business']
      }
    };
  }
  
  if (!apiKey) {
    return { valid: false, error: 'API Key required' };
  }

  const keyData = API_KEYS[apiKey];
  
  if (!keyData) {
    return { valid: false, error: 'Invalid API Key' };
  }

  if (!keyData.active) {
    return { valid: false, error: 'API Key inactive' };
  }

  if (requiredPermission && !keyData.permissions.includes(requiredPermission)) {
    return { valid: false, error: `Permission '${requiredPermission}' required` };
  }

  // Actualizar último uso
  keyData.lastUsed = new Date().toISOString();

  return { 
    valid: true, 
    keyData: {
      name: keyData.name,
      permissions: keyData.permissions
    }
  };
}

// Generar nueva API Key
export function generateApiKey(prefix = 'ak_wmerch_live') {
  const randomBytes = crypto.randomBytes(16).toString('hex');
  return `${prefix}_${randomBytes}`;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Validar credenciales demo
  if (username === 'wmerch' && password === 'demo2025') {
    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      apiKeys: {
        production: 'ak_wmerch_live_7f8e9d2c1b4a5e6f',
        testing: 'ak_wmerch_test_3a2b1c4d5e6f7g8h',
        demo: 'ak_wmerch_demo_9i8j7k6l5m4n3o2p'
      },
      usage: {
        production: 'Full access to all endpoints',
        testing: 'Access to verify and products endpoints',
        demo: 'Access to verify endpoint only'
      },
      instructions: 'Include API Key in X-API-Key header for all requests'
    });
  }

  return res.status(401).json({
    error: 'Invalid credentials',
    message: 'Use demo credentials: wmerch / demo2025'
  });
}