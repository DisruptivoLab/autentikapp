import fs from 'fs';
import path from 'path';
import { validateApiKey } from './auth.js';

export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validar API Key (permitir acceso desde navegador)
  const apiKey = req.headers['x-api-key'];
  const referer = req.headers['referer'];
  const authResult = validateApiKey(apiKey, 'verify', referer);
  
  if (!authResult.valid) {
    return res.status(401).json({
      error: 'Authentication failed',
      message: authResult.error,
      instructions: 'Get API Key from /api/auth with credentials wmerch/demo2025'
    });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      error: 'Product ID is required',
      usage: 'GET /api/verify?id=AUT-2025-WM-A7B9C2D1'
    });
  }

  try {
    // Leer business.json
    const businessPath = path.join(process.cwd(), 'src', 'business.json');
    const businessData = JSON.parse(fs.readFileSync(businessPath, 'utf8'));

    // Buscar producto por ID
    let foundProduct = null;
    let foundItem = null;

    for (const product of businessData.products) {
      const item = product.items.find(item => item.id === id);
      if (item) {
        foundProduct = product;
        foundItem = item;
        break;
      }
    }

    if (!foundProduct || !foundItem) {
      return res.status(404).json({
        error: 'Product not found',
        id: id,
        available_ids: businessData.products.flatMap(p => p.items.map(i => i.id)).slice(0, 10)
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      business: {
        name: businessData.business.basic.name,
        logo: businessData.business.basic.logo,
        website: businessData.business.contact.website
      },
      product: {
        id: foundItem.id,
        name: foundProduct.productName,
        image: foundProduct.productImage,
        details: foundProduct.details,
        manufacturer: foundProduct.manufacturer,
        registrationDate: foundProduct.registrationDate,
        warranty: foundProduct.care?.repair?.warranty || '24 meses',
        status: foundItem.status,
        owner: foundItem.ownerId,
        claimedDate: foundItem.claimedDate,
        creationDate: foundItem.creationDate,
        batchId: foundItem.batchId
      },
      verification: {
        authentic: true,
        verified_at: new Date().toISOString(),
        security: 'Blockchain',
        certificate_url: `https://autentikapp.vercel.app/verify?id=${id}`
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}