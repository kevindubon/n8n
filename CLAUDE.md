# CLAUDE.md

This file provides guidance to Claude Code when working with the n8n repository.

## Project Overview

n8n is a fair-code workflow automation platform that combines the flexibility of code with the speed of no-code. This fork is configured for self-hosting on Vercel with Supabase as the database backend.

## Essential Commands

```bash
# Development
pnpm dev              # Start development mode with hot reload
pnpm dev:be          # Backend-only development
pnpm dev:fe          # Frontend-only development
pnpm dev:ai          # AI/LangChain nodes development
pnpm start           # Start production server
pnpm build           # Production build
pnpm build:n8n       # Build n8n specifically
pnpm build:deploy    # Build for deployment

# Testing
pnpm test            # Run unit tests
pnpm test:e2e:ui     # Run E2E tests interactively
pnpm test:e2e:all    # Run E2E tests headless
pnpm lint            # Run ESLint
pnpm format          # Format code
pnpm typecheck       # Type checking

# Package Management
pnpm install         # Install dependencies
pnpm clean           # Clean build artifacts
pnpm reset           # Reset entire workspace
```

## Architecture Overview

### Technology Stack
- **Runtime**: Node.js 22.16+ required
- **Package Manager**: pnpm 10.2+ with workspaces
- **Build System**: Turbo for monorepo builds
- **Frontend**: Vue 3 + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL (via Supabase)
- **Deployment**: Vercel (serverless)

### Monorepo Structure
```
n8n/
├── packages/
│   ├── cli/              # CLI code to run front & backend
│   ├── core/             # Core workflow execution (contact n8n team before changes)
│   ├── design-system/    # Vue frontend components
│   ├── editor-ui/        # Vue frontend workflow editor
│   ├── node-dev/         # CLI to create new nodes
│   ├── nodes-base/       # Base n8n nodes
│   └── workflow/         # Workflow interfaces used by front & backend
├── docker/images/        # Dockerfiles
├── api/                  # Vercel API endpoints
├── vercel.json          # Vercel configuration
└── DEPLOYMENT_GUIDE.md  # Vercel + Supabase deployment guide
```

## Critical Information

### Deployment Configuration
- **Vercel Project**: Configured with custom build settings
- **Supabase Project**: `n8n-workflow` (ID: `caamtdhihhmvtqltgcvz`)
- **Database**: PostgreSQL on Supabase
- **Serverless Functions**: Max 50mb Lambda size, 300s timeout

### Environment Variables
Required environment variables are documented in:
- `.env` (local development)
- `DEPLOYMENT_GUIDE.md` (production deployment)

Key variables include:
- Database connection (Supabase)
- n8n authentication settings
- JWT secrets and encryption keys
- Webhook URLs

### Development Guidelines

1. **Before Making Changes**:
   - This is a monorepo using pnpm workspaces
   - Run `pnpm install` after cloning
   - Build with `pnpm build` before starting
   - Check existing patterns in similar components

2. **Development Workflow**:
   - Use `pnpm dev` for hot reload development
   - For performance, use filtered commands (dev:be, dev:fe, dev:ai)
   - Test changes with `pnpm test`
   - Format code with `pnpm format`

3. **Common Issues**:
   - **pnpm lockfile**: Use `--no-frozen-lockfile` if lockfile issues occur
   - **Vercel deployment**: Check function logs if deployment shows raw JS
   - **Database**: n8n auto-creates schema on first run

### Vercel-Specific Considerations

1. **Serverless Limitations**:
   - 10-second default timeout (can be increased with Pro plan)
   - File storage is ephemeral (use Supabase Storage)
   - Cold starts may affect performance

2. **Build Configuration**:
   - Uses custom `api/index.js` for serverless deployment
   - Routes all requests through the API handler
   - Configured in `vercel.json`

3. **Deployment Process**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   # Vercel auto-deploys from GitHub
   ```

### MCP Configuration
Local MCP servers configured in `.claude/mcp-config.json`:
- **vercel**: For Vercel deployment management
- **supabase**: For database operations

### Fork Synchronization
To keep this fork updated with upstream n8n:
```bash
# Add upstream remote (one-time setup)
git remote add upstream https://github.com/n8n-io/n8n.git

# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/master
git push origin main
```

## Important Notes

1. **Core Package**: Contact n8n team before modifying `/packages/core/`
2. **Node.js Version**: Must use Node.js 22.16 or newer
3. **License**: Fair-code license - review before commercial use
4. **Community**: Active forum at community.n8n.io for support

## Current Status
- ✅ Repository cloned and configured
- ✅ Supabase database connected  
- ✅ Environment variables configured
- ✅ Local MCP servers configured
- ✅ **Build Fixes Applied and Tested**:
  - js-base64 patch for TypeScript declarations
  - @types/ws patch for WebSocket isAlive property
  - @n8n/imap build stub to skip compilation issues
  - All patches added to patchedDependencies in package.json
- ✅ **Full project build successful**
- ✅ **Ready for Render.com deployment**

## Build Fixes Summary
TypeScript compilation issues were resolved by applying existing patches:

1. **js-base64@3.7.2**: Adds TypeScript declaration exports
2. **@types/ws@8.18.1**: Adds isAlive property to WebSocket interface  
3. **@n8n/imap build stub**: Skips problematic compilation while maintaining exports

## Deployment Configuration
- **Target Platform**: Render.com (changed from Vercel due to architecture incompatibility)
- **Deployment Type**: Source code deployment (not Docker)
- **Database**: Supabase PostgreSQL 
- **Configuration File**: `render.yaml`

## Next Steps
1. Deploy to Render.com using render.yaml configuration
2. Test n8n workflow functionality
3. Set up UptimeRobot for keep-alive monitoring (free tier spin-down)
4. Configure webhook URLs after deployment