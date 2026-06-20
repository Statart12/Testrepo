# Developer Quick Reference - Legal Case Matching System

## Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# 3. Start dev server
npm run dev

# 4. Open browser
# Visit http://localhost:5173
```

## Common Tasks

### Add a New Page
```javascript
// 1. Create file: src/pages/MyPage.jsx
export const MyPage = () => {
  return <div>My Content</div>;
};

// 2. Add to App.jsx
<Route path="/my-page" element={<MyPage />} />

// 3. Add navigation link in Navbar.jsx (if needed)
```

### Add a New Service Function
```javascript
// 1. Edit relevant service file
export const myFunction = async (data) => {
  try {
    // Your logic here
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// 2. Use in component
import { myFunction } from '@/services/myService';
const result = await myFunction(data);
```

### Create a Protected Route
```javascript
// In App.jsx
<Route
  path="/protected-page"
  element={
    <ProtectedRoute requiredRole="lawyer">
      <MyComponent />
    </ProtectedRoute>
  }
/>
```

### Add Form Validation
```javascript
// Use the useForm hook
const form = useForm(initialValues, onSubmit);

// In JSX
<Input
  label="Name"
  name="fullName"
  value={form.values.fullName}
  onChange={form.handleChange}
  error={form.errors.fullName}
  touched={form.touched.fullName}
/>
```

### Display User Data
```javascript
// From AuthContext
const { userData, isLawyer, isClient } = useAuth();

// Use user data
<span>{userData?.fullName}</span>
```

### Handle Async Operations
```javascript
// Use useAsync hook
const { loading, error, execute } = useAsync();

// In event handler
await execute(async () => {
  return await someAsyncFunction();
});
```

## API Reference

### AuthContext
```javascript
const {
  user,              // Firebase user object
  userData,          // User data from Firestore
  loading,           // Loading state
  error,            // Error message
  isAuthenticated,  // Is user logged in
  isLawyer,         // Is user a lawyer
  isClient,         // Is user a client
  updateUser,       // Update user profile
} = useAuth();
```

### NotificationContext
```javascript
const {
  notifications,   // Array of notifications
  unreadCount,     // Number of unread notifications
  loading,         // Loading state
  markAsRead,      // Mark notification as read
  addNotification, // Add new notification
} = useNotifications();
```

### Services

#### authService
```javascript
// Sign up
await signUpUser(email, password, fullName, userData, userType);

// Login
const user = await loginUser(email, password);

// Logout
await logoutUser();

// Get user by ID
const user = await getUserById(userId);

// Get all lawyers
const lawyers = await getAllLawyers();

// Get lawyers by specialization
const lawyers = await getLawyersBySpecialization(caseType);
```

#### caseService
```javascript
// Create case
const caseId = await createCase(caseData);

// Get case
const caseData = await getCaseById(caseId);

// Get client cases
const cases = await getCasesForClient(clientId);

// Get lawyer cases
const cases = await getCasesForLawyer(lawyerId);

// Update status
await updateCaseStatus(caseId, status, outcome);

// Assign lawyer
await assignLawyerToCase(caseId, lawyerId, lawyerName, lawyerEmail);
```

#### caseMatchingService
```javascript
// Match case with lawyer
const lawyer = await matchCaseWithLawyer(caseData);

// Get lawyer availability
const availability = await getLawyerAvailability(lawyerId);

// Find alternatives
const lawyers = await findAlternativeLawyers(caseData, topN);
```

#### notificationService
```javascript
// Get notifications
const notifications = await getNotifications(userId, unreadOnly);

// Create notification
const id = await createNotification(notificationData);

// Mark as read
await markNotificationAsRead(notificationId);
```

## Constants

```javascript
import { 
  USER_TYPES,      // 'client', 'lawyer'
  CASE_TYPES,      // Array of case types
  CASE_STATUS,     // 'pending', 'active', 'cleared'
  URGENCY_LEVELS,  // Array of urgency levels
  ROUTES,          // App routes
} from '@/utils/constants';
```

## Utilities

### Validation
```javascript
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateLawyerSignup,
  validateClientSignup,
  validateCaseForm,
} from '@/utils/validation';
```

### Formatting
```javascript
import {
  formatDate,
  formatDateTime,
  formatCurrency,
  formatPhone,
  getStatusColor,
  getUrgencyColor,
  getInitials,
  truncateText,
} from '@/utils/formatting';
```

## Components

### UI Components
```javascript
import {
  Alert,
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Badge,
  Card,
  Modal,
  Table,
  LoadingSpinner,
} from '@/components/UI';

// Usage examples
<Button variant="primary" onClick={handleClick}>Click me</Button>
<Input label="Email" type="email" />
<Badge text="Active" variant="success" />
<Modal isOpen={isOpen} onClose={onClose} title="Title">
  Modal content
</Modal>
```

### Layout Components
```javascript
import { Navbar, Sidebar } from '@/components/Layout/Navbar';

<Navbar /> // Global navigation
<Sidebar items={items} isOpen={open} onClose={close} />
```

## Styling

### Tailwind Classes
All components use Tailwind CSS. Common utilities:

```javascript
// Spacing
className="p-4 m-2 gap-4"

// Colors
className="bg-primary-600 text-white"

// Responsive
className="grid grid-cols-1 lg:grid-cols-2"

// Flexbox
className="flex items-center justify-between"
```

### Custom Colors
Primary color palette defined in tailwind.config.js:
- `primary-50` to `primary-900`
- Available as `bg-`, `text-`, `border-` prefixes

## Common Patterns

### Authentication Check
```javascript
if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
```

### Form with Validation
```javascript
const form = useForm(initialValues, onSubmit);

return (
  <form onSubmit={form.handleSubmit}>
    <Input
      name="email"
      value={form.values.email}
      onChange={form.handleChange}
      error={form.errors.email}
      touched={form.touched.email}
    />
    <Button type="submit" loading={form.loading}>Submit</Button>
  </form>
);
```

### Async Data Fetching
```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchFromService();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Modal State
```javascript
const modal = useModal();

// Open with data
modal.open(dataObject);

// Close
modal.close();

// Use in JSX
<Modal isOpen={modal.isOpen} onClose={modal.close}>
  {modal.data && /* render data */}
</Modal>
```

## Debugging Tips

### Check Auth State
```javascript
const { userData, isAuthenticated } = useAuth();
console.log('User:', userData, 'Auth:', isAuthenticated);
```

### Check Firestore Data
1. Go to Firebase Console
2. Go to Firestore Database
3. Browse collections
4. Check document structure

### Check Network Calls
1. Open DevTools → Network tab
2. Filter by XHR
3. Look for Firebase API calls

### Check Console Errors
1. Open DevTools → Console
2. Look for red error messages
3. Check stack trace

## Build & Deploy

### Build for Production
```bash
npm run build
# Creates optimized dist/ folder
```

### Preview Production Build
```bash
npm run preview
# Test production build locally
```

### Deploy to Netlify
```bash
# Via Git push (if connected)
git push origin main
# Netlify auto-deploys

# Or manual deploy
netlify deploy --prod --dir=dist
```

## Environment Variables

Required variables in `.env.local`:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_APP_URL (optional)
```

## File Locations

| Type | Location |
|------|----------|
| Pages | `src/pages/` |
| Components | `src/components/` |
| Services | `src/services/` |
| Hooks | `src/hooks/` |
| Utils | `src/utils/` |
| Context | `src/context/` |
| Styles | `src/index.css` |
| Config | Root directory |

## Testing Checklist

Before pushing code:
```
☐ No console errors
☐ No console warnings
☐ ESLint passes
☐ Responsive design works
☐ Forms validate correctly
☐ API calls work
☐ Authentication works
☐ Error handling works
```

## Git Workflow

```bash
# Update main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: add my feature"

# Push to remote
git push origin feature/my-feature

# Create pull request on GitHub
```

## Performance Tips

1. Use `React.memo` for expensive components
2. Use `useCallback` for event handlers
3. Lazy load pages with `React.lazy`
4. Minimize bundle size
5. Use production Firebase rules
6. Enable compression on Netlify

## Helpful Links

- [React Docs](https://react.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind Docs](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)
- [Netlify Docs](https://docs.netlify.com)

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| Firebase not initialized | Check .env.local variables |
| 403 Permission denied | Check Firestore rules and user auth |
| Component not rendering | Check console for errors, verify imports |
| Styles not applying | Check Tailwind config, rebuild CSS |
| Build fails | Run `npm install`, check Node version |

## Code Style

- Use functional components
- Use hooks instead of classes
- Use const for variables
- Use arrow functions
- Add JSDoc comments
- Keep functions small
- Prefer composition over inheritance

---

**Happy coding! Reference this guide while developing.**
