# Legal Case Matching System - Setup Guide

## Quick Start Guide

### 1. Firebase Configuration

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Enter project name: "LegalMatch" or your choice
4. Accept the terms and create project
5. Wait for project to be created

#### Enable Authentication
1. In Firebase Console, go to Authentication
2. Click "Get started"
3. Choose "Email/Password" provider
4. Enable it and save

#### Create Firestore Database
1. Go to Firestore Database
2. Click "Create Database"
3. Choose "Start in production mode" (use security rules from `firestore.rules`)
4. Select your region
5. Click "Create"

#### Get Firebase Config
1. Go to Project Settings
2. Scroll to "Your apps" section
3. Click the web app icon `</>`
4. Copy the Firebase config object
5. Update your `.env.local` file with the values

### 2. Environment Setup

Create `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in with your Firebase credentials:
```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=legalmatch-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=legalmatch-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=legalmatch-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

### 3. Deploy Firestore Rules

1. Go to Firestore Console → Rules
2. Replace default rules with content from `firestore.rules`
3. Click "Publish"

### 4. Sample Data Setup

#### Create Sample Lawyers

Access Firebase Console → Firestore and create a new document in `users` collection:

**Lawyer 1: John Smith**
```json
{
  "uid": "lawyer_001",
  "email": "john.smith@lawfirm.com",
  "fullName": "John Smith",
  "userType": "lawyer",
  "phone": "(555) 123-4567",
  "address": "123 Legal St, New York, NY 10001",
  "specializations": ["Criminal", "Civil"],
  "licenseNumber": "NY123456",
  "yearsOfExperience": 10,
  "hourlyRate": 250,
  "bio": "Experienced criminal and civil lawyer with 10 years of practice.",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

**Lawyer 2: Sarah Johnson**
```json
{
  "uid": "lawyer_002",
  "email": "sarah.johnson@lawfirm.com",
  "fullName": "Sarah Johnson",
  "userType": "lawyer",
  "phone": "(555) 234-5678",
  "address": "456 Corporate Ave, New York, NY 10002",
  "specializations": ["Corporate", "Immigration"],
  "licenseNumber": "NY234567",
  "yearsOfExperience": 15,
  "hourlyRate": 300,
  "bio": "Corporate and immigration law specialist with 15 years of experience.",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Create Sample Clients

**Client 1: Alice Johnson**
```json
{
  "uid": "client_001",
  "email": "alice.johnson@email.com",
  "fullName": "Alice Johnson",
  "userType": "client",
  "phone": "(555) 345-6789",
  "address": "789 Main St, New York, NY 10003",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

**Client 2: Bob Williams**
```json
{
  "uid": "client_002",
  "email": "bob.williams@email.com",
  "fullName": "Bob Williams",
  "userType": "client",
  "phone": "(555) 456-7890",
  "address": "321 Oak Ave, New York, NY 10004",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Create Sample Cases

**Case 1: Criminal Case**
```json
{
  "clientId": "client_001",
  "clientName": "Alice Johnson",
  "clientEmail": "alice.johnson@email.com",
  "clientPhone": "(555) 345-6789",
  "clientAddress": "789 Main St, New York, NY 10003",
  "caseType": "Criminal",
  "description": "Need legal representation for DUI charges. First offense, looking for experienced criminal lawyer.",
  "urgencyLevel": "high",
  "status": "active",
  "lawyerId": "lawyer_001",
  "lawyerName": "John Smith",
  "lawyerEmail": "john.smith@lawfirm.com",
  "outcome": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "assignedAt": "2024-01-02T00:00:00Z",
  "updatedAt": "2024-01-02T00:00:00Z"
}
```

**Case 2: Corporate Case**
```json
{
  "clientId": "client_002",
  "clientName": "Bob Williams",
  "clientEmail": "bob.williams@email.com",
  "clientPhone": "(555) 456-7890",
  "clientAddress": "321 Oak Ave, New York, NY 10004",
  "caseType": "Corporate",
  "description": "Need help with business contract review and negotiation for merger agreement.",
  "urgencyLevel": "medium",
  "status": "active",
  "lawyerId": "lawyer_002",
  "lawyerName": "Sarah Johnson",
  "lawyerEmail": "sarah.johnson@lawfirm.com",
  "outcome": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "assignedAt": "2024-01-03T00:00:00Z",
  "updatedAt": "2024-01-03T00:00:00Z"
}
```

### 5. Test Accounts

Use these credentials to test the application:

**Lawyer Account**
- Email: `lawyer@test.com`
- Password: `TestPassword123!`
- Role: Lawyer

**Client Account**
- Email: `client@test.com`
- Password: `TestPassword123!`
- Role: Client

**Note:** You'll need to create these accounts through the sign-up page with proper Firebase authentication setup.

### 6. Testing the Case Matching

1. Log in as a client
2. Go to Dashboard → New Case
3. Fill in case details:
   - Case Type: Select any specialization that matches a lawyer
   - Description: At least 20 characters
   - Urgency: Choose any level
4. Click "Find Lawyer"
5. Review the matched lawyer and confirm
6. Log in as the matched lawyer to see the notification

### 7. Deployment Checklist

Before deploying to production:

- [ ] Set strong passwords for test accounts
- [ ] Review and update Firestore security rules
- [ ] Test all authentication flows
- [ ] Test case matching algorithm
- [ ] Test notification system
- [ ] Verify CORS settings
- [ ] Configure environment variables in Netlify
- [ ] Set up email notifications (if using Netlify functions)
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Create backup strategy

### 8. Monitoring & Analytics

Recommended tools:
- Firebase Console for real-time database monitoring
- Netlify Analytics for deployment metrics
- Google Analytics for user behavior tracking
- Sentry for error tracking

### 9. Troubleshooting

**Issue: "Firebase is not defined"**
- Ensure `.env.local` has all Firebase variables
- Restart development server: `npm run dev`

**Issue: "Permission denied" when accessing Firestore**
- Check Firestore security rules are properly deployed
- Verify user is authenticated
- Check user ID in rules matches Firebase auth UID

**Issue: Lawyer not matched to case**
- Ensure lawyer has specializations set
- Check case type matches lawyer specializations
- Verify lawyer doesn't have too many active cases

**Issue: Build fails**
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`

### 10. Performance Optimization

- Enable Firestore indexing for frequently queried fields
- Implement pagination for large case lists
- Use React.lazy() for code splitting
- Optimize bundle size with tree shaking
- Enable gzip compression on Netlify

## Support

For additional help, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Netlify Documentation](https://docs.netlify.com)
