const { exec } = require('child_process');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

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

        // For root path, serve a simple redirect or status page
        if (req.url === '/' || req.url === '') {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>n8n - Workflow Automation</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .container { max-width: 600px; margin: 0 auto; text-align: center; }
                        .status { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                        .error { background: #fff3cd; border: 1px solid #ffeeba; }
                        .success { background: #d4edda; border: 1px solid #c3e6cb; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>n8n Workflow Automation</h1>
                        <div class="status error">
                            <h3>⚠️ Configuration Issue</h3>
                            <p>n8n is not properly configured for Vercel serverless deployment.</p>
                            <p>n8n requires a persistent server environment but Vercel uses stateless serverless functions.</p>
                            <p><strong>Recommended alternatives:</strong></p>
                            <ul style="text-align: left; display: inline-block;">
                                <li>Deploy to Railway, Render, or Heroku for persistent hosting</li>
                                <li>Use Docker containers on cloud platforms</li>
                                <li>Self-host on a VPS or dedicated server</li>
                            </ul>
                        </div>
                        <div class="status">
                            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'unknown'}</p>
                            <p><strong>Database:</strong> ${process.env.DB_TYPE || 'not configured'}</p>
                            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                        </div>
                    </div>
                </body>
                </html>
            `);
            return;
        }

        // For other paths, return API response
        res.status(200).json({
            status: 'n8n serverless function',
            message: 'n8n requires persistent server environment - consider Railway, Render, or Docker deployment',
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