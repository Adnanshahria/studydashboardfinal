import React from 'react';
import { UserData, UserSettings } from '../../types';
import { saveUserProgress, saveSettings, cleanupStorage } from '../../utils/storage';
import { DEFAULT_SETTINGS } from '../../constants';

export const useSyncActions = (
    userId: string | null,
    userData: UserData,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>,
    settings: UserSettings,
    setSettings: React.Dispatch<React.SetStateAction<UserSettings>>,
    localDataRef: React.MutableRefObject<UserData>,
    localSettingsRef: React.MutableRefObject<UserSettings>,
    setUserId: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const handleStatusUpdate = async (key: string) => {
        if(!userId) return;
        const current = userData[key] ?? 0;
        const validated = Math.max(0, Math.min(6, Math.floor(current)));
        const next = (validated + 1) % 7;
        const safeNext = Math.max(0, Math.min(6, Math.floor(next)));
        const newData = { ...userData, [key]: safeNext, [`timestamp_${key}`]: new Date().toISOString() };
        setUserData(newData);
        await saveUserProgress(userId, { [key]: safeNext, [`timestamp_${key}`]: new Date().toISOString() });
    };

    const handleNoteUpdate = async (key: string, text: string) => {
        if(!userId) return;
        const newData = { ...userData, [`note_${key}`]: text };
        setUserData(newData);
        await saveUserProgress(userId, { [`note_${key}`]: text });
    };

    const handleSettingsUpdate = async (newSettings: UserSettings) => {
        setSettings(newSettings);
        if(!userId) return;
        await saveSettings(userId, newSettings);
    };

    const toggleTheme = () => {
        handleSettingsUpdate({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' });
    };

    const handleLogout = () => {
        setUserId(null);
        setUserData({});
        setSettings(DEFAULT_SETTINGS);
        localDataRef.current = {};
        localSettingsRef.current = DEFAULT_SETTINGS;
        cleanupStorage();
    };

    return { handleStatusUpdate, handleNoteUpdate, handleSettingsUpdate, toggleTheme, handleLogout };
};