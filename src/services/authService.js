import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} fullName - User full name
 * @param {object} userData - Additional user data
 * @param {string} userType - User type: 'client' or 'lawyer'
 * @returns {Promise<object>} User object
 */
export const signUpUser = async (email, password, fullName, userData, userType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update auth profile
    await updateProfile(user, { displayName: fullName });

    // Save user data to Firestore
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email,
      fullName,
      userType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData,
    });

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      userType,
    };
  } catch (error) {
    console.error('Sign up error:', error);
    throw new Error(error.message);
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} User object with userType
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        userType: userData.userType,
        ...userData,
      };
    }

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message);
  }
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get current user data
 * @returns {Promise<object>} User object or null
 */
export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              ...userDocSnap.data(),
            });
          } else {
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            });
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {object} updates - Updates to apply
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(
      userDocRef,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Update user profile error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<object>} User object
 */
export const getUserById = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Get user error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get all lawyers
 * @returns {Promise<array>} Array of lawyer objects
 */
export const getAllLawyers = async () => {
  try {
    const q = query(collection(db, 'users'), where('userType', '==', 'lawyer'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Get lawyers error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get available lawyers by specialization
 * @param {string} specialization - Case specialization
 * @returns {Promise<array>} Array of lawyer objects
 */
export const getLawyersBySpecialization = async (specialization) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('userType', '==', 'lawyer'),
      where('specializations', 'array-contains', specialization)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Get lawyers by specialization error:', error);
    throw new Error(error.message);
  }
};
