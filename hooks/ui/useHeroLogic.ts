
import { useState, useEffect } from 'react';
import { UserSettings, TrackableItem } from '../../types';

export const useHeroLogic = (
    settings: UserSettings, 
    onUpdateWeights: (newWeights: any, subjectKey?: string) => void
) => {
    const [isEditingWeights, setIsEditingWeights] = useState(false);
    const [isEditingCountdown, setIsEditingCountdown] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<string>('global');
    const [tempWeights, setTempWeights] = useState<Record<string, number>>({});
    const [weightTotal, setWeightTotal] = useState(0);

    const currentConfigItems: TrackableItem[] = selectedSubject === 'global' ? settings.trackableItems : (settings.subjectConfigs?.[selectedSubject] || settings.trackableItems);

    useEffect(() => {
        if (isEditingWeights) {
            setTempWeights(selectedSubject === 'global' ? { ...settings.weights } : { ...(settings.subjectWeights?.[selectedSubject] || settings.weights) });
        }
    }, [isEditingWeights, selectedSubject, settings]);

    useEffect(() => {
        setWeightTotal(currentConfigItems.reduce((acc, item) => acc + (tempWeights[item.key] || 0), 0));
    }, [tempWeights, currentConfigItems]);

    const handleWeightChange = (key: string, val: string) => {
        // Use parseFloat to allow decimals (e.g. 12.5)
        // Allow empty string to let user backspace to clear input
        if (val === '') {
             setTempWeights(prev => ({ ...prev, [key]: 0 }));
             return;
        }
        const parsed = parseFloat(val);
        const safeVal = isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
        setTempWeights(prev => ({ ...prev, [key]: safeVal }));
    };
    
    const saveWeights = () => { 
        if (weightTotal === 100) { 
            onUpdateWeights(tempWeights, selectedSubject === 'global' ? undefined : selectedSubject); 
            setIsEditingWeights(false); 
        } 
    };

    return {
        isEditingWeights, setIsEditingWeights,
        isEditingCountdown, setIsEditingCountdown,
        selectedSubject, setSelectedSubject,
        tempWeights, weightTotal,
        currentConfigItems,
        handleWeightChange, saveWeights
    };
};