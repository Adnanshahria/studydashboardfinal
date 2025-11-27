
import { UserData, UserSettings } from '../../types';
import { firestore, firebaseAuth } from './core';
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
        
        const unsub = firestore.collection(FIREBASE_USER_COLLECTION).doc(uid).onSnapshot((docSnap) => {
            if (docSnap.exists) {
                const val = docSnap.data();
                onData(val?.data || {}, val?.settings || null);
            } else {
                // Doc doesn't exist? Create it now (Lazy Creation)
                // We pass true for 'merge' implicitly via ensureUserDoc to avoid overwrites
                ensureUserDoc(uid, localSettingsToMigrate || DEFAULT_SETTINGS, localDataToMigrate).then((created) => {
                   if (created) {
                       // After creating, manually trigger onData with defaults
                       onData(localDataToMigrate || {}, localSettingsToMigrate || DEFAULT_SETTINGS);
                   }
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
