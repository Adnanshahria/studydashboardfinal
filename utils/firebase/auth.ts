import { firestore, firebaseAuth } from './core';
import { DEFAULT_SETTINGS } from '../../constants';
import firebase from 'firebase/compat/app';

const FIREBASE_USER_COLLECTION = 'users';
const DOMAIN = '@study-dashboard.com';

// Robust ID sanitizer: replaces slashes and other invalid path characters with underscores
const sanitizeId = (id: string) => id.replace(/[/#\?]/g, '_');

const getEmail = (id: string) => id.includes('@') ? id : id + DOMAIN;

const getErrorMessage = (error: any) => {
    const code = error.code;
    if (code === 'auth/invalid-email') return 'Invalid User ID/Email format.';
    if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') return 'Account not found or incorrect password.';
    if (code === 'auth/wrong-password') return 'Incorrect password.';
    if (code === 'auth/email-already-in-use') return 'User ID/Email already exists.';
    if (code === 'auth/weak-password') return 'Password should be at least 6 characters.';
    if (code === 'auth/unauthorized-domain') return `Domain '${window.location.hostname}' is not authorized. Add it to Firebase Console.`;
    if (code === 'auth/network-request-failed') return 'Network error. Check internet connection.';
    return error.message || 'Authentication failed.';
};

export const authenticateUser = async (rawId: string, pass: string) => {
    if (!firebaseAuth || !firestore) return { success: false, error: "Database not connected. Check internet." };
    const email = getEmail(rawId);
    const id = sanitizeId(rawId); // Sanitize document key

    try {
        const result = await firebaseAuth.signInWithEmailAndPassword(email, pass);
        if (result.user) {
            // CRITICAL CHANGE: Use the 'id' (username) as the document key as per user request.
            // This ensures the database ID matches the username (e.g., 'astest') instead of the garbage UID.
            // We use merge: true to avoid overwriting existing data if it exists.
            await firestore.collection(FIREBASE_USER_COLLECTION).doc(id).set({
                data: { username: rawId, password: pass } // Store original username
            }, { merge: true });
            
            // Return the sanitized username (id) as the 'uid' for the app to use
            return { success: true, uid: id };
        }
        return { success: false, error: "User info missing" };
    } catch (e: any) { return { success: false, error: getErrorMessage(e) }; }
};

export const createUser = async (rawId: string, pass: string) => {
    if (!firebaseAuth || !firestore) return { success: false, error: "Database not connected. Check internet." };
    const id = sanitizeId(rawId); // Sanitize document key
    
    try {
        const result = await firebaseAuth.createUserWithEmailAndPassword(getEmail(rawId), pass);
        if (result.user) {
            // CRITICAL CHANGE: Use the 'id' (username) as the document key.
            await firestore.collection(FIREBASE_USER_COLLECTION).doc(id).set({
                createdAt: new Date().toISOString(),
                settings: DEFAULT_SETTINGS,
                data: { username: rawId, password: pass }
            }, { merge: true });
            
            // Return the sanitized username (id) as the 'uid' for the app to use
            return { success: true, uid: id };
        }
        return { success: false, error: "User creation failed" };
    } catch (e: any) { return { success: false, error: getErrorMessage(e) }; }
};

export const loginAnonymously = async () => {
    if (!firebaseAuth) return { success: false, error: "Firebase Auth not initialized" };
    try {
        const result = await firebaseAuth.signInAnonymously();
        return { success: true, uid: result.user?.uid };
    } catch (e: any) { return { success: false, error: getErrorMessage(e) }; }
};

export const resetUserPassword = async (id: string) => {
    if (!firebaseAuth) return { success: false, error: "Auth not initialized" };
    try {
        await firebaseAuth.sendPasswordResetEmail(getEmail(id));
        return { success: true, message: "Reset email sent." };
    } catch (e: any) { return { success: false, error: getErrorMessage(e) }; }
};

export const shadowLogin = async (id: string, pass: string) => ({ success: false, error: "Shadow login disabled." });