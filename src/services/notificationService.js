import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { assertFirebaseConfigured, db } from './firebase';

/**
 * Create a notification
 * @param {object} notificationData - Notification data
 * @returns {Promise<string>} Notification ID
 */
export const createNotification = async (notificationData) => {
  try {
    assertFirebaseConfigured();

    const notificationDocRef = doc(collection(db, 'notifications'));
    await setDoc(notificationDocRef, {
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString(),
    });
    return notificationDocRef.id;
  } catch (error) {
    console.error('Create notification error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get notifications for a user
 * @param {string} userId - User ID
 * @param {boolean} unreadOnly - Get only unread notifications
 * @returns {Promise<array>} Array of notification objects
 */
export const getNotifications = async (userId, unreadOnly = false) => {
  try {
    assertFirebaseConfigured();

    let q;
    if (unreadOnly) {
      q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('read', '==', false),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Get notifications error:', error);
    throw new Error(error.message);
  }
};

/**
 * Mark notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<void>}
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    assertFirebaseConfigured();

    const notificationDocRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationDocRef, {
      read: true,
      readAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    throw new Error(error.message);
  }
};

/**
 * Mark all notifications as read for a user
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
export const markAllNotificationsAsRead = async (userId) => {
  try {
    assertFirebaseConfigured();

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    const querySnapshot = await getDocs(q);

    for (const docSnapshot of querySnapshot.docs) {
      await updateDoc(doc(db, 'notifications', docSnapshot.id), {
        read: true,
        readAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    throw new Error(error.message);
  }
};

/**
 * Delete notification
 * @param {string} notificationId - Notification ID
 * @returns {Promise<void>}
 */
export const deleteNotification = async (notificationId) => {
  try {
    assertFirebaseConfigured();

    const notificationDocRef = doc(db, 'notifications', notificationId);
    await deleteDoc(notificationDocRef);
  } catch (error) {
    console.error('Delete notification error:', error);
    throw new Error(error.message);
  }
};

/**
 * Create a case matched notification
 * @param {string} lawyerId - Lawyer ID
 * @param {string} clientName - Client name
 * @param {string} caseType - Case type
 * @param {string} caseId - Case ID
 * @returns {Promise<string>} Notification ID
 */
export const createCaseMatchedNotification = async (lawyerId, clientName, caseType, caseId) => {
  return createNotification({
    userId: lawyerId,
    type: 'case_matched',
    title: 'New Case Matched',
    message: `A new ${caseType} case from ${clientName} has been assigned to you.`,
    caseId,
    actionUrl: `/dashboard/cases/${caseId}`,
  });
};

/**
 * Create a case status updated notification
 * @param {string} userId - User ID
 * @param {string} caseType - Type of notification (client or lawyer)
 * @param {string} caseId - Case ID
 * @param {string} newStatus - New case status
 * @returns {Promise<string>} Notification ID
 */
export const createCaseStatusNotification = async (userId, caseType, caseId, newStatus) => {
  const statusMessages = {
    active: 'Your case has been activated and is now being worked on.',
    cleared: 'Your case has been cleared.',
  };

  return createNotification({
    userId,
    type: 'case_status_updated',
    title: 'Case Status Updated',
    message: statusMessages[newStatus] || `Your case status has been updated to ${newStatus}.`,
    caseId,
    newStatus,
    actionUrl: `/dashboard/cases/${caseId}`,
  });
};

/**
 * Create a case outcome notification
 * @param {string} userId - User ID
 * @param {string} outcome - Case outcome (won/lost)
 * @param {string} caseId - Case ID
 * @returns {Promise<string>} Notification ID
 */
export const createCaseOutcomeNotification = async (userId, outcome, caseId) => {
  const outcomeMessages = {
    won: 'Congratulations! Your case has been won.',
    lost: 'Unfortunately, your case has been lost.',
  };

  return createNotification({
    userId,
    type: 'case_outcome',
    title: `Case ${outcome.toUpperCase()}`,
    message: outcomeMessages[outcome],
    caseId,
    outcome,
    actionUrl: `/dashboard/cases/${caseId}`,
  });
};
