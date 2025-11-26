import { useEffect, useState } from 'react';
import { UserData, UserSettings } from '../../types';
import { DEFAULT_SETTINGS, INITIAL_SYLLABUS_DATA } from '../../constants';
import { openDB, dbPut, dbClear, initFirebase } from '../../utils/storage';

export const useDataSync = (
    userId: string | null,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>,
    setSettings: React.Dispatch<React.SetStateAction<UserSettings>>,
    localSettingsRef: React.MutableRefObject<UserSettings>,
    localDataRef: React.MutableRefObject<UserData>,
    handleLogout: () => void
) => {
    const [isLoading, setIsLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

    useEffect(() => {
        if (!userId) return;
        setIsLoading(true);
        let unsub: () => void = () => {};
        
        const init = async () => {
            try {
                // Initialize IndexedDB but don't block heavily
                await openDB().catch(e => console.warn("IndexedDB init warning:", e));
                
                unsub = await initFirebase(userId, (remoteData, remoteSettings) => {
                    if (remoteData) {
                        setUserData(prev => ({ ...prev, ...remoteData }));
                        // Save to IndexedDB in background, don't await
                        dbPut('userData', { id: 'main', value: remoteData }).catch(e => console.warn(e));
                    }
                    if (remoteSettings) {
                        setSettings(prev => {
                            const merged: UserSettings = { ...DEFAULT_SETTINGS, ...remoteSettings,
                                syllabus: remoteSettings.syllabus || JSON.parse(JSON.stringify(INITIAL_SYLLABUS_DATA)),
                                trackableItems: remoteSettings.trackableItems || DEFAULT_SETTINGS.trackableItems,
                                subjectConfigs: remoteSettings.subjectConfigs || {},
                                subjectWeights: remoteSettings.subjectWeights || {}
                            };
                            // Save to IndexedDB in background
                            dbPut('userData', { id: 'settings', value: merged }).catch(e => console.warn(e));
                            return merged;
                        });
                    }
                    setIsLoading(false);
                }, (status) => setConnectionStatus(status), localSettingsRef.current, localDataRef.current);
            } catch (e) { 
                console.error("Sync initialization failed", e); 
                setIsLoading(false); 
                // Don't disconnect immediately on minor errors, keep trying
            }
        };
        init();
        return () => { 
            if (unsub) unsub(); 
            // We don't force logout on unmount to preserve state during hot reloads
        };
    }, [userId]);

    return { isLoading, connectionStatus };
};