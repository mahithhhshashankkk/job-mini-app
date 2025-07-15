# 🚀 Deployment Guide

This guide covers deployment options for the CareerBoost Job Board application.

## 🎯 Quick Deployment Options

### Frontend Deployment

#### 1. Netlify (Recommended)

```bash
# Build the frontend
cd frontend
npm run build

# Deploy to Netlify
# Option A: Drag & drop the dist/ folder to netlify.com
# Option B: Use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Netlify Configuration:**

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: None required

#### 2. Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod
```

#### 3. GitHub Pages

```bash
# Add to frontend/package.json
"homepage": "https://yourusername.github.io/careerboost-job-board",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

### Backend Deployment

#### 1. Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

**Railway Configuration:**

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  ```
  MONGODB_URI=your_mongodb_atlas_url
  PORT=5000
  NODE_ENV=production
  ```

#### 2. Heroku

```bash
# Install Heroku CLI
# Create Heroku app
heroku create careerboost-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_url
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main
```

#### 3. Fly.io

```bash
# Install flyctl
# Initialize in backend directory
cd backend
fly launch

# Deploy
fly deploy
```

#### 4. DigitalOcean App Platform

1. Connect your GitHub repository
2. Set root directory to `backend`
3. Configure environment variables
4. Deploy automatically

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create new cluster

### 2. Configure Database

```bash
# Create database user
# Set username: careerboost
# Set password: secure_password

# Configure network access
# Add IP: 0.0.0.0/0 (for development)
# For production, add specific IPs

# Get connection string
mongodb+srv://careerboost:secure_password@cluster0.xxxxx.mongodb.net/jobboard?retryWrites=true&w=majority
```

### 3. Seed Production Database

```bash
# Set production environment variable
export MONGODB_URI="mongodb+srv://careerboost:secure_password@cluster0.xxxxx.mongodb.net/jobboard"

# Run seed script
cd backend
npm run seed
```

## 🔧 Environment Configuration

### Frontend Environment Variables

Create `frontend/.env.production`:

```bash
VITE_API_URL=https://your-backend-url.com/api
```

### Backend Environment Variables

Set these in your hosting platform:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
PORT=5000
NODE_ENV=production
```

## 🌐 Full Stack Deployment Examples

### Example 1: Netlify + Railway

1. **Frontend**: Deploy to Netlify
2. **Backend**: Deploy to Railway
3. **Database**: MongoDB Atlas

### Example 2: Vercel + Heroku

1. **Frontend**: Deploy to Vercel
2. **Backend**: Deploy to Heroku
3. **Database**: MongoDB Atlas

## 📋 Pre-Deployment Checklist

### Code Preparation

- [ ] Remove console.log statements
- [ ] Update API URLs for production
- [ ] Set proper environment variables
- [ ] Test build process locally
- [ ] Ensure all dependencies are in package.json

### Security

- [ ] Set strong database passwords
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Use HTTPS for all connections
- [ ] Sanitize user inputs

### Performance

- [ ] Optimize images and assets
- [ ] Minimize bundle size
- [ ] Enable gzip compression
- [ ] Set up CDN if needed
- [ ] Configure caching headers

## 🧪 Testing Deployed Application

### Functionality Tests

```bash
# Test API endpoints
curl https://your-backend-url.com/api/health
curl https://your-backend-url.com/api/jobs

# Test frontend
# Visit your frontend URL
# Test all major features:
# - Job browsing
# - Job filtering
# - Job details
# - Application submission
# - Admin panel
```

### Performance Tests

- Use Google PageSpeed Insights
- Test mobile responsiveness
- Check loading times
- Verify API response times

## 🔄 CI/CD Setup (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Build
        run: cd frontend && npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: "./frontend/dist"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
```

## 📞 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist build
npm run build
```

#### CORS Errors

```javascript
// In backend/server.js
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
    credentials: true,
  }),
);
```

#### Database Connection Issues

```bash
# Check connection string format
# Ensure IP whitelist includes your server IP
# Verify username/password
# Check if cluster is active
```

## 🎉 Success!

Once deployed, your application will be live at:

- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-api.railway.app`

Remember to update the README with your actual live demo links!
