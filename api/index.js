// Simple test to see if we can get basic n8n running
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

// Vercel serverless function handler
module.exports = async (req, res) => {
    try {
        // For now, let's just try to run the n8n binary directly
        const { spawn } = require('child_process');
        
        // Set basic CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
        
        // For now, let's just return a simple status to test deployment
        res.status(200).json({
            status: 'n8n API is running',
            method: req.method,
            url: req.url,
            environment: process.env.NODE_ENV,
            database: process.env.DB_TYPE,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message 
        });
    }
};