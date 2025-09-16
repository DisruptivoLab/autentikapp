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

    // Preparar respuesta con todos los productos
    const products = businessData.products.map(product => ({
      name: product.productName,
      image: product.productImage,
      details: product.details,
      manufacturer: product.manufacturer,
      registrationDate: product.registrationDate,
      warranty: product.care?.repair?.warranty || '24 meses',
      totalItems: product.items.length,
      claimedItems: product.items.filter(item => item.status === 'Claimed').length,
      availableItems: product.items.filter(item => item.status === 'Unclaimed').length,
      items: product.items.map(item => ({
        id: item.id,
        status: item.status,
        owner: item.ownerId,
        claimedDate: item.claimedDate,
        creationDate: item.creationDate,
        batchId: item.batchId
      }))
    }));

    return res.status(200).json({
      success: true,
      business: {
        name: businessData.business.basic.name,
        logo: businessData.business.basic.logo,
        website: businessData.business.contact.website
      },
      summary: {
        totalProducts: products.length,
        totalItems: products.reduce((sum, p) => sum + p.totalItems, 0),
        totalClaimed: products.reduce((sum, p) => sum + p.claimedItems, 0),
        totalAvailable: products.reduce((sum, p) => sum + p.availableItems, 0)
      },
      products: products
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}