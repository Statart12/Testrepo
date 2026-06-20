import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { assertFirebaseConfigured, db } from './firebase';

/**
 * Create a new case
 * @param {object} caseData - Case data
 * @returns {Promise<string>} Case ID
 */
export const createCase = async (caseData) => {
  try {
    assertFirebaseConfigured();

    const caseDocRef = doc(collection(db, 'cases'));
    await setDoc(caseDocRef, {
      ...caseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending', // pending, active, cleared
    });
    return caseDocRef.id;
  } catch (error) {
    console.error('Create case error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get case by ID
 * @param {string} caseId - Case ID
 * @returns {Promise<object>} Case object
 */
export const getCaseById = async (caseId) => {
  try {
    assertFirebaseConfigured();

    const caseDocRef = doc(db, 'cases', caseId);
    const caseDocSnap = await getDoc(caseDocRef);

    if (caseDocSnap.exists()) {
      return { id: caseDocSnap.id, ...caseDocSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Get case error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get all cases for a client
 * @param {string} clientId - Client ID
 * @returns {Promise<array>} Array of case objects
 */
export const getCasesForClient = async (clientId) => {
  try {
    assertFirebaseConfigured();

    const q = query(
      collection(db, 'cases'),
      where('clientId', '==', clientId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Get client cases error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get all cases for a lawyer
 * @param {string} lawyerId - Lawyer ID
 * @returns {Promise<array>} Array of case objects
 */
export const getCasesForLawyer = async (lawyerId) => {
  try {
    assertFirebaseConfigured();

    const q = query(
      collection(db, 'cases'),
      where('lawyerId', '==', lawyerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Get lawyer cases error:', error);
    throw new Error(error.message);
  }
};

/**
 * Update case status
 * @param {string} caseId - Case ID
 * @param {string} status - New status
 * @param {string} outcome - Case outcome (won/lost/pending)
 * @returns {Promise<void>}
 */
export const updateCaseStatus = async (caseId, status, outcome = null) => {
  try {
    assertFirebaseConfigured();

    const caseDocRef = doc(db, 'cases', caseId);
    const updateData = {
      status,
      updatedAt: new Date().toISOString(),
    };

    if (outcome) {
      updateData.outcome = outcome;
    }

    await updateDoc(caseDocRef, updateData);
  } catch (error) {
    console.error('Update case status error:', error);
    throw new Error(error.message);
  }
};

/**
 * Assign lawyer to case
 * @param {string} caseId - Case ID
 * @param {string} lawyerId - Lawyer ID
 * @param {string} lawyerName - Lawyer name
 * @param {string} lawyerEmail - Lawyer email
 * @returns {Promise<void>}
 */
export const assignLawyerToCase = async (caseId, lawyerId, lawyerName, lawyerEmail) => {
  try {
    assertFirebaseConfigured();

    const caseDocRef = doc(db, 'cases', caseId);
    await updateDoc(caseDocRef, {
      lawyerId,
      lawyerName,
      lawyerEmail,
      assignedAt: new Date().toISOString(),
      status: 'active',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Assign lawyer error:', error);
    throw new Error(error.message);
  }
};

/**
 * Delete case
 * @param {string} caseId - Case ID
 * @returns {Promise<void>}
 */
export const deleteCase = async (caseId) => {
  try {
    assertFirebaseConfigured();

    const caseDocRef = doc(db, 'cases', caseId);
    await deleteDoc(caseDocRef);
  } catch (error) {
    console.error('Delete case error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get cases by status
 * @param {string} status - Case status (pending, active, cleared)
 * @returns {Promise<array>} Array of case objects
 */
export const getCasesByStatus = async (status) => {
  try {
    assertFirebaseConfigured();

    const q = query(
      collection(db, 'cases'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Get cases by status error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get all unassigned cases
 * @returns {Promise<array>} Array of case objects
 */
export const getUnassignedCases = async () => {
  try {
    assertFirebaseConfigured();

    const q = query(
      collection(db, 'cases'),
      where('lawyerId', '==', null),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Get unassigned cases error:', error);
    throw new Error(error.message);
  }
};

/**
 * Add activity log to case
 * @param {string} caseId - Case ID
 * @param {object} activityData - Activity data
 * @returns {Promise<void>}
 */
export const addCaseActivity = async (caseId, activityData) => {
  try {
    assertFirebaseConfigured();

    const activityDocRef = doc(collection(db, 'cases', caseId, 'activities'));
    await setDoc(activityDocRef, {
      ...activityData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Add case activity error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get case activities
 * @param {string} caseId - Case ID
 * @returns {Promise<array>} Array of activity objects
 */
export const getCaseActivities = async (caseId) => {
  try {
    assertFirebaseConfigured();

    const activitiesCollection = collection(db, 'cases', caseId, 'activities');
    const q = query(activitiesCollection, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Get case activities error:', error);
    throw new Error(error.message);
  }
};
