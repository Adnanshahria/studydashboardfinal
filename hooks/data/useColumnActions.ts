import { UserSettings, TrackableItem } from '../../types';

export const useColumnActions = (settings: UserSettings, handleSettingsUpdate: (s: UserSettings) => void) => {

    const getItems = (subjectKey: string) => settings.subjectConfigs && settings.subjectConfigs[subjectKey] 
        ? JSON.parse(JSON.stringify(settings.subjectConfigs[subjectKey]))
        : JSON.parse(JSON.stringify(settings.trackableItems));

    const updateConfig = (subjectKey: string, items: TrackableItem[]) => {
        const newConfigs = { ...(settings.subjectConfigs || {}) };
        newConfigs[subjectKey] = items;
        handleSettingsUpdate({ ...settings, subjectConfigs: newConfigs });
    };

    const onDeleteColumn = (subjectKey: string, itemKey: string) => {
        if (!subjectKey || !itemKey || typeof itemKey !== 'string') return;
        const currentItems = getItems(subjectKey).filter((t: TrackableItem) => t.key !== itemKey);
        updateConfig(subjectKey, currentItems);
    };

    const onRenameColumn = (subjectKey: string, itemKey: string, newName: string) => {
        if (!subjectKey || !itemKey) return;
        const trimmedName = typeof newName === 'string' ? newName.trim() : '';
        if (!trimmedName || trimmedName.length > 100) return;
        
        const currentItems = getItems(subjectKey);
        const itemIndex = currentItems.findIndex((t: TrackableItem) => t.key === itemKey);
        if (itemIndex !== -1) {
            currentItems[itemIndex].name = trimmedName;
            updateConfig(subjectKey, currentItems);
        }
    };

    const onAddColumn = (subjectKey: string, name: string, color: string) => {
        if (!subjectKey) return;
        const trimmedName = typeof name === 'string' ? name.trim() : '';
        if (!trimmedName || trimmedName.length > 100) return;
        
        const safeColor = typeof color === 'string' && color.trim() ? color.trim() : '#3b82f6';
        const newKey = `custom_col_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        const newItem: TrackableItem = { name: trimmedName, color: safeColor, key: newKey };
        const currentItems = getItems(subjectKey);
        currentItems.push(newItem);
        updateConfig(subjectKey, currentItems);
    };

    return { onDeleteColumn, onRenameColumn, onAddColumn };
};