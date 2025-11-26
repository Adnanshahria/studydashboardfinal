import { useState, useEffect, useRef } from 'react';
import { UserData, UserSettings } from '../types';
import { DEFAULT_SETTINGS } from '../constants';
import { useSyncActions } from './sync/useSyncActions';
import { useDataSync } from './sync/useDataSync';

export const useFirebaseSync = () => {
    const [userData, setUserData] = useState<UserData>({});
    const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
    const [userId, setUserId] = useState<string | null>(null);

    const localDataRef = useRef<UserData>({});
    const localSettingsRef = useRef<UserSettings>(DEFAULT_SETTINGS);
    
    useEffect(() => { localDataRef.current = userData; }, [userData]);
    useEffect(() => { localSettingsRef.current = settings; }, [settings]);
    useEffect(() => { setUserData({}); setSettings(DEFAULT_SETTINGS); setUserId(null); }, []);
    useEffect(() => { document.documentElement.setAttribute('data-theme', settings.theme); }, [settings.theme]);

    const actions = useSyncActions(userId, userData, setUserData, settings, setSettings, localDataRef, localSettingsRef, setUserId);
    const { isLoading, connectionStatus } = useDataSync(userId, setUserData, setSettings, localSettingsRef, localDataRef, actions.handleLogout);

    return { userId, setUserId, userData, setUserData, settings, setSettings, isLoading, connectionStatus, ...actions };
};