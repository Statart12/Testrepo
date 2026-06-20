import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isRealConfigValue = (value) => {
  if (!value) return false;

  const normalizedValue = String(value).trim().toLowerCase();
  return (
    !normalizedValue.startsWith('your_') &&
    !normalizedValue.startsWith('@vite_') &&
    !normalizedValue.includes('placeholder')
  );
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(isRealConfigValue);

export const firebaseConfigError =
  'Firebase is not configured. Create a .env.local file from .env.example and add your Firebase project values.';

export const assertFirebaseConfigured = () => {
  if (!isFirebaseConfigured) {
    throw new Error(firebaseConfigError);
  }
};

// Initialize Firebase only when the required Vite environment variables exist.
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

// Initialize Auth with persistence
export const auth = app ? getAuth(app) : null;
if (auth) {
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Error setting persistence:', error);
  });
}

// Initialize Firestore
export const db = app ? getFirestore(app) : null;

export default app;
