#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

console.log('Building n8n for Vercel deployment...');

try {
  // Build the core packages
  console.log('Building packages...');
  execSync('pnpm run build', { stdio: 'inherit' });

  // Create a simplified package.json for Vercel
  const vercelPackage = {
    name: 'n8n-vercel',
    version: '1.0.0',
    main: 'packages/cli/bin/n8n',
    scripts: {
      start: 'node packages/cli/bin/n8n'
    },
    engines: {
      node: '>=20.19'
    }
  };

  writeFileSync(
    path.join(process.cwd(), 'package-vercel.json'),
    JSON.stringify(vercelPackage, null, 2)
  );

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}