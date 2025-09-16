import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Leer business.json
    const businessPath = path.join(process.cwd(), 'src', 'business.json');
    const businessData = JSON.parse(fs.readFileSync(businessPath, 'utf8'));

    return res.status(200).json({
      success: true,
      business: businessData.business,
      stats: {
        totalClients: businessData.clients.length,
        totalProducts: businessData.products.length,
        totalShops: businessData.authorizedShops.length,
        totalItems: businessData.products.reduce((sum, p) => sum + p.items.length, 0)
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