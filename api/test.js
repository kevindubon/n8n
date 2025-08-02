// Simple test endpoint for Vercel
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json({
    status: 'n8n API test working',
    method: req.method,
    url: req.url,
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DB_TYPE || 'not configured',
    timestamp: new Date().toISOString(),
    message: 'Vercel serverless function is working correctly'
  });
}