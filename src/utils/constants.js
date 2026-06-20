// User Types
export const USER_TYPES = {
  CLIENT: 'client',
  LAWYER: 'lawyer',
};

// Case Types (Specializations)
export const CASE_TYPES = [
  'Criminal',
  'Civil',
  'Corporate',
  'Immigration',
  'Family Law',
  'Tax Law',
  'Intellectual Property',
  'Real Estate',
  'Employment Law',
  'Environmental Law',
];

// Case Status
export const CASE_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  CLEARED: 'cleared',
};

// Case Outcomes
export const CASE_OUTCOMES = {
  WON: 'won',
  LOST: 'lost',
  PENDING: 'pending',
  SETTLED: 'settled',
};

// Urgency Levels
export const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
];

// Notification Types
export const NOTIFICATION_TYPES = {
  CASE_MATCHED: 'case_matched',
  CASE_STATUS_UPDATED: 'case_status_updated',
  CASE_OUTCOME: 'case_outcome',
  MESSAGE: 'message',
  SYSTEM: 'system',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LAWYER_DASHBOARD: '/dashboard/lawyer',
  CLIENT_DASHBOARD: '/dashboard/client',
  PROFILE: '/profile',
  CASES: '/cases',
  CASE_DETAIL: '/cases/:id',
  NEW_CASE: '/new-case',
  NOT_FOUND: '*',
};

// Table Columns
export const LAWYER_CLIENTS_COLUMNS = [
  { key: 'fullName', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
];

export const LAWYER_CASES_COLUMNS = [
  { key: 'caseType', label: 'Case Type' },
  { key: 'clientName', label: 'Client Name' },
  { key: 'status', label: 'Status' },
  { key: 'assignedAt', label: 'Assigned Date' },
  { key: 'outcome', label: 'Outcome' },
];

export const CLIENT_CASES_COLUMNS = [
  { key: 'caseType', label: 'Case Type' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
  { key: 'lawyerName', label: 'Assigned Lawyer' },
  { key: 'assignedAt', label: 'Assigned Date' },
];

// Dashboard Stats Cards for Lawyers
export const LAWYER_STATS = [
  { key: 'activeClients', label: 'Active Clients', icon: 'Users' },
  { key: 'totalCases', label: 'Total Cases', icon: 'FileText' },
  { key: 'activeCases', label: 'Active Cases', icon: 'Clock' },
  { key: 'clearedCases', label: 'Cleared Cases', icon: 'CheckCircle' },
  { key: 'casesWon', label: 'Cases Won', icon: 'Trophy' },
  { key: 'casesLost', label: 'Cases Lost', icon: 'AlertCircle' },
];

// Dashboard Stats Cards for Clients
export const CLIENT_STATS = [
  { key: 'totalCases', label: 'Total Cases', icon: 'FileText' },
  { key: 'activeCases', label: 'Active Cases', icon: 'Clock' },
  { key: 'clearedCases', label: 'Cleared Cases', icon: 'CheckCircle' },
  { key: 'casesWon', label: 'Cases Won', icon: 'Trophy' },
];

// Activity Types
export const ACTIVITY_TYPES = {
  CASE_CREATED: 'case_created',
  CASE_ASSIGNED: 'case_assigned',
  STATUS_UPDATED: 'status_updated',
  OUTCOME_SET: 'outcome_set',
  NOTE_ADDED: 'note_added',
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  WEAK_PASSWORD: 'Password is too weak',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NETWORK_ERROR: 'Network error. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  CASE_CREATED: 'Case created successfully',
  CASE_UPDATED: 'Case updated successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
};
