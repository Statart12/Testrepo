import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, firebaseConfigError, isFirebaseConfigured } from '../services/firebase';
import { getUserById, updateUserProfile } from '../services/authService';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setError(firebaseConfigError);
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      try {
        if (authUser) {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'users', authUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUser(authUser);
            setUserData({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName,
              ...data,
            });
          } else {
            setUser(authUser);
            setUserData({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName,
            });
          }
        } else {
          setUser(null);
          setUserData(null);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const updateUser = async (updates) => {
    try {
      if (!isFirebaseConfigured) {
        throw new Error(firebaseConfigError);
      }

      if (user) {
        await updateUserProfile(user.uid, updates);
        setUserData((prev) => ({
          ...prev,
          ...updates,
        }));
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.message);
    }
  };

  const value = {
    user,
    userData,
    loading,
    error,
    updateUser,
    isAuthenticated: !!user,
    isLawyer: userData?.userType === 'lawyer',
    isClient: userData?.userType === 'client',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
