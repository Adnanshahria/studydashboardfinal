import { UserSettings } from '../../types';

export const useSubjectActions = (
    settings: UserSettings, 
    handleSettingsUpdate: (s: UserSettings) => void,
    activeSubject: string,
    setActiveSubject: (s: string) => void
) => {
    const handleDeleteSubject = (key: string) => {
        if (!settings.syllabus[key]) return;
        
        const newSettings = JSON.parse(JSON.stringify(settings));
        delete newSettings.syllabus[key];
        
        // Cleanup associated config data
        if (newSettings.subjectConfigs?.[key]) delete newSettings.subjectConfigs[key];
        if (newSettings.subjectWeights?.[key]) delete newSettings.subjectWeights[key];
        if (newSettings.customNames?.[key]) delete newSettings.customNames[key];

        handleSettingsUpdate(newSettings);
        
        if (activeSubject === key) {
            const remaining = Object.keys(newSettings.syllabus);
            setActiveSubject(remaining.length > 0 ? remaining[0] : '');
        }
    };

    return { handleDeleteSubject };
};