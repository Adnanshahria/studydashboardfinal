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
        
        await ensureUserDoc(uid, localSettingsToMigrate || DEFAULT_SETTINGS, localDataToMigrate);
        
        const unsub = firestore.collection(FIREBASE_USER_COLLECTION).doc(uid).onSnapshot((docSnap) => {
            if (docSnap.exists) {
                const val = docSnap.data();
                onData(val?.data || {}, val?.settings || null);
            } else { onData(null, null); }
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