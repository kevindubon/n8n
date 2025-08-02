const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

// Import n8n
const { Server } = require('@n8n/cli/dist/Server');

let server;

// Initialize n8n server
async function initializeN8n() {
    if (!server) {
        try {
            // Set n8n configuration
            process.env.N8N_HOST = '0.0.0.0';
            process.env.N8N_PORT = '5678';
            process.env.NODE_ENV = process.env.NODE_ENV || 'production';
            
            server = new Server();
            await server.start();
            console.log('n8n server initialized');
        } catch (error) {
            console.error('Failed to initialize n8n:', error);
            throw error;
        }
    }
    return server;
}

// Vercel serverless function handler
module.exports = async (req, res) => {
    try {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        // Initialize n8n server
        const n8nServer = await initializeN8n();
        
        // Get the Express app from n8n server
        const app = n8nServer.app;
        
        // Forward the request to n8n
        app(req, res);
        
    } catch (error) {
        console.error('Error in n8n handler:', error);
        res.status(500).json({ 
            error: 'n8n Server Error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};