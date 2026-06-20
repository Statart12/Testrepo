# Legal Case Matching System - Deployment Guide

## Pre-Deployment Checklist

### Local Development
- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Firebase project created
- [ ] Firestore database created
- [ ] Authentication enabled
- [ ] No console errors
- [ ] Responsive design tested on mobile
- [ ] All forms validated

### Firebase Setup
- [ ] Firestore security rules deployed
- [ ] Authentication methods enabled
- [ ] Database indexes created (if needed)
- [ ] Backup strategy configured

## Step-by-Step Deployment Guide

### 1. Firebase Production Setup

#### 1.1 Create Firebase Project
```bash
# Visit https://console.firebase.google.com
# Create new project
# Enable billing (required for production)
```

#### 1.2 Configure Authentication
1. Go to Authentication in Firebase Console
2. Enable Email/Password provider
3. Optionally enable Google Sign-In
4. Set up email templates for password reset

#### 1.3 Configure Firestore
1. Create Firestore database in production mode
2. Deploy security rules:
   ```bash
   # Using Firebase CLI
   firebase login
   firebase init firestore
   # Copy firestore.rules to firestore.rules in your project root
   firebase deploy --only firestore:rules
   ```

#### 1.4 Get Firebase Config
1. Go to Project Settings
2. Find your app in "Your apps" section
3. Copy Firebase config

### 2. Environment Configuration

#### 2.1 Create Production Environment File
Create `.env.production`:
```
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_production_auth_domain
VITE_FIREBASE_PROJECT_ID=your_production_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_production_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
VITE_FIREBASE_APP_ID=your_production_app_id
```

#### 2.2 Secure Variables
- Never commit `.env.production` to version control
- Use Netlify's environment variable dashboard for secure storage
- Rotate credentials periodically

### 3. Netlify Deployment

#### 3.1 Prepare Repository
1. Ensure `.gitignore` includes:
   - `.env*`
   - `node_modules/`
   - `dist/`
   - `.env.production`

2. Commit all code:
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### 3.2 Connect to Netlify
1. Go to [Netlify](https://app.netlify.com)
2. Click "New site from Git"
3. Choose GitHub (or your git provider)
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### 3.3 Set Environment Variables
1. Go to Site Settings → Build & Deploy → Environment
2. Add environment variables:
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID

#### 3.4 Deploy
1. Click "Deploy"
2. Netlify will build and deploy automatically
3. Get your site URL from the dashboard

### 4. Post-Deployment

#### 4.1 Verify Deployment
1. Visit your Netlify site URL
2. Test login functionality
3. Test signup as client and lawyer
4. Create test case
5. Verify case matching
6. Check responsive design on mobile

#### 4.2 Configure Domain
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS settings
4. Enable HTTPS (automatic with Netlify)

#### 4.3 Set Up Monitoring
```bash
# Install Firebase CLI monitoring
npm install -g firebase-tools

# Set up alerts in Firebase Console
# Go to Firestore → Backups & Settings
```

#### 4.4 Enable Analytics
1. Go to Analytics in Firebase Console
2. Create analytics property
3. Add tracking code (optional for web)

### 5. Security Hardening

#### 5.1 Content Security Policy
Add to `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### 5.2 Rate Limiting
1. Enable rate limiting in Firebase Console
2. Configure CORS in Firestore rules

#### 5.3 Database Backup
1. Enable automatic backups in Firebase Console
2. Set retention policy
3. Test restore procedure

#### 5.4 Monitoring & Alerts
1. Set up Firebase Alerts
2. Configure Slack/Email notifications
3. Monitor performance metrics

### 6. Optimization

#### 6.1 Performance
```bash
# Check bundle size
npm run build

# Audit performance
lighthouse https://your-deployed-site.netlify.app
```

#### 6.2 SEO
- Meta tags already configured in `index.html`
- Add robots.txt:
```text
User-agent: *
Allow: /
Disallow: /admin/
```

#### 6.3 Caching
Add to `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Cache static assets
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### 7. Continuous Integration

#### 7.1 GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 8. Troubleshooting Deployment

#### Issue: Build fails
```bash
# Check dependencies
npm install

# Check Node version
node --version  # Should be 14+

# Run build locally
npm run build
```

#### Issue: Environment variables not working
1. Verify variables are set in Netlify dashboard
2. Restart deployment
3. Check `.env` file is NOT committed

#### Issue: CORS errors
1. Check Firestore security rules
2. Verify Firebase origin in console
3. Add domain to Firebase whitelist

#### Issue: Case matching not working in production
1. Check Firestore has sample lawyers
2. Verify specializations match case types
3. Check Firebase query logs for errors

### 9. Maintenance

#### Weekly
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Review user feedback

#### Monthly
- [ ] Update dependencies
- [ ] Review security vulnerabilities
- [ ] Analyze usage patterns

#### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Database optimization

### 10. Rollback Procedure

If deployment has critical issues:

```bash
# View deployment history in Netlify
# Click on previous deployment
# Click "Publish deploy"

# Or redeploy from specific commit
git revert <commit-hash>
git push origin main
```

## Deployment Checklist Summary

```
PRE-DEPLOYMENT:
☐ Test all features locally
☐ Run eslint
☐ Check for console errors
☐ Test on mobile device
☐ Create Firebase project
☐ Configure environment variables

DEPLOYMENT:
☐ Commit code to Git
☐ Push to remote repository
☐ Connect Netlify
☐ Add environment variables
☐ Deploy

POST-DEPLOYMENT:
☐ Verify functionality
☐ Test user flows
☐ Monitor error logs
☐ Set up alerts
☐ Configure domain

ONGOING:
☐ Monitor performance
☐ Update dependencies
☐ Review security
☐ Backup database
☐ Maintain documentation
```

## Emergency Contacts

- Firebase Support: https://support.google.com/firebase
- Netlify Support: https://support.netlify.com
- React Issues: https://react.dev

## Documentation References

- [Netlify Documentation](https://docs.netlify.com)
- [Firebase Deployment Guide](https://firebase.google.com/docs)
- [React Production Build](https://react.dev/learn/keeping-components-pure)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

## Success Criteria

Your deployment is successful when:
- ✅ Site loads without errors
- ✅ Login/Signup works
- ✅ Case matching functions
- ✅ Dashboard displays correctly
- ✅ Mobile responsive
- ✅ All forms validate
- ✅ Notifications work
- ✅ HTTPS enabled
- ✅ Performance score > 80
- ✅ No console errors
