import { firestore } from './core';
import { UserData, UserSettings } from '../../types';
import { DEFAULT_SETTINGS } from '../../constants';

const FIREBASE_USER_COLLECTION = 'users';

// Prevent prototype pollution and remove undefined values
export const sanitize = (obj: any): any => {
    if (obj === undefined || obj === null) return null;
    if (typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sanitize);
    const newObj: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            if (val !== undefined) newObj[key] = sanitize(val);
        }
    }
    return newObj;
};

export const ensureUserDoc = async (uid: string, initialSettings?: UserSettings, initialData?: UserData) => {
    if (!firestore || !uid) return;
    const ref = firestore.collection(FIREBASE_USER_COLLECTION).doc(uid);
    try {
        const snap = await ref.get();
        // Check if doc exists OR if settings are missing (corrupted/wiped doc)
        if (!snap.exists || !snap.data()?.settings) {
            
            const payload: any = {
                createdAt: new Date().toISOString(),
                settings: sanitize(initialSettings || DEFAULT_SETTINGS)
            };

            // CRITICAL FIX: Only overwrite/merge 'data' if we actually have local data to migrate.
            // Otherwise, we leave the existing 'data' field (which might contain password/username) alone.
            if (initialData && Object.keys(initialData).length > 0) {
                payload.data = sanitize(initialData);
            }

            await ref.set(payload, { merge: true });
            return true;
        }
    } catch (e) { console.error("Error checking user doc:", e); }
    return false;
};