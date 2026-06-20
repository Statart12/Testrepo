# Legal Case Matching System

A complete, production-ready legal case matching system built with React, Firebase, and Tailwind CSS. This application connects clients with experienced lawyers through an intelligent matching algorithm.

## Features

### Authentication System
- Secure sign-up and login for clients and lawyers
- Role-based access control (RBAC)
- Persistent authentication using Firebase Auth
- Form validation and error handling

### Lawyer Features
- Comprehensive profile setup with specializations
- Dashboard showing total stats (cases, clients, win rate)
- List of assigned clients with contact details
- Cases breakdown by status (Pending, Active, Cleared)
- Case management with status updates and outcome tracking
- Search and filter cases by status or client name
- Real-time notifications for matched cases

### Client Features
- Simple profile setup
- Dashboard displaying assigned lawyer information
- My cases section with current status
- Case details and progress tracking
- Ability to submit new cases
- Timeline of case progress

### Case Matching System
- Intelligent algorithm matching based on:
  - Lawyer's specialization matching case type
  - Lawyer with lowest current caseload
  - Lawyer's experience level
  - Lawyer's availability status
- Automatic notifications to matched lawyers
- Alternative lawyer suggestions

### Responsive Design
- Mobile-friendly UI with Tailwind CSS
- Responsive navigation with hamburger menu
- Dashboard cards, tables, and data visualization
- Professional design suitable for legal industry

## Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS
- **Backend/Database**: Firebase (Auth, Firestore)
- **State Management**: Context API
- **Form Management**: React Hook Form
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Runtime**: Node.js

## Project Structure

```
src/
├── components/
│   ├── UI/              # Reusable UI components (Button, Input, etc.)
│   └── Layout/          # Layout components (Navbar, Sidebar)
├── pages/               # Full page components
├── hooks/               # Custom React hooks
├── context/             # Context API providers (Auth, Notifications)
├── services/            # Firebase and API services
├── utils/               # Utility functions (validation, formatting)
├── styles/              # Global styles
└── App.jsx              # Main app component
netlify/
├── functions/           # Netlify serverless functions
public/
package.json
tailwind.config.js
vite.config.js
.env.example
README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project (for API keys)
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd legal-case-matching-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database (production rules in `firestore.rules`)
   - Copy your Firebase config

4. **Configure environment variables**
```bash
cp .env.example .env.local
```

Update `.env.local` with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### For Clients
1. Sign up as a client
2. Complete your profile with contact information
3. Create a new case by describing your legal needs
4. The system will automatically match you with a suitable lawyer
5. Track your case progress in your dashboard

### For Lawyers
1. Sign up as a lawyer
2. Complete your profile with:
   - Specializations
   - License number
   - Years of experience
   - Hourly rate
   - Bio
3. Receive notifications when cases are matched to you
4. View and manage your assigned cases and clients
5. Update case status and outcomes
6. Track your performance metrics

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment on Netlify

### Automatic Deployment
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard

### Manual Deployment
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables in Netlify
Add the following environment variables in Netlify dashboard:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

## Firebase Setup

### Firestore Database Rules
Deploy the security rules from `firestore.rules` to your Firestore database:

1. Go to Firestore Console → Rules
2. Copy content from `firestore.rules`
3. Click "Publish"

### Collection Structure
The application uses the following Firestore collections:
- `users` - Store user profiles
- `cases` - Store case information
- `notifications` - Store user notifications

## Security Features

- ✅ JWT-based authentication with Firebase
- ✅ Role-based access control (RBAC)
- ✅ Protected API routes
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Secure Firestore rules
- ✅ Environment variable protection
- ✅ Password strength requirements

## Sample Data

The application includes seed data functionality. To add sample data:

1. Open Firebase Console
2. Create test users and cases manually
3. Test matching algorithm with different scenarios

## API Integration

The application uses Firebase services directly:
- **Firebase Auth** - User authentication
- **Firestore** - Real-time database
- **Firebase Security Rules** - Data access control

## Troubleshooting

### Common Issues

1. **Firebase Configuration Error**
   - Ensure all environment variables are correctly set
   - Check Firebase project is enabled
   - Verify API keys are correct

2. **Login/Signup Issues**
   - Clear browser cache and cookies
   - Check Firebase Auth is enabled
   - Verify user type matches login type

3. **Case Matching Not Working**
   - Ensure lawyers have specializations set
   - Check Firestore database has users with correct fields
   - Verify case type matches lawyer specializations

4. **Build Errors**
   - Run `npm install` again
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## Performance Optimization

- React component lazy loading
- Image optimization
- Code splitting with React Router
- Firebase caching
- Optimized Tailwind CSS build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary. All rights reserved.

## Support

For issues and feature requests, please contact the development team.

## Future Enhancements

- [ ] Video consultation integration
- [ ] Document upload and management
- [ ] Payment integration
- [ ] Review and ratings system
- [ ] Advanced search filters
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Multi-language support
- [ ] Case templates

## Contributors

Development team - LegalMatch Project

## Changelog

### Version 1.0.0
- Initial release
- Complete authentication system
- Lawyer and client dashboards
- Case matching algorithm
- Real-time notifications
- Responsive design
