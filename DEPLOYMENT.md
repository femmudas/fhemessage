# Deployment Guide

## Netlify Deployment

### Automatic Deployment from GitHub

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fhemessage.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select your repository
   - Netlify will automatically detect the settings from `netlify.toml`

3. **Build Settings (should auto-detect):**
   - Base directory: `.`
   - Build command: `pnpm install && cd packages/client && pnpm build`
   - Publish directory: `packages/client/dist`

4. **Environment Variables (if needed):**
   - `VITE_MESSAGE_STORAGE_ADDRESS` - Contract address (optional for demo)
   - `VITE_NETWORK` - Network name (default: localhost)
   - `VITE_GATEWAY_URL` - FHEVM Gateway URL (default: https://gateway.zama.ai)

### Manual Deployment

1. **Build the project:**
   ```bash
   pnpm install
   cd packages/client
   pnpm build
   ```

2. **Deploy to Netlify:**
   - Install Netlify CLI: `npm install -g netlify-cli`
   - Login: `netlify login`
   - Deploy: `netlify deploy --prod --dir=packages/client/dist`

## Demo Page

The demo interface is available at `/demo` route. This is a standalone demo that doesn't require blockchain connection.

## GitHub Pages (Alternative)

If you prefer GitHub Pages:

1. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/fhemessage/',
     // ... rest of config
   });
   ```

2. Build and deploy:
   ```bash
   cd packages/client
   pnpm build
   ```

3. Push `dist` folder to `gh-pages` branch

