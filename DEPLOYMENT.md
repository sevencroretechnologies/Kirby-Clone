# Deployment Guide - Netlify

This guide will help you deploy the PEB 3D Building Configurator to Netlify.

## Prerequisites

- A [Netlify account](https://app.netlify.com/signup) (free tier works fine)
- Git repository hosted on GitHub, GitLab, or Bitbucket
- Node.js 20+ installed locally (for testing the build)

## Deployment Options

### Option 1: Deploy via Netlify UI (Recommended for first-time deployment)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Log in to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign in or create an account

3. **Create a new site**
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Netlify to access your repositories
   - Select the `Kirby-Clone` repository

4. **Configure build settings**
   Netlify should auto-detect the settings from `netlify.toml`, but verify:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist/public`
   - **Node version**: 20

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your site
   - You'll get a random URL like `https://random-name-123456.netlify.app`

6. **Custom domain (optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Follow Netlify's DNS configuration instructions

---

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in your project**
   ```bash
   cd c:\Users\iamje\OneDrive\Desktop\anitgravity\configurator\Kirby-Clone
   netlify init
   ```

4. **Follow the prompts**
   - Create & configure a new site
   - Choose your team
   - Site name: `peb-configurator` (or your choice)
   - Build command: `npm run build:netlify`
   - Publish directory: `dist/public`

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

---

## Configuration Files

This repo includes the following Netlify configuration:

### `netlify.toml`
- Build command: `npm run build:netlify`
- Publish directory: `dist/public`
- Node version: 20
- SPA redirect rules (all routes → index.html)
- Security headers (XSS protection, frame options, etc.)
- Cache headers for assets

### `public/_redirects`
- Fallback for client-side routing
- Ensures all routes go to index.html

---

## Environment Variables

Since this app uses a PostgreSQL database in development, but you're deploying a **static frontend-only** version:

### Important Note
⚠️ **This deployment builds only the frontend (client-side).** The backend API and database are NOT included in Netlify's static hosting.

**Options for backend:**
1. **Mock Data**: Update the app to use mock/sample data instead of API calls
2. **External API**: Deploy the backend separately (e.g., Railway, Render, Heroku) and update API endpoints
3. **Serverless Functions**: Use Netlify Functions to create lightweight API endpoints

---

## Testing the Build Locally

Before deploying, test the production build:

```bash
# Build the project
npm run build:netlify

# Preview the built files
npx serve dist/public
```

Open http://localhost:3000 to verify the build works correctly.

---

## Post-Deployment Checklist

- ✅ Site builds successfully
- ✅ All routes work (click through the app)
- ✅ 3D visualization loads correctly
- ✅ Configuration panels are functional
- ✅ No console errors in browser DevTools
- ✅ Custom domain configured (if applicable)
- ✅ HTTPS enabled (Netlify does this automatically)

---

## Troubleshooting

### Build fails with "Node version not found"
- Ensure `netlify.toml` specifies `NODE_VERSION = "20"`
- Or set it in Netlify UI: Site settings → Build & deploy → Environment → Environment variables

### 404 on page refresh
- Verify `_redirects` file exists in `public/` folder
- Check that `netlify.toml` has the redirect rules

### Assets not loading
- Verify the publish directory is `dist/public`
- Check that all asset paths are relative (not absolute `/assets/...`)

### 3D models not rendering
- Check browser console for WebGL errors
- Ensure Three.js dependencies are in `dependencies` (not `devDependencies`)
- Test in different browsers

---

## Continuous Deployment

Netlify automatically deploys when you push to your main branch:

1. Make changes locally
2. Commit and push to your repository
3. Netlify detects the push and rebuilds automatically
4. New version goes live in ~2-3 minutes

### Branch Previews
- Push to a feature branch
- Netlify creates a preview URL
- Review changes before merging to main

---

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify CLI Reference](https://cli.netlify.com/)
- [Custom Domain Setup](https://docs.netlify.com/domains-https/custom-domains/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)

---

## Support

If you encounter issues:
1. Check the Netlify deploy logs in the UI
2. Review browser console errors
3. Test the build locally first
4. Check [Netlify Community](https://answers.netlify.com/)
