# n8n Vercel + Supabase Deployment Guide

## Prerequisites Complete ✅
- [x] Supabase project created: `n8n-workflow`
- [x] Database connection configured
- [x] Environment variables set up
- [x] Vercel configuration ready

## Supabase Project Details
- **Project ID**: `caamtdhihhmvtqltgcvz`
- **Database Host**: `db.caamtdhihhmvtqltgcvz.supabase.co`
- **Project URL**: `https://caamtdhihhmvtqltgcvz.supabase.co`

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Vercel and Supabase configuration for n8n"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your n8n fork repository
4. Configure build settings:
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

### 3. Set Environment Variables in Vercel
Copy these environment variables to your Vercel project settings:

```env
# N8N Configuration
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=n8n_admin_2024

# Database Configuration (Supabase)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=db.caamtdhihhmvtqltgcvz.supabase.co
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=postgres
DB_POSTGRESDB_USER=postgres
DB_POSTGRESDB_PASSWORD=pC4@mbs5Tz*9j@8
DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false

# N8N Security
N8N_ENCRYPTION_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
N8N_USER_MANAGEMENT_JWT_SECRET=21471c0273a64acb05f7308afba96f6c4068d513c1e34a588b4245b117b01be7

# N8N Host Configuration
N8N_HOST=0.0.0.0
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://your-app-name.vercel.app

# Node Environment
NODE_ENV=production

# Execution Data Cleanup
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=336
```

### 4. Update Webhook URL
After deployment, update the `WEBHOOK_URL` environment variable in Vercel with your actual domain.

### 5. Database Schema Initialization
n8n will automatically create the required database tables on first startup. The initial setup may take a few minutes.

## Important Notes

### Database Schema
- n8n will create approximately 20+ tables for workflows, executions, credentials, etc.
- The database will initialize automatically on first run
- All data is stored in your Supabase PostgreSQL database

### Authentication
- Basic Auth is enabled by default
- Username: `admin`
- Password: `n8n_admin_2024`
- You can change these in the environment variables

### Webhook Configuration
- Webhooks will be available at: `https://your-app.vercel.app/webhook/...`
- REST API available at: `https://your-app.vercel.app/rest/...`

### Limitations on Vercel
- Serverless functions have a 10-second timeout by default
- For long-running workflows, consider upgrading Vercel plan
- File storage is ephemeral (use Supabase Storage for persistence)

## Troubleshooting

### Common Issues
1. **Database Connection**: Ensure SSL is properly configured
2. **Timeout Issues**: Long workflows may need Vercel Pro plan
3. **Memory Issues**: Large workflows may require function optimization

### Logs
Check Vercel function logs for debugging:
- Go to Vercel Dashboard → Your Project → Functions → View Logs

## Next Steps
1. Deploy to Vercel
2. Test basic workflow creation
3. Configure email notifications (optional)
4. Set up monitoring and alerts
5. Consider upgrading to Vercel Pro for better performance

## Support
- n8n Documentation: https://docs.n8n.io
- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs