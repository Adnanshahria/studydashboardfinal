import { UserData, UserSettings } from '../../types';
import { firestore } from './core';
import { ensureUserDoc } from './helpers';
import { DEFAULT_SETTINGS } from '../../constants';

const FIREBASE_USER_COLLECTION = 'users';

export const initFirebase = async (
    uid: string, 
    onData: (data: UserData | null, settings: UserSettings | null) => void,
    onStatus: (status: 'connected' | 'disconnected') => void,
    localSettingsToMigrate?: UserSettings,
    localDataToMigrate?: UserData
) => {
    try {
        if (!firestore) throw new Error("Firestore not initialized");
        if (!uid) throw new Error("No UID");
        
        onStatus('connected');
        
        // OPTIMIZATION: Removed the blocking 'await ensureUserDoc' here.
        // Instead, we immediately start listening. If the doc doesn't exist,
        // the snapshot listener will tell us, and we create it then.
        // This saves 1 network round-trip (~300-800ms).

        const unsub = firestore.collection(FIREBASE_USER_COLLECTION).doc(uid).onSnapshot((docSnap) => {
            if (docSnap.exists) {
                const val = docSnap.data();
                onData(val?.data || {}, val?.settings || null);
            } else {
                // Doc doesn't exist? Create it now (Lazy Creation)
                // We pass true for 'merge' implicitly via ensureUserDoc to avoid overwrites
                ensureUserDoc(uid, localSettingsToMigrate || DEFAULT_SETTINGS, localDataToMigrate).then(() => {
                   // After creating, we might want to manually trigger onData with defaults
                   // so the UI doesn't wait for the next snapshot
                   onData(localDataToMigrate || {}, localSettingsToMigrate || DEFAULT_SETTINGS);
                });
            }
        }, (error) => { 
            console.error("Firestore listener error", error); 
            onStatus('disconnected'); 
        });
        
        return unsub;
    } catch (e) { 
        console.error("Init Firebase failed", e); 
        onStatus('disconnected'); 
        return () => {}; 
    }
};